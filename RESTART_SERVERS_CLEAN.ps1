# Clean Restart of Both Servers
Write-Host ""
Write-Host "Fixing Stuck Build - Clean Restart" -ForegroundColor Cyan
Write-Host ""

# Stop all Node processes
Write-Host "1. Stopping all Node processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2
Write-Host "   All Node processes stopped" -ForegroundColor Green

# Wait
Write-Host ""
Write-Host "2. Waiting 3 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start Backend
Write-Host ""
Write-Host "3. Starting Backend Server..." -ForegroundColor Yellow
$serverPath = "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"
$backendCmd = "cd '$serverPath'; Write-Host 'Backend Starting...' -ForegroundColor Cyan; node server.js"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCmd
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "4. Starting Frontend Server..." -ForegroundColor Yellow
$webPath = "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"
$frontendCmd = "cd '$webPath'; Write-Host 'Frontend Starting...' -ForegroundColor Cyan; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCmd

Write-Host ""
Write-Host "Servers restarted!" -ForegroundColor Green
Write-Host ""
Write-Host "Wait 30-45 seconds for frontend to build..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Test URLs:" -ForegroundColor Cyan
Write-Host "   Backend: http://localhost:5000/api/health" -ForegroundColor White
Write-Host "   Frontend: http://localhost:3002" -ForegroundColor White
Write-Host "   Privacy: http://localhost:5000/privacy-policyAll" -ForegroundColor White
Write-Host ""
