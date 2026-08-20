# 🖥️ Server Management Manual

## Current Status: 2 Servers Running

### Quick Commands

#### Check Running Servers
```powershell
# Check which ports are in use
Get-NetTCPConnection | Where-Object { $_.LocalPort -in @(3002, 3000, 5000) -and $_.State -eq 'Listen' }

# Check Node processes
Get-Process -Name node | Select-Object Id, ProcessName, StartTime
```

#### Stop All Node Servers
```powershell
# Stop all Node.js processes
Get-Process -Name node | Stop-Process -Force

# Stop specific port (if you know the PID)
Stop-Process -Id <PID> -Force
```

#### Start Frontend Server (Port 3002)
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```

#### Start Backend Server (Port 5000)
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```

---

## 🎯 Standard Setup

### Option 1: Run Both Servers (Recommended for Development)

**Terminal 1 - Frontend:**
```powershell
cd web
npm run dev
# Runs on: http://localhost:3002
```

**Terminal 2 - Backend:**
```powershell
cd server
npm run dev
# Runs on: http://localhost:5000
```

### Option 2: Production Build (Frontend Only)

If you only need to test the frontend build:
```powershell
cd web
npm run build
npm start
# Runs on: http://localhost:3000 (default Next.js port)
```

---

## 🔍 Troubleshooting

### Port Already in Use

**Find what's using the port:**
```powershell
# Check port 3002
Get-NetTCPConnection -LocalPort 3002 | Select-Object OwningProcess, State
Get-Process -Id <OwningProcess>

# Check port 5000
Get-NetTCPConnection -LocalPort 5000 | Select-Object OwningProcess, State
Get-Process -Id <OwningProcess>
```

**Kill specific process:**
```powershell
Stop-Process -Id <PID> -Force
```

### Multiple Servers Running

**Stop all Node processes:**
```powershell
Get-Process -Name node | Stop-Process -Force
```

**Then restart cleanly:**
```powershell
# Terminal 1
cd web
npm run dev

# Terminal 2 (new window)
cd server
npm run dev
```

---

## 📋 Server Ports Reference

| Service | Port | URL | Purpose |
|---------|------|-----|---------|
| Frontend Dev | 3002 | http://localhost:3002 | Next.js development server |
| Frontend Prod | 3000 | http://localhost:3000 | Next.js production server |
| Backend API | 5000 | http://localhost:5000 | Express API server |

---

## ✅ Quick Start Checklist

1. **Check running servers:**
   ```powershell
   Get-Process -Name node
   ```

2. **Stop all if needed:**
   ```powershell
   Get-Process -Name node | Stop-Process -Force
   ```

3. **Start Backend first:**
   ```powershell
   cd server
   npm run dev
   ```

4. **Start Frontend (new terminal):**
   ```powershell
   cd web
   npm run dev
   ```

5. **Access:**
   - Frontend: http://localhost:3002
   - Backend API: http://localhost:5000/api

---

## 🛑 Emergency Stop

**Kill all Node processes immediately:**
```powershell
Get-Process -Name node | Stop-Process -Force -ErrorAction SilentlyContinue
```

**Kill specific port:**
```powershell
$port = 3002
$connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($connection) {
    Stop-Process -Id $connection.OwningProcess -Force
}
```

---

## 📝 Environment Variables

### Frontend (.env.local in /web)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env in /server)
```env
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

**Last Updated:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
