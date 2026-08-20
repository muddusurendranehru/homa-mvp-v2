'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, SignOutButton } from '@clerk/nextjs';

const navLinks = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/ddd', label: 'D·D·D Campaign', icon: '🩸' },
  { href: '/products', label: 'Apps & tools', icon: '📱' },
  { href: '/packages', label: 'Packages', icon: '💰' },
  { href: '/portfolio', label: 'Portfolio', icon: '👤' },
  { href: '/pricing', label: 'Pricing', icon: '💳' },
  { href: '/zoom', label: 'Zoom Sundays', icon: '📹' },
  { href: '/gallery', label: 'Gallery', icon: '📸' },
  { href: '/blog', label: 'Blog', icon: '📝' },
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/nutri-bot', label: 'NutriBot AI', icon: '🤖' },
  { href: '/assessment', label: 'Assessment', icon: '📋' },
  { href: '/remission-program', label: '90-Day Program', icon: '🎯' },
  { href: '/testimonials', label: 'Success Stories', icon: '🏆' },
  { href: '/enroll', label: 'Enroll', icon: '✨' },
];

const appLinks = [
  { name: 'Drug Trials Tracker', url: 'https://drug-trials-frontend.onrender.com', icon: '💊' },
  { name: 'OCR Report Analyzer', url: 'https://ai-image-ocr-1.onrender.com', icon: '📄' },
  { name: 'PCOS HOMA Score', url: 'https://pcos-homaiq-score-frontend.onrender.com', icon: '🎯' },
  { name: '90-Day Metrics', url: 'https://healthmetrics-render1.onrender.com', icon: '📊' },
  { name: 'Nutrition Bot', url: 'https://homa-foods-nutrition.onrender.com', icon: '🍎' },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn, user, isLoaded } = useUser();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleApps = () => setAppsOpen(!appsOpen);

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

  /* Conversion landing: no floating menu clutter */
  if (pathname === '/ddd') {
    return null;
  }

  return (
    <>
      {/* Hamburger Button - orange so it doesn't mix with green; safe-area for Android/notched screens */}
      <button
        onClick={toggleMenu}
        className="fixed z-[100050] p-3 rounded-lg shadow-lg transition-all text-white border-2"
        style={{
          top: 'calc(2.5rem + env(safe-area-inset-top, 0px))',
          right: 'max(1rem, env(safe-area-inset-right, 1rem))',
          backgroundColor: '#ea580c',
          borderColor: '#f97316',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#c2410c';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ea580c';
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

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[100040]"
          onClick={closeMenu}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 z-[100045] transform transition-transform duration-300 ease-in-out overflow-y-auto shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header - Enhanced */}
        <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 p-6 pt-8 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
              <span className="text-2xl">🩺</span>
            </div>
            <div>
              <h2 className="text-white font-extrabold text-xl tracking-tight">HOMA Clinic</h2>
              <p className="text-cyan-50 text-xs font-medium mt-0.5">Dr. Muddu's Metabolic Care</p>
            </div>
          </div>
        </div>

        {/* Navigation Links - Beautiful Cards */}
        <nav className="p-4 pb-40">
          <ul className="space-y-3">
            {/* Auth: Sign In / Create Account when signed out; Hello + Sign Out when signed in */}
            {isLoaded && (
              <li className="pb-3 border-b border-white/10">
                {isSignedIn ? (
                  <div className="px-5 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <p style={{ color: 'white' }}>Hello {user?.firstName}</p>
                    <SignOutButton>
                      <button type="button" onClick={closeMenu} style={{ color: 'red' }}>
                        Sign Out
                      </button>
                    </SignOutButton>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/auth"
                      onClick={closeMenu}
                      className="block w-full text-center py-3 px-4 rounded-xl font-semibold bg-amber-500 hover:bg-amber-600 text-white border-2 border-amber-400/80 transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth"
                      onClick={closeMenu}
                      className="block w-full text-center py-3 px-4 rounded-xl font-semibold bg-white/20 hover:bg-white/30 text-white border border-white/40 transition-all"
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
                  onClick={closeMenu}
                  className={`group flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg ${
                    pathname === link.href
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-teal-500/50 shadow-xl'
                      : 'bg-white/5 backdrop-blur-sm text-gray-200 hover:bg-white/10 hover:shadow-lg border border-white/10'
                  }`}
                >
                  <div className={`text-2xl transition-transform group-hover:scale-110 ${pathname === link.href ? 'drop-shadow-lg' : ''}`}>
                    {link.icon}
                  </div>
                  <span className={`font-semibold text-base flex-1 ${pathname === link.href ? 'text-white' : 'text-gray-100'}`}>
                    {link.label}
                  </span>
                  {pathname === link.href && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              </li>
            ))}
            
            {/* Apps Dropdown - Enhanced */}
            <li>
              <button
                onClick={toggleApps}
                className="w-full group flex items-center justify-between gap-4 px-5 py-4 rounded-xl transition-all duration-200 bg-white/5 backdrop-blur-sm text-gray-200 hover:bg-white/10 hover:shadow-lg border border-white/10 transform hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl transition-transform group-hover:scale-110">📱</div>
                  <span className="font-semibold text-base text-gray-100">Apps</span>
                </div>
                <svg
                  className={`w-5 h-5 transition-all duration-300 text-gray-400 group-hover:text-white ${
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
                <ul className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {appLinks.map((app, index) => (
                    <li key={index}>
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="group flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-200 bg-indigo-900/40 backdrop-blur-sm text-gray-300 hover:bg-indigo-700/50 hover:text-white border border-indigo-700/30 hover:border-indigo-500 transform hover:scale-[1.02] shadow-md"
                      >
                        <span className="text-xl transition-transform group-hover:scale-110">{app.icon}</span>
                        <span className="font-medium text-sm flex-1">{app.name}</span>
                        <span className="text-xs text-indigo-400 group-hover:text-white transition-colors">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Quick Actions - Enhanced Bottom Section */}
        <div className="fixed bottom-0 right-0 w-80 p-5 bg-gradient-to-t from-slate-900 via-indigo-900 to-transparent border-t border-indigo-700/50 backdrop-blur-sm">
          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 shadow-xl">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <a
                href="https://wa.me/919963721999"
                target="_blank"
                onClick={closeMenu}
                className="group flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-green-500/30"
              >
                <span className="text-lg">💬</span>
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+919963721999"
                onClick={closeMenu}
                className="group flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-sm font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/30"
              >
                <span className="text-lg">📞</span>
                <span>Call</span>
              </a>
            </div>
            <p className="text-center text-cyan-300 text-sm font-semibold tracking-wide">
              09963721999
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-xs font-medium">DR. MUDDU SURENDRA NEHRU M.D.</p>
            <p className="text-gray-500 text-[10px] mt-1">Professor of Medicine • 30+ Years</p>
          </div>
        </div>
      </div>
    </>
  );
}

