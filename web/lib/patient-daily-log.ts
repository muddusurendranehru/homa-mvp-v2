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

/** Skip CREATE TABLE on every request unless explicitly enabled (local dev only). */
const AUTO_DDL_ENABLED = process.env.HOMA_AUTO_MIGRATE_DAILY_LOGS === 'true';
const TABLE_BOOTSTRAP_DONE = { value: false };

/** UTC calendar date YYYY-MM-DD (matches program day math in patient-me). */
export function todayLogDateUtc(): string {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
    .toISOString()
    .slice(0, 10);
}

function isPgPermissionDenied(err: unknown): boolean {
  const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
  return msg.includes('permission denied') || msg.includes('42501');
}

function pgBool(value: unknown): boolean {
  return value === true || value === 't' || value === 'true' || value === 1;
}

/**
 * Optional dev bootstrap only. Production must use server/migrations/add_patient_daily_logs.sql
 * (run once by Neon owner). Render DATABASE_URL roles typically cannot CREATE on schema public.
 */
async function maybeBootstrapPatientDailyLogsTable(): Promise<void> {
  if (TABLE_BOOTSTRAP_DONE.value) return;
  TABLE_BOOTSTRAP_DONE.value = true;

  if (!AUTO_DDL_ENABLED) return;

  const sql = homaSql();
  if (!sql) return;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS patient_daily_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        clerk_user_id TEXT NOT NULL,
        log_date DATE NOT NULL DEFAULT (CURRENT_DATE),
        walked BOOLEAN NOT NULL DEFAULT FALSE,
        slept BOOLEAN NOT NULL DEFAULT FALSE,
        water BOOLEAN NOT NULL DEFAULT FALSE,
        meal_photo_url TEXT,
        coins_earned INTEGER NOT NULL DEFAULT 0
      )
    `;
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_patient_daily_logs_clerk_user_log_date
        ON patient_daily_logs (clerk_user_id, log_date)
    `;
  } catch (err) {
    if (isPgPermissionDenied(err)) return;
    throw err;
  }
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
    walked: pgBool(raw.walked),
    slept: pgBool(raw.slept),
    water: pgBool(raw.water),
    meal_photo_url: raw.meal_photo_url != null ? String(raw.meal_photo_url) : null,
    coins_earned: Number(raw.coins_earned ?? 0) || 0,
  };
}

export async function fetchTodayDailyLog(clerkUserId: string): Promise<PatientDailyLogRow | null> {
  const sql = homaSql();
  if (!sql) throw new Error('DATABASE_URL not configured');

  const logDate = todayLogDateUtc();
  const rows = await sql`
    SELECT *
    FROM patient_daily_logs
    WHERE clerk_user_id = ${clerkUserId.trim()}
      AND log_date = ${logDate}
    LIMIT 1
  `;
  const list = Array.isArray(rows) ? rows : [];
  if (list.length === 0) return null;
  return mapRow(list[0] as Record<string, unknown>);
}

export async function sumPatientCoins(clerkUserId: string): Promise<number> {
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

type DailyLogWrite = {
  walked: boolean;
  slept: boolean;
  water: boolean;
  meal_photo_url: string | null;
  coins_earned: number;
};

async function writeTodayDailyLog(
  clerkId: string,
  logDate: string,
  payload: DailyLogWrite,
): Promise<PatientDailyLogRow> {
  const sql = homaSql();
  if (!sql) throw new Error('DATABASE_URL not configured');

  const updated = await sql`
    UPDATE patient_daily_logs
    SET
      walked = ${payload.walked},
      slept = ${payload.slept},
      water = ${payload.water},
      meal_photo_url = ${payload.meal_photo_url},
      coins_earned = ${payload.coins_earned}
    WHERE clerk_user_id = ${clerkId}
      AND log_date = ${logDate}
    RETURNING *
  `;
  const updatedList = Array.isArray(updated) ? updated : [];
  if (updatedList.length > 0) {
    return mapRow(updatedList[0] as Record<string, unknown>);
  }

  const inserted = await sql`
    INSERT INTO patient_daily_logs (
      clerk_user_id, log_date, walked, slept, water, meal_photo_url, coins_earned
    )
    VALUES (
      ${clerkId},
      ${logDate},
      ${payload.walked},
      ${payload.slept},
      ${payload.water},
      ${payload.meal_photo_url},
      ${payload.coins_earned}
    )
    RETURNING *
  `;
  const insertList = Array.isArray(inserted) ? inserted : [];
  if (insertList.length === 0) {
    throw new Error('Failed to save daily log row');
  }
  return mapRow(insertList[0] as Record<string, unknown>);
}

/**
 * Set one habit for today. Awards +5 coins when turning on (once per habit per day).
 * Removes 5 when turning off if it was on.
 */
export async function upsertPatientHabit(
  clerkUserId: string,
  habitType: HabitTypeApi,
  completed: boolean,
): Promise<LogHabitResult> {
  await maybeBootstrapPatientDailyLogsTable();

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

  const row = await writeTodayDailyLog(clerkId, logDate, {
    walked: nextWalked,
    slept: nextSlept,
    water: nextWater,
    meal_photo_url: mealUrl,
    coins_earned: nextCoins,
  });

  const totalCoins = await sumPatientCoins(clerkId);
  return { row, coinsDelta, totalCoins };
}

const MAX_MEAL_BYTES = 3 * 1024 * 1024;

export async function upsertMealPhotoUrl(
  clerkUserId: string,
  mealPhotoUrl: string,
): Promise<{ row: PatientDailyLogRow; totalCoins: number }> {
  await maybeBootstrapPatientDailyLogsTable();

  const clerkId = clerkUserId.trim();
  const logDate = todayLogDateUtc();
  const existing = await fetchTodayDailyLog(clerkId);

  const row = await writeTodayDailyLog(clerkId, logDate, {
    walked: existing?.walked ?? false,
    slept: existing?.slept ?? false,
    water: existing?.water ?? false,
    meal_photo_url: mealPhotoUrl,
    coins_earned: existing?.coins_earned ?? 0,
  });

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
