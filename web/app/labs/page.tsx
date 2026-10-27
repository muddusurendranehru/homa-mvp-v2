import { Metadata } from 'next';
import NearbyPlacesFinder from '@/components/NearbyPlacesFinder';

export const metadata: Metadata = {
  title: 'Find a Lab | HOMA Healthcare Center',
  description:
    'Locate diagnostic labs and home collection partners near Hyderabad. HOMA Healthcare Center patient resource — not a substitute for your doctor’s orders.',
};

const ONLINE_PARTNERS = [
  { label: 'Healthians', href: '#', buttonLabel: 'Book Home Collection' },
  { label: 'Redcliffe Labs', href: '#', buttonLabel: 'Book Home Collection' },
  { label: 'Orange Health', href: '#', buttonLabel: 'Book Home Collection' },
];

export default function LabsPage() {
  return (
    <NearbyPlacesFinder
      kind="lab"
      pageTitle="Find a Lab"
      intro="Book fasting insulin, HOMA-IR, and metabolic panels at a nearby diagnostic center or via trusted home-collection partners."
      partnersSectionTitle="Online Partners"
      partners={ONLINE_PARTNERS}
      nearYouSectionTitle="Labs Near You"
    />
  );
}
