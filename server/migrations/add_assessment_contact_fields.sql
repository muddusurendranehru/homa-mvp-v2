-- Contact fields on patient_assessments (calculator + admin link-by-mobile).
-- Run on Neon before using /admin mobile search.

ALTER TABLE patient_assessments
  ADD COLUMN IF NOT EXISTS patient_name TEXT,
  ADD COLUMN IF NOT EXISTS mobile_number TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT;

CREATE INDEX IF NOT EXISTS idx_assessments_mobile_number
  ON patient_assessments (mobile_number)
  WHERE mobile_number IS NOT NULL;

COMMENT ON COLUMN patient_assessments.patient_name IS 'Patient display name at time of assessment';
COMMENT ON COLUMN patient_assessments.mobile_number IS 'Mobile phone (10-digit India or E.164); used for staff admin linking';
COMMENT ON COLUMN patient_assessments.email IS 'Email captured with assessment';
