import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { lookupLatestBaselineByClerkUserId } from '@/lib/homa-db';
import { patientMeFromRow } from '@/lib/patient-me';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

/**
 * Signed-in patient's latest linked assessment + journey defaults.
 * Habits, meal photos, and persisted HOMA Coins will use dedicated tables in a follow-up;
 * journey.coinsBalance stays null until Clerk is linked to patient_coins.
 */
export async function GET() {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated || !userId) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized', message: 'Please sign in to view your tracker baseline.' },
      { status: 401, headers: NO_STORE },
    );
  }

  const lookup = await lookupLatestBaselineByClerkUserId(userId);

  // Temporary Render log aid — remove after baseline linking is verified in production.
  console.log('[api/patient/me] clerk userId=', userId, 'lookup=', lookup.kind);

  if (lookup.kind === 'db_unconfigured') {
    console.error('[api/patient/me] DATABASE_URL / NEON_DATABASE_URL not set on web service');
    return NextResponse.json(
      {
        success: false,
        error: 'Database not configured',
        message: 'Clinic database is temporarily unavailable. Please try again later.',
      },
      { status: 503, headers: NO_STORE },
    );
  }

  if (lookup.kind === 'error') {
    return NextResponse.json(
      {
        success: false,
        error: 'Database error',
        message: 'Could not load your clinic baseline. Please try again later.',
      },
      { status: 500, headers: NO_STORE },
    );
  }

  const row = lookup.kind === 'found' ? lookup.row : null;
  if (row) {
    console.log('[api/patient/me] assessment row id=', row.id, 'hba1c=', row.hba1c);
  }

  const body = patientMeFromRow(row);
  return NextResponse.json(body, { headers: NO_STORE });
}
