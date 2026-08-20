# Fix Stuck Frontend Build
Write-Host "`n🔧 Fixing Stuck Frontend Build...`n" -ForegroundColor Cyan

# Stop all Node processes
Write-Host "1. Stopping all Node processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2
Write-Host "   ✅ All Node processes stopped" -ForegroundColor Green

# Wait a moment
Write-Host "`n2. Waiting 3 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start Backend
Write-Host "`n3. Starting Backend Server..." -ForegroundColor Yellow
$serverPath = "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$serverPath'; Write-Host '🩺 Backend Starting...' -ForegroundColor Cyan; node server.js"
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "4. Starting Frontend Server (Fresh Build)..." -ForegroundColor Yellow
$webPath = "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$webPath'; Write-Host '🌐 Frontend Starting (Fresh Build)...' -ForegroundColor Cyan; npm run dev"

Write-Host "`n✅ Servers restarted!" -ForegroundColor Green
Write-Host "`n⏳ Wait 30-45 seconds for frontend to build..." -ForegroundColor Yellow
Write-Host "`n📍 Then test:" -ForegroundColor Cyan
Write-Host "   Backend: http://localhost:5000/api/health" -ForegroundColor White
Write-Host "   Frontend: http://localhost:3002" -ForegroundColor White
Write-Host "   Privacy: http://localhost:5000/privacy-policyAll" -ForegroundColor White
Write-Host ""
