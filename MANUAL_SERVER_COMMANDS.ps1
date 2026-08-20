# ============================================
# MANUAL POWERSHELL COMMANDS - COPY & PASTE
# ============================================
# 
# Run these commands in separate PowerShell windows
# OR use the RUN_BOTH_SERVERS_FULL_PATH.ps1 script
#
# ============================================

# ============================================
# OPTION 1: Run Backend Server (Port 5000)
# ============================================
# Copy and paste this entire block into PowerShell:

cd "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"
npm start

# ============================================
# OPTION 2: Run Frontend Server (Port 3002)
# ============================================
# Copy and paste this entire block into a NEW PowerShell window:

cd "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"
npm run dev

# ============================================
# VERIFICATION COMMANDS
# ============================================
# After both servers are running, test them:

# Test Backend Health:
# Open browser: http://localhost:5000/api/health
# OR in PowerShell:
Invoke-WebRequest -Uri "http://localhost:5000/api/health" | Select-Object -ExpandProperty Content

# Test Frontend:
# Open browser: http://localhost:3002

# ============================================
# FULL PATHS REFERENCE
# ============================================
# Backend Path:  C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
# Frontend Path: C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
# Backend Port:  5000
# Frontend Port: 3002
