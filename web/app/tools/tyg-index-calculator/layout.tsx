import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free TyG Index Calculator | Early Heart Disease Risk | Dr. Nehru',
  description: 'Calculate your Triglyceride-Glucose (TyG) Index — a powerful early predictor of insulin resistance and heart disease. Free, instant, no signup.',
};

export default function TyGCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

