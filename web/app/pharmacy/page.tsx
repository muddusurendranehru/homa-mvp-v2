import { Metadata } from 'next';
import NearbyPlacesFinder from '@/components/NearbyPlacesFinder';

export const metadata: Metadata = {
  title: 'Nearby Medical Shops | HOMA Healthcare Center',
  description:
    'Find chemists and pharmacies near Hyderabad, plus trusted online medicine partners. Educational listing by HOMA Healthcare Center.',
};

const ONLINE_PHARMACIES = [
  { label: 'Tata 1mg', href: 'https://www.1mg.com' },
  { label: 'PharmEasy', href: 'https://pharmeasy.in' },
  { label: 'Apollo Pharmacy', href: 'https://www.apollopharmacy.in' },
  { label: 'MedPlus', href: 'https://www.medplusmart.com' },
];

export default function PharmacyPage() {
  return (
    <NearbyPlacesFinder
      kind="pharmacy"
      pageTitle="Nearby Medical Shops"
      intro="Pick up prescriptions locally or order from verified online pharmacies. Always follow your physician’s advice for medications."
      partnersTitle="Order medicines online"
      onlineBannerTitle="Order Medicines Online"
      partners={ONLINE_PHARMACIES}
    />
  );
}
