import { normalizeMobileDigits } from '@/lib/admin-assessments';

export type PatientTrackerSearchRow = {
  id: string;
  clerk_user_id: string | null;
  mobile_number: string | null;
  email: string | null;
  patient_name: string | null;
  start_date: string | null;
};

export function mapPatientTrackerRow(raw: Record<string, unknown>): PatientTrackerSearchRow {
  const start = raw.start_date;
  let startDate: string | null = null;
  if (start instanceof Date) {
    startDate = start.toISOString().slice(0, 10);
  } else if (start != null && String(start).trim()) {
    startDate = String(start).slice(0, 10);
  }

  return {
    id: String(raw.id),
    clerk_user_id: raw.clerk_user_id != null ? String(raw.clerk_user_id) : null,
    mobile_number: raw.mobile_number != null ? String(raw.mobile_number) : null,
    email: raw.email != null ? String(raw.email) : null,
    patient_name: raw.patient_name != null ? String(raw.patient_name) : null,
    start_date: startDate,
  };
}

export { normalizeMobileDigits };
