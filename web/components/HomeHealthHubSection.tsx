import Link from "next/link";

const HUB_ITEMS = [
  {
    icon: "🧪",
    title: "Find Labs & Pharmacies",
    line: "Book lab tests and locate trusted pharmacies near you.",
    href: "/labs",
  },
  {
    icon: "🥗",
    title: "Free Diets & Cut-off Values",
    line: "Indian meal plans, diet tools, and metabolic cut-off guides.",
    href: "/diet",
  },
  {
    icon: "🏥",
    title: "Emergency Hospitals",
    line: "Quick links and guidance when you need urgent hospital care.",
    href: "/emergency",
  },
  {
    icon: "🌿",
    title: "Organic Store & Trackers",
    line: "HOMA organic store plus meal and habit trackers.",
    href: "/organic",
  },
] as const;

export default function HomeHealthHubSection() {
  return (
  <section
      style={{
        background: "#0b1630",
        padding: "56px 6%",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
      aria-labelledby="health-hub-heading"
    >
      <h2
        id="health-hub-heading"
        style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: "clamp(22px, 3.5vw, 32px)",
          fontWeight: 600,
          color: "#fff",
          textAlign: "center",
          margin: "0 0 32px",
          lineHeight: 1.25,
        }}
      >
        Everything You Need for Your Health, In One Place.
      </h2>
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {HUB_ITEMS.map((item) => (
          <div
            key={item.href}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "14px",
              padding: "18px 14px",
              textAlign: "center",
              minHeight: "100%",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }} aria-hidden="true">
              {item.icon}
            </div>
            <h3
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 8px",
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.45,
                margin: "0 0 12px",
              }}
            >
              {item.line}
            </p>
            <Link
              href={item.href}
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#F5A623",
                textDecoration: "none",
                borderBottom: "1px solid rgba(245,166,35,0.5)",
              }}
            >
              Open →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}