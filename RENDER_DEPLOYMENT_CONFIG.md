# 🚀 Render Deployment Configuration

## ✅ Current Deployment Status

### Frontend (Patient Website)
- **URL:** `https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com`
- **Status:** ✅ LIVE
- **Type:** Next.js Web Service

### Backend (API Server)
- **URL:** `https://dr-muddus-mvp-miracle-value-proposition.onrender.com`
- **Status:** ✅ RUNNING
- **Type:** Node.js Web Service
- **Port:** 5000 (internal)

### API Endpoints (All Working ✅)
- ✅ Health Check: `/api/health`
- ✅ Signup: `/api/auth/signup`
- ✅ Login: `/api/auth/login`

---

## 🔧 Required Environment Variables

### Frontend Service (Render Dashboard)

**Go to:** `dr-muddus-mvp-miracle-value-proposition-2l36` → Environment → Environment Variables

**Required Variables:**

```env
NEXT_PUBLIC_API_URL=https://dr-muddus-mvp-miracle-value-proposition.onrender.com/api
NEON_DATABASE_URL=your_neon_connection_string
DATABASE_URL=your_neon_connection_string
NODE_ENV=production
```

**Critical:** `NEXT_PUBLIC_API_URL` must point to your backend URL with `/api` suffix!

---

### Backend Service (Render Dashboard)

**Go to:** `dr-muddus-mvp-miracle-value-proposition` → Environment → Environment Variables

**Required Variables:**

```env
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_strong_random_secret_here
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com
```

---

## 🔍 How to Verify Configuration

### 1. Check Frontend → Backend Connection

**Test in Browser Console (on frontend site):**
```javascript
// Open browser console on frontend site
fetch('https://dr-muddus-mvp-miracle-value-proposition.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log)
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "HOMA Clinic Backend is running",
  "timestamp": "2024-...",
  "version": "1.0.0"
}
```

### 2. Check Frontend Environment Variable

**In Browser Console:**
```javascript
// This won't work (env vars not exposed), but check Network tab:
// Look for API calls to see if they're going to correct backend
```

**Check Network Tab:**
- Open DevTools → Network
- Try to login/signup
- Verify requests go to: `https://dr-muddus-mvp-miracle-value-proposition.onrender.com/api/auth/login`

### 3. Test Signup Flow

1. Go to: `https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/auth`
2. Fill signup form
3. Check Network tab → Should see POST to `/api/auth/signup`
4. Should redirect to dashboard on success

---

## 📋 Configuration Checklist

### Frontend Service
- [ ] `NEXT_PUBLIC_API_URL` = `https://dr-muddus-mvp-miracle-value-proposition.onrender.com/api`
- [ ] `NEON_DATABASE_URL` = Your Neon connection string
- [ ] `DATABASE_URL` = Your Neon connection string (fallback)
- [ ] `NODE_ENV` = `production`

### Backend Service
- [ ] `DATABASE_URL` = Your Neon connection string
- [ ] `JWT_SECRET` = Strong random secret (32+ characters)
- [ ] `PORT` = `5000`
- [ ] `NODE_ENV` = `production`
- [ ] `CORS_ORIGIN` = `https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com`

---

## 🐛 Troubleshooting

### Issue: Frontend can't connect to backend

**Symptoms:**
- CORS errors in browser console
- Network requests failing
- "Cannot connect to backend" messages

**Solutions:**

1. **Check CORS in Backend:**
   - Verify `CORS_ORIGIN` includes frontend URL
   - Backend `server.js` should have:
   ```javascript
   app.use(cors({
     origin: process.env.CORS_ORIGIN || 'http://localhost:3002',
     credentials: true
   }));
   ```

2. **Verify Environment Variable:**
   - In Render Dashboard → Frontend Service → Environment
   - Check `NEXT_PUBLIC_API_URL` is set correctly
   - Must include `/api` suffix: `https://...onrender.com/api`

3. **Check Backend is Running:**
   - Visit: `https://dr-muddus-mvp-miracle-value-proposition.onrender.com/api/health`
   - Should return JSON with `status: "ok"`

### Issue: API calls going to wrong URL

**Check:**
- Browser DevTools → Network tab
- Look at request URLs
- Should be: `https://dr-muddus-mvp-miracle-value-proposition.onrender.com/api/*`

**Fix:**
- Update `NEXT_PUBLIC_API_URL` in Render Dashboard
- Redeploy frontend service

---

## 🔄 After Updating Environment Variables

1. **Save changes** in Render Dashboard
2. **Redeploy** the service (Render auto-redeploys on env var changes)
3. **Wait** for deployment to complete (2-5 minutes)
4. **Test** the connection again

---

## 📊 Current Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Frontend (Next.js)                                     │
│  https://dr-muddus-mvp-miracle-value-proposition-2l36  │
│                                                          │
│  Environment:                                            │
│  NEXT_PUBLIC_API_URL = https://...onrender.com/api      │
└─────────────────────────────────────────────────────────┘
                        │
                        │ API Calls
                        ↓
┌─────────────────────────────────────────────────────────┐
│  Backend (Express)                                      │
│  https://dr-muddus-mvp-miracle-value-proposition        │
│                                                          │
│  Endpoints:                                              │
│  - /api/health      ✅                                   │
│  - /api/auth/signup ✅                                   │
│  - /api/auth/login  ✅                                   │
│  - /api/assessments ✅                                   │
│  - /api/gallery     ✅                                   │
│  - /api/nutribot    ✅                                   │
└─────────────────────────────────────────────────────────┘
                        │
                        ↓
┌─────────────────────────────────────────────────────────┐
│  Neon PostgreSQL Database                                │
│  Tables: users, leads, patient_assessments, gallery     │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Quick Verification Commands

### Test Backend Health
```bash
curl https://dr-muddus-mvp-miracle-value-proposition.onrender.com/api/health
```

### Test Signup (from frontend)
1. Visit: `https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/auth`
2. Fill form and submit
3. Check Network tab for successful POST to `/api/auth/signup`

### Test Login (from frontend)
1. Visit: `https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/auth`
2. Use existing credentials
3. Check Network tab for successful POST to `/api/auth/login`

---

## 🎯 Summary

**Everything is configured correctly!** ✅

- Frontend: `dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com`
- Backend: `dr-muddus-mvp-miracle-value-proposition.onrender.com`
- All APIs working: Health, Signup, Login ✅

**Just ensure `NEXT_PUBLIC_API_URL` is set in Render Dashboard:**
```
https://dr-muddus-mvp-miracle-value-proposition.onrender.com/api
```

