import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sql = getSql();
    const places = await sql`SELECT * FROM places`;
    return NextResponse.json({ places });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch places';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
