"use client";

import Image from "next/image";
import SectionCta from "@/components/SectionCta";

const OLD_BULLETS = [
  "One-size-fits-all ‘Diabetes Upma’ posters",
  "No lab phenotyping or sub-typing",
  "Same advice for every patient, regardless of pancreatitis, sarcopenia or kidney health",
  "No tracking, no adherence",
];

const HOMA_BULLETS = [
  "Customised meals based on exact sub-types (e.g. Subtype 15B, Subtype 22B)",
  "Lab-driven macro targets (e.g. strict fat limits for pancreatitis, higher protein for sarcopenia)",
  "A dynamic 30-day plan on your phone",
  "Real-time tracking and HOMA Coins for adherence",
];

const REAL_EXAMPLES = [
  {
    src: "/images/home-sections/diet-tracker-subtyped-plan.webp",
    caption:
      "Each patient is subtyped first, then gets a prescribed plan (patient name hidden)",
  },
  {
    src: "/images/home-sections/diet-day5-meal-plan.webp",
    caption:
      "Day 5 of a 30-day personalised meal plan — timed meals with calories",
  },
] as const;

export default function OldVsNewModel() {
  return (
    <section id="old-vs-new-model" className="ovn-sec" aria-labelledby="ovn-headline">
      <style>{OVN_CSS}</style>
      <div className="ovn-wrap">
        <h2 id="ovn-headline" className="ovn-headline">
          Where is the personalization? Nowhere but HOMA.
        </h2>
        <p className="ovn-deck">
          India doesn&apos;t have a diabetes knowledge problem. It has a delivery problem.
        </p>
        <p className="ovn-subtitle">Generic Guidelines vs. HOMA Precision Medicine.</p>
        <div className="ovn-grid">
          <article className="ovn-card ovn-card--old">
            <h3 className="ovn-card-title">The Old Model: Generic Posters</h3>
            <ul className="ovn-list">
              {OLD_BULLETS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="ovn-paper" aria-hidden="true">
              <div className="ovn-paper-lines" />
            </div>
          </article>
          <article className="ovn-card ovn-card--new">
            <h3 className="ovn-card-title">The HOMA Model: Precision Sub-Typing</h3>
            <ul className="ovn-list">
              {HOMA_BULLETS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <figure className="ovn-protein">
              <Image
                src="/images/home-sections/daily-protein-card.webp"
                alt="Daily protein guide: 1.2–1.8 g per kg, 4 meals, eggs, dal, paneer, curd, chicken"
                width={320}
                height={200}
                className="ovn-protein-img"
                loading="lazy"
              />
            </figure>
            <div className="ovn-real">
              <p className="ovn-real-label">Real example</p>
              <div className="ovn-real-row">
                {REAL_EXAMPLES.map((ex) => (
                  <figure key={ex.src} className="ovn-real-fig">
                    <Image
                      src={ex.src}
                      alt={ex.caption}
                      width={320}
                      height={240}
                      className="ovn-real-img"
                      loading="lazy"
                    />
                    <figcaption className="ovn-real-cap">{ex.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </article>
        </div>
        <p className="ovn-strip">From generic posters to a 365-degree personalized metabolic system.</p>
        <SectionCta knowMoreHref="/diet-plan" />
      </div>
    </section>
  );
}

const OVN_CSS = `
.ovn-sec{padding:48px 20px;background:#fff;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0}
@media (min-width:768px){.ovn-sec{padding:72px 32px}}
.ovn-wrap{max-width:960px;margin:0 auto}
.ovn-headline{
  font-size:clamp(26px,4.2vw,38px);line-height:1.2;font-weight:800;
  letter-spacing:-.02em;text-align:center;color:#0f172a;margin:0 0 10px
}
.ovn-deck{
  text-align:center;font-size:clamp(15px,2.2vw,17px);font-weight:600;line-height:1.5;
  color:#64748b;margin:0 auto 12px;max-width:640px
}
.ovn-subtitle{
  text-align:center;font-size:clamp(17px,2.5vw,20px);font-weight:700;color:#1e3a8a;
  margin:0 0 32px;line-height:1.4
}
.ovn-grid{display:grid;grid-template-columns:1fr;gap:16px}
@media (min-width:768px){.ovn-grid{grid-template-columns:1fr 1fr;gap:20px}}
.ovn-card{
  border-radius:20px;padding:24px 22px;
  box-shadow:0 12px 32px -16px rgba(15,23,42,.18);
  border:1px solid #e2e8f0;display:flex;flex-direction:column;gap:14px
}
.ovn-card--old{
  background:linear-gradient(165deg,#fff5f5 0%,#fff 55%);
  border-top:4px solid #dc2626
}
.ovn-card--new{
  background:linear-gradient(165deg,#ecfdf5 0%,#eff6ff 65%,#fff 100%);
  border-top:4px solid #10b981
}
.ovn-card-title{font-size:18px;font-weight:800;margin:0;color:#0f172a}
.ovn-card--old .ovn-card-title{color:#b91c1c}
.ovn-card--new .ovn-card-title{color:#047857}
.ovn-list{margin:0;padding:0 0 0 4px;list-style:none;display:grid;gap:10px}
.ovn-list li{
  position:relative;padding-left:22px;font-size:15px;line-height:1.45;color:#334155
}
.ovn-list li::before{
  content:"";position:absolute;left:0;top:.55em;width:8px;height:8px;border-radius:999px
}
.ovn-card--old .ovn-list li::before{background:#f87171}
.ovn-card--new .ovn-list li::before{background:#34d399}
.ovn-paper{
  margin-top:auto;border-radius:12px;padding:16px;
  background:linear-gradient(180deg,#e8e8e8 0%,#f4f4f5 100%);
  border:1px dashed #cbd5e1;opacity:.85
}
.ovn-paper-lines{
  height:72px;border-radius:6px;background:repeating-linear-gradient(
    180deg,transparent,transparent 11px,#d4d4d8 11px,#d4d4d8 12px
  );
  background-color:#fafafa;box-shadow:inset 0 1px 3px rgba(0,0,0,.06)
}
.ovn-protein{margin:8px 0 0}
.ovn-protein-img{
  width:100%;max-width:320px;height:auto;border-radius:12px;
  border:1px solid #e2e8f0;box-shadow:0 6px 16px rgba(15,23,42,.08)
}
.ovn-real{margin-top:4px;padding-top:14px;border-top:1px dashed #cbd5e1}
.ovn-real-label{
  margin:0 0 12px;font-size:12px;font-weight:800;letter-spacing:.08em;
  text-transform:uppercase;color:#047857
}
.ovn-real-row{display:flex;flex-wrap:wrap;gap:12px}
.ovn-real-fig{margin:0;flex:1 1 140px;max-width:320px}
.ovn-real-img{
  width:100%;max-width:320px;height:auto;border-radius:10px;
  border:1px solid #e2e8f0;box-shadow:0 6px 14px rgba(15,23,42,.08)
}
.ovn-real-cap{margin-top:8px;font-size:12px;line-height:1.45;color:#475569}
.ovn-strip{
  margin:28px 0 0;padding:16px 20px;text-align:center;font-weight:800;font-size:clamp(15px,2.5vw,18px);
  color:#fff;border-radius:14px;
  background:linear-gradient(90deg,#1e3a8a 0%,#0d9488 50%,#059669 100%);
  box-shadow:0 8px 22px -8px rgba(30,58,138,.35)
}
`;