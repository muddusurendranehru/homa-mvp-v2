import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "HOMA Directory | Recommended Labs, Pharmacies & Wearables",
  description: "Curated list of diagnostic labs for HOMA-IR testing, trusted online pharmacies, and health monitoring wearables recommended by HOMA Healthcare Center.",
};

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-white font-sans py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          HOMA Health Directory
        </h1>
        <p className="text-gray-600 mb-8">
          Carefully selected partners for diagnostics, medications, and monitoring. 
          <span className="text-sm text-gray-500 block mt-1">
            (Disclosure: HOMA may earn a commission from some links. See our <Link href="/affiliate-disclosure" className="text-green-600 underline">Affiliate Disclosure</Link>.)
          </span>
        </p>

        {/* Labs Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-green-700 mb-4 border-b pb-2">Diagnostic Labs (HOMA-IR Testing)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">Partner Lab 1 (Placeholder)</h3>
              <p className="text-gray-600 text-sm mb-2">Fasting Insulin + Glucose for HOMA-IR calculation.</p>
              <a href="#" className="text-green-600 font-medium hover:underline">Book Test &rarr;</a>
            </div>
            {/* Add more labs as you confirm partners */}
          </div>
        </section>

        {/* Pharmacies Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-green-700 mb-4 border-b pb-2">Pharmacies</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">Tata 1mg</h3>
              <p className="text-gray-600 text-sm mb-2">Order diabetes and metabolic health medications online.</p>
              <a href="https://www.1mg.com" target="_blank" rel="noopener noreferrer" className="text-green-600 font-medium hover:underline">Visit Tata 1mg &rarr;</a>
            </div>
          </div>
        </section>

        {/* Wearables Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-green-700 mb-4 border-b pb-2">Wearables & Monitoring</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">Continuous Glucose Monitors (CGM)</h3>
              <p className="text-gray-600 text-sm mb-2">Track glucose patterns in real-time.</p>
              <a href="#" className="text-green-600 font-medium hover:underline">View on Amazon &rarr;</a>
            </div>
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">Smart Scales & Body Composition</h3>
              <p className="text-gray-600 text-sm mb-2">Monitor weight, visceral fat, and muscle mass.</p>
              <a href="#" className="text-green-600 font-medium hover:underline">View on Flipkart &rarr;</a>
            </div>
          </div>
        </section>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link href="/" className="text-green-600 hover:underline">&larr; Back to Home</Link>
        </div>
      </div>
    </div>
  );
}