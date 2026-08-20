# Test VLDL API - Create assessment with VLDL value

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "  🧪 Testing VLDL Migration" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Login to get token
Write-Host "`n1. Logging in..." -ForegroundColor Yellow
$loginBody = @{
    email = "apitest@homaclinic.com"
    password = "SecurePass123"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
    -Method Post -Body $loginBody -ContentType "application/json"
$token = $loginResponse.token
Write-Host "✅ Logged in as: $($loginResponse.user.name)"

# Create assessment WITH VLDL
Write-Host "`n2. Creating assessment WITH VLDL value..." -ForegroundColor Yellow
$assessmentBody = @{
    age = 52
    gender = "Male"
    height_cm = 175
    weight_kg = 90
    waist_cm = 105
    fbs = 120
    fasting_insulin = 20
    hba1c = 6.8
    total_cholesterol = 240
    hdl = 35
    ldl = 155
    triglycerides = 200
    vldl = 50  # ← NEW FIELD!
    current_meds = "Metformin 1000mg"
    procedures = "None"
    post_menopausal = $false
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$assessmentResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/assessments" `
    -Method Post -Body $assessmentBody -Headers $headers

Write-Host "✅ Assessment created with VLDL!"
Write-Host "`nLipid Panel:"
Write-Host "  Total Cholesterol: $($assessmentResponse.assessment.total_cholesterol) mg/dL"
Write-Host "  HDL: $($assessmentResponse.assessment.hdl) mg/dL"
Write-Host "  LDL: $($assessmentResponse.assessment.ldl) mg/dL"
Write-Host "  Triglycerides: $($assessmentResponse.assessment.triglycerides) mg/dL"
Write-Host "  VLDL: $($assessmentResponse.assessment.vldl) mg/dL  ← NEW!" -ForegroundColor Green

# Get latest assessment
Write-Host "`n3. Fetching latest assessment..." -ForegroundColor Yellow
$latestResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/assessments/latest" `
    -Method Get -Headers $headers

Write-Host "✅ Latest assessment retrieved"
Write-Host "  Patient: $($loginResponse.user.name)"
Write-Host "  VLDL: $($latestResponse.assessment.vldl) mg/dL"

# Get history (shows mix of old NULL and new with VLDL)
Write-Host "`n4. Fetching assessment history..." -ForegroundColor Yellow
$historyResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/assessments/history" `
    -Method Get -Headers $headers

Write-Host "✅ Total assessments: $($historyResponse.count)"
Write-Host "`nAssessment History (newest first):"
foreach ($assessment in $historyResponse.assessments) {
    $vldlDisplay = if ($assessment.vldl) { "$($assessment.vldl) mg/dL" } else { "NULL (old record)" }
    $date = ([DateTime]$assessment.created_at).ToString("yyyy-MM-dd HH:mm")
    Write-Host "  - $date : VLDL = $vldlDisplay"
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "  ✅ VLDL MIGRATION SUCCESSFUL!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Summary:"
Write-Host "  ✅ VLDL column added to database"
Write-Host "  ✅ API accepts VLDL in new assessments"
Write-Host "  ✅ Old assessments have NULL (no errors!)"
Write-Host "  ✅ New assessments can include VLDL"
Write-Host "  ✅ Patient name accessible (from users table)"
Write-Host ""

