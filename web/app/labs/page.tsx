import { Metadata } from 'next';
import NearbyPlacesFinder from '@/components/NearbyPlacesFinder';

export const metadata: Metadata = {
  title: 'Find a Lab | HOMA Healthcare Center',
  description:
    'Locate diagnostic labs and home collection partners near Hyderabad. HOMA Healthcare Center patient resource — not a substitute for your doctor’s orders.',
};

const HOME_COLLECTION_PARTNERS = [
  { label: 'Healthians', href: 'https://www.healthians.com' },
  { label: 'Redcliffe Labs', href: 'https://redcliffelabs.com' },
  { label: 'Orange Health', href: 'https://www.orangehealth.in' },
];

export default function LabsPage() {
  return (
    <NearbyPlacesFinder
      kind="lab"
      pageTitle="Find a Lab"
      intro="Book fasting insulin, HOMA-IR, and metabolic panels at a nearby diagnostic center or via trusted home-collection partners."
      partnersTitle="Home collection partners"
      partners={HOME_COLLECTION_PARTNERS}
    />
  );
}
