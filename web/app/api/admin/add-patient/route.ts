import { NextRequest, NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff-auth';
import { homaSql } from '@/lib/homa-db';
import { normalizeMobileDigits } from '@/lib/admin-patient-tracker';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const denied = await requireStaff();
  if (denied) return denied;

  const sql = homaSql();
  if (!sql) {
    return NextResponse.json({ error: 'Database not configured (DATABASE_URL)' }, { status: 500 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const patientName = typeof body.patient_name === 'string' ? body.patient_name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const mobileRaw = typeof body.mobile_number === 'string' ? body.mobile_number.trim() : '';
  const mobileDigits = normalizeMobileDigits(mobileRaw);
  const clerkUserId = typeof body.clerk_user_id === 'string' ? body.clerk_user_id.trim() : '';

  if (!patientName) {
    return NextResponse.json({ error: 'patient_name is required' }, { status: 400 });
  }
  if (mobileDigits.length < 10) {
    return NextResponse.json(
      { error: 'mobile_number is required (at least 10 digits)' },
      { status: 400 },
    );
  }
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'email is required' }, { status: 400 });
  }
  if (!clerkUserId || !clerkUserId.startsWith('user_')) {
    return NextResponse.json(
      { error: 'clerk_user_id is required (Clerk id like user_...)' },
      { status: 400 },
    );
  }

  const mobileStored = mobileRaw || mobileDigits;

  try {
    const inserted = await sql`
      INSERT INTO patient_tracker (
        clerk_user_id,
        mobile_number,
        email,
        patient_name,
        start_date
      )
      VALUES (
        ${clerkUserId},
        ${mobileStored},
        ${email},
        ${patientName},
        CURRENT_DATE
      )
      RETURNING id, clerk_user_id, mobile_number, email, patient_name, start_date
    `;

    return NextResponse.json({ success: true, patient: inserted[0] ?? null });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('patient_tracker_clerk_user_id_key') || msg.includes('duplicate key')) {
      return NextResponse.json(
        { error: 'That Clerk user id is already registered in patient_tracker.' },
        { status: 409 },
      );
    }
    if (msg.includes('patient_tracker')) {
      return NextResponse.json(
        {
          error:
            'Database missing patient_tracker table. Run server/migrations/create_patient_tracker.sql on Neon.',
        },
        { status: 500 },
      );
    }
    console.error('[admin/add-patient]', msg);
    return NextResponse.json({ error: 'Failed to add patient' }, { status: 500 });
  }
}
