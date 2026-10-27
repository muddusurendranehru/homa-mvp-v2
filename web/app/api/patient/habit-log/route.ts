import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Stub — daily_habits table + Clerk linkage not migrated yet.
 * Tracker keeps habit checkboxes in session until this persists to Neon.
 */
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const habit = typeof body.habit === 'string' ? body.habit : '';
  const completed = body.completed === true;

  return NextResponse.json(
    {
      ok: true,
      persisted: false,
      message: 'Habit logged in this session only; Neon persistence coming soon.',
      habit,
      completed,
    },
    { status: 202 },
  );
}
