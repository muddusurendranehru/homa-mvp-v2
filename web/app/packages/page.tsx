import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Packages & Pricing | HOMA Clinic Gachibowli',
  description:
    'Free risk check, HOMA home visit, 30-day and 90-day programs, premium door-to-door care. Enroll via WhatsApp 09963721999.',
};

const WA = 'https://wa.me/919963721999';

const packages = [
  {
    name: 'Free Risk Check',
    blurb: 'Online calculators and quick orientation — no payment, no signup.',
    bullets: ['HOMA-IR / TyG style tools', 'Understand your risk band', 'WhatsApp for next step'],
    enrollText: 'I want the Free Risk Check',
  },
  {
    name: 'Basic HOMA Test — home visit',
    blurb: 'Fasting insulin–guided interpretation with home blood draw coordination in Hyderabad.',
    bullets: ['Scheduling support', 'Metabolic context — not just a single number', 'Doctor-aligned follow-up'],
    enrollText: 'I want the Basic HOMA Home Visit',
  },
  {
    name: '30-Day Program',
    blurb: 'Structured start for insulin resistance, weight, and sugar trends with close monitoring.',
    bullets: ['Nutrition + lifestyle framework', 'Metrics check-ins', 'Coach-style accountability'],
    enrollText: 'I want the 30-Day Program',
  },
  {
    name: '90-Day Reversal Program',
    blurb: 'Our flagship metabolic remission track — evidence-based protocols with high remission focus.',
    bullets: ['HOMA-guided progression', 'Personalized plan', 'Priority support'],
    enrollText: 'I want the 90-Day Reversal Program',
  },
  {
    name: 'Premium Door-to-Door Care',
    blurb:
      'Concierge-style monitoring for busy families — assessments and follow-ups at your doorstep where available.',
    bullets: ['Priority scheduling', 'Home visits as applicable', 'Dedicated coordination'],
    enrollText: 'I want Premium Door-to-Door Care',
  },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-teal-900 to-emerald-950 px-4 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-300">HOMA Clinic</p>
          <h1 className="mt-2 text-3xl font-extrabold text-white md:text-4xl">Packages</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-teal-100/90 md:text-lg">
            Choose a lane. Enroll on WhatsApp — we&apos;ll confirm eligibility, timing, and
            inclusions for Hyderabad / Gachibowli.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => {
            const href = `${WA}?text=${encodeURIComponent(
              `Hi Dr. Nehru — ${pkg.enrollText}. Please share details and next steps.`
            )}`;
            return (
              <article
                key={pkg.name}
                className="flex flex-col rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-900/60 to-emerald-950/80 p-6 shadow-xl"
              >
                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-teal-400">
                  Package {i + 1}
                </div>
                <h2 className="text-xl font-bold text-white">{pkg.name}</h2>
                <p className="mt-2 text-sm text-teal-100/90">{pkg.blurb}</p>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-teal-50/95">
                  {pkg.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-teal-400">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 font-bold text-white transition hover:bg-[#20bd5a]"
                >
                  <span>💬</span>
                  Enroll on WhatsApp
                </a>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-teal-200/70">
          Final pricing and inclusions are confirmed after clinical assessment. Call{' '}
          <a href="tel:+919963721999" className="underline hover:text-white">
            09963721999
          </a>
          .
        </p>
      </div>
    </div>
  );
}
