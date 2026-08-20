# Errors to Grok – UI & 404 Fix Guide

Use this doc to recognize and fix the main errors you’re seeing (black screens, missing content, 404s, sign-up).

---

## 1. Solid black background (whole page or big areas)

**What you see:** Page or large sections are solid black. Nav/sidebar may show as blue underlined links on black.

**What it usually is:**
- **Tailwind/CSS not loading** – `globals.css` and Tailwind classes never apply. Body is supposed to get `bg-gradient-to-br from-gray-50 to-blue-50`; if Tailwind doesn’t run, you get no background (browser default, often black in dark mode).
- **Build/cache broken** – Incomplete or old build, or `.next` in a bad state.

**Fixes (in order):**
1. **Clean rebuild (PowerShell, from repo root):**
   ```powershell
   cd c:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
   Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
   npm install
   npm run build
   npm run dev
   ```
2. **Hard refresh in browser:** `Ctrl + Shift + R` (or disable cache in DevTools → Network, then refresh).
3. **Check DevTools → Network:** Ensure no 404s on main JS/CSS (e.g. `_app-*.js`, chunk files). If they 404, do step 1 again.

**Relevant files:** `web/app/globals.css` (body gradient), `web/app/layout.tsx` (body/main), Tailwind config.

---

## 2. Big black middle section with only a few icons (e.g. sparkle, stars)

**What you see:** Top (e.g. 90-Day timeline) and bottom (e.g. map, contact) look fine, but the middle is one large black rectangle with a couple of small icons.

**What it usually is:**
- **Main content not rendering** – The section that should show dashboard metrics, hero, or page content is empty or wrapped in a full-height div that has no background (so it appears black).
- **Data/API not loading** – Dashboard expects assessment data; if the API fails or returns nothing, the content block may not render and you only see the layout (header/footer) and an empty middle.
- **Conditional render path** – e.g. “no assessment” branch that shows a blank or minimal state instead of a proper message.

**Fixes:**
1. **Backend must be running** – Start server first:  
   `cd c:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server` → `npm run dev`.  
   Then open frontend. If API is down, dashboard (and any data-dependent middle section) can stay empty.
2. **Check Network tab:** For the page that shows the black middle, see if requests to `/api/...` (e.g. `/api/assessments/latest`) return 200 and valid JSON. Fix any 404/500/CORS.
3. **Check console:** Look for React errors or “Failed to fetch” so you know which component or fetch is failing.
4. **If it’s the dashboard:** Ensure you’re logged in and have at least one assessment. No assessment → app may redirect to `/assessment` or show an empty state; if that state is unstyled (e.g. no background), it can look like a black block.

**Relevant files:** `web/app/dashboard/page.tsx`, `web/app/layout.tsx` (main wraps `{children}`), `web/lib/api.ts`, backend assessment routes.

---

## 3. Sidebar/nav as black with blue links only

**What you see:** Left (or slide-out) nav with Home, Packages, Zoom Sundays, Gallery, Blog, Dashboard, NutriBot AI, Assessment, 90-Day Program, etc., but everything is on a black background and links look like default blue underlined.

**What it usually is:**
- Same as **§1** – **Tailwind not applied**. The nav is `MobileNav` with classes like `from-slate-900 via-indigo-900 to-purple-900` and styled link buttons. If Tailwind doesn’t load, you only get default link styling (blue, underlined) on an unstyled (often black) background.

**Fixes:** Same as **§1** – clean rebuild, hard refresh, confirm no 404s on CSS/JS.

**Relevant files:** `web/components/MobileNav.tsx`, `web/app/globals.css`, Tailwind build.

---

## 4. Abstract graphic (yellow semicircle, red triangle, red circle) on black

**What you see:** A simple graphic: yellow semicircle with red triangle inside, small red circle below, on a black background. No normal page content.

**What it usually is:**
- **Placeholder or error graphic** when a component or asset fails to load (e.g. 404 image replaced by a fallback SVG/shape).
- **Broken or wrong route** – A page that’s supposed to render real content is instead rendering a minimal/error view.
- **PWA/offline or cached broken state** – Service worker or cache serving an old/broken version of the app.

**Fixes:**
1. **Hard refresh and disable cache** – Rule out stale cache/PWA.
2. **Check URL** – Confirm you’re on the route you expect (e.g. `/`, `/dashboard`, `/assessment`). If you’re on a wrong or non-existent route, you might see a fallback.
3. **Search codebase** – Search for “semi”, “triangle”, or similar in `web` to find the component that draws this; then fix its data/asset or replace with proper content.
4. **Unregister service worker** – In DevTools → Application → Service Workers, unregister `sw.js`, reload, and see if the issue goes away.

---

## 5. Failed to load resource: 404 (Not Found)

**What you see:** In DevTools → Console or Network: “Failed to load resource: the server responded with a status of 404 (Not Found).”

**Common causes and fixes:**

| Cause | Fix |
|-------|-----|
| **Missing image** (e.g. Dr. Muddu + Chiranjeevi) | Already fixed: image now loads from Render URL. If you see 404 on another image, find its `src` in the code and either add the file under `web/public` or use a valid URL. |
| **report-hmr-latency.js** | Next.js dev-only (Fast Refresh). Safe to ignore; not used in production. |
| **Other JS/CSS chunks** | Clean rebuild: delete `.next`, `npm run build`, `npm run dev`. |
| **API route** (e.g. `/api/...`) | Ensure backend is running on the port in `NEXT_PUBLIC_API_URL` (e.g. `http://localhost:5000/api`). Fix CORS if the request is blocked. |

---

## 6. Sign-up / login errors

**What you see:** “Signup failed”, “Login failed”, or network error when submitting auth form.

**Checks:**
1. **Backend running first** – `cd ...\server` → `npm run dev` (API on port 5000).
2. **Frontend API URL** – In `web/.env.local`, `NEXT_PUBLIC_API_URL` should point to that backend (e.g. `http://localhost:5000/api`). Restart `npm run dev` after changing `.env.local`.
3. **Network tab** – On sign-up submit, confirm POST to `/auth/signup` goes to the right origin and returns 200 or a clear 4xx body (e.g. “Email already exists”). Fix CORS or URL if the request fails or is blocked.

**Relevant files:** `web/app/auth/page.tsx`, `web/lib/api.ts`, `server` auth routes and CORS config.

---

## Quick checklist (local dev)

1. **Backend first:**  
   `cd c:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server`  
   `npm run dev`
2. **Frontend:**  
   `cd c:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web`  
   `npm run dev`
3. **If page is black or broken:**  
   Delete `web/.next`, run `npm run build` then `npm run dev`, then hard refresh (`Ctrl + Shift + R`).
4. **If sign-up/login fails:**  
   Check `NEXT_PUBLIC_API_URL` and that the server is running and reachable.

---

**See also:** `web/RUN-DEV.md` (run order, full paths), `EXTERNAL_ERRORS_GUIDE.md` (deploy, CSS, Render), `SCIENCE_AND_ACHIEVEMENTS.md` (stack and flow).
