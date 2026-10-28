import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { upsertPatientHabit, type HabitTypeApi } from '@/lib/patient-daily-log';
import { HABIT_COIN_REWARD } from '@/lib/patient-me';
import { todayLogToJson } from '@/lib/patient-daily-log';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

function habitFromLegacy(habit: string): HabitTypeApi | null {
  if (habit === 'exercise') return 'walk';
  if (habit === 'water') return 'water';
  if (habit === 'sleep') return 'sleep';
  if (habit === 'walk') return 'walk';
  return null;
}

/** @deprecated Prefer POST /api/patient/log-habit — kept for older tracker builds. */
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE });
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400, headers: NO_STORE });
  }

  const habit = typeof body.habit === 'string' ? body.habit : '';
  const habitType = habitFromLegacy(habit);
  if (!habitType) {
    return NextResponse.json({ error: 'Invalid habit' }, { status: 400, headers: NO_STORE });
  }

  const completed = body.completed === true;

  try {
    const { row, coinsDelta, totalCoins } = await upsertPatientHabit(userId, habitType, completed);
    return NextResponse.json(
      {
        ok: true,
        persisted: true,
        habit,
        completed,
        coins_delta: coinsDelta,
        coins_earned_today: row.coins_earned,
        total_coins: totalCoins,
        coin_reward: HABIT_COIN_REWARD,
        today_log: todayLogToJson(row),
      },
      { status: 200, headers: NO_STORE },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500, headers: NO_STORE });
  }
}
