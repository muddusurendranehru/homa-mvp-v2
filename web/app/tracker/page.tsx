import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import AppShell from '@/components/AppShell';
import PatientTracker from '@/components/PatientTracker';
import type { ClinicalBaselineData } from '@/components/ClinicalBaselineStrip';
import { baselineFromRow, getLatestBaselineByClerkUserId } from '@/lib/homa-db';

export const metadata: Metadata = {
  title: 'My 90-Day Journey | HOMA Healthcare Center',
  description:
    'Track meals, earn HOMA Coins, and follow your doctor-designed 90-day metabolic program with HOMA Healthcare Center.',
};

export const dynamic = 'force-dynamic';

export default async function TrackerPage() {
  const { userId } = await auth();

  let baseline:
    | { kind: 'baseline'; data: ClinicalBaselineData }
    | { kind: 'processing' }
    | { kind: 'sign_in' };

  if (!userId) {
    baseline = { kind: 'sign_in' };
  } else {
    const row = await getLatestBaselineByClerkUserId(userId);
    if (row) {
      baseline = { kind: 'baseline', data: baselineFromRow(row) };
    } else {
      baseline = { kind: 'processing' };
    }
  }

  return (
    <AppShell>
      <PatientTracker baseline={baseline} />
    </AppShell>
  );
}
