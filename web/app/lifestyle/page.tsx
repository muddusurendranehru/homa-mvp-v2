import { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import GearStore from '@/components/GearStore';

export const metadata: Metadata = {
  title: 'Lifestyle Hub | HOMA Healthcare Center',
  description:
    'Daily habits, walking, sleep, and stress management — plus recommended gear to track your metabolic health journey.',
};

export default function LifestylePage() {
  return (
    <AppShell>
      <div className="w-full space-y-8">
        <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold text-slate-900">Lifestyle Hub</h1>
          <p className="mt-3 text-slate-600">
            Eat. Pray. Sleep. Conquer. Small daily choices add up to lasting metabolic health.
          </p>
        </header>

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
          <p className="mt-3 text-slate-700 leading-relaxed">
            Walking, sleep, and stress management are just as important as medicine. Explore our
            recommended tools below to help you track your progress.
          </p>
        </section>

        <GearStore />
      </div>
    </AppShell>
  );
}
