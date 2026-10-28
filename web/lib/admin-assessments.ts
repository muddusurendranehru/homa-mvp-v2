/** Normalize phone input to digits only (India 10-digit or longer with country code). */
export function normalizeMobileDigits(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length > 10 && digits.startsWith('91')) {
    return digits.slice(-10);
  }
  return digits;
}

export type AssessmentSearchRow = {
  id: string;
  patient_name: string | null;
  age: number | null;
  mobile_number: string | null;
  email: string | null;
  created_at: string;
  clerk_user_id: string | null;
};

export function mapAssessmentSearchRow(raw: Record<string, unknown>): AssessmentSearchRow {
  const created = raw.created_at;
  const createdAt =
    created instanceof Date
      ? created.toISOString()
      : created != null
        ? String(created)
        : '';

  const ageRaw = raw.age;
  const age =
    ageRaw == null || ageRaw === ''
      ? null
      : Number.isFinite(Number(ageRaw))
        ? Number(ageRaw)
        : null;

  return {
    id: String(raw.id),
    patient_name: raw.patient_name != null ? String(raw.patient_name) : null,
    age,
    mobile_number: raw.mobile_number != null ? String(raw.mobile_number) : null,
    email: raw.email != null ? String(raw.email) : null,
    created_at: createdAt,
    clerk_user_id: raw.clerk_user_id != null ? String(raw.clerk_user_id) : null,
  };
}
