# 📋 Assessment Form Fields - Complete Mapping

**Status:** ✅ All fields implemented in backend  
**Database:** Neon PostgreSQL  
**Tables:** `users` + `patient_assessments`

---

## 👤 Patient Profile

| Field | Type | Database Location | Required | Notes |
|-------|------|-------------------|----------|-------|
| **Full Name** | Text | `users.name` | ✅ Yes | Set during signup |
| **Age** | Number | `patient_assessments.age` | Optional | Can update per assessment |
| **Gender** | Select | `patient_assessments.gender` | Optional | Male / Female / Other |
| **Phone** | Text | `users.phone` | Optional | Set during signup |
| **Email** | Text | `users.email` | ✅ Yes | From authentication |

**Note:** User profile data (name, phone, email) comes from the `users` table created during signup. The frontend will display these when logged in.

---

## 📏 Body Metrics

| Field | Type | Database Field | Required | Unit | Notes |
|-------|------|----------------|----------|------|-------|
| **Height** | Number | `height_cm` | Optional | cm | For BMI calculation |
| **Weight** | Number | `weight_kg` | Optional | kg | For BMI calculation |
| **Waist Circumference** | Number | `waist_cm` | ✅ **REQUIRED** | cm | Core biomarker for central obesity |

---

## 🔬 Lab Values

| Field | Type | Database Field | Required | Unit | Notes |
|-------|------|----------------|----------|------|-------|
| **Fasting Blood Sugar (FBS)** | Number | `fbs` | Optional | mg/dL | For HOMA-IR & TyG calculation |
| **Fasting Insulin** | Number | `fasting_insulin` | Optional | μU/mL | For HOMA-IR calculation |
| **Post Lunch Blood Sugar** | Number | `post_lunch_bs` | Optional | mg/dL | Post-prandial glucose |
| **HbA1c** | Number | `hba1c` | Optional | % | 3-month glucose average |
| **Total Cholesterol** | Number | `total_cholesterol` | Optional | mg/dL | Lipid panel |
| **HDL** | Number | `hdl` | Optional | mg/dL | High-density lipoprotein |
| **LDL** | Number | `ldl` | Optional | mg/dL | Low-density lipoprotein |
| **Triglycerides** | Number | `triglycerides` | Optional | mg/dL | For TyG Index calculation |

**✅ Bonus Field Added:** `fasting_insulin` - Essential for calculating HOMA-IR (Insulin Resistance Score)

---

## 📝 Medical History

| Field | Type | Database Field | Required | Notes |
|-------|------|----------------|----------|-------|
| **Current Medications** | Text Area | `current_meds` | Optional | e.g., "Metformin 500mg, Atorvastatin 20mg" |
| **Past Procedures** | Text Area | `procedures` | Optional | e.g., "CAG, Angioplasty, Surgery" |
| **Post-Menopausal** | Yes/No | `post_menopausal` | Optional | Boolean (true/false) |

---

## 🧮 Auto-Calculated Metrics

When an assessment is created, the backend **automatically calculates** these:

| Metric | Formula | Uses Fields | Interpretation |
|--------|---------|-------------|----------------|
| **BMI** | weight / (height/100)² | weight_kg, height_cm | Underweight/Normal/Overweight/Obese |
| **HOMA-IR** | (FBS × Insulin) / 405 | fbs, fasting_insulin | Normal: <2.0, IR: >2.5 |
| **TyG Index** | Ln[(TG × FBS) / 2] | triglycerides, fbs | Normal: <8.5, IR: >8.8 |
| **WHtR** | Waist / Height | waist_cm, height_cm | Healthy: <0.5, At Risk: ≥0.5 |

---

## 📊 Database Schema Summary

### Users Table (Authentication & Profile)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,              -- ✅ Full Name
  email TEXT UNIQUE NOT NULL,       -- ✅ Email (from auth)
  password_hash TEXT NOT NULL,
  phone TEXT,                       -- ✅ Phone
  created_at TIMESTAMPTZ
);
```

### Patient Assessments Table (Health Data)
```sql
CREATE TABLE patient_assessments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  
  -- Patient Profile
  age INT,                          -- ✅ Age
  gender TEXT,                      -- ✅ Gender
  
  -- Body Metrics
  height_cm FLOAT,                  -- ✅ Height
  weight_kg FLOAT,                  -- ✅ Weight
  waist_cm FLOAT,                   -- ✅ Waist (REQUIRED)
  
  -- Lab Values
  fbs FLOAT,                        -- ✅ Fasting Blood Sugar
  fasting_insulin FLOAT,            -- ✅ Fasting Insulin (for HOMA-IR)
  post_lunch_bs FLOAT,              -- ✅ Post Lunch BS
  hba1c FLOAT,                      -- ✅ HbA1c
  total_cholesterol FLOAT,          -- ✅ Total Cholesterol
  hdl FLOAT,                        -- ✅ HDL
  ldl FLOAT,                        -- ✅ LDL
  triglycerides FLOAT,              -- ✅ Triglycerides
  
  -- Medical History
  current_meds TEXT,                -- ✅ Current Medications
  procedures TEXT,                  -- ✅ Past Procedures
  post_menopausal BOOLEAN,          -- ✅ Post-Menopausal
  
  created_at TIMESTAMPTZ
);
```

---

## 📋 Frontend Form Structure (For Next.js)

When you build the frontend, organize the form like this:

### Section 1: Patient Profile (Read-Only from Auth)
```typescript
// These come from users table - display only
- Full Name: {user.name}
- Email: {user.email}
- Phone: {user.phone}
```

### Section 2: Basic Info (Editable)
```typescript
- Age: <input type="number" />
- Gender: <select> Male / Female / Other </select>
```

### Section 3: Body Metrics
```typescript
- Height (cm): <input type="number" step="0.1" />
- Weight (kg): <input type="number" step="0.1" />
- Waist Circumference (cm): <input type="number" step="0.1" required />
```

### Section 4: Lab Values
```typescript
- Fasting Blood Sugar (mg/dL): <input type="number" step="0.1" />
- Fasting Insulin (μU/mL): <input type="number" step="0.1" />
- Post Lunch Blood Sugar (mg/dL): <input type="number" step="0.1" />
- HbA1c (%): <input type="number" step="0.1" />
- Total Cholesterol (mg/dL): <input type="number" step="0.1" />
- HDL (mg/dL): <input type="number" step="0.1" />
- LDL (mg/dL): <input type="number" step="0.1" />
- Triglycerides (mg/dL): <input type="number" step="0.1" />
```

### Section 5: Medical History
```typescript
- Current Medications: <textarea />
- Past Procedures: <textarea />
- Post-Menopausal: <radio> Yes / No </radio>
```

---

## ✅ Backend API Request Example

When submitting the assessment form, send this JSON:

```json
POST /api/assessments
Authorization: Bearer {jwt_token}
Content-Type: application/json

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
  "current_meds": "Metformin 500mg BD, Atorvastatin 20mg OD",
  "procedures": "CAG done in 2020",
  "post_menopausal": false
}
```

### Backend Response (with auto-calculated metrics):

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
    "current_meds": "Metformin 500mg BD, Atorvastatin 20mg OD",
    "procedures": "CAG done in 2020",
    "post_menopausal": false,
    "created_at": "2024-12-02T10:30:00.000Z",
    
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

## 🎯 Field Validation Rules (Frontend)

### Required Fields (Backend accepts but frontend should validate):
- ✅ **Waist Circumference** - Core biomarker

### Recommended for Calculations:
- For **BMI**: Need both height_cm AND weight_kg
- For **HOMA-IR**: Need both fbs AND fasting_insulin
- For **TyG Index**: Need both triglycerides AND fbs
- For **WHtR**: Need both waist_cm AND height_cm

### Optional but Important:
- HbA1c - 3-month glucose average (critical for diabetes monitoring)
- Lipid panel (Total Chol, HDL, LDL, TG) - Cardiovascular risk

---

## ✅ Verification Checklist

- [x] Full Name - Stored in `users.name`
- [x] Age - In `patient_assessments.age`
- [x] Gender - In `patient_assessments.gender`
- [x] Phone - In `users.phone`
- [x] Email - In `users.email` (from auth)
- [x] Height - In `patient_assessments.height_cm`
- [x] Weight - In `patient_assessments.weight_kg`
- [x] Waist - In `patient_assessments.waist_cm` ✅ REQUIRED
- [x] FBS - In `patient_assessments.fbs`
- [x] Fasting Insulin - In `patient_assessments.fasting_insulin`
- [x] Post Lunch BS - In `patient_assessments.post_lunch_bs`
- [x] HbA1c - In `patient_assessments.hba1c`
- [x] Total Cholesterol - In `patient_assessments.total_cholesterol`
- [x] HDL - In `patient_assessments.hdl`
- [x] LDL - In `patient_assessments.ldl`
- [x] Triglycerides - In `patient_assessments.triglycerides`
- [x] Current Medications - In `patient_assessments.current_meds`
- [x] Past Procedures - In `patient_assessments.procedures`
- [x] Post-Menopausal - In `patient_assessments.post_menopausal`

**✅ ALL FIELDS PRESENT AND WORKING**

---

## 📞 Contact

**Dr. Muddu Surendra Nehru**  
Professor of Medicine  
📱 09963721999

🎓 **ATTEND OUR CLASSES • BECOME A METABOLISM SPECIALIST**

