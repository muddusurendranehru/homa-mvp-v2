import { CELEBRITY_RECOGNITION } from "@/data/celebrity-recognition";

export default function CelebrityRecognitionSection() {
  const cards = CELEBRITY_RECOGNITION.filter((c) => c.image.trim().length > 0);

  return (
    <section style={{ background: "#07153a", padding: "72px 6%" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#d4af37",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "10px",
          }}
        >
          Trusted at the Highest Level
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
          Celebrities. Ministers. Medical Colleagues.
          <br />
          <em style={{ color: "#d4af37", fontStyle: "italic" }}>All Chose HOMA.</em>
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
          When Tollywood&apos;s biggest star and Telangana&apos;s IT Minister trust the same doctor —
          that&apos;s not marketing. That&apos;s proof.
        </p>
      </div>

      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
        {cards.map((c) => {
          const alt = c.name.trim() || c.caption.trim() || "HOMA recognition";
          const key = c.image + (c.name || c.caption);

          return (
            <figure
              key={key}
              className="m-0 overflow-hidden rounded-xl border border-white/5 bg-[#0f1f3d]"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#0a1628]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={alt}
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <figcaption className="border-t border-[rgba(212,175,55,0.2)] px-2.5 py-2">
                {c.name.trim() ? (
                  <div className="text-[11px] font-bold leading-snug text-[#d4af37] sm:text-xs">
                    {c.name}
                  </div>
                ) : null}
                {c.caption.trim() ? (
                  <div
                    className={
                      c.name.trim()
                        ? "mt-0.5 text-[10px] leading-snug text-white/55 sm:text-[11px]"
                        : "text-[11px] font-semibold leading-snug text-[#d4af37] sm:text-xs"
                    }
                  >
                    {c.caption}
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
