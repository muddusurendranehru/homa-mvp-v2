import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANONICAL_HOST = 'mvp.homahealthcarecenter.in';

function hostnameLooksLikeRender(req: NextRequest): boolean {
  const fromUrl = req.nextUrl.hostname;
  const fromHost = req.headers.get('host')?.split(':')[0];
  const fromXfh = req.headers
    .get('x-forwarded-host')
    ?.split(',')[0]
    ?.trim()
    .split(':')[0];
  return [fromUrl, fromHost, fromXfh].some(
    (h) => !!h && h.includes('onrender.com'),
  );
}

/** Clerk session required only for these routes; all others are public at the edge. */
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (hostnameLooksLikeRender(req)) {
    const url = req.nextUrl.clone();
    url.hostname = CANONICAL_HOST;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  if (req.nextUrl.pathname.startsWith('/api/admin/blog')) {
    return NextResponse.next();
  }
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
    '/(api|trpc)(.*)',
  ],
};
