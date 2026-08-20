import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: "Type 2 Diabetes Remission in Hyderabad | Dr. Muddu Surendra Nehru, MD",
  description: "Reverse type 2 diabetes in 90 days with HOMA-IR based metabolic protocols. Free assessment in Gachibowli, Hyderabad. 90% patients reduce HbA1c by 1.5-2.5%.",
  openGraph: {
    title: "Type 2 Diabetes Remission in 90 Days | Dr. Muddu Nehru, MD",
    description: "Evidence-based diabetes reversal in 90 days — no heavy medications. HOMA-IR guided protocols.",
    url: "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/diabetes",
    siteName: "HOMA Health Clinics",
    images: [
      {
        url: "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/90dayhealthtracker1.jpg",
        width: 1200,
        height: 630,
        alt: "90-Day Diabetes Remission Program - Dr. Muddu Nehru, MD",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Type 2 Diabetes Remission in 90 Days",
    description: "Evidence-based diabetes reversal — HOMA-IR guided protocols",
    images: ["https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/90dayhealthtracker1.jpg"],
  },
  alternates: {
    canonical: "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/diabetes",
  },
};

// Force static generation for SEO
export const dynamic = 'force-static';

export default function DiabetesPage() {
  const pageUrl = "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/diabetes";
  const pageTitle = "Type 2 Diabetes Remission in 90 Days - Dr. Muddu Nehru, MD";
  const pageDescription = "Evidence-based diabetes reversal in 90 days — no heavy medications. HOMA-IR guided protocols.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-sans">
      {/* Hero with Image - Enhanced Design */}
      <header className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 px-4 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🎯 90-Day Remission Program
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Type 2 Diabetes Remission Program
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 font-medium">
                Evidence-based reversal in 90 days — no heavy medications
              </p>
              <p className="text-lg text-blue-50 leading-relaxed">
                Dr. Muddu's protocol uses HOMA-IR, TyG Index, and personalized nutrition to reverse insulin resistance — the root cause of type 2 diabetes.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm">
                  ✅ 90% Success Rate
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm">
                  📊 HOMA-IR Guided
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm">
                  🏥 Gachibowli, Hyderabad
                </div>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/90dayhealthtracker1.jpg"
                alt="Type 2 diabetes remission success story - 90-day metabolic program in Hyderabad with Dr. Muddu Surendra Nehru MD"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Benefits Cards - Enhanced Design */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-3">📉</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">90% Success Rate</h3>
              <p className="text-gray-600">Patients reduce HbA1c by 1.5–2.5% in 90 days</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-3">🍛</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sustainable Indian Food</h3>
              <p className="text-gray-600">No extreme diets — personalized nutrition plans</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Daily Support</h3>
              <p className="text-gray-600">WhatsApp coaching + lab monitoring</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-3">🔬</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Science-Based</h3>
              <p className="text-gray-600">HOMA-IR guided metabolic intervention</p>
            </div>
          </div>

          {/* Share Section - FIXED */}
          <ShareButtons 
            title={pageTitle}
          />

          {/* Assessment CTA - Enhanced Design */}
          <div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 py-8 text-white text-center rounded-2xl mb-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">🎁 Free Metabolic Risk Assessment</h3>
              <p className="text-lg mb-6 text-red-50">No Cost • No Signup • Instant Results</p>
              <Link 
                href="/tools?utm_source=condition_page&utm_medium=cta_button&utm_campaign=metabolic_calculators"
                className="inline-block bg-white text-red-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all text-lg shadow-2xl transform hover:-translate-y-2 hover:scale-105"
              >
                Start Free Assessment Now →
              </Link>
            </div>
          </div>

          {/* WhatsApp CTA - Enhanced Design */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl text-center shadow-lg border-2 border-green-200">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to Start Your Journey?</h3>
            <p className="text-gray-600 mb-6">Get a free 15-minute consultation with Dr. Muddu</p>
            <a 
              href="https://wa.me/919963721999" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all"
            >
              📞 WhatsApp: 09963721999
            </a>
          </div>
        </div>
      </main>

      {/* Minimal Footer - Standalone View - Enhanced */}
      <footer className="py-8 text-center border-t bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-blue-50">
              ← Back to Home
            </Link>
            <span className="text-gray-400 self-center">•</span>
            <Link href="/about" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-blue-50">
              About Dr. Muddu
            </Link>
          </div>
          <p className="text-sm text-gray-600 font-medium">
            Dr. Muddu Surendra Nehru, MD | HOMA Health Clinics | Gachibowli, Hyderabad
          </p>
        </div>
      </footer>

      {/* Schema.org - MedicalCondition */}
      <script
        id="diabetes-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalCondition",
            "name": "Type 2 Diabetes",
            "description": "A chronic metabolic disorder characterized by high blood sugar due to insulin resistance. Reversible through HOMA-IR guided lifestyle intervention.",
            "url": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/diabetes",
            "image": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/90dayhealthtracker1.jpg",
            "associatedAnatomy": {
              "@type": "AnatomicalStructure",
              "name": "Pancreas"
            },
            "possibleTreatment": {
              "@type": "MedicalTherapy",
              "name": "Lifestyle modification, personalized nutrition, daily activity tracking"
            },
            "provider": {
              "@type": "Person",
              "name": "Dr. Muddu Surendra Nehru, MD",
              "url": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/about"
            }
          })
        }}
      />
    </div>
  );
}
