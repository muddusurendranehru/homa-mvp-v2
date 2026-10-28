import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

/**
 * @deprecated Use POST /api/patient/upload-meal with multipart field `file`.
 */
export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE });
  }

  return NextResponse.json(
    {
      ok: false,
      persisted: false,
      error: 'Use POST /api/patient/upload-meal with multipart form field file',
    },
    { status: 410, headers: NO_STORE },
  );
}
