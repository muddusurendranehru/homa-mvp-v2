import { NextRequest, NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff-auth';

function adminPasswordFromRequest(body: Record<string, unknown>, request: NextRequest): string | undefined {
  const fromBody = typeof body.password === 'string' ? body.password.trim() : undefined;
  const header = request.headers.get('x-admin-password')?.trim();
  const auth = request.headers.get('authorization');
  const bearer = auth?.startsWith('Bearer ') ? auth.slice(7).trim() : undefined;
  return fromBody ?? header ?? bearer ?? undefined;
}

/**
 * Staff-only save for the HTML metabolic analyzer.
 * Returns null when authorized; otherwise a JSON error response.
 */
export async function requireCalculatorSaveAuth(
  request: NextRequest,
  body: Record<string, unknown> = {},
): Promise<NextResponse | null> {
  const staffDenied = await requireStaff();
  if (!staffDenied) return null;

  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (expected) {
    const provided = adminPasswordFromRequest(body, request);
    if (provided && provided === expected) return null;
  }

  return NextResponse.json(
    { success: false, error: 'Unauthorized — clinic staff sign-in or admin password required' },
    { status: 401 },
  );
}
