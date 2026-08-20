# 🚀 Start Servers - Correct Full Path Instructions

## ❌ Wrong Way (What You Tried)
```powershell
C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server\npm.cmd run dev
```
**Problem**: `npm.cmd` doesn't exist in the server directory. npm is a global command.

## ✅ Correct Ways

### Option 1: Change Directory First (Recommended)
```powershell
# Frontend
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev

# Backend (in a NEW PowerShell window)
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```

### Option 2: Use npm with -C flag (Change Directory)
```powershell
# Frontend
npm --prefix "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web" run dev

# Backend
npm --prefix "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server" run dev
```

### Option 3: Use Full Path to npm.exe
```powershell
# Find npm location first
where.exe npm

# Then use full path (example):
"C:\Program Files\nodejs\npm.cmd" --prefix "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server" run dev
```

## 🎯 Quick Start (Easiest)

**Open 2 PowerShell windows:**

**Window 1 - Frontend:**
```powershell
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```

**Window 2 - Backend:**
```powershell
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```

## 🔄 Or Use PowerShell Start-Process (Automatic)

```powershell
# Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web'; npm run dev"

# Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server'; npm run dev"
```

## 📝 Notes

- `npm` is a global command installed with Node.js
- It's usually located at: `C:\Program Files\nodejs\npm.cmd` or `C:\Users\[USER]\AppData\Roaming\npm\npm.cmd`
- You don't need to specify the full path to npm, just change to the project directory first
- The `--prefix` flag tells npm which directory to use as the working directory

