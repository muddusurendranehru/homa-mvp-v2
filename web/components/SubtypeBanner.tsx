import Link from "next/link";

const INFOGRAPHIC_SRC = "/images/subtypes/subtypes-32-infographic.webp";
const INFOGRAPHIC_ALT =
  "32 Subtypes — Not just HbA1c. Your insulin. Your beta cells. Your subtype.";

const INFOGRAPHIC_FIGURE = (
  <figure
    style={{
      margin: 0,
      borderRadius: "14px",
      overflow: "hidden",
      boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
      border: "1px solid rgba(255,255,255,0.15)",
      background: "#0a1628",
      lineHeight: 0,
    }}
  >
    <img
      src={INFOGRAPHIC_SRC}
      alt={INFOGRAPHIC_ALT}
      width={576}
      height={1024}
      loading="lazy"
      decoding="async"
      style={{
        display: "block",
        width: "100%",
        maxHeight: "520px",
        height: "auto",
        objectFit: "contain",
        margin: "0 auto",
      }}
    />
  </figure>
);

const TICKS = [
  "Free calculator — takes 2 minutes",
  "Based on insulin & beta cells, not just HbA1c",
  "First in India",
] as const;

export default function SubtypeBanner() {
  return (
    <section
      aria-labelledby="subtype-banner-heading"
      className="subtype-banner"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#07153a",
        padding: "60px 6%",
        color: "#fff",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "flex-end",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "min(52vw, 520px)",
            opacity: 0.38,
          }}
        >
          <img
            src="/images/subtypes/metro-crowd-seated-blur.webp"
            alt=""
            width={800}
            height={1765}
            loading="lazy"
            decoding="async"
            style={{
              flex: "1.15 1 0",
              minWidth: 0,
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
          <img
            src="/images/subtypes/metro-crowd-standing-blur.webp"
            alt=""
            width={800}
            height={1765}
            loading="lazy"
            decoding="async"
            style={{
              flex: "0.85 1 0",
              minWidth: 0,
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
        </div>
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(7,21,58,0.97) 0%, rgba(7,21,58,0.93) 50%, rgba(7,21,58,0.78) 72%, rgba(7,21,58,0.55) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          gap: "32px 40px",
        }}
      >
        <div style={{ flex: "1 1 380px", minWidth: 0 }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#d4af37",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            PERSONALIZED PRECISION CARE
          </div>
          <h2
            id="subtype-banner-heading"
            style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: "14px",
            }}
          >
            Diabetes is not just Type 1 or Type 2.
            <br />
            <span style={{ color: "#d4af37" }}>We found 32 types.</span>
          </h2>
          <p
            style={{
              fontSize: "17px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.55,
              marginBottom: "16px",
            }}
          >
            Look around you on the metro. Everyone is different. Why should everyone get the same
            diabetes diet?
          </p>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.65,
              marginBottom: "22px",
            }}
          >
            Most clinics only check your HbA1c and give everyone the same diet and the same tablets.
            HOMA looks deeper — at how well your insulin works and how strong your beta cells are.
            Our free AI calculator places you in 1 of 32 metabolic subtypes, so your diet, walk and
            medicines fit your body, not everyone&apos;s.
          </p>

          <ul
            style={{
              listStyle: "none",
              margin: "0 0 26px",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {TICKS.map((t) => (
              <li
                key={t}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.45,
                }}
              >
                <span style={{ color: "#00A896", fontWeight: 800 }} aria-hidden>
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>

          <Link
            href="/subtypes"
            style={{
              display: "inline-block",
              background: "#00A896",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              padding: "16px 32px",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            Find My Subtype — Free →
          </Link>

          <div className="subtype-infographic-mobile" style={{ marginTop: "28px" }}>
            {INFOGRAPHIC_FIGURE}
          </div>
        </div>

        <div
          className="subtype-banner-aside"
          style={{
            flex: "1 1 280px",
            maxWidth: "420px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div className="subtype-infographic-desktop">{INFOGRAPHIC_FIGURE}</div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: "20px",
              borderRadius: "12px",
              borderLeft: "4px solid #00A896",
            }}
          >
            <div style={{ fontSize: "12px", color: "#00A896", fontWeight: 700, marginBottom: "4px" }}>
              ENGLISH
            </div>
            <div style={{ fontSize: "16px", fontWeight: 500 }}>
              Why generalised diets? Know your precise subtype first.
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: "20px",
              borderRadius: "12px",
              borderLeft: "4px solid #d4af37",
            }}
          >
            <div style={{ fontSize: "12px", color: "#d4af37", fontWeight: 700, marginBottom: "4px" }}>
              हिंदी (HINDI)
            </div>
            <div style={{ fontSize: "16px", fontWeight: 500 }}>
              सामान्य डाइट क्यों? पहले अपना सटीक सबटाइप जानें।
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: "20px",
              borderRadius: "12px",
              borderLeft: "4px solid #25D366",
            }}
          >
            <div style={{ fontSize: "12px", color: "#25D366", fontWeight: 700, marginBottom: "4px" }}>
              తెలుగు (TELUGU)
            </div>
            <div style={{ fontSize: "16px", fontWeight: 500 }}>
              సాధారణ డైట్లు ఎందుకు? మొదట మీ ఖచ్చితమైన సబ్‌టైప్ తెలుసుకోండి.
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1100px",
          margin: "40px auto 0",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          fontSize: "14px",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        <span>
          🌐{" "}
          <a
            href="https://mvp.homahealthcarecenter.in"
            style={{ color: "#d4af37", textDecoration: "none" }}
          >
            mvp.homahealthcarecenter.in
          </a>
        </span>
        <span>
          📱{" "}
          <a
            href="https://play.google.com/store/apps/details?id=com.kivra.tools"
            style={{ color: "#d4af37", textDecoration: "none" }}
          >
            Download Android App
          </a>
        </span>
        <span>
          📞{" "}
          <a href="tel:+919963721999" style={{ color: "#d4af37", textDecoration: "none" }}>
            099637 21999
          </a>
        </span>
        <span>
          ✉️{" "}
          <a href="mailto:surendra.muddu@gmail.com" style={{ color: "#d4af37", textDecoration: "none" }}>
            Email Us
          </a>
        </span>
        <span>
          Follow us:{" "}
          <a href="#" style={{ color: "#d4af37", textDecoration: "none" }}>
            Instagram
          </a>{" "}
          |{" "}
          <a href="#" style={{ color: "#d4af37", textDecoration: "none" }}>
            YouTube
          </a>
        </span>
      </div>

      <style>{`
        .subtype-infographic-mobile {
          max-width: 320px;
          margin-left: auto;
          margin-right: auto;
        }
        .subtype-infographic-desktop {
          display: none;
        }
        @media (min-width: 900px) {
          .subtype-infographic-mobile {
            display: none;
          }
          .subtype-infographic-desktop {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}
