import { neon } from '@neondatabase/serverless';

export type PatientBaselineRow = {
  id: string;
  age: number | null;
  gender: string | null;
  fbs: number | null;
  fasting_insulin: number | null;
  hba1c: number | null;
  height_cm?: number | null;
  weight_kg?: number | null;
  waist_cm?: number | null;
  triglycerides?: number | null;
  hdl?: number | null;
  ldl?: number | null;
  created_at: string;
};

export function homaSql() {
  const raw = process.env.DATABASE_URL ?? process.env.NEON_DATABASE_URL ?? null;
  const url = raw?.trim() || null;
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

function numOrNull(value: unknown): number | null {
  if (value == null || value === '') return null;
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

/** Map a Neon row (SELECT *) into the shape PatientTracker expects. */
export function mapPatientAssessmentRow(raw: Record<string, unknown>): PatientBaselineRow {
  const created = raw.created_at;
  const createdAt =
    created instanceof Date
      ? created.toISOString()
      : created != null
        ? String(created)
        : new Date().toISOString();

  return {
    id: String(raw.id),
    age: numOrNull(raw.age),
    gender: raw.gender != null ? String(raw.gender) : null,
    fbs: numOrNull(raw.fbs),
    fasting_insulin: numOrNull(raw.fasting_insulin),
    hba1c: numOrNull(raw.hba1c),
    height_cm: numOrNull(raw.height_cm),
    weight_kg: numOrNull(raw.weight_kg),
    waist_cm: numOrNull(raw.waist_cm),
    triglycerides: numOrNull(raw.triglycerides),
    hdl: numOrNull(raw.hdl),
    ldl: numOrNull(raw.ldl),
    created_at: createdAt,
  };
}

/**
 * Latest assessment for a Clerk user. Returns null when no row matches.
 * Throws on missing DATABASE_URL or SQL errors (do not map errors to "processing").
 */
export async function fetchLatestPatientAssessmentByClerkUserId(
  clerkUserId: string,
): Promise<PatientBaselineRow | null> {
  const sql = homaSql();
  if (!sql) {
    throw new Error('DATABASE_URL not configured');
  }

  const clerkId = clerkUserId.trim();
  if (!clerkId) return null;

  const rows = await sql`
    SELECT *
    FROM patient_assessments
    WHERE clerk_user_id = ${clerkId}
       OR TRIM(clerk_user_id) = ${clerkId}
    ORDER BY created_at DESC NULLS LAST
    LIMIT 1
  `;

  const list = Array.isArray(rows) ? rows : [];
  if (list.length === 0) return null;

  return mapPatientAssessmentRow(list[0] as Record<string, unknown>);
}

export type BaselineLookupResult =
  | { kind: 'found'; row: PatientBaselineRow }
  | { kind: 'not_found' }
  | { kind: 'db_unconfigured' }
  | { kind: 'error'; message: string };

/** @deprecated Use fetchLatestPatientAssessmentByClerkUserId — errors throw instead of kind: error. */
export async function lookupLatestBaselineByClerkUserId(
  clerkUserId: string,
): Promise<BaselineLookupResult> {
  try {
    const row = await fetchLatestPatientAssessmentByClerkUserId(clerkUserId);
    return row ? { kind: 'found', row } : { kind: 'not_found' };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('not configured')) return { kind: 'db_unconfigured' };
    return { kind: 'error', message: msg };
  }
}

export async function getLatestBaselineByClerkUserId(
  clerkUserId: string,
): Promise<PatientBaselineRow | null> {
  try {
    return await fetchLatestPatientAssessmentByClerkUserId(clerkUserId);
  } catch {
    return null;
  }
}
