import { Metadata } from 'next';
import ShareButtons from '@/components/ShareButtons';

// ✅ Force static generation for SEO
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Metabolic Syndrome Treatment in 90 Days | Dr. Muddu Surendra Nehru, MD - Hyderabad',
  description: 'Metabolic syndrome reversal through evidence-based program in Gachibowli, Hyderabad. Led by Professor Dr. Muddu Surendra Nehru, MD with 32+ years experience.',
};

export default function MetabolicSyndromePage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Metabolic Syndrome Treatment in Gachibowli – Dr. Muddu Surendra Nehru, MD
        </h1>
        <ShareButtons title="Metabolic Syndrome Treatment in 90 Days | Dr. Muddu Surendra Nehru, MD - Hyderabad" />
        <p className="text-gray-700 mb-6">
          Hyderabad's leading metabolic approach to syndrome reversal, led by Professor Dr. Muddu Surendra Nehru, MD — 32+ years of clinical excellence in Gachibowli.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Patients from Hyderabad Trust Our Protocol</h2>
        <ul className="list-disc pl-5 mb-6 text-gray-700">
          <li>90-day structured remission pathway</li>
          <li>Personalized nutrition & daily habit tracking</li>
          <li>Real-time WhatsApp support from medical team</li>
        </ul>

        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h3 className="font-bold text-green-800 mb-2">Free Risk Assessment</h3>
          <p className="text-gray-700 mb-4">
            Start your journey with a 15-minute metabolic risk test.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc4cw6zfm3ZDC7x1aCc7nGFNMRqpd14eogHWa91gj6jRFPXXw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 font-medium"
          >
            📝 Book Your Free Assessment
          </a>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Dr. Muddu Surendra Nehru, MD | Metabolic Health Clinic | Gachibowli, Hyderabad, Telangana</p>
        </div>
      </div>
    </div>
  );
}

