"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SeminarPage() {
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

  const MEET_LINK = "https://meet.google.com/epb-fcdg-qqw";
  const WHATSAPP = "https://wa.me/919963721999?text=I want to join tonight's HOMA seminar at 7PM";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #07153a 0%, #0f2557 50%, #07153a 100%)", color: "#fff", fontFamily: "sans-serif" }}>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "48px 20px 32px" }}>
        <span style={{
          background: "#d4af37", color: "#07153a", fontSize: "12px", fontWeight: 900,
          letterSpacing: "0.12em", padding: "4px 18px", borderRadius: "20px", textTransform: "uppercase"
        }}>🔴 FREE · TONIGHT ONLY</span>

        <h1 style={{ color: "#d4af37", fontSize: "clamp(24px, 5vw, 48px)", fontWeight: 900, textTransform: "uppercase", margin: "16px 0 8px", lineHeight: 1.15 }}>
          HOMA Metabolic Health Seminar
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(14px, 2vw, 20px)", margin: "0 0 8px" }}>
          Dr. Muddu Surendra Nehru MD · Professor of Medicine · Gachibowli, Hyderabad
        </p>
        <p style={{ color: "#d4af37", fontSize: "16px", fontWeight: 600, margin: "0 0 32px" }}>
          Tonight · 7:00 PM IST · 20 Minutes · 100% Free · No Sign-up Required
        </p>

        {/* Countdown */}
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(12px, 3vw, 40px)", marginBottom: "20px" }}>
          {[{ val: countdown.hrs, label: "Hrs" }, { val: countdown.mins, label: "Mins" }, { val: countdown.secs, label: "Secs" }].map(({ val, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(212,175,55,0.5)", borderRadius: "12px", padding: "12px 24px", minWidth: "80px" }}>
                <span style={{ fontSize: "clamp(32px, 6vw, 60px)", fontWeight: 700, lineHeight: 1 }}>{val}</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", margin: "6px 0 0", letterSpacing: "0.08em" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Urgency */}
        <p style={{ display: "inline-block", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.4)", color: "#d4af37", fontSize: "14px", fontWeight: 600, padding: "6px 22px", borderRadius: "20px", marginBottom: "28px" }}>
          {countdown.started ? "🟢 Seminar is LIVE — Join Now!" : "⚡ Limited seats — Join free below"}
        </p>

        {/* Join buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "16px" }}>
          <a href={MEET_LINK} target="_blank" rel="noopener noreferrer" style={{
            background: "#d4af37", color: "#07153a", padding: "16px 40px", borderRadius: "12px",
            fontWeight: 800, fontSize: "clamp(15px, 2vw, 18px)", textDecoration: "none",
            boxShadow: "0 4px 24px rgba(212,175,55,0.45)", display: "inline-block"
          }}>
            📹 Join on Google Meet
          </a>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
            background: "#25D366", color: "#fff", padding: "16px 40px", borderRadius: "12px",
            fontWeight: 700, fontSize: "clamp(15px, 2vw, 18px)", textDecoration: "none", display: "inline-block"
          }}>
            💬 WhatsApp to Join
          </a>
        </div>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>No downloads. No sign-up. Click to join instantly.</p>
      </div>

      {/* What you'll learn */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px 48px" }}>
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: "16px", padding: "32px" }}>
          <h2 style={{ color: "#d4af37", fontSize: "22px", fontWeight: 800, marginBottom: "20px", textAlign: "center" }}>
            What You Will Learn in 20 Minutes
          </h2>
          {[
            "Why Type 2 Diabetes & Obesity can be reversed — not just managed",
            "The HOMA-IR test — what it is and why it matters more than HbA1c",
            "How 5,000+ patients reversed diabetes at HOMA Gachibowli in 90 days",
            "The 1-rupee measuring tape test that predicts your metabolic risk",
            "How to get started — free metabolic check, no lab tests needed",
          ].map((point, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "14px" }}>
              <span style={{ color: "#d4af37", fontWeight: 800, fontSize: "18px", flexShrink: 0 }}>✓</span>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", margin: 0, lineHeight: 1.5 }}>{point}</p>
            </div>
          ))}
        </div>

        {/* Doctor info */}
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "16px", padding: "28px", marginTop: "20px", textAlign: "center" }}>
          <p style={{ color: "#d4af37", fontWeight: 700, fontSize: "18px", margin: "0 0 6px" }}>Dr. Muddu Surendra Nehru MD</p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: 0 }}>Professor of Medicine · Senior Physician · 30+ Years Experience · Gachibowli, Hyderabad</p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginTop: "8px" }}>Science-based metabolic reversal. No gimmicks. Real results.</p>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <a href={MEET_LINK} target="_blank" rel="noopener noreferrer" style={{
            background: "#d4af37", color: "#07153a", padding: "16px 48px", borderRadius: "12px",
            fontWeight: 800, fontSize: "18px", textDecoration: "none", display: "inline-block",
            boxShadow: "0 4px 24px rgba(212,175,55,0.45)"
          }}>
            📹 Join Seminar Free — Tonight 7 PM
          </a>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginTop: "12px" }}>
            Can&apos;t attend? <Link href="/assessment" style={{ color: "#d4af37" }}>Check your metabolic risk free →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
