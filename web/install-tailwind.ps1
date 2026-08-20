# Script to install Tailwind CSS packages
# This fixes the npm offline mode issue

Write-Host "=== Installing Tailwind CSS Packages ===" -ForegroundColor Cyan
Write-Host ""

# Remove the offline environment variable
$env:npm_config_offline = $null
[Environment]::SetEnvironmentVariable("npm_config_offline", $null, "Process")

Write-Host "Removed npm offline mode restriction" -ForegroundColor Green
Write-Host ""

# Install packages
Write-Host "Installing tailwindcss, postcss, autoprefixer..." -ForegroundColor Yellow
npm install -D tailwindcss postcss autoprefixer

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Packages installed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Restart your dev server (npm run dev)" -ForegroundColor Gray
    Write-Host "2. Open http://localhost:3002 in your browser" -ForegroundColor Gray
} else {
    Write-Host ""
    Write-Host "❌ Installation failed. Try running PowerShell as Administrator." -ForegroundColor Red
}
