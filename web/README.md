# 🌐 HOMA Clinic Frontend

Next.js 14 frontend for HOMA Clinic Metabolic Remission Platform

**Dr. Muddu Surendra Nehru** | Professor of Medicine | 📱 09963721999

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd web
npm install
```

### 2. Set Up Environment Variables

Create `.env.local` in the `/web` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Note:** The `/api` suffix is important! All endpoints are relative to this base URL.

### 3. Make Sure Backend is Running

The backend must be running on port 5000:

```bash
# In another terminal
cd ../server
npm run dev
```

### 4. Start Frontend Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📱 Pages Created

### ✅ 1. Landing Page (`/`)
- Hero section with CTA
- Features overview
- How it works section
- Mobile-first responsive design

### ✅ 2. Auth Page (`/auth`)
- Login tab
- Signup tab
- Form validation
- Auto-redirect based on assessment status

### ⏳ 3. Assessment Page (`/assessment`) - Coming next
- Protected route (requires auth)
- Complete health assessment form
- All 20+ fields mapped to backend

### ⏳ 4. Dashboard Page (`/dashboard`) - Coming next
- Protected route
- 4 metric cards (HOMA-IR, TyG, BMI, Waist)
- Daily habit tracker
- Action buttons

### ⏳ 5. Follow-up Page (`/follow-up`) - Coming next
- Protected route
- Assessment history table
- Progress tracking
- Testimonials

---

## 🏗️ Project Structure

```
web/
├── app/
│   ├── layout.tsx          # Root layout with AuthProvider
│   ├── page.tsx            # Landing page (/)
│   ├── globals.css         # Global styles + Tailwind
│   ├── auth/
│   │   └── page.tsx        # Login/Signup page
│   ├── assessment/
│   │   └── page.tsx        # Health assessment form (coming)
│   ├── dashboard/
│   │   └── page.tsx        # Metabolic dashboard (coming)
│   └── follow-up/
│       └── page.tsx        # Progress & testimonials (coming)
│
├── lib/
│   ├── api.ts              # API client (fetch wrapper)
│   └── auth-context.tsx    # Auth state management
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

---

## 🔐 Authentication Flow

1. **Signup:**
   - User fills form → POST `/api/auth/signup`
   - Receives JWT token
   - Stored in localStorage + memory
   - Redirects to `/assessment`

2. **Login:**
   - User enters credentials → POST `/api/auth/login`
   - Receives JWT token
   - Checks `/api/assessments/latest`
   - If assessment exists → `/dashboard`
   - If no assessment → `/assessment`

3. **Protected Routes:**
   - `/assessment`, `/dashboard`, `/follow-up` require JWT
   - Auto-redirect to `/auth` if not authenticated
   - JWT sent as `Authorization: Bearer <token>`

---

## 🎨 Styling

- **Framework:** Tailwind CSS
- **Color Scheme:** Primary blue (#0ea5e9)
- **Responsive:** Mobile-first design
- **Custom Classes:**
  - `.btn-primary` - Primary action button
  - `.btn-secondary` - Secondary button
  - `.card` - Content card
  - `.input-field` - Form input
  - `.label` - Form label

---

## 🧪 Testing the Frontend

### Test Landing Page
1. Open http://localhost:3000
2. Verify hero section displays
3. Click "Get Started" → should go to `/auth`

### Test Signup
1. Go to http://localhost:3000/auth
2. Click "Create Account" tab
3. Fill in all fields:
   - Name: Test Patient
   - Email: frontend-test@example.com
   - Phone: 9876543210
   - Password: test123
   - Confirm Password: test123
4. Click "Create Account"
5. Should redirect to `/assessment`

### Test Login
1. Go to http://localhost:3000/auth
2. Enter credentials from signup
3. Click "Login"
4. Should check for assessments and redirect accordingly

---

## 🔧 API Integration

All API calls use the shared `api` client with axios from `lib/api.ts`:

```typescript
import { api } from '@/lib/api';

// All calls use relative paths (no hard-coded URLs)

// Signup → POST /auth/signup
const response = await api.signup({ name, email, phone, password });

// Login → POST /auth/login
const response = await api.login({ email, password });

// Get latest → GET /assessments/latest
const response = await api.getLatestAssessment();

// Create assessment → POST /assessments
const response = await api.createAssessment(data);
```

**Features:**
- ✅ Axios interceptor automatically adds `Authorization: Bearer <token>` from localStorage
- ✅ Base URL read from `NEXT_PUBLIC_API_URL` environment variable
- ✅ All endpoints use relative paths (`/auth/login` not full URLs)
- ✅ Handles 401/403 errors automatically (clears token, redirects to /auth)

---

## 📦 Dependencies

```json
{
  "next": "14.2.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.4.0"
}
```

---

## 🚦 Current Status

| Page | Status | Features |
|------|--------|----------|
| Landing (/) | ✅ Complete | Hero, CTA, Features, Responsive |
| Auth (/auth) | ✅ Complete | Login, Signup, Validation, Redirect |
| Assessment | ⏳ Next | Form with all fields |
| Dashboard | ⏳ Pending | Metrics, Gauges, Habit tracker |
| Follow-up | ⏳ Pending | History table, Testimonials |

---

## 🐛 Troubleshooting

### Frontend won't start
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API calls failing
- Check backend is running on port 5000
- Verify `NEXT_PUBLIC_BACKEND_URL` in `.env.local`
- Check browser console for errors

### Auth redirect not working
- Clear localStorage: `localStorage.clear()`
- Check JWT token is being saved
- Verify auth-context is wrapping the app

---

## 📞 Support

**Dr. Muddu Surendra Nehru**  
Professor of Medicine  
📱 09963721999  
💬 WhatsApp: https://wa.me/919963721999

🎓 **ATTEND OUR CLASSES • BECOME A METABOLISM SPECIALIST**

---

## 🎯 Next Steps

1. ✅ Landing page created
2. ✅ Auth page created (login/signup)
3. **NOW:** Test signup and login with backend
4. **NEXT:** Create assessment form page
5. **THEN:** Create dashboard with metrics
6. **FINALLY:** Create follow-up page

Run `npm run dev` and test at http://localhost:3000


