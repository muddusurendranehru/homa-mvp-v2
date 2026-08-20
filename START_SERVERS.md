# 🚀 Server Startup Guide

## Starting Both Servers

### Option 1: Separate Terminal Windows

**Terminal 1 - Frontend (Next.js):**
```bash
cd web
npm run dev
```
Runs on: http://localhost:3002

**Terminal 2 - Backend (Express):**
```bash
cd server
npm run dev
```
Runs on: http://localhost:3001 (or configured port)

### Option 2: PowerShell Background Jobs

```powershell
# Start frontend
cd web
Start-Job -ScriptBlock { npm run dev } -Name "Frontend"

# Start backend  
cd server
Start-Job -ScriptBlock { npm run dev } -Name "Backend"

# Check status
Get-Job

# View logs
Receive-Job -Name "Frontend"
Receive-Job -Name "Backend"
```

### Option 3: Using npm-run-all (if installed)

Create root package.json:
```json
{
  "scripts": {
    "dev": "npm-run-all --parallel dev:*",
    "dev:web": "cd web && npm run dev",
    "dev:server": "cd server && npm run dev"
  }
}
```

Then run: `npm run dev`

## Testing Checklist

### Frontend (http://localhost:3002)
- ✅ Home page loads
- ✅ `/admin/gallery` - Upload, Edit, Delete, Reorder
- ✅ `/gallery` - Public gallery displays
- ✅ Footer UPI WhatsApp link works
- ✅ All pages load without errors

### Backend (http://localhost:3001)
- ✅ API endpoints respond
- ✅ Database connection works
- ✅ Gallery routes functional

## Render Deployment Notes

### Environment Variables Required:
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV=production`

### Drizzle Fixes Applied:
- ✅ All routes use Drizzle query builder (not raw SQL)
- ✅ Proper `eq()` usage for WHERE clauses
- ✅ Connection pool handles SSL automatically
- ✅ Error handling for missing DATABASE_URL

