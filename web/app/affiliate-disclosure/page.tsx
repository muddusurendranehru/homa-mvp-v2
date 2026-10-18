import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Affiliate Disclosure & Advertising Policy | HOMA Healthcare Center",
  description: "Financial disclosures and advertising policies for HOMA Healthcare Center. Learn how we handle affiliate links and maintain editorial independence.",
};

export default function AffiliateDisclosure() {
  return (
    <div className="min-h-screen bg-white font-sans py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Affiliate Disclosure & Advertising Policy
        </h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-3">Financial Disclosure</h2>
            <p>
              HOMA Healthcare Center is committed to transparency. We may participate in affiliate programs for products and services that we believe add value to our patients' health journeys. This includes, but is not limited to, linking to lab testing services, online pharmacies (such as Tata 1mg), and health monitoring wearables (available on platforms like Amazon or Flipkart).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-3">What This Means for You</h2>
            <p>
              If you click on an affiliate link on our website and make a purchase, HOMA Healthcare Center may earn a small commission. This comes at <strong>no additional cost to you</strong>. The price you pay remains exactly the same.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-3">Editorial Independence</h2>
            <p>
              We want to be absolutely clear: these affiliate partnerships <strong>do not influence</strong> our medical advice, editorial content, or the products we recommend. 
            </p>
            <p className="mt-2">
              Recommendations made by Dr. Muddu Surendra Nehru and our editorial board are based solely on clinical merit and evidence-based medicine. We only link to products or services that we genuinely believe are beneficial for metabolic health.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-3">No Third-Party Ads</h2>
            <p>
              HOMA Healthcare Center does not host third-party banner ads, pop-ups, or sponsored content. Our platform is designed purely to provide clinical education and support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-700 mb-3">Contact Us</h2>
            <p>
              If you have any questions about our affiliate partnerships or this disclosure, please contact us at <a href="mailto:info@homahealthcarecenter.in" className="text-green-600 hover:underline">info@homahealthcarecenter.in</a>.
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