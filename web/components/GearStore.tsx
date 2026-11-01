import Image from 'next/image';
import Link from 'next/link';

export type GearItem = {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  placeholderIcon?: string;
  clinicAction?: {
    label: string;
    href: string;
  };
};

export type GearSection = {
  id: string;
  title: string;
  items: GearItem[];
};

export const GEAR_SECTIONS: GearSection[] = [
  {
    id: 'clinical-monitoring',
    title: 'Clinical Monitoring (High Trust)',
    items: [
      {
        title: 'BeatO Smart Glucometer',
        description:
          "Doctor's Advice: Tight glycemic control is the cornerstone of diabetes reversal. Track fasting sugar daily with a clinically validated device.",
        href: '#',
        linkLabel: 'View options',
        imageSrc: '/images/gear/glucose-meter.jpg',
        imageAlt: 'Glucose meter for daily blood sugar monitoring',
      },
      {
        title: 'Omron BP Monitor',
        description:
          "Doctor's Advice: 'White Coat Hypertension' gives false clinic readings. Track your BP at home morning and evening for accurate HTN management.",
        href: '#',
        linkLabel: 'View options',
        placeholderIcon: '🩺',
      },
      {
        title: 'Digital Thermometer',
        description:
          'Essential for monitoring fever and infection, especially for immunocompromised diabetic patients.',
        href: '#',
        linkLabel: 'View options',
        placeholderIcon: '🌡️',
      },
      {
        title: 'Fingertip Pulse Oximeter',
        description:
          'Track blood oxygen levels (SpO2) and heart rate, especially for patients with respiratory or cardiac comorbidities.',
        href: '#',
        linkLabel: 'View options',
        placeholderIcon: '💓',
      },
    ],
  },
  {
    id: 'symptom-relief',
    title: 'Symptom Relief & Care',
    items: [
      {
        title: 'Volini Pain Relief Gel / Patches',
        description:
          "Doctor's Advice: Diabetic neuropathy can cause muscle stiffness and joint pain. Topical gels or sticker patches offer symptomatic relief. Do not rely on them for deep nerve pain.",
        href: '#',
        linkLabel: 'View options',
        placeholderIcon: '💊',
      },
      {
        title: 'Skin Pigmentation Creams',
        description:
          "Doctor's Advice: Metabolic issues often cause skin pigmentation and dark patches (Acanthosis Nigricans). Use dermatologist-approved creams.",
        href: '#',
        linkLabel: 'View options',
        placeholderIcon: '🧴',
      },
    ],
  },
  {
    id: 'sleep-recovery',
    title: 'Sleep & Recovery (High Margin)',
    items: [
      {
        title: 'Orthopedic Mattress & Pillows',
        description:
          "Doctor's Advice: Poor sleep raises cortisol, worsening insulin resistance. Support your spine with an orthopedic mattress and pillow.",
        href: '#',
        linkLabel: 'View options',
        placeholderIcon: '🛏️',
      },
      {
        title: 'HEPA Air Purifier',
        description:
          'Clean air improves oxygen intake and sleep quality. Essential for urban patients with respiratory issues.',
        href: '#',
        linkLabel: 'View options',
        placeholderIcon: '🌬️',
      },
      {
        title: 'Smart Ring (Oura / Ultrahuman / Genxi)',
        description:
          'Track HRV, deep sleep, and recovery. Popular among health-conscious and Gen Z patients.',
        href: '#',
        linkLabel: 'View options',
        imageSrc: '/images/gear/smartwatch.jpg',
        imageAlt: 'Wearable device for sleep and recovery tracking',
      },
    ],
  },
  {
    id: 'advanced-home-care',
    title: 'Advanced Home Care (Premium)',
    items: [
      {
        title: 'Philips Oxygen Concentrator',
        description:
          'For patients with severe respiratory comorbidities. Contact clinic for prescription and vendor setup.',
        clinicAction: {
          label: 'Enquire at Clinic',
          href: 'https://wa.me/919963721999?text=Hello%20HOMA%2C%20I%20would%20like%20to%20enquire%20about%20an%20oxygen%20concentrator.',
        },
        placeholderIcon: '🫁',
      },
      {
        title: 'Holter Monitor (24-hr ECG)',
        description:
          'Continuous heart rhythm monitoring. Do not buy online. Book this as a diagnostic service at HOMA.',
        clinicAction: {
          label: 'Book at Clinic',
          href: 'https://wa.me/919963721999?text=Hello%20HOMA%2C%20I%20would%20like%20to%20book%20a%20Holter%20monitor%20service.',
        },
        placeholderIcon: '📈',
      },
    ],
  },
];

function GearCardMedia({ item }: { item: GearItem }) {
  if (item.imageSrc) {
    return (
      <div className="relative h-44 w-full bg-slate-100">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt ?? item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex h-44 w-full items-center justify-center bg-gradient-to-br from-teal-100 to-emerald-50"
      aria-hidden
    >
      <span className="text-4xl opacity-90">{item.placeholderIcon ?? '🏥'}</span>
    </div>
  );
}

function GearCard({ item }: { item: GearItem }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-shadow hover:shadow-lg">
      <GearCardMedia item={item} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
        <div className="mt-4">
          {item.clinicAction ? (
            <a
              href={item.clinicAction.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center rounded-xl bg-[#0D9488] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
            >
              {item.clinicAction.label}
            </a>
          ) : (
            <a
              href={item.href ?? '#'}
              {...(item.href && item.href !== '#'
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="text-sm font-semibold text-[#0D9488] hover:underline"
            >
              {item.linkLabel ?? 'View options'} &rarr;
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function GearStore() {
  return (
    <div className="space-y-10">
      {GEAR_SECTIONS.map((section) => (
        <section
          key={section.id}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md sm:p-8"
          aria-labelledby={`gear-section-${section.id}`}
        >
          <h2 id={`gear-section-${section.id}`} className="text-xl font-bold text-slate-900">
            {section.title}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <GearCard key={item.title} item={item} />
            ))}
          </div>
        </section>
      ))}

      <aside
        className="rounded-2xl border-2 border-[#0D9488]/30 bg-teal-50/80 p-6 text-center shadow-sm sm:p-8"
        aria-label="Affiliate disclosure"
      >
        <p className="text-sm font-medium leading-relaxed text-slate-800">
          HOMA Health Companion may earn a small commission on purchases made through these links.
          This does not affect our clinical recommendations.{' '}
          <Link href="/affiliate-disclosure" className="font-semibold text-[#0D9488] underline">
            Full disclosure
          </Link>
        </p>
      </aside>
    </div>
  );
}
