'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = { href: string; label: string; alertDot?: boolean };

const patientCareLinks: NavItem[] = [
  { href: '/labs', label: 'Labs' },
  { href: '/pharmacy', label: 'Pharmacy' },
  { href: '/tracker', label: 'Tracker' },
  { href: '/emergency', label: 'Emergency', alertDot: true },
];

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
      className="ml-auto flex min-w-0 max-w-[calc(100%-11rem)] items-center justify-end gap-0.5 overflow-x-auto text-sm font-medium [scrollbar-width:none] sm:max-w-none"
      role="navigation"
      aria-label="Patient resources and site sections"
    >
      <div className="flex shrink-0 items-center gap-0.5">
        {patientCareLinks.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} />
        ))}
      </div>
      <div className="hidden xl:flex items-center gap-0.5 shrink-0">
        {secondaryLinks.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} />
        ))}
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
