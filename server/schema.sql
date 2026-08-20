-- HOMA Clinic Database Schema
-- Neon PostgreSQL

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Patient Assessments table
CREATE TABLE IF NOT EXISTS patient_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  age INT,
  gender TEXT,
  height_cm FLOAT,
  weight_kg FLOAT,
  waist_cm FLOAT,
  fbs FLOAT,
  fasting_insulin FLOAT,
  post_lunch_bs FLOAT,
  hba1c FLOAT,
  total_cholesterol FLOAT,
  hdl FLOAT,
  ldl FLOAT,
  triglycerides FLOAT,
  vldl FLOAT,
  current_meds TEXT,
  procedures TEXT,
  post_menopausal BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON patient_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON patient_assessments(created_at DESC);

-- Add comments for documentation
COMMENT ON TABLE users IS 'Stores user account information';
COMMENT ON TABLE patient_assessments IS 'Stores patient health assessments and biomarkers';

COMMENT ON COLUMN patient_assessments.fbs IS 'Fasting Blood Sugar (mg/dL)';
COMMENT ON COLUMN patient_assessments.hba1c IS 'Glycated Hemoglobin (%)';
COMMENT ON COLUMN patient_assessments.fasting_insulin IS 'Fasting Insulin (μU/mL)';
COMMENT ON COLUMN patient_assessments.triglycerides IS 'Triglycerides (mg/dL)';
COMMENT ON COLUMN patient_assessments.hdl IS 'High-Density Lipoprotein (mg/dL)';
COMMENT ON COLUMN patient_assessments.ldl IS 'Low-Density Lipoprotein (mg/dL)';
COMMENT ON COLUMN patient_assessments.vldl IS 'Very Low-Density Lipoprotein (mg/dL)';

