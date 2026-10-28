import { NextRequest, NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff-auth';
import { homaSql } from '@/lib/homa-db';

export const dynamic = 'force-dynamic';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

  const clerkUserId = typeof body.clerk_user_id === 'string' ? body.clerk_user_id.trim() : '';
  if (!clerkUserId || !clerkUserId.startsWith('user_')) {
    return NextResponse.json(
      { error: 'clerk_user_id is required (Clerk id like user_...)' },
      { status: 400 },
    );
  }

  const assessmentId =
    typeof body.assessment_id === 'string' ? body.assessment_id.trim() : '';
  if (!assessmentId || !UUID_RE.test(assessmentId)) {
    return NextResponse.json(
      { error: 'assessment_id is required — search by mobile and select the exact row to link' },
      { status: 400 },
    );
  }

  try {
    const updated = await sql`
      UPDATE patient_assessments
      SET
        clerk_user_id = ${clerkUserId},
        program_start_date = COALESCE(program_start_date, CURRENT_DATE)
      WHERE id = ${assessmentId}
      RETURNING id, clerk_user_id, age, gender, hba1c, created_at, program_start_date, mobile_number
    `;

    if (updated.length === 0) {
      return NextResponse.json({ error: 'Assessment not found for that id' }, { status: 404 });
    }

    return NextResponse.json({ success: true, assessment: updated[0] });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('program_start_date')) {
      try {
        const updated = await sql`
          UPDATE patient_assessments
          SET clerk_user_id = ${clerkUserId}
          WHERE id = ${assessmentId}
          RETURNING id, clerk_user_id, age, gender, hba1c, created_at, mobile_number
        `;
        if (updated.length === 0) {
          return NextResponse.json({ error: 'Assessment not found for that id' }, { status: 404 });
        }
        return NextResponse.json({ success: true, assessment: updated[0] });
      } catch (inner) {
        const innerMsg = inner instanceof Error ? inner.message : String(inner);
        console.error('[admin/link-assessment]', innerMsg);
        return NextResponse.json({ error: 'Failed to link assessment' }, { status: 500 });
      }
    }
    if (msg.includes('clerk_user_id')) {
      return NextResponse.json(
        {
          error:
            'Database missing clerk_user_id column. Run server/migrations/add_clerk_user_id.sql on Neon.',
        },
        { status: 500 },
      );
    }
    console.error('[admin/link-assessment]', msg);
    return NextResponse.json({ error: 'Failed to link assessment' }, { status: 500 });
  }
}
