'use client';

import { usePathname } from 'next/navigation';
import { usesPatientCareAppShell } from '@/lib/patient-care-routes';

export const BOOK_CONSULT_WA =
  'https://wa.me/919963721999?text=I%20WANT%20TO%20BOOK%20A%20CONSULTATION';

export function BookConsultationHeaderLink() {
  return (
    <a
      href={BOOK_CONSULT_WA}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-[1002] hidden lg:inline-flex shrink-0 items-center justify-center min-h-10 rounded-xl bg-[#f97316] px-3.5 py-2 text-sm font-bold text-white no-underline shadow-md hover:bg-orange-600 transition-colors"
    >
      Book Consultation
    </a>
  );
}

export function BookConsultationMobileBar() {
  const pathname = usePathname();
  if (pathname === '/ddd' || usesPatientCareAppShell(pathname)) {
    return null;
  }

  return (
    <div
      className="bc-mobile-wrap md:hidden"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9990,
        padding: '10px 14px calc(10px + env(safe-area-inset-bottom))',
        background: 'linear-gradient(180deg, transparent, rgba(15, 23, 42, 0.92) 28%)',
        pointerEvents: 'none',
      }}
    >
      <a
        href={BOOK_CONSULT_WA}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full min-h-[48px] items-center justify-center rounded-[14px] bg-[#f97316] text-base font-extrabold text-white no-underline shadow-lg active:scale-[0.98]"
        style={{ pointerEvents: 'auto', boxShadow: '0 8px 24px rgba(249, 115, 22, 0.45)' }}
      >
        Book Consultation
      </a>
    </div>
  );
}