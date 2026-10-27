import { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import NearbyPlacesFinder from '@/components/NearbyPlacesFinder';

export const metadata: Metadata = {
  title: 'Nearby Medical Shops | HOMA Healthcare Center',
  description:
    'Find chemists and pharmacies near Hyderabad, plus trusted online medicine partners. Educational listing by HOMA Healthcare Center.',
};

const ONLINE_PARTNERS = [
  { label: 'Tata 1mg', href: 'https://www.1mg.com', buttonLabel: 'Order Online' },
  { label: 'PharmEasy', href: 'https://pharmeasy.in', buttonLabel: 'Order Online' },
  { label: 'Apollo Pharmacy', href: 'https://www.apollopharmacy.in', buttonLabel: 'Order Online' },
  { label: 'MedPlus', href: 'https://www.medplusmart.com', buttonLabel: 'Order Online' },
];

export default function PharmacyPage() {
  return (
    <AppShell>
    <NearbyPlacesFinder
      kind="pharmacy"
      pageTitle="Nearby Medical Shops"
      intro="Pick up prescriptions locally or order from verified online pharmacies. Always follow your physician’s advice for medications."
      partnersSectionTitle="Online Partners"
      partners={ONLINE_PARTNERS}
      nearYouSectionTitle="Pharmacies Near You"
    />
    </AppShell>
  );
}
