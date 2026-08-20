-- Verify that patient names are accessible from assessments
-- This demonstrates that name is available via JOIN

-- Query to get assessments WITH patient names
SELECT 
  u.name AS patient_name,
  u.email,
  a.age,
  a.gender,
  a.waist_cm,
  a.fbs,
  a.hba1c,
  a.total_cholesterol,
  a.hdl,
  a.ldl,
  a.triglycerides,
  a.vldl,  -- Will be NULL for old records
  a.created_at
FROM patient_assessments a
JOIN users u ON a.user_id = u.id
ORDER BY a.created_at DESC;

-- This shows that patient name IS available!
-- It's in the users table, which is the correct way to do it
-- (normalized database design)

