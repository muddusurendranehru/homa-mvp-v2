import type { ClinicalBaselineData } from '@/components/ClinicalBaselineStrip';
import { baselineFromRow, type PatientBaselineRow } from '@/lib/homa-db';

export const PROGRAM_DAYS = 90;
export const HABIT_COIN_REWARD = 5;

export type PatientAssessmentJson = {
  id: string;
  age: number | null;
  gender: string | null;
  fbs: number | null;
  fasting_insulin: number | null;
  hba1c: number | null;
  homa_ir: number | null;
  height_cm: number | null;
  weight_kg: number | null;
  waist_cm: number | null;
  triglycerides: number | null;
  hdl: number | null;
  ldl: number | null;
  created_at: string;
};

export type PatientJourneyJson = {
  programDays: number;
  currentDay: number;
  dayPercent: number;
  /** Persisted coin balance — null until patient_coins is linked to Clerk. */
  coinsBalance: number | null;
};

export type PatientMeResponse = {
  status: 'processing' | 'linked';
  assessment: PatientAssessmentJson | null;
  baseline: ClinicalBaselineData | null;
  journey: PatientJourneyJson;
};

export function programDayFromStart(createdAt: string | Date, programDays = PROGRAM_DAYS): number {
  const start = new Date(createdAt);
  if (Number.isNaN(start.getTime())) return 1;
  const startUtc = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const now = new Date();
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const diffDays = Math.floor((todayUtc - startUtc) / 86400000);
  return Math.min(programDays, Math.max(1, diffDays + 1));
}

export function emptyJourney(): PatientJourneyJson {
  return {
    programDays: PROGRAM_DAYS,
    currentDay: 1,
    dayPercent: Math.round((1 / PROGRAM_DAYS) * 100),
    coinsBalance: null,
  };
}

export function journeyFromAssessmentCreatedAt(createdAt: string): PatientJourneyJson {
  const currentDay = programDayFromStart(createdAt);
  return {
    programDays: PROGRAM_DAYS,
    currentDay,
    dayPercent: Math.round((currentDay / PROGRAM_DAYS) * 100),
    coinsBalance: null,
  };
}

export function assessmentToJson(row: PatientBaselineRow): PatientAssessmentJson {
  const baseline = baselineFromRow(row);
  return {
    id: row.id,
    age: row.age,
    gender: row.gender,
    fbs: row.fbs,
    fasting_insulin: row.fasting_insulin,
    hba1c: row.hba1c,
    homa_ir: baseline.homaIr,
    height_cm: row.height_cm ?? null,
    weight_kg: row.weight_kg ?? null,
    waist_cm: row.waist_cm ?? null,
    triglycerides: row.triglycerides ?? null,
    hdl: row.hdl ?? null,
    ldl: row.ldl ?? null,
    created_at:
      typeof row.created_at === 'string'
        ? row.created_at
        : new Date(row.created_at).toISOString(),
  };
}

export function patientMeFromRow(row: PatientBaselineRow | null): PatientMeResponse {
  if (!row) {
    return {
      status: 'processing',
      assessment: null,
      baseline: null,
      journey: emptyJourney(),
    };
  }
  const baseline = baselineFromRow(row);
  return {
    status: 'linked',
    assessment: assessmentToJson(row),
    baseline,
    journey: journeyFromAssessmentCreatedAt(
      typeof row.created_at === 'string'
        ? row.created_at
        : new Date(row.created_at).toISOString(),
    ),
  };
}
