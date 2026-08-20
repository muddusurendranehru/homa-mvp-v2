# 🚀 Run Both Servers - Quick Commands with Full Paths

## Complete Absolute Paths

**Project Root:** `C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION`
**Backend Path:** `C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server`
**Frontend Path:** `C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web`

---

## Option 1: Two Separate Terminal Windows (Easiest - Recommended)

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

## Option 2: PowerShell Background Jobs (Single Terminal)

### Run both in background:
```powershell
# Start backend server
Start-Job -ScriptBlock { Set-Location "C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"; npm run dev } -Name BackendServer

# Start frontend server  
Start-Job -ScriptBlock { Set-Location "C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"; npm run dev } -Name FrontendServer

# Check status
Get-Job

# View output
Receive-Job -Name BackendServer
Receive-Job -Name FrontendServer

# Stop servers
Stop-Job -Name BackendServer, FrontendServer
Remove-Job -Name BackendServer, FrontendServer
```

---

## Option 3: PowerShell Script (Automated)

Use existing `start-servers.ps1` script (in project root):
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION
.\start-servers.ps1
```

Or run directly with full paths:
```powershell
# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server'; npm run dev"

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web'; npm run dev"
```

---

## Quick Test URLs:
- **Frontend:** http://localhost:3002
- **Backend API:** http://localhost:5000/api/health
