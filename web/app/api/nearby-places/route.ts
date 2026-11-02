import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import { distanceKm } from '@/lib/nearby-places';

export const dynamic = 'force-dynamic';

const PLACE_KINDS = ['lab', 'pharmacy', 'organic'] as const;
type PlaceKind = (typeof PLACE_KINDS)[number];

const DEFAULT_RADIUS_M = 5000;
const MAX_RADIUS_M = 50_000;
const RESULT_LIMIT = 20;

type PlaceRow = {
  id: string;
  name: string | null;
  address: string | null;
  phone: string | null;
  lat: number | string | null;
  lng: number | string | null;
  kind: string | null;
};

function parseKindParam(raw: string | null): PlaceKind | null {
  const kind = raw?.trim().toLowerCase();
  if (!kind) return null;
  return (PLACE_KINDS as readonly string[]).includes(kind) ? (kind as PlaceKind) : null;
}

function parseCoord(raw: string | null, min: number, max: number): number | null {
  if (raw == null || raw.trim() === '') return null;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < min || value > max) return null;
  return value;
}

function parseRadius(raw: string | null): number {
  if (raw == null || raw.trim() === '') return DEFAULT_RADIUS_M;
  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0) return DEFAULT_RADIUS_M;
  return Math.min(value, MAX_RADIUS_M);
}

function postgisUnavailable(error: unknown): boolean {
  const message = (error instanceof Error ? error.message : String(error)).toLowerCase();
  return (
    message.includes('postgis') ||
    message.includes('st_dwithin') ||
    message.includes('st_makepoint') ||
    message.includes('st_setsrid') ||
    message.includes('geography') ||
    message.includes('column "location"') ||
    message.includes('column location')
  );
}

/** Temporary path when location is not backfilled or PostGIS is not installed yet. */
function filterByLatLng(rows: PlaceRow[], lat: number, lng: number, radiusM: number): PlaceRow[] {
  return rows
    .map((row) => ({
      row,
      meters: distanceKm(lat, lng, Number(row.lat), Number(row.lng)) * 1000,
    }))
    .filter((item) => Number.isFinite(item.meters) && item.meters <= radiusM)
    .sort((a, b) => a.meters - b.meters)
    .slice(0, RESULT_LIMIT)
    .map((item) => item.row);
}

export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;
    const kind = parseKindParam(params.get('kind'));
    if (!kind) {
      return NextResponse.json(
        { error: `kind is required. Use one of: ${PLACE_KINDS.join(', ')}` },
        { status: 400 },
      );
    }

    const lat = parseCoord(params.get('lat'), -90, 90);
    const lng = parseCoord(params.get('lng'), -180, 180);
    if (lat == null || lng == null) {
      return NextResponse.json(
        { error: 'lat and lng are required (decimal degrees)' },
        { status: 400 },
      );
    }

    const radiusM = parseRadius(params.get('radius'));
    const sql = getSql();

    try {
      // ST_DWithin + GiST KNN. Do not filter with ST_Distance(...) < meters.
      // Rows with a null location still match on lat/lng until the backfill runs.
      const places = await sql`
        SELECT id, name, address, phone, lat, lng, kind
        FROM places
        WHERE kind = ${kind}
          AND (
            (
              location IS NOT NULL
              AND ST_DWithin(
                location,
                ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography,
                ${radiusM}::double precision
              )
            )
            OR (
              location IS NULL
              AND lat IS NOT NULL
              AND lng IS NOT NULL
              AND ST_DWithin(
                ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
                ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography,
                ${radiusM}::double precision
              )
            )
          )
        ORDER BY location <-> ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography
        LIMIT 20
      `;
      return NextResponse.json({ places });
    } catch (error) {
      if (!postgisUnavailable(error)) throw error;
      const rows = (await sql`
        SELECT id, name, address, phone, lat, lng, kind
        FROM places
        WHERE kind = ${kind}
          AND lat IS NOT NULL
          AND lng IS NOT NULL
      `) as PlaceRow[];
      return NextResponse.json({ places: filterByLatLng(rows, lat, lng, radiusM) });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch places';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
