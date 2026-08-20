# 🩺 HOMA Clinic Backend

**Metabolic Remission Platform - REST API**

Dr. Muddu Surendra Nehru, Professor of Medicine

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Create a `.env` file in the `/server` directory:

```env
DATABASE_URL=postgresql://neondb_owner:npg_zUbO5HZ9kDur@ep-icy-dream-ah5xlk96-pooler.c-3.us-east-1.aws.neon.tech/drmuddusmvp1?sslmode=require&channel_binding=require
JWT_SECRET=your_strong_random_secret_here
PORT=5000
NODE_ENV=development
```

### 3. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start at: `http://localhost:5000`

---

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "HOMA Clinic Backend is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

---

### Authentication

#### Sign Up
```
POST /api/auth/signup
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Assessments

**All assessment endpoints require authentication. Include JWT token in the Authorization header:**

```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### Create Assessment
```
POST /api/assessments
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
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
  "procedures": "None",
  "post_menopausal": false
}
```

**Response:**
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
    "hba1c": 6.2,
    "created_at": "2024-01-01T00:00:00.000Z",
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

#### Get Latest Assessment
```
GET /api/assessments/latest
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:** Same structure as create assessment response.

#### Get Assessment History
```
GET /api/assessments/history
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "count": 3,
  "assessments": [
    {
      "id": "uuid-3",
      "created_at": "2024-03-01T00:00:00.000Z",
      "calculated_metrics": { ... }
    },
    {
      "id": "uuid-2",
      "created_at": "2024-02-01T00:00:00.000Z",
      "calculated_metrics": { ... }
    },
    {
      "id": "uuid-1",
      "created_at": "2024-01-01T00:00:00.000Z",
      "calculated_metrics": { ... }
    }
  ]
}
```

---

## 🧮 Calculated Metrics

The API automatically calculates these metabolic indicators:

### BMI (Body Mass Index)
- **Formula:** weight (kg) / height (m)²
- **Categories:** Underweight (<18.5), Normal (18.5-25), Overweight (25-30), Obese (>30)

### HOMA-IR (Homeostatic Model Assessment of Insulin Resistance)
- **Formula:** (Fasting Glucose × Fasting Insulin) / 405
- **Interpretation:**
  - Optimal: < 1.0
  - Normal: 1.0 - 2.0
  - Early IR: 2.0 - 2.9
  - Significant IR: ≥ 2.9

### TyG Index (Triglyceride-Glucose Index)
- **Formula:** Ln[(Triglycerides × Fasting Glucose) / 2]
- **Interpretation:**
  - Normal: < 8.5
  - Borderline: 8.5 - 8.8
  - Insulin Resistance: > 8.8

### WHtR (Waist-to-Height Ratio)
- **Formula:** Waist (cm) / Height (cm)
- **Status:** Healthy (<0.5), At Risk (≥0.5)

---

## 🧪 Testing with cURL

### Test Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "password": "Test123!"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

### Test Create Assessment (replace TOKEN)
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
    "hba1c": 6.2,
    "triglycerides": 180
  }'
```

---

## 🗄️ Database Schema

### Users Table
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

### Patient Assessments Table
```sql
CREATE TABLE patient_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  age INT,
  gender TEXT,
  height_cm FLOAT,
  weight_kg FLOAT,
  waist_cm FLOAT,
  fbs FLOAT,
  fasting_insulin FLOAT,
  post_lunch_bs FLOAT,
  hba1c FLOAT,
  total_cholesterol FLOAT,
  hdl FLOAT,
  ldl FLOAT,
  triglycerides FLOAT,
  current_meds TEXT,
  procedures TEXT,
  post_menopausal BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🔒 Security Features

- ✅ **Password Hashing:** bcrypt with 10 salt rounds
- ✅ **JWT Authentication:** 7-day token expiration
- ✅ **SSL/TLS:** Required for Neon database connection
- ✅ **CORS:** Configured for cross-origin requests
- ✅ **Input Validation:** Required fields checked

---

## 📞 Support

**Dr. Muddu Surendra Nehru**  
Professor of Medicine  
📱 09963721999

🎓 **ATTEND OUR CLASSES • BECOME A METABOLISM SPECIALIST**

