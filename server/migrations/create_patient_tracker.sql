-- patient_tracker: staff-entered registry for 90-day program start (Day X on /tracker).
-- Verified on Neon drmuddusmvp1 (homa_neon_center / production). Safe to re-run.

CREATE TABLE IF NOT EXISTS patient_tracker (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE,
  mobile_number TEXT,
  email TEXT,
  patient_name TEXT,
  start_date DATE
);

CREATE UNIQUE INDEX IF NOT EXISTS patient_tracker_clerk_user_id_key ON patient_tracker (clerk_user_id);
