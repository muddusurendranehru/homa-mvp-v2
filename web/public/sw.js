// Service Worker for HOMA Clinic PWA
// Cache version - update this when you want to force cache refresh
const CACHE = 'homa-clinic-v2'; // Updated to cache calculator pages
const urls = [
  '/',
  '/tools',
  '/tools/homa-ir-calculator',
  '/tools/tyg-index-calculator',
  '/tools/whr-calculator',
  '/tools/whtr-calculator',
  '/tools/bmi-calculator',
  '/conditions/diabetes',
  '/about',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Install event - cache resources
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installing...');
  e.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(urls);
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activating...');
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE) {
            console.log('[Service Worker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  
  // Skip caching for:
  // - Next.js internal files (_next/)
  // - Webpack chunks
  // - API calls
  // - Non-GET requests
  if (
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/api/') ||
    e.request.method !== 'GET' ||
    url.pathname.includes('webpack') ||
    url.pathname.includes('.hot-update')
  ) {
    // Don't intercept - let it go to network
    return;
  }
  
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(e.request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200) {
          return response;
        }
        // Only cache same-origin requests
        if (url.origin !== location.origin) {
          return response;
        }
        // Clone the response
        const responseToCache = response.clone();
        caches.open(CACHE).then((cache) => {
          cache.put(e.request, responseToCache);
        });
        return response;
      });
    })
  );
});
