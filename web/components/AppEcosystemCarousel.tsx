'use client';

import { useRef, useEffect, useState } from 'react';

interface App {
  name: string;
  description: string;
  url: string;
  icon: string;
}

const apps: App[] = [
  {
    name: 'Drug Trials Tracker',
    description: 'Track and manage clinical drug trials',
    url: 'https://drug-trials-frontend.onrender.com',
    icon: '💊',
  },
  {
    name: 'OCR Report Analyzer',
    description: 'AI-powered medical report analysis',
    url: 'https://ai-image-ocr-1.onrender.com',
    icon: '📄',
  },
  {
    name: 'PCOS HOMA Score',
    description: 'Calculate PCOS HOMA-IR score',
    url: 'https://pcos-homaiq-score-frontend.onrender.com',
    icon: '🎯',
  },
  {
    name: '90-Day Metrics',
    description: 'Track your 90-day health journey',
    url: 'https://healthmetrics-render1.onrender.com',
    icon: '📊',
  },
  {
    name: 'Nutrition Bot',
    description: 'AI nutrition guidance powered by HOMA Foods',
    url: 'https://homa-foods-nutrition.onrender.com',
    icon: '🍎',
  },
];

export default function AppEcosystemCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScrollability = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    };

    checkScrollability();
    container.addEventListener('scroll', checkScrollability);
    window.addEventListener('resize', checkScrollability);

    return () => {
      container.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-full py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
          🩺 Dr Muddu's Health Apps
        </h2>
        
        {/* Desktop Scroll Buttons */}
        <div className="hidden md:block">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 md:pb-0 snap-x snap-mandatory scroll-smooth"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {apps.map((app, index) => (
            <a
              key={index}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[280px] md:w-[300px] snap-start bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-white/20"
            >
              <div className="flex flex-col h-full">
                <div className="text-4xl mb-3">{app.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{app.name}</h3>
                <p className="text-sm text-gray-600 flex-grow">{app.description}</p>
                <div className="mt-3 text-xs text-teal-600 font-semibold">
                  Visit App →
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="md:hidden text-center mt-2">
          <p className="text-xs text-white/70">← Swipe to explore →</p>
        </div>
      </div>
    </div>
  );
}

