'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

const WA = 'https://wa.me/919963721999';
const MEAL_APP = 'https://healthmetrics30daymeals.onrender.com';

const FEATURES: { icon: string; title: string; caption: string; href: string; external: boolean; img?: string }[] = [
  { icon: "🧬", title: "HOMA-IR + TyG Assessment", caption: "The early markers that predict diabetes years before HbA1c", href: "/tools/homa-ir-calculator", external: false, img: "/images/tiles/feat-homa-ir.jpg" },
  { icon: "🥗", title: "Personalized Indian Diet Plan", caption: "30-day rolling meal plans based on your reports", href: "https://healthmetrics30daymeals.onrender.com", external: true },
  { icon: "📱", title: "Daily Tracking App", caption: "60-second daily logs on your phone", href: "/dashboard", external: false },
  { icon: "👨‍⚕️", title: "Doctor Follow-up", caption: "Weekly reviews by Dr. Muddu's team", href: "https://wa.me/919963721999", external: true, img: "/images/tiles/feat-doctor.jpg" },
  { icon: "💬", title: "WhatsApp Support", caption: "Ask anything, get answers within hours", href: "https://wa.me/919963721999", external: true, img: "/images/tiles/feat-whatsapp.jpg" },
  { icon: "🏠", title: "DDDD Home Visits", caption: "Door-to-door monitoring in Hyderabad (Gachibowli, Ameerpet, Bachupally, Patancheru)", href: "https://wa.me/919963721999?text=I%20want%20a%20home%20visit%20from%20HOMA", external: true },
  { icon: "🚫", title: "No CGM Required", caption: "Uses your existing lab reports — no sensors, no finger pricks", href: "/tools", external: false, img: "/images/tiles/feat-no-cgm.jpg" },
  { icon: "🔬", title: "Peer-Reviewed Protocol", caption: "Based on published research (IJCPR 2026, IJM 2026)", href: "/research", external: false, img: "/images/tiles/feat-research.jpg" },
];

const PILLARS: readonly { title: string; detail: string; img?: string }[] = [
  { title: 'Insulin Resistance', detail: 'HOMA-IR, TyG Index' },
  { title: 'Central Obesity', detail: 'Waist Circumference', img: '/images/tiles/pillar-obesity.jpg' },
  { title: 'Inflammation', detail: 'CRP, TNF-α, IL-6' },
  { title: 'Early Renal Injury', detail: 'UACR, Glomerular Hyperfiltration' },
] as const;

const VISITS = [
  { src: '/images/patients/visit-01.jpg', caption: 'Clinic visit' },
  { src: '/images/patients/visit-02.jpg', caption: 'Clinic visit' },
  { src: '/images/patients/visit-03.jpg', caption: 'Clinic visit' },
  { src: '/images/patients/visit-04.jpg', caption: 'Clinic consultation' },
  { src: '/images/patients/visit-05.jpg', caption: 'Waist measurement' },
  { src: '/images/patients/visit-06.jpg', caption: 'Knee and leg measurement' },
  { src: '/images/patients/visit-07.jpg', caption: 'Waist measurement' },
  { src: '/images/patients/visit-08.jpg', caption: 'Finger-stick sugar check' },
  { src: '/images/patients/visit-09.jpg', caption: 'Standing waist check' },
] as const;

const PRICE_FEATURES = [
  'HOMA-IR + TyG assessment',
  'Personalized 90-day diet plan',
  'Daily tracking app access',
  'Weekly doctor follow-up',
  '24/7 WhatsApp support',
  'DDDD home visits (Hyderabad area)',
  'No CGM sensors required',
] as const;

interface AssessmentMetrics {
  weight_kg?: number | null;
  waist_cm?: number | null;
  fbs?: number | null;
}

type MealOk = {
  status: 'ok';
  today: string;
  sleep: { latest: { date: string; text: string } | null };
  progress: {
    startDate: string | null;
    streak: number;
    last7Dates?: string[];
  };
  energy?: { sleepMinutes: number | null } | null;
};

type MealResult = MealOk | { status: 'signed_out' | 'unavailable' | 'not_linked' | 'loading' };

function todayIST() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

function programDayFromStart(startDate: string) {
  const [y, m, d] = startDate.split('-').map(Number);
  if (!y || !m || !d) return 1;
  const start = Date.UTC(y, m - 1, d);
  const [ty, tm, td] = todayIST().split('-').map(Number);
  const today = Date.UTC(ty, tm - 1, td);
  const diff = Math.floor((today - start) / 86400000) + 1;
  return Math.min(90, Math.max(1, diff));
}

function lastSeven(todayYmd: string) {
  const [y, m, d] = todayYmd.split('-').map(Number);
  const anchor = new Date(Date.UTC(y, m - 1, d));
  const days: string[] = [];
  for (let i = 6; i >= 0; i -= 1) {
    const dt = new Date(anchor);
    dt.setUTCDate(anchor.getUTCDate() - i);
    days.push(dt.toISOString().slice(0, 10));
  }
  return days;
}

function weekday(ymd: string) {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-IN', { weekday: 'short', timeZone: 'UTC' });
}

function formatAmount(n: number, digits = 0) {
  const rounded = digits === 0 ? String(Math.round(n)) : String(Math.round(n * 10) / 10);
  return rounded.replace(/\.0$/, '');
}

function sleepHoursFromText(text: string | null | undefined) {
  if (!text) return null;
  const hours = text.match(/(\d+(?:\.\d+)?)\s*h(?:ours?)?(?:\s*(\d+)\s*m)?/i);
  if (hours) return Number(hours[1]) + (hours[2] ? Number(hours[2]) / 60 : 0);
  const plain = text.match(/(\d+(?:\.\d+)?)/);
  if (!plain) return null;
  const n = Number(plain[1]);
  return n > 0 && n <= 24 ? n : null;
}

function MealAppLink() {
  return (
    <a href={MEAL_APP} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-12 items-center text-sm font-bold text-[#0d9488] underline">
      Log in the 30-day meal app
    </a>
  );
}

export default function RemissionProgramPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [metrics, setMetrics] = useState<AssessmentMetrics | null>(null);
  const [meal, setMeal] = useState<MealResult>({ status: 'loading' });

  useEffect(() => {
    if (!isAuthenticated || authLoading) return;
    let cancelled = false;
    api
      .getLatestAssessment()
      .then((response) => {
        if (!cancelled && response?.assessment) setMetrics(response.assessment as AssessmentMetrics);
      })
      .catch((err) => {
        console.error('Error fetching metrics:', err);
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    if (!isAuthenticated || authLoading) return;
    let cancelled = false;
    fetch('/api/meal-progress', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : { status: 'unavailable' }))
      .then((json) => {
        if (!cancelled) setMeal(json?.status ? json : { status: 'unavailable' });
      })
      .catch(() => {
        if (!cancelled) setMeal({ status: 'unavailable' });
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, authLoading]);

  const today = meal.status === 'ok' && meal.today ? meal.today : todayIST();
  const dayNumber = meal.status === 'ok' && meal.progress.startDate ? programDayFromStart(meal.progress.startDate) : 1;
  const progressPercentage = meal.status === 'ok' && meal.progress.startDate ? Math.min(100, (dayNumber / 90) * 100) : 0;
  const streak = meal.status === 'ok' ? meal.progress.streak : 0;

  const weightValue = metrics?.weight_kg && metrics.weight_kg > 0 ? metrics.weight_kg : null;
  const waistValue = metrics?.waist_cm && metrics.waist_cm > 0 ? metrics.waist_cm : null;
  const glucoseValue = metrics?.fbs && metrics.fbs > 0 ? metrics.fbs : null;
  const sleepValue =
    meal.status === 'ok'
      ? meal.energy?.sleepMinutes
        ? meal.energy.sleepMinutes / 60
        : sleepHoursFromText(meal.sleep.latest?.text)
      : null;

  const loggedDates = useMemo(() => {
    const dates = new Set<string>();
    if (meal.status === 'ok') {
      for (const date of meal.progress.last7Dates ?? []) dates.add(date);
    }
    return dates;
  }, [meal]);
  const heatmap = lastSeven(today);

  const tiles: { label: string; value: number | null; unit: string; digits: number }[] = [
    { label: 'Weight', value: weightValue, unit: 'kg', digits: 1 },
    { label: 'Waist', value: waistValue, unit: 'cm', digits: 0 },
    { label: 'Glucose', value: glucoseValue, unit: 'mg/dL', digits: 0 },
    { label: 'Sleep', value: sleepValue, unit: 'h', digits: 1 },
  ];

  const pad = {
    paddingLeft: 'max(1rem, env(safe-area-inset-left, 0px))',
    paddingRight: 'max(1rem, env(safe-area-inset-right, 0px))',
  };

  return (
    <div className="overflow-x-hidden bg-[#f1f5f9] text-slate-900" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <section className="bg-[#1e3a8a] text-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16" style={pad}>
          <p className="text-xs font-bold tracking-[0.18em] text-teal-200">HOMA 90-DAY PROGRAM</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Your doctor-guided 90-day diabetes reset. No CGM. No finger pricks. No injections.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white sm:text-lg">
            Led by Dr. Muddu Surendra Nehru MD at HOMA Healthcare Center. A doctor-led protocol that catches metabolic disease years before HbA1c rises.
          </p>
          <p className="mt-6 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
            <span>₹150/day</span>
            <span aria-hidden="true">·</span>
            <span>₹13,500 for 90 days</span>
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/tools/metabolic-analyzer.html" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-[20px] bg-[#f97316] px-5 text-base font-bold text-white no-underline hover:bg-orange-600">
              Get My Metabolic Score →
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-[20px] border-2 border-white px-5 text-base font-bold text-white no-underline hover:bg-white/10">
              Book Free Session →
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 p-0 text-sm text-white">
            {['DPIIT Recognised', 'Diabetes India 2026', '13 Books', '6 Papers', '5,000+ Patients'].map((item) => (
              <li key={item} className="list-none">
                <span className="mr-1 text-teal-200" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12" style={pad}>
        <h2 className="text-2xl font-extrabold text-[#1e3a8a] sm:text-3xl">What&apos;s included in your 90-day program</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {FEATURES.map((feature) => {
            const label = `${feature.title}. ${feature.caption}`;
            const card = (
              <article className="flex h-full min-h-12 min-w-0 flex-col overflow-hidden rounded-[20px] bg-white shadow-sm transition-shadow hover:shadow-md">
                {feature.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={feature.img} alt={feature.title} loading="lazy" width={800} height={600} className="aspect-[4/3] w-full rounded-t-[20px] object-cover" />
                ) : (
                  <div className="flex aspect-[4/3] w-full items-center justify-center rounded-t-[20px] bg-gradient-to-br from-teal-50 to-teal-100 text-4xl" aria-hidden="true">{feature.icon}</div>
                )}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-bold leading-snug text-slate-900 sm:text-base">{feature.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{feature.caption}</p>
                  <span className="mt-auto pt-2 text-xs font-bold text-[#0d9488]">Open →</span>
                </div>
              </article>
            );
            return feature.external ? (
              <a key={feature.title} href={feature.href} target="_blank" rel="noopener noreferrer" className="rounded-[20px] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a]" aria-label={label}>
                {card}
              </a>
            ) : (
              <Link key={feature.title} href={feature.href} className="rounded-[20px] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a]" aria-label={label}>
                {card}
              </Link>
            );
          })}
        </div>
      </section>

      {!authLoading && isAuthenticated && (
        <section className="mx-auto max-w-5xl px-4 pb-12" style={pad} aria-label="Today's progress">
          <div className="rounded-[20px] bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-end justify-between gap-3">
              <h2 className="text-2xl font-extrabold text-[#1e3a8a]">Day {dayNumber} of 90</h2>
              <span className="text-sm font-semibold text-slate-500">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuenow={Math.round(progressPercentage)} aria-valuemin={0} aria-valuemax={100} aria-label={`Day ${dayNumber} of 90`}>
              <div className="h-full rounded-full bg-[#0d9488]" style={{ width: `${progressPercentage}%` }} />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {tiles.map((tile) => (
                <div key={tile.label} className="min-w-0 rounded-[20px] bg-[#f1f5f9] p-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{tile.label}</div>
                  {tile.value != null ? (
                    <p className="mt-1 text-xl font-extrabold text-slate-900">
                      {formatAmount(tile.value, tile.digits)} <span className="text-sm font-semibold text-slate-500">{tile.unit}</span>
                    </p>
                  ) : (
                    <MealAppLink />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-5 text-base font-bold text-slate-900">🔥 {streak}-day streak</p>
            <div className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2" aria-label="Last 7 days">
              {heatmap.map((date) => {
                const logged = loggedDates.has(date);
                return (
                  <div key={date} className="min-w-0 text-center">
                    <div className={`mx-auto h-8 w-full max-w-10 rounded-lg ${logged ? 'bg-[#0d9488]' : 'bg-slate-200'}`} title={logged ? `${date} logged` : `${date} pending`} />
                    <div className="mt-1 truncate text-[10px] font-medium text-slate-500 sm:text-xs">{weekday(date)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-4 pb-12" style={pad}>
        <h2 className="text-2xl font-extrabold text-[#1e3a8a] sm:text-3xl">Beyond HbA1c — the 4 pillars of metabolic risk</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {PILLARS.map((pillar) => (
            <article key={pillar.title} className="min-w-0 overflow-hidden rounded-[20px] bg-white shadow-sm">
              {pillar.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={pillar.img} alt={pillar.title} loading="lazy" width={800} height={600} className="aspect-[4/3] w-full rounded-t-[20px] object-cover" />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center rounded-t-[20px] bg-gradient-to-br from-teal-50 to-teal-100 px-3 text-center text-sm font-extrabold text-[#0d9488]" aria-hidden="true">{pillar.title}</div>
              )}
              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-900 sm:text-base">{pillar.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{pillar.detail}</p>
              </div>
            </article>
          ))}
        </div>
        <Link href="/citations" className="mt-4 inline-flex min-h-12 items-center text-sm font-bold text-[#0d9488] no-underline">
          Read our published research →
        </Link>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12" style={pad}>
        <h2 className="text-2xl font-extrabold text-[#1e3a8a] sm:text-3xl">Patients at HOMA</h2>
        <p className="mt-2 text-sm text-slate-600">Real clinic photos. Faces blurred for privacy.</p>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {VISITS.map((visit) => (
            <article key={visit.src} className="min-w-0 overflow-hidden rounded-[20px] bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={visit.src} alt={visit.caption} loading="lazy" width={800} height={600} className="aspect-[4/3] w-full rounded-t-[20px] object-cover" />
              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-900 sm:text-base">{visit.caption}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[520px] px-4 pb-12" style={pad}>
        <article className="rounded-[20px] bg-[#1e3a8a] p-6 text-center text-white shadow-sm">
          <h2 className="text-2xl font-extrabold">90-Day Program</h2>
          <p className="mt-3 text-3xl font-extrabold text-white">₹13,500</p>
          <p className="mt-1 text-sm text-white">₹150/day — less than your monthly medicine bills</p>
          <ul className="mt-5 space-y-2 text-left text-sm text-white">
            {PRICE_FEATURES.map((item) => (
              <li key={item}>
                <span className="mr-2 text-teal-200" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/assessment" className="inline-flex min-h-12 items-center justify-center rounded-[20px] bg-[#f97316] px-5 font-bold text-white no-underline hover:bg-orange-600">
              Start Your 90-Day Reset →
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-[20px] bg-[#16a34a] px-5 font-bold text-white no-underline hover:bg-green-700">
              WhatsApp to Discuss →
            </a>
          </div>
        </article>
      </section>

      <section className="bg-[#1e3a8a] text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center" style={pad}>
          <h2 className="text-3xl font-extrabold">Start Your 90-Day Reset Today</h2>
          <p className="mt-3 text-white">Free 20-minute consultation. No obligation.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/tools/metabolic-analyzer.html" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-[20px] bg-[#f97316] px-5 font-bold text-white no-underline hover:bg-orange-600">
              Get My Metabolic Score →
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-[20px] bg-[#16a34a] px-5 font-bold text-white no-underline hover:bg-green-700">
              Book Free Session →
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 text-center text-xs leading-relaxed text-slate-500" style={pad}>
          This protocol is based on peer-reviewed research · IJCPR 2026; 18(2): 826-833 · DOI: 10.25258/ijcpr.18.2.136
          {' · '}
          <Link href="/citations" className="font-bold text-[#0d9488] no-underline">
            See all research →
          </Link>
        </div>
      </footer>
    </div>
  );
}
