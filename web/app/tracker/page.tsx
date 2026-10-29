import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import AppShell from '@/components/AppShell';
import PatientTracker from '@/components/PatientTracker';
import {
  fetchLatestPatientAssessmentByClerkUserId,
  fetchPatientTrackerByClerkUserId,
} from '@/lib/homa-db';
import { fetchTodayDailyLog } from '@/lib/patient-daily-log';
import { buildPatientMeResponse } from '@/lib/patient-me';

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
      // patient_tracker.start_date drives Day X; patient_daily_logs supplies today's habits.
      await fetchPatientTrackerByClerkUserId(userId);
      await fetchTodayDailyLog(userId);
      const assessmentRow = await fetchLatestPatientAssessmentByClerkUserId(userId);
      initialPatientMe = await buildPatientMeResponse(userId, assessmentRow);
    } catch (err) {
      console.error('[tracker] load failed:', err instanceof Error ? err.message : err);
    }
  }

  return (
    <AppShell>
      <PatientTracker initialPatientMe={initialPatientMe} />
    </AppShell>
  );
}
