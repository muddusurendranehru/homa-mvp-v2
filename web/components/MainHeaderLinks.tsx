'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links: { href: string; label: string; alertDot?: boolean }[] = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/tools', label: 'Free Tools' },
  { href: '/labs', label: 'Labs' },
  { href: '/pharmacy', label: 'Pharmacy' },
  { href: '/emergency', label: 'Emergency', alertDot: true },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/press', label: 'Press' },
  { href: '/conferences', label: 'Conferences' },
];

function linkClass(active: boolean) {
  return active
    ? 'rounded-lg px-2.5 py-2 bg-teal-50 text-[#0D9488] font-semibold'
    : 'rounded-lg px-2.5 py-2 hover:bg-slate-100 hover:text-slate-900';
}

export default function MainHeaderLinks() {
  const pathname = usePathname();

  return (
    <div className="ml-auto hidden items-center gap-0.5 text-sm font-medium text-slate-600 lg:flex">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link key={link.href} href={link.href} className={linkClass(active)}>
            <span className="inline-flex items-center gap-1.5">
              {link.label}
              {link.alertDot && (
                <span
                  className="h-2 w-2 rounded-full bg-red-500 shrink-0"
                  aria-label="Urgent resource"
                  title="Urgent first-aid resource"
                />
              )}
            </span>
          </Link>
        );
      })}
      <a
        href="https://feature-step-1-structure-97dp.onrender.com"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg px-2.5 py-2 hover:bg-slate-100 hover:text-slate-900"
      >
        Partners
      </a>
      <a
        href="https://wa.me/919963721999"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg px-2.5 py-2 hover:bg-slate-100 hover:text-slate-900"
      >
        Join
      </a>
    </div>
  );
}
