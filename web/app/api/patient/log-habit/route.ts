import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { HABIT_COIN_REWARD } from '@/lib/patient-me';
import { upsertPatientHabit, type HabitTypeApi, todayLogToJson } from '@/lib/patient-daily-log';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

function parseHabitType(value: unknown): HabitTypeApi | null {
  if (value === 'walk' || value === 'sleep' || value === 'water') return value;
  // Legacy UI sent exercise → walk
  if (value === 'exercise') return 'walk';
  return null;
}

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

  const habitType = parseHabitType(body.habit_type ?? body.habit);
  if (!habitType) {
    return NextResponse.json(
      { error: 'habit_type must be walk, sleep, or water' },
      { status: 400, headers: NO_STORE },
    );
  }

  const completed =
    body.completed === true ||
    body.completed === 'true' ||
    (body.completed === undefined && body.habit_type != null);

  try {
    const { row, coinsDelta, totalCoins } = await upsertPatientHabit(userId, habitType, completed);

    return NextResponse.json(
      {
        ok: true,
        persisted: true,
        habit_type: habitType,
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
    console.error('[log-habit]', message);
    return NextResponse.json({ error: message }, { status: 500, headers: NO_STORE });
  }
}
