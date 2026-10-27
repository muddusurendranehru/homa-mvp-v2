'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ShellNavItem = {
  href: string;
  label: string;
  alertDot?: boolean;
};

const shellNav: ShellNavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/labs', label: 'Labs' },
  { href: '/pharmacy', label: 'Pharmacy' },
  { href: '/emergency', label: 'Emergency', alertDot: true },
  { href: '/nutri-bot', label: 'NutriBot' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ShellNavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: ShellNavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = isActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      prefetch={true}
      onClick={onNavigate}
      className={[
        'flex items-center gap-2 border-l-4 py-2.5 pl-4 pr-3 text-sm font-medium transition-colors no-underline',
        active
          ? 'border-teal-600 bg-teal-50 text-teal-700'
          : 'border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900',
      ].join(' ')}
    >
      <span>{item.label}</span>
      {item.alertDot && (
        <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" aria-label="Urgent" title="Urgent" />
      )}
    </Link>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full bg-slate-50 font-sans">
      {/* Desktop sidebar — below global 64px header */}
      <aside
        className="fixed left-0 top-16 z-[900] hidden h-[calc(100vh-4rem)] w-56 flex-col border-r border-slate-200 bg-white lg:flex"
        aria-label="Patient care navigation"
      >
        <div className="border-b border-slate-100 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">HOMA patient care</p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 py-3">
          {shellNav.map((item) => (
            <ShellNavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>
      </aside>

      {/* Mobile menu toggle — top of shell (global header stays above) */}
      <div className="fixed left-0 right-0 top-16 z-[890] flex items-center gap-3 border-b border-slate-200 bg-white px-3 py-2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-800"
          aria-label="Open patient care menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-slate-800">Labs · Pharmacy · Emergency</span>
      </div>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 top-16 z-[895] bg-black/40 lg:hidden"
          aria-label="Close menu overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-[7.25rem] z-[896] flex h-[calc(100vh-7.25rem)] w-64 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-200 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <p className="text-sm font-semibold text-slate-800">Menu</p>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-0.5 py-2">
          {shellNav.map((item) => (
            <ShellNavLink
              key={item.href}
              item={item}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-56">
        <div className="h-[3.25rem] shrink-0 lg:hidden" aria-hidden />
        <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">{children}</div>
      </div>
    </div>
  );
}
