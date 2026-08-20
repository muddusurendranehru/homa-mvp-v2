import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free WHtR Calculator | Waist-to-Height Ratio for Belly Fat Risk',
  description: 'Calculate your Waist-to-Height Ratio (WHtR) — the best predictor of visceral fat and metabolic disease. Free tool by Dr. Nehru, Hyderabad.',
};

export default function WHTRCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
