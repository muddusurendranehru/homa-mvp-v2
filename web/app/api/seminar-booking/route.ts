import { neon } from '@neondatabase/serverless';

function getSql() {
  const url = process.env.DATABASE_URL ?? process.env.NEON_DATABASE_URL ?? null;
  if (!url) return null;
  return neon(url);
}

export async function POST(request: Request) {
  const sql = getSql();
  if (!sql) {
    return Response.json({ error: 'Database not configured.' }, { status: 500 });
  }

  try {
    const { attendee_name, phone_number } = await request.json();

    if (!attendee_name || !phone_number) {
      return Response.json(
        { error: 'Name and phone number are required.' },
        { status: 400 }
      );
    }

    const rows = await sql`
      INSERT INTO seminar_bookings (attendee_name, phone_number)
      VALUES (${attendee_name}, ${phone_number})
      RETURNING booking_id
    `;

    return Response.json({ booking_id: rows[0].booking_id });
  } catch (e) {
    console.error('[seminar-booking]', e);
    return Response.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}