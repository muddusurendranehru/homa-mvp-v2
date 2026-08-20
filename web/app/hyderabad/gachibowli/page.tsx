import { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Best Diabetologist in Gachibowli | Dr. Muddu Surendra Nehru, MD',
  description: 'Personalized diabetes & metabolic reversal by Hyderabad\'s top-rated diabetologist in Gachibowli. Free HOMA-IR assessment. 32+ years experience.',
};

export default function GachibowliPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Best Diabetologist in Gachibowli</h1>
      
      <p className="mb-6">
        If you live or work in <strong>Gachibowli</strong>, you know the pace: long tech hours, late dinners, and rising stress. Many of my patients here have &quot;normal&quot; sugar reports — but still carry belly fat, fatigue, and sleepless nights. That&apos;s <strong>insulin resistance</strong> — and it&apos;s reversible.
      </p>

      <p className="mb-6">
        As a <strong>Professor of Medicine with 32+ years of experience</strong>, I&apos;ve helped over <strong>200 patients in Gachibowli and Financial District</strong> reverse prediabetes and obesity — without lifelong medication.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-3">Your Local Metabolic Solution</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Free at-home metabolic check</strong> — HOMA-IR, TyG Index, BMI from your phone</li>
          <li><strong>Plans that fit Gachibowli life</strong> — works with biryani, tiffins, or home cooking</li>
          <li><strong>90-day remission protocol</strong> — science-backed: nutrition, movement, sleep, monitoring</li>
          <li><strong>WhatsApp support</strong> — daily guidance, no clinic visits needed</li>
        </ul>
      </div>

      <blockquote className="border-l-4 border-green-600 pl-4 italic my-6 text-gray-700">
        &quot;In Gachibowli alone, 200+ patients have reversed metabolic disease since 2024 — with zero hospitalizations.&quot;  
        <br/><strong>— Dr. Muddu Surendra Nehru, MD</strong>
      </blockquote>

      <div className="text-center my-8">
        <a 
          href="/assessment" 
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition-colors"
        >
          📝 Start Your Free Assessment
        </a>
      </div>

      <div className="mt-10 text-gray-700 text-sm">
        <p><strong>Serving:</strong> Gachibowli, Financial District, Nanakramguda, Kondapur, Jayabheri Enclave, and nearby areas.</p>
        <p className="mt-2">In-person consultations available at our Gachibowli clinic. Remote support for all patients.</p>
      </div>

      <div className="mt-4 text-center text-xs text-gray-400">
        🌟 <a href="/hyderabad/ameerpet" className="text-blue-400 hover:underline">Metabolic Health in Ameerpet</a> | 
        <a href="/hyderabad" className="text-blue-400 hover:underline">Top Metabolic Center in Hyderabad</a>
      </div>
    </div>
  );
}

