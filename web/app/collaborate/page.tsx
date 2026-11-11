import type { Metadata } from 'next';
import { CollaborateSection } from '@/components/CollaborateSection';

export const metadata: Metadata = {
  title: 'Collaborate with HOMA Healthcare | Doctors & Students',
  description:
    'Join HOMA Healthcare\'s Door to Door Diabetes Discovery mission. Doctors, health professionals, medical students, and partner labs and stores across India are welcome to collaborate.',
  openGraph: {
    title: 'Collaborate with HOMA Healthcare',
    description:
      'Doctors, health professionals and medical students across India — join HOMA\'s Door to Door Diabetes Discovery mission.',
  },
};

export default function CollaboratePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <CollaborateSection standalone />
    </main>
  );
}
