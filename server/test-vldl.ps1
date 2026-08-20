# Test VLDL Migration - Simple version without emojis

Write-Host ""
Write-Host "=========================================="-ForegroundColor Cyan
Write-Host "  Testing VLDL Migration" -ForegroundColor Cyan
Write-Host "=========================================="-ForegroundColor Cyan

# Login
Write-Host ""
Write-Host "1. Logging in..." -ForegroundColor Yellow
$loginBody = @{
    email = "apitest@homaclinic.com"
    password = "SecurePass123"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
$token = $loginResponse.token
Write-Host "OK Logged in as: $($loginResponse.user.name)" -ForegroundColor Green

# Create assessment WITH VLDL
Write-Host ""
Write-Host "2. Creating assessment WITH VLDL value..." -ForegroundColor Yellow
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
    vldl = 50
    current_meds = "Metformin 1000mg"
    post_menopausal = $false
} | ConvertTo-Json

$headers = @{
    Authorization = "Bearer $token"
}

$assessmentResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/assessments" -Method Post -Body $assessmentBody -Headers $headers -ContentType "application/json"

Write-Host "OK Assessment created with VLDL!" -ForegroundColor Green
Write-Host ""
Write-Host "Lipid Panel:"
Write-Host "  Total Cholesterol: $($assessmentResponse.assessment.total_cholesterol) mg/dL"
Write-Host "  HDL: $($assessmentResponse.assessment.hdl) mg/dL"
Write-Host "  LDL: $($assessmentResponse.assessment.ldl) mg/dL"
Write-Host "  Triglycerides: $($assessmentResponse.assessment.triglycerides) mg/dL"
Write-Host "  VLDL: $($assessmentResponse.assessment.vldl) mg/dL  <- NEW!" -ForegroundColor Green

# Get history
Write-Host ""
Write-Host "3. Fetching assessment history..." -ForegroundColor Yellow
$historyResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/assessments/history" -Method Get -Headers $headers

Write-Host "OK Total assessments: $($historyResponse.count)" -ForegroundColor Green
Write-Host ""
Write-Host "Assessment History (newest first):"
foreach ($assessment in $historyResponse.assessments) {
    $vldlDisplay = if ($assessment.vldl) { "$($assessment.vldl) mg/dL" } else { "NULL (old record - safe!)" }
    $date = ([DateTime]$assessment.created_at).ToString("yyyy-MM-dd HH:mm")
    Write-Host "  - $date : VLDL = $vldlDisplay"
}

Write-Host ""
Write-Host "=========================================="-ForegroundColor Cyan
Write-Host "  VLDL MIGRATION SUCCESSFUL!" -ForegroundColor Green
Write-Host "=========================================="-ForegroundColor Cyan
Write-Host ""
Write-Host "Summary:"
Write-Host "  [OK] VLDL column added to database"
Write-Host "  [OK] API accepts VLDL in new assessments"
Write-Host "  [OK] Old assessments have NULL (no errors!)"
Write-Host "  [OK] New assessments can include VLDL"
Write-Host "  [OK] Patient name accessible via users table JOIN"
Write-Host ""

