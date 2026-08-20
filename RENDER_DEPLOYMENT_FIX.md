# 🚀 Render Deployment Configuration Fix

## Problem
Render was building the wrong folder → missing files

## ✅ Solution: Set Root Directory

In Render Dashboard → Web Service Settings:

### Key Configuration:
```
Type: Web Service
Root Directory: web          ← THIS IS THE KEY!
Build Command: npm install && npm run build
Start Command: npm start
Node Version: 18.x
```

## Why This Matters

Your project structure:
```
DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION/
├── web/                      ← Frontend (Next.js)
│   ├── app/
│   ├── components/
│   ├── package.json
│   └── ...
└── server/                   ← Backend (Express)
    ├── routes/
    ├── package.json
    └── ...
```

**Without Root Directory:**
- Render tries to build from project root
- Can't find `package.json` in root
- Build fails or builds wrong folder

**With Root Directory = `web`:**
- Render builds from `web/` folder
- Finds `package.json` correctly
- Builds Next.js app successfully

## Complete Render Configuration

### Frontend Service (Patient Website)
```
Service Name: homa-clinic-frontend
Type: Web Service
Root Directory: web
Build Command: npm install && npm run build
Start Command: npm start
Node Version: 18.x
Environment Variables:
  - NEXT_PUBLIC_API_URL=https://dr-muddus-mvp-miracle-value-proposition.onrender.com/api
  - NEON_DATABASE_URL=your_neon_connection_string
  - DATABASE_URL=your_neon_connection_string
  - NODE_ENV=production
```

### Backend Service (API Server)
```
Service Name: homa-clinic-backend
Type: Web Service
Root Directory: server
Build Command: npm install
Start Command: npm start
Node Version: 18.x
Environment Variables:
  - DATABASE_URL=your_neon_connection_string
  - JWT_SECRET=your_strong_random_secret
  - PORT=5000
  - NODE_ENV=production
  - CORS_ORIGIN=https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com
```

## Result
✅ HOMA Clinic homepage works!
✅ All files found correctly
✅ Build succeeds
✅ Deployment successful

## Quick Checklist

- [ ] Frontend Root Directory = `web`
- [ ] Backend Root Directory = `server`
- [ ] Node Version = `18.x` (for both)
- [ ] Build commands correct
- [ ] Environment variables set
- [ ] CORS origin configured

---

**Remember:** The Root Directory setting is critical for monorepo structures!

