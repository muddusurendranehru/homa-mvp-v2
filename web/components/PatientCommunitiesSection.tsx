import QualityOfLifeBanner from "@/components/QualityOfLifeBanner";

const TRIBES = [
  {
    name: "Diabetes Gladiators Hyd1",
    cat: "Type 2 Diabetes Reversal",
    desc: "HbA1c goals, HOMA-IR tracking, weekly wins.",
    img: "/images/tribes/diabetes-gladiators.jpg",
    accent: "#4ade80",
    link: "https://chat.whatsapp.com/IfeG6QI8Ia6ArRFlxwqxMp",
  },
  {
    name: "Hypertension Heroes",
    cat: "Blood Pressure Control",
    desc: "BP without fear — real lifestyle wins, every evening 6-7 PM.",
    img: "/images/tribes/hypertension-heroes.jpg",
    accent: "#c084fc",
    link: "https://chat.whatsapp.com/Cpk5Wrq6bw25CpbFhMd2Ab",
  },
  {
    name: "Lady Lions",
    cat: "Women's Metabolic Health",
    desc: "For women managing diabetes and heart disease together.",
    img: "/images/tribes/lady-lions.png",
    accent: "#fbbf24",
    link: "https://chat.whatsapp.com/Jy7b3h8iMzpAySmJj4pc1z",
  },
] as const;

export default function PatientCommunitiesSection() {
  return (
    <section style={{ background: "#07153a", padding: "72px 6%" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#25D366",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "10px",
          }}
        >
          Free WhatsApp Communities
        </div>
        <h2
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 500,
            color: "#fff",
            marginBottom: "12px",
            lineHeight: 1.2,
          }}
        >
          Join Your Tribe.
          <br />
          <em style={{ color: "#25D366" }}>You Are Not Alone.</em>
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.5)",
            fontWeight: 300,
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          Join our free communities for diabetes, hypertension and women&apos;s metabolic health across Telangana &amp; Andhra Pradesh.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px",
          maxWidth: "960px",
          margin: "0 auto 32px",
        }}
      >
        {TRIBES.map((tribe) => (
          <div
            key={tribe.name}
            style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              minHeight: "260px",
              border: `1px solid ${tribe.accent}30`,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${tribe.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.85) 100%)",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                minHeight: "260px",
              }}
            >
              <div style={{ display: "flex", gap: "6px" }}>
                <span
                  style={{
                    background: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: "100px",
                  }}
                >
                  HOMA
                </span>
                <span
                  style={{
                    background: "#25D366",
                    color: "#fff",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: "100px",
                  }}
                >
                  FREE
                </span>
              </div>
              <div style={{ marginTop: "auto" }}>
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: tribe.accent,
                    marginBottom: "4px",
                  }}
                >
                  {tribe.cat}
                </div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>
                  {tribe.name}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "12px" }}>
                  {tribe.desc}
                </div>
                <a
                  href={tribe.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    background: "#25D366",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "12px",
                    textTransform: "uppercase",
                    padding: "9px",
                    borderRadius: "8px",
                    textDecoration: "none",
                  }}
                >
                  Join Free
                </a>
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center h-full">
          <QualityOfLifeBanner />
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <a
          href="/communities"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "14px",
            padding: "12px 28px",
            borderRadius: "100px",
            textDecoration: "none",
          }}
        >
          See All 10 Free Tribes
        </a>
      </div>
    </section>
  );
}