"use client";

import { useEffect, useState } from "react";

const SRC_STORAGE = "homa_attribution_src";
const WA_NUMBER = "919963721999";

function normalizeSrc(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  const key = raw.trim().toLowerCase();
  const map: Record<string, string> = {
    ig: "Instagram",
    instagram: "Instagram",
    wa: "WhatsApp",
    whatsapp: "WhatsApp",
    fb: "Facebook",
    facebook: "Facebook",
    yt: "YouTube",
    youtube: "YouTube",
  };
  return map[key] ?? raw.trim();
}

function resolveAttributionSrc(): string {
  if (typeof window === "undefined") return "website";
  try {
    const stored = sessionStorage.getItem(SRC_STORAGE);
    if (stored?.trim()) return stored.trim();
  } catch {
    /* private mode */
  }
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("src") ?? params.get("utm_source");
  const normalized = normalizeSrc(fromQuery);
  return normalized ?? "website";
}

function waSecondOpinionHref(message: string, src: string) {
  const body = message.replace("(src=website)", `(src=${src})`);
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(body)}`;
}

const SECOND_OPINION_BLUE =
  "I want a second opinion for uncontrolled diabetes/BP/heart disease (src=website)";
const SECOND_OPINION_PURPLE =
  "I want a second opinion regarding surgery/stent (src=website)";

export default function PourYourDataPrescriptionSection() {
  const [src, setSrc] = useState("website");

  useEffect(() => {
    setSrc(resolveAttributionSrc());
  }, []);

  const blueHref = waSecondOpinionHref(SECOND_OPINION_BLUE, src);
  const purpleHref = waSecondOpinionHref(SECOND_OPINION_PURPLE, src);

  return (
    <section style={{ background: "#FDF3DC", padding: "40px 6%", textAlign: "center" }}>
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "Montserrat, Arial, sans-serif",
            fontSize: "clamp(26px, 4.5vw, 40px)",
            fontWeight: 800,
            color: "#0D3B5E",
            margin: "0 0 12px",
            lineHeight: 1.2,
          }}
        >
          Pour Your Data. Get Your Custom Medical &amp; Lifestyle Prescription.
        </h2>
        <p lang="te" style={{ fontSize: "18px", color: "#0D3B5E", margin: "0 0 12px", lineHeight: 1.6 }}>
          మీ రిపోర్ట్స్ మరియు బాడీ మెజర్మెంట్స్ ఇవ్వండి — డాక్టర్ మరియు మా AI విశ్లేషణతో మీ పూర్తి చికిత్సా ప్రణాళిక.
        </p>
        <p style={{ fontSize: "17px", color: "#333", margin: "0 auto 28px", lineHeight: 1.6, maxWidth: "720px" }}>
          Submit your lab reports and anthropometric data. Our Professor of Medicine, assisted by our proprietary AI
          Analyzer, builds your precision 2-Pillar remission plan.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
            marginBottom: "20px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              background: "linear-gradient(165deg, #ecfdf5 0%, #d1fae5 100%)",
              border: "2px solid #10b981",
              borderRadius: "16px",
              padding: "22px 20px",
              boxShadow: "0 8px 20px rgba(16, 185, 129, 0.12)",
            }}
          >
            <div style={{ fontSize: "40px", lineHeight: 1, marginBottom: "10px" }} aria-hidden="true">
              🏃
            </div>
            <h3
              style={{
                fontFamily: "Montserrat, Arial, sans-serif",
                fontSize: "18px",
                fontWeight: 800,
                color: "#065f46",
                margin: "0 0 8px",
              }}
            >
              Pillar 1: Lifestyle Engineering
            </h3>
            <p style={{ fontSize: "15px", color: "#134e4a", margin: 0, lineHeight: 1.55 }}>
              Habit tracker, precision AI diet, exercise protocols, and sleep optimization.
            </p>
          </div>
          <div
            style={{
              background: "linear-gradient(165deg, #eef2ff 0%, #e0e7ff 100%)",
              border: "2px solid #4f46e5",
              borderRadius: "16px",
              padding: "22px 20px",
              boxShadow: "0 8px 20px rgba(79, 70, 229, 0.12)",
            }}
          >
            <div style={{ fontSize: "40px", lineHeight: 1, marginBottom: "10px" }} aria-hidden="true">
              🩺
            </div>
            <h3
              style={{
                fontFamily: "Montserrat, Arial, sans-serif",
                fontSize: "18px",
                fontWeight: 800,
                color: "#312e81",
                margin: "0 0 8px",
              }}
            >
              Pillar 2: Clinical Medicine
            </h3>
            <p style={{ fontSize: "15px", color: "#3730a3", margin: 0, lineHeight: 1.55 }}>
              Doctor-guided medication protocols (tablets, injections) and referral for surgical care if required.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "14px",
            marginBottom: "28px",
            textAlign: "left",
          }}
        >
          <a
            href={blueHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              border: "2px solid #2563eb",
              borderRadius: "14px",
              padding: "18px 16px",
              background: "#fff",
              textDecoration: "none",
              color: "#1d4ed8",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.08)",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: 800, marginBottom: "8px", color: "#1e40af" }}>
              🤔 Uncontrolled Diabetes, BP, or Heart Disease?
            </div>
            <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.5, color: "#1d4ed8" }}>
              Unhappy with your current management? Get a specialist Second Opinion.
            </p>
          </a>
          <a
            href={purpleHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              border: "2px solid #9333ea",
              borderRadius: "14px",
              padding: "18px 16px",
              background: "#fff",
              textDecoration: "none",
              color: "#7e22ce",
              boxShadow: "0 4px 12px rgba(147, 51, 234, 0.08)",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: 800, marginBottom: "8px", color: "#6b21a8" }}>
              🩺 Doubt about Surgery, Stent, or PTCA?
            </div>
            <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.5, color: "#7e22ce" }}>
              Not sure if you really need that procedure? Talk to our Professor of Medicine first.
            </p>
          </a>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "20px" }}>
          <a
            href="/tools"
            style={{
              display: "inline-block",
              background: "#F5A623",
              color: "#0D3B5E",
              fontWeight: 800,
              fontSize: "16px",
              padding: "14px 26px",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            Check Your Health Free
          </a>
          <a
            href="https://wa.me/919963721999"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "#25D366",
              color: "#fff",
              fontWeight: 800,
              fontSize: "16px",
              padding: "14px 26px",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            WhatsApp Dr. Surendra
          </a>
        </div>
        <p style={{ fontSize: "14px", fontWeight: 700, color: "#0D3B5E", margin: 0 }}>
          23+ Metabolic Sub-types Analyzed · AI + Doctor Guided · Complete Clinical Care
        </p>
      </div>
    </section>
  );
}