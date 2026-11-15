'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = { href: string; label: string; alertDot?: boolean };

const patientCareLinks: NavItem[] = [
  { href: '/labs', label: 'Labs' },
  { href: '/pharmacy', label: 'Pharmacy' },
  { href: '/diet', label: 'Diet Plan' },
  { href: '/organic', label: 'Organic' },
  { href: '/lifestyle', label: 'Lifestyle' },
  { href: '/emergency', label: 'Emergency', alertDot: true },
];

const patientCareCompact: NavItem[] = [
  { href: '/labs', label: 'Labs' },
  { href: '/pharmacy', label: 'Pharmacy' },
  { href: '/diet', label: 'Diet Plan' },
];

const WA_INVESTORS =
  'https://wa.me/919963721999?text=INDUSTRY%20%2F%20INVESTOR%20ENQUIRY%20FOR%20HOMA';

const secondaryLinks: NavItem[] = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/tools', label: 'Free Tools' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/press', label: 'Press' },
  { href: '/conferences', label: 'Conferences' },
];

function linkClass(active: boolean) {
  return [
    'shrink-0 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium no-underline transition-colors',
    active
      ? 'bg-teal-50 text-[#0D9488] font-semibold'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  ].join(' ');
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = pathname === item.href;
  return (
    <Link href={item.href} className={linkClass(active)} prefetch={true}>
      <span className="inline-flex items-center gap-1.5">
        {item.label}
        {item.alertDot && (
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-red-500"
            aria-label="Urgent resource"
            title="Urgent first-aid resource"
          />
        )}
      </span>
    </Link>
  );
}

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
  return (
    <Link href="/tracker" className={trackerPillClass(pathname, compact)} prefetch={true}>
      {compact ? (
        '📊 Tracker'
      ) : (
        <>
          <span className="xl:hidden">📊 Tracker</span>
          <span className="hidden xl:inline">📊 My 90-Day Tracker</span>
        </>
      )}
    </Link>
  );
}

export default function MainHeaderLinks() {
  const pathname = usePathname();

  return (
    <div
      className="ml-auto hidden min-w-0 flex-1 items-center justify-end gap-1 overflow-hidden md:flex"
      role="navigation"
      aria-label="Patient resources and site sections"
    >
      {/* xl–2xl: Labs, Pharmacy, Diet Plan; full patient row at 2xl+ */}
      <div className="hidden shrink-0 items-center gap-px overflow-hidden xl:flex 2xl:hidden">
        {patientCareCompact.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} />
        ))}
      </div>
      <div className="hidden shrink-0 items-center gap-0.5 overflow-hidden 2xl:flex">
        {patientCareLinks.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} />
        ))}
      </div>

      {/* Secondary + Investors / Partners / Join: room at 2xl+ only */}
      <div className="hidden shrink-0 items-center gap-0.5 overflow-hidden 2xl:flex">
        {secondaryLinks.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} />
        ))}
        <a
          href={WA_INVESTORS}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 no-underline hover:bg-slate-100 hover:text-slate-900"
        >
          Investors
        </a>
        <a
          href="https://feature-step-1-structure-97dp.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 no-underline hover:bg-slate-100 hover:text-slate-900"
        >
          Partners
        </a>
        <a
          href="https://wa.me/919963721999"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 no-underline hover:bg-slate-100 hover:text-slate-900"
        >
          Join
        </a>
      </div>

      <TrackerNavPill />
    </div>
  );
}