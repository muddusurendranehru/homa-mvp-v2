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
