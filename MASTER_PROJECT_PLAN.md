# 🩺 HOMA Clinic MVP - Master Project Plan

**Dr. Muddu Surendra Nehru**  
**Professor of Medicine**  
📞 **09963721999**

**"Achieve metabolic disease remission in 90 days — not just manage it."**

---

## 🎯 Project Overview

**Goal:** Build a small, reliable full-stack system for HOMA Clinic, focused on central obesity, diabetes, dyslipidemia and cardio-diabetes dysmetabolism.

**Scale:** Single clinic with a few staff and 5–50 patients

**Timeline:** Phase 1 (MVP) - Backend Complete ✅, Frontend In Progress

---

## 🏗️ Architecture

### Monorepo Structure
```
DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION/
├── /server          ✅ COMPLETE - Node + Express backend (API only)
└── /web             ⏳ TO BUILD - Next.js 14 frontend (App Router, React, Tailwind)
```

### Deployment Strategy
- **Backend:** Deploy `/server` to Render as Web Service → `https://api.homaclinic.com`
- **Frontend:** Deploy `/web` to Render as Web Service → `https://homaclinic.com`
- **Communication:** Frontend → Backend via HTTPS REST API (JSON)
- **Database:** Neon PostgreSQL (Serverless)

### Data Sources
- **Primary:** Manual entry via web forms
- **Optional:** Google Sheet for pilot data import (Phase 2)

---

## 📊 OKR & KPI Focus

### Clinical Outcomes OKR

**Objective:** Improve metabolic risk in central obesity / cardio-diabetes patients in 90 days

**Key Results (Track in DB):**
1. Change in **HOMA-IR** between Day 0 and Day 90
2. Change in **TyG Index** between Day 0 and Day 90
3. Change in **BMI** between Day 0 and Day 90
4. Change in **Waist** between Day 0 and Day 90
5. Change in **HbA1c** between Day 0 and Day 90

### KPIs in App

**Per Patient:**
- Baseline vs Latest: HOMA-IR, TyG, BMI, Waist, HbA1c
- Days in program
- Compliance rate

**For Clinic:**
- Number of active patients
- Number completing 90-day program
- Average improvement across all metrics

**Note:** No charts in Phase 1 - just store metrics and show them in dashboard and follow-up pages

---

## 🗄️ Database Design (Neon PostgreSQL)

### Table 1: `users` ✅ IMPLEMENTED
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Status:** ✅ Complete in `server/schema.sql`

---

### Table 2: `patient_assessments` ✅ IMPLEMENTED
```sql
CREATE TABLE patient_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Demographics
  age INT,
  gender TEXT,
  
  -- Body Metrics
  height_cm FLOAT,
  weight_kg FLOAT,
  waist_cm FLOAT,
  
  -- Blood Sugar
  fbs FLOAT,
  fasting_insulin FLOAT,          -- nullable for HOMA-IR calculation
  post_lunch_bs FLOAT,
  hba1c FLOAT,
  
  -- Lipid Panel
  total_cholesterol FLOAT,
  hdl FLOAT,
  ldl FLOAT,
  triglycerides FLOAT,
  
  -- Medical History
  current_meds TEXT,
  procedures TEXT,
  post_menopausal BOOLEAN,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Status:** ✅ Complete in `server/schema.sql`

---

### Table 3: `biomarkers` ⏳ PHASE 2 (Optional)
```sql
CREATE TABLE biomarkers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  homa_ir FLOAT,
  tyg_index FLOAT,
  bmi FLOAT,
  waist_cm FLOAT,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Status:** ⏳ Not needed for MVP (calculations done on-the-fly)

---

## 🖥️ Backend PRD - /server

### Status: ✅ 100% COMPLETE

### Environment Variables (.env)
```env
DATABASE_URL=postgresql://neondb_owner:...@...neon.tech/drmuddusmvp1?sslmode=require
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Status:** ✅ Configured in `server/config/database.js` and middleware

---

### Core Middleware ✅

| Middleware | Purpose | Status |
|------------|---------|--------|
| **express.json()** | JSON body parser | ✅ `server.js:15` |
| **cors()** | Allow frontend origin | ✅ `server.js:14` |
| **authenticateToken** | JWT verification | ✅ `middleware/auth.js` |

---

### API Routes ✅

#### 1. POST /api/auth/signup ✅
**File:** `server/routes/auth.js:13`

**Input:**
```json
{
  "name": "Patient Name",
  "email": "patient@example.com",
  "phone": "9876543210",
  "password": "SecurePass123"
}
```

**Process:**
- ✅ Hash password with bcrypt (10 salt rounds)
- ✅ Insert into `users` table
- ✅ Generate JWT token (7-day expiration)
- ✅ Return token + user info

**Output:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "uuid", "name": "...", "email": "...", "phone": "..." }
}
```

---

#### 2. POST /api/auth/login ✅
**File:** `server/routes/auth.js:80`

**Input:**
```json
{
  "email": "patient@example.com",
  "password": "SecurePass123"
}
```

**Process:**
- ✅ Validate against `users` table
- ✅ Compare password with bcrypt
- ✅ Generate new JWT token
- ✅ Return token + user info

**Output:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "uuid", "name": "...", "email": "...", "phone": "..." }
}
```

---

#### 3. GET /api/me ⏳ TO ADD
**Status:** Not implemented yet (easy to add if needed)

**Purpose:** Return current user info from JWT

**Implementation needed:**
```javascript
router.get('/me', authenticateToken, async (req, res) => {
  const result = await pool.query(
    'SELECT id, name, email, phone, created_at FROM users WHERE id = $1',
    [req.user.userId]
  );
  res.json({ user: result.rows[0] });
});
```

---

#### 4. POST /api/assessments ✅
**File:** `server/routes/assessments.js:15`

**Auth:** Required (JWT)

**Input:**
```json
{
  "age": 45,
  "gender": "Male",
  "height_cm": 170,
  "weight_kg": 85,
  "waist_cm": 102,
  "fbs": 110,
  "fasting_insulin": 15,
  "post_lunch_bs": 145,
  "hba1c": 6.2,
  "total_cholesterol": 220,
  "hdl": 40,
  "ldl": 150,
  "triglycerides": 180,
  "current_meds": "Metformin 500mg",
  "procedures": "CAG 2020",
  "post_menopausal": false
}
```

**Process:**
- ✅ Extract user_id from JWT token
- ✅ Insert into `patient_assessments`
- ✅ Calculate BMI, HOMA-IR, TyG, WHtR
- ✅ Return assessment + calculated metrics

**Output:**
```json
{
  "message": "Assessment created successfully",
  "assessment": {
    "id": "uuid",
    "user_id": "uuid",
    "age": 45,
    "gender": "Male",
    "...": "...",
    "created_at": "2024-12-02T...",
    "calculated_metrics": {
      "bmi": 29.41,
      "bmi_category": "Overweight",
      "homa_ir": 4.07,
      "homa_ir_interpretation": "Significant Insulin Resistance",
      "tyg_index": 9.12,
      "tyg_interpretation": "Insulin Resistance",
      "whtr": 0.6,
      "whtr_status": "At Risk"
    }
  }
}
```

---

#### 5. GET /api/assessments/latest ✅
**File:** `server/routes/assessments.js:79`

**Auth:** Required (JWT)

**Process:**
- ✅ Get user_id from token
- ✅ Query latest assessment: `ORDER BY created_at DESC LIMIT 1`
- ✅ Calculate metrics
- ✅ Return assessment + metrics

---

#### 6. GET /api/assessments/history ✅
**File:** `server/routes/assessments.js:119`

**Auth:** Required (JWT)

**Process:**
- ✅ Get user_id from token
- ✅ Query all assessments: `ORDER BY created_at DESC`
- ✅ Calculate metrics for each
- ✅ Return array of assessments

**Output:**
```json
{
  "count": 3,
  "assessments": [
    { "id": "...", "created_at": "2024-03-01", "calculated_metrics": {...} },
    { "id": "...", "created_at": "2024-02-01", "calculated_metrics": {...} },
    { "id": "...", "created_at": "2024-01-01", "calculated_metrics": {...} }
  ]
}
```

---

#### 7. GET /api/health ✅
**File:** `server/server.js:25`

**Auth:** Not required

**Output:**
```json
{
  "status": "ok",
  "message": "HOMA Clinic Backend is running",
  "timestamp": "2024-12-02T...",
  "version": "1.0.0"
}
```

---

### Calculation Helpers ✅

**File:** `server/utils/calculations.js`

#### BMI Calculation ✅
```javascript
BMI = weight_kg / (height_cm / 100)²
```
**Returns:** BMI value + category (Underweight/Normal/Overweight/Obese)

#### HOMA-IR Calculation ✅
```javascript
HOMA_IR = (fbs * fasting_insulin) / 405
```
**Returns:** 
- HOMA-IR value (or null if fasting_insulin not provided)
- Interpretation: Optimal (<1.0), Normal (1.0-2.0), Early IR (2.0-2.9), Significant IR (≥2.9)

#### TyG Index Calculation ✅
```javascript
TyG = ln((triglycerides * fbs) / 2)
```
**Returns:**
- TyG value
- Interpretation: Normal (<8.5), Borderline (8.5-8.8), Insulin Resistance (>8.8)

**Note:** All calculations returned automatically with assessment responses, so frontend only displays them.

---

## 🌐 Frontend PRD - /web

### Status: ⏳ TO BUILD

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** fetch (built-in) or axios
- **State Management:** React Context for auth

---

### Global Setup

#### 1. API Client
**File:** `web/lib/api.ts` (to create)

```typescript
// Read NEXT_PUBLIC_BACKEND_URL from env
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Wrapper that attaches Authorization: Bearer <token>
```

#### 2. Auth Context
**File:** `web/contexts/AuthContext.tsx` (to create)

```typescript
// Store JWT in memory + localStorage
// Attach Authorization: Bearer <token> to all API calls
// Provide: user, token, login, logout, signup
```

---

### Pages to Build

#### Page 1: / (Landing Page) ⏳
**File:** `web/app/page.tsx`

**Design:**
- Simple hero section
- Text: "HOMA Clinic – Achieve Central Obesity & Cardio-Diabetes Remission in 90 Days"
- One CTA button: "Get Started" → navigates to `/auth`
- Mobile-first layout
- Professional color scheme

**Elements:**
- Hero with background gradient
- Dr. Muddu's credentials
- Key benefits (4 biomarkers, 4 daily habits)
- CTA button
- Footer with contact info

---

#### Page 2: /auth (Login/Signup) ⏳
**File:** `web/app/auth/page.tsx`

**Design:**
- Two tabs or toggle: "Login" and "Create Account"

**Signup Tab:**
- Fields: name, email, phone, password, confirm password
- On submit → `POST /api/auth/signup`
- On success → store JWT → redirect to `/assessment`

**Login Tab:**
- Fields: email, password
- On submit → `POST /api/auth/login`
- On success → store JWT
- Then call `GET /api/assessments/latest`:
  - If record exists → redirect to `/dashboard`
  - If no record → redirect to `/assessment`

**Validation:**
- Email format
- Password minimum 8 characters
- Passwords match on signup
- Show error messages

---

#### Page 3: /assessment (Health Assessment Form) ⏳
**File:** `web/app/assessment/page.tsx`

**Protection:** Before render, check auth context; if no token, redirect to `/auth`

**Form Sections:**

**Section 1: Patient Profile (Read-Only)**
- Full Name (from user.name)
- Email (from user.email)
- Phone (from user.phone, editable)

**Section 2: Demographics**
- Age (number input)
- Gender (select: Male / Female / Other)

**Section 3: Body Metrics**
- Height (cm) (number, step 0.1)
- Weight (kg) (number, step 0.1)
- Waist Circumference (cm) (number, step 0.1, required)

**Section 4: Blood Sugar**
- Fasting Blood Sugar (FBS) (mg/dL)
- Fasting Insulin (μU/mL) - optional, for HOMA-IR
- Post Lunch Blood Sugar (mg/dL)
- HbA1c (%)

**Section 5: Lipid Panel**
- Total Cholesterol (mg/dL)
- HDL (mg/dL)
- LDL (mg/dL)
- Triglycerides (mg/dL)

**Section 6: Medical History**
- Current Medications (textarea)
- Past Procedures (textarea) - e.g., CAG, surgery
- Post-Menopausal (radio: Yes / No)

**Submit:**
- Call `POST /api/assessments`
- On success → redirect to `/dashboard`
- Show loading state during submission
- Show success/error messages

---

#### Page 4: /dashboard (Metabolic Dashboard) ⏳
**File:** `web/app/dashboard/page.tsx`

**Protection:** Auth required, redirect to `/auth` if not logged in

**On Load:**
- Call `GET /api/assessments/latest`
- Use calculated metrics from response

**4 Metric Cards/Gauges:**

1. **HOMA-IR Card**
   - Show value or "Need insulin value"
   - Color zones: Green (<2.0), Yellow (2.0-2.9), Red (≥2.9)
   - Interpretation text

2. **TyG Index Card**
   - Show value
   - Color zones: Green (<8.5), Yellow (8.5-8.8), Red (>8.8)
   - Interpretation text

3. **BMI Card**
   - Show value
   - Color zones: Green (18.5-25), Yellow (25-30), Red (>30)
   - Category text

4. **Waist Card**
   - Show value in cm
   - Color zones: Green (<80), Orange (80-90), Red (>90)
   - Risk status

**Daily Habit Tracker (v1 - local state only):**
- 4 checkboxes:
  - ✅ Nutrition (1800-2000 kcal)
  - ✅ Sleep (7-8 hours)
  - ✅ Steps (10,000+)
  - ✅ Medicines (taken)
- Note: "Tracking coming soon - check daily goals"

**Action Buttons:**
- "Upgrade Plan (UPI Coming Soon)" (non-functional button with disabled state)
- "Contact on WhatsApp" → `https://wa.me/919963721999`
- "View Progress" → navigate to `/follow-up`
- "New Assessment" → navigate to `/assessment`

---

#### Page 5: /follow-up (Progress & Testimonials) ⏳
**File:** `web/app/follow-up/page.tsx`

**Protection:** Auth required

**On Load:**
- Call `GET /api/assessments/history`

**Section 1: Progress Table**
```
| Date       | HOMA-IR | TyG   | BMI   | Waist | HbA1c |
|------------|---------|-------|-------|-------|-------|
| 2024-03-01 | 3.2     | 8.9   | 28.5  | 98    | 6.0   |
| 2024-02-01 | 3.8     | 9.2   | 29.1  | 102   | 6.3   |
| 2024-01-01 | 4.1     | 9.5   | 29.8  | 105   | 6.5   |
```

- Show trend indicators (↓ improving, ↑ worsening, → stable)
- Highlight Day 0 and Day 90 if available

**Section 2: Testimonials (Static)**
- 2-3 patient success stories
- Before/After metrics
- Patient quotes

**Section 3: Doctor Info**
- Dr. Muddu's photo
- Bio: Professor of Medicine
- Links:
  - YouTube channel
  - Blog
  - WhatsApp: 919963721999
- Call to action: "ATTEND OUR CLASSES • BECOME A METABOLISM SPECIALIST"

---

### Routing Guards ⏳

**Implementation:** `web/middleware.ts` or individual page checks

**Rules:**
1. If NOT authenticated AND accessing `/assessment`, `/dashboard`, `/follow-up` → redirect to `/auth`
2. If authenticated AND accessing `/auth` → redirect to `/dashboard`
3. Landing page `/` is always accessible

**Auth Check:**
```typescript
const token = localStorage.getItem('token') || sessionStorage.getItem('token');
if (!token) {
  router.push('/auth');
}
```

---

## 📋 Implementation Checklist

### Backend (/server) ✅ COMPLETE

- [x] Project structure and package.json
- [x] Environment configuration (.env)
- [x] Database connection (Neon PostgreSQL)
- [x] Middleware (JSON parser, CORS, JWT auth)
- [x] Users table schema
- [x] Patient assessments table schema
- [x] POST /api/auth/signup
- [x] POST /api/auth/login
- [ ] GET /api/me (optional, easy to add)
- [x] POST /api/assessments
- [x] GET /api/assessments/latest
- [x] GET /api/assessments/history
- [x] GET /api/health
- [x] BMI calculation
- [x] HOMA-IR calculation
- [x] TyG calculation
- [x] WHtR calculation (bonus)
- [x] Return calculations with JSON
- [x] README and documentation
- [x] Testing guide

### Frontend (/web) ⏳ TO BUILD

- [ ] Create Next.js 14 project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up environment variables
- [ ] Create API client wrapper
- [ ] Create Auth Context
- [ ] Build Landing page (/)
- [ ] Build Auth page (/auth) with login/signup
- [ ] Build Assessment form (/assessment)
- [ ] Build Dashboard (/dashboard) with 4 metric cards
- [ ] Build Follow-up page (/follow-up)
- [ ] Implement routing guards
- [ ] Add loading states
- [ ] Add error handling
- [ ] Mobile-responsive design
- [ ] Test all flows

---

## 🚀 Deployment Plan

### Phase 1: Development
- ✅ Backend running locally on port 5000
- ⏳ Frontend running locally on port 3000
- ⏳ Test complete flow: signup → assessment → dashboard → follow-up

### Phase 2: Staging on Render
- Deploy backend to Render Web Service
- Deploy frontend to Render Web Service
- Update CORS and environment variables
- Test on staging URLs

### Phase 3: Production
- Set up custom domains (optional)
- Enable SSL certificates
- Configure production database connection
- Set up monitoring and logs

---

## 📞 Contact & Support

**Dr. Muddu Surendra Nehru**  
**Professor of Medicine**  
📱 **09963721999**  
💬 **WhatsApp:** https://wa.me/919963721999

🎓 **ATTEND OUR CLASSES • BECOME A METABOLISM SPECIALIST**

---

## 📊 Current Status

| Component | Status | Progress |
|-----------|--------|----------|
| **Backend** | ✅ Complete | 100% |
| **Frontend** | ⏳ Pending | 0% |
| **Database** | ✅ Schema Ready | 100% |
| **Documentation** | ✅ Complete | 100% |
| **Testing Backend** | 🔄 Ready | 0% |
| **Deployment** | ⏳ Pending | 0% |

---

## 🎯 Next Steps

1. **YOU:** Test backend with Postman/cURL (see `server/TESTING.md`)
2. **ME:** Build Next.js 14 frontend in `/web` directory
3. **YOU:** Test complete flow locally
4. **ME:** Help deploy to Render
5. **YOU:** Onboard first 5 patients!

---

**Last Updated:** December 2, 2024  
**Version:** 1.0.0 (Backend Complete, Frontend Pending)

