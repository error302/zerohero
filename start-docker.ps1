# Start KCSE Prep App in Docker
Write-Host "🚀 Starting KCSE Prep Academy in Docker..." -ForegroundColor Green

# Check if container exists
$container = docker ps -a --filter "name=kcse-prep" --format "{{.Names}}"

if ($container -eq "kcse-prep") {
    Write-Host "Container exists, removing old one..." -ForegroundColor Yellow
    docker rm -f kcse-prep | Out-Null
}

# Run new container
Write-Host "Starting container on port 3001..." -ForegroundColor Cyan
docker run -d -p 3001:3000 --name kcse-prep kcse-prep-app

# Wait for container to start
Start-Sleep -Seconds 3

# Check status
$status = docker ps --filter "name=kcse-prep" --format "{{.Status}}"
if ($status) {
    Write-Host "`n✅ KCSE Prep Academy is running!" -ForegroundColor Green
    Write-Host "🌐 Open: http://localhost:3001" -ForegroundColor Cyan
    Write-Host "`nTo stop: docker stop kcse-prep" -ForegroundColor Gray
    Write-Host "To view logs: docker logs kcse-prep" -ForegroundColor Gray
    
    # Open in browser
    Start-Process "http://localhost:3001"
} else {
    Write-Host "❌ Failed to start container" -ForegroundColor Red
    docker logs kcse-prep
}
