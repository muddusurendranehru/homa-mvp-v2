# Run Servers Manually Then Check Locally

## 1. Run backend (Terminal 1)

```powershell
cd c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```

Leave this window open. You should see something like:
- `Server running on port 5000` or similar.

---

## 2. Run frontend (Terminal 2)

Open a **new** PowerShell or terminal window, then:

```powershell
cd c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```

Leave this window open. You should see:
- `- Local: http://localhost:3002`

---

## 3. Check locally

### Backend

- In browser or PowerShell:
  - **Browser:** open `http://localhost:5000/api/health`
  - **PowerShell:**
    ```powershell
    Invoke-RestMethod -Uri "http://localhost:5000/api/health"
    ```
- Expected: JSON with `"status":"ok"` and message like "HOMA Clinic Backend is running".

### Frontend

- In browser open: **http://localhost:3002**
- Expected: HOMA Clinic homepage loads (hero, menu, CTAs).

### Quick one-line checks (PowerShell)

```powershell
# Backend
Invoke-RestMethod -Uri "http://localhost:5000/api/health"

# Frontend (status only)
(Invoke-WebRequest -Uri "http://localhost:3002" -UseBasicParsing).StatusCode
```

- Backend OK: you see the health JSON.
- Frontend OK: status code is `200`.

---

## Summary

| What        | Command / URL |
|------------|----------------|
| Start backend  | `cd server` then `npm run dev` |
| Start frontend | `cd web` then `npm run dev` |
| Backend check  | http://localhost:5000/api/health |
| Frontend check | http://localhost:3002 |

Use two terminals: one for backend, one for frontend. Then use the URLs above to check locally.
