# Run dev locally — cheatsheet

**Run backend first, then frontend.** Auth and API need the server.

Replace `MYPC` / paths below if your clone is not on Desktop (e.g. `D:\loanlens\New folder (2)\...`).

---

## Golden rules (Windows)

1. Prefer **CMD** for git + npm if PowerShell paste errors happen (`PS>`, `At line:`).
2. **`git pull origin main`** before **`git push`**.
3. Use **`git merge`**, not **`git rebase`**, if `.cursor` locks cause pain.
4. **Close Cursor** before big git operations when possible.

---

## 1. Backend (server) — run first

**Path (example):**
`C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server`

**CMD:**
```bat
cd /d C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm install
npm run dev
```

**PowerShell:**
```powershell
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```

API: **http://localhost:5000** — health: **http://localhost:5000/api/health** — keep this terminal open.

---

## 2. Frontend (web) — run second

**Path (example):**
`C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web`

**CMD:**
```bat
cd /d C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm install
npm run dev
```

**PowerShell:**
```powershell
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```

App: **http://localhost:3003** (see `web/package.json` — `next dev -p 3003`).

---

## If the UI is blank or auth fails

Open a **second terminal**, start the **server** (steps above), leave it running, then reload **http://localhost:3003**.

---

## Notes

- **Database:** `server/.env` and `web/.env.local` — use your Neon `DATABASE_URL`; project DB name is project-specific (not “heart”).
- **`NEXT_PUBLIC_API_URL`:** For local API, e.g. `http://localhost:5000/api` in `web/.env.local`.
- **404 `report-hmr-latency.js`:** Next.js dev-only (Fast Refresh). Harmless; not in production.
- **More Git/Cursor/Windows tips:** repo root `CURSOR_GIT_AND_WINDOWS.md`.
