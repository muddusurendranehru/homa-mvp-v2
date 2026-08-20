# 🗄️ SQL Commands for HOMA Clinic Database

**Database:** drmuddusmvp1  
**Console:** https://console.neon.tech/app/projects/proud-sunset-82737074/branches/br-blue-wildflower-ahnf9ofw/tables?database=drmuddusmvp1

---

## 📋 1. Create Tables

### Enable UUID Extension
```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

### Create Users Table
```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Create Patient Assessments Table
```sql
CREATE TABLE IF NOT EXISTS patient_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
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

### Create Indexes
```sql
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON patient_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON patient_assessments(created_at DESC);
```

### Add Table Comments
```sql
COMMENT ON TABLE users IS 'Stores user account information';
COMMENT ON TABLE patient_assessments IS 'Stores patient health assessments and biomarkers';

COMMENT ON COLUMN patient_assessments.fbs IS 'Fasting Blood Sugar (mg/dL)';
COMMENT ON COLUMN patient_assessments.hba1c IS 'Glycated Hemoglobin (%)';
COMMENT ON COLUMN patient_assessments.fasting_insulin IS 'Fasting Insulin (μU/mL)';
COMMENT ON COLUMN patient_assessments.triglycerides IS 'Triglycerides (mg/dL)';
COMMENT ON COLUMN patient_assessments.hdl IS 'High-Density Lipoprotein (mg/dL)';
COMMENT ON COLUMN patient_assessments.ldl IS 'Low-Density Lipoprotein (mg/dL)';
```

---

## 🧪 2. Test Data - Insert Sample Records

### Insert Test User
```sql
INSERT INTO users (name, email, password_hash, phone, created_at) 
VALUES (
  'Dr. Test Patient',
  'test@homaclinic.com',
  '$2b$10$abcdefghijklmnopqrstuvwxyz123456',  -- This is a bcrypt hash
  '9876543210',
  NOW()
) RETURNING *;
```

### Insert Test Assessment
```sql
-- First, get the user_id from the users table
-- Replace 'YOUR_USER_ID_HERE' with the actual UUID

INSERT INTO patient_assessments (
  user_id, age, gender, height_cm, weight_kg, waist_cm,
  fbs, fasting_insulin, post_lunch_bs, hba1c,
  total_cholesterol, hdl, ldl, triglycerides,
  current_meds, procedures, post_menopausal, created_at
) VALUES (
  'YOUR_USER_ID_HERE',  -- Replace with actual user ID
  45,                   -- age
  'Male',               -- gender
  170.0,                -- height_cm
  85.0,                 -- weight_kg
  102.0,                -- waist_cm
  110.0,                -- fbs (Fasting Blood Sugar)
  15.0,                 -- fasting_insulin
  145.0,                -- post_lunch_bs
  6.2,                  -- hba1c
  220.0,                -- total_cholesterol
  40.0,                 -- hdl
  150.0,                -- ldl
  180.0,                -- triglycerides
  'Metformin 500mg BD, Atorvastatin 20mg OD',
  'CAG done in 2020',
  false,                -- post_menopausal
  NOW()
) RETURNING *;
```

---

## 📊 3. Query Data (Fetch/Select)

### Get All Users
```sql
SELECT id, name, email, phone, created_at 
FROM users 
ORDER BY created_at DESC;
```

### Get User by Email
```sql
SELECT id, name, email, phone, created_at 
FROM users 
WHERE email = 'test@homaclinic.com';
```

### Get All Assessments for a User
```sql
-- Replace 'YOUR_USER_ID_HERE' with actual UUID
SELECT * 
FROM patient_assessments 
WHERE user_id = 'YOUR_USER_ID_HERE' 
ORDER BY created_at DESC;
```

### Get Latest Assessment for a User
```sql
-- Replace 'YOUR_USER_ID_HERE' with actual UUID
SELECT * 
FROM patient_assessments 
WHERE user_id = 'YOUR_USER_ID_HERE' 
ORDER BY created_at DESC 
LIMIT 1;
```

### Get Assessment with Calculated Metrics
```sql
-- Replace 'YOUR_USER_ID_HERE' with actual UUID
SELECT 
  id,
  age,
  gender,
  height_cm,
  weight_kg,
  waist_cm,
  fbs,
  fasting_insulin,
  hba1c,
  triglycerides,
  
  -- Calculated BMI
  ROUND((weight_kg / POWER(height_cm / 100.0, 2))::numeric, 2) as bmi,
  
  -- Calculated HOMA-IR
  CASE 
    WHEN fasting_insulin IS NOT NULL 
    THEN ROUND(((fbs * fasting_insulin) / 405.0)::numeric, 2)
    ELSE NULL 
  END as homa_ir,
  
  -- Calculated TyG Index
  CASE 
    WHEN triglycerides IS NOT NULL AND fbs IS NOT NULL 
    THEN ROUND(LN((triglycerides * fbs) / 2.0)::numeric, 2)
    ELSE NULL 
  END as tyg_index,
  
  -- Calculated WHtR
  ROUND((waist_cm / height_cm)::numeric, 3) as whtr,
  
  created_at
FROM patient_assessments 
WHERE user_id = 'YOUR_USER_ID_HERE' 
ORDER BY created_at DESC;
```

### Join Users and Assessments
```sql
SELECT 
  u.name,
  u.email,
  a.created_at as assessment_date,
  a.waist_cm,
  a.fbs,
  a.hba1c,
  ROUND((a.weight_kg / POWER(a.height_cm / 100.0, 2))::numeric, 2) as bmi
FROM users u
LEFT JOIN patient_assessments a ON u.id = a.user_id
ORDER BY a.created_at DESC;
```

---

## 📈 4. Database Statistics

### Count Users
```sql
SELECT COUNT(*) as total_users FROM users;
```

### Count Assessments
```sql
SELECT COUNT(*) as total_assessments FROM patient_assessments;
```

### Count Assessments per User
```sql
SELECT 
  u.name,
  u.email,
  COUNT(a.id) as assessment_count
FROM users u
LEFT JOIN patient_assessments a ON u.id = a.user_id
GROUP BY u.id, u.name, u.email
ORDER BY assessment_count DESC;
```

### Get Latest 10 Assessments (All Users)
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
ORDER BY a.created_at DESC
LIMIT 10;
```

---

## 🔧 5. Update Operations

### Update User Phone
```sql
UPDATE users 
SET phone = '9963721999' 
WHERE email = 'test@homaclinic.com'
RETURNING *;
```

### Update Assessment (Add Follow-up Data)
```sql
-- Replace 'YOUR_ASSESSMENT_ID' with actual UUID
UPDATE patient_assessments 
SET 
  waist_cm = 98.0,
  fbs = 105.0,
  hba1c = 6.0
WHERE id = 'YOUR_ASSESSMENT_ID'
RETURNING *;
```

---

## 🗑️ 6. Delete Operations

### Delete Test User (Cascades to Assessments)
```sql
DELETE FROM users 
WHERE email = 'test@homaclinic.com';
```

### Delete All Assessments for a User
```sql
-- Replace 'YOUR_USER_ID_HERE' with actual UUID
DELETE FROM patient_assessments 
WHERE user_id = 'YOUR_USER_ID_HERE';
```

### Delete Old Test Data
```sql
-- Delete users created in the last hour (testing only!)
DELETE FROM users 
WHERE created_at > NOW() - INTERVAL '1 hour' 
AND email LIKE '%test%';
```

---

## 🔍 7. Verification Queries

### Check if Tables Exist
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

### Check Table Structure
```sql
-- For users table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

-- For patient_assessments table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'patient_assessments'
ORDER BY ordinal_position;
```

### Check Indexes
```sql
SELECT 
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename IN ('users', 'patient_assessments')
ORDER BY tablename, indexname;
```

### Check Foreign Keys
```sql
SELECT
  tc.table_name, 
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name IN ('users', 'patient_assessments');
```

---

## 🧮 8. Calculate Metrics (In SQL)

### Calculate All Metrics for Latest Assessment
```sql
WITH latest_assessment AS (
  SELECT * 
  FROM patient_assessments 
  WHERE user_id = 'YOUR_USER_ID_HERE' 
  ORDER BY created_at DESC 
  LIMIT 1
)
SELECT 
  id,
  age,
  gender,
  waist_cm,
  fbs,
  hba1c,
  
  -- BMI
  ROUND((weight_kg / POWER(height_cm / 100.0, 2))::numeric, 2) as bmi,
  CASE 
    WHEN (weight_kg / POWER(height_cm / 100.0, 2)) < 18.5 THEN 'Underweight'
    WHEN (weight_kg / POWER(height_cm / 100.0, 2)) < 25 THEN 'Normal'
    WHEN (weight_kg / POWER(height_cm / 100.0, 2)) < 30 THEN 'Overweight'
    ELSE 'Obese'
  END as bmi_category,
  
  -- HOMA-IR
  ROUND(((fbs * fasting_insulin) / 405.0)::numeric, 2) as homa_ir,
  CASE 
    WHEN ((fbs * fasting_insulin) / 405.0) < 1.0 THEN 'Optimal'
    WHEN ((fbs * fasting_insulin) / 405.0) < 2.0 THEN 'Normal'
    WHEN ((fbs * fasting_insulin) / 405.0) < 2.9 THEN 'Early IR'
    ELSE 'Significant IR'
  END as homa_ir_interpretation,
  
  -- TyG Index
  ROUND(LN((triglycerides * fbs) / 2.0)::numeric, 2) as tyg_index,
  CASE 
    WHEN LN((triglycerides * fbs) / 2.0) < 8.5 THEN 'Normal'
    WHEN LN((triglycerides * fbs) / 2.0) < 8.8 THEN 'Borderline'
    ELSE 'Insulin Resistance'
  END as tyg_interpretation,
  
  -- WHtR
  ROUND((waist_cm / height_cm)::numeric, 3) as whtr,
  CASE 
    WHEN (waist_cm / height_cm) < 0.5 THEN 'Healthy'
    ELSE 'At Risk'
  END as whtr_status,
  
  created_at
FROM latest_assessment;
```

---

## 🚀 9. Quick Copy-Paste Commands

### Complete Setup (Run in Neon SQL Editor)
```sql
-- 1. Enable UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create tables
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

-- 3. Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON patient_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON patient_assessments(created_at DESC);

-- 4. Verify
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
```

---

## 📞 Database Console

**Direct Link:** https://console.neon.tech/app/projects/proud-sunset-82737074/branches/br-blue-wildflower-ahnf9ofw/tables?database=drmuddusmvp1

**Connection String:**
```
postgresql://neondb_owner:npg_zUbO5HZ9kDur@ep-icy-dream-ah5xlk96-pooler.c-3.us-east-1.aws.neon.tech/drmuddusmvp1?sslmode=require&channel_binding=require
```

---

**Dr. Muddu Surendra Nehru**  
Professor of Medicine  
📱 09963721999

