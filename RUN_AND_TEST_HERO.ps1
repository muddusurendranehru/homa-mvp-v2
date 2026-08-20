# Run Both Servers and Test Hero Section
$projectPath = "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION"
$serverPath = "$projectPath\server"
$webPath = "$projectPath\web"

Write-Host ""
Write-Host "Starting Both Servers..." -ForegroundColor Cyan
Write-Host ""

# Start Backend
Write-Host "Starting Backend (Port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$serverPath'; node server.js"
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Starting Frontend (Port 3002)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$webPath'; npm run dev"
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "Waiting 25 seconds for servers to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 25

# Test Backend
Write-Host ""
Write-Host "Testing Backend..." -ForegroundColor Cyan
try {
    $health = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing -TimeoutSec 3
    Write-Host "Backend: OK - Status $($health.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Backend: Not ready yet" -ForegroundColor Yellow
}

# Test Frontend
Write-Host "Testing Frontend..." -ForegroundColor Cyan
try {
    $frontend = Invoke-WebRequest -Uri "http://localhost:3002" -UseBasicParsing -TimeoutSec 3
    Write-Host "Frontend: OK - Status $($frontend.StatusCode)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Opening browser..." -ForegroundColor Cyan
    Start-Process "http://localhost:3002"
} catch {
    Write-Host "Frontend: Still building (may take 30-60 seconds)" -ForegroundColor Yellow
    Write-Host "Open manually: http://localhost:3002" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Check the browser to see the hero section!" -ForegroundColor Green
Write-Host "If it looks ugly, let me know and I'll redesign it." -ForegroundColor Yellow
Write-Host ""
