# ⚡ Quick Start - Run Both Servers

## 🎯 Copy & Paste These Commands

### **Terminal 1: Backend Server (Port 5000)**
```powershell
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"
npm run dev
```

### **Terminal 2: Frontend Server (Port 3002)**
```powershell
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"
npm run dev
```

---

## ✅ Verification

### Backend Health Check:
Open browser: **http://localhost:5000/api/health**

Expected response:
```json
{
  "status": "ok",
  "message": "HOMA Clinic Backend is running",
  "timestamp": "...",
  "version": "1.0.0"
}
```

### Frontend Homepage:
Open browser: **http://localhost:3002**

### PWA Manifest:
Open browser: **http://localhost:3002/manifest.json**

### PWA Icons:
- **http://localhost:3002/icon-192x192.png**
- **http://localhost:3002/icon-512x512.png**

---

## 📋 Status Check

✅ Dependencies: Installed  
⚠️  Environment files: Check if `.env` and `.env.local` exist

---

## 🚨 If Ports Are Busy

### Kill process on port 5000:
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Kill process on port 3002:
```powershell
netstat -ano | findstr :3002
taskkill /PID <PID> /F
```
