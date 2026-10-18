'use client';

import { useState } from 'react';
import Link from 'next/link';

type Status = 'active' | 'open';
type Filter = 'all' | Status;

interface Subtype {
  code: string;
  name: string;
  patient: string | null;
  status: Status;
}

const SUBTYPES: Subtype[] = [
  { code: "ST05", name: "Female — Obesity + T2DM + Dyslipidemia (Low-Carb)", patient: "K. Swaroopa, 45F", status: "active" },
  { code: "ST06", name: "Above 40 — Obesity + Hypertension + Dyslipidemia (Low-Sodium)", patient: "M. Ramesh, 52M", status: "active" },
  { code: "ST10", name: "Simple Low-Carb Routine — Gentle Weight Loss", patient: null, status: "open" },
  { code: "ST11", name: "North Indian Veg — T2DM + Hypertension + Menopause", patient: "P. Anasuya, 48F", status: "active" },
  { code: "ST12", name: "Young Male — Non-Diabetic Obesity + Dyslipidemia + Family History CAD", patient: "S. Karthik, 32M", status: "active" },
  { code: "ST13", name: "Elderly Male — Post-CABG, T2DM, HTN, Dyslipidemia, Obesity", patient: "V. Srinivas, 68M", status: "active" },
  { code: "ST14", name: "Young Male — MONW, Central Obesity, High HOMA-IR, LDL, Family History CAD", patient: "B. Sai Charan, 29M", status: "active" },
  { code: "ST15", name: "Elderly Female — T2DM, Insulin, Sarcopenic Obesity, HTN, Dyslipidemia (Veg)", patient: "T. Lakshmi Devi, 62F", status: "active" },
  { code: "ST16", name: "Working Woman — Perimenopause, T2DM, CKD Risk, Central Obesity, Sarcopenia, Fatty Liver", patient: "N. Bhavani, 46F", status: "active" },
  { code: "ST18", name: "Middle-Age Female — Early DM, Iron/Folate/Vit D (Post-Thyroid)", patient: "G. Sailaja, 41F", status: "active" },
  { code: "ST19", name: "Elderly Female — T2DM, Insulin, Renal Dysfunction", patient: "K. Rajamma, 70F", status: "active" },
  { code: "ST20", name: "63M — NWCO, Post-Angio/PTCA/Stroke, Prediabetes, IR, Sarcopenia, Low Testosterone", patient: "M. Dinesh Reddy, 63M", status: "active" },
  { code: "ST21", name: "Non-Veg, Metabolic Syndrome, IR, Dyslipidemia, NAFLD, Sarcopenia, HTN — Seafood, Low-Carb", patient: "Y. Subba Rao, 55M", status: "active" },
  { code: "ST22", name: "CAD + T2DM (1450 kcal)", patient: null, status: "open" },
  { code: "ST23", name: "T2DM + HTN + Dyslipidemia (Standard)", patient: "R. Sekhar, 48M", status: "active" },
  { code: "ST24", name: "Fatty Liver", patient: "D. Ravi Kumar, 39M", status: "active" },
  { code: "ST25", name: "Geriatric — DM, Sarcopenia, Travel (Veg)", patient: "A. Lakshma Reddy, 74M", status: "active" },
  { code: "ST26", name: "Routine", patient: null, status: "open" },
  { code: "ST27", name: "Sarcopenia + Dyslipidemia + Thyroid (Female)", patient: "P. Vijaya Lakshmi, 51F", status: "active" },
  { code: "ST28", name: "T2DM + Sarcopenia (Non-Veg, Low-Carb)", patient: "J. Sivaramakrishna, 58M", status: "active" },
  { code: "ST29", name: "VIP Anti-Inflammatory (Travel, Veg)", patient: "C. Sridhar, 44M", status: "active" },
  { code: "ST30", name: "Weight Loss + Micronutrient Deficiency (Low-Carb)", patient: "V. Rajeswari, 47F", status: "active" },
  { code: "ST31", name: "Young Male — Night Shift, Sarcopenia, IR", patient: null, status: "open" },
];

export default function SubtypesPage() {
  const [filter, setFilter] = useState<Filter>('all');

  const total = SUBTYPES.length;
  const activeCount = SUBTYPES.filter((s) => s.status === 'active').length;
  const openCount = SUBTYPES.filter((s) => s.status === 'open').length;

  const visible =
    filter === 'all' ? SUBTYPES : SUBTYPES.filter((s) => s.status === filter);

  const tabs: { key: Filter; label: string }[] = [
    { key: 'all', label: `All (${total})` },
    { key: 'active', label: `Active (${activeCount})` },
    { key: 'open', label: `Open (${openCount})` },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="bg-[#0D2B4E] px-4 py-16 text-center md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-5 text-3xl font-extrabold leading-tight text-white md:text-5xl">
            Not One Disease. 23 Metabolic Subtypes.
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
            Two women wear different sarees. Why do they get the same diet? Stop wasting money on superfoods. Find your precise subtype.
          </p>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-[#d4af37]">
            <span className="rounded-full border border-[#d4af37]/40 bg-white/5 px-4 py-1.5">
              {activeCount} Active Patients
            </span>
            <span className="rounded-full border border-[#d4af37]/40 bg-white/5 px-4 py-1.5">
              {openCount} Open Slots
            </span>
            <span className="rounded-full border border-[#d4af37]/40 bg-white/5 px-4 py-1.5">
              First in India
            </span>
          </div>
          <Link
            href="/assessment"
            className="inline-block rounded-full bg-[#f97316] px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-orange-600"
          >
            Book Your Assessment →
          </Link>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="px-4 pt-10">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setFilter(t.key)}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
                filter === t.key
                  ? 'bg-[#0D2B4E] text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* CARDS */}
      <section className="px-4 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <article
              key={s.code}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-lg font-extrabold text-[#0D2B4E]">{s.code}</span>
                {s.status === 'active' ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    Active
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
                    Open
                  </span>
                )}
              </div>
              <h2 className="mb-4 flex-1 text-sm font-semibold leading-snug text-slate-800">
                {s.name}
              </h2>
              <p className="border-t border-slate-100 pt-3 text-sm text-slate-500">
                {s.patient ? s.patient : 'Slot available'}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="px-4 pb-10">
        <p className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-5 text-center text-sm leading-relaxed text-slate-600">
          Patient names altered for privacy. This is a clinical classification framework by Dr. Muddu Surendra Nehru, M.D. Book an assessment for exact diagnosis.
        </p>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-[#0D2B4E] px-4 py-12 text-center">
        <Link
          href="/assessment"
          className="inline-block rounded-full bg-[#f97316] px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-orange-600"
        >
          Find your subtype →
        </Link>
      </section>
    </main>
  );
}