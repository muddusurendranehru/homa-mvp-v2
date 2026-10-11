'use client'

import { useEffect, useState, type ReactNode } from 'react'

type Latest = { date: string; text: string } | null
type Ok = {
  status: 'ok'
  today: string
  diet: { daysLogged: number; savedToday: boolean; mealsToday: number; lastSaved: string | null }
  exercise: { daysLogged: number; last7Days: number; latest: Latest }
  sleep: { daysLogged: number; last7Days: number; latest: Latest }
  progress: {
    startDate: string | null
    planDay: number | null
    daysLogged: number
    firstWeekLogged: number
    last7DaysLogged: number
    streak: number
  }
  coins: { total: number; bonusWeeks: number }
  energy?: Energy | null
}
type Energy = {
  date: string
  isToday: boolean
  eatenKcal: number | null
  burnedKcal: number | null
  sleepMinutes: number | null
  planKcal: number | null
}
type Result = Ok | { status: 'signed_out' | 'unavailable' | 'not_linked' | 'loading' }

const MEAL_APP = 'https://healthmetrics30daymeals.onrender.com'

function niceDate(ymd: string | null | undefined) {
  if (!ymd) return '–'
  return new Date(ymd + 'T12:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function Tile({ icon, title, children }: { icon: string; title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-green-100 bg-green-50 p-4">
      <div className="mb-1 text-sm font-semibold text-green-900">
        {icon} {title}
      </div>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  )
}

function Note({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
      🍽️ <strong>My 30-day meal plan:</strong> {children}
    </div>
  )
}

/** View-only: the signed-in patient's own 30-day meal-app progress (data comes from /api/meal-progress). */
export default function MealAppProgress() {
  const [data, setData] = useState<Result>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    fetch('/api/meal-progress', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : { status: 'unavailable' }))
      .then((json) => !cancelled && setData(json?.status ? json : { status: 'unavailable' }))
      .catch(() => !cancelled && setData({ status: 'unavailable' }))
    return () => {
      cancelled = true
    }
  }, [])

  if (data.status === 'loading') return <Note>Loading…</Note>
  if (data.status === 'signed_out') {
    return <Note>Meal data not available right now. Sign in with the same email you use for the meal plan to see your progress.</Note>
  }
  if (data.status === 'not_linked') {
    return (
      <Note>
        We could not find a meal-plan account with your email. Please sign in here with the same email you use for the
        meal plan, or WhatsApp us on 09963721999.
      </Note>
    )
  }
  if (data.status !== 'ok') return <Note>Meal data not available right now. Please try again later.</Note>

  const { diet, exercise, sleep, progress, coins } = data
  return (
    <div className="mb-8 rounded-lg border border-green-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-gray-900">🍽️ My 30-day meal plan</h2>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800" title="1 coin per day logged, +5 for every full 7 days in a row">
          ⭐ {coins.total} coins
        </span>
      </div>

      <EnergySummary energy={data.energy ?? null} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile icon="🥗" title="Diet log">
          <div className="text-2xl font-bold text-green-700">{diet.daysLogged}</div>
          <div>days logged</div>
          <div className="mt-1">
            {diet.savedToday ? `✅ Today saved (${diet.mealsToday} meals)` : '⏰ Today not saved yet'}
          </div>
        </Tile>

        <Tile icon="🚶" title="Exercise log">
          <div className="text-2xl font-bold text-green-700">{exercise.daysLogged}</div>
          <div>days logged ({exercise.last7Days} this week)</div>
          {exercise.latest && (
            <div className="mt-1 text-xs text-gray-600">
              {niceDate(exercise.latest.date)}: {exercise.latest.text}
            </div>
          )}
        </Tile>

        <Tile icon="😴" title="Sleep log">
          <div className="text-2xl font-bold text-green-700">{sleep.daysLogged}</div>
          <div>days logged ({sleep.last7Days} this week)</div>
          {sleep.latest && (
            <div className="mt-1 text-xs text-gray-600">
              {niceDate(sleep.latest.date)}: {sleep.latest.text}
            </div>
          )}
        </Tile>

        <Tile icon="📈" title="Day 1 vs today">
          <div className="text-2xl font-bold text-green-700">
            {progress.planDay ? `Day ${progress.planDay}` : '–'}
            <span className="text-sm font-normal text-gray-600"> of 30</span>
          </div>
          <div>
            Week 1: {progress.firstWeekLogged}/7 days • Last 7 days: {progress.last7DaysLogged}/7
          </div>
          <div>🔥 {progress.streak} days in a row</div>
          <div className="mt-1 text-xs text-gray-500">Weight, waist and sugar are not recorded in the meal app yet.</div>
        </Tile>
      </div>

      <p className="mt-3 text-sm text-gray-600">
        Last diet log: {niceDate(diet.lastSaved)}.{' '}
        <a href={MEAL_APP} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-700 underline">
          Log today in the meal app
        </a>
      </p>
    </div>
  )
}

/* ---------------- Energy summary (Cronometer-style rings) ---------------- */
const PLAN_KCAL_DEFAULT = 1500
const BURN_TARGET = 300
const SLEEP_TARGET_MIN = 8 * 60

function hours(min: number) {
  const h = Math.floor(min / 60)
  const m = Math.round(min % 60)
  return m ? `${h}h ${m}m` : `${h}h`
}

function EnergyRing({
  pct,
  color,
  value,
  unit,
  label,
  sub,
}: {
  pct: number | null
  color: string
  value: string
  unit: string
  label: string
  sub: string
}) {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(pct ?? 0))
    return () => cancelAnimationFrame(id)
  }, [pct])
  const r = 42
  const c = 2 * Math.PI * r
  const p = Math.max(0, Math.min(1, shown))
  return (
    <div className="flex min-w-0 flex-col items-center text-center">
      <div className="relative w-full max-w-[104px]">
        <svg viewBox="0 0 100 100" className="block w-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#f1f5f9" strokeWidth="9" />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - p)}
            style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(.22,1,.36,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
          <span className="text-[17px] font-extrabold text-gray-900">{value}</span>
          <span className="mt-0.5 text-[10px] font-medium text-gray-500">{unit}</span>
        </div>
      </div>
      <div className="mt-1.5 text-[13px] font-semibold" style={{ color }}>
        {label}
      </div>
      <div className="text-[11px] leading-tight text-gray-500">{sub}</div>
    </div>
  )
}

function EnergySummary({ energy }: { energy: Energy | null }) {
  const eaten = energy?.eatenKcal ?? null
  const burned = energy?.burnedKcal ?? null
  const slept = energy?.sleepMinutes ?? null
  const plan = energy?.planKcal ?? PLAN_KCAL_DEFAULT
  const when = !energy ? 'Today' : energy.isToday ? 'Today' : niceDate(energy.date)
  return (
    <section
      className="mb-4 rounded-[20px] bg-white p-3 sm:p-4"
      style={{ boxShadow: '0 2px 10px rgba(15,23,42,0.06)', border: '1px solid #f1f5f9' }}
      aria-label="Energy summary"
    >
      <div className="mb-2 flex items-baseline justify-between gap-2 px-1">
        <h3 className="text-base font-bold text-gray-900">Energy summary</h3>
        <span className="text-xs text-gray-500">{when}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <EnergyRing
          pct={eaten != null ? eaten / plan : null}
          color="#10b981"
          value={eaten != null ? String(eaten) : '—'}
          unit="kcal"
          label="Eaten"
          sub={`of ${plan} plan`}
        />
        <EnergyRing
          pct={burned != null ? burned / BURN_TARGET : null}
          color="#a855f7"
          value={burned != null ? `~${burned}` : '—'}
          unit="kcal"
          label="Burned"
          sub="exercise, approx."
        />
        <EnergyRing
          pct={slept != null ? slept / SLEEP_TARGET_MIN : null}
          color="#f97316"
          value={slept != null ? hours(slept) : '—'}
          unit="sleep"
          label="Sleep"
          sub="goal 7–8 h"
        />
      </div>
      <p className="mt-2 px-1 text-[11px] leading-snug text-gray-500">
        From your meal-app log. &ldquo;—&rdquo; means not logged yet (or logged in the old text format).
      </p>
    </section>
  )
}
