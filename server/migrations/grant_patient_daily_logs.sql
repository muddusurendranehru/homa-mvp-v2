-- Grants for the Render / Next.js DATABASE_URL role (NOT the Neon owner account).
-- Run in Neon SQL Editor while connected as project owner.
--
-- 1) Find the app role name from DATABASE_URL on Render:
--    postgresql://APP_ROLE_NAME:password@...  → use APP_ROLE_NAME below.
-- 2) Replace render_app below with that username, then run this script once.

GRANT USAGE ON SCHEMA public TO render_app;

GRANT SELECT, INSERT, UPDATE ON TABLE patient_daily_logs TO render_app;

-- If habit saves fail with permission on gen_random_uuid(), ensure the role can use the extension:
-- GRANT EXECUTE ON FUNCTION gen_random_uuid() TO render_app;

-- patient_assessments (baseline) usually already granted; if baseline breaks for the app role, also:
-- GRANT SELECT ON TABLE patient_assessments TO render_app;
