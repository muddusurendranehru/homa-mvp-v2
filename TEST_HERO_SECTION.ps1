# Test Hero Section - Complete Pathway
Write-Host "`n🩺 Testing Hero Section - Complete Setup`n" -ForegroundColor Cyan

# Full absolute paths
$projectPath = "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION"
$serverPath = "$projectPath\server"
$webPath = "$projectPath\web"

Write-Host "📍 Project Path: $projectPath" -ForegroundColor Gray
Write-Host "📍 Server Path: $serverPath" -ForegroundColor Gray
Write-Host "📍 Web Path: $webPath`n" -ForegroundColor Gray

# Check Node.js
Write-Host "1. Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   ✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Node.js not found! Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if servers are already running
Write-Host "`n2. Checking if servers are already running..." -ForegroundColor Yellow
$backendRunning = $false
$frontendRunning = $false

try {
    $backend = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    Write-Host "   ✅ Backend is already running on port 5000" -ForegroundColor Green
    $backendRunning = $true
} catch {
    Write-Host "   ⚠️  Backend not running - will start it" -ForegroundColor Yellow
}

try {
    $frontend = Invoke-WebRequest -Uri "http://localhost:3002" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    Write-Host "   ✅ Frontend is already running on port 3002" -ForegroundColor Green
    $frontendRunning = $true
} catch {
    Write-Host "   ⚠️  Frontend not running - will start it" -ForegroundColor Yellow
}

# Start Backend Server if not running
if (-not $backendRunning) {
    Write-Host "`n3. Starting Backend Server (Port 5000)..." -ForegroundColor Yellow
    Write-Host "   Full Path: $serverPath" -ForegroundColor Gray
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$serverPath'; Write-Host '🩺 Backend Server Starting...' -ForegroundColor Cyan; Write-Host 'Working Directory: ' -NoNewline; pwd; node server.js"
    Write-Host "   ⏳ Waiting 5 seconds for backend to start..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
}

# Start Frontend Server if not running
if (-not $frontendRunning) {
    Write-Host "`n4. Starting Frontend Server (Port 3002)..." -ForegroundColor Yellow
    Write-Host "   Full Path: $webPath" -ForegroundColor Gray
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$webPath'; Write-Host '🌐 Frontend Server Starting...' -ForegroundColor Cyan; Write-Host 'Working Directory: ' -NoNewline; pwd; npm run dev"
    Write-Host "   ⏳ Waiting 20 seconds for frontend to build and start..." -ForegroundColor Yellow
    Start-Sleep -Seconds 20
}

# Test Backend
Write-Host "`n5. Testing Backend..." -ForegroundColor Yellow
$backendOk = $false
for ($i = 1; $i -le 5; $i++) {
    try {
        $health = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing -TimeoutSec 3
        Write-Host "   ✅ Backend is running! Status: $($health.StatusCode)" -ForegroundColor Green
        $backendOk = $true
        break
    } catch {
        Write-Host "   ⏳ Attempt $i/5: Backend not ready yet, waiting 3 seconds..." -ForegroundColor Yellow
        Start-Sleep -Seconds 3
    }
}

if (-not $backendOk) {
    Write-Host "   ❌ Backend failed to start. Check the server window for errors." -ForegroundColor Red
}

# Test Frontend
Write-Host "`n6. Testing Frontend..." -ForegroundColor Yellow
$frontendOk = $false
for ($i = 1; $i -le 10; $i++) {
    try {
        $frontend = Invoke-WebRequest -Uri "http://localhost:3002" -UseBasicParsing -TimeoutSec 3
        Write-Host "   ✅ Frontend is running! Status: $($frontend.StatusCode)" -ForegroundColor Green
        $frontendOk = $true
        break
    } catch {
        Write-Host "   ⏳ Attempt $i/10: Frontend not ready yet, waiting 5 seconds..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
    }
}

if (-not $frontendOk) {
    Write-Host "   ❌ Frontend failed to start. Check the server window for errors." -ForegroundColor Red
    Write-Host "   💡 Frontend can take 30-60 seconds to build on first run." -ForegroundColor Yellow
}

# Test Privacy Policy
Write-Host "`n7. Testing Privacy Policy Endpoint..." -ForegroundColor Yellow
try {
    $privacy = Invoke-WebRequest -Uri "http://localhost:5000/privacy-policyAll" -UseBasicParsing -TimeoutSec 3
    Write-Host "   ✅ Privacy Policy working! Status: $($privacy.StatusCode)" -ForegroundColor Green
    Write-Host "   Content Length: $($privacy.Content.Length) bytes" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Privacy Policy not accessible" -ForegroundColor Red
}

# Open Browser
if ($frontendOk) {
    Write-Host "`n🌐 Opening Browser to view Hero Section..." -ForegroundColor Cyan
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:3002"
    
    Write-Host "`n✅ Setup Complete!`n" -ForegroundColor Green
    Write-Host "📍 URLs:" -ForegroundColor Cyan
    Write-Host "   Frontend (Hero Section): http://localhost:3002" -ForegroundColor White
    Write-Host "   Backend Health: http://localhost:5000/api/health" -ForegroundColor White
    Write-Host "   Privacy Policy: http://localhost:5000/privacy-policyAll" -ForegroundColor White
    Write-Host "`n💡 Check the browser to see the hero section design!" -ForegroundColor Yellow
    Write-Host "💡 If it looks ugly, we can redesign it further.`n" -ForegroundColor Yellow
} else {
    Write-Host "`n⚠️  Frontend is still starting. Please wait and then open:" -ForegroundColor Yellow
    Write-Host "   http://localhost:3002" -ForegroundColor Cyan
    Write-Host "`n💡 You can also check the server windows for build progress." -ForegroundColor Gray
}
