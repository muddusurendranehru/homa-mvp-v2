'use client';

import Link from 'next/link';

export default function HOMAWebApps() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-10 md:py-16 px-5 md:px-10 my-10 md:my-16 rounded-2xl border border-slate-200">
      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 md:mb-8 text-center">
        🩺 HOMA Web Apps
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
        {/* Metabolic Calculator */}
        <Link
          href="/"
          className="block p-6 bg-white rounded-xl no-underline shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
        >
          <h4 className="text-blue-600 text-lg md:text-xl font-bold m-0 mb-3">
            🔬 Metabolic Calculator
          </h4>
          <p className="text-slate-600 m-0 text-sm md:text-base">
            Free 15Q Risk Assessment → Smart CTA
          </p>
        </Link>

        {/* HOMA Dashboard */}
        <Link
          href="/dashboard"
          className="block p-6 bg-white rounded-xl no-underline shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
        >
          <h4 className="text-green-600 text-lg md:text-xl font-bold m-0 mb-3">
            📊 HOMA Dashboard
          </h4>
          <p className="text-slate-600 m-0 text-sm md:text-base">
            90 Day Remission Tracking
          </p>
        </Link>

        {/* Nutrition Tracker */}
        <Link
          href="/diet"
          className="block p-6 bg-white rounded-xl no-underline shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
        >
          <h4 className="text-amber-600 text-lg md:text-xl font-bold m-0 mb-3">
            🍽️ Nutrition Tracker
          </h4>
          <p className="text-slate-600 m-0 text-sm md:text-base">
            Personalized Meal Plans
          </p>
        </Link>
      </div>
    </div>
  );
}

