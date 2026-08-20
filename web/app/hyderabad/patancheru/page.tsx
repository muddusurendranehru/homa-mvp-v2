import { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Dr Muddu\'s HOMA Clinic Patancheru Hyderabad - Diabetes Cardio Obesity REMISSION',
  description: 'Diabetes remission in Patancheru Hyderabad. We test FASTING INSULIN (not glucose) + HOMA-IR. 32yrs ethics-guided care, 35L patients, India #1 5K+ HOMA tests, pioneer cardio-obesity-metabolism. 25 apps built. Pioneer close monitoring → REMISSION.',
  keywords: 'diabetes remission Patancheru, HOMA test Patancheru Hyderabad, fasting insulin test Patancheru, Dr Muddu Nehru Patancheru, diabetes reversal Patancheru, insulin resistance Patancheru, HOMA-IR test Patancheru, diabetologist Patancheru',
  openGraph: {
    title: 'Dr Muddu Nehru | Diabetologist Patancheru Hyderabad',
    description: '90 Day Diabetes Remission in Patancheru | 85% Success',
    url: 'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/hyderabad/patancheru',
    siteName: 'HOMA Clinic',
    images: [
      {
        url: 'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/obesity-reversal-hyderabad-jpg.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Muddu Nehru - Diabetologist Patancheru Hyderabad',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr Muddu Nehru | Diabetologist Patancheru Hyderabad',
    description: '90 Day Diabetes Remission in Patancheru | 85% Success',
    images: ['https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/obesity-reversal-hyderabad-jpg.jpg'],
  },
};

export default function PatancheruPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Diabetes REMISSION Patancheru Hyderabad | Dr Muddu Nehru MD 09963721999 | 85% Success | Insulin Testing Pioneer
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-green-50">
            Years struggling? We test FASTING INSULIN (not glucose) + HOMA-IR. 32yrs ethics-guided care, 35L patients, India #1 5K+ HOMA tests.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              32 Yrs Experience
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              35 Lakh Patients
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              5K HOMA Tests #1 India
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              Ethics Guided
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919963721999?text=Hi%20Dr.%20Muddu,%20I%20am%20from%20Patancheru%20and%20interested%20in%20diabetes%20remission%20program"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors shadow-lg"
            >
              📝 Free Assessment - Patancheru
            </a>
            <Link
              href="/enroll"
              className="bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition-colors shadow-lg border-2 border-white/30"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </section>

      {/* Unique Value Proposition */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Others stuck on glucose—we test FASTING INSULIN + HOMA-IR root cause
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Most clinics in Patancheru only check your blood sugar. We go deeper—testing fasting insulin levels and calculating HOMA-IR to identify the root cause of metabolic dysfunction. This precision approach is why we achieve 85% remission rates.
            </p>
          </div>
        </div>
      </section>

      {/* Services for Patancheru */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Diabetes Remission Services in Patancheru
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-green-600">HOMA-IR Testing</h3>
              <p className="text-gray-700">
                Comprehensive insulin resistance testing using fasting insulin levels—the gold standard for metabolic health assessment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-green-600">90-Day Remission Program</h3>
              <p className="text-gray-700">
                Structured program with 4 core biomarkers (HOMA-IR, TyG, BMI, Waist) and 4 daily habits for sustainable remission.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-green-600">Cardio-Obesity Management</h3>
              <p className="text-gray-700">
                Integrated approach addressing cardiovascular risk, central obesity, and metabolic syndrome simultaneously.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-green-600">Personalized Nutrition</h3>
              <p className="text-gray-700">
                Custom meal plans tailored for Indian dietary patterns, ensuring 1800-2000 kcal daily with optimal macronutrient balance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-green-600">Continuous Monitoring</h3>
              <p className="text-gray-700">
                24/7 digital dashboard tracking your progress with real-time insights and adjustments.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-green-600">Expert Consultation</h3>
              <p className="text-gray-700">
                Direct access to Dr. Muddu Surendra Nehru, Professor of Medicine with 32 years of experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Patancheru */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Why Patancheru Residents Choose HOMA Clinic
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">India&apos;s #1 HOMA Test Provider</h3>
                <p className="text-gray-700">
                  Over 5,000 HOMA-IR tests performed—more than any other clinic in India. We pioneered insulin resistance testing in Hyderabad.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">85% Remission Rate</h3>
                <p className="text-gray-700">
                  Proven track record with measurable outcomes. Our patients achieve metabolic remission, not just symptom management.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                <span className="text-2xl">🔬</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Science-Backed Approach</h3>
                <p className="text-gray-700">
                  Built 25+ health apps with end-to-end monitoring. Our protocol combines cutting-edge research with practical, actionable steps.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Convenient for Patancheru</h3>
                <p className="text-gray-700">
                  Easy access from Patancheru with flexible consultation options. Digital monitoring means fewer in-person visits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Remission Journey?</h2>
          <p className="text-xl mb-8 text-green-50">
            Serving patients from Patancheru and across Hyderabad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919963721999?text=Hi%20Dr.%20Muddu,%20I%20am%20from%20Patancheru%20and%20want%20to%20know%20more%20about%20diabetes%20remission"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors shadow-lg"
            >
              📱 WhatsApp: 09963721999
            </a>
            <Link
              href="/enroll"
              className="bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition-colors shadow-lg border-2 border-white/30"
            >
              Enroll in Program
            </Link>
          </div>
          <p className="mt-6 text-green-50">
            <strong>Dr. Muddu Surendra Nehru M.D.</strong> | Professor of Medicine | Senior Physician
          </p>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "name": "Dr Muddu's HOMA Clinic - Patancheru Hyderabad",
            "alternateName": "Diabetes Reversal Center Patancheru",
            "description": "Diabetes remission services in Patancheru Hyderabad. We test FASTING INSULIN (not glucose) + HOMA-IR. 32yrs ethics-guided care, 35L patients, India #1 5K+ HOMA tests.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Patancheru",
              "addressRegion": "Telangana",
              "addressCountry": "IN",
              "streetAddress": "HOMA Clinic Patancheru"
            },
            "areaServed": {
              "@type": "City",
              "name": "Patancheru, Hyderabad"
            },
            "telephone": "09963721999",
            "url": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/hyderabad/patancheru",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.7",
              "reviewCount": "350",
              "bestRating": "5",
              "worstRating": "1"
            },
            "priceRange": "₹₹",
            "medicalSpecialty": ["Endocrinology", "Cardiology", "Metabolic Medicine"],
            "founder": {
              "@type": "Person",
              "name": "Dr. Muddu Surendra Nehru",
              "jobTitle": "Professor of Medicine"
            }
          })
        }}
      />
    </div>
  );
}

