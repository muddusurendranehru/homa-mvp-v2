import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '30-Day Diet Plan Preview | HOMA Healthcare Center',
  description:
    'Preview Day 1 of your personalized Indian metabolic diet plan. Unlock the full 30-day meal guide with HOMA Clinic.',
};

const UNLOCK_HREF =
  'https://wa.me/919963721999?text=INTERESTED%20IN%2030%20DAY%20DIET%20PLAN';

const dayOneMeals = [
  { meal: 'Breakfast', dish: '2 Idlis with Sambar', emoji: '🌅' },
  { meal: 'Lunch', dish: 'Brown rice, moong dal tadka & cucumber kosambari', emoji: '☀️' },
  { meal: 'Dinner', dish: '2 multigrain rotis, lauki chana dal & mint raita', emoji: '🌙' },
] as const;

export default function DietPlanTeaserPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-teal-50/80 via-white to-slate-50 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-lg">
        <header className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#0D9488]">
            HOMA Metabolic Nutrition
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Your 30-Day Diet Plan
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Doctor-designed Indian meals to support metabolic remission. Preview Day 1 below.
          </p>
        </header>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
          <div className="border-b border-slate-100 bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-100">Day 1</p>
            <h2 className="text-lg font-bold">Sample meals</h2>
          </div>

          <ul className="divide-y divide-slate-100 px-6 py-2">
            {dayOneMeals.map((item) => (
              <li key={item.meal} className="flex gap-4 py-4">
                <span className="text-2xl" aria-hidden>
                  {item.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#0D9488]">
                    {item.meal}
                  </p>
                  <p className="mt-0.5 font-medium text-slate-900">{item.dish}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <section
          className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
          aria-label="Locked days 2 through 30"
        >
          <div
            className="pointer-events-none select-none space-y-3 px-6 py-8 blur-[6px]"
            aria-hidden
          >
            <p className="text-sm font-semibold text-slate-700">Day 2 — Breakfast</p>
            <p className="text-slate-600">Besan chilla with paneer & chutney</p>
            <p className="text-sm font-semibold text-slate-700">Day 3 — Lunch</p>
            <p className="text-slate-600">Millet bowl with seasonal vegetables</p>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/70 px-4 text-center backdrop-blur-[2px]">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-2xl shadow-inner" aria-hidden>
              🔒
            </span>
            <p className="text-base font-semibold text-slate-800">Days 2–30 are locked</p>
            <p className="max-w-xs text-sm text-slate-600">
              Full rotating meal plans unlock with your HOMA program.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <a
            href={UNLOCK_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-4 text-center text-base font-bold text-white shadow-lg shadow-teal-600/25 transition hover:from-teal-700 hover:to-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            Unlock Your Full 30-Day Diet Plan
          </a>
          <p className="mt-4 text-center text-xs text-slate-500">
            Message HOMA Clinic on WhatsApp — we&apos;ll help you get started.
          </p>
        </div>
      </div>
    </main>
  );
}
