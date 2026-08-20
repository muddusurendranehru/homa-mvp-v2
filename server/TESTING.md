# 🧪 Backend Testing Guide

Complete testing checklist for the HOMA Clinic Backend API.

---

## 📋 Pre-Testing Setup

### 1. Verify Environment Variables

Make sure your `.env` file exists in `/server` with:

```env
DATABASE_URL=postgresql://neondb_owner:npg_zUbO5HZ9kDur@ep-icy-dream-ah5xlk96-pooler.c-3.us-east-1.aws.neon.tech/drmuddusmvp1?sslmode=require&channel_binding=require
JWT_SECRET=my_super_secret_key_12345
PORT=5000
NODE_ENV=development
```

### 2. Initialize Database

```bash
npm run init-db
```

Expected output:
```
✅ Database initialized successfully!
Tables created:
  - users
  - patient_assessments
```

### 3. Start Server

```bash
npm run dev
```

Expected output:
```
🩺 ========================================
   HOMA Health - Metabolic Remission MVP
   Dr. Muddu Surendra Nehru
========================================== 🩺

✅ Server running on port 5000
...
```

---

## 🧪 Test Cases

### ✅ Test 1: Health Check

**cURL:**
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "HOMA Clinic Backend is running",
  "timestamp": "2024-12-02T...",
  "version": "1.0.0"
}
```

**Postman:**
- Method: GET
- URL: `http://localhost:5000/api/health`
- Expected Status: 200 OK

---

### ✅ Test 2: User Signup

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Test Patient",
    "email": "patient1@test.com",
    "phone": "9876543210",
    "password": "SecurePass123!"
  }'
```

**Expected Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "a1b2c3d4-...",
    "name": "Dr. Test Patient",
    "email": "patient1@test.com",
    "phone": "9876543210",
    "created_at": "2024-12-02T..."
  }
}
```

**Postman:**
- Method: POST
- URL: `http://localhost:5000/api/auth/signup`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "name": "Dr. Test Patient",
  "email": "patient1@test.com",
  "phone": "9876543210",
  "password": "SecurePass123!"
}
```
- Expected Status: 201 Created

**Save the token** from the response for subsequent tests!

---

### ✅ Test 3: User Login

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient1@test.com",
    "password": "SecurePass123!"
  }'
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "a1b2c3d4-...",
    "name": "Dr. Test Patient",
    "email": "patient1@test.com",
    "phone": "9876543210",
    "created_at": "2024-12-02T..."
  }
}
```

**Postman:**
- Method: POST
- URL: `http://localhost:5000/api/auth/login`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "email": "patient1@test.com",
  "password": "SecurePass123!"
}
```
- Expected Status: 200 OK

---

### ✅ Test 4: Create Assessment (Requires Token)

**Replace `YOUR_TOKEN_HERE` with the token from signup/login!**

**cURL:**
```bash
curl -X POST http://localhost:5000/api/assessments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
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
    "procedures": "None",
    "post_menopausal": false
  }'
```

**Expected Response:**
```json
{
  "message": "Assessment created successfully",
  "assessment": {
    "id": "uuid-here",
    "user_id": "uuid-here",
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
    "procedures": "None",
    "post_menopausal": false,
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

**Postman:**
- Method: POST
- URL: `http://localhost:5000/api/assessments`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN_HERE`
- Body (raw JSON): Use the JSON from the cURL example
- Expected Status: 201 Created

---

### ✅ Test 5: Get Latest Assessment

**cURL:**
```bash
curl -X GET http://localhost:5000/api/assessments/latest \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Postman:**
- Method: GET
- URL: `http://localhost:5000/api/assessments/latest`
- Headers: `Authorization: Bearer YOUR_TOKEN_HERE`
- Expected Status: 200 OK

---

### ✅ Test 6: Get Assessment History

**cURL:**
```bash
curl -X GET http://localhost:5000/api/assessments/history \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "count": 1,
  "assessments": [
    {
      "id": "uuid-here",
      "user_id": "uuid-here",
      "age": 45,
      "gender": "Male",
      "created_at": "2024-12-02T...",
      "calculated_metrics": {
        "bmi": 29.41,
        "homa_ir": 4.07,
        "tyg_index": 9.12
      }
    }
  ]
}
```

**Postman:**
- Method: GET
- URL: `http://localhost:5000/api/assessments/history`
- Headers: `Authorization: Bearer YOUR_TOKEN_HERE`
- Expected Status: 200 OK

---

## ❌ Error Cases to Test

### Duplicate Email Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Another User",
    "email": "patient1@test.com",
    "password": "Test123!"
  }'
```
**Expected:** 409 Conflict - "User with this email already exists"

### Invalid Login Credentials
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient1@test.com",
    "password": "WrongPassword"
  }'
```
**Expected:** 401 Unauthorized - "Invalid email or password"

### Assessment Without Token
```bash
curl -X GET http://localhost:5000/api/assessments/latest
```
**Expected:** 401 Unauthorized - "Access denied. No token provided."

### Assessment With Invalid Token
```bash
curl -X GET http://localhost:5000/api/assessments/latest \
  -H "Authorization: Bearer invalid_token_123"
```
**Expected:** 403 Forbidden - "Invalid or expired token."

---

## 📊 Testing Checklist

- [ ] Health check returns 200 OK
- [ ] User can sign up successfully
- [ ] Duplicate email returns 409 error
- [ ] User can log in with correct credentials
- [ ] Wrong password returns 401 error
- [ ] JWT token is returned on signup/login
- [ ] Assessment creation works with valid token
- [ ] Assessment returns calculated metrics (BMI, HOMA-IR, TyG)
- [ ] Latest assessment returns correct data
- [ ] Assessment history shows all assessments
- [ ] Requests without token return 401
- [ ] Requests with invalid token return 403
- [ ] Database connection is established on startup

---

## 🎯 Expected Calculations

For the test patient (height: 170cm, weight: 85kg, waist: 102cm, FBS: 110, insulin: 15, triglycerides: 180):

| Metric | Expected Value | Status |
|--------|---------------|--------|
| **BMI** | 29.41 | Overweight |
| **HOMA-IR** | 4.07 | Significant IR |
| **TyG Index** | 9.12 | Insulin Resistance |
| **WHtR** | 0.6 | At Risk |

---

## 📞 Support

If any test fails, check:
1. Database connection string in `.env`
2. Database tables exist (run `npm run init-db`)
3. Server is running on correct port
4. Token is correctly copied and pasted

**Dr. Muddu Surendra Nehru**  
📱 09963721999

