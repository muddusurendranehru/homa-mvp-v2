# 🚀 Quick Start - Frontend

## Step 1: Install Dependencies

```bash
cd web
npm install
```

## Step 2: Create Environment File

Create `web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Important:** The `/api` suffix is required!

## Step 3: Verify Backend is Running

The backend must be running first:

```bash
# In another terminal
cd ../server
npm run dev

# Should show:
# ✅ Server running on port 5000
```

## Step 4: Start Frontend

```bash
npm run dev
```

Open http://localhost:3000

---

## ✅ What's Implemented

### 1. Landing Page (/) ✅
- Responsive design
- Hero section with CTA
- Features overview
- "Get Started" button → /auth

### 2. Auth Page (/auth) ✅
**Signup Tab:**
- Form: name, email, phone, password, confirm password
- Validation (passwords match, min 6 chars)
- Calls: `POST /api/auth/signup`
- Saves JWT to localStorage
- **Redirects to /assessment**

**Login Tab:**
- Form: email, password
- Calls: `POST /api/auth/login`
- Saves JWT to localStorage
- Calls: `GET /api/assessments/latest`
- **Smart redirect:**
  - If assessment exists → `/dashboard`
  - If no assessment (404) → `/assessment`

### 3. Auth Protection ✅
- Protected routes: /assessment, /dashboard, /follow-up
- Auto-redirect to /auth if no token
- Auth page redirects to /dashboard if logged in

### 4. Placeholder Pages ✅
- `/assessment` - Shows "Coming Soon" with user name
- `/dashboard` - Shows metrics preview

---

## 🧪 Test the Auth Flow

### Test Signup:
1. Go to http://localhost:3000
2. Click "Get Started"
3. Click "Create Account" tab
4. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Password: test123
   - Confirm: test123
5. Submit
6. **Should redirect to /assessment**

### Test Login (No Assessment):
1. Logout
2. Login with same credentials
3. **Should redirect to /assessment** (no assessment yet)

### Test Login (With Assessment):
1. Create an assessment via backend API
2. Login again
3. **Should redirect to /dashboard**

---

## 📁 Files Created

```
web/
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── .gitignore
├── README.md
├── QUICK_START.md (this file)
├── TESTING_INSTRUCTIONS.md
├── app/
│   ├── layout.tsx              ✅ Root layout with AuthProvider
│   ├── page.tsx                ✅ Landing page
│   ├── globals.css             ✅ Tailwind + custom styles
│   ├── auth/
│   │   └── page.tsx            ✅ Login/Signup with redirect logic
│   ├── assessment/
│   │   └── page.tsx            ✅ Placeholder (protected)
│   └── dashboard/
│       └── page.tsx            ✅ Placeholder (protected)
└── lib/
    ├── api.ts                  ✅ API client with JWT
    └── auth-context.tsx        ✅ Auth state + route protection
```

---

## 🔑 Key Features

### JWT Storage:
```javascript
// Saved to localStorage + memory
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));
```

### API Calls with JWT:
```javascript
// Automatic in api.ts
headers: {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
}
```

### Redirect Logic After Login:
```javascript
// In /auth page.tsx
const assessmentResponse = await api.getLatestAssessment();

if (assessmentResponse.data && assessmentResponse.data.assessment) {
  router.push('/dashboard');  // Has assessment
} else {
  router.push('/assessment'); // No assessment
}
```

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Check backend is running: `curl http://localhost:5000/api/health`
- Check `.env.local` has `NEXT_PUBLIC_BACKEND_URL=http://localhost:5000`

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Auth redirect loop"
- Clear localStorage: `localStorage.clear()` in console
- Restart dev server

### "CORS error"
- Backend has CORS enabled
- Restart both backend and frontend

---

## 📞 Status

✅ **Complete:**
- Landing page
- Auth page (login/signup)
- JWT storage
- API integration
- Redirect logic
- Route protection

⏳ **Coming Next:**
- Full assessment form (20+ fields)
- Dashboard with metrics
- Follow-up with history

---

**Dr. Muddu Surendra Nehru**  
Professor of Medicine  
📱 09963721999

**Now ready to test!** Run `npm run dev` and open http://localhost:3000

