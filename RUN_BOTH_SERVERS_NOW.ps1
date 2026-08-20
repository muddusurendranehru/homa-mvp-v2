# Run Both Servers - Complete PowerShell Script
# This script starts both backend and frontend servers in separate windows

$projectRoot = "C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION"

Write-Host ""
Write-Host "=== Starting HOMA Clinic Servers ===" -ForegroundColor Green
Write-Host ""

# Start Backend Server (Port 5000)
Write-Host "Starting Backend Server on port 5000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\server'; Write-Host 'Backend Server (Port 5000) Starting...' -ForegroundColor Green; npm run dev"

# Wait a moment
Start-Sleep -Seconds 2

# Start Frontend Server (Port 3002)
Write-Host "Starting Frontend Server on port 3002..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\web'; Write-Host 'Frontend Server (Port 3002) Starting...' -ForegroundColor Cyan; npm run dev"

# Wait a moment
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "Both servers are starting in separate windows!" -ForegroundColor Green
Write-Host ""
Write-Host "Access URLs:" -ForegroundColor Yellow
Write-Host "  Backend API:  http://localhost:5000/api/health" -ForegroundColor White
Write-Host "  Frontend:     http://localhost:3002" -ForegroundColor White
Write-Host ""
Write-Host "Tip: Keep both PowerShell windows open while developing" -ForegroundColor Gray
Write-Host "To stop: Close the PowerShell windows or press Ctrl+C in each window" -ForegroundColor Gray
Write-Host ""
