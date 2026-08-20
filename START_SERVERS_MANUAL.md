# Manual Server Start Guide - Full Paths

## Quick Start (2 PowerShell Windows)

### Window 1: Backend Server (Port 5000)
```powershell
cd "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"
npm start
```

### Window 2: Frontend Server (Port 3002)
```powershell
cd "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"
npm run dev
```

---

## Full Paths Reference

- **Project Root:** `C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION`
- **Backend Path:** `C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server`
- **Frontend Path:** `C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web`
- **Backend Port:** `5000`
- **Frontend Port:** `3002`

---

## Verification URLs

After starting both servers, test them:

1. **Backend Health Check:**
   - URL: http://localhost:5000/api/health
   - Should return: `{"status":"ok","message":"HOMA Clinic Backend is running",...}`

2. **Frontend:**
   - URL: http://localhost:3002
   - Should show the homepage

---

## Alternative: Use the Script

Run the automated script:
```powershell
cd "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION"
.\RUN_BOTH_SERVERS_FULL_PATH.ps1
```

This will open 2 separate PowerShell windows automatically.

---

## Troubleshooting

### If servers don't start:

1. **Check if ports are in use:**
   ```powershell
   netstat -ano | findstr ":5000"
   netstat -ano | findstr ":3002"
   ```

2. **Install dependencies (if missing):**
   ```powershell
   cd "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"
   npm install
   
   cd "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"
   npm install
   ```

3. **Check environment variables:**
   - Backend needs `.env` file in `server/` folder
   - Frontend may need `.env.local` in `web/` folder

---

## Expected Output

### Backend (Window 1):
```
HOMA Clinic Backend is running
Server listening on port 5000
```

### Frontend (Window 2):
```
▲ Next.js 15.5.9
- Local:        http://localhost:3002
- ready started server on 0.0.0.0:3002
```
