# ⚡ Quick Server Commands

## 🔍 CURRENT STATUS

**Backend (Port 5000):** ✅ Running (PID: 13300)
**Frontend (Port 3002):** Check with command below

---

## 📋 COMMON COMMANDS

### Check What's Running
```powershell
# See all running servers
Get-NetTCPConnection | Where-Object { $_.LocalPort -in @(3002, 3000, 5000) -and $_.State -eq 'Listen' }

# See all Node processes
Get-Process -Name node
```

### Stop All Servers
```powershell
Get-Process -Name node | Stop-Process -Force
```

### Stop Specific Server (by Port)
```powershell
# Stop port 3002 (Frontend)
$pid = (Get-NetTCPConnection -LocalPort 3002).OwningProcess
Stop-Process -Id $pid -Force

# Stop port 5000 (Backend)
$pid = (Get-NetTCPConnection -LocalPort 5000).OwningProcess
Stop-Process -Id $pid -Force
```

### Start Frontend Only
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```
**Access:** http://localhost:3002

### Start Backend Only
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```
**Access:** http://localhost:5000/api

---

## 🎯 RECOMMENDED: Run Both Servers

**Open 2 Terminal Windows:**

**Terminal 1 - Backend:**
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```
**Full Path:** `C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server`

**Terminal 2 - Frontend:**
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```
**Full Path:** `C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web`

---

## 🛑 EMERGENCY STOP (Kill Everything)
```powershell
Get-Process -Name node | Stop-Process -Force
```

---

## ✅ VERIFY SERVERS ARE RUNNING

**Frontend:** Open browser → http://localhost:3002
**Backend:** Open browser → http://localhost:5000/api/health

---

**Last Check:** Backend on Port 5000 is running ✅
