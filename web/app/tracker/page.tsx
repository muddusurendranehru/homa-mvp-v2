import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import AppShell from '@/components/AppShell';
import PatientTracker from '@/components/PatientTracker';
import { lookupLatestBaselineByClerkUserId } from '@/lib/homa-db';
import { patientMeFromRow } from '@/lib/patient-me';

export const metadata: Metadata = {
  title: 'My 90-Day Journey | HOMA Healthcare Center',
  description:
    'Track meals, earn HOMA Coins, and follow your doctor-designed 90-day metabolic program with HOMA Healthcare Center.',
};

export const dynamic = 'force-dynamic';

export default async function TrackerPage() {
  const { isAuthenticated, userId } = await auth();
  let initialPatientMe = null;

  if (isAuthenticated && userId) {
    const lookup = await lookupLatestBaselineByClerkUserId(userId);
    if (lookup.kind === 'found') {
      initialPatientMe = patientMeFromRow(lookup.row);
    } else if (lookup.kind === 'not_found') {
      initialPatientMe = patientMeFromRow(null);
    }
  }

  return (
    <AppShell>
      <PatientTracker initialPatientMe={initialPatientMe} />
    </AppShell>
  );
}
