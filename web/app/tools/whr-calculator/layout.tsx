import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free WHR Calculator | Waist-to-Hip Ratio for PCOS & Heart Risk',
  description: 'Calculate your Waist-to-Hip Ratio (WHR) — a key indicator of hormonal imbalance, PCOS, and cardiovascular risk. Free tool by Dr. Nehru.',
};

export default function WHRCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

