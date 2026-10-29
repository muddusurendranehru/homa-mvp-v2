import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff-auth';
import { normalizeMobileDigits } from '@/lib/admin-patient-tracker';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const denied = await requireStaff();
  if (denied) return denied;

  const url = process.env.DATABASE_URL ?? process.env.NEON_DATABASE_URL ?? '';
  if (!url.trim()) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 500 });
  }

  const patientName = typeof body.patient_name === 'string' ? body.patient_name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const mobileRaw = typeof body.mobile_number === 'string' ? body.mobile_number.trim() : '';
  const mobileDigits = normalizeMobileDigits(mobileRaw);
  const clerkUserId = typeof body.clerk_user_id === 'string' ? body.clerk_user_id.trim() : '';

  if (!patientName || mobileDigits.length < 10 || !email || !clerkUserId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 500 });
  }

  const sql = neon(url.trim());
  const mobileStored = mobileRaw || mobileDigits;

  try {
    await sql`
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
    `;

    return NextResponse.json({ success: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[admin/add-patient]', msg);
    return NextResponse.json({ error: 'Failed to add patient' }, { status: 500 });
  }
}
