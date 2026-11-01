import Link from 'next/link';

export type GearItem = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  emoji: string;
};

export const GEAR_CATALOG: GearItem[] = [
  {
    title: 'Apple Watch Ultra',
    description:
      'ECG, fall detection, and precise workout tracking for your daily walks.',
    href: '#',
    linkLabel: 'View on Amazon',
    emoji: '⌚',
  },
  {
    title: 'Continuous Glucose Monitor (CGM)',
    description:
      'Real-time data. See exactly how your food and exercise affect your sugar.',
    href: '#',
    linkLabel: 'View options',
    emoji: '📉',
  },
  {
    title: 'New Balance / Nike Running Shoes',
    description:
      'Protect your joints and feet. Essential for diabetic neuropathy prevention.',
    href: '#',
    linkLabel: 'Shop shoes',
    emoji: '👟',
  },
];

type GearStoreProps = {
  showDirectoryLink?: boolean;
};

export default function GearStore({ showDirectoryLink = true }: GearStoreProps) {
  return (
    <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Recommended gear</h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Tools to track your journey, from your wrist to your shoes.
          </p>
        </div>
        {showDirectoryLink && (
          <Link
            href="/directory"
            className="text-[#0D9488] font-semibold text-sm hover:underline shrink-0"
          >
            View full directory &rarr;
          </Link>
        )}
      </div>

      <p className="text-xs text-slate-500 mb-6">
        HOMA may earn a commission from some links. See our{' '}
        <Link href="/affiliate-disclosure" className="text-[#0D9488] underline">
          affiliate disclosure
        </Link>
        .
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {GEAR_CATALOG.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow bg-slate-50/50"
          >
            <div className="h-40 bg-gradient-to-br from-teal-100 to-emerald-50 relative flex items-center justify-center">
              <span className="text-4xl" aria-hidden>
                {item.emoji}
              </span>
            </div>
            <div className="p-5 bg-white">
              <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
              <p className="text-slate-600 text-sm mt-2 mb-4">{item.description}</p>
              <a
                href={item.href}
                {...(item.href !== '#'
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="text-[#0D9488] font-semibold text-sm hover:underline"
              >
                {item.linkLabel} &rarr;
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
