import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import AppShell from '@/components/AppShell';
import PatientTracker from '@/components/PatientTracker';
import { fetchLatestPatientAssessmentByClerkUserId } from '@/lib/homa-db';
import { patientMeFromRow } from '@/lib/patient-me';

export const metadata: Metadata = {
  title: 'My 90-Day Journey | HOMA Healthcare Center',
  description:
    'Track meals, earn HOMA Coins, and follow your doctor-designed 90-day metabolic program with HOMA Healthcare Center.',
};

export const dynamic = 'force-dynamic';

export default async function TrackerPage() {
  const { userId } = await auth();
  let initialPatientMe = null;

  if (userId) {
    try {
      const row = await fetchLatestPatientAssessmentByClerkUserId(userId);
      initialPatientMe = patientMeFromRow(row);
    } catch (err) {
      console.error('[tracker] baseline load failed:', err instanceof Error ? err.message : err);
    }
  }

  return (
    <AppShell>
      <PatientTracker initialPatientMe={initialPatientMe} />
    </AppShell>
  );
}
