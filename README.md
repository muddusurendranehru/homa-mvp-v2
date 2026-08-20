# 🩺 HOMA Health - Metabolic Remission MVP

**"Achieve metabolic disease remission in 90 days — not just manage it."**

---

## 👨‍⚕️ About

**DR. MUDDU SURENDRA NEHRU**  
**Professor of Medicine**  
📞 **09963721999**

🎓 **ATTEND OUR CLASSES • BECOME A METABOLISM SPECIALIST**

---

## 📁 Project Structure

```
DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION/
│
├── 📄 README.md                  # This file - Project overview
├── 📄 PRD.md                     # Product Requirements Document
├── 📄 DATABASE_SETUP.md          # Database schema details
├── 📄 SETUP_GUIDE.md             # Step-by-step setup instructions
├── 📄 PROJECT_STATUS.md          # Current progress tracker
├── 📄 .gitignore                 # Git ignore rules
│
└── 🖥️ server/                     # Backend API (Node.js + Express)
    ├── 📄 package.json            # Dependencies
    ├── 📄 server.js               # Main Express application
    ├── 📄 schema.sql              # PostgreSQL schema
    ├── 📄 README.md               # API documentation
    ├── 📄 TESTING.md              # Testing guide
    ├── 📄 .gitignore              # Backend-specific ignores
    ├── 📄 .env.example            # Environment template
    │
    ├── 📂 config/
    │   └── database.js            # Neon PostgreSQL connection
    │
    ├── 📂 middleware/
    │   └── auth.js                # JWT authentication
    │
    ├── 📂 routes/
    │   ├── auth.js                # Signup & Login
    │   └── assessments.js         # Assessment CRUD
    │
    ├── 📂 utils/
    │   └── calculations.js        # BMI, HOMA-IR, TyG
    │
    └── 📂 scripts/
        └── init-db.js             # Database initialization
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Set Up Environment

Create `server/.env`:

```env
DATABASE_URL=your_neon_connection_string_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
```

### 3. Initialize Database

```bash
npm run init-db
```

### 4. Start Server

```bash
npm run dev
```

### 5. Test Health Check

```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "HOMA Clinic Backend is running"
}
```

✅ **Backend is running!**

---

## 📡 API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/health` | GET | No | Health check |
| `/api/auth/signup` | POST | No | Create new user |
| `/api/auth/login` | POST | No | Authenticate user |
| `/api/assessments` | POST | Yes | Create assessment |
| `/api/assessments/latest` | GET | Yes | Get latest assessment |
| `/api/assessments/history` | GET | Yes | Get all assessments |

**Full API Documentation:** See `server/README.md`

---

## 🧮 Calculated Metrics

The API automatically calculates:

- **BMI** (Body Mass Index) - Weight status indicator
- **HOMA-IR** (Insulin Resistance) - Normal: <2.0, IR: >2.5
- **TyG Index** (Triglyceride-Glucose) - Normal: <8.5, IR: >8.8
- **WHtR** (Waist-to-Height Ratio) - Healthy: <0.5

---

## 🗄️ Database

**Provider:** Neon PostgreSQL (Serverless)  
**Console:** [https://console.neon.tech](https://console.neon.tech/app/projects/proud-sunset-82737074)

### Tables:
- `users` - User accounts (email, password_hash, phone)
- `patient_assessments` - Health assessments (biomarkers, vitals)

---

## 🔐 Security

✅ Password hashing with bcrypt  
✅ JWT token authentication  
✅ SSL/TLS database connection  
✅ CORS enabled  
✅ Input validation  

---

## 🧪 Testing

**Complete testing guide:** `server/TESTING.md`

### Quick Test Flow:

1. **Sign up a user:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Pass123"}'
```

2. **Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Pass123"}'
```

3. **Create assessment** (use token from login):
```bash
curl -X POST http://localhost:5000/api/assessments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"age":45,"gender":"Male","height_cm":170,"weight_kg":85,"waist_cm":102,"fbs":110,"fasting_insulin":15,"triglycerides":180,"hba1c":6.2}'
```

---

## 📚 Documentation

| File | Purpose | Lines |
|------|---------|-------|
| **README.md** | This file - Quick overview | 268 |
| **COMPLETE_PROJECT_SUMMARY.md** | 📊 **Everything we've done** | 500+ |
| **PROJECT_ARCHITECTURE.md** | 🏗️ **Visual diagrams** | 400+ |
| **PRD.md** | Product requirements and vision | 61 |
| **MASTER_PROJECT_PLAN.md** | Complete project plan | 731 |
| **SETUP_GUIDE.md** | Complete setup instructions | 357 |
| **QUICK_START.md** | Quick reference guide | 312 |
| **DATABASE_SETUP.md** | Database schema details | 109 |
| **PROJECT_STATUS.md** | Current progress tracker | 231 |
| **BACKEND_VERIFICATION.md** | Line-by-line verification | 576 |
| **TEST_RESULTS_SUMMARY.md** | Detailed test results | 676 |
| **TESTING_COMPLETE.md** | Testing summary | 367 |
| **ASSESSMENT_FIELDS_MAPPING.md** | Field reference | 291 |
| **MIGRATION_GUIDE_VLDL.md** | VLDL migration guide | 446 |
| **VLDL_MIGRATION_SUCCESS.md** | VLDL migration summary | 300+ |
| **SQL_COMMANDS.md** | SQL reference | 472 |
| **server/README.md** | Backend API documentation | 372 |
| **server/TESTING.md** | Testing guide with examples | 382 |
| **server/TEST_DATABASE.sql** | SQL test scripts | 400+ |

**Total:** 18 comprehensive documentation files (5,500+ lines)

---

## 📊 Current Status

✅ **Backend:** Complete and ready for testing  
⏳ **Frontend:** Not started yet  

**See `PROJECT_STATUS.md` for detailed progress**

---

## 🎯 Vision

Help patients achieve metabolic disease remission in 90 days using:

- **4 Core Biomarkers:** HOMA-IR, TYG Index, Waist, HbA1c
- **4 Daily Habits:** Nutrition (1800-2000 kcal), Sleep (7-8h), Steps (10K), Medicines
- **5-Patient Pilot → Scale to 10,000 patients**

---

## 👥 Team Roles

- **Developer:** Build app, manage database
- **Health Manager:** Interpret data, adjust protocols
- **Reception/Phlebotomist:** Collect blood, log labs
- **Nurse:** Measure vitals, patient education
- **Chemist:** Dispense supplements

---

## 🛠️ Tech Stack

### Backend (Complete ✅)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** Neon PostgreSQL
- **Auth:** JWT + bcrypt
- **Dependencies:** pg, express, dotenv, cors

### Frontend (Pending ⏳)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Mobile-First:** Responsive design

---

## 📞 Contact

**Dr. Muddu Surendra Nehru**  
Professor of Medicine  
📱 **09963721999**

🎓 **ATTEND OUR CLASSES • BECOME A METABOLISM SPECIALIST**

---

## 🚦 Next Steps

1. ✅ Backend setup complete
2. **→ Test all API endpoints** (see `server/TESTING.md`)
3. ⏳ Build Next.js frontend
4. ⏳ Integrate frontend with backend
5. ⏳ Deploy to production
6. ⏳ Launch 5-patient pilot

---

**Last Updated:** December 2, 2024  
**Version:** 1.0.0 (Backend Only)

