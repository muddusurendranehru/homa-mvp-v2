# 🔧 Fix Port 5000 Already in Use Error

## Problem
```
Error: listen EADDRINUSE: address already in use :::5000
```

Port 5000 is already being used by another process.

## ✅ Solution 1: Kill Process Using Port 5000

### Find the process:
```powershell
netstat -ano | findstr ":5000"
```

### Kill the process (replace PID with actual process ID):
```powershell
Stop-Process -Id [PID] -Force
```

### Or kill all Node processes:
```powershell
Get-Process node | Stop-Process -Force
```

## ✅ Solution 2: Change Backend Port

Edit `server/server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Changed from 5000 to 3001
```

Then update frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## ✅ Solution 3: Use Different Port via Environment Variable

```powershell
$env:PORT=3001
npm run dev
```

## 🔍 Check What's Using Port 5000

```powershell
# Find process ID
netstat -ano | findstr ":5000"

# Get process details
Get-Process -Id [PID] | Select-Object Id, ProcessName, Path
```

## 📝 Quick Fix Command

```powershell
# Kill process on port 5000
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force

# Then restart backend
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```

