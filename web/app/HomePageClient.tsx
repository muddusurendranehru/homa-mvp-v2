"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import { FreeHealthTools, SilentWarning, HowItWorks, AboutDrMuddu, HomeFadeIn } from "@/components/HomeSections";
import WhyHomaVideos from "@/components/WhyHomaVideos";
import OldVsNewModel from "@/components/OldVsNewModel";
import SubtypeBanner from "@/components/SubtypeBanner";
import FeatureShowcase from "@/components/FeatureShowcase";
import GovernmentTrust from "@/components/GovernmentTrust";
import CelebrityRecognitionSection from "@/components/CelebrityRecognitionSection";
import DoctorPeersSection from "@/components/DoctorPeersSection";
import { FreeScreeningCamps, MendTrustAward, VisitClinic } from "@/components/HomaPhotoSections";
import HomaProgramSection from "@/components/HomaProgramSection";
import PatientCommunitiesSection from "@/components/PatientCommunitiesSection";
import HomeHealthHubSection from "@/components/HomeHealthHubSection";

function bookWhatsAppHref(title: string) {
  return `https://wa.me/919963721999?text=${encodeURIComponent(`I WANT THE BOOK: ${title}`)}`;
}

type BookStripItem = {
  title: string;
  cover: string;
  href: string;
  linkLabel: "Buy on Amazon" | "Get the book";
  newTab: boolean;
};

type ScienceSlide = { img: string; title: string; sub: string };

const SCIENCE_SLIDES: ScienceSlide[] = [
  {
    img: "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_900/v1787848746/gllucodeberg1_wlwkq0.jpg",
    title: "Glucose is just the tip of the iceberg",
    sub: "The real danger is hidden — insulin resistance, organ fat, metabolic dysfunction",
  },
  {
    img: "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_900/v1787848745/Malabsorption_complete2_u03x0a.jpg",
    title: "The HOMA Journey to Reversal",
    sub: "Step-by-step metabolic recovery — from diagnosis to remission",
  },
  {
    img: "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_900/v1787849215/pancreas_and_dm1_9_egt9qi.jpg",
    title: "Early vs Late Biomarkers",
    sub: "Catch diabetes risk years before fasting glucose turns abnormal",
  },
  {
    img: "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_900/v1787849213/pancreas_and_dm1_6_tvlmce.jpg",
    title: "Right Way vs Wrong Way",
    sub: "Why treating sugar alone fails — the metabolic approach that actually works",
  },
];

function ScienceSlidesSection({
  slideIdx,
  onSelectSlide,
}: {
  slideIdx: number;
  onSelectSlide: (index: number) => void;
}) {
  const slide = SCIENCE_SLIDES[slideIdx];
  return (
    <section style={{ background: "#07153a", padding: "60px 6%", textAlign: "center" }}>
      <div style={{ fontSize: "13px", color: "#d4af37", fontWeight: 700, letterSpacing: "2px", marginBottom: "8px" }}>THE SCIENCE</div>
      <h2 style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 800, color: "#fff", marginBottom: "32px" }}>
        Why Sugar Alone Is Not the Problem
      </h2>
      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
        <img
          src={slide.img}
          alt={slide.title}
          width={800}
          height={450}
          style={{ width: "100%", height: "auto", borderRadius: "16px", border: "2px solid rgba(212,175,55,0.4)", display: "block" }}
        />
        <div style={{ background: "rgba(6,21,43,0.85)", borderRadius: "0 0 16px 16px", padding: "20px 24px", textAlign: "left" }}>
          <div style={{ fontWeight: 800, fontSize: "18px", color: "#d4af37", marginBottom: "4px" }}>{slide.title}</div>
          <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)" }}>{slide.sub}</div>
        </div>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "16px" }}>
          {SCIENCE_SLIDES.map((_, i) => (
            <button
              key={SCIENCE_SLIDES[i].title}
              type="button"
              onClick={() => onSelectSlide(i)}
              aria-label={`Show slide ${i + 1}: ${SCIENCE_SLIDES[i].title}`}
              style={{ width: "10px", height: "10px", borderRadius: "50%", border: "none", cursor: "pointer", background: i === slideIdx ? "#d4af37" : "rgba(255,255,255,0.25)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const BOOKS_STRIP: BookStripItem[] = [
  {
    title: "BP: The Untold Truth",
    cover: "/images/books/book-bp-untold-truth.webp",
    href: "/books",
    linkLabel: "Get the book",
    newTab: false,
  },
  {
    title: "The HOMA GLP-1 Prescribing Guide",
    cover: "/images/glp1-book.jpg",
    href: "https://www.amazon.in/dp/B0GXYQMJD6",
    linkLabel: "Buy on Amazon",
    newTab: true,
  },
  {
    title: "Bedside Cardiology Mastered",
    cover: "/images/books/book-bedside-cardiology.webp",
    href: bookWhatsAppHref("Bedside Cardiology Mastered"),
    linkLabel: "Get the book",
    newTab: true,
  },
  {
    title: "Your Kidneys Are Not Silent",
    cover: "/images/books/book-kidneys-not-silent.webp",
    href: bookWhatsAppHref("Your Kidneys Are Not Silent"),
    linkLabel: "Get the book",
    newTab: true,
  },
  {
    title: "PCOS and the Insulin-Ovarian Axis",
    cover: "/images/books/book-pcos.webp",
    href: "https://www.amazon.in/dp/B0GYFK9GQS",
    linkLabel: "Buy on Amazon",
    newTab: true,
  },
  {
    title: "The Rice-Insulin-Belly Axis",
    cover: "/images/books/book-rice-insulin-belly.webp",
    href: "https://www.amazon.in/dp/B0GX2WNHYT",
    linkLabel: "Buy on Amazon",
    newTab: true,
  },
  {
    title: "TELMA TRAP",
    cover: "/images/books/book-telma-trap.webp",
    href: "https://www.amazon.in/dp/B0GXQGWCFB",
    linkLabel: "Buy on Amazon",
    newTab: true,
  },
  {
    title: "Doctors Said Normal",
    cover: "/images/books/book-doctors-said-normal.webp",
    href: "https://www.amazon.in/dp/B0GX34T976",
    linkLabel: "Buy on Amazon",
    newTab: true,
  },
  {
    title: "SARS COVID 19 (with Dr M.V. Ramana Rao)",
    cover: "/images/books/book-sars-covid.webp",
    href: "https://www.amazon.in/dp/B0979RG1YR",
    linkLabel: "Buy on Amazon",
    newTab: true,
  },
  {
    title: "The COVID 19 Handbook",
    cover: "/images/books/book-covid-handbook.webp",
    href: "https://www.amazon.in/dp/1639976108",
    linkLabel: "Buy on Amazon",
    newTab: true,
  },
];

export default function HomePageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Countdown to tonight 7:00 PM
  const [countdown, setCountdown] = useState({ hrs: "00", mins: "00", secs: "00", started: false });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(19, 0, 0, 0);
      if (now >= target) {
        setCountdown({ hrs: "00", mins: "00", secs: "00", started: true });
        return;
      }
      const diff = target.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown({
        hrs: String(h).padStart(2, "0"),
        mins: String(m).padStart(2, "0"),
        secs: String(s).padStart(2, "0"),
        started: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const faqs = [
    {
      q: "How much does the HOMA 90-day program cost?",
      a: "₹13,500 for the full 90-day metabolic care program. This includes HOMA-IR testing, TyG Index, NutriBot AI access, D·D·D home visits, and all follow-ups. Others charge ₹20,000–₹25,000 for less.",
    },
    {
      q: "What is D·D·D — Door to Door Diabetes Delivery?",
      a: "India's first at-home metabolic care program. Dr. Muddu's team comes to your home in Gachibowli, Ameerpet, Bachupally, and Patancheru for assessment, monitoring, and follow-up. No need to visit the clinic every time.",
    },
    {
      q: "What is HOMA-IR and why does it matter?",
      a: "HOMA-IR (Homeostatic Model Assessment of Insulin Resistance) measures how insulin-resistant your cells are. It detects diabetes risk years before fasting glucose becomes abnormal. HOMA Healthcare is the first clinic in India to offer this free online.",
    },
    {
      q: "Can Type 2 Diabetes be improved?",
      a: "Many patients, especially those diagnosed recently, can improve blood sugar control and sometimes need fewer medicines with nutrition, movement, and regular HOMA-IR monitoring under medical supervision. Results vary from person to person, and no outcome is guaranteed.",
    },
    {
      q: "Do I need to stop my medications immediately?",
      a: "No. Medications are reduced gradually under Dr. Muddu's supervision as your metabolic markers improve. Never stop diabetes medication without medical guidance.",
    },
    {
      q: "Is this program suitable for PCOS?",
      a: "Yes. PCOS is driven by insulin resistance in most cases. The same HOMA-IR based approach used for diabetes can help address insulin resistance in PCOS. Progress is reviewed regularly with Dr. Muddu.",
    },
    {
      q: "Which areas in Hyderabad do you serve?",
      a: "Gachibowli, Ameerpet, Bachupally, Patancheru, Kondapur, Madhapur, and surrounding areas. The clinic is located in Gachibowli. D·D·D home visits cover a 20 km radius.",
    },
  ];

  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlideIdx((i) => (i + 1) % SCIENCE_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const [quizAge, setQuizAge] = useState("");
  const [quizWaist, setQuizWaist] = useState("");
  const [quizResult, setQuizResult] = useState<string | null>(null);
  const checkOrganAge = () => {
    const a = parseInt(quizAge), w = parseInt(quizWaist);
    if (!a || !w) return;
    const risk = w > (a < 40 ? 85 : 90) ? "high" : w > 80 ? "moderate" : "low";
    if (risk === "high") setQuizResult(`⚠️ Your organs may be ${Math.round(a * 0.25 + 10)}+ years older. Book a free assessment now.`);
    else if (risk === "moderate") setQuizResult(`🔶 Moderate risk detected. A HOMA-IR test is recommended.`);
    else setQuizResult(`✅ Low risk. Keep monitoring with our free HOMA-IR tool.`);
  };

  return (
    <>
      <HomeFadeIn />
      {/* HOME HERO START */}
      <HomeHero />
      <FreeHealthTools />
      <WhyHomaVideos />
      <OldVsNewModel />
      <HomaProgramSection />
      <HowItWorks />
      <PatientCommunitiesSection />
      <FreeScreeningCamps />
      <MendTrustAward />
      <SubtypeBanner />
      {/* HOME HERO END */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-bold text-teal-700 uppercase tracking-wider mb-2">
            Free Clinical Tool
          </p>
          <h2 className="text-3xl font-extrabold text-[#1e3a8a] mb-4">
            Check your metabolic score
          </h2>
          <p className="text-slate-600 mb-6">
            Full clinical assessment — HOMA-IR, TyG Index, BMI, waist-to-height ratio, and the Dr. Nehru Method CWR. India-specific cutoffs.
          </p>
         <Link
  href="/tools"
  className="inline-block bg-[#f97316] text-white font-bold px-6 py-3 rounded-full hover:bg-orange-600 transition-colors"
>
  Open the Analyzer →
</Link>
        </div>
      </section>
            {/* FEATURE SHOWCASE */}
      <FeatureShowcase />
      {/* GOV LEADERS START */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", padding: "16px 4% 0", background: "#07153a" }}>
        <a href="/normal-values" style={{ display: "inline-block", background: "#d4af37", color: "#07153a", fontWeight: 700, fontSize: "14px", padding: "12px 16px", borderRadius: "999px", textDecoration: "none", boxShadow: "0 8px 18px rgba(0,0,0,0.25)" }}>Know your cutoff values</a>
        <a href="/daily-goals" style={{ display: "inline-block", background: "#ffffff", color: "#07153a", fontWeight: 700, fontSize: "14px", padding: "12px 16px", borderRadius: "12px", textDecoration: "none", border: "2px solid #d4af37", maxWidth: "220px" }}>Get good health tips and coins. Daily goals.</a>
      </div>
      <section style={{ background: "#07153a", padding: "44px 5% 40px", borderTop: "4px solid #d4af37", borderBottom: "4px solid #d4af37", textAlign: "center" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "#d4af37", color: "#07153a", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", padding: "6px 14px", borderRadius: "20px", marginBottom: "16px" }}>
            GOVERNMENT OF TELANGANA &middot; PROOF OF CONCEPT
          </div>
          <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 700, lineHeight: 1.25, margin: "0 auto 28px", color: "#ffffff", maxWidth: "860px" }}>
            Minister directs HOMA&apos;s 50-Patient Diabetes Remission Pilot
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center", alignItems: "flex-start", marginBottom: "28px" }}>
            {[
              { src: "/images/cm-revanth-reddy-book-homa.jpg", alt: "Hon'ble Chief Minister Sri A. Revanth Reddy receiving Dr. Muddu's book BP: The Untold Truth", caption: "Hon\u2019ble Chief Minister Sri A. Revanth Reddy receiving Dr. Muddu\u2019s book \u2018BP: The Untold Truth\u2019" },
              { src: "/images/minister-sridhar-babu-homa.jpg", alt: "Hon'ble Minister Sri Duddilla Sridhar Babu receiving BP: The Untold Truth at HOMA Healthcare Center", caption: "Hon\u2019ble Minister Sri Duddilla Sridhar Babu, Government of Telangana, receiving \u2018BP: The Untold Truth\u2019 at HOMA Healthcare Center." },
            ].map((p) => (
              <figure key={p.src} style={{ flex: "1 1 300px", maxWidth: "460px", margin: 0 }}>
                <img
                  src={p.src}
                  alt={p.alt}
                  style={{ display: "block", width: "100%", aspectRatio: "3 / 4", objectFit: "cover", objectPosition: "center", borderRadius: "12px", border: "3px solid #d4af37" }}
                />
                <figcaption style={{ color: "#cfd8e3", fontSize: "14px", lineHeight: 1.5, marginTop: "10px" }}>
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <p style={{ fontSize: "17px", lineHeight: 1.6, color: "#cfd8e3", margin: "0 auto 22px", maxWidth: "760px" }}>
            Hon&apos;ble Minister for IT, Industries &amp; Commerce, Sri Duddilla Sridhar Babu, has directed the District Collector, Peddapalli, to take up Dr. Muddu&apos;s 50-patient diabetes remission pilot in Manthani.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
            <a
              href="/poc.html"
              style={{ display: "inline-block", background: "#d4af37", color: "#07153a", fontWeight: 700, fontSize: "16px", padding: "14px 28px", borderRadius: "8px", textDecoration: "none" }}
            >
              See the Government Pilot &rarr;
            </a>
            <a
              href="/cme-2026.html"
              style={{ display: "inline-block", background: "#d4af37", color: "#07153a", fontWeight: 700, fontSize: "16px", padding: "14px 28px", borderRadius: "8px", textDecoration: "none" }}
            >
              CME 2026 Conference Photos &rarr;
            </a>
            <a
              href="/books"
              style={{ display: "inline-block", background: "#d4af37", color: "#07153a", fontWeight: 700, fontSize: "16px", padding: "14px 28px", borderRadius: "8px", textDecoration: "none" }}
            >
              Our Books &rarr;
            </a>
          </div>
          {/* Hero buttons (moved from old Chiranjeevi hero) */}
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="https://wa.me/919963721999?text=I%20want%20to%20book%20an%20appointment%20at%20HOMA%20Clinic"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "15px",
                fontWeight: 600,
                padding: "14px 30px",
                borderRadius: "6px",
                textDecoration: "none",
                background: "#F5A623",
                color: "#1a1a1a",
              }}
            >
              📋 Book An Appointment
            </Link>
            <a
              href="https://wa.me/919963721999"
              style={{
                fontSize: "15px",
                fontWeight: 600,
                padding: "14px 30px",
                borderRadius: "6px",
                textDecoration: "none",
                background: "#25D366",
                color: "#fff",
              }}
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
      {/* GOV LEADERS END */}
      {/* FreeHealthTools duplicate removed — lives under HomeHero */}
      {/* THE SILENT WARNING (migrated Central Obesity card) */}
      <SilentWarning />

      {/* DDDD DIRECTION BLOCK START */}
      <section style={{ background: "linear-gradient(#ffffff, #e8f7ee)", borderTop: "4px solid #16a34a", color: "#1a2e22", padding: "40px 6%", textAlign: "center" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "28px" }}>
        <div style={{ flex: "3 1 420px", minWidth: 0 }}>
          <h2 style={{ fontFamily: "Montserrat, Arial, sans-serif", fontSize: "clamp(26px, 4.6vw, 42px)", fontWeight: 800, color: "#14532d", margin: "0 0 12px", lineHeight: 1.2 }}>
            Sugar still high after years of tablets?
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.6, margin: "0 0 14px", color: "#1a2e22" }}>
            Tired of diet charts that don&apos;t work and hours of confusing diet videos?
          </p>
          <p style={{ fontSize: "20px", fontWeight: 800, color: "#16a34a", margin: "0 0 14px" }}>
            DDDD: Door to Door Diabetes Delivery
          </p>
          <p style={{ fontSize: "17px", lineHeight: 1.6, margin: "0 auto 22px", maxWidth: "680px", color: "#1a2e22" }}>
            A doctor&apos;s prescription, 30 different diet sheets for 30 days on your phone, and follow-up until your HbA1c comes down.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <a href="/tools" style={{ display: "inline-block", background: "#16a34a", color: "#ffffff", fontWeight: 800, fontSize: "17px", padding: "16px 30px", borderRadius: "10px", textDecoration: "none", boxShadow: "0 6px 16px rgba(22,163,74,0.25)" }}>
              Check your sugar risk online, free
            </a>
            <a href="https://wa.me/919963721999?text=I%20want%20to%20send%20my%20reports%20for%20the%20DDDD%2030-day%20diet%20plan" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#ffffff", color: "#16a34a", fontWeight: 800, fontSize: "17px", padding: "14px 28px", borderRadius: "10px", textDecoration: "none", border: "2px solid #16a34a" }}>
              Send reports on WhatsApp
            </a>
          </div>
        </div>
        <figure style={{ flex: "2 1 280px", margin: 0, minWidth: 0 }}>
          <img src="/images/camp-checkup.jpg" alt="Metabolic fitness check-up camp by Dr M Surendra Nehru" style={{ display: "block", width: "100%", maxHeight: "420px", objectFit: "cover", borderRadius: "14px", boxShadow: "0 10px 26px rgba(20,83,45,0.18)" }} />
          <figcaption style={{ fontSize: "13px", color: "#14532d", marginTop: "8px", textAlign: "center" }}>
            Our metabolic fitness check-up camp
          </figcaption>
        </figure>
        </div>
      </section>
      {/* DDDD DIRECTION BLOCK END */}
      {/* 30-DAY DIET HERO START */}
      <section style={{ background: "#FDF3DC", padding: "40px 6%", textAlign: "center" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Montserrat, Arial, sans-serif", fontSize: "clamp(26px, 4.5vw, 40px)", fontWeight: 800, color: "#0D3B5E", margin: "0 0 12px", lineHeight: 1.2 }}>
            Your Reports. Your Diet. 30 Days.
          </h2>
          <p lang="te" style={{ fontSize: "18px", color: "#0D3B5E", margin: "0 0 12px", lineHeight: 1.6 }}>
            మీ రిపోర్ట్స్ ఆధారంగా మీకోసమే తయారైన 30 రోజుల డైట్ — డాక్టర్ పర్యవేక్షణలో
          </p>
          <p style={{ fontSize: "17px", color: "#333", margin: "0 auto 22px", lineHeight: 1.6, maxWidth: "680px" }}>
            A Professor of Medicine reads your HbA1c, HOMA-IR and kidney reports, then gives you a personal Indian meal plan you follow day by day on your phone.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "20px" }}>
            <a href="/tools" style={{ display: "inline-block", background: "#F5A623", color: "#0D3B5E", fontWeight: 800, fontSize: "16px", padding: "14px 26px", borderRadius: "10px", textDecoration: "none" }}>
              Check Your Health Free
            </a>
            <a href="https://wa.me/919963721999" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#25D366", color: "#fff", fontWeight: 800, fontSize: "16px", padding: "14px 26px", borderRadius: "10px", textDecoration: "none" }}>
              WhatsApp Dr. Surendra
            </a>
          </div>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#0D3B5E", margin: 0 }}>
            23 condition-specific diet plans · 30-day daily tracker · Telugu support
          </p>
        </div>
      </section>
      {/* 30-DAY DIET HERO END */}

      {/* DPIIT CERTIFICATE */}
      <section style={{ background: "#ffffff", padding: "28px 6%", textAlign: "center" }}>
        <img
          src="/images/dpiit-certificate.jpg"
          alt="DPIIT certificate of recognition for HOMA Clinics Private Limited, DIPP275722"
          style={{ display: "block", maxWidth: "280px", width: "100%", height: "auto", margin: "0 auto" }}
        />
        <p style={{ margin: "10px 0 0", fontSize: "14px", color: "#333" }}>
          DPIIT recognised. Certificate DIPP275722.
        </p>
      </section>

      {/* SEMINAR BANNER — sugar.fit style, full bold section */}
      <div style={{
        width: "100%",
        background: "linear-gradient(135deg, #07153a 0%, #0f2557 40%, #1a3a8f 70%, #07153a 100%)",
        padding: "36px 20px 32px",
        textAlign: "center",
        borderBottom: "3px solid #d4af37",
      }}>
        {/* LIVE badge */}
        <div style={{ marginBottom: "10px" }}>
          <span style={{
            background: "#d4af37",
            color: "#07153a",
            fontSize: "12px",
            fontWeight: 900,
            letterSpacing: "0.12em",
            padding: "4px 16px",
            borderRadius: "20px",
            textTransform: "uppercase",
          }}>🔴 FREE · TONIGHT ONLY</span>
        </div>

        {/* Main heading */}
        <h2 style={{
          color: "#d4af37",
          fontSize: "clamp(22px, 4vw, 40px)",
          fontWeight: 900,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          margin: "0 0 4px",
          lineHeight: 1.15,
        }}>
          Free Webinar Tonight — 7 PM
        </h2>
        <p style={{ color: "#ffffff", fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 400, margin: "0 0 20px", opacity: 0.85 }}>
          Dr. Muddu Surendra Nehru MD · Today 7 PM · Join for just 20 Minutes · Free · No Sign-up
        </p>

        {/* Countdown */}
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(12px, 3vw, 36px)", marginBottom: "16px" }}>
          {[
            { val: countdown.hrs, label: "Hrs" },
            { val: countdown.mins, label: "Mins" },
            { val: countdown.secs, label: "Secs" },
          ].map(({ val, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(212,175,55,0.4)",
                borderRadius: "10px",
                padding: "10px 20px",
                minWidth: "72px",
              }}>
                <span
                  suppressHydrationWarning
                  style={{ color: "#ffffff", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 700, lineHeight: 1 }}
                >
                  {val}
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: "4px 0 0", letterSpacing: "0.06em" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Seats left */}
        <p style={{
          display: "inline-block",
          background: "rgba(212,175,55,0.15)",
          border: "1px solid rgba(212,175,55,0.5)",
          color: "#d4af37",
          fontSize: "14px",
          fontWeight: 600,
          padding: "6px 20px",
          borderRadius: "20px",
          marginBottom: "24px",
        }}>
          <span suppressHydrationWarning>
            {countdown.started ? "🟢 Webinar is LIVE now!" : "⚡ Limited seats — Register free"}
          </span>
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
          <a href="/seminar" style={{
            backgroundColor: "#d4af37",
            color: "#07153a",
            padding: "14px 36px",
            borderRadius: "10px",
            fontWeight: 800,
            fontSize: "clamp(14px, 2vw, 17px)",
            textDecoration: "none",
            display: "inline-block",
            boxShadow: "0 4px 20px rgba(212,175,55,0.45)",
            letterSpacing: "0.02em",
          }}>
            👉 Join Webinar Free
          </a>
          <a href="/tools" style={{
            backgroundColor: "transparent",
            color: "#ffffff",
            padding: "14px 36px",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "clamp(14px, 2vw, 17px)",
            textDecoration: "none",
            display: "inline-block",
            border: "2px solid rgba(255,255,255,0.55)",
          }}>
            Check Your Risk Free →
          </a>
        </div>
      </div>

      {/* 3 HOOK LINES — English · Hindi · Telugu */}
      <div style={{
        background: "#07153a",
        borderBottom: "1px solid rgba(212,175,55,0.2)",
        padding: "0",
      }}>
        {[
          {
            emoji: "🇬🇧",
            text: "Reverse Type 2 Diabetes in 90 Days — Science-Based, No Gimmicks",
            href: "/assessment",
            lang: "EN",
          },
          {
            emoji: "🇮🇳",
            text: "शुगर को जड़ से खत्म करें — 90 दिनों में, बिना दवाई के",
            href: "/seminar",
            lang: "HI",
          },
          {
            emoji: "🌿",
            text: "మధుమేహాన్ని 90 రోజుల్లో తగ్గించుకోండి — డా. ముద్దు తో",
            href: "/tools",
            lang: "TE",
          },
        ].map(({ emoji, text, href, lang }) => (
          <a
            key={lang}
            href={href}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "13px 24px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              textDecoration: "none",
              background: "transparent",
              transition: "background 0.2s",
              gap: "12px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,175,55,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ fontSize: "16px", flexShrink: 0 }}>{emoji}</span>
            <span style={{
              color: "#ffffff",
              fontSize: "clamp(13px, 1.8vw, 15px)",
              fontWeight: 500,
              flex: 1,
              lineHeight: 1.4,
            }}>{text}</span>
            <span style={{
              color: "#d4af37",
              fontSize: "12px",
              fontWeight: 700,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              <span style={{
                background: "rgba(212,175,55,0.15)",
                border: "1px solid rgba(212,175,55,0.4)",
                borderRadius: "4px",
                padding: "2px 6px",
                fontSize: "10px",
                letterSpacing: "0.05em",
              }}>{lang}</span>
              →
            </span>
          </a>
        ))}
      </div>

      {/* SCIENCE SLIDES CAROUSEL */}
      <ScienceSlidesSection slideIdx={slideIdx} onSelectSlide={setSlideIdx} />

      {/* TRUST STRIP */}
      <div
        style={{
          background: "#0D2B4E",
          padding: "20px 6%",
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
        }}
      >
        {[
          ["5,000+", "Patients Treated"],
          ["90", "Day Reversal Program"],
          ["34", "Years Clinical Experience"],
          ["11", "Books Published"],
        ].map(([num, lbl], i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "0 32px",
              borderRight: "1px solid rgba(255,255,255,0.1)",
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: 600, color: "#F5A623" }}>{num}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>{lbl}</div>
          </div>
        ))}
        <div
          style={{
            marginLeft: "auto",
            fontSize: "12px",
            color: "rgba(255,255,255,0.3)",
            whiteSpace: "nowrap",
            paddingLeft: "32px",
          }}
        >
          ⭐ Appreciated by Megastar Chiranjeevi &nbsp;·&nbsp; Trusted at ISB · IIIT · IKEA Gachibowli
        </div>
      </div>

      <CelebrityRecognitionSection />
      {/* ABOUT DR. MUDDU (details moved from the old teal header bar) */}
      <AboutDrMuddu />
      <VisitClinic />

      {/* ORGAN AGE SECTION */}
      <section id="organ-age" style={{ background: "#06152b", padding: "60px 6%", textAlign: "center" }}>
        <div style={{ fontSize: "13px", color: "#d4af37", fontWeight: 700, letterSpacing: "2px", marginBottom: "8px" }}>THE SILENT TRUTH</div>
        <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, color: "#fff", marginBottom: "12px", lineHeight: 1.2 }}>
          You Look 30.<br />
          <span style={{ color: "#d4af37" }}>Your Organs May Be 55.</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "16px", marginBottom: "40px", maxWidth: "560px", margin: "0 auto 40px" }}>
          Normal weight. Normal sugar. Normal BP. Yet your heart, liver and kidneys are aging faster than you think. This is called Normal Weight Obesity — and most doctors miss it.
        </p>
        <div style={{ display: "flex", gap: "40px", alignItems: "center", justifyContent: "center", flexWrap: "wrap", maxWidth: "1000px", margin: "0 auto" }}>
          <img src="https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_600/v1787847084/gokinsifde1_epuelu.jpg" alt="Biological Age 30 Organ Age 55" style={{ width: "100%", maxWidth: "340px", borderRadius: "20px", border: "2px solid #d4af37" }} />
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "20px", padding: "32px", maxWidth: "380px", width: "100%", textAlign: "left" }}>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>🔬 Check Your Organ Age</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "24px" }}>Takes 30 seconds. Free. No signup.</div>
            {quizResult ? (
              <div>
                <div style={{ background: "rgba(212,175,55,0.15)", border: "1px solid #d4af37", borderRadius: "12px", padding: "16px", color: "#fff", fontSize: "15px", fontWeight: 600, marginBottom: "16px" }}>{quizResult}</div>
                <a href="https://wa.me/919963721999" target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: "15px", padding: "14px", borderRadius: "10px", textDecoration: "none", textAlign: "center" }}>💬 WhatsApp Dr. Muddu — Free</a>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", display: "block", marginBottom: "6px" }}>Your Age</label>
                  <input type="number" placeholder="e.g. 35" value={quizAge} onChange={e => setQuizAge(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: "16px", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", display: "block", marginBottom: "6px" }}>Waist Size (cm)</label>
                  <input type="number" placeholder="e.g. 88" value={quizWaist} onChange={e => setQuizWaist(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: "16px", boxSizing: "border-box" }} />
                </div>
                <button onClick={checkOrganAge} style={{ background: "linear-gradient(135deg, #d4af37, #b8941f)", color: "#06152b", fontWeight: 800, fontSize: "16px", padding: "14px", borderRadius: "10px", border: "none", cursor: "pointer" }}>
                  Check My Organ Age →
                </button>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", textAlign: "center" }}>Indian waist cutoffs: Women &lt;85cm · Men &lt;96cm</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PATIENT STORIES */}
      <section style={{ padding: "72px 6%", background: "#f8f7f3" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "36px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#00A896",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "8px",
              }}
            >
              Patient Stories
            </div>
            <h2
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 500,
                color: "#0D2B4E",
                lineHeight: 1.1,
              }}
            >
              The HOMA
              <br />
              <em style={{ fontStyle: "italic", color: "#00A896" }}>Experience</em>
            </h2>
            <p style={{ fontSize: "14px", color: "#888", fontWeight: 300, marginTop: "8px" }}>
              Real patients. Real results. Their words, not ours.
            </p>
          </div>
          <Link
            href="/testimonials"
            style={{ fontSize: "14px", color: "#0D2B4E", fontWeight: 500, textDecoration: "none" }}
          >
            See all stories →
          </Link>
        </div>
                <div style={{ marginTop: "40px", marginBottom: "8px" }}>
          <div
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 600,
              color: "#00A896",
              textAlign: "center",
              lineHeight: 1,
            }}
          >
            500+
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#666",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginTop: "8px",
              textAlign: "center",
            }}
          >
            patients treated · real results
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "12px",
            marginTop: "32px",
          }}
        >
          {[
            { img: "/images/patients/pt-01.jpg", role: "✅ Diabetes Reversed · Hyderabad" },
            { img: "/images/patients/pt-02.jpg", role: "✅ Central Obesity Reversed · Gachibowli" },
            { img: "/images/patients/pt-03.jpg", role: "✅ −12 kg · No Medication · Ameerpet" },
            { img: "/images/patients/pt-04.jpg", role: "✅ Pre-Diabetes Reversed · Bachupally" },
            { img: "/images/patients/pt-05.jpg", role: "✅ Diabetes Reversed · Kondapur" },
            { img: "/images/patients/pt-06.jpg", role: "✅ −18 kg · Off Insulin · Madhapur" },
            { img: "/images/patients/pt-07.jpg", role: "✅ HbA1c Normal · No Surgery · Patancheru" },
            { img: "/images/patients/pt-08.jpg", role: "✅ Obesity Reversed · Telangana" },
          ].map((p) => (
            <div
              key={p.role}
              onClick={() => window.open("/testimonials", "_blank")}
              style={{
                position: "relative",
                borderRadius: "14px",
                overflow: "hidden",
                aspectRatio: "3/4",
                cursor: "pointer",
                background: "#111",
              }}
            >
              <img
                src={p.img}
                alt={p.role}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 12px" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#fff" }}>{p.role}</div>
              </div>
            </div>
          ))}
        </div>
              </section>

      {/* REAL CAMPS START */}
      <section style={{ padding: "64px 6%", background: "#ffffff" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "#00A896", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
            HOMA Camps
          </div>
          <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 500, color: "#0D2B4E", lineHeight: 1.1, margin: "0 0 10px" }}>
            Real Camps. Real Checks. <em style={{ fontStyle: "italic", color: "#00A896" }}>Not AI.</em>
          </h2>
          <p style={{ fontSize: "15px", color: "#666", fontWeight: 300, margin: 0 }}>
            Waist, calf and BP checks at our HOMA camps — every photo taken by our team.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(140px, 45%), 1fr))", gap: "12px", maxWidth: "1200px", margin: "0 auto" }}>
          {Array.from({ length: 14 }, (_, i) => `/images/camp-${String(i + 1).padStart(2, "0")}.jpg`).map((src) => (
            <img
              key={src}
              src={src}
              alt="HOMA camp health check"
              loading="lazy"
              style={{ width: "100%", aspectRatio: "3 / 4", objectFit: "cover", borderRadius: "12px", display: "block", background: "#f1f1f1" }}
            />
          ))}
        </div>
      </section>
      {/* REAL CAMPS END */}

      {/* AWARDS SECTION */}
      <section style={{ background: "#f8f5ee", padding: "72px 6%" }}>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "#c0392b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Honours &amp; Awards</div>
          <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 500, color: "#0D2B4E", lineHeight: 1.2 }}>
            Recognised. Awarded.<br /><em style={{ color: "#c0392b", fontStyle: "italic" }}>By Those Who Know Best.</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", maxWidth: "1060px", margin: "0 auto" }}>
          {[
            { img: "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_600,h_440,c_fill,g_face/v1786811121/IMG20250615191438_tzoubz.jpg", badge: "🏆 Award" },
            { img: "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_600,h_440,c_fill,g_face/v1786811118/IMG20250615190734_qxnrs1.jpg", badge: "🏆 Award" },
            { img: "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_600,h_440,c_fill,g_face/v1786811239/IMG20250611113136_fpr7cd.jpg", badge: "🤝 Peer Recognition" },
            { img: "https://res.cloudinary.com/drhsco04l/image/upload/q_auto,f_auto,w_600,h_440,c_fill,g_face/v1786811232/IMG20250611110911_hhhhvh.jpg", badge: "🎤 Lecture" },
          ].map((item, i) => (
            <div key={i} style={{ borderRadius: "14px", overflow: "hidden", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #ece9e1" }}>
              <div style={{ position: "relative" }}>
                <img src={item.img} alt={item.badge} style={{ width: "100%", height: "260px", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(192,57,43,0.88)", borderRadius: "20px", padding: "4px 12px", fontSize: "11px", fontWeight: 700, color: "#fff" }}>
                  {item.badge}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DoctorPeersSection />

      <GovernmentTrust />

      {/* POC LINK START */}
      <section style={{ background: "#07153a", padding: "40px 6%", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <a
            href="/poc.html"
            style={{ display: "inline-block", background: "#d4af37", color: "#07153a", fontWeight: 700, fontSize: "18px", padding: "16px 32px", borderRadius: "8px", textDecoration: "none" }}
          >
            &#127963;&#65039; Government Proof of Concept: 50-Patient Pilot &rarr;
          </a>
          <a
            href="/cme-2026.html"
            style={{ display: "inline-block", background: "#d4af37", color: "#07153a", fontWeight: 700, fontSize: "18px", padding: "16px 32px", borderRadius: "8px", textDecoration: "none" }}
          >
            CME 2026 Conference Photos &rarr;
          </a>
        </div>
      </section>
      {/* POC LINK END */}

      {/* 5 Ps — WHY HOMA IS DIFFERENT */}
      <section style={{ background: "#f8f7f3", padding: "72px 6%" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "#00A896", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>
            The HOMA Difference
          </div>
          <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 500, color: "#0D2B4E", lineHeight: 1.2 }}>
            The 5 Ps — What No One Else Offers
          </h2>
          <p style={{ fontSize: "15px", color: "#888", fontWeight: 300, maxWidth: "520px", margin: "12px auto 0" }}>
            Sugar.fit has an app. Clinics have pills. HOMA has a 32-year protocol that treats the root cause — not the number on your meter.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", maxWidth: "1100px", margin: "0 auto" }}>
          {[
            { emoji: "🎯", p: "Precision", line1: "HOMA-IR + TyG Index", line2: "We measure insulin resistance directly. Not just sugar. Not just HbA1c. The root cause, measured precisely.", color: "#0D2B4E" },
            { emoji: "🔬", p: "Penetrative", line1: "6 Metabolic Pathways", line2: "We go 6 levels deep — ENaC, RAAS, leptin, glycocalyx, visceral fat, beta cell reserve. Tablets touch only the surface.", color: "#1a5276" },
            { emoji: "🛡️", p: "Preventive", line1: "Stop It Before It Starts", line2: "Pre-diabetes reversed before it becomes diabetes. Heart risk identified before it becomes an event. Prevention is our first move.", color: "#1B6B45" },
            { emoji: "👤", p: "Personalized", line1: "Your Food. Your Body. Your Plan.", line2: "Indian meal plans built for Telugu, Hindi, and regional diets. No foreign keto. No generic advice. Your culture, your reversal.", color: "#7d3c98" },
            { emoji: "✅", p: "Proven", line1: "32 Years · 5,000+ Patients", line2: "9 published books. Peer-reviewed protocols. Taught at ISB, IIIT, IKEA. Results that repeat — not testimonials from one lucky patient.", color: "#c0392b" },
          ].map((item) => (
            <div key={item.p} style={{ background: "#fff", borderRadius: "16px", padding: "28px 22px", border: "1px solid #ece9e1", borderTop: `4px solid ${item.color}` }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{item.emoji}</div>
              <div style={{ fontSize: "10px", fontWeight: 700, color: item.color, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "6px" }}>{item.p}</div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#0D2B4E", marginBottom: "10px", lineHeight: 1.3 }}>{item.line1}</div>
              <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}>{item.line2}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA — Start Your Reversal */}
      <section style={{ background: "#0D2B4E", padding: "72px 6%", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 500, color: "#fff", marginBottom: "16px" }}>
          Start Your Reversal Today
        </h2>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)", fontWeight: 300, maxWidth: "480px", margin: "0 auto 36px" }}>
          Free 15-minute metabolic assessment. No cost, no signup. Serving Gachibowli, Ameerpet, Bachupally &amp; Patancheru.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="https://wa.me/919963721999?text=I%20want%20to%20book%20an%20appointment%20at%20HOMA%20Clinic" target="_blank" rel="noopener noreferrer" style={{ background: "#F5A623", color: "#1a1a1a", fontWeight: 700, fontSize: "16px", padding: "16px 36px", borderRadius: "8px", textDecoration: "none" }}>
            Book An Appointment →
          </Link>
          <a href="https://wa.me/919963721999" style={{ background: "#25D366", color: "#fff", fontWeight: 700, fontSize: "16px", padding: "16px 36px", borderRadius: "8px", textDecoration: "none" }}>
            💬 WhatsApp Dr. Muddu
          </a>
          <Link href="/tools" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 600, fontSize: "16px", padding: "16px 36px", borderRadius: "8px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}>
            🔬 Free HOMA-IR Check
          </Link>
        </div>
      </section>

      {/* CONDITIONS */}
      <section style={{ padding: "72px 6%", background: "#fff", textAlign: "center" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#00A896",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "10px",
          }}
        >
          What We Treat
        </p>
        <h2
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "clamp(30px, 4vw, 48px)",
            fontWeight: 500,
            color: "#0D2B4E",
            marginBottom: "12px",
          }}
        >
          Science-Based Reversal
        </h2>
        <p style={{ fontSize: "15px", color: "#888", fontWeight: 300, marginBottom: "40px" }}>
          From PCOS to senior care — personalised metabolic protocols for every life stage
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {[
            ["🔴", "Type 2 Diabetes", "Reversal in 90 days"],
            ["💗", "PCOS", "Hormonal balance"],
            ["⚖️", "Obesity", "Visceral fat reversal"],
            ["❤️", "Heart Risk", "Cardio-metabolic care"],
            ["🫘", "Diabetes + Kidney", "Nephropathy care", "/conditions/diabetes-kidney"],
            ["🛡️", "Pre-Diabetes", "Prevention first"],
            ["🔋", "Fatigue & IR", "Root cause care"],
            ["👴", "Senior Metabolic", "Age-tailored protocol"],
          ].map(([icon, name, sub, href]) => {
            const tile = (
            <div
              key={String(name)}
              style={{
                background: "#f8f7f3",
                border: "1px solid #ece9e1",
                borderRadius: "12px",
                padding: "20px 14px",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{icon}</div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D2B4E", marginBottom: "4px" }}>{name}</div>
              <div style={{ fontSize: "12px", color: "#999" }}>{sub}</div>
            </div>
            );
            return href ? (
              <Link key={String(name)} href={href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                {tile}
              </Link>
            ) : (
              tile
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "72px 6%", background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#00A896",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "10px",
            }}
          >
            Common Questions
          </p>
          <h2
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: 500,
              color: "#0D2B4E",
            }}
          >
            Everything You Need to Know
          </h2>
        </div>
        <div
          style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {faqs.map((faq, i) => (
            <div key={faq.q} style={{ border: "1px solid #ece9e1", borderRadius: "12px", overflow: "hidden" }}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%",
                  background: openFaq === i ? "#0D2B4E" : "#fff",
                  border: "none",
                  padding: "18px 22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: openFaq === i ? "#fff" : "#1a1a1a",
                    flex: 1,
                  }}
                >
                  {faq.q}
                </span>
                <span
                  style={{
                    fontSize: "20px",
                    color: openFaq === i ? "#F5A623" : "#999",
                    marginLeft: "12px",
                  }}
                >
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>
              {openFaq === i && (
                <div
                  style={{ padding: "18px 22px", background: "#f8f7f3", fontSize: "14px", color: "#555", lineHeight: 1.7 }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOOKS STRIP */}
      <section
        style={{
          background: "#FDF3DC",
          padding: "40px 6%",
          borderTop: "3px solid #F5A623",
        }}
      >
        <div className="mx-auto max-w-[1100px] text-center overflow-x-hidden">
          <h2
            style={{
              fontSize: "clamp(20px, 3.5vw, 28px)",
              fontWeight: 800,
              color: "#0D3B5E",
              margin: "0 0 24px",
              lineHeight: 1.3,
            }}
          >
            Books by Dr Muddu Surendra Nehru MD
          </h2>
          <style>{`
            .book-strip-btn {
              display: block;
              width: 100%;
              margin-top: 8px;
              padding: 8px 16px;
              font-size: 14px;
              font-weight: 600;
              color: #fff;
              background: #0b3d66;
              border-radius: 6px;
              text-decoration: none;
              text-align: center;
              box-sizing: border-box;
              transition: background 0.15s ease;
            }
            .book-strip-btn:hover {
              background: #1d4ed8;
            }
            .book-strip-btn:focus-visible {
              outline: 2px solid #f5a623;
              outline-offset: 2px;
            }
          `}</style>
          <div className="mx-auto mb-[22px] box-border grid w-full max-w-[1100px] grid-cols-2 gap-6 justify-items-center px-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {BOOKS_STRIP.map((book) => {
              const imgStyle = {
                width: "100%",
                maxWidth: "140px",
                aspectRatio: "2 / 3",
                objectFit: "cover" as const,
                borderRadius: "8px",
                border: "2px solid #F5A623",
                boxShadow: "0 4px 14px rgba(13,59,94,0.18)",
                display: "block",
                margin: "0 auto 10px",
              };
              const titleStyle = {
                fontSize: "14px",
                fontWeight: 700,
                color: "#0D3B5E",
                lineHeight: 1.35,
                marginBottom: "6px",
              };
              const btnLabel =
                book.linkLabel === "Buy on Amazon" ? "Buy on Amazon →" : "Get the Book →";
              const cover = (
                <img
                  src={book.cover}
                  alt={`${book.title} book cover`}
                  width={140}
                  height={210}
                  loading="lazy"
                  style={imgStyle}
                />
              );
              const actionLink = book.newTab ? (
                <a
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-strip-btn"
                >
                  {btnLabel}
                </a>
              ) : (
                <Link href={book.href} className="book-strip-btn">
                  {btnLabel}
                </Link>
              );
              return (
                <div key={book.title} className="w-full max-w-[200px] min-w-0 text-center">
                  {book.newTab ? (
                    <a
                      href={book.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit", display: "block" }}
                    >
                      {cover}
                    </a>
                  ) : (
                    <Link
                      href={book.href}
                      style={{ textDecoration: "none", color: "inherit", display: "block" }}
                    >
                      {cover}
                    </Link>
                  )}
                  <div style={titleStyle}>{book.title}</div>
                  {actionLink}
                </div>
              );
            })}
          </div>
          <Link
            href="/books"
            style={{
              color: "#F5A623",
              fontWeight: 700,
              fontSize: "15px",
              textDecoration: "none",
              borderBottom: "2px solid #F5A623",
              paddingBottom: "2px",
            }}
          >
            See books &amp; buy on Amazon
          </Link>
        </div>
      </section>
      <HomeHealthHubSection />
    </>
  );
}

