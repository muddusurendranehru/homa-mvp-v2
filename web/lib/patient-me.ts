import type { ClinicalBaselineData } from '@/components/ClinicalBaselineStrip';
import { baselineFromRow, type PatientBaselineRow } from '@/lib/homa-db';
import {
  fetchTodayDailyLog,
  sumPatientCoins,
  todayLogDateUtc,
  todayLogToJson,
  type TodayLogJson,
} from '@/lib/patient-daily-log';

export type { TodayLogJson };

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
  /** true when a linked assessment row exists for this Clerk user. */
  success: boolean;
  status: 'processing' | 'linked';
  /** Human-readable hint for empty or error cases (safe to show in UI). */
  message?: string;
  assessment: PatientAssessmentJson | null;
  baseline: ClinicalBaselineData | null;
  journey: PatientJourneyJson;
  /** Today's habit checkboxes + meal flag from patient_daily_logs. */
  todayLog: TodayLogJson;
  /** Sum of coins_earned across all daily logs for this Clerk user. */
  totalCoins: number;
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

function emptyTodayLog(): TodayLogJson {
  return todayLogToJson(null, todayLogDateUtc());
}

export function patientMeFromRow(row: PatientBaselineRow | null): PatientMeResponse {
  if (!row) {
    return {
      success: false,
      status: 'processing',
      message: 'No linked clinic assessment yet. Staff can link your Clerk user id after your visit.',
      assessment: null,
      baseline: null,
      journey: emptyJourney(),
      todayLog: emptyTodayLog(),
      totalCoins: 0,
    };
  }
  const baseline = baselineFromRow(row);
  return {
    success: true,
    status: 'linked',
    assessment: assessmentToJson(row),
    baseline,
    journey: journeyFromAssessmentCreatedAt(
      typeof row.created_at === 'string'
        ? row.created_at
        : new Date(row.created_at).toISOString(),
    ),
    todayLog: emptyTodayLog(),
    totalCoins: 0,
  };
}

/** Assessment row + Neon daily log (when DATABASE_URL is set). */
export async function buildPatientMeResponse(
  clerkUserId: string,
  row: PatientBaselineRow | null,
): Promise<PatientMeResponse> {
  const base = patientMeFromRow(row);
  if (!clerkUserId.trim()) return base;

  try {
    const [todayRow, totalCoins] = await Promise.all([
      fetchTodayDailyLog(clerkUserId),
      sumPatientCoins(clerkUserId),
    ]);
    const journey =
      base.journey.coinsBalance === null
        ? { ...base.journey, coinsBalance: totalCoins }
        : { ...base.journey, coinsBalance: totalCoins };

    return {
      ...base,
      journey,
      todayLog: todayLogToJson(todayRow),
      totalCoins,
    };
  } catch {
    return base;
  }
}
