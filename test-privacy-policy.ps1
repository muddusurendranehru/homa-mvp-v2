# Test Privacy Policy Endpoint
Write-Host "`n🔍 Testing Privacy Policy Endpoint...`n" -ForegroundColor Cyan

# Wait for servers to be ready
Write-Host "Waiting 5 seconds for servers to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Test Backend Health
Write-Host "`n1. Testing Backend Health Check..." -ForegroundColor Cyan
try {
    $health = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing
    Write-Host "   ✅ Backend is running! Status: $($health.StatusCode)" -ForegroundColor Green
    Write-Host "   Response: $($health.Content)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Backend not responding: $_" -ForegroundColor Red
    Write-Host "   Make sure backend is running on port 5000" -ForegroundColor Yellow
}

# Test Privacy Policy
Write-Host "`n2. Testing Privacy Policy Endpoint..." -ForegroundColor Cyan
try {
    $privacy = Invoke-WebRequest -Uri "http://localhost:5000/privacy-policyAll" -UseBasicParsing
    Write-Host "   ✅ Privacy Policy loaded! Status: $($privacy.StatusCode)" -ForegroundColor Green
    Write-Host "   Content-Type: $($privacy.Headers['Content-Type'])" -ForegroundColor Gray
    Write-Host "   Content Length: $($privacy.Content.Length) bytes" -ForegroundColor Gray
    
    # Check for key content
    if ($privacy.Content -match "Privacy Policy for HOMA Clinic MVP") {
        Write-Host "   ✅ Privacy Policy title found!" -ForegroundColor Green
    }
    if ($privacy.Content -match "Dr. Muddu Surendra Nehru") {
        Write-Host "   ✅ Developer contact found!" -ForegroundColor Green
    }
    if ($privacy.Content -match "DPDPA") {
        Write-Host "   ✅ DPDPA compliance mentioned!" -ForegroundColor Green
    }
    
    Write-Host "`n   📄 Open in browser: http://localhost:5000/privacy-policyAll" -ForegroundColor Cyan
} catch {
    Write-Host "   ❌ Privacy Policy endpoint failed: $_" -ForegroundColor Red
    Write-Host "   Make sure the file exists at: server/public/privacy-policy.html" -ForegroundColor Yellow
}

# Test Frontend
Write-Host "`n3. Testing Frontend..." -ForegroundColor Cyan
try {
    $frontend = Invoke-WebRequest -Uri "http://localhost:3002" -UseBasicParsing -TimeoutSec 3
    Write-Host "   ✅ Frontend is running! Status: $($frontend.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  Frontend not responding (may still be starting)" -ForegroundColor Yellow
    Write-Host "   Frontend should be on: http://localhost:3002" -ForegroundColor Gray
}

Write-Host "`n✅ Testing complete!`n" -ForegroundColor Green
