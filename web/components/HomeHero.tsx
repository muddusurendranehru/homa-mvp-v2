'use client'

import { useEffect, useState, type MouseEvent } from 'react'

/**
 * Homepage hero (Cronometer-style). Background: hero-yoga.jpg (stock-style yoga silhouette); desktop keeps the figure uncovered on the right.
 * The tracker card is clearly labelled "Sample tracker": illustrative only, no patient results.
 */
const R = 42
const CIRC = 263.89 // 2 * PI * 42

const RINGS = [
  { color: '#10b981', label: 'Diet', value: '6/7', unit: 'days logged', pct: 6 / 7 },
  { color: '#a855f7', label: 'Exercise', value: '5/7', unit: 'days active', pct: 5 / 7 },
  { color: '#f97316', label: 'Sleep', value: '7h', unit: 'avg / night', pct: 7 / 8 },
]

function Ring({ color, label, value, unit, pct, delay, go }: (typeof RINGS)[number] & { delay: number; go: boolean }) {
  return (
    <div className="hh-ring">
      <div style={{ position: 'relative', width: '100%', maxWidth: 92, margin: '0 auto' }}>
        <svg viewBox="0 0 100 100" style={{ display: 'block', width: '100%', transform: 'rotate(-90deg)' }} aria-hidden="true">
          <circle cx="50" cy="50" r={R} fill="none" stroke="#f1f5f9" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={go ? CIRC * (1 - pct) : CIRC}
            style={{ transition: `stroke-dashoffset 1100ms cubic-bezier(.22,1,.36,1) ${delay}ms` }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{value}</span>
        </div>
      </div>
      <div style={{ marginTop: 6, fontSize: 13, fontWeight: 700, color }}>{label}</div>
      <div style={{ fontSize: 11, color: '#64748b' }}>{unit}</div>
    </div>
  )
}

export default function HomeHero() {
  const [go, setGo] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setGo(true)))
    return () => cancelAnimationFrame(id)
  }, [])

  const goAbout = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById('about')
    if (!el) return
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(null, '', '#about')
  }

  return (
    <section className="hh-hero" aria-label="HOMA 90-day reset">
      <style>{CSS}</style>
      <div className="hh-inner">
        <div className="hh-copy">
          <h1 className="hh-h1">
            Your doctor-guided <span className="hh-grad">90-day</span> reset — tracked daily.
          </h1>
          <p className="hh-sub">
            Diet, exercise and sleep on your phone — with follow-up until your numbers improve. Led by Dr. Muddu
            Surendra Nehru MD, HOMA Healthcare Center.
          </p>
          <div className="hh-ctas">
            <a href="/remission-program" className="hh-btn hh-primary">
              Start your 90-day reset →
            </a>
            <a href="/health-check" className="hh-btn hh-glass">
              Try free health checks
            </a>
          </div>
          <ul className="hh-trust">
            <li><span className="hh-tick" aria-hidden="true">✓</span> Free checks</li>
            <li><span className="hh-tick" aria-hidden="true">✓</span> No signup</li>
            <li><span className="hh-tick" aria-hidden="true">✓</span> Doctor-led</li>
          </ul>

          <a href="#about" onClick={goAbout} className="hh-pill" aria-label="Meet your doctor: Dr. Muddu Surendra Nehru, M.D. — jump to About">
            <img src="/images/dr-muddu-face.jpg" alt="" width={44} height={44} />
            <span className="hh-pill-txt">
              <span className="hh-pill-lbl">Meet your doctor</span>
              <strong>Dr. Muddu Surendra Nehru, M.D.</strong>
              <span className="hh-pill-sub">Professor of Medicine · 30+ yrs</span>
            </span>
            <span className="hh-pill-arr" aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="hh-card" role="img" aria-label="Sample tracker showing diet, exercise and sleep rings">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>This week</span>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>Sample tracker</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
            {RINGS.map((r, i) => (
              <Ring key={r.label} {...r} delay={i * 150} go={go} />
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
            Illustration of the daily tracker, not a patient result.
          </div>
        </div>
      </div>
    </section>
  )
}

const CSS = `
.hh-hero{position:relative;min-height:calc(100svh - 64px);display:flex;flex-direction:column;justify-content:center;
  padding:calc(32px + env(safe-area-inset-top)) calc(20px + env(safe-area-inset-right)) calc(32px + env(safe-area-inset-bottom)) calc(20px + env(safe-area-inset-left));
  background:linear-gradient(180deg,rgba(15,23,42,.35) 0%,rgba(15,23,42,.55) 55%,rgba(15,23,42,.90) 100%),url('/images/hero-yoga.jpg') 74% 100%/cover no-repeat,#0f172a;
  color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Noto Sans","Helvetica Neue",Arial,sans-serif;overflow:hidden;box-sizing:border-box}
.hh-hero *{box-sizing:border-box}
.hh-inner{width:100%;max-width:1180px;margin:0 auto;display:flex;flex-direction:column;gap:28px;align-items:center}
.hh-copy{max-width:560px;width:100%;text-align:center;display:flex;flex-direction:column;align-items:center}
.hh-h1{font-size:clamp(30px,8vw,56px);line-height:1.08;font-weight:800;letter-spacing:-.02em;margin:0 0 14px;text-shadow:0 2px 18px rgba(0,0,0,.45)}
.hh-grad{background:linear-gradient(90deg,#fdba74,#f97316 55%,#ea580c);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;white-space:nowrap}
.hh-sub{font-size:clamp(16px,4.2vw,19px);line-height:1.55;color:rgba(255,255,255,.94);margin:0 0 22px;text-shadow:0 1px 12px rgba(0,0,0,.6)}
.hh-ctas{display:flex;flex-direction:column;gap:12px;width:100%}
.hh-btn{display:flex;align-items:center;justify-content:center;min-height:52px;padding:14px 24px;border-radius:14px;font-weight:800;font-size:17px;text-decoration:none;text-align:center;transition:transform .15s ease,box-shadow .15s ease}
.hh-btn:active{transform:scale(.97)}
.hh-primary{background:#f97316;color:#fff;box-shadow:0 10px 24px -8px rgba(249,115,22,.7)}
.hh-primary:hover{background:#ea580c}
.hh-glass{background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.35);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.hh-glass:hover{background:rgba(255,255,255,.2)}
.hh-trust{list-style:none;padding:0;margin:18px 0 0;display:flex;flex-wrap:wrap;justify-content:center;gap:8px 18px;font-size:15px;font-weight:600;color:#fff;text-shadow:0 1px 10px rgba(0,0,0,.55)}
.hh-tick{color:#2dd4bf;font-weight:800;margin-right:2px}
.hh-pill{margin-top:20px;display:flex;align-items:center;gap:12px;width:100%;max-width:340px;min-height:56px;padding:6px 14px 6px 6px;border-radius:999px;text-align:left;text-decoration:none;color:#fff;
  background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);transition:background .15s ease,transform .15s ease}
.hh-pill:hover{background:rgba(255,255,255,.18)}
.hh-pill:active{transform:scale(.98)}
.hh-pill:focus-visible{outline:3px solid #2dd4bf;outline-offset:3px}
.hh-pill img{width:44px;height:44px;border-radius:50%;object-fit:cover;object-position:top;flex-shrink:0;background:#fff;border:2px solid rgba(255,255,255,.75)}
.hh-pill-txt{display:flex;flex-direction:column;min-width:0;line-height:1.25}
.hh-pill-lbl{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#5eead4}
.hh-pill-txt strong{font-size:14px;font-weight:800;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hh-pill-sub{font-size:12px;color:rgba(255,255,255,.7)}
.hh-pill-arr{margin-left:auto;font-size:16px;color:rgba(255,255,255,.7);padding-left:4px}
.hh-card{width:100%;max-width:360px;background:#fff;border-radius:22px;padding:16px;box-shadow:0 20px 40px -12px rgba(0,0,0,.45);color:#0f172a}
.hh-ring{text-align:center;min-width:0}
@media (min-width:640px){
  .hh-ctas{flex-direction:row;justify-content:center}
}
/* Desktop: copy in the left half, yoga figure uncovered in the right half */
@media (min-width:1024px){
  .hh-hero{min-height:min(820px,calc(100svh - 64px));padding-top:56px;padding-bottom:56px;
    background:
      linear-gradient(90deg,rgba(15,23,42,.92) 0%,rgba(15,23,42,.78) 32%,rgba(15,23,42,.35) 48%,rgba(15,23,42,0) 60%),
      linear-gradient(180deg,rgba(15,23,42,.35) 0%,rgba(15,23,42,.55) 55%,rgba(15,23,42,.90) 100%),
      url('/images/hero-yoga.jpg') right center/auto 100% no-repeat,#0f172a}
  .hh-inner{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:40px}
  .hh-copy{text-align:left;align-items:flex-start;grid-column:1}
  .hh-ctas{justify-content:flex-start;width:auto}
  .hh-trust{justify-content:flex-start}
  .hh-card{grid-column:1;max-width:400px;margin-top:-8px}
}
@media (min-width:1024px) and (max-aspect-ratio:3/2){
  .hh-hero{background:
      linear-gradient(90deg,rgba(15,23,42,.92) 0%,rgba(15,23,42,.78) 36%,rgba(15,23,42,.35) 52%,rgba(15,23,42,0) 64%),
      linear-gradient(180deg,rgba(15,23,42,.35) 0%,rgba(15,23,42,.55) 55%,rgba(15,23,42,.90) 100%),
      url('/images/hero-yoga.jpg') 75% center/cover no-repeat,#0f172a}
}
`
