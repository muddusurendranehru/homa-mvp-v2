/**
 * HOMA patient support WhatsApp (India, wa.me).
 * Set `NEXT_PUBLIC_HOMA_WHATSAPP` in Render / `.env.local` (digits only, e.g. 919963721999).
 */
export const DEFAULT_HOMA_WHATSAPP = '919963721999';

export function getHomaWhatsAppNumber(): string {
  const raw = process.env.NEXT_PUBLIC_HOMA_WHATSAPP?.replace(/\D/g, '') ?? '';
  if (raw.length >= 10) {
    return raw.length === 10 ? `91${raw}` : raw.startsWith('91') ? raw : `91${raw}`;
  }
  return DEFAULT_HOMA_WHATSAPP;
}

export function buildStaffGuideWhatsAppUrl(
  placeName: string,
  kind: 'lab' | 'pharmacy',
): string {
  const text =
    kind === 'lab'
      ? `నాకు సమీపంలో ల్యాబ్ కనుగొనడంలో సహాయం కావాలి / I need help finding a lab near me — ${placeName}`
      : `నాకు సమీపంలో మెడిసిన్ షాప్ కనుగొనడంలో సహాయం కావాలి / I need help finding a pharmacy near me — ${placeName}`;
  return `https://wa.me/${getHomaWhatsAppNumber()}?text=${encodeURIComponent(text)}`;
}
