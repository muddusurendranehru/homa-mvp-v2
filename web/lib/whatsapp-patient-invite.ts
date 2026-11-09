export const PATIENT_TRACKER_INVITE_MESSAGE =
  'Hello! Your HOMA Health Companion app is ready. Click here to access your tracker, appointments, and HOMA coins: https://mvp.homahealthcarecenter.in/tracker';

/** Strip spaces/+91/leading 0; require exactly 10 digits (India). */
export function tenDigitIndianMobile(raw: string): string | null {
  const compact = raw.replace(/\s/g, '').trim();
  let digits = compact.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length > 10) {
    digits = digits.slice(-10);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  if (digits.length !== 10) return null;
  return digits;
}

export function tenDigitFromStoredMobile(stored: string | null | undefined): string | null {
  if (stored == null || !String(stored).trim()) return null;
  return tenDigitIndianMobile(String(stored));
}

export function buildWhatsAppUrlForMobile(raw: string): string | null {
  const mobile = tenDigitIndianMobile(raw);
  if (!mobile) return null;
  return `https://wa.me/91${mobile}?text=${encodeURIComponent(PATIENT_TRACKER_INVITE_MESSAGE)}`;
}
