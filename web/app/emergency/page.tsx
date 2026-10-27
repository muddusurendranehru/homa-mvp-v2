import { Metadata } from 'next';
import Link from 'next/link';
import { buildEmergencySupportWhatsAppUrl } from '@/lib/homa-contact';

export const metadata: Metadata = {
  title: 'Emergency First Aid | HOMA Healthcare Center',
  description:
    'India emergency numbers and first-aid education for hypoglycemia and diabetic ketoacidosis (DKA). Not a substitute for emergency medical care.',
};

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Emergency First Aid</h1>
          <p className="mt-2 text-slate-600 text-sm">
            Quick reference for people living with diabetes. In any life-threatening situation, call emergency
            services immediately.
          </p>
        </div>

        <section
          className="rounded-2xl bg-red-600 text-white p-6 shadow-lg border-2 border-red-700"
          aria-labelledby="emergency-numbers"
        >
          <h2 id="emergency-numbers" className="text-xl font-bold flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-white animate-pulse" aria-hidden />
            India emergency numbers
          </h2>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <a
              href="tel:112"
              className="block rounded-xl bg-white/15 hover:bg-white/25 border border-white/40 px-5 py-4 text-center transition-colors"
            >
              <span className="text-3xl font-black tracking-tight">112</span>
              <span className="block mt-1 text-sm font-medium text-red-50">All emergencies</span>
            </a>
            <a
              href="tel:108"
              className="block rounded-xl bg-white/15 hover:bg-white/25 border border-white/40 px-5 py-4 text-center transition-colors"
            >
              <span className="text-3xl font-black tracking-tight">108</span>
              <span className="block mt-1 text-sm font-medium text-red-50">Ambulance</span>
            </a>
          </div>
          <p className="mt-4 text-center text-xs font-medium text-red-50">
            Life-threatening emergency? Call <strong>112</strong> or <strong>108</strong> first — do not use WhatsApp
            instead of ambulance services.
          </p>
          <a
            href={buildEmergencySupportWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/50 bg-green-600 px-5 py-3.5 text-base font-bold text-white shadow-md hover:bg-green-700 transition-colors"
          >
            WhatsApp HOMA staff (diabetes emergency guidance)
          </a>
          <p className="mt-2 text-center text-xs text-red-100">
            Support messaging only — not a replacement for <strong>112</strong> / <strong>108</strong>.
          </p>
          <p className="mt-4 text-sm text-red-100">
            HOMA clinic line (non-emergency):{' '}
            <a href="tel:+919963721999" className="underline font-semibold text-white">
              09963721999
            </a>
          </p>
        </section>

        <article className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-amber-700">Hypoglycemia (low blood sugar)</h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Watch for</p>
          <ul className="mt-2 list-disc list-inside text-slate-700 text-sm space-y-1">
            <li>Shaking, sweating, or sudden hunger</li>
            <li>Dizziness, confusion, or irritability</li>
            <li>Weakness or difficulty concentrating</li>
          </ul>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">First aid (15–15 rule)</p>
          <ul className="mt-2 list-disc list-inside text-slate-700 text-sm space-y-1">
            <li>Give about 15 grams of fast-acting sugar (e.g. glucose tablets, juice, or regular soda — not diet).</li>
            <li>Wait 15 minutes, then recheck blood sugar if you have a meter.</li>
            <li>Repeat once if still low; eat a small snack once stable.</li>
            <li>If the person is unconscious, cannot swallow, or does not improve — call <strong>112</strong> or{' '}
              <strong>108</strong> immediately.
            </li>
          </ul>
        </article>

        <article className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-red-700">DKA (diabetic ketoacidosis)</h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Watch for</p>
          <ul className="mt-2 list-disc list-inside text-slate-700 text-sm space-y-1">
            <li>Fruity-smelling breath, nausea, or vomiting</li>
            <li>Extreme thirst and frequent urination</li>
            <li>Abdominal pain, rapid breathing, or confusion</li>
          </ul>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Action</p>
          <p className="mt-2 text-slate-700 text-sm">
            DKA is a medical emergency. Do not wait — go to the nearest emergency room or call{' '}
            <a href="tel:108" className="text-red-700 font-semibold underline">108</a> /{' '}
            <a href="tel:112" className="text-red-700 font-semibold underline">112</a> right away. Do not rely on
            home remedies alone.
          </p>
        </article>

        <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-300 pt-4">
          <strong>Disclaimer:</strong> This page is first-aid education only. It does not diagnose conditions, replace
          your doctor’s plan, or constitute emergency medical care. Always seek professional help for urgent symptoms.
        </p>

        <p className="text-sm">
          <Link href="/tools" className="text-[#0D9488] font-medium hover:underline">
            ← Free metabolic tools
          </Link>
        </p>
      </div>
    </div>
  );
}
