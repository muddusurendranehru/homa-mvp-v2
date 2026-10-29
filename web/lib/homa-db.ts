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
  /** When set, Day 1 of 90 is this UTC calendar date (not baseline visit created_at). */
  program_start_date?: string | null;
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

  const programStart = raw.program_start_date;
  const programStartDate =
    programStart instanceof Date
      ? programStart.toISOString().slice(0, 10)
      : programStart != null && String(programStart).trim()
        ? String(programStart).slice(0, 10)
        : null;

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
    program_start_date: programStartDate,
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

/**
 * Set program_start_date once (Clerk link / first tracker visit). No-op if column missing or already set.
 */
export type PatientTrackerRecord = {
  id: string;
  clerk_user_id: string | null;
  mobile_number: string | null;
  email: string | null;
  patient_name: string | null;
  start_date: string | null;
};

function mapPatientTrackerRecord(raw: Record<string, unknown>): PatientTrackerRecord {
  const start = raw.start_date;
  let startDate: string | null = null;
  if (start instanceof Date) {
    startDate = start.toISOString().slice(0, 10);
  } else if (start != null && String(start).trim()) {
    const ymd = String(start).slice(0, 10);
    if (/^\d{4}-\d{2}-\d{2}$/.test(ymd)) startDate = ymd;
  }

  return {
    id: String(raw.id),
    clerk_user_id: raw.clerk_user_id != null ? String(raw.clerk_user_id) : null,
    mobile_number: raw.mobile_number != null ? String(raw.mobile_number) : null,
    email: raw.email != null ? String(raw.email) : null,
    patient_name: raw.patient_name != null ? String(raw.patient_name) : null,
    start_date: startDate,
  };
}

/** Full patient_tracker row for signed-in Clerk user (90-day program registry). */
export async function fetchPatientTrackerByClerkUserId(
  clerkUserId: string,
): Promise<PatientTrackerRecord | null> {
  const sql = homaSql();
  if (!sql) return null;

  const clerkId = clerkUserId.trim();
  if (!clerkId) return null;

  try {
    const rows = await sql`
      SELECT id, clerk_user_id, mobile_number, email, patient_name, start_date
      FROM patient_tracker
      WHERE clerk_user_id = ${clerkId}
         OR TRIM(clerk_user_id) = ${clerkId}
      LIMIT 1
    `;
    const list = Array.isArray(rows) ? rows : [];
    if (list.length === 0) return null;
    return mapPatientTrackerRecord(list[0] as Record<string, unknown>);
  } catch {
    return null;
  }
}

/** Program Day 1 anchor from staff-entered patient_tracker.start_date. */
export async function fetchPatientTrackerStartDate(clerkUserId: string): Promise<string | null> {
  const record = await fetchPatientTrackerByClerkUserId(clerkUserId);
  return record?.start_date ?? null;
}

export async function persistProgramStartDateIfEmpty(
  assessmentId: string,
  startDateYmd: string,
): Promise<void> {
  const sql = homaSql();
  if (!sql || !assessmentId.trim()) return;
  const ymd = startDateYmd.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return;

  try {
    await sql`
      UPDATE patient_assessments
      SET program_start_date = ${ymd}::date
      WHERE id = ${assessmentId.trim()}
        AND program_start_date IS NULL
    `;
  } catch {
    /* column may not exist yet — migration add_program_start_date.sql */
  }
}
