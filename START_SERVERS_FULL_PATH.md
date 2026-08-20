# 🚀 Start Servers - Full Path Instructions

## Automatic Start (PowerShell)

### Option 1: Start Both Servers Automatically
```powershell
# Frontend Server (Port 3002)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web'; npm run dev"

# Backend Server (Port 3001)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server'; npm run dev"
```

### Option 2: Single Command (Both Servers)
```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web'; npm run dev"; Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server'; npm run dev"
```

## Manual Start (Full Paths)

### Frontend Server (Next.js)
**Full Path:**
```powershell
C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web\npm.cmd run dev
```

**Or navigate first:**
```powershell
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```

**Runs on:** http://localhost:3002

### Backend Server (Express)
**Full Path:**
```powershell
C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server\npm.cmd run dev
```

**Or navigate first:**
```powershell
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```

**Runs on:** http://localhost:3001

## Verify Servers Running

### Check Frontend:
```powershell
Invoke-WebRequest -Uri "http://localhost:3002" -UseBasicParsing
```

### Check Backend:
```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/health" -UseBasicParsing
```

### Check Ports:
```powershell
netstat -ano | findstr ":3002"
netstat -ano | findstr ":3001"
```

## Environment Variables

Both servers will automatically load:
- **Frontend**: `C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web\.env.local`
- **Backend**: `C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server\.env`

**Database**: `drmuddusmvp1` (Neon PostgreSQL)

## Quick Test

After servers start:
1. **Frontend**: Open http://localhost:3002
2. **Backend Health**: http://localhost:3001/api/health
3. **Gallery API**: http://localhost:3002/api/gallery

## Stop Servers

Press `Ctrl+C` in each PowerShell window, or:
```powershell
# Find and kill Node processes
Get-Process node | Stop-Process -Force
```

