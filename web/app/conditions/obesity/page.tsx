import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Obesity & Belly Fat Reversal in Hyderabad | Dr. Muddu Surendra Nehru, MD',
  description: 'Reverse central obesity and belly fat in 90 days with HOMA-IR guided protocols. Average waist reduction 12-16 cm. Free assessment in Gachibowli, Hyderabad.',
  openGraph: {
    title: 'Obesity & Belly Fat Reversal – 90-Day Program | Dr. Muddu Nehru, MD',
    description: 'Science-backed obesity reversal using HOMA-IR, WHtR, and personalized nutrition. No surgery. No extreme diets.',
    url: 'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/obesity',
    siteName: 'HOMA Health Clinics',
    images: [
      {
        url: 'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/obesity-reversal-hyderabad-jpg.jpg',
        width: 1200,
        height: 630,
        alt: 'Obesity remission success - Hyderabad patient',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Obesity & Belly Fat Reversal – 90-Day Program',
    description: 'Science-backed obesity reversal using HOMA-IR, WHtR, and personalized nutrition.',
    images: ['https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/obesity-reversal-hyderabad-jpg.jpg'],
  },
  alternates: {
    canonical: 'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/obesity',
  },
};

export const dynamic = 'force-static';

export default function ObesityPage() {
  const pageUrl = 'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/obesity';
  const pageTitle = 'Obesity & Belly Fat Reversal – 90-Day Program';
  const pageDescription = 'Science-backed obesity reversal using HOMA-IR, WHtR, and personalized nutrition. No surgery. No extreme diets.';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 font-sans">
      {/* Hero with Image - Enhanced Design */}
      <header className="relative bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 text-white py-16 px-4 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ⚖️ 90-Day Belly Fat Reversal
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Obesity & Central Belly Fat Reversal
              </h1>
              <p className="text-xl md:text-2xl text-orange-100 font-medium">
                Reverse visceral fat in 90 days — no surgery, no extreme diets
              </p>
              <p className="text-lg text-orange-50 leading-relaxed">
                Central obesity (belly fat) is not just cosmetic — it's a sign of severe insulin resistance. Dr. Muddu's protocol uses Waist-to-Height Ratio (WHtR), HOMA-IR, and TyG Index to reverse fat accumulation at the root.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm">
                  ✅ 12-16 cm Waist Reduction
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm">
                  📊 WHtR Guided
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm">
                  🏥 Gachibowli, Hyderabad
                </div>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/obesity-reversal-hyderabad-jpg.jpg"
                alt="Obesity and belly fat reversal success - 90-day metabolic program in Gachibowli Hyderabad with Dr. Muddu Surendra Nehru MD"
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
              <div className="text-4xl mb-3">📏</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">12-16 cm Waist Reduction</h3>
              <p className="text-gray-600">Average results in 90 days</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-3">🍛</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Starvation</h3>
              <p className="text-gray-600">Personalized Indian food plans</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-3">👟</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Daily Coaching</h3>
              <p className="text-gray-600">WhatsApp support + step tracking</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-3">🔬</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Science-Based</h3>
              <p className="text-gray-600">HOMA-IR guided metabolic intervention</p>
            </div>
          </div>

          {/* Share Buttons */}
          <ShareButtons 
            pageUrl={pageUrl} 
            pageTitle={pageTitle}
            pageDescription={pageDescription}
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
        id="obesity-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalCondition",
            "name": "Obesity",
            "description": "Excess body fat, especially abdominal fat, caused by insulin resistance and metabolic dysfunction. Reversible through HOMA-IR guided lifestyle intervention.",
            "url": pageUrl,
            "image": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/obesity-reversal-hyderabad-jpg.jpg",
            "associatedAnatomy": {
              "@type": "AnatomicalStructure",
              "name": "Adipose Tissue"
            },
            "possibleTreatment": {
              "@type": "MedicalTherapy",
              "name": "Lifestyle modification, WHtR monitoring, personalized nutrition"
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
