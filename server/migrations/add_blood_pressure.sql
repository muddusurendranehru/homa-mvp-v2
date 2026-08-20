-- Migration: Add Blood Pressure columns to patient_assessments
-- Date: December 2, 2025
-- Safe migration - adds new columns without affecting existing data

-- Add systolic blood pressure column
ALTER TABLE patient_assessments 
ADD COLUMN IF NOT EXISTS bp_systolic INT;

-- Add diastolic blood pressure column
ALTER TABLE patient_assessments 
ADD COLUMN IF NOT EXISTS bp_diastolic INT;

-- Add comment for documentation
COMMENT ON COLUMN patient_assessments.bp_systolic IS 'Systolic blood pressure in mmHg (e.g., 120)';
COMMENT ON COLUMN patient_assessments.bp_diastolic IS 'Diastolic blood pressure in mmHg (e.g., 80)';

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'patient_assessments' 
AND column_name IN ('bp_systolic', 'bp_diastolic');

