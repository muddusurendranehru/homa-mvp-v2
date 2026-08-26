"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
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
      a: "₹13,500 for the full 90-day metabolic reversal program. This includes HOMA-IR testing, TyG Index, NutriBot AI access, D·D·D home visits, and all follow-ups. Others charge ₹20,000–₹25,000 for less.",
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
      q: "Can Type 2 Diabetes really be reversed?",
      a: "Yes — in patients with less than 10 years of diabetes and preserved beta-cell function. Our 90-day protocol using metabolic nutrition, movement, and HOMA-IR monitoring has reversed diabetes in hundreds of patients.",
    },
    {
      q: "Do I need to stop my medications immediately?",
      a: "No. Medications are reduced gradually under Dr. Muddu's supervision as your metabolic markers improve. Never stop diabetes medication without medical guidance.",
    },
    {
      q: "Is this program suitable for PCOS?",
      a: "Yes. PCOS is driven by insulin resistance in most cases. The same HOMA-IR protocol that reverses diabetes also corrects the hormonal imbalance causing PCOS. Many patients see improvement in 60–90 days.",
    },
    {
      q: "Which areas in Hyderabad do you serve?",
      a: "Gachibowli, Ameerpet, Bachupally, Patancheru, Kondapur, Madhapur, and surrounding areas. The clinic is located in Gachibowli. D·D·D home visits cover a 20 km radius.",
    },
  ];

  return (
    <>
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
          HOMA Metabolic Health Seminar
        </h2>
        <p style={{ color: "#ffffff", fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 400, margin: "0 0 20px", opacity: 0.85 }}>
          Dr. Muddu Surendra Nehru MD · 20 Minutes · No Sign-up Required
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
                <span style={{ color: "#ffffff", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 700, lineHeight: 1 }}>
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
          {countdown.started ? "🟢 Seminar is LIVE now!" : "⚡ Limited seats — Register free"}
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
            👉 Join Seminar Free
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

      {/* HERO — full photo, no crop */}
      <section
        style={{
          position: "relative",
          width: "100%",
          background: "#0a1824",
        }}
      >
        <img
          src="/images/dr-muddu-chiranjeevi-new.jpg"
          alt="Dr. Muddu Surendra Nehru – HOMA Clinic Gachibowli Hyderabad"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(13,43,78,0.0) 0%, rgba(13,43,78,0.0) 50%, rgba(13,43,78,0.7) 85%, rgba(13,43,78,0.95) 100%)",
          }}
        />
        {/* 3 buttons — sit at bottom of photo */}
        <div style={{
          position: "absolute",
          bottom: "32px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          padding: "0 20px",
        }}>
          <Link
            href="/assessment"
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
          <Link
            href="/tools"
            style={{
              fontSize: "15px",
              fontWeight: 600,
              padding: "14px 30px",
              borderRadius: "6px",
              textDecoration: "none",
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            🔬 Free Metabolic Check
          </Link>
        </div>
      </section>

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
          ["32+", "Years Clinical Experience"],
          ["4", "Books Published"],
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            {
              img: "/images/before-after-south-indian-9-month.jpg",
              name: "Sneha, 29",
              role: "PCOS Reversed · Telangana",
            },
            {
              img: "/images/obesity-reversal-hyderabad-jpg.jpg",
              name: "Ramesh, 58",
              role: "Diabetes Reversed · Hyderabad",
            },
            {
              img: "/images/pcos-reversal-anita-hyderabad-jpg.jpg",
              name: "Anita, 34",
              role: "−18 kg · No Medication · Gachibowli",
            },
            {
              img: "/images/before-after-south-indian-after-blue-best-1.jpg",
              name: "Suresh, 52",
              role: "Pre-Diabetes Reversed · Ameerpet",
            },
          ].map((p) => (
            <div
              key={p.name}
              role="button"
              tabIndex={0}
              onClick={() => window.open("/testimonials", "_blank")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  window.open("/testimonials", "_blank");
                }
              }}
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                aspectRatio: "3/4",
                cursor: "pointer",
                background: "#111",
              }}
            >
              <img
                src={p.img}
                alt={p.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "52px",
                  height: "52px",
                  background: "rgba(255,255,255,0.15)",
                  border: "2px solid rgba(255,255,255,0.5)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px" }}>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>
                  The HOMA experience
                </div>
                <div style={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}>{p.name}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>{p.role}</div>
              </div>
            </div>
          ))}
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
            ["🫘", "Diabetes + Kidney", "Nephropathy care"],
            ["🛡️", "Pre-Diabetes", "Prevention first"],
            ["🔋", "Fatigue & IR", "Root cause care"],
            ["👴", "Senior Metabolic", "Age-tailored protocol"],
          ].map(([icon, name, sub]) => (
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
          ))}
        </div>
      </section>

      {/* PACKAGES */}
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
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>
            90-Day Reversal Program
          </div>
          <div
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "60px",
              fontWeight: 500,
              color: "#F5A623",
              lineHeight: 1,
            }}
          >
            ₹13,500
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "8px 0 28px" }}>
            Others charge ₹20,000–₹25,000
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "32px",
              textAlign: "left",
            }}
          >
            {[
              "✅ HOMA-IR Test + TyG Index Assessment",
              "✅ NutriBot AI — personalised Indian meal plans",
              "✅ D·D·D — Door to Door home visits",
              "✅ 90-day monitoring + follow-ups",
              "✅ Free online HOMA-IR calculator access",
              "✅ Peer-reviewed protocol — 32 years experience",
            ].map((item) => (
              <div key={item} style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
                {item}
              </div>
            ))}
          </div>
          <Link
            href="/assessment"
            style={{
              display: "block",
              background: "#F5A623",
              color: "#1a1a1a",
              fontWeight: 700,
              fontSize: "16px",
              padding: "16px",
              borderRadius: "10px",
              textDecoration: "none",
              marginBottom: "10px",
            }}
          >
            Book Your Assessment →
          </Link>
          <a
            href="https://wa.me/919963721999"
            style={{
              display: "block",
              background: "#25D366",
              color: "#fff",
              fontWeight: 700,
              fontSize: "15px",
              padding: "14px",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            💬 WhatsApp for Details
          </a>
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

      {/* FINAL CTA */}
      <section style={{ background: "#0D2B4E", padding: "72px 6%", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "clamp(32px, 4vw, 56px)",
            fontWeight: 500,
            color: "#fff",
            marginBottom: "16px",
          }}
        >
          Start Your Reversal Today
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.55)",
            fontWeight: 300,
            maxWidth: "480px",
            margin: "0 auto 36px",
          }}
        >
          Free 15-minute metabolic assessment. No cost, no signup. Serving Gachibowli, Ameerpet, Bachupally &amp;
          Patancheru.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/assessment"
            style={{
              background: "#F5A623",
              color: "#1a1a1a",
              fontWeight: 700,
              fontSize: "16px",
              padding: "16px 36px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Book An Appointment →
          </Link>
          <a
            href="https://wa.me/919963721999"
            style={{
              background: "#25D366",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              padding: "16px 36px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            💬 WhatsApp Dr. Muddu
          </a>
          <Link
            href="/tools"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "16px",
              padding: "16px 36px",
              borderRadius: "8px",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            🔬 Free HOMA-IR Check
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#06152b",
          padding: "32px 6%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>
          © 2026 HOMA Healthcare Center · Gachibowli, Hyderabad · <a href="tel:+919963721999" style={{ color: "inherit", textDecoration: "none" }}>09963721999</a>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/privacy-policy" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <Link href="/blog" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>
            Blog
          </Link>
          <Link href="/tools" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>
            Free Tools
          </Link>
        </div>
      </footer>
    </>
  );
}
