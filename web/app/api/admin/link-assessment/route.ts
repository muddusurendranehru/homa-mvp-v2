import { NextRequest, NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff-auth';
import { homaSql } from '@/lib/homa-db';

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

  const clerkUserId = typeof body.clerk_user_id === 'string' ? body.clerk_user_id.trim() : '';
  if (!clerkUserId || !clerkUserId.startsWith('user_')) {
    return NextResponse.json(
      { error: 'clerk_user_id is required (Clerk id like user_...)' },
      { status: 400 },
    );
  }

  const assessmentId =
    typeof body.assessment_id === 'string' && body.assessment_id.trim()
      ? body.assessment_id.trim()
      : null;
  const useLatest = body.use_latest === true || body.use_latest === 'true' || !assessmentId;

  let targetId = assessmentId;

  try {
    if (useLatest) {
      const latest = await sql`
        SELECT id
        FROM patient_assessments
        WHERE clerk_user_id IS NULL
        ORDER BY created_at DESC
        LIMIT 1
      `;
      if (latest.length === 0) {
        return NextResponse.json(
          { error: 'No unmatched assessment found (all rows already have clerk_user_id)' },
          { status: 404 },
        );
      }
      targetId = String((latest[0] as { id: string }).id);
    }

    const updated = await sql`
      UPDATE patient_assessments
      SET
        clerk_user_id = ${clerkUserId.trim()},
        program_start_date = COALESCE(program_start_date, CURRENT_DATE)
      WHERE id = ${targetId}
      RETURNING id, clerk_user_id, age, gender, hba1c, created_at, program_start_date
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
          SET clerk_user_id = ${clerkUserId.trim()}
          WHERE id = ${targetId}
          RETURNING id, clerk_user_id, age, gender, hba1c, created_at
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
