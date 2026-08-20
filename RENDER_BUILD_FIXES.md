# 🔧 Render Build Fixes - Complete Guide

## Issues Fixed

### 1. ✅ Node.js Version (18.x)
**Problem:** Render was using Node 22.x, causing build failures

**Solution:**
- Created `web/.nvmrc` with `18`
- Created `web/.node-version` with `18`
- Created `web/render.yaml` with `nodeVersion: 18`

**In Render Dashboard:**
1. Go to your service → Settings
2. Under "Environment", set:
   - **Node Version:** `18.x` (or `18`)

### 2. ✅ React/React-DOM Versions
**Problem:** React 19.0.0 incompatible with Next.js 14.2.0

**Fixed in `web/package.json`:**
```json
"react": "^18.2.0",
"react-dom": "^18.2.0",
"next": "14.2.0"
```

**Action Required:**
```bash
cd web
rm -rf node_modules package-lock.json
npm install
```

### 3. ✅ Package.json Merge Conflict
**Problem:** Merge conflict markers in package.json

**Fixed:** Removed conflict markers, kept `@neondatabase/serverless: ^1.0.2`

### 4. ✅ page.tsx - No Client Code at Top Level
**Status:** ✅ Already correct
- `web/app/page.tsx` is a server component (no "use client")
- Uses `export default function HomePage()` correctly
- No hooks or client-side code at top level

### 5. ✅ API Route - No Default Export
**Status:** ✅ Already correct
- `web/app/api/submit-lead/route.ts` uses:
  - `export async function POST()` ✅
  - `export async function GET()` ✅
  - No `export default` ✅

## Render Configuration

### Option 1: Use render.yaml (Recommended)
The `web/render.yaml` file will automatically configure:
- Node version: 18
- Build command: `npm install && npm run build`
- Start command: `npm start`

### Option 2: Manual Configuration in Render Dashboard

**Settings to Configure:**
1. **Node Version:** `18.x`
2. **Build Command:** `npm install && npm run build`
3. **Start Command:** `npm start`
4. **Root Directory:** `web` (if deploying from root repo)

**Environment Variables:**
- `DATABASE_URL` or `NEON_DATABASE_URL` (your Neon connection string)
- `NEXT_PUBLIC_API_URL` (your backend API URL, e.g., `https://your-backend.onrender.com/api`)
- `NODE_ENV` = `production` (auto-set by Render)

## Build Commands for Render

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Root Directory:**
- If deploying from root: `web`
- If deploying from `web/` folder: leave blank

## Verification Checklist

Before deploying to Render:

- [ ] `web/.nvmrc` exists with `18`
- [ ] `web/package.json` has React 18.2.0 (not 19.0.0)
- [ ] `web/package.json` has Next.js 14.2.0 (not 15.1.6)
- [ ] No merge conflict markers in package.json
- [ ] `web/app/page.tsx` is server component (no "use client")
- [ ] `web/app/api/submit-lead/route.ts` has no default export
- [ ] Run `npm install` locally to verify dependencies
- [ ] Run `npm run build` locally to verify build succeeds

## Local Test Before Deploy

```bash
cd web
rm -rf node_modules package-lock.json
npm install
npm run build
```

If build succeeds locally, it should work on Render.

## Common Render Build Errors & Fixes

### Error: "Module not found: Can't resolve 'react'"
**Fix:** Ensure `react` and `react-dom` are in `dependencies` (not devDependencies)

### Error: "Next.js version mismatch"
**Fix:** Use Next.js 14.2.0 (not 15.x) with React 18.2.0

### Error: "Node version incompatible"
**Fix:** Set Node 18.x in Render settings or use `.nvmrc` file

### Error: "Route not found" during build
**Fix:** Ensure all API routes use `export async function` (not `export default`)

## After Deployment

1. **Test Homepage:** `https://your-app.onrender.com/`
2. **Test API Route:** `https://your-app.onrender.com/api/submit-lead` (GET)
3. **Test Form:** Submit form and verify data saves to Neon DB
4. **Check Logs:** Render Dashboard → Logs for any errors

---

**All fixes applied! Ready for Render deployment.**

