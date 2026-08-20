"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      {/* HERO — starts immediately, layout.tsx header sits above */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "calc(100vh - 94px)",
          minHeight: "500px",
          maxHeight: "860px",
          overflow: "hidden",
          background: "#0a1824",
        }}
      >
        <img
          src="/images/dr-muddu-chiranjeevi.jpg"
          alt="Dr. Muddu Surendra Nehru – HOMA Clinic Gachibowli Hyderabad"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
            opacity: 0.72,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(13,43,78,0.1) 0%, rgba(13,43,78,0.0) 35%, rgba(13,43,78,0.55) 65%, rgba(13,43,78,0.93) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "52px 6% 48px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div style={{ maxWidth: "580px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#5ed3c8",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  width: "22px",
                  height: "1px",
                  background: "#00A896",
                  display: "inline-block",
                }}
              />
              Metabolic Medicine · Gachibowli · Hyderabad
            </div>
            <h1
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "clamp(40px, 5.5vw, 76px)",
                fontWeight: 500,
                lineHeight: 1.05,
                color: "#fff",
                marginBottom: "16px",
              }}
            >
              Diabetes &amp;
              <br />
              Obesity
              <br />
              Reversed.
            </h1>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.6)",
                maxWidth: "460px",
                marginBottom: "30px",
              }}
            >
              Dr. Muddu Surendra Nehru MD — Professor of Medicine. Science-based metabolic reversal in 90 days. No
              gimmicks. Real results.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
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
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              ["5,000+", "Patients Treated"],
              ["90 Days", "Reversal Program"],
              ["32+ Yrs", "Clinical Experience"],
              ["4 Books", "Published Author"],
            ].map(([num, lbl]) => (
              <div
                key={lbl}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  backdropFilter: "blur(18px)",
                  borderRadius: "10px",
                  padding: "13px 20px",
                  minWidth: "164px",
                  textAlign: "right",
                }}
              >
                <div style={{ fontSize: "26px", fontWeight: 600, color: "#fff", lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "3px" }}>{lbl}</div>
              </div>
            ))}
          </div>
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

      {/* METABOLIC CHECK BALLOON CTA */}
      <section style={{ position: "relative", background: "#0a0a0a", overflow: "hidden", minHeight: "520px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Doctor image — tall, fills left side on mobile */}
        <img
          src="/images/gokhomayt2vert.jpg"
          alt="Sugar Normal? Check HOMA-IR"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            opacity: 0.45,
          }}
        />
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)" }} />
        {/* Balloon button — centered on top of image */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "48px 20px" }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "32px", fontWeight: 600 }}>
            Sugar Normal? Your HOMA-IR May Say Otherwise
          </p>
          <Link
            href="/tools"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #b91c1c, #7f1d1d)",
              boxShadow: "0 0 0 14px rgba(185,28,28,0.2), 0 0 0 28px rgba(185,28,28,0.08), 0 20px 60px rgba(185,28,28,0.5)",
              textDecoration: "none",
              color: "#fff",
              animation: "pulse-red 2s ease-in-out infinite",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "40px", marginBottom: "8px" }}>⚠️</span>
            <span style={{ fontSize: "16px", fontWeight: 900, letterSpacing: "0.04em", lineHeight: 1.25, textAlign: "center", padding: "0 20px" }}>
              CHECK FREE<br />METABOLIC<br />CALCULATORS
            </span>
            <span style={{ fontSize: "12px", marginTop: "10px", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>👆 Tap Here — It&apos;s Free</span>
          </Link>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", marginTop: "28px" }}>
            HOMA-IR · TyG Index · WHR · WHtR · BMI — All Free
          </p>
        </div>
        <style>{`
          @keyframes pulse-red {
            0%, 100% { box-shadow: 0 0 0 14px rgba(185,28,28,0.2), 0 0 0 28px rgba(185,28,28,0.08), 0 20px 60px rgba(185,28,28,0.5); }
            50% { box-shadow: 0 0 0 24px rgba(185,28,28,0.25), 0 0 0 48px rgba(185,28,28,0.12), 0 20px 90px rgba(185,28,28,0.7); }
          }
        `}</style>
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
