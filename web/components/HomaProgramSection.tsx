import HomaProgramInterestCta from "@/components/HomaProgramInterestCta";

const PROGRAM_BULLETS = [
  "✅ HOMA-IR Test + TyG Index Assessment",
  "✅ NutriBot AI — personalised Indian meal plans",
  "✅ D·D·D — Door to Door home visits",
  "✅ 90-day monitoring + follow-ups",
  "✅ Free online HOMA-IR calculator access",
  "✅ 38 years licensed experience",
] as const;

export default function HomaProgramSection() {
  return (
    <section style={{ padding: "72px 6%", background: "#f8f7f3" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
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
          Investment in Your Health
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
          The HOMA Program
        </h2>
        <p style={{ fontSize: "15px", color: "#888", fontWeight: 300 }}>
          Complete 90-day metabolic reversal — everything included
        </p>
      </div>
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          background: "#0D2B4E",
          borderRadius: "20px",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", marginBottom: "20px" }}>
          90-Day Reversal Program
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "28px",
            textAlign: "left",
          }}
        >
          {PROGRAM_BULLETS.map((item) => (
            <div key={item} style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
              {item}
            </div>
          ))}
        </div>
        <HomaProgramInterestCta />
      </div>
    </section>
  );
}