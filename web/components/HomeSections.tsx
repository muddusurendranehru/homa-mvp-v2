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
          <div className="hs-split-img">
            <img src="/images/hero-waist.jpg" alt="Real waist measurement — central obesity detection" loading="lazy" />
            <span className="hs-tint" aria-hidden="true" />
          </div>
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
            <div className="hs-about-ph">
              <img
                src="/images/about-minister-book.jpg"
                alt="Dr. Muddu Surendra Nehru presenting his book 'BP: The Untold Truth' to Telangana Minister Duddilla Sridhar Babu"
                width={727}
                height={1600}
                loading="lazy"
              />
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
            </div>
          </div>
        </div>
      </div>
    </section>
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
.hs-split{display:grid;grid-template-columns:1fr;border-radius:20px;overflow:hidden;background:#111c33;border:1px solid rgba(148,163,184,.18)}
@media (min-width:768px){.hs-split{grid-template-columns:5fr 7fr}}
.hs-split-img{position:relative;aspect-ratio:4/3;overflow:hidden}
@media (min-width:768px){.hs-split-img{aspect-ratio:auto;min-height:380px}}
.hs-split-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 32%;display:block}
.hs-tint{position:absolute;inset:0;background:linear-gradient(180deg,rgba(30,64,175,.28),rgba(15,23,42,.45))}
.hs-split-txt{padding:28px 22px 30px}
@media (min-width:768px){.hs-split-txt{padding:48px 44px;align-self:center}}
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

/* about */
#about{scroll-margin-top:72px}
.hs-eyebrow-teal{color:#0d9488}
.hs-navy-txt{color:#1e3a8a}
.hs-about{display:flex;flex-direction:column;align-items:center;gap:24px;background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:20px 20px 28px;overflow:hidden}
@media (min-width:768px){.hs-about{flex-direction:row;align-items:center;gap:44px;padding:28px 48px 28px 28px}}
.hs-about-media{margin:0;width:100%;max-width:420px;flex-shrink:0}
.hs-about-ph{border-radius:16px;overflow:hidden;background:#e2e8f0;height:420px;box-shadow:0 12px 28px -16px rgba(15,23,42,.45)}
.hs-about-ph img{display:block;width:100%;height:100%;object-fit:cover;object-position:center 22%}
.hs-about-media figcaption{margin-top:10px;font-size:13px;line-height:1.45;color:#64748b;text-align:center}
@media (min-width:768px){.hs-about-media{width:340px;max-width:340px}.hs-about-ph{height:480px}.hs-about-media figcaption{text-align:left}}
.hs-about-txt{width:100%;min-width:0}
@media (min-width:768px){.hs-about-txt{padding:16px 0}}
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
