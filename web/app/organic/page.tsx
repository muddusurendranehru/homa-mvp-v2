import { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import NearbyPlacesFinder from '@/components/NearbyPlacesFinder';

export const metadata: Metadata = {
  title: 'Organic & Millets | HOMA Healthcare Center',
  description:
    'Find nearby shops for millets, wood-pressed oils, and organic foods near Hyderabad. Educational listing by HOMA Healthcare Center.',
};

const ONLINE_PARTNERS = [
  { label: 'BigBasket — Organic', href: 'https://www.bigbasket.com/cl/fruits-vegetables/organic-fruits-vegetables/', buttonLabel: 'Shop Online' },
  { label: 'Amazon Fresh — Organic', href: 'https://www.amazon.in/fmc/storefront?almBrandId=ctnow', buttonLabel: 'Shop Online' },
  { label: 'Nature\'s Basket', href: 'https://www.naturesbasket.co.in', buttonLabel: 'Shop Online' },
  { label: 'Organic India Store', href: 'https://organicindia.com', buttonLabel: 'Shop Online' },
];

export default function OrganicPage() {
  return (
    <AppShell>
      <section
        className="mx-auto mb-6 max-w-6xl rounded-2xl border border-emerald-200/80 bg-white p-4 shadow-sm sm:p-5"
        aria-label="Partner store highlights"
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <figure className="m-0 flex flex-col gap-2 sm:flex-row sm:items-stretch">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/organic/organic-vendor-max-protein-shelf.webp"
              alt="Healthy snacks at partner stores — millet, jowar, ragi, low GI options on shelf"
              width={800}
              height={1765}
              loading="lazy"
              decoding="async"
              className="aspect-square h-auto w-full max-w-[160px] shrink-0 rounded-xl object-cover object-top sm:max-w-[140px]"
            />
            <figcaption className="flex flex-1 items-center text-sm leading-relaxed text-slate-700">
              Healthy snacks at our partner stores — millet, jowar, ragi, low GI
            </figcaption>
          </figure>
          <figure className="m-0 flex flex-col gap-2 sm:flex-row sm:items-stretch">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/organic/organic-hemp-hearts-superfood.webp"
              alt="Hulled hemp hearts — protein, omegas, minerals"
              width={800}
              height={1765}
              loading="lazy"
              decoding="async"
              className="aspect-square h-auto w-full max-w-[160px] shrink-0 rounded-xl object-cover object-top sm:max-w-[140px]"
            />
            <figcaption className="flex flex-1 items-center text-sm leading-relaxed text-slate-700">
              Hulled hemp hearts — protein, omegas, minerals
            </figcaption>
          </figure>
          <figure className="m-0 flex flex-col gap-2 sm:flex-row sm:items-stretch">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/organic/organic-quinoa-brown-rice-mix.webp"
              alt="Certified organic quinoa + brown rice mix — protein and fibre"
              width={800}
              height={1765}
              loading="lazy"
              decoding="async"
              className="aspect-square h-auto w-full max-w-[160px] shrink-0 rounded-xl object-cover object-top sm:max-w-[140px]"
            />
            <figcaption className="flex flex-1 items-center text-sm leading-relaxed text-slate-700">
              Certified organic quinoa + brown rice mix — protein &amp; fibre
            </figcaption>
          </figure>
          <figure className="m-0 flex flex-col gap-2 sm:flex-row sm:items-stretch">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/organic/organic-roast-foods-jowar-puffs.webp"
              alt="Roasted, not fried — jowar puffs from Roast Foods"
              width={800}
              height={1765}
              loading="lazy"
              decoding="async"
              className="aspect-square h-auto w-full max-w-[160px] shrink-0 rounded-xl object-cover object-top sm:max-w-[140px]"
            />
            <figcaption className="flex flex-1 items-center text-sm leading-relaxed text-slate-700">
              Roasted, not fried — jowar puffs (Roast Foods)
            </figcaption>
          </figure>
          <figure className="m-0 flex flex-col gap-2 sm:flex-row sm:items-stretch">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/organic/organic-24-mantra-chitkabra-rajma.webp"
              alt="Certified organic chitkabra rajma from 24 Mantra"
              width={800}
              height={1765}
              loading="lazy"
              decoding="async"
              className="aspect-square h-auto w-full max-w-[160px] shrink-0 rounded-xl object-cover object-top sm:max-w-[140px]"
            />
            <figcaption className="flex flex-1 items-center text-sm leading-relaxed text-slate-700">
              Certified organic chitkabra rajma (24 Mantra)
            </figcaption>
          </figure>
          <figure className="m-0 flex flex-col gap-2 sm:flex-row sm:items-stretch">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/organic/organic-thai-chilli-coated-peanuts.webp"
              alt="Spicy coated peanuts — read the label, small portions"
              width={800}
              height={1765}
              loading="lazy"
              decoding="async"
              className="aspect-square h-auto w-full max-w-[160px] shrink-0 rounded-xl object-cover object-top sm:max-w-[140px]"
            />
            <figcaption className="flex flex-1 items-center text-sm leading-relaxed text-slate-700">
              Spicy coated peanuts — read the label, small portions
            </figcaption>
          </figure>
        </div>
      </section>

      <NearbyPlacesFinder
        kind="organic"
        pageTitle="Organic & Millets"
        intro="Find nearby shops for millets, wood-pressed oils, and organic foods."
        partnersSectionTitle="Online Partners"
        partners={ONLINE_PARTNERS}
        nearYouSectionTitle="Organic Shops Near You"
      />
    </AppShell>
  );
}
