import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

const HOME_FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does doctor-led diabetes remission at the root cause mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HOMA focuses on working towards metabolic remission at the root with precision sub-typing and doctor-led care, rather than only managing symptoms on the surface.",
      },
    },
    {
      "@type": "Question",
      name: "How can I check my metabolic risk at home for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use HOMA's free online calculators, including the HOMA-IR calculator, to assess diabetes, prediabetes and heart disease risk in about 30 seconds without a hospital visit.",
      },
    },
    {
      "@type": "Question",
      name: "Who leads clinical care at HOMA Healthcare Center?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dr. Muddu Surendra Nehru, MD, Professor of Medicine, leads metabolic medicine in Hyderabad with 38 years of licensed experience and 13 published medical books.",
      },
    },
    {
      "@type": "Question",
      name: "Why do generic diet charts often fail for diabetes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "One-size-fits-all paper plans ignore your metabolic sub-type. HOMA uses phenotyping such as LADA or MODY to build personalised plans suited to Indian lifestyles.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in the 90-day metabolic reset program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The program includes HOMA-IR testing, personalised diet planning, door-to-door follow-up, tracking tools and direct WhatsApp access to your doctor for your 90-day reset.",
      },
    },
    {
      "@type": "Question",
      name: "Are there free patient communities for diabetes and metabolic health?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Join free WhatsApp tribes such as Diabetes Gladiators Hyd, Hypertension Heroes, and Lady Lions Metabolic Health, plus lifestyle volunteer opportunities across Telangana and Andhra Pradesh.",
      },
    },
    {
      "@type": "Question",
      name: "What are the steps in the HOMA care journey?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with a free risk check, then deep lab phenotyping, personalised diet and tracker access, followed by daily follow-up with your care team.",
      },
    },
  ],
} as const;

export const metadata: Metadata = {
  title: "Diabetes Remission Program Hyderabad | Dr. Muddu Surendra Nehru MD | HOMA",
  description:
    "HOMA Healthcare Center offers a doctor-led diabetes remission program in Hyderabad focused on the root cause of diabetes and metabolic health. Free HOMA-IR calculator online, precision sub-typing, and a structured 90-day metabolic reset with personalised Indian diet plans.",
  keywords: [
    "diabetes remission program",
    "root cause of diabetes",
    "best diabetologist Hyderabad",
    "metabolic health clinic",
    "free diabetes risk calculator",
    "HOMA-IR calculator online",
    "metabolic syndrome test",
    "LADA vs Type 2",
    "MODY diabetes treatment",
    "personalized diet plan for Indians",
    "90-day diabetes remission program",
    "diabetes support group India",
    "diabetes reversal program",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FAQ_LD) }}
      />
      <HomePageClient />
    </>
  );
}