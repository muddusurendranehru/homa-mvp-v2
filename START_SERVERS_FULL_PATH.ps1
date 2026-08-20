# Start Both Servers for HOMA Clinic MVP - Using Full Absolute Paths
Write-Host "`n🩺 Starting HOMA Clinic MVP Servers...`n" -ForegroundColor Cyan

# Full absolute paths
$serverPath = "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"
$webPath = "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found! Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Start Backend Server (Port 5000)
Write-Host "`n📡 Starting Backend Server (Port 5000)..." -ForegroundColor Yellow
Write-Host "   Full Path: $serverPath" -ForegroundColor Gray
$backendCmd = "cd '$serverPath'; Write-Host '🩺 Backend Server Starting...' -ForegroundColor Cyan; Write-Host 'Working Directory: ' -NoNewline; pwd; node server.js"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCmd

# Wait a moment
Start-Sleep -Seconds 2

# Start Frontend Server (Port 3002)
Write-Host "🌐 Starting Frontend Server (Port 3002)..." -ForegroundColor Yellow
Write-Host "   Full Path: $webPath" -ForegroundColor Gray
$frontendCmd = "cd '$webPath'; Write-Host '🌐 Frontend Server Starting...' -ForegroundColor Cyan; Write-Host 'Working Directory: ' -NoNewline; pwd; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCmd

Write-Host "`n✅ Both servers are starting in separate windows!" -ForegroundColor Green
Write-Host "`n📍 URLs:" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "   Frontend: http://localhost:3002" -ForegroundColor White
Write-Host "   Privacy:  http://localhost:5000/privacy-policyAll" -ForegroundColor White
Write-Host "`n⏳ Wait 10-15 seconds for servers to fully start..." -ForegroundColor Yellow
Write-Host "`n💡 Run '.\test-privacy-policy.ps1' to test the privacy policy endpoint`n" -ForegroundColor Cyan
