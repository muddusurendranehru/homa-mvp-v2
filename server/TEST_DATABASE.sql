-- ================================================================
-- HOMA Clinic Database - Complete Test Script
-- Run this in Neon Console or psql
-- ================================================================

-- ================================================================
-- PART 1: VIEW EXACT CURRENT SCHEMA
-- ================================================================

-- 1.1: List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Expected Output:
-- patient_assessments
-- users

-- 1.2: View EXACT schema of users table
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default,
  ordinal_position
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

-- Expected Output:
-- column_name     | data_type                   | is_nullable | column_default          | ordinal_position
-- id              | uuid                        | NO          | gen_random_uuid()       | 1
-- name            | text                        | NO          | NULL                    | 2
-- email           | text                        | NO          | NULL                    | 3
-- password_hash   | text                        | NO          | NULL                    | 4
-- phone           | text                        | YES         | NULL                    | 5
-- created_at      | timestamp with time zone    | YES         | now()                   | 6

-- 1.3: View EXACT schema of patient_assessments table
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  ordinal_position
FROM information_schema.columns
WHERE table_name = 'patient_assessments'
ORDER BY ordinal_position;

-- Expected Output (20 columns):
-- 1.  id
-- 2.  user_id
-- 3.  age
-- 4.  gender
-- 5.  height_cm
-- 6.  weight_kg
-- 7.  waist_cm
-- 8.  fbs
-- 9.  fasting_insulin
-- 10. post_lunch_bs
-- 11. hba1c
-- 12. total_cholesterol
-- 13. hdl
-- 14. ldl
-- 15. triglycerides
-- 16. current_meds
-- 17. procedures
-- 18. post_menopausal
-- 19. created_at
-- 20. vldl  <- NEW COLUMN!

-- 1.4: View all indexes
SELECT 
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename IN ('users', 'patient_assessments')
ORDER BY tablename, indexname;

-- Expected Output:
-- users | users_pkey | CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id)
-- users | users_email_key | CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email)
-- users | idx_users_email | CREATE INDEX idx_users_email ON public.users USING btree (email)
-- patient_assessments | patient_assessments_pkey | CREATE UNIQUE INDEX...
-- patient_assessments | idx_assessments_user_id | CREATE INDEX...
-- patient_assessments | idx_assessments_created_at | CREATE INDEX...

-- ================================================================
-- PART 2: TEST INSERT - Users
-- ================================================================

-- 2.1: Insert test user (clean up first if exists)
DELETE FROM users WHERE email = 'sql-test@homaclinic.com';

INSERT INTO users (name, email, password_hash, phone, created_at) 
VALUES (
  'SQL Test Patient',
  'sql-test@homaclinic.com',
  '$2b$10$abcdefghijklmnopqrstuvwxyz',  -- Fake bcrypt hash for testing
  '9876543210',
  NOW()
) RETURNING *;

-- Expected: Returns the inserted user with UUID id

-- 2.2: Verify user was inserted
SELECT id, name, email, phone, created_at 
FROM users 
WHERE email = 'sql-test@homaclinic.com';

-- Expected: 1 row returned with all fields

-- ================================================================
-- PART 3: TEST INSERT - Assessment (WITH VLDL)
-- ================================================================

-- 3.1: Get the user_id we just created
-- Save this UUID for the next query
SELECT id FROM users WHERE email = 'sql-test@homaclinic.com';

-- 3.2: Insert assessment WITH VLDL (replace USER_ID_HERE with actual UUID)
-- COPY THE UUID FROM STEP 3.1 and paste it below:

INSERT INTO patient_assessments (
  user_id, 
  age, 
  gender, 
  height_cm, 
  weight_kg, 
  waist_cm,
  fbs, 
  fasting_insulin, 
  post_lunch_bs, 
  hba1c,
  total_cholesterol, 
  hdl, 
  ldl, 
  triglycerides,
  vldl,  -- NEW COLUMN!
  current_meds, 
  procedures, 
  post_menopausal, 
  created_at
) VALUES (
  'USER_ID_HERE',  -- ← REPLACE WITH UUID FROM STEP 3.1
  48,                                    -- age
  'Female',                              -- gender
  160.0,                                 -- height_cm
  70.0,                                  -- weight_kg
  90.0,                                  -- waist_cm
  105.0,                                 -- fbs
  12.0,                                  -- fasting_insulin
  140.0,                                 -- post_lunch_bs
  6.0,                                   -- hba1c
  210.0,                                 -- total_cholesterol
  45.0,                                  -- hdl
  140.0,                                 -- ldl
  175.0,                                 -- triglycerides
  35.0,                                  -- vldl (NEW!)
  'Metformin 500mg, Atorvastatin 20mg',  -- current_meds
  'ECG done',                            -- procedures
  true,                                  -- post_menopausal
  NOW()
) RETURNING *;

-- Expected: Returns the inserted assessment with all fields including vldl

-- ================================================================
-- PART 4: TEST FETCH - Various Queries
-- ================================================================

-- 4.1: Fetch all users
SELECT 
  id, 
  name, 
  email, 
  phone, 
  created_at 
FROM users 
ORDER BY created_at DESC;

-- Expected: Shows all users including our test user

-- 4.2: Fetch all assessments for our test user
-- (Replace USER_ID with UUID from step 3.1)
SELECT 
  id,
  age,
  gender,
  waist_cm,
  fbs,
  hba1c,
  hdl,
  ldl,
  triglycerides,
  vldl,  -- NEW!
  created_at
FROM patient_assessments 
WHERE user_id = 'USER_ID_HERE'
ORDER BY created_at DESC;

-- Expected: Shows the assessment with VLDL = 35.0

-- 4.3: Fetch assessment WITH patient name (JOIN)
SELECT 
  u.name AS patient_name,
  u.email,
  u.phone,
  a.age,
  a.gender,
  a.waist_cm,
  a.fbs,
  a.hba1c,
  a.hdl,
  a.ldl,
  a.triglycerides,
  a.vldl,
  a.created_at
FROM patient_assessments a
JOIN users u ON a.user_id = u.id
WHERE u.email = 'sql-test@homaclinic.com'
ORDER BY a.created_at DESC;

-- Expected: Shows assessment with patient_name = "SQL Test Patient"

-- 4.4: Fetch with CALCULATED metrics (BMI, HOMA-IR, TyG)
SELECT 
  u.name AS patient_name,
  a.age,
  a.waist_cm,
  a.fbs,
  a.hba1c,
  
  -- Calculate BMI
  ROUND((a.weight_kg / POWER(a.height_cm / 100.0, 2))::numeric, 2) AS bmi,
  
  -- Calculate HOMA-IR
  ROUND(((a.fbs * a.fasting_insulin) / 405.0)::numeric, 2) AS homa_ir,
  
  -- Calculate TyG Index
  ROUND(LN((a.triglycerides * a.fbs) / 2.0)::numeric, 2) AS tyg_index,
  
  -- Lipid panel with VLDL
  a.total_cholesterol,
  a.hdl,
  a.ldl,
  a.triglycerides,
  a.vldl,  -- NEW!
  
  a.created_at
FROM patient_assessments a
JOIN users u ON a.user_id = u.id
WHERE u.email = 'sql-test@homaclinic.com'
ORDER BY a.created_at DESC;

-- Expected: Shows assessment with calculated metrics:
-- BMI ≈ 27.34
-- HOMA-IR ≈ 3.11
-- TyG ≈ 9.02
-- VLDL = 35

-- ================================================================
-- PART 5: TEST LIPID PANEL ORDER
-- ================================================================

-- 5.1: Verify lipid columns are together
SELECT 
  column_name,
  ordinal_position,
  data_type
FROM information_schema.columns
WHERE table_name = 'patient_assessments'
  AND column_name IN ('total_cholesterol', 'hdl', 'ldl', 'triglycerides', 'vldl')
ORDER BY ordinal_position;

-- Expected Output:
-- total_cholesterol | 12 | double precision
-- hdl              | 13 | double precision
-- ldl              | 14 | double precision
-- triglycerides    | 15 | double precision
-- vldl             | 20 | double precision  <- Added later, but close!

-- 5.2: Show all lipid values for all assessments
SELECT 
  u.name,
  a.total_cholesterol AS total_chol,
  a.hdl,
  a.ldl,
  a.triglycerides AS trig,
  a.vldl,
  a.created_at
FROM patient_assessments a
JOIN users u ON a.user_id = u.id
ORDER BY a.created_at DESC;

-- Expected: Shows lipid panel for all patients, including VLDL

-- ================================================================
-- PART 6: TEST NULL HANDLING (Old Assessments)
-- ================================================================

-- 6.1: Show assessments with and without VLDL
SELECT 
  u.name,
  a.age,
  a.vldl,
  CASE 
    WHEN a.vldl IS NULL THEN 'Old assessment (no VLDL)'
    ELSE 'New assessment (has VLDL)'
  END AS vldl_status,
  a.created_at
FROM patient_assessments a
JOIN users u ON a.user_id = u.id
ORDER BY a.created_at DESC;

-- Expected: Mix of NULL and actual VLDL values

-- 6.2: Count assessments by VLDL status
SELECT 
  COUNT(*) AS total_assessments,
  COUNT(vldl) AS with_vldl,
  COUNT(*) - COUNT(vldl) AS without_vldl
FROM patient_assessments;

-- Expected:
-- total_assessments | with_vldl | without_vldl
-- 3                 | 2         | 1

-- ================================================================
-- PART 7: ADVANCED QUERIES
-- ================================================================

-- 7.1: Get latest assessment for each user WITH patient name
SELECT DISTINCT ON (u.id)
  u.id AS user_id,
  u.name AS patient_name,
  u.email,
  a.waist_cm,
  a.fbs,
  a.hba1c,
  a.vldl,
  a.created_at AS assessment_date
FROM users u
LEFT JOIN patient_assessments a ON u.id = a.user_id
ORDER BY u.id, a.created_at DESC;

-- Expected: One row per user with their most recent assessment

-- 7.2: Compare first and latest assessment (for progress tracking)
WITH first_assessment AS (
  SELECT 
    user_id,
    waist_cm AS first_waist,
    fbs AS first_fbs,
    hba1c AS first_hba1c,
    created_at AS first_date,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at ASC) AS rn
  FROM patient_assessments
),
latest_assessment AS (
  SELECT 
    user_id,
    waist_cm AS latest_waist,
    fbs AS latest_fbs,
    hba1c AS latest_hba1c,
    created_at AS latest_date,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM patient_assessments
)
SELECT 
  u.name,
  f.first_waist,
  l.latest_waist,
  l.latest_waist - f.first_waist AS waist_change,
  f.first_hba1c,
  l.latest_hba1c,
  ROUND((l.latest_hba1c - f.first_hba1c)::numeric, 2) AS hba1c_change
FROM users u
JOIN first_assessment f ON u.id = f.user_id AND f.rn = 1
JOIN latest_assessment l ON u.id = l.user_id AND l.rn = 1
WHERE f.first_date != l.latest_date  -- Only users with multiple assessments
ORDER BY u.name;

-- Expected: Shows progress for patients with multiple assessments

-- ================================================================
-- PART 8: CLEANUP (Optional)
-- ================================================================

-- 8.1: Delete test user and assessments (cascades)
-- UNCOMMENT TO RUN:
-- DELETE FROM users WHERE email = 'sql-test@homaclinic.com';

-- 8.2: Verify cleanup
-- SELECT COUNT(*) FROM users WHERE email = 'sql-test@homaclinic.com';
-- Expected: 0

-- ================================================================
-- SUMMARY OF CURRENT DATABASE
-- ================================================================

-- Total users
SELECT COUNT(*) AS total_users FROM users;

-- Total assessments
SELECT COUNT(*) AS total_assessments FROM patient_assessments;

-- Assessments with VLDL
SELECT COUNT(*) AS assessments_with_vldl FROM patient_assessments WHERE vldl IS NOT NULL;

-- Users with assessments
SELECT 
  u.name,
  u.email,
  COUNT(a.id) AS assessment_count
FROM users u
LEFT JOIN patient_assessments a ON u.id = a.user_id
GROUP BY u.id, u.name, u.email
ORDER BY assessment_count DESC;

-- ================================================================
-- END OF TEST SCRIPT
-- ================================================================

