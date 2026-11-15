'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = { href: string; label: string; alertDot?: boolean };

const patientCareLinks: NavItem[] = [
  { href: '/labs', label: 'Labs' },
  { href: '/pharmacy', label: 'Pharmacy' },
  { href: '/organic', label: 'Organic' },
  { href: '/lifestyle', label: 'Lifestyle' },
  { href: '/emergency', label: 'Emergency', alertDot: true },
];

const WA_INVESTORS =
  'https://wa.me/919963721999?text=INDUSTRY%20%2F%20INVESTOR%20ENQUIRY%20FOR%20HOMA';

type SecondaryNavItem = NavItem & { wideOnly?: boolean };

const secondaryLinks: SecondaryNavItem[] = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/tools', label: 'Free Tools' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/press', label: 'Press' },
  { href: '/conferences', label: 'Conferences', wideOnly: true },
];

function linkClass(active: boolean) {
  return [
    'relative z-[1002] shrink-0 rounded-lg px-2.5 py-2 no-underline transition-colors',
    active
      ? 'bg-teal-50 text-[#0D9488] font-semibold'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  ].join(' ');
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = pathname === item.href;
  return (
    <Link href={item.href} className={linkClass(active)} prefetch={true}>
      <span className="inline-flex items-center gap-1.5 pointer-events-none">
        {item.label}
        {item.alertDot && (
          <span
            className="h-2 w-2 rounded-full bg-red-500 shrink-0"
            aria-label="Urgent resource"
            title="Urgent first-aid resource"
          />
        )}
      </span>
    </Link>
  );
}

export default function MainHeaderLinks() {
  const pathname = usePathname();

  return (
    <div
      className="ml-auto flex min-w-0 max-w-[calc(100%-12rem)] flex-1 items-center justify-end gap-0.5 overflow-x-auto overflow-y-hidden text-sm font-medium [scrollbar-width:none] sm:max-w-none lg:max-w-[calc(100%-14rem)]"
      role="navigation"
      aria-label="Patient resources and site sections"
    >
      <div className="flex min-w-0 shrink items-center gap-0.5">
        {patientCareLinks.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} />
        ))}
        <NavLink
          item={{ href: '/diet-plan', label: 'Diet Plan' }}
          pathname={pathname}
        />
      </div>
      <div className="hidden xl:flex min-w-0 items-center gap-0.5 shrink">
        {secondaryLinks.map((item) => (
          <span key={item.href} className={item.wideOnly ? 'hidden 2xl:contents' : 'contents'}>
            <NavLink item={item} pathname={pathname} />
          </span>
        ))}
        <Link
          href="/tracker"
          className={[
            'relative z-[1002] shrink-0 rounded-full px-3 py-2 text-[13px] font-bold text-white no-underline shadow-sm transition-colors',
            pathname === '/tracker'
              ? 'bg-emerald-800 ring-2 ring-emerald-300/80'
              : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700',
          ].join(' ')}
        >
          📊 My 90-Day Tracker
        </Link>
        <a
          href={WA_INVESTORS}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-[1002] shrink-0 rounded-lg px-2.5 py-2 text-slate-600 no-underline hover:bg-slate-100 hover:text-slate-900"
        >
          Investors
        </a>
      </div>
      <div className="hidden xl:flex items-center gap-0.5 shrink-0">
        <a
          href="https://feature-step-1-structure-97dp.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-[1002] shrink-0 rounded-lg px-2.5 py-2 text-slate-600 no-underline hover:bg-slate-100 hover:text-slate-900"
        >
          Partners
        </a>
        <a
          href="https://wa.me/919963721999"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-[1002] shrink-0 rounded-lg px-2.5 py-2 text-slate-600 no-underline hover:bg-slate-100 hover:text-slate-900"
        >
          Join
        </a>
      </div>
    </div>
  );
}
