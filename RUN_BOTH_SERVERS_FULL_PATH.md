# 🚀 Run Both Servers - Full Pathway Commands

## Complete Absolute Paths

**Project Root:** `C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION`

---

## Option 1: Two Separate PowerShell Windows (Recommended)

### Terminal 1 - Backend Server (Port 5000):
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```

### Terminal 2 - Frontend Server (Port 3002):
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```

---

## Option 2: Single-Line Commands (Full Path)

### Backend Server:
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server; npm run dev
```

### Frontend Server:
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web; npm run dev
```

---

## Option 3: PowerShell Script with Full Paths (Automated)

### Run from anywhere:
```powershell
# Backend Server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server'; Write-Host '🚀 Backend Server (Port 5000) Starting...' -ForegroundColor Green; npm run dev"

# Frontend Server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web'; Write-Host '🌐 Frontend Server (Port 3002) Starting...' -ForegroundColor Cyan; npm run dev"
```

---

## Option 4: Update start-servers.ps1 Script

Run from project root:
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION
.\start-servers.ps1
```

---

## Server URLs

- **Backend API:** http://localhost:5000/api/health
- **Frontend:** http://localhost:3002
- **Frontend (if port 3000):** http://localhost:3000

---

## Quick Copy-Paste Commands

### Backend (Terminal 1):
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```

### Frontend (Terminal 2):
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```

---

## Verify Servers Are Running

### Check Backend:
```powershell
curl http://localhost:5000/api/health
# Or in browser: http://localhost:5000/api/health
```

### Check Frontend:
```powershell
# Open browser: http://localhost:3002
```

---

## Stop Servers

Press `Ctrl+C` in each terminal window, or close the PowerShell windows.

