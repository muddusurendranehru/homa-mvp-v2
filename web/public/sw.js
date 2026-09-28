// Service Worker for HOMA Clinic PWA
//
// Strategy (v3):
//  - Pages (HTML navigations): NETWORK-FIRST. Users always get the latest
//    deployed page when online. The cached copy is used only when offline.
//  - /_next/static/* (hashed, immutable build files): CACHE-FIRST.
//  - A few app-shell assets (manifest, icons): network-first, cache fallback.
//  - Everything else (API routes, auth/Clerk, non-GET, cross-origin, Next.js
//    data/RSC requests, etc.): NOT intercepted - goes straight to the network.
//
// Bump CACHE when you want every installed app to drop all old caches.
const CACHE = 'homa-clinic-v3';
const STATIC_CACHE = 'homa-clinic-static-v3';
const MAX_STATIC_ENTRIES = 200;

// Pages kept for offline use (refreshed on install and whenever visited online)
const OFFLINE_PAGES = [
  '/',
  '/tools',
  '/tools/homa-ir-calculator',
  '/tools/tyg-index-calculator',
  '/tools/whr-calculator',
  '/tools/whtr-calculator',
  '/tools/bmi-calculator',
  '/conditions/diabetes',
  '/about',
];

const SHELL_ASSETS = ['/manifest.json', '/icon-192x192.png', '/icon-512x512.png'];

// Pages that must never be cached (signed-in / auth areas)
const NO_CACHE_PAGE_PREFIXES = [
  '/dashboard',
  '/profile',
  '/staff',
  '/sign-in',
  '/sign-up',
  '/admin',
];

// Install - pre-cache offline pages + shell assets (fresh from network).
// A single failing URL must not break installation.
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installing v3...');
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.all(
        [...OFFLINE_PAGES, ...SHELL_ASSETS].map((path) =>
          fetch(new Request(path, { cache: 'reload', credentials: 'same-origin' }))
            .then((res) => {
              if (res && res.ok && !res.redirected) return cache.put(path, res);
            })
            .catch((err) => console.log('[Service Worker] Precache skipped:', path, err))
        )
      )
    )
  );
});

// Activate - delete ALL old caches (e.g. homa-clinic-v2) and take control.
self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activating v3...');
  e.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name !== CACHE && name !== STATIC_CACHE)
            .map((name) => {
              console.log('[Service Worker] Removing old cache:', name);
              return caches.delete(name);
            })
        )
      )
      .then(() => self.clients.claim())
  );
});

function isNavigation(request) {
  if (request.mode === 'navigate') return true;
  const accept = request.headers.get('accept') || '';
  return request.destination === 'document' || accept.includes('text/html');
}

function isCacheablePage(url) {
  return !NO_CACHE_PAGE_PREFIXES.some(
    (p) => url.pathname === p || url.pathname.startsWith(p + '/')
  );
}

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    await Promise.all(keys.slice(0, keys.length - maxEntries).map((k) => cache.delete(k)));
  }
}

// Network-first for pages; cache only when offline
async function networkFirstPage(request, url) {
  try {
    const response = await fetch(request);
    if (
      response &&
      response.ok &&
      response.type === 'basic' &&
      !response.redirected &&
      isCacheablePage(url) &&
      !url.search // only cache clean URLs (no query strings)
    ) {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(url.pathname, copy)).catch(() => {});
    }
    return response;
  } catch (err) {
    // Offline (network failed) - try cached copy of this page, then home page
    const cached =
      (await caches.match(url.pathname, { cacheName: CACHE })) ||
      (await caches.match('/', { cacheName: CACHE }));
    if (cached) return cached;
    return new Response(
      '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<title>Offline - HOMA Clinic</title><body style="font-family:sans-serif;padding:2rem;text-align:center">' +
        '<h1>You are offline</h1><p>Please check your internet connection and try again.</p></body>',
      { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}

// Cache-first for hashed, immutable Next.js build files
async function cacheFirstStatic(request) {
  const cached = await caches.match(request, { cacheName: STATIC_CACHE });
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok && response.type === 'basic') {
    const copy = response.clone();
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.put(request, copy))
      .then(() => trimCache(STATIC_CACHE, MAX_STATIC_ENTRIES))
      .catch(() => {});
  }
  return response;
}

// Network-first for shell assets (manifest/icons), cache fallback offline
async function networkFirstAsset(request, url) {
  try {
    const response = await fetch(request);
    if (response && response.ok && response.type === 'basic') {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(url.pathname, copy)).catch(() => {});
    }
    return response;
  } catch (err) {
    const cached = await caches.match(url.pathname, { cacheName: CACHE });
    if (cached) return cached;
    throw err;
  }
}

self.addEventListener('fetch', (e) => {
  const request = e.request;

  // Pass through: non-GET, cross-origin (Clerk, analytics, CDNs, etc.)
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Pass through: API routes, auth/Clerk, Next.js data & RSC requests,
  // image optimizer, dev/HMR files, range requests
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/trpc/') ||
    url.pathname.includes('clerk') ||
    url.pathname.startsWith('/_next/data/') ||
    url.pathname.startsWith('/_next/image') ||
    url.pathname.includes('webpack') ||
    url.pathname.includes('.hot-update') ||
    url.searchParams.has('_rsc') ||
    request.headers.get('RSC') ||
    request.headers.get('Next-Router-Prefetch') ||
    request.headers.has('range')
  ) {
    return;
  }

  // Hashed build files: cache-first
  if (url.pathname.startsWith('/_next/static/')) {
    e.respondWith(cacheFirstStatic(request));
    return;
  }

  // Any other /_next/ path: pass through
  if (url.pathname.startsWith('/_next/')) return;

  // Pages: network-first
  if (isNavigation(request)) {
    e.respondWith(networkFirstPage(request, url));
    return;
  }

  // App-shell assets: network-first with offline fallback
  if (SHELL_ASSETS.includes(url.pathname)) {
    e.respondWith(networkFirstAsset(request, url));
    return;
  }

  // Everything else: let the browser handle it normally
});
