import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import {
  addDays,
  computeCoins,
  currentStreak,
  daysBetween,
  mealAppSql,
  mealsTicked,
  shortText,
  todayIST,
} from '@/lib/meal-app-db'

export const dynamic = 'force-dynamic'

const NO_STORE = { 'Cache-Control': 'no-store' }

function reply(body: Record<string, unknown>) {
  // Always 200 with a "status" field, so the page never breaks; never cached.
  return NextResponse.json(body, { headers: NO_STORE })
}

/**
 * The signed-in patient's OWN 30-day meal-app progress. Read-only.
 * Matched server-side by the patient's VERIFIED Clerk email = users.email in the meal app.
 * There is deliberately no email/phone parameter: nobody can ask for another person's data.
 */
export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) return reply({ status: 'signed_out' })

    const sql = mealAppSql()
    if (!sql) return reply({ status: 'unavailable' })

    const user = await currentUser()
    const emails = (user?.emailAddresses ?? [])
      .filter((e) => e.verification?.status === 'verified')
      .map((e) => e.emailAddress.trim().toLowerCase())
    if (emails.length === 0) return reply({ status: 'not_linked' })

    const people = await sql`
      SELECT u.id, to_char(p.diet_start_date, 'YYYY-MM-DD') AS start_date
      FROM users u
      LEFT JOIN patients p ON p.user_id = u.id
      WHERE lower(u.email) = ANY(${emails})
      ORDER BY p.diet_start_date DESC NULLS LAST
      LIMIT 1`
    if (people.length === 0) return reply({ status: 'not_linked' })

    const mealUserId = String(people[0].id)
    const rows = await sql`
      SELECT to_char(log_date, 'YYYY-MM-DD') AS log_date, food_log, exercise_log, sleep_log
      FROM daily_logs
      WHERE user_id = ${mealUserId}
      ORDER BY log_date DESC
      LIMIT 400`

    const logs = rows
      .map((r) => ({
        date: String(r.log_date),
        meals: mealsTicked(r.food_log),
        exercise: shortText(r.exercise_log),
        sleep: shortText(r.sleep_log, 30),
      }))
      .filter((l) => l.meals > 0 || l.exercise !== '' || l.sleep !== '')

    const today = todayIST()
    const weekAgo = addDays(today, -6)
    const dietDays = logs.filter((l) => l.meals > 0)
    const exerciseDays = logs.filter((l) => l.exercise !== '')
    const sleepDays = logs.filter((l) => l.sleep !== '')
    const todayLog = logs.find((l) => l.date === today)

    // Day 1 = diet_start_date from the clinic; if missing, the first day the patient logged.
    const startDate =
      (people[0].start_date as string | null) ?? (logs.length ? logs[logs.length - 1].date : null)
    const planDay = startDate ? Math.min(30, Math.max(1, daysBetween(startDate, today) + 1)) : null
    const firstWeekLogged = startDate
      ? logs.filter((l) => l.date >= startDate && l.date <= addDays(startDate, 6)).length
      : 0

    const allDates = logs.map((l) => l.date)
    const { coins, bonusWeeks } = computeCoins(allDates)

    return reply({
      status: 'ok',
      today,
      diet: {
        daysLogged: dietDays.length,
        savedToday: !!todayLog && todayLog.meals > 0,
        mealsToday: todayLog?.meals ?? 0,
        lastSaved: dietDays[0]?.date ?? null,
      },
      exercise: {
        daysLogged: exerciseDays.length,
        last7Days: exerciseDays.filter((l) => l.date >= weekAgo).length,
        latest: exerciseDays[0] ? { date: exerciseDays[0].date, text: exerciseDays[0].exercise } : null,
      },
      sleep: {
        daysLogged: sleepDays.length,
        last7Days: sleepDays.filter((l) => l.date >= weekAgo).length,
        latest: sleepDays[0] ? { date: sleepDays[0].date, text: sleepDays[0].sleep } : null,
      },
      progress: {
        startDate,
        planDay,
        daysLogged: logs.length,
        firstWeekLogged,
        last7DaysLogged: logs.filter((l) => l.date >= weekAgo).length,
        streak: currentStreak(allDates),
      },
      coins: { total: coins, bonusWeeks },
    })
  } catch (err) {
    console.error('meal-progress error:', err instanceof Error ? err.message : err)
    return reply({ status: 'unavailable' })
  }
}
