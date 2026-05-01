# Stop KCSE Prep App Docker Container
Write-Host "🛑 Stopping KCSE Prep Academy..." -ForegroundColor Yellow
docker stop kcse-prep
docker rm kcse-prep
Write-Host "✅ Container stopped and removed" -ForegroundColor Green
