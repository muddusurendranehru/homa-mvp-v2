# 🚀 Run Both Servers Locally - Full Path Commands

## 📍 Project Root
```
c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION
```

---

## 🖥️ **SERVER 1: Backend API (Port 5000)**

### Full Path:
```
c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
```

### Commands:

#### Option A: Using npm (Development with auto-reload)
```powershell
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"
npm run dev
```

#### Option B: Using npm (Production mode)
```powershell
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"
npm start
```

#### Option C: Direct node command
```powershell
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"
node server.js
```

### ✅ Expected Output:
```
Server running on port 5000
✅ Auth routes loaded
✅ Assessment routes loaded
...
```

### 🌐 Test Backend:
- Health Check: http://localhost:5000/api/health
- Should return: `{"status":"ok","message":"HOMA Clinic Backend is running"}`

---

## 🎨 **SERVER 2: Frontend Next.js (Port 3002)**

### Full Path:
```
c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
```

### Commands:

#### Option A: Development mode (Recommended)
```powershell
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"
npm run dev
```

#### Option B: Production build + start
```powershell
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"
npm run build
npm start
```

### ✅ Expected Output:
```
▲ Next.js 15.1.6
- Local:        http://localhost:3002
- ready started server on 0.0.0.0:3002
```

### 🌐 Test Frontend:
- Homepage: http://localhost:3002
- Manifest: http://localhost:3002/manifest.json
- PWA Icons: http://localhost:3002/icon-192x192.png

---

## 🔄 **Run Both Servers Simultaneously**

### Method 1: Two Separate PowerShell Windows

**Window 1 - Backend:**
```powershell
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"
npm run dev
```

**Window 2 - Frontend:**
```powershell
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"
npm run dev
```

### Method 2: Single PowerShell with Background Jobs

```powershell
# Start Backend in background
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"
Start-Job -ScriptBlock { npm run dev } -Name "BackendServer"

# Start Frontend in foreground (or also in background)
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"
npm run dev
```

---

## ✅ **Local Testing Checklist**

### 1. Backend Health Check
```powershell
# Test in PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/api/health" | Select-Object -ExpandProperty Content
```

**Expected:** `{"status":"ok","message":"HOMA Clinic Backend is running",...}`

### 2. Frontend Manifest
```powershell
Invoke-WebRequest -Uri "http://localhost:3002/manifest.json" | Select-Object -ExpandProperty Content
```

**Expected:** JSON with `"name": "HOMA Clinic - Dr. Muddu Nehru MD"`

### 3. PWA Icons
- http://localhost:3002/icon-192x192.png
- http://localhost:3002/icon-512x512.png

### 4. Frontend → Backend Connection
- Open browser: http://localhost:3002
- Open DevTools → Network tab
- Check API calls to `http://localhost:5000/api/*`

---

## 🔧 **Troubleshooting**

### Port Already in Use?

**Backend (Port 5000):**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000
# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Frontend (Port 3002):**
```powershell
# Find process using port 3002
netstat -ano | findstr :3002
# Kill process
taskkill /PID <PID> /F
```

### Missing Dependencies?
```powershell
# Backend
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"
npm install

# Frontend
cd "c:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"
npm install
```

### Environment Variables Missing?
- Backend needs `.env` in `server/` folder with:
  - `DATABASE_URL=...`
  - `JWT_SECRET=...`
  - `PORT=5000`

- Frontend needs `.env.local` in `web/` folder with:
  - `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

---

## 📊 **Quick Reference**

| Server | Port | Path | Command |
|--------|------|------|---------|
| Backend | 5000 | `server/` | `npm run dev` |
| Frontend | 3002 | `web/` | `npm run dev` |

---

## 🎯 **Success Indicators**

✅ **Backend Running:**
- Console shows: "Server running on port 5000"
- http://localhost:5000/api/health returns JSON

✅ **Frontend Running:**
- Console shows: "ready started server on 0.0.0.0:3002"
- http://localhost:3002 shows homepage
- http://localhost:3002/manifest.json shows PWA manifest

✅ **Both Connected:**
- Frontend can make API calls to backend
- No CORS errors in browser console
- Authentication/login works
