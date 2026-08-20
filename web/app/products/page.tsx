import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Apps & Tools | Dr. Muddu HOMA Clinic',
  description:
    'Free and clinical tools: Nutrition Bot, HOMA metrics, PCOS score, OCR reports, drug trials — built by Dr. Muddu Surendra Nehru MD.',
};

const products = [
  {
    name: 'Nutrition Bot',
    description: 'AI-assisted meal and nutrition guidance aligned with metabolic goals and HOMA thinking.',
    audience: 'Anyone improving diet for weight, sugar, or insulin resistance.',
    href: 'https://homa-foods-nutrition.onrender.com',
    icon: '🍎',
  },
  {
    name: '90-Day Metrics',
    description: 'Track your remission journey — key numbers and trends over the program.',
    audience: 'Patients in structured metabolic programs.',
    href: 'https://healthmetrics-render1.onrender.com',
    icon: '📊',
  },
  {
    name: 'PCOS HOMA Score',
    description: 'Insulin-resistance context for PCOS — HOMA-style scoring for better decisions.',
    audience: 'Women with PCOS, irregular cycles, or weight plateau.',
    href: 'https://pcos-homaiq-score-frontend.onrender.com',
    icon: '🎯',
  },
  {
    name: 'OCR Report Analyzer',
    description: 'Upload lab reports — structured summaries to discuss with your doctor.',
    audience: 'Patients juggling multiple lab PDFs and follow-ups.',
    href: 'https://ai-image-ocr-1.onrender.com',
    icon: '📄',
  },
  {
    name: 'Drug Trials Tracker',
    description: 'Organize trial participation, visits, and notes in one place.',
    audience: 'Patients or caregivers in clinical trial pathways.',
    href: 'https://drug-trials-frontend.onrender.com',
    icon: '💊',
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/40 to-cyan-50/30 px-4 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">HOMA ecosystem</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Apps &amp; tools
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 md:text-lg">
            Physician-developed web apps by Dr. Muddu Surendra Nehru MD — try free where indicated,
            use clinical tools under guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-teal-200/80 bg-white shadow-md transition hover:shadow-xl"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center border-b border-teal-100">
                <span className="text-5xl opacity-90" aria-hidden>
                  {p.icon}
                </span>
                <span className="sr-only">Screenshot placeholder</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-xl font-bold text-slate-900">{p.name}</h2>
                <p className="mt-2 flex-1 text-sm text-slate-600 md:text-base">{p.description}</p>
                <p className="mt-3 text-xs font-medium text-teal-800 md:text-sm">
                  <span className="text-slate-500">Who it&apos;s for:</span> {p.audience}
                </p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 text-center font-bold text-white shadow transition hover:from-teal-500 hover:to-emerald-500"
                >
                  Try free
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
