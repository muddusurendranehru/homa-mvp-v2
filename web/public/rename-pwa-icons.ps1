# Run from web/public/ after copying android-chrome-192x192.png and android-chrome-512x512.png
# Renames them to icon-192x192.png and icon-512x512.png for PWA manifest

$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $dir

if (Test-Path "android-chrome-192x192.png") {
  Copy-Item "android-chrome-192x192.png" "icon-192x192.png" -Force
  Remove-Item "android-chrome-192x192.png"
  Write-Host "Renamed android-chrome-192x192.png to icon-192x192.png"
} else {
  Write-Host "android-chrome-192x192.png not found in web/public/"
}

if (Test-Path "android-chrome-512x512.png") {
  Copy-Item "android-chrome-512x512.png" "icon-512x512.png" -Force
  Remove-Item "android-chrome-512x512.png"
  Write-Host "Renamed android-chrome-512x512.png to icon-512x512.png"
} else {
  Write-Host "android-chrome-512x512.png not found in web/public/"
}
