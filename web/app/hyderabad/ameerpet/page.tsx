import { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Metabolic Health for Ameerpet Residents | Dr. Muddu Surendra Nehru, MD',
  description: 'Personalized diabetes & obesity reversal for Ameerpet, Kukatpally & SR Nagar. Free metabolic assessment by Professor of Medicine with 32+ years experience.',
};

export default function AmeerpetPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Serving Ameerpet with Science-Based Metabolic Care</h1>
      
      <p className="mb-6">
        As a Professor of Medicine with over 32 years of clinical experience, I&apos;ve seen how urban lifestyles in <strong>Ameerpet, Kukatpally, and SR Nagar</strong> contribute to hidden insulin resistance — even in people with &quot;normal&quot; blood sugar.
      </p>

      <p className="mb-6">
        Many of my Ameerpet patients work long hours in IT or education, rely on quick meals from Gachibowli or Miyapur food hubs, and struggle with fatigue, belly fat, and sleepless nights. These aren&apos;t signs of aging — they&apos;re early warnings of metabolic dysfunction.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-3">Your Personalized Path from Ameerpet</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Free at-home metabolic checkup</strong> — assess HOMA-IR, TyG Index, and BMI from your phone</li>
          <li><strong>Diet plans for local habits</strong> — works with biryani, tiffins, or home cooking</li>
          <li><strong>90-day remission protocol</strong> — no drugs, just science: nutrition, movement, sleep, and monitoring</li>
          <li><strong>WhatsApp support</strong> — daily guidance without clinic visits</li>
        </ul>
      </div>

      <blockquote className="border-l-4 border-green-600 pl-4 italic my-6 text-gray-700">
        &quot;In the last 2 years, I&apos;ve helped over 150 patients in Ameerpet and Kukatpally reverse prediabetes and obesity — without medication.&quot;  
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
        <p><strong>Convenient for residents of:</strong> Ameerpet, Kukatpally, Bharat Nagar, SR Nagar, Miyapur, Nizampet, and surrounding areas.</p>
        <p className="mt-2">In-person consultations available at Gachibowli. Remote support for all Hyderabad zones.</p>
      </div>

      <div className="mt-4 text-center text-xs text-gray-400">
        🌟 <a href="/hyderabad/gachibowli" className="text-blue-400 hover:underline">Best Diabetologist in Gachibowli</a> | 
        <a href="/hyderabad" className="text-blue-400 hover:underline">Top Metabolic Center in Hyderabad</a>
      </div>
    </div>
  );
}
