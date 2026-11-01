import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';

export const dynamic = 'force-dynamic';

const PLACE_KINDS = ['lab', 'pharmacy', 'organic', 'lifestyle', 'electronics'] as const;
type PlaceKind = (typeof PLACE_KINDS)[number];

function parseKindParam(raw: string | null): PlaceKind | null {
  const kind = raw?.trim().toLowerCase();
  if (!kind) return null;
  return (PLACE_KINDS as readonly string[]).includes(kind) ? (kind as PlaceKind) : null;
}

export async function GET(request: Request) {
  try {
    const kind = parseKindParam(new URL(request.url).searchParams.get('kind'));
    if (new URL(request.url).searchParams.get('kind') && !kind) {
      return NextResponse.json(
        { error: `Invalid kind. Use one of: ${PLACE_KINDS.join(', ')}` },
        { status: 400 },
      );
    }

    const sql = getSql();
    const places = kind
      ? await sql`SELECT * FROM places WHERE kind = ${kind}`
      : await sql`SELECT * FROM places`;
    return NextResponse.json({ places });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch places';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
