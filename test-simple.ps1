# Simple test to see raw JSON response

Write-Host "Testing Backend..." -ForegroundColor Cyan

$BASE_URL = "http://localhost:5000/api"

# Login
$loginResponse = Invoke-RestMethod -Uri "$BASE_URL/auth/login" -Method POST -ContentType "application/json" -Body (@{ email = "govindanamo@gmail.com"; password = "password123" } | ConvertTo-Json)

$token = $loginResponse.token
Write-Host "Logged in successfully" -ForegroundColor Green
Write-Host ""

# Get latest assessment
$headers = @{
    "Authorization" = "Bearer $token"
}

$response = Invoke-RestMethod -Uri "$BASE_URL/assessments/latest" -Method GET -Headers $headers

# Display full JSON
Write-Host "Full Response:" -ForegroundColor Yellow
$response | ConvertTo-Json -Depth 10

Write-Host ""
Write-Host "Patient Name: $($response.assessment.patient_name)" -ForegroundColor Cyan
Write-Host "HOMA-IR: $($response.assessment.homa_ir)" -ForegroundColor Cyan
Write-Host "TyG Index: $($response.assessment.tyg_index)" -ForegroundColor Cyan
Write-Host "BMI: $($response.assessment.bmi)" -ForegroundColor Cyan

