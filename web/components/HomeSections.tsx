"use client";

/**
 * Cronometer-style homepage sections (Oct 2026 reorganisation).
 * Content migrated from the old FREE TOOLS STRIP, Central Obesity card and
 * OUR APPROACH ("How it works") section of app/page.tsx, plus a new
 * "About Dr. Muddu" block that replaces the old tall teal header bar.
 *
 * Tokens: navy #0f172a, orange #f97316 (primary CTA only), emerald #10b981,
 * slate #64748b, border #e2e8f0, light bg #f1f5f9, radius 20 cards / 14 buttons.
 */
import { useEffect } from "react";
import Link from "next/link";

const WA = "https://wa.me/919963721999";

/* ---------- Free Health Tools ---------- */
const TOOLS = [
  { icon: "🧮", title: "HOMA-IR Calculator", sub: "Insulin resistance score", href: "/tools/homa-ir-calculator", fg: "#059669", bg: "#ecfdf5" },
  { icon: "📏", title: "Waist Risk Check", sub: "Central obesity screening", href: "/tools/waist-circumference", fg: "#ea580c", bg: "#fff7ed" },
  { icon: "📊", title: "TyG Index", sub: "Triglyceride-glucose marker", href: "/tools/tyg-index-calculator", fg: "#7c3aed", bg: "#f5f3ff" },
  { icon: "💓", title: "Organ Age Quiz", sub: "Biological age estimate", href: "#organ-age", fg: "#dc2626", bg: "#fef2f2" },
];

export function FreeHealthTools() {
  return (
    <section id="free-tools" className="hs-sec hs-white" aria-labelledby="free-tools-title">
      <div className="hs-wrap">
        <div className="hs-eyebrow">NO SIGNUP REQUIRED</div>
        <h2 id="free-tools-title" className="hs-h2">Free Sugar, Waist &amp; Heart Risk Checks</h2>
        <p className="hs-sub">Instant results. 30 seconds each.</p>
        <div className="hs-tools">
          {TOOLS.map((t) => (
            <a key={t.title} href={t.href} className="hs-tool">
              <span className="hs-tool-ic" style={{ background: t.bg, color: t.fg }} aria-hidden="true">{t.icon}</span>
              <span className="hs-tool-t">{t.title}</span>
              <span className="hs-tool-s">{t.sub}</span>
              <span className="hs-tool-go" style={{ color: t.fg }}>Start →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- The Silent Warning (migrated Central Obesity card) ---------- */
export function SilentWarning() {
  return (
    <section className="hs-sec hs-navy" aria-labelledby="silent-warning-title">
      <div className="hs-wrap">
        <div className="hs-split">
          <figure className="hs-split-img">
            <div className="hs-imgbox hs-sw-box">
              <img
                src="/images/waist-measurement.jpg"
                alt="Health worker measuring a patient's waist circumference with a measuring tape."
                width={544}
                height={1200}
                loading="lazy"
                style={{ objectPosition: "center 25%" }}
              />
            </div>
            <figcaption>Waist measurement is a better predictor of metabolic risk than weight alone.</figcaption>
          </figure>
          <div className="hs-split-txt">
            <div className="hs-eyebrow hs-eyebrow-dark">THE SILENT WARNING</div>
            <h2 id="silent-warning-title" className="hs-h2 hs-left hs-on-dark">Central Obesity is the #1 warning sign</h2>
            <p className="hs-body-dark">
              Not weight. Not BMI. <strong>Where the fat is stored</strong> decides your risk of diabetes, heart attack, and stroke.
            </p>
            <a href="/tools/waist-circumference" className="hs-btn hs-btn-primary">Know Your Waist Risk →</a>
            <div className="hs-micro">Free · 30 seconds · No signup</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- How it works (existing 5 steps, restyled; wording unchanged) ---------- */
const STEPS = [
  { num: "1", title: "Understand Your Body", desc: "HOMA-IR test + organ age assessment — detect risk years before symptoms" },
  { num: "2", title: "Find the Root Cause", desc: "Not just sugar — full metabolic diagnosis by a real MD doctor" },
  { num: "3", title: "Doctor-Designed Plan", desc: "Personally by Dr. Muddu — not an algorithm, not a chatbot" },
  { num: "4", title: "Regular Follow-up", desc: "Weekly check-ins with the doctor himself — phone, clinic, or home visit" },
  { num: "5", title: "Long-Term Remission", desc: "Goal: off medicines, not just managed. Hundreds of patients have done it" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="hs-sec hs-slate" aria-labelledby="how-title">
      <div className="hs-wrap">
        <div className="hs-eyebrow">HOW IT WORKS</div>
        <h2 id="how-title" className="hs-h2">The HOMA Approach to Diabetes Reversal</h2>
        <p className="hs-sub">Doctor-led. Science-backed. No app required.</p>
        <ol className="hs-steps">
          {STEPS.map((s) => (
            <li key={s.num} className="hs-step">
              <span className="hs-step-n" aria-hidden="true">{s.num}</span>
              <div className="hs-step-t">{s.title}</div>
              <div className="hs-step-d">{s.desc}</div>
            </li>
          ))}
        </ol>
        <div className="hs-learn"><Link href="/how-it-works">Learn more →</Link></div>
      </div>
    </section>
  );
}

/* ---------- About Dr. Muddu (content from the old teal header bar) ---------- */
export function AboutDrMuddu() {
  return (
    <section id="about" className="hs-sec hs-white" aria-labelledby="about-title">
      <span id="about-dr-muddu" aria-hidden="true" />
      <div className="hs-wrap">
        <div className="hs-about">
          <figure className="hs-about-media">
            <div className="hs-about-pair">
              <div className="hs-imgbox">
                <img src="/images/dr-muddu-portrait.jpg" alt="Dr. Muddu Surendra Nehru, M.D." width={399} height={600} loading="lazy" style={{ objectPosition: "center top" }} />
              </div>
              <div className="hs-imgbox">
                <img
                  src="/images/about-minister-book.jpg"
                  alt="Dr. Muddu Surendra Nehru presenting his book 'BP: The Untold Truth' to Telangana Minister Duddilla Sridhar Babu"
                  width={727}
                  height={1600}
                  loading="lazy"
                  style={{ objectPosition: "center 25%" }}
                />
              </div>
            </div>
            <figcaption>Dr. Muddu presenting &lsquo;BP: The Untold Truth&rsquo; to Minister Sridhar Babu.</figcaption>
          </figure>
          <div className="hs-about-txt">
            <div className="hs-eyebrow hs-eyebrow-teal">ABOUT DR. MUDDU</div>
            <h2 id="about-title" className="hs-h2 hs-left hs-navy-txt">Dr. Muddu Surendra Nehru, M.D.</h2>
            <ul className="hs-check">
              <li>Professor of Medicine</li>
              <li>Senior Physician</li>
              <li>30+ Years Experience</li>
              <li>
                Author of{' '}
                <a href="/books" className="hs-book">&lsquo;BP: The Untold Truth&rsquo;</a>
              </li>
            </ul>
            <div className="hs-contact">
              <a href="mailto:info@homahealthcarecenter.in">✉️ info@homahealthcarecenter.in</a>
              <a href="mailto:surendra.muddu@gmail.com">✉️ surendra.muddu@gmail.com</a>
            </div>
            <div className="hs-about-links">
              <a href={WA} target="_blank" rel="noopener noreferrer">Join</a>
              <span aria-hidden="true">·</span>
              <a href={`${WA}?text=I want to donate`} target="_blank" rel="noopener noreferrer">Donate</a>
              <span aria-hidden="true">·</span>
              <a href="https://feature-step-1-structure-97dp.onrender.com" target="_blank" rel="noopener noreferrer">Franchise</a>
              <span aria-hidden="true">·</span>
              <a href="https://feature-step-1-structure-97dp.onrender.com/" target="_blank" rel="noopener noreferrer">Partners</a>
            </div>
            <div className="hs-about-cta">
              <a href="tel:+919963721999" className="hs-btn hs-btn-primary">📞 Call 09963721999</a>
              <Link href="/about" className="hs-btn hs-btn-ghost">Learn more →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Photo gallery (used on /about and /how-it-works pages, not the homepage) ---------- */
export type GalleryPhoto = { src: string; alt: string; pos?: string; caption?: string };

export function PhotoGallery({ photos, title }: { photos: GalleryPhoto[]; title?: string }) {
  return (
    <div className="hs-gallery-wrap">
      <style>{CSS}</style>
      {title && <h2 className="hs-h3">{title}</h2>}
      <div className="hs-gallery">
        {photos.map((p) => (
          <figure key={p.src} className="hs-gallery-item">
            <div className="hs-imgbox">
              <img src={p.src} alt={p.alt} loading="lazy" style={{ objectPosition: p.pos ?? "center top" }} />
            </div>
            {p.caption && <figcaption>{p.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ---------- /how-it-works page body (reuses the homepage 5 steps) ---------- */
export function HowItWorksPageBody() {
  return (
    <>
      <style>{CSS}</style>
      <section className="hs-sec hs-slate">
        <div className="hs-wrap">
          <div className="hs-eyebrow hs-eyebrow-teal">HOW IT WORKS</div>
          <h1 className="hs-h2 hs-navy-txt">The HOMA Approach to Diabetes Reversal</h1>
          <p className="hs-sub">Doctor-led. Science-backed. No app required.</p>
          <ol className="hs-steps">
            {STEPS.map((s) => (
              <li key={s.num} className="hs-step">
                <span className="hs-step-n" aria-hidden="true">{s.num}</span>
                <div className="hs-step-t">{s.title}</div>
                <div className="hs-step-d">{s.desc}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="hs-sec hs-white">
        <div className="hs-wrap">
          <PhotoGallery
            title="Inside a HOMA check-up"
            photos={[
              { src: "/images/consultation.jpg", alt: "A patient having her blood sugar checked at HOMA Healthcare Center.", pos: "center 45%", caption: "Step 1 — blood sugar and HOMA-IR testing." },
              { src: "/images/silent-warning.jpg", alt: "Doctor measuring a patient's waist with a measuring tape during a metabolic health check at HOMA Healthcare Center.", pos: "center top", caption: "Step 2 — waist measurement as part of the full metabolic diagnosis." },
            ]}
          />
          <div className="hs-page-cta">
            <a href="/remission-program" className="hs-btn hs-btn-primary">Start your 90-day reset →</a>
            <a href="/tools" className="hs-btn hs-btn-ghost">Try free health checks</a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Fade-in per section (IntersectionObserver, respects reduced motion) ---------- */
export function HomeFadeIn() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section")).filter(
      (el) => !el.parentElement?.closest("section"),
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("hs-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );
    for (const el of sections) {
      if (el.getBoundingClientRect().top < window.innerHeight) continue; // already visible: no flash
      el.classList.add("hs-fade");
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
  return <style>{CSS}</style>;
}

const CSS = `
.hs-fade{opacity:0;transform:translateY(18px);transition:opacity .6s ease,transform .6s ease}
.hs-fade.hs-in{opacity:1;transform:none}
@media (prefers-reduced-motion: reduce){.hs-fade{opacity:1;transform:none;transition:none}}

.hs-sec{padding:48px 20px;color:#0f172a}
@media (min-width:768px){.hs-sec{padding:80px 32px}}
.hs-white{background:#fff}
.hs-slate{background:#f1f5f9}
.hs-navy{background:#0f172a}
.hs-wrap{max-width:1080px;margin:0 auto}
.hs-eyebrow{font-size:12px;font-weight:700;letter-spacing:.14em;color:#10b981;text-align:center;margin-bottom:10px}
.hs-eyebrow-dark{color:#34d399;text-align:left}
.hs-h2{font-size:clamp(26px,4.2vw,40px);line-height:1.15;font-weight:800;letter-spacing:-.02em;margin:0 0 10px;text-align:center;color:#0f172a}
.hs-left{text-align:left}
.hs-on-dark{color:#fff}
.hs-sub{text-align:center;color:#64748b;font-size:16px;margin:0 0 32px}
@media (min-width:768px){.hs-sub{margin-bottom:44px;font-size:17px}}

.hs-btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 22px;border-radius:14px;font-weight:700;font-size:16px;text-decoration:none;transition:background .15s,transform .15s}
.hs-btn-primary{background:#f97316;color:#fff;box-shadow:0 10px 22px -10px rgba(249,115,22,.8)}
.hs-btn-primary:hover{background:#ea580c}
.hs-btn:active{transform:scale(.98)}
.hs-btn-ghost{background:#fff;color:#1e3a8a;border:1px solid #e2e8f0}
.hs-btn-ghost:hover{background:#f8fafc;border-color:#cbd5e1}
.hs-learn{text-align:center;margin-top:24px}
.hs-learn a{display:inline-flex;align-items:center;min-height:48px;padding:0 6px;color:#1e3a8a;font-weight:700;font-size:16px;text-decoration:none}
.hs-learn a:hover{text-decoration:underline;text-underline-offset:3px}

/* tools */
.hs-tools{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
@media (min-width:900px){.hs-tools{grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}}
.hs-tool{display:flex;flex-direction:column;align-items:flex-start;gap:4px;background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:18px 16px;min-height:168px;text-decoration:none;color:#0f172a;box-shadow:0 1px 2px rgba(15,23,42,.04);transition:box-shadow .2s,transform .2s,border-color .2s}
.hs-tool:hover{border-color:#cbd5e1;box-shadow:0 12px 28px -14px rgba(15,23,42,.25);transform:translateY(-2px)}
@media (min-width:900px){.hs-tool{padding:24px 22px;min-height:196px}}
.hs-tool-ic{width:48px;height:48px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:10px}
.hs-tool-t{font-weight:700;font-size:15px;line-height:1.25}
@media (min-width:900px){.hs-tool-t{font-size:17px}}
.hs-tool-s{color:#64748b;font-size:13px;line-height:1.35}
.hs-tool-go{margin-top:auto;padding-top:10px;font-weight:700;font-size:14px}
.hs-more{text-align:center;margin-top:20px}
.hs-more a{display:inline-flex;align-items:center;min-height:48px;color:#0f172a;font-weight:600;font-size:15px;text-decoration:underline;text-underline-offset:3px}

/* silent warning */
.hs-split{display:grid;grid-template-columns:1fr;gap:20px;align-items:center}
@media (min-width:768px){.hs-split{grid-template-columns:5fr 7fr;gap:40px}}
.hs-split-img{margin:0}
.hs-imgbox{position:relative;overflow:hidden;background:#e2e8f0;border-radius:12px;box-shadow:0 8px 20px rgba(15,23,42,.08)}
.hs-imgbox img{display:block;width:100%;height:100%;object-fit:cover;object-position:center top}
.hs-sw-box{border-radius:20px;aspect-ratio:4/5;max-height:520px}
@media (min-width:768px){.hs-sw-box{aspect-ratio:3/4}}
.hs-split-img figcaption{margin-top:10px;font-size:13px;line-height:1.45;color:#94a3b8}
.hs-split-txt{padding:0 2px}
@media (min-width:768px){.hs-split-txt{padding:0}}
.hs-body-dark{color:rgba(226,232,240,.85);font-size:16px;line-height:1.65;margin:0 0 24px;max-width:520px}
.hs-body-dark strong{color:#fff}
.hs-micro{color:#94a3b8;font-size:13px;margin-top:12px}

/* how it works */
.hs-steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr;gap:12px}
@media (min-width:600px){.hs-steps{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:960px){.hs-steps{grid-template-columns:repeat(5,minmax(0,1fr));gap:16px}}
.hs-step{background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:22px 20px;text-align:left}
.hs-step-n{width:40px;height:40px;border-radius:999px;background:#0f172a;color:#fff;font-weight:800;font-size:17px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
.hs-step-t{font-weight:700;font-size:16px;margin-bottom:6px;color:#0f172a}
.hs-step-d{color:#64748b;font-size:14px;line-height:1.55}

/* gallery (sub-pages) */
.hs-h3{font-size:clamp(22px,3vw,30px);font-weight:800;color:#1e3a8a;margin:0 0 18px;letter-spacing:-.01em}
.hs-gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
@media (min-width:768px){.hs-gallery{gap:20px}}
@media (max-width:359px){.hs-gallery{grid-template-columns:1fr}}
.hs-gallery-item{margin:0}
.hs-gallery-item .hs-imgbox{aspect-ratio:3/4;border-radius:16px}
.hs-gallery-item figcaption{margin-top:8px;font-size:13px;line-height:1.45;color:#64748b}
.hs-page-cta{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:36px}

/* about */
#about{scroll-margin-top:72px}
.hs-eyebrow-teal{color:#0d9488}
.hs-navy-txt{color:#1e3a8a}
.hs-about{display:flex;flex-direction:column;align-items:center;gap:24px;background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:20px 20px 28px;overflow:hidden}
@media (min-width:960px){.hs-about{flex-direction:row;align-items:center;gap:44px;padding:28px 48px 28px 28px}}
.hs-about-media{margin:0;width:100%;max-width:460px;flex-shrink:0}
.hs-about-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.hs-about-pair .hs-imgbox{aspect-ratio:3/4}
.hs-about-media figcaption{margin-top:10px;font-size:13px;line-height:1.45;color:#64748b;text-align:center}
@media (min-width:960px){.hs-about-media{width:400px;max-width:400px}.hs-about-media figcaption{text-align:left}}
.hs-about-txt{width:100%;min-width:0}
@media (min-width:960px){.hs-about-txt{padding:16px 0}}
.hs-about-txt .hs-eyebrow{text-align:left}
.hs-check{list-style:none;padding:0;margin:6px 0 18px;display:grid;gap:8px}
.hs-check li{position:relative;padding-left:30px;color:#0f172a;font-size:16px}
.hs-check li::before{content:"✓";position:absolute;left:0;top:1px;width:20px;height:20px;border-radius:999px;background:#f0fdfa;color:#0d9488;font-weight:800;font-size:12px;display:flex;align-items:center;justify-content:center}
.hs-book{color:#1e3a8a;font-weight:700;text-decoration:underline;text-underline-offset:3px}
.hs-contact{display:flex;flex-wrap:wrap;gap:4px 20px;margin-bottom:8px}
.hs-contact a{display:inline-flex;align-items:center;min-height:44px;color:#0f172a;font-weight:600;text-decoration:none;overflow-wrap:anywhere}
.hs-contact a:hover{text-decoration:underline}
.hs-about-links{display:flex;flex-wrap:wrap;align-items:center;gap:2px 10px;color:#94a3b8;margin-bottom:18px}
.hs-about-links a{display:inline-flex;align-items:center;min-height:44px;color:#64748b;font-weight:600;text-decoration:none}
.hs-about-links a:hover{color:#1e3a8a;text-decoration:underline}
.hs-about-cta{display:flex;flex-wrap:wrap;gap:12px}
`;
