'use client';

import { FormEvent, useEffect, useState } from 'react';

const WA = 'https://wa.me/919963721999';
const STORAGE_KEY = 'homa-health-check';

type Sex = 'male' | 'female';
type Level = 'optimal' | 'borderline' | 'high';

type Metric = {
  label: string;
  value: string;
  status: string;
  level: Level;
  note: string;
};

type SavedCheck = {
  sex: Sex | '';
  heightCm: string;
  weightKg: string;
  waistCm: string;
  name: string;
  whatsapp: string;
  email: string;
  savedAt: string;
};

function bmiStatus(bmi: number): { status: string; level: Level } {
  if (bmi < 23) return { status: 'Optimal', level: 'optimal' };
  if (bmi < 25) return { status: 'Acceptable', level: 'borderline' };
  if (bmi < 30) return { status: 'Overweight', level: 'high' };
  return { status: 'Obese', level: 'high' };
}

function whtrStatus(ratio: number): { status: string; level: Level } {
  if (ratio < 0.5) return { status: 'Safe', level: 'optimal' };
  if (ratio <= 0.55) return { status: 'Borderline', level: 'borderline' };
  return { status: 'High', level: 'high' };
}

function waistStatus(cm: number, sex: Sex): { status: string; level: Level } {
  if (sex === 'male') {
    if (cm < 90) return { status: 'Optimal', level: 'optimal' };
    if (cm <= 100) return { status: 'Warning', level: 'borderline' };
    return { status: 'High', level: 'high' };
  }
  if (cm < 80) return { status: 'Optimal', level: 'optimal' };
  if (cm <= 90) return { status: 'Warning', level: 'borderline' };
  return { status: 'High', level: 'high' };
}

function verdict(levels: Level[]) {
  if (levels.some((level) => level === 'high')) {
    return {
      tone: 'high' as const,
      title: '🔴 High risk — we recommend a full metabolic analysis',
    };
  }
  if (levels.every((level) => level === 'optimal')) {
    return {
      tone: 'low' as const,
      title: '🟢 Low risk — keep going',
    };
  }
  return {
    tone: 'moderate' as const,
    title: '🟡 Moderate risk — worth a full check',
  };
}

function badgeClass(level: Level) {
  if (level === 'optimal') return 'bg-teal-50 text-teal-800';
  if (level === 'borderline') return 'bg-amber-50 text-amber-800';
  return 'bg-red-50 text-red-800';
}

function verdictClass(tone: 'low' | 'moderate' | 'high') {
  if (tone === 'low') return 'border-teal-200 bg-teal-50 text-teal-900';
  if (tone === 'moderate') return 'border-amber-200 bg-amber-50 text-amber-950';
  return 'border-red-200 bg-red-50 text-red-900';
}

export default function HealthCheckPage() {
  const [sex, setSex] = useState<Sex | ''>('');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [waistCm, setWaistCm] = useState('');
  const [formError, setFormError] = useState('');
  const [metrics, setMetrics] = useState<Metric[] | null>(null);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [leadError, setLeadError] = useState('');
  const [showLead, setShowLead] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<SavedCheck>;
      if (saved.sex === 'male' || saved.sex === 'female') setSex(saved.sex);
      if (typeof saved.heightCm === 'string') setHeightCm(saved.heightCm);
      if (typeof saved.weightKg === 'string') setWeightKg(saved.weightKg);
      if (typeof saved.waistCm === 'string') setWaistCm(saved.waistCm);
      if (typeof saved.name === 'string') setName(saved.name);
      if (typeof saved.whatsapp === 'string') setWhatsapp(saved.whatsapp);
      if (typeof saved.email === 'string') setEmail(saved.email);
    } catch {
      /* ignore a bad local save */
    }
  }, []);

  function persist(extra?: Partial<SavedCheck>) {
    const payload: SavedCheck = {
      sex,
      heightCm,
      weightKg,
      waistCm,
      name,
      whatsapp,
      email,
      savedAt: new Date().toISOString(),
      ...extra,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return payload;
  }

  function onSeeResults(event: FormEvent) {
    event.preventDefault();
    const height = Number(heightCm);
    const weight = Number(weightKg);
    const waist = Number(waistCm);

    if (sex !== 'male' && sex !== 'female') {
      setFormError('Choose male or female so the waist cutoff is correct.');
      setMetrics(null);
      return;
    }
    if (!Number.isFinite(height) || height < 100 || height > 250) {
      setFormError('Enter height in centimetres, between 100 and 250.');
      setMetrics(null);
      return;
    }
    if (!Number.isFinite(weight) || weight < 20 || weight > 300) {
      setFormError('Enter weight in kilograms, between 20 and 300.');
      setMetrics(null);
      return;
    }
    if (!Number.isFinite(waist) || waist < 40 || waist > 200) {
      setFormError('Enter waist circumference in centimetres, between 40 and 200.');
      setMetrics(null);
      return;
    }

    const bmi = weight / (height / 100) ** 2;
    const ratio = waist / height;
    const bmiBadge = bmiStatus(bmi);
    const ratioBadge = whtrStatus(ratio);
    const waistBadge = waistStatus(waist, sex);

    setFormError('');
    setShowLead(true);
    setMetrics([
      {
        label: 'BMI',
        value: bmi.toFixed(1),
        status: bmiBadge.status,
        level: bmiBadge.level,
        note: 'India cutoffs: Optimal <23 · Acceptable 23–24.9 · Overweight 25–29.9 · Obese 30+',
      },
      {
        label: 'Waist-to-Height Ratio',
        value: ratio.toFixed(2),
        status: ratioBadge.status,
        level: ratioBadge.level,
        note: 'Safe <0.5 · Borderline 0.5–0.55 · High >0.55',
      },
      {
        label: 'Waist Circumference Risk',
        value: `${waist % 1 === 0 ? waist.toFixed(0) : waist.toFixed(1)} cm`,
        status: waistBadge.status,
        level: waistBadge.level,
        note:
          sex === 'male'
            ? 'Male: Optimal <90 cm · Warning 90–100 cm · High >100 cm'
            : 'Female: Optimal <80 cm · Warning 80–90 cm · High >90 cm',
      },
    ]);
    persist();
    requestAnimationFrame(() => {
      document.getElementById('health-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  async function onBookSample(event: FormEvent) {
    event.preventDefault();
    const trimmedName = name.trim();
    const digits = whatsapp.replace(/\D/g, '');
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      setLeadError('Enter your name.');
      return;
    }
    if (digits.length < 10 || digits.length > 15) {
      setLeadError('Enter a WhatsApp number with country code, for example +91 and 10 digits.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setLeadError('Enter a valid email address.');
      return;
    }
    if (!metrics) {
      setLeadError('See your results first.');
      return;
    }

    setLeadError('');
    const saved = persist({
      name: trimmedName,
      whatsapp: whatsapp.trim(),
      email: trimmedEmail,
    });

    const bmi = metrics[0]?.value ?? '';
    const waist = waistCm.trim();
    const ratio = metrics[1]?.value ?? '';
    const message = `I completed the free health check.
My BMI is ${bmi}, waist is ${waist}cm, WHtR is ${ratio}.
I want to book a blood sample for the full metabolic analyzer.`;

    const lead = { ...saved, message, source: 'health-check' };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      if (!res.ok) console.log(lead);
    } catch {
      console.log(lead);
    }

    window.open(`${WA}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  const summary = metrics ? verdict(metrics.map((metric) => metric.level)) : null;
  const consultMessage = 'I want to book a free 20-minute consultation with Dr. Muddu\'s team.';

  return (
    <main className="bg-white text-slate-800">
      <section className="mx-auto max-w-xl px-4 pb-8 pt-10 sm:pt-14">
        <p className="text-xs font-bold tracking-[0.16em] text-[#0d9488]">FREE · 30 SECONDS · NO SIGNUP</p>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-[#1e3a8a] sm:text-5xl">
          Check your metabolic health
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          Enter 3 measurements. Get your BMI, waist-to-height ratio, and risk score instantly.
        </p>

        <form onSubmit={onSeeResults} className="mt-8 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <fieldset className="m-0 border-0 p-0">
            <legend className="text-sm font-bold text-[#1e3a8a]">Sex for waist cutoff</legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {(['female', 'male'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={sex === option}
                  onClick={() => setSex(option)}
                  className={`min-h-12 rounded-[20px] border-2 text-base font-bold capitalize ${
                    sex === option
                      ? 'border-[#0d9488] bg-teal-50 text-[#0d9488]'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="mt-5 block text-sm font-bold text-[#1e3a8a]" htmlFor="height-cm">
            Height (cm)
          </label>
          <input
            id="height-cm"
            name="height"
            type="number"
            inputMode="decimal"
            min={100}
            max={250}
            step="0.1"
            required
            value={heightCm}
            onChange={(event) => setHeightCm(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-[20px] border border-slate-300 px-4 text-base outline-none focus:border-[#0d9488]"
            placeholder="165"
          />

          <label className="mt-5 block text-sm font-bold text-[#1e3a8a]" htmlFor="weight-kg">
            Weight (kg)
          </label>
          <input
            id="weight-kg"
            name="weight"
            type="number"
            inputMode="decimal"
            min={20}
            max={300}
            step="0.1"
            required
            value={weightKg}
            onChange={(event) => setWeightKg(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-[20px] border border-slate-300 px-4 text-base outline-none focus:border-[#0d9488]"
            placeholder="68"
          />

          <label className="mt-5 block text-sm font-bold text-[#1e3a8a]" htmlFor="waist-cm">
            Waist circumference (cm)
          </label>
          <input
            id="waist-cm"
            name="waist"
            type="number"
            inputMode="decimal"
            min={40}
            max={200}
            step="0.1"
            required
            value={waistCm}
            onChange={(event) => setWaistCm(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-[20px] border border-slate-300 px-4 text-base outline-none focus:border-[#0d9488]"
            placeholder="82"
          />

          {formError ? <p className="mt-4 text-sm font-semibold text-red-700">{formError}</p> : null}

          <button
            type="submit"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-[20px] bg-[#f97316] px-5 text-base font-bold text-white hover:bg-orange-600"
          >
            See My Results →
          </button>
        </form>
      </section>

      {metrics && summary ? (
        <section id="health-results" className="mx-auto max-w-xl scroll-mt-6 px-4 pb-4">
          <div className="grid gap-4">
            {metrics.map((metric) => (
              <article key={metric.label} className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-extrabold text-[#1e3a8a]">{metric.label}</h2>
                    <p className="mt-1 text-3xl font-extrabold text-slate-900">{metric.value}</p>
                  </div>
                  <span className={`inline-flex min-h-12 items-center rounded-full px-4 text-sm font-bold ${badgeClass(metric.level)}`}>
                    {metric.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{metric.note}</p>
              </article>
            ))}
          </div>

          <div className={`mt-4 rounded-[20px] border p-5 text-lg font-extrabold shadow-sm ${verdictClass(summary.tone)}`}>
            {summary.title}
          </div>

          {showLead ? (
            <div className="mt-8 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-2xl font-extrabold text-[#1e3a8a]">Want the full metabolic picture?</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                The complete analysis includes HOMA-IR, TyG Index, insulin levels, and organ-risk markers — measured from a simple blood sample. Add your details and we&apos;ll contact you to schedule it.
              </p>
              <form onSubmit={onBookSample} className="mt-6">
                <label className="block text-sm font-bold text-[#1e3a8a]" htmlFor="lead-name">
                  Name
                </label>
                <input
                  id="lead-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 min-h-12 w-full rounded-[20px] border border-slate-300 px-4 text-base outline-none focus:border-[#0d9488]"
                />

                <label className="mt-5 block text-sm font-bold text-[#1e3a8a]" htmlFor="lead-whatsapp">
                  WhatsApp number
                </label>
                <input
                  id="lead-whatsapp"
                  name="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  placeholder="+91 9963721999"
                  value={whatsapp}
                  onChange={(event) => setWhatsapp(event.target.value)}
                  className="mt-2 min-h-12 w-full rounded-[20px] border border-slate-300 px-4 text-base outline-none focus:border-[#0d9488]"
                />

                <label className="mt-5 block text-sm font-bold text-[#1e3a8a]" htmlFor="lead-email">
                  Email
                </label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 min-h-12 w-full rounded-[20px] border border-slate-300 px-4 text-base outline-none focus:border-[#0d9488]"
                />

                {leadError ? <p className="mt-4 text-sm font-semibold text-red-700">{leadError}</p> : null}

                <button
                  type="submit"
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-[20px] bg-[#f97316] px-5 text-base font-bold text-white hover:bg-orange-600"
                >
                  Book My Blood Sample →
                </button>
                <button
                  type="button"
                  onClick={() => setShowLead(false)}
                  className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-[20px] border-2 border-[#1e3a8a] bg-white px-5 text-base font-bold text-[#1e3a8a]"
                >
                  Skip for now
                </button>
              </form>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="mx-auto max-w-xl px-4 py-12 text-center">
        <h2 className="text-3xl font-extrabold text-[#1e3a8a]">Ready to go further?</h2>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Book a 20-minute consultation with Dr. Muddu&apos;s team. Free. No obligation.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={`${WA}?text=${encodeURIComponent(consultMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-[20px] bg-[#f97316] px-5 text-base font-bold text-white no-underline hover:bg-orange-600"
          >
            Book Free Consultation →
          </a>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-[20px] bg-[#16a34a] px-5 text-base font-bold text-white no-underline hover:bg-green-700"
          >
            WhatsApp us →
          </a>
        </div>
      </section>
    </main>
  );
}
