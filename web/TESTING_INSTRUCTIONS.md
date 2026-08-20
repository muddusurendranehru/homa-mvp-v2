# 🧪 Testing Instructions - Auth Flow

## Prerequisites

1. **Backend must be running:**
   ```bash
   cd server
   npm run dev
   # Should be running on http://localhost:5000
   ```

2. **Frontend setup:**
   ```bash
   cd web
   npm install
   npm run dev
   # Will run on http://localhost:3000
   ```

---

## ✅ Test 1: Signup Flow

### Steps:
1. Open http://localhost:3000
2. Click "Get Started" button
3. Should navigate to http://localhost:3000/auth
4. Click "Create Account" tab
5. Fill in the form:
   - **Name:** Frontend Test User
   - **Email:** frontend-test@homaclinic.com
   - **Phone:** 9876543210
   - **Password:** test123
   - **Confirm Password:** test123
6. Click "Create Account"

### Expected Result:
- ✅ Loading state shows "Creating Account..."
- ✅ JWT token saved to localStorage
- ✅ User data saved to localStorage
- ✅ **Redirects to http://localhost:3000/assessment** (placeholder page)
- ✅ Assessment page shows: "Welcome, Frontend Test User!"

### Check Console:
```
Signup successful, redirecting to assessment
```

---

## ✅ Test 2: Login Flow (New User - No Assessment)

### Steps:
1. Logout (click Logout in header if on dashboard)
2. Go to http://localhost:3000/auth
3. Click "Login" tab
4. Fill in credentials:
   - **Email:** frontend-test@homaclinic.com
   - **Password:** test123
5. Click "Login"

### Expected Result:
- ✅ Backend checks `/api/assessments/latest`
- ✅ Returns 404 or empty (no assessment exists)
- ✅ **Redirects to http://localhost:3000/assessment**

### Check Console:
```
No assessment found, redirecting to assessment form
```

---

## ✅ Test 3: Login Flow (Existing User - Has Assessment)

### Steps:
1. First, create an assessment via backend API:
   ```bash
   # Use test-api.ps1 from backend to create assessment for this user
   # OR create assessment manually via Postman
   ```

2. Logout from frontend
3. Go to http://localhost:3000/auth
4. Login with:
   - **Email:** frontend-test@homaclinic.com
   - **Password:** test123
5. Click "Login"

### Expected Result:
- ✅ Backend checks `/api/assessments/latest`
- ✅ Returns assessment data
- ✅ **Redirects to http://localhost:3000/dashboard**

### Check Console:
```
Assessment exists, redirecting to dashboard
```

---

## ✅ Test 4: Protected Route Redirect

### Steps:
1. Clear localStorage: `localStorage.clear()` in browser console
2. Try to access http://localhost:3000/dashboard directly

### Expected Result:
- ✅ Auth context detects no token
- ✅ **Automatically redirects to http://localhost:3000/auth**

---

## ✅ Test 5: Auth Page Redirect When Logged In

### Steps:
1. Make sure you're logged in (have token)
2. Try to access http://localhost:3000/auth

### Expected Result:
- ✅ Auth context detects token exists
- ✅ **Automatically redirects to http://localhost:3000/dashboard**

---

## 🔍 Debugging

### Check if backend is running:
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"ok",...}
```

### Check localStorage:
```javascript
// In browser console
localStorage.getItem('token')
localStorage.getItem('user')
```

### Check API calls:
- Open Browser DevTools → Network tab
- Filter by "Fetch/XHR"
- Look for calls to:
  - `http://localhost:5000/api/auth/signup`
  - `http://localhost:5000/api/auth/login`
  - `http://localhost:5000/api/assessments/latest`

### Common Issues:

**1. CORS Error:**
```
Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```
**Solution:** Backend has CORS enabled, but restart both servers if needed.

**2. Backend Not Running:**
```
Failed to fetch
Network error
```
**Solution:** Start backend: `cd server && npm run dev`

**3. Auth Redirect Loop:**
**Solution:** Clear localStorage and cookies, restart frontend

---

## 📊 Expected Flow Diagram

```
Landing Page (/)
     │
     ↓ Click "Get Started"
     │
Auth Page (/auth)
     │
     ├─ SIGNUP ─────────────────────────┐
     │  • POST /api/auth/signup          │
     │  • Save JWT                       │
     │  • Always → /assessment           │
     │                                   │
     └─ LOGIN ──────────────────────────┤
        • POST /api/auth/login          │
        • Save JWT                       │
        • GET /api/assessments/latest   │
        │                               │
        ├─ Has Assessment → /dashboard  │
        │                               │
        └─ No Assessment → /assessment ←┘
```

---

## ✅ Success Criteria

- [ ] Signup creates user and redirects to /assessment
- [ ] Login checks for assessment
- [ ] Login with no assessment → /assessment
- [ ] Login with assessment → /dashboard
- [ ] JWT stored in localStorage
- [ ] Protected routes redirect to /auth
- [ ] Auth page redirects to /dashboard if logged in
- [ ] No console errors
- [ ] Network requests show 200/201 status codes

---

## 📞 Support

If tests fail, check:
1. Backend logs in terminal
2. Frontend console errors
3. Network tab in DevTools
4. localStorage contents

**Dr. Muddu Surendra Nehru**  
📱 09963721999

