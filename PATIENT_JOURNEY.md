# 🏥 Patient Journey Flow

## ✅ Complete Patient Journey (Verified & Working)

```
Homepage → Fill Assessment Form → 
Lead Data Saved to DB → WhatsApp to Doctor → 
Signup/Login → Patient Dashboard → 
Metabolic Remission Program → Success!
```

---

## 📍 Step-by-Step Journey

### **Step 1: Homepage → Fill Assessment Form**

**Location:** `https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/`

**User Action:**
- Visits homepage
- Clicks "Start Free Assessment" or "Get Your Metabolic Risk Score"
- Redirected to `/google-assessment` page

**Component:** `web/components/LeadScoringForm.tsx`

**Form Fields:**
1. **Basic Info (Q1-5):**
   - Full Name
   - WhatsApp Number
   - Email
   - Age
   - Gender

2. **Medical Evaluation (Q6-12):**
   - Height (cm)
   - Weight (kg)
   - Waist Circumference (cm)
   - Fasting Blood Sugar (mg/dL)
   - Total Cholesterol (mg/dL)
   - Triglycerides (mg/dL)
   - Weight Loss Attempts

3. **Intent Scoring (Q13-15):**
   - Biggest Frustration (multi-select)
   - Investment Timeline
   - Commitment Level

**Calculations:**
- BMI Score
- TyG Index
- Metabolic Risk Score (0-100%)
- Lead Quality Score (0-100%)

---

### **Step 2: Lead Data Saved to DB**

**API Endpoint:** `POST /api/submit-lead`

**Location:** `web/app/api/submit-lead/route.ts`

**Process:**
1. Form data + calculated scores sent to API
2. API creates `leads` table if doesn't exist
3. Data inserted into Neon PostgreSQL database
4. Returns success with `leadId`

**Database Table:** `leads`
```sql
- id (UUID)
- full_name
- whatsapp_number
- email
- age, gender
- height_cm, weight_kg, waist_circumference
- fasting_blood_sugar, total_cholesterol, triglycerides
- weight_loss_attempts
- biggest_frustration (array)
- investment_timeline, commitment_level
- bmi_score, tyg_index, metabolic_risk_score, lead_quality_score
- submitted_at, created_at
```

**Status:** ✅ Working - Data successfully saved to database

---

### **Step 3: WhatsApp to Doctor**

**Process:**
1. After successful database save
2. Automatically opens WhatsApp with pre-filled message
3. Message includes:
   - Patient name, age, WhatsApp number, email
   - Metabolic Risk Score
   - Lead Quality Score
   - BMI, TyG Index
   - Interest in 90-Day Program in Gachibowli

**WhatsApp Link:**
```
https://wa.me/919963721999?text=[Encoded Message]
```

**Message Template:**
```
Hi Dr. Muddu! I completed the Metabolic Evaluation.

Name: [Full Name]
Age: [Age]
WhatsApp: [WhatsApp Number]
Email: [Email]

Metabolic Risk Score: [Score]%
Lead Quality Score: [Score]%
BMI: [BMI Score]
TyG Index: [TyG Index]

I'm interested in the 90-Day Metabolic Remission Program in Gachibowli, Hyderabad.
```

**Status:** ✅ Working - WhatsApp opens automatically with patient data

---

### **Step 4: Signup/Login**

**Location:** `/auth`

**Component:** `web/app/auth/page.tsx`

#### **Signup Flow:**
1. User clicks "Create Account" tab
2. Fills form:
   - Name
   - Email
   - Phone
   - Password
   - Confirm Password
3. Validation:
   - Passwords must match
   - Password min 6 characters
4. API Call: `POST /api/auth/signup`
5. Backend creates user in `users` table
6. Returns JWT token + user data
7. Token saved to `localStorage`
8. **Redirect:** Always goes to `/assessment` (new user has no assessment)

#### **Login Flow:**
1. User clicks "Login" tab
2. Fills form:
   - Email
   - Password
3. API Call: `POST /api/auth/login`
4. Backend validates credentials
5. Returns JWT token + user data
6. Token saved to `localStorage`
7. **Smart Redirect:**
   - Checks: `GET /api/assessments/latest`
   - If assessment exists → `/dashboard`
   - If no assessment (404) → `/assessment`

**Status:** ✅ Working - Auth flow complete with smart redirects

---

### **Step 5: Patient Dashboard**

**Location:** `/dashboard`

**Component:** `web/app/dashboard/page.tsx`

**Features:**
- Displays user's latest assessment data
- Shows metabolic metrics:
  - BMI
  - HOMA-IR
  - TyG Index
  - Metabolic Risk Score
- Health metrics tracking
- Progress visualization
- Habit tracking
- Real-time feedback

**Access:**
- Protected route (requires JWT token)
- Auto-redirects to `/auth` if not logged in
- Shows user's personalized data

**Status:** ✅ Working - Dashboard displays patient data

---

### **Step 6: Metabolic Remission Program**

**Program Details:**
- 90-Day Metabolic Remission Program
- Location: Gachibowli, Hyderabad
- Personalized treatment protocols
- AI-powered tracking
- Health coach support
- Daily habit tracking
- Real-time feedback

**Access Points:**
- Dashboard → Program enrollment
- Assessment completion → Program eligibility
- WhatsApp consultation → Program enrollment

**Status:** ✅ Working - Program accessible from dashboard

---

### **Step 7: Success!**

**Outcomes:**
- Patient enrolled in program
- Tracking metabolic parameters
- Receiving personalized care
- Progress monitoring
- Achieving metabolic remission

---

## 🔄 Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ 1. HOMEPAGE                                                 │
│    https://...onrender.com/                                 │
│    ↓                                                        │
│    Click "Start Free Assessment"                            │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. ASSESSMENT FORM                                          │
│    /google-assessment                                       │
│    ↓                                                        │
│    Fill: Name, Email, WhatsApp, Medical Data               │
│    Calculate: BMI, TyG, Metabolic Risk Score                │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. SAVE TO DATABASE                                         │
│    POST /api/submit-lead                                    │
│    ↓                                                        │
│    Insert into `leads` table (Neon PostgreSQL)              │
│    Return: leadId, success                                  │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. WHATSAPP TO DOCTOR                                       │
│    Auto-open: wa.me/919963721999                            │
│    ↓                                                        │
│    Pre-filled message with patient data + scores           │
│    Interest in 90-Day Program                              │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. SIGNUP/LOGIN                                             │
│    /auth                                                    │
│    ↓                                                        │
│    Signup: Name, Email, Phone, Password                     │
│    OR Login: Email, Password                                │
│    ↓                                                        │
│    Save JWT token to localStorage                           │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. SMART REDIRECT                                           │
│    Check: GET /api/assessments/latest                       │
│    ↓                                                        │
│    Has Assessment? → /dashboard                             │
│    No Assessment? → /assessment                             │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. PATIENT DASHBOARD                                        │
│    /dashboard                                               │
│    ↓                                                        │
│    View: Metabolic metrics, progress, habits                │
│    Access: 90-Day Program enrollment                       │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 8. METABOLIC REMISSION PROGRAM                              │
│    ↓                                                        │
│    Personalized treatment protocols                         │
│    AI-powered tracking                                      │
│    Health coach support                                     │
│    Daily habit tracking                                     │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 9. SUCCESS! 🎉                                              │
│    Metabolic remission achieved                             │
│    Health metrics improved                                  │
│    Patient satisfaction                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Verification Checklist

### Step 1: Homepage → Form
- [x] Homepage loads correctly
- [x] "Start Free Assessment" button works
- [x] Redirects to `/google-assessment`
- [x] Form displays all fields

### Step 2: Form → Database
- [x] Form submission works
- [x] API endpoint `/api/submit-lead` responds
- [x] Data saved to `leads` table
- [x] Returns success with `leadId`

### Step 3: Database → WhatsApp
- [x] WhatsApp opens automatically
- [x] Pre-filled message includes patient data
- [x] Doctor's number: 919963721999
- [x] Message includes scores and program interest

### Step 4: WhatsApp → Signup/Login
- [x] Auth page accessible at `/auth`
- [x] Signup form works
- [x] Login form works
- [x] JWT token saved to localStorage

### Step 5: Auth → Dashboard
- [x] Smart redirect logic works
- [x] Checks for existing assessment
- [x] Redirects to `/dashboard` if assessment exists
- [x] Redirects to `/assessment` if no assessment

### Step 6: Dashboard → Program
- [x] Dashboard displays patient data
- [x] Metabolic metrics shown
- [x] Program enrollment accessible
- [x] Protected routes work

---

## 🔧 Technical Implementation

### API Endpoints Used:
1. `POST /api/submit-lead` - Save lead data
2. `POST /api/auth/signup` - User registration
3. `POST /api/auth/login` - User authentication
4. `GET /api/assessments/latest` - Check for existing assessment

### Database Tables:
1. `leads` - Form submission data
2. `users` - User accounts
3. `patient_assessments` - Patient assessment data

### Authentication:
- JWT tokens stored in `localStorage`
- Protected routes check for token
- Auto-redirect to `/auth` if not authenticated

---

## 🎯 Key Features

✅ **Lead Capture:** Form saves all patient data  
✅ **WhatsApp Integration:** Instant doctor contact  
✅ **User Authentication:** Secure signup/login  
✅ **Smart Routing:** Context-aware redirects  
✅ **Dashboard Access:** Personalized patient portal  
✅ **Program Enrollment:** 90-Day Metabolic Remission Program  

---

## 📊 Status Summary

**All Steps:** ✅ **WORKING**  
**No Breaking Changes:** ✅ **CONFIRMED**  
**Patient Journey:** ✅ **COMPLETE**  

**Everything is functioning correctly! The patient journey from homepage to program enrollment is fully operational.**

