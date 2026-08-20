-- Blog posts for Next.js admin publish flow (Neon Postgres)
-- Run once: Neon SQL Editor, or from repo root with DATABASE_URL set:
--   psql "$DATABASE_URL" -f server/migrations/create_blog_posts.sql

CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT DEFAULT 'Dr Muddu Surendra Nehru MD',
  category TEXT DEFAULT 'Nutrition and Diabetes',
  icon TEXT DEFAULT '📝',
  meta_description TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  date TEXT
);
