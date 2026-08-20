import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Publish blog post | HOMA Clinic',
  robots: { index: false, follow: false },
};

export default function AdminBlogLayout({ children }: { children: ReactNode }) {
  return children;
}
