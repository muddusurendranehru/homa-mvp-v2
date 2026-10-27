import { NextRequest, NextResponse } from 'next/server';
import { requireCalculatorSaveAuth } from '@/lib/calculator-save-auth';
import { homaSql } from '@/lib/homa-db';

export const dynamic = 'force-dynamic';

type SaveBody = Record<string, unknown>;

function num(v: unknown): number | null {
  if (v === null || v === undefined || v === '') return null;
  const n = typeof v === 'number' ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : null;
}

function str(v: unknown): string | null {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s || null;
}

function mapPayload(body: SaveBody) {
  const age = num(body.patient_age ?? body.age);
  const gender = str(body.patient_sex ?? body.gender);
  const height_cm = num(body.height_cm);
  const weight_kg = num(body.weight_kg);
  const waist_cm = num(body.waist_cm);
  const fbs = num(body.fasting_glucose ?? body.fbs);
  const fasting_insulin = num(body.fasting_insulin);
  const hba1c = num(body.hba1c);
  const hdl = num(body.hdl);
  const ldl = num(body.ldl);
  const triglycerides = num(body.triglycerides);
  const clerk_user_id = str(body.clerk_user_id);

  return {
    age,
    gender,
    height_cm,
    weight_kg,
    waist_cm,
    fbs,
    fasting_insulin,
    hba1c,
    hdl,
    ldl,
    triglycerides,
    clerk_user_id,
  };
}

export async function POST(request: NextRequest) {
  let body: SaveBody = {};
  try {
    body = (await request.json()) as SaveBody;
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const denied = await requireCalculatorSaveAuth(request, body);
  if (denied) return denied;

  const sql = homaSql();
  if (!sql) {
    return NextResponse.json(
      { success: false, error: 'Database not configured (DATABASE_URL)' },
      { status: 500 },
    );
  }

  const mapped = mapPayload(body);

  try {
    const rows = await sql`
      INSERT INTO patient_assessments (
        age, gender, height_cm, weight_kg, waist_cm,
        fbs, fasting_insulin, hba1c, hdl, ldl, triglycerides,
        clerk_user_id, created_at
      ) VALUES (
        ${mapped.age}, ${mapped.gender}, ${mapped.height_cm}, ${mapped.weight_kg}, ${mapped.waist_cm},
        ${mapped.fbs}, ${mapped.fasting_insulin}, ${mapped.hba1c}, ${mapped.hdl}, ${mapped.ldl}, ${mapped.triglycerides},
        ${mapped.clerk_user_id}, NOW()
      )
      RETURNING id
    `;
    const id = String((rows[0] as { id: string }).id);
    return NextResponse.json({ success: true, id });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('clerk_user_id')) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Database missing clerk_user_id column. Run server/migrations/add_clerk_user_id.sql on Neon, then retry.',
        },
        { status: 500 },
      );
    }
    console.error('[calculator/save]', msg);
    return NextResponse.json({ success: false, error: 'Failed to save assessment' }, { status: 500 });
  }
}
