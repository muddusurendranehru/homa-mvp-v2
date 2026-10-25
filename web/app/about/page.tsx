import Link from 'next/link';
import { Metadata } from 'next';
import { PhotoGallery } from '@/components/HomeSections';

export const metadata: Metadata = {
  title: "About Dr. Muddu Surendra Nehru, MD – HOMA Health Clinics",
  description: "Professor of Medicine with 32+ years experience, author of 4 books & 300+ articles. Founder of HOMA Health Clinics, Hyderabad.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero */}
      <header className="bg-gradient-to-r from-blue-50 to-teal-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About Dr. Muddu Surendra Nehru, MD
          </h1>
          <p className="text-lg text-gray-600">
            Professor of Medicine • Senior Physician • Metabolic Disease Reversal Specialist
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-purple-600">13</div>
              <div className="text-gray-600 text-sm">Books Authored</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">32+</div>
              <div className="text-gray-600 text-sm">Years Experience</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-green-600">5 Lakh+</div>
              <div className="text-gray-600 text-sm">OP Patients</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-red-600">5,000+</div>
              <div className="text-gray-600 text-sm">HOMA Tests Done</div>
            </div>
          </div>
          {/* Photo gallery */}
          <div className="mb-12">
                      <PhotoGallery
              title="At the clinic"
              photos={[
                { src: '/images/dr-muddu-portrait.jpg', alt: 'Dr. Muddu Surendra Nehru, M.D.', pos: 'center top' },
                { src: '/images/about-minister-book.jpg', alt: "Dr. Muddu Surendra Nehru presenting his book to Telangana Minister", pos: 'center 25%', caption: "Dr. Muddu presenting his book to Minister Sridhar Babu." },
                { src: '/images/doctor-premier-flyer.jpg', alt: 'Dr. Muddu Surendra Nehru at Premier Hospital', pos: 'center top', caption: 'Professor of Medicine, Premier Hospital.' },
                { src: '/images/staff3.jpg', alt: 'The HOMA Healthcare Center team celebrating', pos: 'center', caption: 'The HOMA Team at the Gachibowli clinic.' },
              ]}
            />
          </div>

          {/* Bio */}
          <p className="text-gray-700 mb-4">
            Dr. Muddu Surendra Nehru, MD is a Professor of Medicine with over 32 years of clinical experience in internal medicine, diabetes, and metabolic disorders. He has published more than 300 scientific articles and authored 4 books on metabolic health, insulin resistance, and chronic disease reversal.
          </p>
          <p className="text-gray-700 mb-6">
            As the founder of HOMA Health Clinics, he pioneered the use of HOMA-IR and TyG Index as early detection tools for metabolic syndrome — long before they became mainstream in Indian healthcare.
          </p>

          {/* Mission */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            To enable early detection and complete remission of metabolic diseases — including type 2 diabetes, obesity, PCOS, and hypertension — through science-backed, personalized, and accessible protocols that empower patients to take control of their health.
          </p>

          {/* 90-Day Program */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">The 90-Day Metabolic Remission Program</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-8">
            <li><strong>Phase 1 (Days 1–30):</strong> Comprehensive metabolic assessment, baseline lab tests, and habit formation coaching.</li>
            <li><strong>Phase 2 (Days 31–60):</strong> Personalized nutrition plans, daily step goals, and WhatsApp-based health coaching.</li>
            <li><strong>Phase 3 (Days 61–90):</strong> Repeat lab testing, protocol refinement, and long-term sustainability planning.</li>
          </ul>

          {/* CTA */}
          <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Ready to Begin Your Remission Journey?
            </h3>
            <a 
              href="https://wa.me/919963721999" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition shadow"
            >
              📞 WhatsApp Us: 09963721999
            </a>
            <p className="mt-2 text-gray-600 text-sm">
              Free 15-minute consultation • No cost • No obligation • Available in English & Telugu
            </p>
          </div>
        </div>
      </main>

      {/* Back Link */}
      <footer className="py-6 text-center border-t">
        <Link href="/" className="text-blue-600 hover:underline font-medium">
          ← Back to Home
        </Link>
      </footer>

      {/* Schema.org */}
      <script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dr. Muddu Surendra Nehru, MD",
            "url": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/about",
            "jobTitle": "Professor of Medicine",
            "affiliation": "HOMA Health Clinics",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Gachibowli",
              "addressLocality": "Hyderabad",
              "addressRegion": "Telangana",
              "postalCode": "500032",
              "addressCountry": "IN"
            },
            "description": "With 32+ years of clinical experience, Dr. Muddu pioneered the HOMA-IR based metabolic remission approach. Author of 4 books and 300+ articles on diabetes reversal and obesity management."
          })
        }}
      />
              {/* Certifications Section */}
        <section className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Our Certifications & Recognitions
          </h2>
          <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <img 
              src="/images/honcode-certificate.jpg" 
              alt="HONcode principles and DPIIT Recognition" 
              className="w-full h-auto"
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            HOMA Healthcare Center follows HONcode principles for trustworthy health information and is recognized by DPIIT.
          </p>
        </section>
    </div>
  );
}
