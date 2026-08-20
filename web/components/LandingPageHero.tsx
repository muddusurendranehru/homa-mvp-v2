'use client';

import Link from 'next/link';

/**
 * “Same old portfolio” homepage stack: orange → teal CTA band, then violet brand band.
 * Matches the classic HOMA / Miracle Methods marketing layout (mobile-first).
 */
export default function LandingPageHero() {
  return (
    <>
      <section className="bg-gradient-to-r from-orange-400 via-orange-500 to-teal-600 px-4 py-12 md:py-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 max-w-5xl mx-auto leading-tight mb-4">
          Struggling with belly fat or fatigue? USE OUR METABOLIC CALCULATORS FIRST IN
          THE WORLD FREE ONLINE
        </h2>
        <p className="text-base md:text-lg font-semibold text-slate-800 mb-8 max-w-3xl mx-auto">
          🎉 New Year & Pongal Special: Free Metabolic Risk Check – No Cost, No Signup
        </p>
        <Link
          href="/tools?utm_source=homepage_hero&utm_medium=cta&utm_campaign=metabolic_calculators"
          className="inline-block bg-white text-red-600 px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-base md:text-lg shadow-lg hover:bg-gray-100 transition-colors"
        >
          Free Metabolic Heart Diabetes Risk Check – No Cost, No Signup →
        </Link>
      </section>

      <section className="bg-violet-600 px-4 py-12 md:py-16 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-extrabold text-amber-100 mb-3">
          Dr. Muddu Surendra Nehru MD
        </h2>
        <h3 className="text-2xl md:text-4xl font-extrabold text-yellow-300 mb-8">
          Miracle Methods Gachibowli
        </h3>
        <p className="text-lg md:text-xl font-semibold text-white/95 mb-2 max-w-2xl mx-auto">
          Best Metabolic Doctor in Hyderabad | Metabolic Reversal in 90 Days
        </p>
        <p className="text-sm md:text-base text-violet-100 mb-8 max-w-2xl mx-auto">
          90-Day Program | Diabetes Reversal | Obesity Gone | Heart Risk Zero — Gachibowli,
          Ameerpet, Bachupally & Patancheru
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc4cw6zfm3ZDC7x1aCc7nGFNMRqpd14eogHWa91gj6jRFPXXw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-violet-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 shadow-md"
          >
            📝 Book Your Free Assessment
          </a>
          <a
            href="https://wa.me/919963721999?text=Hi%20Dr.%20Nehru%2C%20I%20want%20to%20start%20my%20free%20metabolic%20risk%20assessment."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 shadow-md"
          >
            💬 Chat on WhatsApp
          </a>
          <Link
            href="/portfolio.html"
            className="inline-block border-2 border-white/90 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10"
          >
            Full portfolio (static)
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs md:text-sm text-violet-100">
          <span className="bg-white/15 px-4 py-2 rounded-full font-semibold">
            🌟 Appreciated by Megastar Chiranjeevi
          </span>
          <span className="bg-white/15 px-4 py-2 rounded-full">⭐ ISB • IIIT • IKEA Gachibowli</span>
          <span className="bg-white/15 px-4 py-2 rounded-full">Professor of Medicine • 32+ Years</span>
        </div>
      </section>
    </>
  );
}
