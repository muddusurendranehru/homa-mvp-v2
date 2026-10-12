import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Check Your Metabolic Health — Free 30-Second Check | HOMA Healthcare Center',
  description:
    'Free BMI, waist-to-height ratio, and metabolic risk score in 30 seconds. India-specific cutoffs. Book a full blood sample analysis.',
};

export default function HealthCheckLayout({ children }: { children: React.ReactNode }) {
  return children;
}
