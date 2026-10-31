import { neon } from '@neondatabase/serverless';

/** Neon HTTP client. Next.js loads DATABASE_URL from web/.env.local. */
export function getSql() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error('DATABASE_URL not configured');
  }
  return neon(url);
}
