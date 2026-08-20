# Fix 404 for CSS and JS (Next.js assets)

## Why this happens

- Backend is OK (`/api/health` returns `"status":"ok"`).
- Frontend HTML loads but `/_next/static/` CSS and JS return **404**.
- Typical causes:
  1. **Stale build**: Browser or HTML is using an old build ID that no longer exists.
  2. **Wrong URL**: Page opened on port 5000 (backend) or a deployed URL while assets are expected from the dev server on 3002.
  3. **Corrupt `.next`**: Dev build cache is out of sync.

---

## Fix: Clean rebuild and hard refresh

### 1. Use the correct frontend URL

- Open: **http://localhost:3002**
- Do **not** use:
  - `http://localhost:5000` (backend only)
  - A deployed URL (e.g. Render) unless you just redeployed

### 2. Restart frontend with a clean build

In the terminal where the **frontend** runs:

1. Stop the server: **Ctrl+C**
2. From project root run:

```powershell
cd c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
```

3. Wait until you see something like: `- Local: http://localhost:3002`

### 3. Hard refresh the browser

- **Windows:** **Ctrl + Shift + R** or **Ctrl + F5**
- Or: DevTools (F12) → Right‑click refresh → **Empty cache and hard reload**

### 4. If it still 404s

- Clear site data for localhost:
  - F12 → **Application** → **Storage** → **Clear site data**
- Close the tab and open a **new** tab to **http://localhost:3002**

### 5. Unstyled sidebar / blue links (Tailwind not loading)

- The hamburger menu and nav use Tailwind. If they show as **default blue links on black**, Tailwind CSS is 404ing — same cause as above.
- In the browser **Network** tab, confirm the failing CSS requests go to **http://localhost:3002** (not 5000). If the page URL is 5000, you're on the backend; use 3002.
- If 404s persist on 3002 after clean rebuild, try dev **without Turbopack** (can fix chunk naming):

```powershell
cd web
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npx next dev -p 3002 --no-turbopack
```

Then open **http://localhost:3002** and hard refresh.

---

## Checklist

- [ ] Backend running: `http://localhost:5000/api/health` → `"status":"ok"`
- [ ] Frontend running: `http://localhost:3002` (terminal shows “Local: http://localhost:3002”)
- [ ] You open **http://localhost:3002** in the browser (not 5000, not a deployed URL)
- [ ] `.next` deleted and `npm run dev` run again in `web`
- [ ] Hard refresh (Ctrl+Shift+R) or “Empty cache and hard reload”

After this, CSS and JS should load and the page should render with styles.
