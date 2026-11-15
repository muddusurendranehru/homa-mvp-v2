'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usesPatientCareAppShell } from '@/lib/patient-care-routes';

type UtilityLink = { href: string; label: string; icon: string; urgent?: boolean };

const COMMUNITIES_HREF = '/communities';

const UTILITY_LINKS: UtilityLink[] = [
  { href: '/labs', label: 'Labs', icon: '🧪' },
  { href: '/pharmacy', label: 'Pharmacy', icon: '💊' },
  { href: '/diet', label: 'Diet Plan', icon: '🥗' },
  { href: '/organic', label: 'Organic', icon: '🌿' },
  { href: '/lifestyle', label: 'Lifestyle', icon: '🏃' },
  { href: COMMUNITIES_HREF, label: 'Communities', icon: '🤝' },
  { href: '/emergency', label: 'Emergency', icon: '🚨', urgent: true },
];

const PILL_BASE =
  'inline-flex min-h-[36px] shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-3 py-1.5 text-[12px] font-semibold no-underline transition-colors';

function isActive(pathname: string, href: string) {
  if (href.startsWith('/#')) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function pillClass(item: UtilityLink, active: boolean) {
  if (item.urgent) {
    return active
      ? 'border-red-500 bg-red-100 text-red-900'
      : 'border-slate-200 bg-white text-red-800 hover:bg-red-50';
  }
  return active
    ? 'border-teal-600 bg-teal-100 text-teal-900'
    : 'border-slate-200 bg-white text-teal-900 hover:bg-teal-50/90';
}

export default function HeaderUtilityBar() {
  const pathname = usePathname();
  if (pathname === '/ddd' || usesPatientCareAppShell(pathname)) {
    return null;
  }

  return (
    <nav
      className="border-b border-teal-200/60 bg-gradient-to-r from-teal-50/95 via-emerald-50/90 to-cyan-50/95 backdrop-blur-sm"
      aria-label="Quick patient resources"
    >
      <div className="mx-auto flex min-h-10 max-w-[1080px] items-stretch px-3 sm:px-4 md:items-center">
        {/* md+: label fixed — does not scroll with pills */}
        <div className="hidden shrink-0 items-center gap-2 pr-3 md:flex">
          <span className="whitespace-nowrap text-[12px] font-extrabold tracking-tight text-teal-950">
            Your Complete Health Ecosystem:
          </span>
          <span className="h-6 w-px shrink-0 bg-teal-300/90" aria-hidden="true" />
        </div>

        <div className="utility-bar-scroll relative min-w-0 flex-1">
          <div className="flex h-full flex-nowrap items-center gap-1.5 overflow-x-auto whitespace-nowrap py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* sm–md: short label scrolls with pills; hidden below sm */}
            <span className="hidden shrink-0 whitespace-nowrap text-[12px] font-extrabold text-teal-950 sm:inline md:hidden">
              🌱 Ecosystem
            </span>
            <span
              className="hidden h-6 w-px shrink-0 bg-teal-300/90 sm:inline md:hidden"
              aria-hidden="true"
            />

            {UTILITY_LINKS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`${PILL_BASE} ${pillClass(item, active)}`}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-emerald-50 via-emerald-50/80 to-transparent md:w-10"
            aria-hidden="true"
          />
        </div>
      </div>
    </nav>
  );
}