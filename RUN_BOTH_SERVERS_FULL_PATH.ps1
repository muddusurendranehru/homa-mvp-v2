# PowerShell Script to Run Both Servers with Full Paths
# Frontend: Next.js on port 3002
# Backend: Express on port 5000

$projectRoot = "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION"
$webPath = Join-Path $projectRoot "web"
$serverPath = Join-Path $projectRoot "server"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Both Servers" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if directories exist
if (-not (Test-Path $webPath)) {
    Write-Host "ERROR: Web directory not found at: $webPath" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $serverPath)) {
    Write-Host "ERROR: Server directory not found at: $serverPath" -ForegroundColor Red
    exit 1
}

# Start Backend Server (Port 5000)
Write-Host "Starting Backend Server on port 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$serverPath'; Write-Host 'Backend Server - Port 5000' -ForegroundColor Green; Write-Host 'Path: $serverPath' -ForegroundColor Gray; Write-Host ''; npm start"

# Wait 2 seconds before starting frontend
Start-Sleep -Seconds 2

# Start Frontend Server (Port 3002)
Write-Host "Starting Frontend Server on port 3002..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$webPath'; Write-Host 'Frontend Server - Port 3002' -ForegroundColor Green; Write-Host 'Path: $webPath' -ForegroundColor Gray; Write-Host ''; npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Servers Starting..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3002" -ForegroundColor Green
Write-Host ""
Write-Host "Health Check:" -ForegroundColor Yellow
Write-Host "  Backend:  http://localhost:5000/api/health" -ForegroundColor Gray
Write-Host "  Frontend: http://localhost:3002" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to exit this window (servers will continue running)..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
