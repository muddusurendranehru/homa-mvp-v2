'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usesPatientCareAppShell } from '@/lib/patient-care-routes';

type UtilityLink = { href: string; label: string; icon: string; urgent?: boolean };

const UTILITY_LINKS: UtilityLink[] = [
  { href: '/labs', label: 'Labs', icon: '🧪' },
  { href: '/pharmacy', label: 'Pharmacy', icon: '💊' },
  { href: '/diet', label: 'Diet Plan', icon: '🥗' },
  { href: '/organic', label: 'Organic', icon: '🌿' },
  { href: '/lifestyle', label: 'Lifestyle', icon: '🏃' },
  { href: '/emergency', label: 'Emergency', icon: '🚨', urgent: true },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
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
      <div className="mx-auto flex h-10 max-w-[1080px] items-center px-3 sm:px-4 md:justify-center">
        <div className="flex w-full flex-nowrap items-center gap-1.5 overflow-x-auto [scrollbar-width:none] md:w-auto md:justify-center md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {UTILITY_LINKS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={[
                  'inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-[12px] font-semibold no-underline transition-colors',
                  item.urgent
                    ? active
                      ? 'border-red-500 bg-red-100 text-red-900'
                      : 'border-red-200/90 bg-white/80 text-red-800 hover:bg-red-50'
                    : active
                      ? 'border-teal-600 bg-teal-100 text-teal-900'
                      : 'border-teal-200/80 bg-white/70 text-teal-900 hover:bg-teal-50/90',
                ].join(' ')}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}