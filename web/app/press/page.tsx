import type { Metadata } from "next";
import Image from "next/image";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Press & Media — HOMA Healthcare Center",
  description:
    "HOMA covered by 14 Telugu newspapers and recognized by the Government of Telangana.",
};

type Item = { files: string[]; caption: string };

const NEWSPAPERS: Item[] = [
  { files: ["papertelugu1.jpeg"], caption: "Telugu Daily 1" },
  { files: ["papertelugu2.jpeg"], caption: "Telugu Daily 2" },
  { files: ["paperteluguandhrajyothi1.jpeg"], caption: "Andhra Jyothi" },
  { files: ["paperteluguandhraprabha.jpeg"], caption: "Andhra Prabha" },
  { files: ["papertelugudisha.jpeg"], caption: "Disha" },
  { files: ["papertelugumanatelangana.jpeg"], caption: "Mana Telangana" },
  { files: ["papertelugupajapaksham.jpeg"], caption: "Praja Paksham" },
  { files: ["paperteluguprabhatelugu.jpeg"], caption: "Prabha Telugu" },
  { files: ["paperteluguprabhathavaartha.jpeg"], caption: "Prabhatha Vaartha" },
  { files: ["paperteluguprajapaksham.jpeg"], caption: "Praja Paksham 2" },
  { files: ["papertelugusakshi.jpeg"], caption: "Sakshi" },
  { files: ["papertelugutelangana.jpeg"], caption: "Telangana" },
  { files: ["papertelugutelanganabureau1.jpeg"], caption: "Telangana Bureau" },
  { files: ["paperteluguvijaykranthi1.jpeg"], caption: "Vijay Kranthi" },
];

const POC_DOCS: Item[] = [
  { files: ["poc1-1.jpeg", "poc1 (2).jpeg"], caption: "Pilot documentation 1" },
  { files: ["poc1-2.jpeg", "poc1 (4).jpeg"], caption: "Pilot documentation 2" },
  { files: ["poc1-3.jpeg", "poc1 (6).jpeg"], caption: "Pilot documentation 3" },
  { files: ["pocform2.jpeg"], caption: "Government form (page 2)" },
  { files: ["pocpage1.jpeg"], caption: "Pilot proposal" },
];

const NAVY = "#1e3a8a";
const TEAL = "#0d9488";

// Server-side check so a missing file shows a placeholder instead of a broken icon.
function resolveSrc(candidates: string[]): string | null {
  const roots = [
    path.join(process.cwd(), "public", "images", "press"),
    path.join(process.cwd(), "web", "public", "images", "press"),
  ];
  for (const file of candidates) {
    for (const root of roots) {
      try {
        if (fs.existsSync(path.join(root, file))) {
          return encodeURI(`/images/press/${file}`);
        }
      } catch {
        // ignore and try next
      }
    }
  }
  return null;
}

function Card({
  item,
  ratio,
  sizes,
}: {
  item: Item;
  ratio: "3 / 4" | "4 / 3";
  sizes: string;
}) {
  const src = resolveSrc(item.files);
  return (
    <figure className="press-card">
      <div className="press-frame" style={{ aspectRatio: ratio }}>
        {src ? (
          <Image
            src={src}
            alt={item.caption}
            fill
            sizes={sizes}
            loading="lazy"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="press-placeholder">Image coming soon</div>
        )}
      </div>
      <figcaption className="press-caption">{item.caption}</figcaption>
    </figure>
  );
}

const CSS = `
.press-page{background:#fff;color:#0f172a;min-height:100vh;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.press-wrap{max-width:1200px;margin:0 auto;padding:0 16px}
.press-hero{padding:48px 0 32px;text-align:center}
.press-eyebrow{color:${TEAL};font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin:0 0 12px}
.press-h1{color:${NAVY};font-size:30px;line-height:1.2;font-weight:800;margin:0 auto 16px;max-width:820px}
.press-sub{color:#475569;font-size:16px;line-height:1.6;margin:0 auto 20px;max-width:720px}
.press-trust{display:inline-block;color:${NAVY};background:#f0fdfa;border:1px solid #99f6e4;border-radius:999px;padding:8px 16px;font-size:13px;font-weight:600}
.press-section{padding:40px 0}
.press-h2{color:${NAVY};font-size:24px;font-weight:800;margin:0 0 8px;text-align:center}
.press-h2::after{content:"";display:block;width:56px;height:3px;background:${TEAL};border-radius:2px;margin:10px auto 0}
.press-section-sub{color:#475569;font-size:15px;line-height:1.5;text-align:center;margin:12px auto 28px;max-width:680px}
.press-grid{display:grid;gap:16px;grid-template-columns:repeat(2,1fr)}
.press-card{margin:0;background:#fff;border-radius:16px;box-shadow:0 2px 10px rgba(15,23,42,.08);overflow:hidden;transition:transform .2s ease,box-shadow .2s ease}
.press-card:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(15,23,42,.12)}
.press-frame{position:relative;width:100%;background:#f1f5f9;overflow:hidden}
.press-placeholder{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#64748b;font-size:14px;text-align:center;padding:12px;background:#f1f5f9}
.press-caption{font-size:13px;color:#475569;text-align:center;padding:10px 8px}
.press-cta{margin:24px 0 64px;background:linear-gradient(135deg,#f0fdfa,#eff6ff);border-radius:16px;box-shadow:0 2px 10px rgba(15,23,42,.08);padding:40px 20px;text-align:center}
.press-cta h2{color:${NAVY};font-size:26px;font-weight:800;margin:0 0 10px}
.press-cta p{color:#475569;font-size:16px;margin:0 0 24px}
.press-btns{display:flex;flex-direction:column;gap:12px;align-items:center}
.press-btn{display:inline-block;color:#fff;font-weight:700;font-size:15px;text-decoration:none;padding:14px 26px;border-radius:12px;transition:transform .2s ease,box-shadow .2s ease;box-shadow:0 2px 8px rgba(15,23,42,.15)}
.press-btn:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(15,23,42,.2)}
.press-btn-primary{background:#ea580c}
.press-btn-secondary{background:#16a34a}
@media(min-width:640px){
  .press-h1{font-size:38px}
  .press-grid{grid-template-columns:repeat(3,1fr);gap:20px}
  .press-btns{flex-direction:row;justify-content:center}
}
@media(min-width:1024px){
  .press-h1{font-size:44px}
  .press-grid.press-grid-news{grid-template-columns:repeat(4,1fr);gap:24px}
  .press-grid.press-grid-poc{grid-template-columns:repeat(3,1fr);gap:24px}
  .press-h2{font-size:30px}
}
.press-grid.press-grid-poc{grid-template-columns:repeat(2,1fr)}
@media(min-width:768px){.press-grid.press-grid-poc{grid-template-columns:repeat(3,1fr)}}
`;

export default function PressPage() {
  return (
    <main className="press-page">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* SECTION 1 — HERO */}
      <section className="press-hero">
        <div className="press-wrap">
          <p className="press-eyebrow">PRESS &amp; MEDIA COVERAGE</p>
          <h1 className="press-h1">
            Featured across Telugu media and the Government of Telangana
          </h1>
          <p className="press-sub">
            14 newspapers covered HOMA&apos;s work in 2026. The Government of
            Telangana is running a 50-patient pilot based on Dr. Muddu&apos;s
            protocol.
          </p>
          <span className="press-trust">
            14 Telugu Newspapers · Government of Telangana · T-Hub Hyderabad
          </span>
        </div>
      </section>

      {/* SECTION 2 — TELUGU NEWSPAPER CLIPPINGS */}
      <section className="press-section" aria-labelledby="news-title">
        <div className="press-wrap">
          <h2 id="news-title" className="press-h2">
            Featured in Telugu newspapers
          </h2>
          <p className="press-section-sub">
            Coverage of the HOMA CME 2026 event and Dr. Muddu&apos;s metabolic
            protocol
          </p>
          <div className="press-grid press-grid-news">
            {NEWSPAPERS.map((item) => (
              <Card
                key={item.caption}
                item={item}
                ratio="3 / 4"
                sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — GOVERNMENT POC */}
      <section className="press-section" aria-labelledby="poc-title">
        <div className="press-wrap">
          <h2 id="poc-title" className="press-h2">
            Government of Telangana — Proof of Concept
          </h2>
          <p className="press-section-sub">
            50-patient diabetes remission pilot in Manthani, directed by
            Minister Sri Duddilla Sridhar Babu
          </p>
          <div className="press-grid press-grid-poc">
            {POC_DOCS.map((item) => (
              <Card
                key={item.caption}
                item={item}
                ratio="4 / 3"
                sizes="(min-width:768px) 33vw, 50vw"
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — CTA */}
      <section className="press-wrap">
        <div className="press-cta">
          <h2>Want to know more?</h2>
          <p>Read about the pilot or talk to Dr. Muddu&apos;s team directly.</p>
          <div className="press-btns">
            <a href="/poc.html" className="press-btn press-btn-primary">
              See the Government Pilot →
            </a>
            <a
              href="https://wa.me/919963721999"
              target="_blank"
              rel="noopener noreferrer"
              className="press-btn press-btn-secondary"
            >
              WhatsApp Dr. Muddu →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}