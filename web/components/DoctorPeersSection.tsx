import { DOCTOR_PEERS } from "@/data/doctor-peers";

export default function DoctorPeersSection() {
  const cards = DOCTOR_PEERS.filter((d) => d.image.trim().length > 0);

  return (
    <section style={{ background: "#07153a", padding: "72px 6%" }}>
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#00A896",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "10px",
          }}
        >
          Medical Community
        </div>
        <h2
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "clamp(26px, 3.5vw, 44px)",
            fontWeight: 500,
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          Respected by Doctors
          <br />
          <em style={{ color: "#d4af37", fontStyle: "italic" }}>Across India &amp; Abroad.</em>
        </h2>
      </div>

      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {cards.map((d) => {
          const alt = [d.name, d.caption].filter(Boolean).join(" — ");
          const objectClass =
            d.imageFocus === "center" ? "object-cover object-center" : "object-cover object-top";

          return (
            <figure
              key={d.image + d.name}
              className="m-0 overflow-hidden rounded-xl border border-[rgba(212,175,55,0.12)] bg-[#0f1f3d]"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#0a1628]">
                {d.badge ? (
                  <div
                    className="absolute left-2 top-2 z-[1] rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-semibold text-[#d4af37] backdrop-blur-sm"
                    style={{ maxWidth: "calc(100% - 16px)" }}
                  >
                    {d.badge}
                  </div>
                ) : null}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.image}
                  alt={alt}
                  width={d.imageFocus === "center" ? 1000 : 400}
                  height={d.imageFocus === "center" ? 453 : 400}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full ${objectClass}`}
                />
              </div>
              <figcaption className="border-t border-[rgba(212,175,55,0.2)] px-2.5 py-2">
                <div className="text-[11px] font-bold leading-snug text-[#d4af37] sm:text-xs">
                  {d.name}
                </div>
                {d.caption.trim() ? (
                  <div className="mt-0.5 text-[10px] leading-snug text-white/55 sm:text-[11px]">
                    {d.caption}
                  </div>
                ) : null}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
