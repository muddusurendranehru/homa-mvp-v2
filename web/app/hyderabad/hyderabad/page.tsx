import { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Top Metabolic Center in Hyderabad | Dr. Muddu Surendra Nehru, MD',
  description: 'Hyderabad\'s leading metabolic disease reversal center. 90-day program for diabetes, PCOS, obesity & heart disease. Free assessment. 32+ years expertise.',
};

export default function HyderabadPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Top Metabolic Center in Hyderabad</h1>
      
      <p className="mb-6">
        Across <strong>Hyderabad — from Ameerpet to Patancheru, Bachupally to Gachibowli</strong> — patients are struggling with hidden metabolic dysfunction. Normal blood sugar? Still at risk. Why? <strong>Glucotoxicity and insulin resistance</strong> don&apos;t wait for a diagnosis.
      </p>

      <p className="mb-6">
        As <strong>Professor Dr. Muddu Surendra Nehru, MD</strong>, I&apos;ve treated over <strong>50,000 patients</strong> across Hyderabad in 32 years. Since 2024, our <strong>metabolic remission program</strong> has helped <strong>80% of participants</strong> reverse diabetes, PCOS, and obesity — without drugs.
      </p>

      <div className="bg-purple-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-3">Why Hyderabad Chooses Us</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>India&apos;s first AI-powered metabolic remission protocol</strong></li>
          <li><strong>Free online HOMA-IR & TyG Index calculators</strong></li>
          <li><strong>Personalized plans for Telugu, Hindi & English speakers</strong></li>
          <li><strong>90-day journey with WhatsApp coaching & physician oversight</strong></li>
        </ul>
      </div>

      <blockquote className="border-l-4 border-green-600 pl-4 italic my-6 text-gray-700">
        &quot;We don&apos;t treat numbers — we treat people. And in Hyderabad, metabolic healing starts with truth.&quot;  
        <br/><strong>— Dr. Muddu Surendra Nehru, MD</strong>
      </blockquote>

      <div className="text-center my-8">
        <a 
          href="/assessment" 
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition-colors"
        >
          📝 Start Your Free Metabolic Assessment
        </a>
      </div>

      <div className="mt-10 text-gray-700 text-sm">
        <p><strong>Now serving all zones:</strong> Ameerpet, Patancheru, Bachupally, Gachibowli, Uppal, Kukatpally, Secunderabad, and beyond.</p>
        <p className="mt-2">Mobile-friendly. 100% free. No signup required.</p>
      </div>

      <div className="mt-4 text-center text-xs text-gray-400">
        🌟 <a href="/hyderabad/gachibowli" className="text-blue-400 hover:underline">Best Diabetologist in Gachibowli</a> | 
        <a href="/hyderabad/ameerpet" className="text-blue-400 hover:underline">Metabolic Health in Ameerpet</a>
      </div>
    </div>
  );
}

