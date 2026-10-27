-- Link Clerk patient accounts to clinical baseline rows in patient_assessments.
-- Safe to run multiple times (IF NOT EXISTS).

ALTER TABLE patient_assessments
  ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;

CREATE INDEX IF NOT EXISTS idx_assessments_clerk_user_id
  ON patient_assessments (clerk_user_id)
  WHERE clerk_user_id IS NOT NULL;

COMMENT ON COLUMN patient_assessments.clerk_user_id IS
  'Clerk user id (user_...) when the patient signs in on the MVP site';
