import { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import PatientTracker from '@/components/PatientTracker';

export const metadata: Metadata = {
  title: 'My 90-Day Journey | HOMA Healthcare Center',
  description:
    'Track meals, earn HOMA Coins, and follow your doctor-designed 90-day metabolic program with HOMA Healthcare Center.',
};

export default function TrackerPage() {
  return (
    <AppShell>
      <PatientTracker />
    </AppShell>
  );
}
