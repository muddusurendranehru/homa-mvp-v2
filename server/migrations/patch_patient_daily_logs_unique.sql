-- Optional patch if patient_daily_logs was created manually without UNIQUE (clerk_user_id, log_date).
-- Safe to run multiple times.

CREATE UNIQUE INDEX IF NOT EXISTS idx_patient_daily_logs_clerk_user_log_date
  ON patient_daily_logs (clerk_user_id, log_date);
