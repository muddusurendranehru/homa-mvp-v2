'use client';

export default function TrustBadges() {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white py-3 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 font-bold">✓</span>
            <span className="font-semibold">32 Yrs Experience</span>
          </div>
          <div className="hidden md:block text-gray-400">|</div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 font-bold">✓</span>
            <span className="font-semibold">35 Lakh Patients</span>
          </div>
          <div className="hidden md:block text-gray-400">|</div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 font-bold">✓</span>
            <span className="font-semibold">5K HOMA Tests #1 India</span>
          </div>
          <div className="hidden md:block text-gray-400">|</div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 font-bold">✓</span>
            <span className="font-semibold">Ethics Guided</span>
          </div>
        </div>
      </div>
    </div>
  );
}

