import { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import GearStore from '@/components/GearStore';

export const metadata: Metadata = {
  title: "The Doctor's Gear Store | HOMA Healthcare Center",
  description:
    'Curated tools to monitor, manage, and reverse your metabolic condition — with clinical guidance from HOMA Healthcare Center.',
};

export default function LifestylePage() {
  return (
    <AppShell>
      <div className="w-full space-y-8">
        <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold text-slate-900">The Doctor&apos;s Gear Store</h1>
          <p className="mt-3 text-slate-600">
            Curated tools to monitor, manage, and reverse your metabolic condition.
          </p>
        </header>

        <section
          className="rounded-2xl border-2 border-[#0D9488] bg-white p-6 shadow-sm sm:p-8"
          aria-label="Clinical safety disclaimer"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0D9488]">
            Important
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900 sm:text-base">
            Doctor&apos;s Advice
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            These devices and tools are recommended for clinical monitoring and lifestyle support.
            They are not a replacement for your prescribed medication or Dr. Nehru&apos;s advice.
            Always consult the clinic before making treatment changes.
          </p>
        </section>

        <section
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
          aria-labelledby="e-cycling-heading"
        >
          <figure className="m-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/lifestyle/lifestyle-ezykle-larc-ebike.webp"
              alt="E-cycling on a LARC e-bike — an easy way to move more every day"
              width={800}
              height={1765}
              loading="lazy"
              decoding="async"
              className="mx-auto block h-auto w-full max-w-md object-cover"
            />
            <figcaption className="border-t border-slate-100 px-4 py-3 text-center text-sm font-semibold text-slate-800 sm:text-base">
              E-cycling: an easy way to move more every day
            </figcaption>
          </figure>
        </section>

        <section
          className="rounded-2xl border border-teal-200/80 bg-teal-50/60 p-6 shadow-sm sm:p-8"
          aria-labelledby="doctors-note-heading"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
            From Dr. Muddu&apos;s desk
          </p>
          <h2 id="doctors-note-heading" className="mt-2 text-xl font-bold text-slate-900">
            Doctor&apos;s Note: Daily Habits
          </h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Walking, sleep, and stress management are just as important as medicine. Explore our
            recommended tools below to help you track your progress — and keep your clinic team in
            the loop when you change monitoring or treatment plans.
          </p>
        </section>

        <GearStore />
      </div>
    </AppShell>
  );
}
