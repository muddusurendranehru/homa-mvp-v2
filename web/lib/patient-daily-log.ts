import { HABIT_COIN_REWARD } from '@/lib/patient-me';
import { homaSql } from '@/lib/homa-db';

export type HabitTypeApi = 'walk' | 'sleep' | 'water';

export type PatientDailyLogRow = {
  id: string;
  clerk_user_id: string;
  log_date: string;
  walked: boolean;
  slept: boolean;
  water: boolean;
  meal_photo_url: string | null;
  coins_earned: number;
};

export type TodayLogJson = {
  logDate: string;
  walked: boolean;
  slept: boolean;
  water: boolean;
  hasMealPhoto: boolean;
  coinsEarnedToday: number;
};

const TABLE_ENSURED = { value: false };

/** UTC calendar date YYYY-MM-DD (matches program day math in patient-me). */
export function todayLogDateUtc(): string {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
    .toISOString()
    .slice(0, 10);
}

/**
 * Idempotent table bootstrap for deploys that have not run the SQL migration yet.
 * Prefer running server/migrations/add_patient_daily_logs.sql on Neon once.
 */
export async function ensurePatientDailyLogsTable(): Promise<void> {
  if (TABLE_ENSURED.value) return;
  const sql = homaSql();
  if (!sql) throw new Error('DATABASE_URL not configured');

  await sql`
    CREATE TABLE IF NOT EXISTS patient_daily_logs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      clerk_user_id TEXT NOT NULL,
      log_date DATE NOT NULL DEFAULT (CURRENT_DATE),
      walked BOOLEAN NOT NULL DEFAULT FALSE,
      slept BOOLEAN NOT NULL DEFAULT FALSE,
      water BOOLEAN NOT NULL DEFAULT FALSE,
      meal_photo_url TEXT,
      coins_earned INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CONSTRAINT patient_daily_logs_clerk_date_unique UNIQUE (clerk_user_id, log_date)
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_patient_daily_logs_clerk_user_id
      ON patient_daily_logs (clerk_user_id)
  `;
  TABLE_ENSURED.value = true;
}

function boolCol(habit: HabitTypeApi): 'walked' | 'slept' | 'water' {
  if (habit === 'walk') return 'walked';
  if (habit === 'sleep') return 'slept';
  return 'water';
}

function mapRow(raw: Record<string, unknown>): PatientDailyLogRow {
  const logDate = raw.log_date;
  const dateStr =
    logDate instanceof Date
      ? logDate.toISOString().slice(0, 10)
      : String(logDate).slice(0, 10);

  return {
    id: String(raw.id),
    clerk_user_id: String(raw.clerk_user_id),
    log_date: dateStr,
    walked: raw.walked === true,
    slept: raw.slept === true,
    water: raw.water === true,
    meal_photo_url: raw.meal_photo_url != null ? String(raw.meal_photo_url) : null,
    coins_earned: Number(raw.coins_earned ?? 0) || 0,
  };
}

export async function fetchTodayDailyLog(clerkUserId: string): Promise<PatientDailyLogRow | null> {
  await ensurePatientDailyLogsTable();
  const sql = homaSql();
  if (!sql) throw new Error('DATABASE_URL not configured');

  const logDate = todayLogDateUtc();
  const rows = await sql`
    SELECT *
    FROM patient_daily_logs
    WHERE clerk_user_id = ${clerkUserId.trim()}
      AND log_date = ${logDate}::date
    LIMIT 1
  `;
  const list = Array.isArray(rows) ? rows : [];
  if (list.length === 0) return null;
  return mapRow(list[0] as Record<string, unknown>);
}

export async function sumPatientCoins(clerkUserId: string): Promise<number> {
  await ensurePatientDailyLogsTable();
  const sql = homaSql();
  if (!sql) throw new Error('DATABASE_URL not configured');

  const rows = await sql`
    SELECT COALESCE(SUM(coins_earned), 0)::int AS total
    FROM patient_daily_logs
    WHERE clerk_user_id = ${clerkUserId.trim()}
  `;
  const list = Array.isArray(rows) ? rows : [];
  const total = list[0]?.total;
  return typeof total === 'number' ? total : Number(total ?? 0) || 0;
}

export function todayLogToJson(row: PatientDailyLogRow | null, logDate = todayLogDateUtc()): TodayLogJson {
  if (!row) {
    return {
      logDate,
      walked: false,
      slept: false,
      water: false,
      hasMealPhoto: false,
      coinsEarnedToday: 0,
    };
  }
  return {
    logDate: row.log_date,
    walked: row.walked,
    slept: row.slept,
    water: row.water,
    hasMealPhoto: !!row.meal_photo_url,
    coinsEarnedToday: row.coins_earned,
  };
}

export type LogHabitResult = {
  row: PatientDailyLogRow;
  coinsDelta: number;
  totalCoins: number;
};

/**
 * Set one habit for today. Awards +5 coins when turning on (once per habit per day).
 * Removes 5 when turning off if it was on.
 */
export async function upsertPatientHabit(
  clerkUserId: string,
  habitType: HabitTypeApi,
  completed: boolean,
): Promise<LogHabitResult> {
  await ensurePatientDailyLogsTable();
  const sql = homaSql();
  if (!sql) throw new Error('DATABASE_URL not configured');

  const clerkId = clerkUserId.trim();
  const logDate = todayLogDateUtc();
  const existing = await fetchTodayDailyLog(clerkId);
  const col = boolCol(habitType);
  const wasDone = existing ? existing[col] : false;

  let coinsDelta = 0;
  if (completed && !wasDone) coinsDelta = HABIT_COIN_REWARD;
  if (!completed && wasDone) coinsDelta = -HABIT_COIN_REWARD;

  const nextWalked = col === 'walked' ? completed : (existing?.walked ?? false);
  const nextSlept = col === 'slept' ? completed : (existing?.slept ?? false);
  const nextWater = col === 'water' ? completed : (existing?.water ?? false);
  const nextCoins = Math.max(0, (existing?.coins_earned ?? 0) + coinsDelta);
  const mealUrl = existing?.meal_photo_url ?? null;

  const rows = await sql`
    INSERT INTO patient_daily_logs (
      clerk_user_id, log_date, walked, slept, water, meal_photo_url, coins_earned, updated_at
    )
    VALUES (
      ${clerkId},
      ${logDate}::date,
      ${nextWalked},
      ${nextSlept},
      ${nextWater},
      ${mealUrl},
      ${nextCoins},
      NOW()
    )
    ON CONFLICT (clerk_user_id, log_date) DO UPDATE SET
      walked = EXCLUDED.walked,
      slept = EXCLUDED.slept,
      water = EXCLUDED.water,
      coins_earned = EXCLUDED.coins_earned,
      updated_at = NOW()
    RETURNING *
  `;

  const list = Array.isArray(rows) ? rows : [];
  const row = mapRow(list[0] as Record<string, unknown>);
  const totalCoins = await sumPatientCoins(clerkId);

  return { row, coinsDelta, totalCoins };
}

const MAX_MEAL_BYTES = 3 * 1024 * 1024;

export async function upsertMealPhotoUrl(
  clerkUserId: string,
  mealPhotoUrl: string,
): Promise<{ row: PatientDailyLogRow; totalCoins: number }> {
  await ensurePatientDailyLogsTable();
  const sql = homaSql();
  if (!sql) throw new Error('DATABASE_URL not configured');

  const clerkId = clerkUserId.trim();
  const logDate = todayLogDateUtc();
  const existing = await fetchTodayDailyLog(clerkId);

  const rows = await sql`
    INSERT INTO patient_daily_logs (
      clerk_user_id, log_date, walked, slept, water, meal_photo_url, coins_earned, updated_at
    )
    VALUES (
      ${clerkId},
      ${logDate}::date,
      ${existing?.walked ?? false},
      ${existing?.slept ?? false},
      ${existing?.water ?? false},
      ${mealPhotoUrl},
      ${existing?.coins_earned ?? 0},
      NOW()
    )
    ON CONFLICT (clerk_user_id, log_date) DO UPDATE SET
      meal_photo_url = EXCLUDED.meal_photo_url,
      updated_at = NOW()
    RETURNING *
  `;

  const list = Array.isArray(rows) ? rows : [];
  const row = mapRow(list[0] as Record<string, unknown>);
  const totalCoins = await sumPatientCoins(clerkId);
  return { row, totalCoins };
}

export function mealPhotoStorageUrl(buffer: Buffer, mimeType: string): string {
  if (buffer.length > MAX_MEAL_BYTES) {
    throw new Error(`Image too large (max ${MAX_MEAL_BYTES / (1024 * 1024)}MB)`);
  }
  const safeMime = mimeType.startsWith('image/') ? mimeType : 'image/jpeg';
  const b64 = buffer.toString('base64');
  return `data:${safeMime};base64,${b64}`;
}

export { MAX_MEAL_BYTES };
