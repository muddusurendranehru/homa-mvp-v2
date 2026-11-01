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
