# PowerShell Commands Reference

## Navigation

```powershell
# Navigate to project root
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION

# Navigate to web directory
cd web

# Navigate to server directory
cd ..\server
```

## Testing API Endpoints

### Test GET Request (PowerShell)
```powershell
# Test submit-lead API
Invoke-WebRequest -Uri "http://localhost:3002/api/submit-lead" -Method GET | Select-Object -ExpandProperty Content

# Test backend health
Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method GET | Select-Object -ExpandProperty Content
```

### Test POST Request (PowerShell)
```powershell
$body = @{
    fullName = "Test User"
    email = "test@example.com"
    age = "30"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3002/api/submit-lead" -Method POST -Body $body -ContentType "application/json" | Select-Object -ExpandProperty Content
```

### Or Use Browser
Just open in browser:
- `http://localhost:3002/api/submit-lead` (GET)
- `http://localhost:5000/api/health` (GET)

## NPM Commands

### Clean Install (PowerShell)
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web

# Remove node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue

# Install dependencies
npm install

# Build
npm run build

# Start dev server
npm run dev
```

## Start Servers

### Backend (Terminal 1)
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```

### Frontend (Terminal 2)
```powershell
cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```

## Common PowerShell vs Bash Differences

| Bash | PowerShell |
|------|------------|
| `rm -rf folder` | `Remove-Item -Recurse -Force folder` |
| `cd folder && command` | `cd folder; command` |
| `curl http://url` | `Invoke-WebRequest -Uri http://url` |
| `&&` | `;` (semicolon) |

## Quick Test Script

Save as `test-api.ps1`:
```powershell
# Test Frontend API
Write-Host "Testing Frontend API..." -ForegroundColor Green
$response = Invoke-WebRequest -Uri "http://localhost:3002/api/submit-lead" -Method GET
Write-Host $response.Content

# Test Backend Health
Write-Host "`nTesting Backend Health..." -ForegroundColor Green
$response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method GET
Write-Host $response.Content
```

Run with:
```powershell
.\test-api.ps1
```

