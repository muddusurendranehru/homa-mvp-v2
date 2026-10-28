import { NextRequest, NextResponse } from 'next/server';
import { requireCalculatorSaveAuth } from '@/lib/calculator-save-auth';
import { homaSql } from '@/lib/homa-db';
import { todayLogDateUtc } from '@/lib/patient-daily-log';

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

function mobileFromBody(body: SaveBody): string | null {
  const raw =
    str(body.mobile_number) ??
    str(body.mobile) ??
    str(body.phone) ??
    str(body.patient_phone) ??
    str(body.phone_number);
  if (!raw) return null;
  const digits = raw.replace(/\D/g, '');
  if (digits.length >= 10) {
    return digits.length > 10 && digits.startsWith('91') ? digits.slice(-10) : digits;
  }
  return raw;
}

function mapPayload(body: SaveBody) {
  const patient_name = str(body.patient_name ?? body.name);
  const email = str(body.email ?? body.patient_email);
  const mobile_number = mobileFromBody(body);
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
    patient_name,
    email,
    mobile_number,
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
  const programStart = mapped.clerk_user_id ? todayLogDateUtc() : null;

  try {
    const rows = await sql`
      INSERT INTO patient_assessments (
        patient_name, email, mobile_number,
        age, gender, height_cm, weight_kg, waist_cm,
        fbs, fasting_insulin, hba1c, hdl, ldl, triglycerides,
        clerk_user_id, program_start_date, created_at
      ) VALUES (
        ${mapped.patient_name}, ${mapped.email}, ${mapped.mobile_number},
        ${mapped.age}, ${mapped.gender}, ${mapped.height_cm}, ${mapped.weight_kg}, ${mapped.waist_cm},
        ${mapped.fbs}, ${mapped.fasting_insulin}, ${mapped.hba1c}, ${mapped.hdl}, ${mapped.ldl}, ${mapped.triglycerides},
        ${mapped.clerk_user_id}, ${programStart}::date, NOW()
      )
      RETURNING id
    `;
    const id = String((rows[0] as { id: string }).id);
    return NextResponse.json({ success: true, id });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (
      msg.includes('program_start_date') ||
      msg.includes('clerk_user_id') ||
      msg.includes('mobile_number') ||
      msg.includes('patient_name') ||
      msg.includes('email')
    ) {
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
      } catch {
        /* fall through */
      }
    }
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
