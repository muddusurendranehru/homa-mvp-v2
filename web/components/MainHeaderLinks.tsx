'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function trackerPillClass(pathname: string, compact = false) {
  return [
    'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full font-bold text-white no-underline shadow-sm transition-colors',
    compact ? 'h-9 px-2.5 text-[11px]' : 'min-h-10 px-3 py-2 text-[13px]',
    pathname === '/tracker'
      ? 'bg-emerald-800 ring-2 ring-emerald-300/80'
      : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700',
  ].join(' ');
}

export function TrackerNavPill({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const forceCompact = compact;
  return (
    <Link href="/tracker" className={trackerPillClass(pathname, forceCompact)} prefetch={true}>
      {forceCompact ? (
        '📊 Tracker'
      ) : (
        <>
          <span className="lg:hidden">📊 Tracker</span>
          <span className="hidden lg:inline">📊 My 90-Day Tracker</span>
        </>
      )}
    </Link>
  );
}

function DietPlanHeaderLink() {
  const pathname = usePathname();
  const active = pathname === '/diet' || pathname.startsWith('/diet/');
  return (
    <Link
      href="/diet"
      prefetch={true}
      className={[
        'hidden lg:inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-3 py-1.5 text-[13px] font-semibold no-underline transition-colors',
        active
          ? 'border-teal-600 bg-teal-50 text-teal-900'
          : 'border-teal-300/90 bg-white text-teal-800 hover:border-teal-500 hover:bg-teal-50/80',
      ].join(' ')}
    >
      🥗 Diet Plan
    </Link>
  );
}

/** Main bar actions: Diet Plan (lg+) + tracker pill only — no other inline links. */
export default function MainHeaderLinks() {
  return (
    <div
      className="ml-auto hidden shrink-0 items-center gap-1.5 md:flex"
      role="navigation"
      aria-label="Primary header actions"
    >
      <DietPlanHeaderLink />
      <TrackerNavPill compact={false} />
    </div>
  );
}