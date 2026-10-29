import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff-auth';
import { normalizeMobileDigits } from '@/lib/admin-patient-tracker';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const denied = await requireStaff();
    if (denied) return denied;

    const url = process.env.DATABASE_URL ?? process.env.NEON_DATABASE_URL ?? '';
    if (!url.trim()) {
      return NextResponse.json({ error: 'Database not configured (DATABASE_URL)' }, { status: 500 });
    }

    let body: Record<string, unknown> = {};
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch (parseErr) {
      const msg = parseErr instanceof Error ? parseErr.message : String(parseErr);
      console.log('[admin/add-patient] JSON parse error:', msg);
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    const patientName = typeof body.patient_name === 'string' ? body.patient_name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const mobileRaw = typeof body.mobile_number === 'string' ? body.mobile_number.trim() : '';
    const mobileDigits = normalizeMobileDigits(mobileRaw);
    const clerkRaw = typeof body.clerk_user_id === 'string' ? body.clerk_user_id.trim() : '';
    const clerkUserId = clerkRaw.length > 0 ? clerkRaw : null;

    if (!patientName || mobileDigits.length < 10 || !email) {
      return NextResponse.json(
        { error: 'patient_name, mobile_number (10+ digits), and email are required' },
        { status: 500 },
      );
    }

    const mobileStored = mobileRaw || mobileDigits;
    const sql = neon(url.trim());

    await sql`
      INSERT INTO patient_tracker (
        patient_name,
        mobile_number,
        email,
        clerk_user_id,
        start_date
      )
      VALUES (
        ${patientName},
        ${mobileStored},
        ${email},
        ${clerkUserId},
        CURRENT_DATE
      )
    `;

    return NextResponse.json({ success: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log('[admin/add-patient] Neon error:', msg);
    if (e instanceof Error && e.stack) {
      console.log('[admin/add-patient] stack:', e.stack);
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
