# PowerShell script to test HOMA-IR and TyG formulas with patient name

Write-Host "🧪 Testing Backend Formulas & Patient Name" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$BASE_URL = "http://localhost:5000/api"

# Step 1: Login
Write-Host "1️⃣  Logging in as govindanamo@gmail.com..." -ForegroundColor Yellow
$loginResponse = Invoke-RestMethod -Uri "$BASE_URL/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body (@{
        email = "govindanamo@gmail.com"
        password = "password123"
    } | ConvertTo-Json)

if ($loginResponse.token) {
    Write-Host "   ✅ Login successful!" -ForegroundColor Green
    $token = $loginResponse.token
    Write-Host "   Token: $($token.Substring(0,20))..." -ForegroundColor Gray
} else {
    Write-Host "   ❌ Login failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 2: Fetch Latest Assessment
Write-Host "2️⃣  Fetching latest assessment..." -ForegroundColor Yellow
try {
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }
    
    $assessment = Invoke-RestMethod -Uri "$BASE_URL/assessments/latest" `
        -Method GET `
        -Headers $headers
    
    Write-Host "   ✅ Assessment fetched successfully!" -ForegroundColor Green
    Write-Host ""
    
    # Display Patient Name
    Write-Host "👤 Patient Information:" -ForegroundColor Cyan
    Write-Host "   Name: $($assessment.assessment.patient_name)" -ForegroundColor White
    Write-Host ""
    
    # Display Raw Values
    Write-Host "📊 Raw Laboratory Values:" -ForegroundColor Cyan
    Write-Host "   FBS (Fasting Blood Sugar): $($assessment.assessment.fbs) mg/dL" -ForegroundColor White
    Write-Host "   Fasting Insulin: $($assessment.assessment.fasting_insulin) μU/mL" -ForegroundColor White
    Write-Host "   Triglycerides: $($assessment.assessment.triglycerides) mg/dL" -ForegroundColor White
    Write-Host "   Height: $($assessment.assessment.height_cm) cm" -ForegroundColor White
    Write-Host "   Weight: $($assessment.assessment.weight_kg) kg" -ForegroundColor White
    Write-Host "   Waist: $($assessment.assessment.waist_cm) cm" -ForegroundColor White
    Write-Host ""
    
    # Display Calculated Metrics
    Write-Host "🧮 Calculated Metabolic Metrics:" -ForegroundColor Cyan
    
    # HOMA-IR
    if ($assessment.assessment.homa_ir -ne $null) {
        Write-Host "   HOMA-IR: $($assessment.assessment.homa_ir)" -ForegroundColor Green
        Write-Host "   Formula: (FBS * Fasting Insulin) / 405" -ForegroundColor Gray
        Write-Host "   = ($($assessment.assessment.fbs) * $($assessment.assessment.fasting_insulin)) / 405" -ForegroundColor Gray
        $manual_homa = ($assessment.assessment.fbs * $assessment.assessment.fasting_insulin) / 405
        Write-Host "   Manual Check: $([Math]::Round($manual_homa, 2))" -ForegroundColor Gray
        Write-Host "   Interpretation: $($assessment.assessment.homa_ir_interpretation)" -ForegroundColor White
    } else {
        Write-Host "   ❌ HOMA-IR: Not calculated (missing values)" -ForegroundColor Red
    }
    Write-Host ""
    
    # TyG Index
    if ($assessment.assessment.tyg_index -ne $null) {
        Write-Host "   TyG Index: $($assessment.assessment.tyg_index)" -ForegroundColor Green
        Write-Host "   Formula: ln[(Triglycerides * FBS) / 2]" -ForegroundColor Gray
        Write-Host "   = ln[($($assessment.assessment.triglycerides) * $($assessment.assessment.fbs)) / 2]" -ForegroundColor Gray
        $manual_tyg = [Math]::Log(($assessment.assessment.triglycerides * $assessment.assessment.fbs) / 2)
        Write-Host "   Manual Check: $([Math]::Round($manual_tyg, 2))" -ForegroundColor Gray
        Write-Host "   Interpretation: $($assessment.assessment.tyg_interpretation)" -ForegroundColor White
    } else {
        Write-Host "   ❌ TyG Index: Not calculated (missing values)" -ForegroundColor Red
    }
    Write-Host ""
    
    # BMI
    if ($assessment.assessment.bmi -ne $null) {
        Write-Host "   BMI: $($assessment.assessment.bmi)" -ForegroundColor Green
        Write-Host "   Formula: Weight / (Height in meters)²" -ForegroundColor Gray
        $heightM = $assessment.assessment.height_cm / 100
        Write-Host "   = $($assessment.assessment.weight_kg) / ($heightM)²" -ForegroundColor Gray
        $manual_bmi = $assessment.assessment.weight_kg / ($heightM * $heightM)
        Write-Host "   Manual Check: $([Math]::Round($manual_bmi, 2))" -ForegroundColor Gray
        Write-Host "   Category: $($assessment.assessment.bmi_category)" -ForegroundColor White
    } else {
        Write-Host "   ❌ BMI: Not calculated (missing values)" -ForegroundColor Red
    }
    Write-Host ""
    
    # Summary
    Write-Host "📋 Test Summary:" -ForegroundColor Cyan
    $passed = 0
    $total = 4
    
    if ($assessment.assessment.patient_name) {
        Write-Host "   ✅ Patient name displayed" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "   ❌ Patient name missing" -ForegroundColor Red
    }
    
    if ($assessment.assessment.homa_ir -ne $null) {
        Write-Host "   ✅ HOMA-IR calculated" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "   ❌ HOMA-IR not calculated" -ForegroundColor Red
    }
    
    if ($assessment.assessment.tyg_index -ne $null) {
        Write-Host "   ✅ TyG Index calculated" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "   ❌ TyG Index not calculated" -ForegroundColor Red
    }
    
    if ($assessment.assessment.bmi -ne $null) {
        Write-Host "   ✅ BMI calculated" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "   ❌ BMI not calculated" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "   Score: $passed / $total tests passed" -ForegroundColor $(if ($passed -eq $total) { "Green" } else { "Yellow" })
    Write-Host ""
    
} catch {
    Write-Host "   ❌ Error fetching assessment: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Response: $($_.ErrorDetails.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. If tests pass, restart frontend: cd web; npm run dev" -ForegroundColor White
Write-Host "   2. Refresh browser dashboard to see patient name and formulas" -ForegroundColor White
Write-Host "   3. All metrics should show values instead of N/A" -ForegroundColor White
Write-Host ""

