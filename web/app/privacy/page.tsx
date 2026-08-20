import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy – HOMA Clinic MVP | Dr. Muddu Surendra Nehru MD",
  description: "Privacy Policy for HOMA Clinic MVP. Learn how we handle your personal health information, data protection, and your rights under India's Digital Personal Data Protection Act (DPDPA), 2023.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-green-50 to-teal-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Privacy Policy for HOMA Clinic MVP
          </h1>
          <p className="text-lg text-gray-600">
            Your Privacy & Data Protection Rights
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              This Privacy Policy explains how Dr. Muddu Surendra Nehru and HOMA Clinic ("we", "us") handle personal information collected through the HOMA Clinic MVP mobile application (the "App"), which provides metabolic health insights and support for diabetes and obesity reversal.
            </p>
          </div>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-green-700">
              Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              We collect only essential health-related data you voluntarily provide via in-app forms, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Basic contact details (name, phone number, email)</li>
              <li>Health metrics such as weight, height, BMI, fasting glucose, waist circumference, and other non-invasive metabolic indicators</li>
              <li>Optional notes about fatigue, sleep patterns, or related symptoms</li>
            </ul>
            <p className="text-gray-700">
              We do <strong>not</strong> collect sensitive biometric data, genetic information, or medical records beyond what is necessary for personalized metabolic planning.
            </p>
          </section>

          {/* How We Use Your Data */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-green-700">
              How We Use Your Data
            </h2>
            <p className="text-gray-700 mb-4">
              Your information is used solely to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Generate personalized metabolic health insights and reversal plans</li>
              <li>Provide follow-up support during your 90-day program</li>
              <li>Improve our service offerings based on aggregated, anonymized trends</li>
            </ul>
            <p className="text-gray-700">
              We do <strong>not</strong> use your data for advertising, profiling, or any purpose unrelated to your metabolic health journey.
            </p>
          </section>

          {/* Data Protection & Storage */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-green-700">
              Data Protection & Storage
            </h2>
            <p className="text-gray-700 mb-4">
              All data is stored securely in an encrypted Neon Postgres database. Access is restricted to authorized clinical staff only. We implement industry-standard security measures to prevent unauthorized access, alteration, or disclosure.
            </p>
            <p className="text-gray-700">
              We <strong>do not share, sell, or rent</strong> your personal or health information to third parties, including advertisers, data brokers, or analytics companies.
            </p>
          </section>

          {/* Data Retention & Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-green-700">
              Data Retention & Your Rights
            </h2>
            <p className="text-gray-700 mb-4">
              Your data is retained for up to 90 days after program completion unless you request earlier deletion. Under India's Digital Personal Data Protection Act (DPDPA), 2023, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Access a copy of your submitted data</li>
              <li>Request correction of inaccuracies</li>
              <li>Request deletion of your data at any time</li>
            </ul>
            <p className="text-gray-700">
              To exercise these rights, contact us using the details below.
            </p>
          </section>

          {/* Contact Information */}
          <div className="bg-gray-50 border-l-4 border-green-600 p-6 rounded-r-lg mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-700">
              <p className="font-semibold">Dr. Muddu Surendra Nehru, MD</p>
              <p>HOMA Clinic – Metabolic Disease Reversal</p>
              <p>Uppal Kalan, Hyderabad, Telangana, India</p>
              <p>
                <a href="tel:+919963721999" className="text-green-600 hover:text-green-700 hover:underline">
                  Phone: +91 99637 21999
                </a>
              </p>
              <p>
                <a href="mailto:homasurendranehru@gmail.com" className="text-green-600 hover:text-green-700 hover:underline">
                  Email: homasurendranehru@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Last updated: January 21, 2026
            </p>
            <p className="text-sm text-gray-500 mb-4">
              © 2026 HOMA Clinic. All rights reserved.
            </p>
            <Link 
              href="/" 
              className="inline-block text-green-600 hover:text-green-700 hover:underline font-medium"
            >
              ← Back to Home
            </Link>
          </footer>
        </div>
      </main>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy – HOMA Clinic MVP",
            "description": "Privacy Policy for HOMA Clinic MVP. Learn how we handle your personal health information, data protection, and your rights under India's Digital Personal Data Protection Act (DPDPA), 2023.",
            "url": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/privacy",
            "inLanguage": "en",
            "isPartOf": {
              "@type": "WebSite",
              "name": "HOMA Clinic",
              "url": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com"
            },
            "about": {
              "@type": "Organization",
              "name": "HOMA Clinic",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Uppal Kalan",
                "addressLocality": "Hyderabad",
                "addressRegion": "Telangana",
                "addressCountry": "IN"
              },
              "telephone": "+919963721999"
            }
          })
        }}
      />
    </div>
  );
}
