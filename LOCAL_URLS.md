# 🌐 Local HTTP URLs - Quick Reference

## 🖥️ **Backend Server (Port 5000)**

### Base URL:
```
http://localhost:5000
```

### API Endpoints:
- **Health Check:** http://localhost:5000/api/health
- **Signup:** http://localhost:5000/api/auth/signup
- **Login:** http://localhost:5000/api/auth/login
- **Create Assessment:** http://localhost:5000/api/assessments
- **Get Latest Assessment:** http://localhost:5000/api/assessments/latest
- **Get Assessment History:** http://localhost:5000/api/assessments/history

---

## 🎨 **Frontend Server (Port 3002)**

### Base URL:
```
http://localhost:3002
```

### Main Pages:
- **Homepage:** http://localhost:3002
- **Auth (Login/Signup):** http://localhost:3002/auth
- **Assessment:** http://localhost:3002/assessment
- **Dashboard:** http://localhost:3002/dashboard
- **Tools:** http://localhost:3002/tools
- **About:** http://localhost:3002/about
- **Conditions:** http://localhost:3002/conditions/diabetes

### PWA Assets:
- **Manifest:** http://localhost:3002/manifest.json
- **Icon 192x192:** http://localhost:3002/icon-192x192.png
- **Icon 512x512:** http://localhost:3002/icon-512x512.png
- **Service Worker:** http://localhost:3002/sw.js

---

## 🧪 **Quick Test Commands**

### Test Backend Health:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/health"
```

### Test Frontend:
```powershell
Invoke-WebRequest -Uri "http://localhost:3002" | Select-Object StatusCode
```

### Test Manifest:
```powershell
Invoke-WebRequest -Uri "http://localhost:3002/manifest.json" | Select-Object -ExpandProperty Content
```

---

## 📋 **Quick Access**

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3002 | Main app |
| **Backend API** | http://localhost:5000/api/health | API health check |
| **PWA Manifest** | http://localhost:3002/manifest.json | PWA configuration |
| **Service Worker** | http://localhost:3002/sw.js | Offline caching |

---

## 🚀 **Start Commands**

### Backend:
```powershell
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"
npm run dev
```

### Frontend:
```powershell
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"
npm run dev
```
