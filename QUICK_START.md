# 🚀 HOMA Clinic - Quick Start Guide

**Status:** ✅ Backend Complete & Tested | Server Running on Port 5000

---

## ⚡ Start Server (3 Commands)

```bash
cd server
npm install           # Only needed once
npm run dev          # Start server
```

**Expected Output:**
```
✅ Server running on port 5000
📍 Health check: http://localhost:5000/api/health
```

---

## 🧪 Run Tests

### Database Tests
```bash
cd server
npm run test-db      # Test schema, insert, fetch
```

### API Tests
```bash
cd server
powershell -ExecutionPolicy Bypass -File test-api.ps1
```

---

## 📡 API Endpoints (Copy-Paste Ready)

### 1. Health Check (No Auth)
```bash
curl http://localhost:5000/api/health
```

### 2. Signup (No Auth)
```powershell
$body = @{
    name = "New Patient"
    email = "patient@example.com"
    phone = "9876543210"
    password = "SecurePass123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/signup" `
    -Method Post -Body $body -ContentType "application/json"
```

### 3. Login (No Auth)
```powershell
$body = @{
    email = "patient@example.com"
    password = "SecurePass123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
    -Method Post -Body $body -ContentType "application/json"

$token = $response.token  # Save token for next requests
```

### 4. Create Assessment (Auth Required)
```powershell
$body = @{
    age = 45
    gender = "Male"
    height_cm = 170
    weight_kg = 85
    waist_cm = 102
    fbs = 110
    fasting_insulin = 15
    hba1c = 6.2
    triglycerides = 180
} | ConvertTo-Json

$headers = @{ Authorization = "Bearer $token" }

Invoke-RestMethod -Uri "http://localhost:5000/api/assessments" `
    -Method Post -Body $body -Headers $headers -ContentType "application/json"
```

### 5. Get Latest Assessment (Auth Required)
```powershell
$headers = @{ Authorization = "Bearer $token" }

Invoke-RestMethod -Uri "http://localhost:5000/api/assessments/latest" `
    -Method Get -Headers $headers
```

### 6. Get Assessment History (Auth Required)
```powershell
$headers = @{ Authorization = "Bearer $token" }

Invoke-RestMethod -Uri "http://localhost:5000/api/assessments/history" `
    -Method Get -Headers $headers
```

---

## 🗄️ Database Commands (Neon Console)

**Console URL:**  
https://console.neon.tech/app/projects/proud-sunset-82737074

### Initialize Tables
```sql
-- Run in Neon SQL Editor
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS patient_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  age INT, gender TEXT, height_cm FLOAT, weight_kg FLOAT, waist_cm FLOAT,
  fbs FLOAT, fasting_insulin FLOAT, post_lunch_bs FLOAT, hba1c FLOAT,
  total_cholesterol FLOAT, hdl FLOAT, ldl FLOAT, triglycerides FLOAT,
  current_meds TEXT, procedures TEXT, post_menopausal BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### View All Users
```sql
SELECT id, name, email, phone, created_at FROM users ORDER BY created_at DESC;
```

### View All Assessments
```sql
SELECT 
  u.name,
  a.age,
  a.waist_cm,
  a.fbs,
  a.hba1c,
  a.created_at
FROM patient_assessments a
JOIN users u ON a.user_id = u.id
ORDER BY a.created_at DESC;
```

### View Assessments with Calculations
```sql
SELECT 
  age,
  waist_cm,
  fbs,
  hba1c,
  ROUND((weight_kg / POWER(height_cm / 100.0, 2))::numeric, 2) as bmi,
  ROUND(((fbs * fasting_insulin) / 405.0)::numeric, 2) as homa_ir,
  ROUND(LN((triglycerides * fbs) / 2.0)::numeric, 2) as tyg_index
FROM patient_assessments 
ORDER BY created_at DESC;
```

---

## 📁 Project Structure

```
DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION/
├── server/                    ✅ Backend (Complete)
│   ├── config/
│   │   └── database.js        - Neon connection
│   ├── middleware/
│   │   └── auth.js            - JWT verification
│   ├── routes/
│   │   ├── auth.js            - Signup, Login
│   │   └── assessments.js     - CRUD operations
│   ├── utils/
│   │   └── calculations.js    - BMI, HOMA-IR, TyG
│   ├── scripts/
│   │   ├── init-db.js         - Initialize database
│   │   └── test-database.js   - Test suite
│   ├── server.js              - Main Express app
│   ├── schema.sql             - Database schema
│   ├── package.json           - Dependencies
│   └── .env                   - Environment config
│
├── web/                       ⏳ Frontend (To Build)
│   └── (Next.js 14 app)
│
└── Documentation/
    ├── README.md              - Project overview
    ├── PRD.md                 - Product requirements
    ├── MASTER_PROJECT_PLAN.md - Complete plan
    ├── SETUP_GUIDE.md         - Setup instructions
    ├── TEST_RESULTS_SUMMARY.md - Test results
    ├── SQL_COMMANDS.md        - SQL reference
    └── QUICK_START.md         - This file
```

---

## 🧮 Metabolic Calculations

### BMI
```
Formula: weight(kg) / (height(m))²
Categories: <18.5 Underweight | 18.5-25 Normal | 25-30 Overweight | >30 Obese
```

### HOMA-IR
```
Formula: (FBS × Fasting Insulin) / 405
Interpretation: <1 Optimal | 1-2 Normal | 2-2.9 Early IR | ≥2.9 Significant IR
```

### TyG Index
```
Formula: Ln[(Triglycerides × FBS) / 2]
Interpretation: <8.5 Normal | 8.5-8.8 Borderline | >8.8 Insulin Resistance
```

### WHtR
```
Formula: Waist(cm) / Height(cm)
Status: <0.5 Healthy | ≥0.5 At Risk
```

---

## 📊 Test Results

**Database Tests:** ✅ 7/7 Passed  
**API Tests:** ✅ 6/6 Passed  
**Calculation Tests:** ✅ 4/4 Passed  

**Total:** ✅ 17/17 Passed (100%)

**View Details:** `TEST_RESULTS_SUMMARY.md`

---

## 🔧 Troubleshooting

### Server Won't Start
```bash
# Check if port 5000 is in use
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess

# Use different port
# Edit server/.env: PORT=5001
```

### Database Connection Failed
```bash
# Verify .env file exists
Test-Path server/.env

# Check connection string
Get-Content server/.env | Select-String "DATABASE_URL"

# Test connection
cd server
npm run test-db
```

### JWT Token Issues
```bash
# Verify JWT_SECRET is set
Get-Content server/.env | Select-String "JWT_SECRET"

# Token expired (login again to get new token)
```

---

## 📞 Support

**Dr. Muddu Surendra Nehru**  
Professor of Medicine  
📱 **09963721999**  
💬 **WhatsApp:** https://wa.me/919963721999

🎓 **ATTEND OUR CLASSES • BECOME A METABOLISM SPECIALIST**

---

## 🎯 Next Steps

1. ✅ **Backend Complete** - All tests passed
2. **Test with Postman** - Import endpoints and test
3. **Build Frontend** - Next.js 14 web app
4. **Integration** - Connect frontend to backend
5. **Deploy** - Render Web Services
6. **Launch** - Onboard first 5 patients

---

**Last Updated:** December 2, 2025  
**Version:** 1.0.0 (Backend Complete)  
**Status:** 🎉 **READY FOR FRONTEND DEVELOPMENT**

