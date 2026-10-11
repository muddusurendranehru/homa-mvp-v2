'use client';

import Link from 'next/link';
import { useUser, SignOutButton } from '@clerk/nextjs';

/**
 * variant "default": original text-link look (used by BlogLayout).
 * variant "pill": white secondary button for the slim navbar / About section.
 */
export default function HeaderAuth({ variant = 'default' }: { variant?: 'default' | 'pill' } = {}) {
  const { user, isLoaded } = useUser();

  const pill = variant === 'pill';
  const pillCls =
    'inline-flex min-h-[48px] items-center justify-center rounded-[14px] border border-slate-200 bg-white px-3 sm:px-4 text-sm font-semibold text-slate-900 no-underline transition-colors hover:border-slate-300 hover:bg-slate-50';

  // Pill variant shows "Sign In" straight away (also if Clerk is slow / blocked) so the navbar never has a gap.
  if (!isLoaded && !pill) return null;

  if (isLoaded && user) {
    const display = user.primaryEmailAddress?.emailAddress ?? user.fullName ?? 'Account';
    if (pill) {
      return (
        <div className="flex items-center gap-2">
          <span className="hidden max-w-[160px] truncate text-xs text-slate-500 lg:inline" title={String(display)}>
            {display}
          </span>
          <SignOutButton>
            <button type="button" className={pillCls}>
              Sign Out
            </button>
          </SignOutButton>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 text-xs md:text-sm">
        <span className="text-gray-200 truncate max-w-[120px] md:max-w-[180px]" title={String(display)}>
          {display}
        </span>
        <span className="text-gray-400 hidden md:inline">|</span>
        <SignOutButton>
          <button type="button" className="font-semibold hover:text-yellow-300 transition-colors">
            Sign Out
          </button>
        </SignOutButton>
      </div>
    );
  }

  return (
    <Link
      href="/auth"
      className={pill ? pillCls : 'font-semibold hover:text-yellow-300 transition-colors'}
    >
      Sign In
    </Link>
  );
}
