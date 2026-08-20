-- ============================================================
-- TESTIMONIALS TABLE MIGRATION
-- ============================================================
-- 
-- This script creates a new testimonials table
-- It does NOT affect existing tables (users, patient_assessments)
-- 
-- RUN THIS ONLY WHEN YOU'RE READY TO USE DATABASE FOR TESTIMONIALS
-- For now, the testimonials page uses static data
--
-- ============================================================

-- Create testimonials table (SAFE - does not affect existing data)
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  age INT,
  photo_url TEXT,
  quote TEXT NOT NULL,
  metrics_before JSONB,     -- { "HOMA_IR": 8.5, "BMI": 32.4, "HbA1c": 7.2, "waist_cm": 98 }
  metrics_after JSONB,      -- { "HOMA_IR": 2.1, "BMI": 27.8, "HbA1c": 5.8, "waist_cm": 84 }
  completed_program BOOLEAN DEFAULT true,
  program_days INT DEFAULT 90,
  published BOOLEAN DEFAULT false,  -- Only show published testimonials
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(published);

-- Example: Insert a sample testimonial
-- INSERT INTO testimonials (name, location, age, quote, metrics_before, metrics_after, published)
-- VALUES (
--   'Lakshmi R.',
--   'Hyderabad',
--   52,
--   'After 3 months with Dr. Muddu''s program, my HOMA-IR dropped from 8.5 to 2.1!',
--   '{"HOMA_IR": 8.5, "BMI": 32.4, "HbA1c": 7.2, "waist_cm": 98}',
--   '{"HOMA_IR": 2.1, "BMI": 27.8, "HbA1c": 5.8, "waist_cm": 84}',
--   true
-- );

-- Verify table creation
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'testimonials';

