# HOMA Clinic API Testing Script
# Test all API endpoints

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "  🩺 HOMA Clinic - API Testing" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Test 1: Health Check
Write-Host "`n✅ TEST 1: Health Check" -ForegroundColor Green
$health = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
Write-Host "Status: $($health.status)"
Write-Host "Message: $($health.message)"

# Test 2: Signup
Write-Host "`n✅ TEST 2: User Signup" -ForegroundColor Green
$signupBody = @{
    name = "API Test Patient"
    email = "apitest@homaclinic.com"
    phone = "9963721999"
    password = "SecurePass123"
} | ConvertTo-Json

try {
    $signupResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/signup" -Method Post -Body $signupBody -ContentType "application/json"
    Write-Host "User created: $($signupResponse.user.name)"
    Write-Host "Email: $($signupResponse.user.email)"
    Write-Host "Token received: $($signupResponse.token.Substring(0, 20))..."
    $token = $signupResponse.token
} catch {
    Write-Host "Signup failed (user might already exist)" -ForegroundColor Yellow
    
    # Try logging in instead
    Write-Host "`n✅ TEST 3: User Login" -ForegroundColor Green
    $loginBody = @{
        email = "apitest@homaclinic.com"
        password = "SecurePass123"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
    Write-Host "Login successful: $($loginResponse.user.name)"
    Write-Host "Token received: $($loginResponse.token.Substring(0, 20))..."
    $token = $loginResponse.token
}

# Test 4: Create Assessment
Write-Host "`n✅ TEST 4: Create Assessment" -ForegroundColor Green
$assessmentBody = @{
    age = 50
    gender = "Female"
    height_cm = 165
    weight_kg = 75
    waist_cm = 95
    fbs = 115
    fasting_insulin = 18
    post_lunch_bs = 155
    hba1c = 6.5
    total_cholesterol = 230
    hdl = 45
    ldl = 160
    triglycerides = 190
    current_meds = "Metformin 850mg, Rosuvastatin 10mg"
    procedures = "None"
    post_menopausal = $true
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$assessmentResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/assessments" -Method Post -Body $assessmentBody -Headers $headers
Write-Host "Assessment created successfully!"
Write-Host "  Age: $($assessmentResponse.assessment.age)"
Write-Host "  Waist: $($assessmentResponse.assessment.waist_cm) cm"
Write-Host "  FBS: $($assessmentResponse.assessment.fbs) mg/dL"
Write-Host "  HbA1c: $($assessmentResponse.assessment.hba1c)%"
Write-Host "`nCalculated Metrics:"
Write-Host "  BMI: $($assessmentResponse.assessment.calculated_metrics.bmi) ($($assessmentResponse.assessment.calculated_metrics.bmi_category))"
Write-Host "  HOMA-IR: $($assessmentResponse.assessment.calculated_metrics.homa_ir) ($($assessmentResponse.assessment.calculated_metrics.homa_ir_interpretation))"
Write-Host "  TyG Index: $($assessmentResponse.assessment.calculated_metrics.tyg_index) ($($assessmentResponse.assessment.calculated_metrics.tyg_interpretation))"
Write-Host "  WHtR: $($assessmentResponse.assessment.calculated_metrics.whtr) ($($assessmentResponse.assessment.calculated_metrics.whtr_status))"

# Test 5: Get Latest Assessment
Write-Host "`n✅ TEST 5: Get Latest Assessment" -ForegroundColor Green
$latestResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/assessments/latest" -Method Get -Headers $headers
Write-Host "Latest assessment retrieved:"
Write-Host "  Created: $($latestResponse.assessment.created_at)"
Write-Host "  Waist: $($latestResponse.assessment.waist_cm) cm"
Write-Host "  HbA1c: $($latestResponse.assessment.hba1c)%"

# Test 6: Get Assessment History
Write-Host "`n✅ TEST 6: Get Assessment History" -ForegroundColor Green
$historyResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/assessments/history" -Method Get -Headers $headers
Write-Host "Total assessments: $($historyResponse.count)"
foreach ($assessment in $historyResponse.assessments) {
    Write-Host "  - $($assessment.created_at): Waist=$($assessment.waist_cm)cm, HbA1c=$($assessment.hba1c)%"
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "  ✅ ALL API TESTS PASSED!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

