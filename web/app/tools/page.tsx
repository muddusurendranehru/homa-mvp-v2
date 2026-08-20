import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Metabolic Calculators – HOMA-IR, TyG, WHtR | Dr. Muddu Surendra Nehru, MD",
  description: "Calculate your insulin resistance, belly fat risk, and metabolic health with free tools. No signup. Developed by Dr. Muddu, Hyderabad.",
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero */}
      <header className="bg-gradient-to-r from-purple-50 to-blue-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Metabolic Health Calculators
          </h1>
          <p className="text-lg text-gray-600">
            Use our free tools to assess your metabolic health risk.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">

          {/* HOMA-IR Calculator */}
          <section className="mb-12 p-6 border rounded-lg bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">HOMA-IR Calculator</h2>
            <p className="text-gray-700 mb-4">
              Enter your fasting glucose and insulin levels to calculate your insulin resistance.
            </p>
            <Link 
              href="/tools/homa-ir-calculator"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Calculate HOMA-IR
            </Link>
            <p className="mt-4 text-center">
              <Link href="/conditions/diabetes" className="text-blue-600 hover:underline">
                Reverse insulin resistance naturally in Hyderabad →
              </Link>
            </p>
          </section>

          {/* TyG Index */}
          <section className="mb-12 p-6 border rounded-lg bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Triglyceride-Glucose Index (TyG)</h2>
            <p className="text-gray-700 mb-4">
              Enter your triglycerides and fasting glucose to assess your metabolic risk.
            </p>
            <Link 
              href="/tools/tyg-index-calculator"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Calculate TyG Index
            </Link>
          </section>

          {/* Waist Circumference */}
          <section className="mb-12 p-6 border rounded-lg bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Waist Circumference Assessment</h2>
            <p className="text-gray-700 mb-4">
              Measure your waist circumference to assess central obesity risk.
            </p>
            <Link 
              href="/tools/waist-circumference"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Assess Waist Risk
            </Link>
          </section>

          {/* WHR */}
          <section className="mb-12 p-6 border rounded-lg bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Waist-to-Hip Ratio (WHR)</h2>
            <p className="text-gray-700 mb-4">
              Calculate your waist-to-hip ratio to assess body fat distribution and metabolic risk.
            </p>
            <Link 
              href="/tools/whr-calculator"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Calculate WHR
            </Link>
          </section>

          {/* WHtR */}
          <section className="mb-12 p-6 border rounded-lg bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Waist-to-Height Ratio (WHtR)</h2>
            <p className="text-gray-700 mb-4">
              The most accurate predictor of belly fat risk — better than BMI. Calculate your waist-to-height ratio.
            </p>
            <Link 
              href="/tools/whtr-calculator"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Calculate WHtR
            </Link>
          </section>

          {/* Final CTA */}
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Ready for Full Metabolic Remission?
            </h2>
            <p className="mb-4">
              Get your personalized 90-day protocol with daily coaching, lab monitoring, and WhatsApp support.
            </p>
            <a 
              href="https://wa.me/919963721999" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg"
            >
              Start Your Free Assessment
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </footer>
    </div>
  );
}
