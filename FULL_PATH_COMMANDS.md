# 📍 Full Path Commands - Copy & Paste Ready

## 🚀 START FRONTEND SERVER

### Full Command (Copy All):
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```

**Full Path:** `C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web`  
**Port:** http://localhost:3002

---

## 🔧 START BACKEND SERVER

### Full Command (Copy All):
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```

**Full Path:** `C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server`  
**Port:** http://localhost:5000/api

---

## 📋 STEP-BY-STEP (One Line at a Time)

### Option 1: PowerShell (Recommended)
```powershell
# Navigate to frontend folder
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web

# Start development server
npm run dev
```

### Option 2: Command Prompt (cmd)
```cmd
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```

---

## 🎯 RUN BOTH SERVERS (2 Terminal Windows)

### Terminal Window 1 - Frontend:
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```

### Terminal Window 2 - Backend:
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```

---

## 📁 FOLDER STRUCTURE

```
C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\
├── web\              ← Frontend (Next.js)
│   ├── app\
│   ├── components\
│   └── package.json
│
└── server\           ← Backend (Express)
    ├── routes\
    ├── middleware\
    └── package.json
```

---

## ✅ VERIFY PATHS EXIST

Before running, check if folders exist:

```powershell
# Check frontend folder
Test-Path C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web

# Check backend folder
Test-Path C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server

# Check package.json exists
Test-Path C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web\package.json
```

---

## 🛑 STOP SERVERS

```powershell
# Stop all Node.js processes
Get-Process -Name node | Stop-Process -Force
```

---

## 🔍 CHECK IF RUNNING

```powershell
# Check port 3002 (Frontend)
Test-NetConnection -ComputerName localhost -Port 3002

# Check port 5000 (Backend)
Test-NetConnection -ComputerName localhost -Port 5000
```

---

## 📝 QUICK REFERENCE

| Service | Full Path | Command |
|---------|-----------|---------|
| **Frontend** | `C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web` | `npm run dev` |
| **Backend** | `C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server` | `npm run dev` |

---

**Last Updated:** Ready to copy & paste! ✅
