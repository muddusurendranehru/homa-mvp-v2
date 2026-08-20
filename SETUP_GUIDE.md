# 🚀 HOMA Clinic MVP - Complete Setup Guide

**Dr. Muddu Surendra Nehru**  
**Professor of Medicine**  
📞 **09963721999**

---

## 📁 Project Structure

```
DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION/
├── PRD.md                    # Product Requirements Document
├── DATABASE_SETUP.md         # Database documentation
├── SETUP_GUIDE.md           # This file
└── server/                   # Backend API (Node.js + Express)
    ├── package.json
    ├── server.js
    ├── schema.sql
    ├── .env.example
    ├── .gitignore
    ├── README.md
    ├── TESTING.md
    ├── config/
    │   └── database.js       # Neon PostgreSQL connection
    ├── middleware/
    │   └── auth.js           # JWT authentication
    ├── routes/
    │   ├── auth.js           # Signup & Login
    │   └── assessments.js    # CRUD for assessments
    ├── utils/
    │   └── calculations.js   # BMI, HOMA-IR, TyG calculations
    └── scripts/
        └── init-db.js        # Database initialization
```

---

## ⚡ Quick Start (Backend Only)

### Step 1: Navigate to Server Directory

```bash
cd server
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- **express** - Web framework
- **pg** - PostgreSQL client for Neon
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - Cross-origin requests
- **nodemon** - Dev server auto-reload

### Step 3: Create Environment File

Create a file named `.env` in the `/server` directory:

```bash
# Inside /server directory
touch .env
```

Add the following content to `.env`:

```env
DATABASE_URL=postgresql://neondb_owner:npg_zUbO5HZ9kDur@ep-icy-dream-ah5xlk96-pooler.c-3.us-east-1.aws.neon.tech/drmuddusmvp1?sslmode=require&channel_binding=require

JWT_SECRET=homa_clinic_jwt_secret_key_2024_change_this_in_production

PORT=5000
NODE_ENV=development
```

⚠️ **Important:** Change the `JWT_SECRET` to a strong random string in production!

### Step 4: Initialize Database Tables

```bash
npm run init-db
```

Expected output:
```
🔄 Connecting to Neon PostgreSQL...
📋 Executing schema...
✅ Database initialized successfully!

Tables created:
  - users
  - patient_assessments
```

### Step 5: Start the Server

**Development mode (auto-reload on file changes):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Expected output:
```
🩺 ========================================
   HOMA Health - Metabolic Remission MVP
   Dr. Muddu Surendra Nehru
========================================== 🩺

✅ Server running on port 5000
📍 Health check: http://localhost:5000/api/health
🔐 Auth endpoints:
   POST http://localhost:5000/api/auth/signup
   POST http://localhost:5000/api/auth/login
📊 Assessment endpoints:
   POST http://localhost:5000/api/assessments
   GET  http://localhost:5000/api/assessments/latest
   GET  http://localhost:5000/api/assessments/history

Environment: development
==========================================
```

### Step 6: Test the Health Endpoint

Open a new terminal and run:

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "HOMA Clinic Backend is running",
  "timestamp": "2024-12-02T...",
  "version": "1.0.0"
}
```

✅ **Backend is ready!** Now you can test with Postman or cURL.

---

## 🧪 Testing with Postman

### 1. Import into Postman

Create a new collection called "HOMA Clinic API" with these requests:

#### Request 1: Health Check
- **Method:** GET
- **URL:** `http://localhost:5000/api/health`

#### Request 2: Signup
- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/signup`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "name": "Test Patient",
  "email": "test@example.com",
  "phone": "9876543210",
  "password": "SecurePass123!"
}
```

#### Request 3: Login
- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "email": "test@example.com",
  "password": "SecurePass123!"
}
```

#### Request 4: Create Assessment
- **Method:** POST
- **URL:** `http://localhost:5000/api/assessments`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN_FROM_LOGIN`
- **Body (raw JSON):**
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

#### Request 5: Get Latest Assessment
- **Method:** GET
- **URL:** `http://localhost:5000/api/assessments/latest`
- **Headers:** `Authorization: Bearer YOUR_TOKEN`

#### Request 6: Get Assessment History
- **Method:** GET
- **URL:** `http://localhost:5000/api/assessments/history`
- **Headers:** `Authorization: Bearer YOUR_TOKEN`

### 2. Testing Flow

1. ✅ Call **Health Check** → Should return `{ status: "ok" }`
2. ✅ Call **Signup** → Copy the `token` from response
3. ✅ Call **Login** → Verify you get the same user back
4. ✅ Call **Create Assessment** → Use token in Authorization header
5. ✅ Verify **calculated_metrics** are returned (BMI, HOMA-IR, TyG)
6. ✅ Call **Latest Assessment** → Should return the assessment you just created
7. ✅ Call **History** → Should show all assessments

📄 **Full testing checklist:** See `server/TESTING.md`

---

## 🧮 Calculated Metrics

The API automatically calculates these metabolic indicators:

### BMI (Body Mass Index)
```
Formula: weight (kg) / height (m)²
```

### HOMA-IR (Insulin Resistance)
```
Formula: (Fasting Glucose × Fasting Insulin) / 405
Interpretation:
  • Optimal: < 1.0
  • Normal: 1.0 - 2.0
  • Early IR: 2.0 - 2.9
  • Significant IR: ≥ 2.9
```

### TyG Index (Triglyceride-Glucose Index)
```
Formula: Ln[(Triglycerides × Fasting Glucose) / 2]
Interpretation:
  • Normal: < 8.5
  • Borderline: 8.5 - 8.8
  • Insulin Resistance: > 8.8
```

### WHtR (Waist-to-Height Ratio)
```
Formula: Waist (cm) / Height (cm)
Status: Healthy (<0.5), At Risk (≥0.5)
```

---

## 🔐 Security Features

✅ **Password Hashing:** bcrypt with 10 salt rounds  
✅ **JWT Authentication:** 7-day token expiration  
✅ **SSL/TLS:** Required for Neon database connection  
✅ **CORS:** Configured for cross-origin requests  
✅ **Input Validation:** Required fields checked  

---

## 🗄️ Database Access

**Neon Console:** [https://console.neon.tech/app/projects/proud-sunset-82737074](https://console.neon.tech/app/projects/proud-sunset-82737074?branchId=br-blue-wildflower-ahnf9ofw&database=drmuddusmvp1)

**Database:** `drmuddusmvp1`  
**Region:** US East 1 (AWS)  
**Connection:** Pooled connection for better performance  

---

## 📝 Next Steps

After verifying the backend works:

1. ✅ Test all 6 endpoints in Postman/cURL
2. ✅ Verify calculated metrics are correct
3. ✅ Test error cases (duplicate email, wrong password, missing token)
4. ⏳ Build the Next.js frontend in `/web` directory
5. ⏳ Integrate frontend with these API endpoints
6. ⏳ Deploy to production (Vercel for frontend, Railway/Render for backend)

---

## 🐛 Troubleshooting

### Error: "Cannot connect to database"
- Check your `.env` file exists in `/server` directory
- Verify `DATABASE_URL` is correct
- Test connection manually: Visit [Neon Console](https://console.neon.tech)

### Error: "relation 'users' does not exist"
- Run `npm run init-db` to create tables
- Check Neon console to verify tables exist

### Error: "JWT_SECRET is not defined"
- Make sure `.env` file has `JWT_SECRET=...`
- Restart the server after adding `.env`

### Port 5000 already in use
- Change `PORT=5001` in `.env`
- Or kill the process using port 5000

---

## 📞 Contact & Support

**Dr. Muddu Surendra Nehru**  
**Professor of Medicine**  
📱 **09963721999**

🎓 **ATTEND OUR CLASSES • BECOME A METABOLISM SPECIALIST**

---

## 📚 Documentation Files

- **PRD.md** - Product requirements and vision
- **DATABASE_SETUP.md** - Database schema details
- **server/README.md** - Backend API documentation
- **server/TESTING.md** - Complete testing guide
- **SETUP_GUIDE.md** - This file (setup instructions)

---

**Status:** ✅ Backend Complete  
**Next:** Build Next.js frontend (coming soon)

