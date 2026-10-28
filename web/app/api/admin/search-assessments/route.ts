import { NextRequest, NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff-auth';
import { homaSql } from '@/lib/homa-db';
import { mapAssessmentSearchRow, normalizeMobileDigits } from '@/lib/admin-assessments';

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
        patient_name,
        age,
        mobile_number,
        email,
        created_at,
        clerk_user_id
      FROM patient_assessments
      WHERE regexp_replace(COALESCE(mobile_number, ''), '[^0-9]', '', 'g') LIKE ${likePattern}
      ORDER BY created_at DESC NULLS LAST
      LIMIT 25
    `;

    const assessments = (Array.isArray(rows) ? rows : []).map((row) =>
      mapAssessmentSearchRow(row as Record<string, unknown>),
    );

    return NextResponse.json({ assessments });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('mobile_number')) {
      return NextResponse.json(
        {
          error:
            'Database missing mobile_number column. Run server/migrations/add_assessment_contact_fields.sql on Neon.',
        },
        { status: 500 },
      );
    }
    console.error('[admin/search-assessments]', msg);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
