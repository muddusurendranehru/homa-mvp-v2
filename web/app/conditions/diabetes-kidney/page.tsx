import { Metadata } from "next";
import Link from "next/link";

const PAGE_URL = "https://mvp.homahealthcarecenter.in/conditions/diabetes-kidney";
const WHATSAPP_REPORTS =
  "https://wa.me/919963721999?text=" +
  encodeURIComponent("I want to send my reports for the Diabetes + Kidney diet plan");

export const metadata: Metadata = {
  title: "Diabetes + Weak Kidneys: A Safe Diet That Keeps Sugar Steady | HOMA Healthcare Center",
  description:
    "A doctor-supervised 30-day diet for people on insulin or diabetes tablets with raised creatinine or urea. 5 small meals, the right protein, low salt, potassium and phosphorus.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Diabetes + Weak Kidneys: A Safe Diet That Keeps Sugar Steady",
    description:
      "A doctor-supervised 30-day diet for people with diabetes and raised creatinine or urea.",
    url: PAGE_URL,
    siteName: "HOMA Healthcare Center",
    locale: "en_IN",
    type: "website",
  },
};

const navy = "#0D3B5E";
const gold = "#F5A623";
const cream = "#FDF3DC";

const whatWeDo = [
  "5 small meals at fixed times to prevent sugar lows",
  "The right amount of protein (egg white, moong dal), not too much",
  "Low salt, low potassium and low phosphorus",
  "Iron and folate support if anaemic",
];

const sectionTitle = {
  fontFamily: "Montserrat, Arial, sans-serif",
  color: navy,
  fontSize: "22px",
  fontWeight: 800,
  margin: "0 0 12px",
} as const;

const card = {
  background: "#ffffff",
  borderRadius: "14px",
  padding: "22px 20px",
  marginBottom: "18px",
  boxShadow: "0 4px 14px rgba(13,59,94,0.08)",
} as const;

export default function DiabetesKidneyPage() {
  return (
    <main style={{ background: cream, color: "#1a1a1a", minHeight: "100vh", fontFamily: "Lato, Arial, sans-serif" }}>
      <header
        style={{
          background: `linear-gradient(160deg, #07153a 0%, ${navy} 75%)`,
          color: "#fff",
          padding: "48px 6% 36px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0 0 10px", letterSpacing: "0.16em", textTransform: "uppercase", color: gold, fontSize: "12px", fontWeight: 700 }}>
          HOMA Healthcare Center
        </p>
        <h1
          style={{
            fontFamily: "Montserrat, Arial, sans-serif",
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 800,
            lineHeight: 1.2,
            margin: "0 auto 14px",
            maxWidth: "820px",
          }}
        >
          Diabetes + Weak Kidneys: A Safe Diet That Keeps Sugar Steady
        </h1>
        <p lang="te" style={{ margin: "0 auto 18px", maxWidth: "640px", fontSize: "18px", lineHeight: 1.6, color: "rgba(255,255,255,0.9)" }}>
          ఇన్సులిన్ వాడుతూ కిడ్నీ సమస్య ఉన్నవారికి సురక్షితమైన ఆహారం
        </p>
        <a
          href={WHATSAPP_REPORTS}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: gold,
            color: navy,
            fontFamily: "Montserrat, Arial, sans-serif",
            fontWeight: 800,
            fontSize: "16px",
            padding: "14px 28px",
            borderRadius: "10px",
            textDecoration: "none",
          }}
        >
          Send My Reports on WhatsApp
        </a>
      </header>

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "28px 6% 56px" }}>
        <div
          style={{
            background: "#fff4e0",
            border: `3px solid ${gold}`,
            borderRadius: "14px",
            padding: "18px 20px",
            marginBottom: "22px",
            textAlign: "center",
            fontFamily: "Montserrat, Arial, sans-serif",
            fontWeight: 800,
            fontSize: "18px",
            color: navy,
          }}
        >
          ⚠️ Medicines and insulin are changed only by the doctor.
        </div>

        <section style={card}>
          <h2 style={sectionTitle}>Who it&apos;s for</h2>
          <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.6 }}>
            People on insulin or diabetes tablets with raised creatinine or urea.
          </p>
        </section>

        <section style={card}>
          <h2 style={sectionTitle}>What we do</h2>
          <ul style={{ margin: 0, paddingLeft: "22px", fontSize: "17px", lineHeight: 1.7 }}>
            {whatWeDo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section style={card}>
          <h2 style={sectionTitle}>How it works</h2>
          <ol style={{ margin: 0, paddingLeft: "22px", fontSize: "17px", lineHeight: 1.8 }}>
            <li>Send your reports</li>
            <li>Doctor review</li>
            <li>
              30-day plan in the app (
              <a
                href="https://healthmetrics30daymeals.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: navy, fontWeight: 700, textDecoration: "underline" }}
              >
                healthmetrics30daymeals.onrender.com
              </a>
              )
            </li>
            <li>Day 30 review</li>
            <li>Day 90 repeat labs</li>
          </ol>
        </section>

        <div style={{ textAlign: "center", margin: "28px 0" }}>
          <a
            href={WHATSAPP_REPORTS}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: gold,
              color: navy,
              fontFamily: "Montserrat, Arial, sans-serif",
              fontWeight: 800,
              fontSize: "17px",
              padding: "16px 32px",
              borderRadius: "10px",
              textDecoration: "none",
              boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
            }}
          >
            Send My Reports on WhatsApp
          </a>
        </div>
      </div>

      <footer style={{ background: navy, color: "#fff", padding: "28px 6%", textAlign: "center", fontSize: "15px", lineHeight: 1.7 }}>
        <p style={{ margin: "0 0 8px" }}>
          Dr Muddu Surendra Nehru MD · HOMA Healthcare Center, Gachibowli ·{" "}
          <a href="tel:+919963721999" style={{ color: gold, textDecoration: "none", fontWeight: 700 }}>
            09963721999
          </a>
        </p>
        <Link href="/" style={{ color: gold, fontWeight: 700 }}>
          Back to the homepage
        </Link>
      </footer>
    </main>
  );
}
