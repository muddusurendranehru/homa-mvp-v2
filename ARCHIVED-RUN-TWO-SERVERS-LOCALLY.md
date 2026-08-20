# Archived: Running Two Servers Locally (Check & Test)

Use this when you need to run **backend + frontend** together for local sign-in, dashboard, and API checks.

---

## Order: Backend first, then frontend

1. **Start backend** — leave that terminal open.
2. **Start frontend** — use a second terminal.

---

## 1. Backend (API server)

**Path:** `server/`

| Item    | Value                    |
|---------|--------------------------|
| Command | `npm run dev`            |
| URL     | http://localhost:5000   |
| Script  | nodemon (restarts on change) |

**PowerShell:**
```powershell
cd c:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```

Keep this terminal open. Auth and API calls need the backend.

---

## 2. Frontend (Next.js web app)

**Path:** `web/`

| Item    | Value                    |
|---------|--------------------------|
| Command | `npm run dev`            |
| URL     | http://localhost:3002   |

**PowerShell (new terminal):**
```powershell
cd c:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```

Open **http://localhost:3002** in the browser to check login, sign-up, and dashboard.

---

## Which URL to open

| URL | What it is | Use in browser? |
|-----|-------------|-----------------|
| **http://localhost:5000** | Backend API only (JSON) | No — will show "invalid response" or raw JSON |
| **http://localhost:3002** | Next.js app (HTML) | Yes — this is the app |

Always open **http://localhost:3002** to use the site. Port 5000 is for API calls from the app, not for viewing in the browser.

---

## Quick check

- **Backend up:** http://localhost:5000/api/health (e.g. returns JSON). Do not use port 5000 as the main tab.
- **Frontend up:** http://localhost:3002 shows the app; sign-in/sign-up and dashboard work only if backend is running.

---

## Env (local)

- **Backend:** `server/.env` — DB and JWT (e.g. Neon `drmuddusmvp1`).
- **Frontend:** `web/.env.local` — `NEXT_PUBLIC_API_URL=http://localhost:5000/api` so the app talks to local backend.

---

## If the app is blank or auth fails

1. Start **server** first: `cd server` → `npm run dev`.
2. Then start **web**: `cd web` → `npm run dev`.
3. Reload http://localhost:3002.

---

## "This page isn't working" / "localhost sent an invalid response"

- **If you opened http://localhost:5000:** That’s the API server; it doesn’t serve HTML. Open **http://localhost:3002** instead (the Next.js app).
- **If you opened http://localhost:3002:** The frontend isn’t running or crashed. In a **second terminal** run:
  ```powershell
  cd c:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
  npm run dev
  ```
  Wait for "Ready on http://localhost:3002", then reload the page. If the terminal shows errors (e.g. Clerk or build), fix those first.

*(Archived reference — see also `web/RUN-DEV.md`.)*
