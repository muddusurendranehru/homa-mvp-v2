import { neon } from '@neondatabase/serverless';

export type PatientBaselineRow = {
  id: string;
  age: number | null;
  gender: string | null;
  fbs: number | null;
  fasting_insulin: number | null;
  hba1c: number | null;
  created_at: string;
};

export function homaSql() {
  const url = process.env.DATABASE_URL ?? process.env.NEON_DATABASE_URL ?? null;
  if (!url) return null;
  return neon(url);
}

export function calculateHomaIr(fbs: number | null, fastingInsulin: number | null): number | null {
  if (fbs == null || fastingInsulin == null || fbs <= 0 || fastingInsulin <= 0) return null;
  return parseFloat(((fbs * fastingInsulin) / 405).toFixed(2));
}

export function baselineFromRow(row: {
  age: number | null;
  gender: string | null;
  fbs: number | null;
  fasting_insulin: number | null;
  hba1c: number | null;
}): {
  age: number | null;
  gender: string | null;
  hba1c: number | null;
  homaIr: number | null;
} {
  return {
    age: row.age,
    gender: row.gender,
    hba1c: row.hba1c,
    homaIr: calculateHomaIr(row.fbs, row.fasting_insulin),
  };
}

export async function getLatestBaselineByClerkUserId(
  clerkUserId: string,
): Promise<PatientBaselineRow | null> {
  const sql = homaSql();
  if (!sql) return null;

  try {
    const rows = await sql`
      SELECT id, age, gender, fbs, fasting_insulin, hba1c, created_at
      FROM patient_assessments
      WHERE clerk_user_id = ${clerkUserId}
      ORDER BY created_at DESC
      LIMIT 1
    `;
    const row = rows[0] as PatientBaselineRow | undefined;
    return row ?? null;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('clerk_user_id')) {
      console.error('[homa-db] clerk_user_id column missing — run server/migrations/add_clerk_user_id.sql');
    } else {
      console.error('[homa-db] getLatestBaselineByClerkUserId', msg);
    }
    return null;
  }
}
