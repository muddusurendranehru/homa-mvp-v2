import { NextRequest, NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff-auth';
import { homaSql } from '@/lib/homa-db';
import { mapPatientTrackerRow, normalizeMobileDigits } from '@/lib/admin-patient-tracker';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const denied = await requireStaff();
  if (denied) return denied;

  const sql = homaSql();
  if (!sql) {
    return NextResponse.json({ error: 'Database not configured (DATABASE_URL)' }, { status: 500 });
  }

  const mobileRaw =
    request.nextUrl.searchParams.get('mobile') ??
    request.nextUrl.searchParams.get('mobile_number') ??
    '';
  const digits = normalizeMobileDigits(mobileRaw.trim());
  if (digits.length < 4) {
    return NextResponse.json(
      { error: 'Enter at least 4 digits of the mobile number to search' },
      { status: 400 },
    );
  }

  const likePattern = `%${digits}%`;

  try {
    const rows = await sql`
      SELECT
        id,
        clerk_user_id,
        mobile_number,
        email,
        patient_name,
        start_date
      FROM patient_tracker
      WHERE regexp_replace(COALESCE(mobile_number, ''), '[^0-9]', '', 'g') LIKE ${likePattern}
      ORDER BY start_date DESC NULLS LAST, patient_name ASC NULLS LAST
      LIMIT 25
    `;

    const patients = (Array.isArray(rows) ? rows : []).map((row) =>
      mapPatientTrackerRow(row as Record<string, unknown>),
    );

    return NextResponse.json({ patients });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('patient_tracker')) {
      return NextResponse.json(
        {
          error:
            'Database missing patient_tracker table. Run server/migrations/create_patient_tracker.sql on Neon.',
        },
        { status: 500 },
      );
    }
    console.error('[admin/search-patients]', msg);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
