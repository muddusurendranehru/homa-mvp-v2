import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { fetchLatestPatientAssessmentByClerkUserId } from '@/lib/homa-db';
import { buildPatientMeResponse } from '@/lib/patient-me';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

/**
 * Signed-in patient's latest linked assessment + journey defaults.
 */
export async function GET() {
  const { userId } = await auth();
  console.log('Clerk ID:', userId);

  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized', message: 'Please sign in to view your tracker baseline.' },
      { status: 401, headers: NO_STORE },
    );
  }

  try {
    const row = await fetchLatestPatientAssessmentByClerkUserId(userId);
    console.log('DB Query Result:', row);

    const body = await buildPatientMeResponse(userId, row);
    return NextResponse.json(body, { headers: NO_STORE });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('DB Query Error:', message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500, headers: NO_STORE },
    );
  }
}
