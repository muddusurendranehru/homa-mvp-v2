import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff-auth';
import { homaSql } from '@/lib/homa-db';
import { buildWhatsAppUrlForMobile, tenDigitFromStoredMobile, tenDigitIndianMobile } from '@/lib/whatsapp-patient-invite';

export const dynamic = 'force-dynamic';

type TrackerRow = {
  id: string;
  clerk_user_id: string | null;
  mobile_number: string | null;
  email: string | null;
  patient_name: string | null;
  start_date: unknown;
};

function mapRow(raw: Record<string, unknown>): TrackerRow {
  return {
    id: String(raw.id),
    clerk_user_id: raw.clerk_user_id != null ? String(raw.clerk_user_id) : null,
    mobile_number: raw.mobile_number != null ? String(raw.mobile_number) : null,
    email: raw.email != null ? String(raw.email) : null,
    patient_name: raw.patient_name != null ? String(raw.patient_name) : null,
    start_date: raw.start_date,
  };
}

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
  const mobileRaw = typeof body.mobile_number === 'string' ? body.mobile_number.trim() : '';
  const patientName = typeof body.patient_name === 'string' ? body.patient_name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';

  if (!clerkUserId) {
    return NextResponse.json({ error: 'clerk_user_id is required' }, { status: 400 });
  }

  const mobile = tenDigitIndianMobile(mobileRaw);
  if (!mobile) {
    return NextResponse.json(
      { error: 'mobile_number must be a valid 10-digit Indian mobile (spaces, +91, or leading 0 allowed)' },
      { status: 400 },
    );
  }

  if (!patientName || !email) {
    return NextResponse.json({ error: 'patient_name and email are required' }, { status: 400 });
  }

  const client = await clerkClient();
  try {
    await client.users.getUser(clerkUserId);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (/not found|404|could not be found/i.test(msg)) {
      return NextResponse.json({ error: 'Invalid Clerk user id — user not found' }, { status: 400 });
    }
    console.error('[admin/link-patient] Clerk getUser:', msg);
    return NextResponse.json({ error: 'Could not verify Clerk user id' }, { status: 400 });
  }

  const whatsappUrl = buildWhatsAppUrlForMobile(mobile);
  if (!whatsappUrl) {
    return NextResponse.json({ error: 'Could not build WhatsApp URL for mobile' }, { status: 400 });
  }

  try {
    const byMobileRows = await sql`
      SELECT id, clerk_user_id, mobile_number, email, patient_name, start_date
      FROM patient_tracker
      WHERE right(regexp_replace(COALESCE(mobile_number, ''), '[^0-9]', '', 'g'), 10) = ${mobile}
      LIMIT 1
    `;
    const byClerkRows = await sql`
      SELECT id, clerk_user_id, mobile_number, email, patient_name, start_date
      FROM patient_tracker
      WHERE clerk_user_id = ${clerkUserId}
      LIMIT 1
    `;

    const mobileRow = (Array.isArray(byMobileRows) ? byMobileRows[0] : null) as
      | Record<string, unknown>
      | undefined;
    const clerkRow = (Array.isArray(byClerkRows) ? byClerkRows[0] : null) as
      | Record<string, unknown>
      | undefined;

    const mobilePatient = mobileRow ? mapRow(mobileRow) : null;
    const clerkPatient = clerkRow ? mapRow(clerkRow) : null;

    if (mobilePatient && clerkPatient && mobilePatient.id !== clerkPatient.id) {
      return NextResponse.json(
        {
          error:
            'Conflict: this mobile and Clerk user belong to two different patient_tracker rows. Resolve manually in the database.',
        },
        { status: 409 },
      );
    }

    if (clerkPatient) {
      const linkedMobile = tenDigitFromStoredMobile(clerkPatient.mobile_number);
      if (linkedMobile && linkedMobile !== mobile) {
        return NextResponse.json(
          {
            error: `Conflict: Clerk user is already linked to mobile ${linkedMobile}. Unlink or use that number.`,
          },
          { status: 409 },
        );
      }
    }

    if (mobilePatient?.clerk_user_id && mobilePatient.clerk_user_id !== clerkUserId) {
      return NextResponse.json(
        {
          error: `Conflict: mobile ${mobile} is already linked to a different Clerk user.`,
        },
        { status: 409 },
      );
    }

    const target = mobilePatient ?? clerkPatient;

    if (target) {
      await sql`
        UPDATE patient_tracker
        SET
          clerk_user_id = ${clerkUserId},
          mobile_number = ${mobile},
          patient_name = ${patientName},
          email = ${email},
          staff_linked = TRUE
        WHERE id = ${target.id}
      `;
    } else {
      await sql`
        INSERT INTO patient_tracker (
          patient_name,
          mobile_number,
          email,
          clerk_user_id,
          start_date,
          staff_linked
        )
        VALUES (
          ${patientName},
          ${mobile},
          ${email},
          ${clerkUserId},
          CURRENT_DATE,
          TRUE
        )
      `;
    }

    return NextResponse.json({ success: true, whatsappUrl });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[admin/link-patient]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
