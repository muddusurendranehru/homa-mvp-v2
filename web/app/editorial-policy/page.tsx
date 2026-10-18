import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Editorial Policy | HOMA Healthcare Center",
  description: "Our commitment to accurate, evidence-based health information. Meet the HOMA Healthcare Center editorial board and review our medical policies.",
};

export default function EditorialPolicy() {
  return (
    <div className="min-h-screen bg-white font-sans py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Editorial Policy
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-3">Our Commitment to Accuracy</h2>
            <p>
              HOMA Healthcare Center is dedicated to providing accurate, evidence-based health information. Our content is designed to support, not replace, the direct relationship between patients and their healthcare providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-3">Editorial Board</h2>
            <p className="mb-3">Our medical content is reviewed and approved by our distinguished editorial board:</p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>Dr. Muddu Surendra Nehru, M.D. (Director-CEO)</li>
              <li>Dr. Vamsee Krishna, M.D.</li>
              <li>Dr. Basavaraj Naik, M.D.</li>
              <li>Dr. Goutham Viswas, MBBS (MD)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-3">Technical & Data Review</h2>
            <p>
              To ensure the highest standards of data integrity and technical accuracy, our platforms and metabolic algorithms are reviewed by Dr. Rajsekhar (MBBS) and Sateesh D (IIIT Engineer).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-3">Justifiability & Evidence</h2>
            <p>
              All clinical claims made on this website are based on established medical research. We utilize evidence-based protocols for metabolic health, diabetes reversal, and obesity management. When we make a health claim, we are prepared to justify it with scientific literature upon request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-3">Independence & Advertising</h2>
            <p>
              Our editorial team operates independently. Any advertising or affiliate links present on this site do not influence our medical content, clinical advice, or the topics we choose to cover.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-3">Contact</h2>
            <p>
              For questions regarding our editorial process or medical content, please contact us at <a href="mailto:info@homahealthcarecenter.in" className="text-green-600 hover:underline">info@homahealthcarecenter.in</a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link href="/" className="text-green-600 hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}