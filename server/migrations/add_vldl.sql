-- Migration: Add VLDL column to patient_assessments table
-- Date: December 2, 2025
-- Purpose: Add Very Low-Density Lipoprotein measurement

-- Add VLDL column right after triglycerides
ALTER TABLE patient_assessments 
ADD COLUMN IF NOT EXISTS vldl FLOAT;

-- Add comment for documentation
COMMENT ON COLUMN patient_assessments.vldl IS 'Very Low-Density Lipoprotein (mg/dL)';

-- Verify the change
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'patient_assessments' 
  AND column_name IN ('hdl', 'ldl', 'triglycerides', 'vldl')
ORDER BY ordinal_position;

-- Note: Existing assessments will have NULL for vldl, which is fine!
-- The frontend should handle NULL values gracefully

