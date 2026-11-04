import Image from 'next/image';

/** Intrinsic dimensions for product JPGs; CSS scales to compact card height (h-32). */
const PRODUCT_IMAGE_WIDTH = 800;
const PRODUCT_IMAGE_HEIGHT = 320;
const PRODUCT_IMAGE_SIZES = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';

export type GearItem = {
  title: string;
  doctorsAdvice: string;
  imageSrc: string;
  imageAlt: string;
  /** True when file is placeholder-teal or duplicate — replace under public/images/products/ */
  imagePlaceholder?: boolean;
  href?: string;
  affiliateCta?: 'amazon' | 'check-price';
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
        doctorsAdvice:
          'Tight glycemic control is the cornerstone of diabetes reversal. Track fasting sugar daily with a clinically validated device.',
        imageSrc: '/images/products/glucometer.jpg',
        imageAlt: 'Smart glucometer for daily blood sugar monitoring',
        href: 'https://www.amazon.in/dp/B08CL3H3J7?tag=homaclinics01-21',
        affiliateCta: 'amazon',
      },
      {
        title: 'Omron BP Monitor',
        doctorsAdvice:
          "'White Coat Hypertension' gives false clinic readings. Track your BP at home morning and evening for accurate HTN management.",
        imageSrc: '/images/products/bp-monitor.jpg',
        imageAlt: 'Digital blood pressure monitor with arm cuff on a neutral background',
        href: 'https://www.amazon.in/dp/B01AUH8AWW?tag=homaclinics01-21',
        affiliateCta: 'amazon',
      },
      {
        title: 'Digital Thermometer',
        doctorsAdvice:
          'Essential for monitoring fever and infection, especially for immunocompromised diabetic patients.',
        imageSrc: '/images/products/thermometer.jpg',
        imageAlt: 'White and blue digital thermometer on a light background',
        href: 'https://www.amazon.in/dp/B0074I2XXS?tag=homaclinics01-21',
        affiliateCta: 'amazon',
      },
      {
        title: 'Fingertip Pulse Oximeter',
        doctorsAdvice:
          'Track blood oxygen levels (SpO2) and heart rate, especially for patients with respiratory or cardiac comorbidities.',
        imageSrc: '/images/products/pulse-oximeter.jpg',
        imageAlt: 'Fingertip pulse oximeter measuring SpO2',
        href: 'https://www.amazon.in/dp/B07G45MZM7?tag=homaclinics01-21',
        affiliateCta: 'check-price',
      },
    ],
  },
  {
    id: 'track-activity-sleep',
    title: 'Track Your Activity & Sleep',
    items: [
      {
        title: 'Pebble Qore Fitness Band',
        doctorsAdvice:
          'Track your daily steps, heart rate, SpO2, and sleep stages. Essential for diabetic patients to monitor activity and prevent sedentary lifestyle.',
        imageSrc: '/images/products/fitness-band.jpg',
        imageAlt: 'Pebble Qore fitness band showing health tracking features',
        href: 'https://www.amazon.in/dp/B0FMRKHN4M?tag=homaclinics01-21',
        affiliateCta: 'amazon',
      },
    ],
  },
  {
    id: 'symptom-relief',
    title: 'Symptom Relief & Care',
    items: [
      {
        title: 'Volini Pain Relief Gel / Patches',
        doctorsAdvice:
          'Diabetic neuropathy can cause muscle stiffness and joint pain. Topical gels or sticker patches offer symptomatic relief. Do not rely on them for deep nerve pain.',
        imageSrc: '/images/products/volini-gel.jpg',
        imageAlt: 'Topical pain relief gel tube on a neutral background',
        href: 'https://www.amazon.in/dp/B09H579DQM?tag=homaclinics01-21',
        affiliateCta: 'check-price',
      },
      {
        title: 'Skin Pigmentation Creams',
        doctorsAdvice:
          'Metabolic issues often cause skin pigmentation and dark patches (Acanthosis Nigricans). Use dermatologist-approved creams.',
        imageSrc: '/images/products/skin-cream.jpg',
        imageAlt: 'Moisturizing skin cream jar with natural styling',
        href: 'https://www.amazon.in/dp/B0CD29QZ89?tag=homaclinics01-21',
        affiliateCta: 'check-price',
      },
    ],
  },
  {
    id: 'sleep-recovery',
    title: 'Sleep & Recovery (High Margin)',
    items: [
      {
        title: 'Orthopedic Mattress & Pillows',
        doctorsAdvice:
          'Poor sleep raises cortisol, worsening insulin resistance. Support your spine with an orthopedic mattress and pillow.',
        imageSrc: '/images/products/mattress.jpg',
        imageAlt: 'Quilted orthopedic mattress side profile with brand label',
        href: '#',
        affiliateCta: 'check-price',
      },
      {
        title: 'HEPA Air Purifier',
        doctorsAdvice:
          'Clean air improves oxygen intake and sleep quality. Essential for urban patients with respiratory issues.',
        imageSrc: '/images/products/air-purifier.jpg',
        imageAlt: 'White tower HEPA air purifier in a bright room',
        href: 'https://www.amazon.in/dp/B0C1P65Y4H?tag=homaclinics01-21',
        affiliateCta: 'check-price',
      },
      {
        title: 'Smart Ring (Oura / Ultrahuman / Genxi)',
        doctorsAdvice:
          'Track HRV, deep sleep, and recovery. Popular among health-conscious and Gen Z patients.',
        imageSrc: '/images/products/smart-ring.jpg',
        imageAlt: 'Black smart ring showing internal health sensors',
        href: 'https://www.amazon.in/dp/B0D8HYRS46?tag=homaclinics01-21',
        affiliateCta: 'amazon',
      },
    ],
  },
  {
    id: 'advanced-home-care',
    title: 'Advanced Home Care (Premium)',
    items: [
      {
        title: 'Philips Oxygen Concentrator',
        doctorsAdvice:
          'For patients with severe respiratory comorbidities. Contact clinic for prescription and vendor setup.',
        imageSrc: '/images/products/oxygen-concentrator.jpg',
        imageAlt: 'Medical oxygen cylinders with wall-mounted regulators',
        clinicAction: {
          label: 'Enquire at Clinic',
          href: 'https://wa.me/919963721999?text=Hello%20HOMA%2C%20I%20would%20like%20to%20enquire%20about%20an%20oxygen%20concentrator.',
        },
      },
      {
        title: 'Holter Monitor (24-hr ECG)',
        doctorsAdvice:
          'Continuous heart rhythm monitoring. Do not buy online. Book this as a diagnostic service at HOMA.',
        imageSrc: '/images/products/holter-monitor.jpg',
        imageAlt: 'Portable Holter monitor with ECG leads and electrode patches',
        clinicAction: {
          label: 'Book at Clinic',
          href: 'https://wa.me/919963721999?text=Hello%20HOMA%2C%20I%20would%20like%20to%20book%20a%20Holter%20monitor%20service.',
        },
      },
    ],
  },
];

function GearCardMedia({ item }: { item: GearItem }) {
  return (
    <div className="w-full overflow-hidden bg-slate-100">
      {/* Add real images to public/images/products/ later (placeholder-teal.jpg copies today) */}
      {item.imagePlaceholder ? (
        <span className="sr-only">Placeholder product image — replace in public/images/products/</span>
      ) : null}
      <Image
        src={item.imageSrc}
        alt={item.imageAlt}
        width={PRODUCT_IMAGE_WIDTH}
        height={PRODUCT_IMAGE_HEIGHT}
        sizes={PRODUCT_IMAGE_SIZES}
        className="h-32 w-full object-cover"
      />
    </div>
  );
}

function affiliateLabel(cta: GearItem['affiliateCta']) {
  if (cta === 'check-price') return 'Check Price \u2192';
  return 'View on Amazon \u2192';
}

function GearCard({ item }: { item: GearItem }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-shadow hover:shadow-lg">
      <GearCardMedia item={item} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm italic leading-relaxed text-slate-600">
          Doctor&apos;s Advice: {item.doctorsAdvice}
        </p>
        <div className="mt-5">
          {item.clinicAction ? (
            <a
              href={item.clinicAction.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-xl bg-[#0D9488] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
            >
              {item.clinicAction.label}
            </a>
          ) : (
            <a
              href={item.href ?? '#'}
              {...(item.href && item.href !== '#'
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="flex w-full items-center justify-center rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
            >
              {affiliateLabel(item.affiliateCta)}
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

      <footer
        className="rounded-2xl border border-slate-200 bg-slate-100 px-6 py-5 text-center sm:px-8"
        aria-label="Affiliate disclosure"
      >
        <p className="text-sm leading-relaxed text-slate-600">
          HOMA Health Companion may earn a commission on purchases made through these links. This
          does not affect our clinical recommendations.
        </p>
      </footer>
    </div>
  );
}
