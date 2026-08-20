# 🔧 Fix Port 3002 Already in Use

## Quick Fix (Choose One Method)

### Method 1: Stop Process Manually (Recommended)

**In PowerShell (Run as Administrator):**
```powershell
# Find the process
Get-NetTCPConnection -LocalPort 3002 | Select-Object OwningProcess

# Stop it (replace <PID> with the number from above)
Stop-Process -Id <PID> -Force
```

**Or use Task Manager:**
1. Press `Ctrl + Shift + Esc` to open Task Manager
2. Go to "Details" tab
3. Find `node.exe` process
4. Right-click → End Task

### Method 2: Kill All Node Processes

```powershell
Get-Process -Name node | Stop-Process -Force
```

**Warning:** This stops ALL Node.js processes (frontend + backend)

### Method 3: Use Different Port

Edit `web/package.json`:
```json
"dev": "next dev -p 3003"
```

Then run:
```powershell
npm run dev
```

---

## Current Process on Port 3002

Check what's running:
```powershell
Get-NetTCPConnection -LocalPort 3002
```

---

## After Stopping, Restart Dev Server

```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```

---

**Last Updated:** Quick fix guide for port conflicts
