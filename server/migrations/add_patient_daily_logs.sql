-- Daily habit + meal photo log for Clerk-linked patients (HOMA MVP tracker).
-- Run once on Neon (same DATABASE_URL as web/): psql "$DATABASE_URL" -f server/migrations/add_patient_daily_logs.sql
--
-- Then grant DML to the Render app role (NOT the owner): see grant_patient_daily_logs.sql

CREATE TABLE IF NOT EXISTS patient_daily_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,
  log_date DATE NOT NULL DEFAULT (CURRENT_DATE),
  walked BOOLEAN NOT NULL DEFAULT FALSE,
  slept BOOLEAN NOT NULL DEFAULT FALSE,
  water BOOLEAN NOT NULL DEFAULT FALSE,
  meal_photo_url TEXT,
  coins_earned INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT patient_daily_logs_clerk_date_unique UNIQUE (clerk_user_id, log_date)
);

CREATE INDEX IF NOT EXISTS idx_patient_daily_logs_clerk_user_id
  ON patient_daily_logs (clerk_user_id);

CREATE INDEX IF NOT EXISTS idx_patient_daily_logs_log_date
  ON patient_daily_logs (log_date DESC);

COMMENT ON TABLE patient_daily_logs IS 'Per-day habits and meal photo for signed-in Clerk patients';
COMMENT ON COLUMN patient_daily_logs.coins_earned IS 'HOMA coins earned on this calendar day (habits; staff may add meal review coins later)';
