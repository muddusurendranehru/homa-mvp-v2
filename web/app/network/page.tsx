import type { Metadata } from "next";
import CareNetwork from "@/components/CareNetwork";
import { PARTNERS } from "@/lib/partners";

export const metadata: Metadata = {
  title: "Care Network | Dr. Muddu HOMA Gachibowli",
  description:
    "Consented HOMA partner doctors, nearby labs and pharmacies across India. Call, WhatsApp or open each partner's Google Maps business link.",
};

export default function NetworkPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <CareNetwork partners={PARTNERS} />
    </main>
  );
}
