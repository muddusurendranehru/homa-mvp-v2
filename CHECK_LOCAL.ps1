# Check Local Servers and Open Browser
Write-Host "`n🔍 Checking Local Servers...`n" -ForegroundColor Cyan

# Check Backend
Write-Host "1. Checking Backend (Port 5000)..." -ForegroundColor Yellow
try {
    $backend = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing -TimeoutSec 2
    Write-Host "   ✅ Backend is running!" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Backend is NOT running" -ForegroundColor Red
    Write-Host "   Start with: cd server && node server.js" -ForegroundColor Yellow
}

# Check Frontend
Write-Host "`n2. Checking Frontend (Port 3002)..." -ForegroundColor Yellow
try {
    $frontend = Invoke-WebRequest -Uri "http://localhost:3002" -UseBasicParsing -TimeoutSec 2
    Write-Host "   ✅ Frontend is running!" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Frontend is NOT running" -ForegroundColor Red
    Write-Host "   Start with: cd web && npm run dev" -ForegroundColor Yellow
    Write-Host "`n   Starting frontend now..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web'; npm run dev"
    Write-Host "   ⏳ Wait 20-30 seconds for frontend to start..." -ForegroundColor Yellow
    Start-Sleep -Seconds 15
}

# Test Privacy Policy
Write-Host "`n3. Testing Privacy Policy..." -ForegroundColor Yellow
try {
    $privacy = Invoke-WebRequest -Uri "http://localhost:5000/privacy-policyAll" -UseBasicParsing -TimeoutSec 2
    Write-Host "   ✅ Privacy Policy working!" -ForegroundColor Green
    Write-Host "   Status: $($privacy.StatusCode)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Privacy Policy not accessible" -ForegroundColor Red
}

# Open Browser
Write-Host "`n🌐 Opening Browser..." -ForegroundColor Cyan
Start-Sleep -Seconds 2
Start-Process "http://localhost:3002"

Write-Host "`n✅ Check complete!`n" -ForegroundColor Green
Write-Host "📍 URLs to test:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3002" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000/api/health" -ForegroundColor White
Write-Host "   Privacy:  http://localhost:5000/privacy-policyAll" -ForegroundColor White
Write-Host ""
