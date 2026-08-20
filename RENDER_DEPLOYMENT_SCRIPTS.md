# Render Deployment Scripts Configuration ✅

## Current Scripts Status

### ✅ Frontend (Next.js) - `web/package.json`

**Current Scripts:**
```json
{
  "scripts": {
    "dev": "next dev -p 3002",
    "build": "next build",      // ✅ Correct for Next.js
    "start": "next start",      // ✅ Correct for production
    "lint": "next lint"
  }
}
```

**Render Configuration:**
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Node Version:** 18.x or 20.x
- **Root Directory:** `web` (if deploying separately)

### ✅ Backend (Express) - `server/package.json`

**Current Scripts:**
```json
{
  "scripts": {
    "start": "node server.js",  // ✅ Correct for Express
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": "18.x"              // ✅ Specified
  }
}
```

**Render Configuration:**
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Node Version:** 18.x (as specified)
- **Root Directory:** `server` (if deploying separately)

---

## Render Deployment Settings

### Frontend Service (Next.js)

**Settings:**
```
Name: homa-clinic-frontend
Environment: Node
Build Command: npm install && npm run build
Start Command: npm start
Root Directory: web
Node Version: 18.x or 20.x
```

**Environment Variables:**
```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

### Backend Service (Express)

**Settings:**
```
Name: homa-clinic-backend
Environment: Node
Build Command: npm install
Start Command: npm start
Root Directory: server
Node Version: 18.x
```

**Environment Variables:**
```
DATABASE_URL=postgresql://... (Neon Postgres)
JWT_SECRET=your-secret-key
PORT=5000 (Render sets automatically)
NODE_ENV=production
FRONTEND_URL=https://your-frontend.onrender.com
```

---

## Why Scripts Are Critical

### ❌ Wrong Scripts = Deployment Failure

**If you use wrong scripts:**
- Build fails
- Server doesn't start
- CSS not compiled (ugly website)
- API endpoints don't work

### ✅ Correct Scripts = Success

**With correct scripts:**
- Next.js builds Tailwind CSS during `npm run build`
- Production server starts with `npm start`
- Express server starts with `node server.js`
- Everything works as expected

---

## Verification Checklist

### Frontend Scripts ✅
- [x] `"build": "next build"` - Compiles Next.js + Tailwind
- [x] `"start": "next start"` - Starts production server
- [x] `"dev": "next dev -p 3002"` - Development server

### Backend Scripts ✅
- [x] `"start": "node server.js"` - Starts Express server
- [x] `"dev": "nodemon server.js"` - Development with auto-reload
- [x] `"engines": { "node": "18.x" }` - Node version specified

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Using `npm run dev` in Production
```json
// WRONG for Render:
"start": "npm run dev"  // ❌ This is for development only
```

### ❌ Mistake 2: Missing Build Step
```json
// WRONG - No build command:
"start": "next dev"  // ❌ Tailwind won't compile
```

### ❌ Mistake 3: Wrong Start Command
```json
// WRONG for Express:
"start": "nodemon server.js"  // ❌ Nodemon not in production
```

### ✅ Correct Approach
```json
// Frontend:
"build": "next build",   // ✅ Compiles everything
"start": "next start"    // ✅ Production server

// Backend:
"start": "node server.js" // ✅ Production server
```

---

## Render Build Process

### Frontend Build Flow:
1. **Install:** `npm install` - Installs dependencies
2. **Build:** `npm run build` - Compiles Next.js + Tailwind CSS
3. **Start:** `npm start` - Serves production build

### Backend Build Flow:
1. **Install:** `npm install` - Installs dependencies
2. **Start:** `npm start` - Runs `node server.js`

---

## Testing Before Deploy

### Test Frontend Build Locally:
```powershell
cd web
npm run build
npm start
# Open http://localhost:3000
# Should see styled website (not ugly)
```

### Test Backend Locally:
```powershell
cd server
npm start
# Test: http://localhost:5000/api/health
# Should return: {"status":"ok",...}
```

---

## Privacy Policy Route

**Backend Route:** `/privacy-policyAll`
**File:** `server/public/privacy-policy.html`
**Status:** ✅ Ready for deployment

**Test:**
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/privacy-policyAll"
# Should return HTML with status 200
```

---

## Summary

✅ **Frontend Scripts:** Correct for Next.js + Tailwind
✅ **Backend Scripts:** Correct for Express
✅ **Privacy Policy:** Updated and ready
✅ **File Size:** 3.69 KB (under 5KB limit)

**Your scripts are production-ready!** 🚀

---

**Last Updated:** January 22, 2026
**Status:** ✅ All scripts verified and correct
