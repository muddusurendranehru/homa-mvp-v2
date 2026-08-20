# Git Push Script for HOMA Clinic MVP
# Run this script to push all calculator CTA changes to GitHub

Write-Host "🚀 Pushing changes to GitHub..." -ForegroundColor Green
Write-Host ""

# Check git status
Write-Host "📋 Checking git status..." -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "📦 Adding all changes..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "💾 Committing changes..." -ForegroundColor Cyan
git commit -m "Add soft CTAs to all calculator tools - guide users to 90-day remission plan"

Write-Host ""
Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

Write-Host ""
Write-Host "✅ Done! Changes pushed to GitHub" -ForegroundColor Green
