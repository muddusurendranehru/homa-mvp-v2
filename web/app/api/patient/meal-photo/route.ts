import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Stub — meal_logs + object storage not wired yet.
 * Accepts metadata only (no file upload) so the tracker can call a real endpoint.
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

  const fileName = typeof body.fileName === 'string' ? body.fileName : '';
  const fileSize = typeof body.fileSize === 'number' ? body.fileSize : 0;
  const mimeType = typeof body.mimeType === 'string' ? body.mimeType : '';

  return NextResponse.json(
    {
      ok: true,
      persisted: false,
      message: 'Meal photo noted for staff follow-up; Neon/storage upload coming soon.',
      fileName,
      fileSize,
      mimeType,
    },
    { status: 202 },
  );
}
