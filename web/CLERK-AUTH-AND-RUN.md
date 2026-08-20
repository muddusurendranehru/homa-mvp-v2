# Clerk auth + local run – reference

## 1. Auth is Clerk-only (no backend login/signup)

- **No** `api.login()` or `api.signup()` – those were removed from `web/lib/api.ts`.
- Sign-in and sign-up use **only** Clerk components: `<SignIn />` and `<SignUp />`.
- Backend `/auth/signup` and `/auth/login` are **not** used by the frontend.

---

## 2. App routes (Next.js App Router)

```
app/
├── auth/
│   └── page.tsx              ← Legacy: tabbed Sign In / Create Account (Clerk)
└── (auth)/                   ← Route group (not in URL)
    ├── sign-in/
    │   └── [[...sign-in]]/
    │       └── page.tsx       ← <SignIn /> at /sign-in
    └── sign-up/
        └── [[...sign-up]]/
            └── page.tsx      ← <SignUp /> at /sign-up, routing="path", path="/sign-up"
```

**URLs:**

| URL        | Page / behavior      |
|-----------|----------------------|
| `/`       | Home (public)        |
| `/auth`   | Tabbed Sign In / Create Account (public) |
| `/sign-in`| Clerk sign-in (public) |
| `/sign-up`| Clerk sign-up (public) |
| Other     | Protected (must be signed in) |

---

## 3. Middleware (`web/middleware.ts`)

- **Public:** `/`, `/sign-in(.*)`, `/sign-up(.*)`, `/auth(.*)` – no sign-in required.
- **All other routes:** protected with Clerk `auth().protect()`.
- Matcher skips `_next/static`, `_next/image`, `favicon.ico`; also runs for `api` and `trpc`.

---

## 4. Kill stuck Node (when everything hangs / PowerShell crashes)

Run in PowerShell:

```powershell
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

Or:

```powershell
taskkill /F /IM node.exe
```

Then close all terminals and start again.

---

## 5. Run the two servers locally (PowerShell)

Use **two** separate PowerShell windows.

**Terminal 1 – Backend (port 5000):**

```powershell
cd c:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```

**Terminal 2 – Frontend (port 3003, with extra memory):**

```powershell
cd c:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev:mem
```

- Backend: http://localhost:5000 (health: http://localhost:5000/api/health)
- Frontend: http://localhost:3003

If `next` is not found, use:

```powershell
npx next dev -p 3003
```

Or with more memory:

```powershell
$env:NODE_OPTIONS="--max-old-space-size=4096"; npm run dev
```

---

## 6. Scripts (`web/package.json`)

| Script     | Command / purpose                          |
|-----------|--------------------------------------------|
| `npm run dev`    | Next on port **3003** (default)     |
| `npm run dev:mem`| Next on 3003 with 4GB Node heap (use if out-of-memory) |
| `npm run build`  | Production build                    |
| `npm run start`  | Run production build                |

---

## 7. Quick recovery when “nothing works”

1. Kill Node: `Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force`
2. Close every PowerShell/terminal window.
3. Open one PowerShell → start **server** (see Terminal 1 above).
4. Open another PowerShell → start **web** with `npm run dev:mem` (see Terminal 2 above).
5. If the machine is still slow, restart the PC and repeat 1–4.

---

**Summary:** Auth = Clerk only. Public: `/`, `/sign-in`, `/sign-up`, `/auth`. Everything else protected. Run backend on 5000, frontend on 3003 with `npm run dev:mem`; use the Node kill command when things hang.
