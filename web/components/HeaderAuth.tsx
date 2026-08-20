'use client';

import Link from 'next/link';
import { useUser, SignOutButton } from '@clerk/nextjs';

export default function HeaderAuth() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (user) {
    const display = user.primaryEmailAddress?.emailAddress ?? user.fullName ?? 'Account';
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
      className="font-semibold hover:text-yellow-300 transition-colors"
    >
      Sign In
    </Link>
  );
}
