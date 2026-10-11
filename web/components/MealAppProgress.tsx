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
          🪙 {coins.total} coins
        </span>
      </div>

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
