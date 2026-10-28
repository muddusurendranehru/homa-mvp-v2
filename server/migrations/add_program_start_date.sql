-- Program day counter (Day X of 90) starts here — not assessment created_at (baseline visit may be older).
ALTER TABLE patient_assessments
  ADD COLUMN IF NOT EXISTS program_start_date DATE;

COMMENT ON COLUMN patient_assessments.program_start_date IS
  'UTC calendar date when the 90-day tracker program starts (usually Clerk link or first tracker use).';

-- Backfill linked patients: first habit log, else today (fixes Day 90 for newly linked old assessments).
UPDATE patient_assessments pa
SET program_start_date = COALESCE(
  (
    SELECT MIN(pdl.log_date)
    FROM patient_daily_logs pdl
    WHERE TRIM(pdl.clerk_user_id) = TRIM(pa.clerk_user_id)
  ),
  CURRENT_DATE
)
WHERE pa.clerk_user_id IS NOT NULL
  AND TRIM(pa.clerk_user_id) <> ''
  AND pa.program_start_date IS NULL;
