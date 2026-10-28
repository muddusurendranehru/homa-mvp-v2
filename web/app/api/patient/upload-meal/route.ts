import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import {
  MAX_MEAL_BYTES,
  mealPhotoStorageUrl,
  todayLogToJson,
  upsertMealPhotoUrl,
} from '@/lib/patient-daily-log';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Expected multipart form data' }, { status: 400, headers: NO_STORE });
  }

  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'Missing image file (field name: file)' }, { status: 400, headers: NO_STORE });
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Only image uploads are allowed' }, { status: 400, headers: NO_STORE });
  }

  if (file.size > MAX_MEAL_BYTES) {
    return NextResponse.json(
      { error: `Image too large (max ${MAX_MEAL_BYTES / (1024 * 1024)}MB)` },
      { status: 413, headers: NO_STORE },
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const mealPhotoUrl = mealPhotoStorageUrl(buffer, file.type || 'image/jpeg');
    const { row, totalCoins } = await upsertMealPhotoUrl(userId, mealPhotoUrl);

    return NextResponse.json(
      {
        ok: true,
        persisted: true,
        message: 'Meal photo saved for HOMA staff review.',
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        total_coins: totalCoins,
        today_log: todayLogToJson(row),
      },
      { status: 200, headers: NO_STORE },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('[upload-meal]', message);
    const status = message.includes('too large') ? 413 : 500;
    return NextResponse.json({ error: message, persisted: false }, { status, headers: NO_STORE });
  }
}
