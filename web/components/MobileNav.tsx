'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { usesPatientCareAppShell } from '@/lib/patient-care-routes';

const navLinks: {
  href: string;
  label: string;
  icon: string;
  alertDot?: boolean;
}[] = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/ddd', label: 'D·D·D Campaign', icon: '🩸' },
  { href: '/labs', label: 'Labs', icon: '🧪' },
  { href: '/pharmacy', label: 'Pharmacy', icon: '💊' },
  { href: '/emergency', label: 'Emergency', icon: '🚨', alertDot: true },
  { href: '/products', label: 'Apps & tools', icon: '📱' },
  { href: '/packages', label: 'Packages', icon: '💰' },
  { href: '/portfolio', label: 'Portfolio', icon: '👤' },
  { href: '/pricing', label: 'Pricing', icon: '💳' },
  { href: '/zoom', label: 'Zoom Sundays', icon: '📹' },
  { href: '/gallery', label: 'Gallery', icon: '📸' },
  { href: '/conferences', label: 'Conferences', icon: '🎤' },
  { href: '/blog', label: 'Blog', icon: '📝' },
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/nutri-bot', label: 'NutriBot AI', icon: '🤖' },
  { href: '/assessment', label: 'Assessment', icon: '📋' },
  { href: '/diet-plan', label: 'Diet Plan', icon: '🥗' },
  { href: '/remission-program', label: '90-Day Program', icon: '🎯' },
  { href: '/testimonials', label: 'Success Stories', icon: '🏆' },
  { href: '/enroll', label: 'Enroll', icon: '✨' },
];

const appLinks = [
  { name: 'Drug Trials Tracker', url: 'https://drug-trials-frontend.onrender.com', icon: '💊' },
  { name: 'OCR Report Analyzer', url: 'https://ai-ocr-lab-reports.onrender.com', icon: '📄' },
  { name: 'PCOS HOMA Score', url: 'https://pcos-homaiq-score-frontend.onrender.com', icon: '🎯' },
  { name: '90-Day Metrics', url: 'https://healthmetrics30daymeals.onrender.com', icon: '📊' },
  { name: 'Nutrition Bot', url: 'https://healthmetrics30daymeals.onrender.com', icon: '🍎' },
];

/** Above page floats (WelcomeBot, toasts) and global header; hamburger sits one step higher. */
const MOBILE_MENU_Z = 100041;
const MOBILE_MENU_TOGGLE_Z = 100060;

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { isSignedIn, user, isLoaded } = useUser();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleApps = () => setAppsOpen(!appsOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  /* Focused landings + patient-care pages use their own nav (AppShell) */
  if (pathname === '/ddd' || usesPatientCareAppShell(pathname)) {
    return null;
  }

  const menuPanel = (
    <div
      className={`fixed inset-0 flex h-[100dvh] max-h-[100dvh] flex-col bg-slate-900 transform transition-transform duration-300 ease-in-out shadow-2xl ${
        isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
      }`}
      style={{ zIndex: MOBILE_MENU_Z, backgroundColor: '#0f172a' }}
      aria-hidden={!isOpen}
    >
      {/* Menu Header - Enhanced */}
      <div className="shrink-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 p-6 pb-6 pt-[max(2rem,env(safe-area-inset-top))] shadow-lg">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-xl bg-teal-600/80 p-2">
            <span className="text-2xl">🩺</span>
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-white">HOMA Clinic</h2>
            <p className="mt-0.5 text-xs font-medium text-cyan-50">Dr. Muddu&apos;s Metabolic Care</p>
          </div>
        </div>
      </div>

      {/* Navigation Links — scroll region; opaque rows so bottom CTAs never show through */}
      <nav className="min-h-0 flex-1 overflow-y-auto p-4">
        <ul className="space-y-3">
          {isLoaded && (
            <li className="border-b border-slate-700 pb-3">
              {isSignedIn ? (
                <div className="rounded-xl border border-slate-600 bg-slate-800 px-5 py-3">
                  <p className="text-white">Hello {user?.firstName}</p>
                  <SignOutButton>
                    <button type="button" onClick={closeMenu} className="text-red-400">
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/auth"
                    onClick={closeMenu}
                    className="block w-full rounded-xl border-2 border-amber-400 bg-amber-500 px-4 py-3 text-center font-semibold text-white transition-all hover:bg-amber-600"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth"
                    onClick={closeMenu}
                    className="block w-full rounded-xl border border-slate-500 bg-slate-700 px-4 py-3 text-center font-semibold text-white transition-all hover:bg-slate-600"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </li>
          )}
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                prefetch={true}
                onClick={closeMenu}
                className={`group relative flex transform items-center gap-4 rounded-xl px-5 py-4 shadow-lg transition-all duration-200 hover:scale-[1.02] ${
                  pathname === link.href
                    ? 'border border-teal-400 bg-teal-800 text-white shadow-teal-900/40'
                    : 'border border-slate-600 bg-slate-800 text-gray-100 hover:bg-slate-700'
                }`}
              >
                <div
                  className={`text-2xl transition-transform group-hover:scale-110 ${pathname === link.href ? 'drop-shadow-lg' : ''}`}
                >
                  {link.icon}
                </div>
                <span className="flex-1 text-base font-semibold">{link.label}</span>
                {link.alertDot && (
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" aria-hidden />
                )}
                {pathname === link.href && (
                  <div className="h-2 w-2 animate-pulse rounded-full bg-teal-300" />
                )}
              </Link>
            </li>
          ))}

          <li>
            <button
              type="button"
              onClick={toggleApps}
              className="group flex w-full transform items-center justify-between gap-4 rounded-xl border border-slate-600 bg-slate-800 px-5 py-4 text-gray-100 transition-all duration-200 hover:scale-[1.02] hover:bg-slate-700"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl transition-transform group-hover:scale-110">📱</div>
                <span className="text-base font-semibold">Apps</span>
              </div>
              <svg
                className={`h-5 w-5 text-gray-400 transition-all duration-300 group-hover:text-white ${
                  appsOpen ? 'rotate-180 text-teal-400' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {appsOpen && (
              <ul className="mt-3 space-y-2">
                {appLinks.map((app, index) => (
                  <li key={index}>
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="group flex transform items-center gap-3 rounded-lg border border-indigo-700 bg-indigo-950 px-5 py-3 text-gray-200 shadow-md transition-all duration-200 hover:scale-[1.02] hover:border-indigo-500 hover:bg-indigo-900 hover:text-white"
                    >
                      <span className="text-xl transition-transform group-hover:scale-110">{app.icon}</span>
                      <span className="flex-1 text-sm font-medium">{app.name}</span>
                      <span className="text-xs text-indigo-300 transition-colors group-hover:text-white">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Quick actions — in flex flow (not fixed) so links never stack over these buttons */}
      <div
        className="shrink-0 border-t border-indigo-700/50 bg-slate-900 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
        style={{ backgroundColor: '#0f172a' }}
      >
        <div className="rounded-xl border border-slate-600 bg-slate-800 p-4 shadow-xl">
          <div className="mb-3 grid grid-cols-2 gap-3">
            <a
              href="https://wa.me/919963721999"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="group flex transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-green-500/30 transition-all duration-200 hover:scale-105 hover:from-green-600 hover:to-emerald-600"
            >
              <span className="text-lg">💬</span>
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+919963721999"
              onClick={closeMenu}
              className="group flex transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-cyan-600"
            >
              <span className="text-lg">📞</span>
              <span>Call</span>
            </a>
          </div>
          <p className="text-center text-sm font-semibold tracking-wide text-cyan-300">09963721999</p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs font-medium text-gray-400">DR. MUDDU SURENDRA NEHRU M.D.</p>
          <p className="mt-1 text-[10px] text-gray-500">Professor of Medicine • 30+ Years</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Hamburger Button - orange so it doesn't mix with green; safe-area for Android/notched screens */}
      <button
        onClick={toggleMenu}
        className="fixed flex h-12 w-12 items-center justify-center rounded-[14px] border transition-colors"
        style={{
          zIndex: MOBILE_MENU_TOGGLE_Z,
          /* sits inside the 64px slim navbar (layout.tsx) */
          top: 'calc(8px + env(safe-area-inset-top, 0px))',
          right: 'max(1rem, env(safe-area-inset-right, 1rem))',
          backgroundColor: isOpen ? '#ffffff' : '#0f172a',
          borderColor: isOpen ? '#e2e8f0' : '#0f172a',
          color: isOpen ? '#0f172a' : '#ffffff',
        }}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          // X icon
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger icon
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {mounted ? createPortal(menuPanel, document.body) : null}
    </>
  );
}

