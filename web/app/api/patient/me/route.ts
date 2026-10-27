import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getLatestBaselineByClerkUserId } from '@/lib/homa-db';
import { patientMeFromRow } from '@/lib/patient-me';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

/**
 * Signed-in patient's latest linked assessment + journey defaults.
 * Habits, meal photos, and persisted HOMA Coins will use dedicated tables in a follow-up;
 * journey.coinsBalance stays null until Clerk is linked to patient_coins.
 */
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE });
  }

  const row = await getLatestBaselineByClerkUserId(userId);
  const body = patientMeFromRow(row);

  return NextResponse.json(body, { headers: NO_STORE });
}
