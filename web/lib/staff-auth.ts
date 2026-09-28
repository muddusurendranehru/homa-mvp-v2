import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

/**
 * Clinic staff allowed to see patient data (/staff and /api/staff).
 * More emails can be added on Render with env var STAFF_EMAILS (comma-separated).
 */
const DEFAULT_STAFF_EMAILS = [
  'homasurendranehru@gmail.com',
  'homahealthcarecenter@gmail.com',
]

function allowedStaffEmails(): Set<string> {
  const extra = (process.env.STAFF_EMAILS || '').split(',')
  return new Set(
    [...DEFAULT_STAFF_EMAILS, ...extra]
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  )
}

/**
 * Returns null if the caller is signed-in staff (verified email on the allowlist);
 * otherwise returns a 401/403 JSON response to send back instead of patient data.
 */
export async function requireStaff(): Promise<NextResponse | null> {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized - please sign in' }, { status: 401 })
  }
  const user = await currentUser()
  const allowed = allowedStaffEmails()
  const isStaff = !!user?.emailAddresses?.some(
    (e) =>
      e.verification?.status === 'verified' &&
      allowed.has(e.emailAddress.toLowerCase()),
  )
  if (!isStaff) {
    return NextResponse.json({ error: 'Forbidden - staff only' }, { status: 403 })
  }
  return null
}
