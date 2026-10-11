import { neon } from '@neondatabase/serverless'

/**
 * READ-ONLY connection to the 30-day meal app's Neon database (role homa_reader).
 * Returns null when MEAL_APP_DATABASE_URL is not set, so callers can fail safe.
 * Never put an owner/admin connection string in MEAL_APP_DATABASE_URL.
 */
export function mealAppSql() {
  const url = process.env.MEAL_APP_DATABASE_URL?.trim()
  if (!url) return null
  try {
    return neon(url)
  } catch {
    return null
  }
}

/** Today's date in India, as YYYY-MM-DD. */
export function todayIST(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
}

export function addDays(ymd: string, n: number): string {
  const d = new Date(ymd + 'T00:00:00Z')
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

export function daysBetween(fromYmd: string, toYmd: string): number {
  return Math.round((Date.parse(toYmd + 'T00:00:00Z') - Date.parse(fromYmd + 'T00:00:00Z')) / 86400000)
}

/** Days in a row with a log, ending today (or yesterday, so it isn't "broken" before tonight's log). */
export function currentStreak(dates: string[]): number {
  const set = new Set(dates)
  let day = todayIST()
  if (!set.has(day)) day = addDays(day, -1)
  let n = 0
  while (set.has(day)) {
    n++
    day = addDays(day, -1)
  }
  return n
}

/**
 * Coins, computed only (no table): 1 coin per day logged,
 * plus 5 bonus coins for every full 7 days in a row (a 14-day run = 2 bonuses).
 */
export function computeCoins(dates: string[]): { coins: number; bonusWeeks: number } {
  const sorted = Array.from(new Set(dates)).sort()
  let bonusWeeks = 0
  let run = 0
  let prev: string | null = null
  for (const d of sorted) {
    run = prev && addDays(prev, 1) === d ? run + 1 : 1
    if (run % 7 === 0) bonusWeeks++
    prev = d
  }
  return { coins: sorted.length + bonusWeeks * 5, bonusWeeks }
}

/** Number of meals ticked in the meal app's food_log JSON (selected_meals). */
export function mealsTicked(foodLog: unknown): number {
  if (typeof foodLog !== 'string' || !foodLog) return 0
  try {
    const p = JSON.parse(foodLog)
    return Array.isArray(p?.selected_meals) ? p.selected_meals.length : 0
  } catch {
    return 0
  }
}

/** Short, clean text for exercise/sleep (the meal app sometimes stores "" or null). */
export function shortText(v: unknown, max = 60): string {
  if (v == null) return ''
  const t = String(v).trim()
  if (t === '' || t === '""' || t === 'null') return ''
  return t.length > max ? t.slice(0, max) + '…' : t
}

/** Parse a meal-app JSON text field; null when it is not a JSON object. */
function jsonObject(v: unknown): Record<string, unknown> | null {
  if (v == null) return null
  if (typeof v === 'object') return v as Record<string, unknown>
  const t = String(v).trim()
  if (!t.startsWith('{')) return null
  try {
    const p = JSON.parse(t)
    return p && typeof p === 'object' ? (p as Record<string, unknown>) : null
  } catch {
    return null
  }
}

function positive(v: unknown): number | null {
  const n = typeof v === 'string' ? Number(v.trim()) : Number(v)
  return Number.isFinite(n) && n > 0 ? n : null
}

/**
 * Exercise text for the remission page. New meal-app format (v2 JSON) -> its summary,
 * e.g. "Walking 30 min (7600 steps); Yoga 20 min". Old plain text is unchanged.
 */
export function exerciseText(v: unknown, max = 60): string {
  const p = jsonObject(v)
  if (!p) return shortText(v, max)
  if (Array.isArray(p.activities)) {
    if (p.activities.length === 0) return ''
    const mins = positive(p.total_minutes)
    return shortText(typeof p.summary === 'string' && p.summary.trim() ? p.summary : mins ? `${mins} min` : 'Logged', max)
  }
  return shortText(v, max)
}

/** "7 h" / "6 h 40 min" */
export function hoursText(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  return m ? `${h} h ${m} min` : `${h} h`
}

/** Sleep text for the remission page: v2 JSON -> "7 h 0 min"-style hours; old plain text unchanged. */
export function sleepText(v: unknown, max = 30): string {
  const p = jsonObject(v)
  if (!p) return shortText(v, max)
  if (p.v === 2) {
    const mins = positive(p.total_minutes)
    if (mins) return shortText(hoursText(mins), max)
    const fallback = typeof p.summary === 'string' && p.summary.trim() ? p.summary : typeof p.earlier_note === 'string' ? p.earlier_note : ''
    return shortText(fallback, max)
  }
  return shortText(v, max)
}

/** kcal eaten from food_log JSON: total_calories, else the numeric "raw" value. null if not readable. */
export function foodKcal(foodLog: unknown): number | null {
  const p = jsonObject(foodLog)
  if (!p) return null
  const n = positive(p.total_calories) ?? positive(p.raw)
  return n != null ? Math.round(n) : null
}

/** Approximate kcal burned from exercise_log v2 (total_kcal, else sum of activity kcal). null if not available. */
export function exerciseKcal(exerciseLog: unknown): number | null {
  const p = jsonObject(exerciseLog)
  if (!p || !Array.isArray(p.activities)) return null
  const total = positive(p.total_kcal)
  if (total != null) return Math.round(total)
  let sum = 0
  for (const a of p.activities) sum += positive((a as Record<string, unknown>)?.kcal) ?? 0
  return sum > 0 ? Math.round(sum) : null
}

/** Minutes slept from sleep_log v2 (total_minutes). null for old plain text or empty. */
export function sleepMinutes(sleepLog: unknown): number | null {
  const p = jsonObject(sleepLog)
  if (!p || p.v !== 2) return null
  const n = positive(p.total_minutes)
  return n != null ? Math.round(n) : null
}
