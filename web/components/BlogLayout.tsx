'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import HeaderAuth from '@/components/HeaderAuth'

interface BlogLayoutProps {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  useEffect(() => {
    // Scroll to top when blog page loads
    window.scrollTo(0, 0)
    
    // Hide root layout elements for blog pages using CSS
    const styleId = 'blog-layout-override'
    let style = document.getElementById(styleId)
    
    if (!style) {
      style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        /* Hide root layout header only — do NOT hide <nav> globally (breaks MobileNav drawer) */
        body > div > header:not([data-blog-header]),
        header:not([data-blog-header]) {
          display: none !important;
        }
        /* Hide root layout footer */
        body > div > footer:not([data-blog-footer]),
        footer:not([data-blog-footer]) {
          display: none !important;
        }
        /* Reset body for blog pages */
        body {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden !important;
        }
        /* Ensure blog layout container covers everything */
        [data-blog-layout] {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          z-index: 99999 !important;
          background: linear-gradient(to bottom right, #f0fdf4, #ffffff, #f0fdfa) !important;
        }
        /* Make main transparent so blog layout shows through */
        main {
          background: transparent !important;
        }
      `
      document.head.appendChild(style)
    }
    
    // Also directly hide elements via DOM manipulation as backup
    const hideRootElements = () => {
      const elementsToHide = [
        ...document.querySelectorAll('header:not([data-blog-header])'),
        ...document.querySelectorAll('footer:not([data-blog-footer])'),
      ]
      elementsToHide.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none'
          el.style.visibility = 'hidden'
        }
      })
    }
    
    // Hide immediately and after a short delay for React hydration
    hideRootElements()
    const timeout = setTimeout(hideRootElements, 100)
    
    return () => {
      const styleToRemove = document.getElementById(styleId)
      if (styleToRemove) {
        document.head.removeChild(styleToRemove)
      }
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div data-blog-layout className="fixed inset-0 overflow-y-auto bg-gradient-to-br from-green-50 via-white to-teal-50 z-[9999]">
      {/* Blog Header */}
      <header data-blog-header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-green-700 hover:text-green-800 transition">
              🏥 HOMA Clinic
            </Link>
            <nav data-blog-nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 text-sm sm:text-base">
              <Link href="/blog" className="text-gray-600 hover:text-green-600 transition font-medium">
                Blog
              </Link>
              <Link href="/packages" className="text-gray-600 hover:text-green-600 transition font-medium">
                Packages
              </Link>
              <Link href="/gallery" className="text-gray-600 hover:text-green-600 transition font-medium">
                Gallery
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-green-600 transition font-medium">
                Dashboard
              </Link>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <HeaderAuth />
            </nav>
          </div>
        </div>
      </header>

      {/* Blog Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 min-h-full">
        {children}
      </div>

      {/* Blog Footer */}
      <footer data-blog-footer className="bg-gray-800 text-white py-8 px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">
            © {new Date().getFullYear()} HOMA Clinics Private Limited. All Rights Reserved.
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <Link href="/disclaimer" className="text-gray-400 hover:text-white transition">
              Disclaimer
            </Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white transition">
              Pricing
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white transition">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

