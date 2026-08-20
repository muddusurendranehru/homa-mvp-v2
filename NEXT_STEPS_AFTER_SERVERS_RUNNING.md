# ✅ Next Steps - After Servers Are Running

## 🎯 Current Status

✅ **Backend Server:** Running on http://localhost:5000  
✅ **Frontend Server:** Running on http://localhost:3002  
✅ **PWA Icons:** Configured and accessible  
✅ **Manifest:** Created and linked  

---

## 🧪 **Step 1: Test Frontend-Backend Connection**

### A. Open Frontend in Browser
```
http://localhost:3002
```

### B. Check Browser Console
1. Open DevTools (F12)
2. Go to **Console** tab
3. Look for any errors or warnings
4. Go to **Network** tab
5. Refresh page
6. Check if API calls to `http://localhost:5000/api/*` are successful

### C. Verify PWA Assets
- ✅ Manifest: http://localhost:3002/manifest.json
- ✅ Icon 192: http://localhost:3002/icon-192x192.png
- ✅ Icon 512: http://localhost:3002/icon-512x512.png

---

## 🔐 **Step 2: Test Authentication Flow**

### Test Signup
1. Go to: http://localhost:3002/auth
2. Click **"Create Account"** tab
3. Fill form:
   - **Name:** Test User
   - **Email:** test@example.com
   - **Phone:** 9876543210
   - **Password:** test123
   - **Confirm Password:** test123
4. Click **"Create Account"**
5. **Expected:** Redirect to `/assessment` or `/dashboard`

### Test Login
1. Go to: http://localhost:3002/auth
2. Click **"Login"** tab
3. Enter:
   - **Email:** test@example.com
   - **Password:** test123
4. Click **"Login"**
5. **Expected:** Redirect to `/dashboard`

---

## 📊 **Step 3: Test Assessment Creation**

### Complete Health Assessment
1. After login, you should be on `/assessment` page
2. Fill minimum required fields:
   - **Age:** 45
   - **Gender:** Male/Female
   - **Waist (cm):** 95 *(required)*
   - **Height (cm):** 170
   - **Weight (kg):** 80
3. Optional fields (for calculations):
   - **FBS:** 110
   - **Fasting Insulin:** 15
   - **HbA1c:** 6.2
   - **Triglycerides:** 180
4. Click **"Save Assessment"** or **"Go to Dashboard"**
5. **Expected:** 
   - Assessment saved to database
   - Redirect to `/dashboard`
   - Metrics calculated (BMI, HOMA-IR, TyG, WHtR)

---

## 📈 **Step 4: Test Dashboard**

### Verify Dashboard Displays
1. Go to: http://localhost:3002/dashboard
2. **Should see:**
   - ✅ 4 Metric Cards:
     - HOMA-IR (calculated)
     - TyG Index (calculated)
     - BMI (calculated)
     - Waist (from assessment)
   - ✅ Additional health markers
   - ✅ Daily habits tracker
   - ✅ Action buttons
   - ✅ Logout button

### Test Calculations
- **BMI:** Should match: `weight / (height/100)²`
- **HOMA-IR:** Should match: `(FBS × Insulin) / 405`
- **TyG Index:** Should match: `Ln[(TG × FBS) / 2]`
- **WHtR:** Should match: `Waist / Height`

---

## 📱 **Step 5: Test PWA Installation**

### Desktop (Chrome/Edge)
1. Open: http://localhost:3002
2. Look for **"Install"** icon in address bar
3. Click to install
4. **Expected:** App opens in standalone window with HOMA Clinic icon

### Mobile (Chrome)
1. Open: http://localhost:3002 on mobile
2. Tap **Menu** (3 dots)
3. Tap **"Add to Home Screen"**
4. **Expected:** App icon appears on home screen

---

## 🔍 **Step 6: Test API Endpoints Directly**

### Using PowerShell

#### Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/health"
```

#### Signup
```powershell
$body = @{
    name = "API Test User"
    email = "apitest@example.com"
    phone = "9876543210"
    password = "test123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/signup" `
    -Method Post -Body $body -ContentType "application/json"

$token = $response.token
Write-Host "Token: $token"
```

#### Login
```powershell
$body = @{
    email = "apitest@example.com"
    password = "test123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
    -Method Post -Body $body -ContentType "application/json"

$token = $response.token
```

#### Create Assessment (with token)
```powershell
$body = @{
    age = 45
    gender = "Male"
    height_cm = 170
    weight_kg = 80
    waist_cm = 95
    fbs = 110
    fasting_insulin = 15
} | ConvertTo-Json

$headers = @{ Authorization = "Bearer $token" }

Invoke-RestMethod -Uri "http://localhost:5000/api/assessments" `
    -Method Post -Body $body -Headers $headers -ContentType "application/json"
```

---

## ✅ **Step 7: Verification Checklist**

### Backend
- [ ] Health endpoint returns 200 OK
- [ ] Signup creates user in database
- [ ] Login returns JWT token
- [ ] Assessment creation works
- [ ] Calculations are accurate
- [ ] JWT authentication protects routes

### Frontend
- [ ] Homepage loads correctly
- [ ] Signup form works
- [ ] Login form works
- [ ] Assessment form saves data
- [ ] Dashboard displays metrics
- [ ] Logout works
- [ ] No console errors
- [ ] API calls succeed

### PWA
- [ ] Manifest.json accessible
- [ ] Icons display correctly
- [ ] App installable (desktop)
- [ ] App installable (mobile)
- [ ] Standalone mode works

### Integration
- [ ] Frontend → Backend API calls work
- [ ] CORS configured correctly
- [ ] JWT tokens stored and sent
- [ ] Error handling works
- [ ] Loading states display

---

## 🚀 **Step 8: Production Deployment (When Ready)**

### Backend Deployment
1. Set environment variables on hosting platform
2. Deploy to Render/Heroku/Vercel
3. Update database connection string
4. Test production API endpoints

### Frontend Deployment
1. Update `NEXT_PUBLIC_API_URL` to production backend URL
2. Build: `npm run build`
3. Deploy to Vercel/Render
4. Test production frontend

### Post-Deployment
1. Submit sitemap to Google Search Console
2. Verify PWA installation works
3. Test all user flows
4. Monitor error logs

---

## 📝 **Quick Test Commands**

### Check Backend
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/health" | Select-Object StatusCode, Content
```

### Check Frontend
```powershell
Invoke-WebRequest -Uri "http://localhost:3002" | Select-Object StatusCode
```

### Check Manifest
```powershell
Invoke-WebRequest -Uri "http://localhost:3002/manifest.json" | Select-Object -ExpandProperty Content
```

---

## 🎯 **Priority Order**

1. **First:** Test frontend-backend connection (Step 1)
2. **Second:** Test authentication (Step 2)
3. **Third:** Test assessment creation (Step 3)
4. **Fourth:** Test dashboard (Step 4)
5. **Fifth:** Test PWA installation (Step 5)
6. **Sixth:** Test API endpoints directly (Step 6)
7. **Seventh:** Complete verification checklist (Step 7)

---

## 🆘 **If Something Fails**

1. **Check Console:** Browser DevTools → Console tab
2. **Check Network:** Browser DevTools → Network tab
3. **Check Backend Logs:** Terminal running `npm run dev` in server/
4. **Check Frontend Logs:** Terminal running `npm run dev` in web/
5. **Verify Environment Variables:** Check `.env` and `.env.local` files
6. **Verify Database Connection:** Check DATABASE_URL in backend .env

---

**🎉 You're all set! Start with Step 1 and work through the checklist.**
