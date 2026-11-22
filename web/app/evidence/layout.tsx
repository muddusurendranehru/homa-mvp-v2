import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evidence & Publications | Dr. Muddu Surendra Nehru HOMA Gachibowli",
  description:
    "Pre-specified 90-day endpoints, the Dr. Nehru Method, publications, and DPDP consent governance for HOMA Health Clinics.",
  robots: { index: true, follow: true },
};

export default function EvidenceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
