"use client";
import { useState } from "react";
import { PUB_CATEGORIES, PUB_STATS, TITLED_PUBLICATIONS, type PublicationType } from "@/lib/publications";

type Tab = "outcomes" | "method" | "pubs" | "gov";
const TABS: { id: Tab; label: string }[] = [
  { id: "outcomes", label: "Outcomes & endpoints" },
  { id: "method", label: "Method & validation" },
  { id: "pubs", label: "Publications & priority" },
  { id: "gov", label: "Governance & consent" },
];

const ENDPOINTS = [
  { id: "remission", name: "Diabetes remission / target range", def: "HbA1c below 6.5% sustained at least 3 months without glucose-lowering medication (international consensus definition), or agreed individualized target range.", ref: "HbA1c by HPLC at baseline and 90 days; medication log reviewed by the clinician.", why: "The primary, patient-meaningful outcome of the protocol; pre-specified before analysis.", report: "Aggregate proportion of consented cohort in remission / target range at 90 days." },
  { id: "insulin", name: "Insulin / oral-agent requirement", def: "Change in total daily insulin units or oral glucose-lowering dose versus baseline, clinician-titrated.", ref: "Prescription record at baseline vs 90 days; same participant.", why: "Shows reduced pharmacological burden as metabolic function improves.", report: "Median reduction and interquartile range across consented cohort." },
  { id: "hba1c", name: "HbA1c delta", def: "Absolute change in HbA1c from baseline to 90 days.", ref: "HPLC HbA1c, same lab method both timepoints.", why: "Continuous glycaemic improvement signal with confidence interval.", report: "Mean delta with 95% CI; subgroup by age / sex / subtype." },
  { id: "ir", name: "Insulin-resistance surrogates (TyG, HOMA-IR)", def: "TyG = ln(TG×FPG/2); HOMA-IR = (FPG×insulin)/405 (mg/dL). Trend baseline→90 days.", ref: "Fasting lipids + glucose + insulin, same lab.", why: "Mechanistic signal that the protocol is acting on insulin resistance.", report: "Median change; correlated with remission status." },
  { id: "efficiency", name: "Tests-per-case & retention", def: "Confirmatory tests ordered per case identified; proportion retained at 90 days.", ref: "Clinic records + follow-up log.", why: "Efficiency and engagement of the doctor-led pathway.", report: "Aggregate counts and retention percentage." },
];

const SUMMARY = `HOMA Health Clinics — doctor-led metabolic remission (Dr. Muddu Surendra Nehru, MD, Professor of Medicine, ${PUB_STATS.years} years; ${PUB_STATS.patients} patients treated; DPIIT DIPP275722). India-specific cutoffs link waist, TyG, HOMA-IR, muscle and visceral-fat signals into 32 subtypes; per-subtype 30-day diet, sleep/exercise and lab-phenotyped medicine titration, reviewed at 90 days. Pre-specified endpoints: remission/target range, insulin-requirement reduction, HbA1c delta, TyG/HOMA-IR trend, tests-per-case and retention. Aggregate consented outcomes only; individual results vary. Priority: ${PUB_STATS.international} international papers (${PUB_STATS.internationalYear}), ${PUB_STATS.books} books.`;

export default function EvidenceHub() {
  const [tab, setTab] = useState<Tab>("outcomes");
  const [ep, setEp] = useState(ENDPOINTS[0].id);
  const [pubFilter, setPubFilter] = useState<"all" | PublicationType>("all");
  const [copied, setCopied] = useState(false);
  const active = ENDPOINTS.find((e) => e.id === ep)!;
  const titled = TITLED_PUBLICATIONS.filter((p) => pubFilter === "all" || p.type === pubFilter);

  const copy = async () => {
    try { await navigator.clipboard.writeText(SUMMARY); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); }
  };

  return (
    <div className="evh">
      <style>{`
        .evh,.evh *{box-sizing:border-box}
        .evh{--e-ink:#0A1E3C;--e-ink2:#33415C;--e-paper:#F6F3EA;--e-line:#E4DECF;--e-teal:#0E7C7B;--e-tealb:#12A5A0;--e-amber:#E8A13A;--e-emer:#1E9E6A;--e-red:#D64550;
          background:var(--e-paper);color:var(--e-ink);min-height:100vh;overflow-x:clip;font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans Telugu",sans-serif;scrollbar-width:thin;scrollbar-color:var(--e-teal) var(--e-paper);}
        .evh ::-webkit-scrollbar{width:10px;height:10px}.evh ::-webkit-scrollbar-track{background:var(--e-paper)}.evh ::-webkit-scrollbar-thumb{background:var(--e-teal);border-radius:8px;border:2px solid var(--e-paper)}.evh ::-webkit-scrollbar-thumb:hover{background:var(--e-ink)}
        .evh-bar{position:sticky;top:0;z-index:30;display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;padding:10px 16px;background:rgba(10,30,60,.94);backdrop-filter:blur(8px);color:#fff;}
        .evh-bar strong{min-width:0;flex:1 1 auto;font-size:14px;}
        .evh-btn{border:0;border-radius:10px;padding:8px 14px;font-size:12.5px;font-weight:800;cursor:pointer;white-space:nowrap;flex:0 0 auto;transition:filter .15s ease,transform .15s ease;}
        .evh-btn:hover{filter:brightness(1.08);transform:translateY(-1px)}.evh-btn:active{transform:scale(.97)}
        .evh-hero{background:radial-gradient(700px 320px at 88% -10%,rgba(232,161,58,.35),transparent 60%),radial-gradient(520px 280px at 6% 110%,rgba(18,165,160,.32),transparent 60%),linear-gradient(135deg,#0A1E3C,#0E3A5C 46%,#0E7C7B);color:#fff;padding:40px 20px;position:relative;overflow:hidden;}
        .evh-hero::after{content:"";position:absolute;inset:0;opacity:.05;pointer-events:none;background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2"/></filter><rect width="140" height="140" filter="url(%23n)" opacity="0.6"/></svg>');}
        .evh-wrap{max-width:960px;margin:0 auto;padding:24px 20px 48px;}
        .evh-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0;}
        .evh-tab{border:1px solid var(--e-line);background:#fff;border-radius:999px;padding:8px 16px;font-size:13px;font-weight:700;color:var(--e-ink2);cursor:pointer;transition:all .15s ease;}
        .evh-tab[data-on="true"]{background:var(--e-ink);color:#fff;border-color:var(--e-ink);}
        .evh-card{background:#fff;border:1px solid var(--e-line);border-radius:16px;padding:18px;box-shadow:0 1px 2px rgba(10,30,60,.05),0 12px 30px -20px rgba(10,30,60,.22);}
        .evh-ep{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;}
        .evh-epbtn{border:1px solid var(--e-line);background:var(--e-paper);border-radius:10px;padding:8px 12px;font-size:12.5px;font-weight:700;color:var(--e-ink2);cursor:pointer;}
        .evh-epbtn[data-on="true"]{background:var(--e-teal);color:#fff;border-color:var(--e-teal);}
        .evh-k{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--e-teal);}
        .evh-grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));}
        .evh-stat{background:linear-gradient(135deg,#0E3A5C,#0E7C7B);color:#fff;border-radius:16px;padding:16px;}
        .evh-stat b{font-size:26px;color:#F2C879;display:block;}
        .evh-li{display:flex;gap:10px;margin:8px 0;font-size:14px;line-height:1.55;color:var(--e-ink2);}
        .evh-li b{color:var(--e-teal);flex:0 0 auto;}
        .evh-chip{display:inline-block;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.1);border-radius:999px;padding:4px 12px;font-size:11.5px;font-weight:700;margin:0 6px 6px 0;}
        .evh-pub{border:1px solid var(--e-line);border-left:4px solid var(--e-teal);border-radius:12px;padding:12px;background:#fff;}
        .evh-rise{animation:evhRise .5s ease-out both}@keyframes evhRise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        @media print{.evh-bar,.evh-tabs,.evh-ep,.evh-noprint{display:none!important}.evh [hidden]{display:block!important}.evh-hero{padding:20px}.evh-card{box-shadow:none;page-break-inside:avoid}}
        @media (prefers-reduced-motion:reduce){.evh *{animation:none!important;transition:none!important}}
      `}</style>

      <div className="evh-bar evh-noprint">
        <strong>HOMA · Evidence & Publications</strong>
        <button className="evh-btn" style={{ background: "var(--e-amber)", color: "var(--e-ink)" }} onClick={copy}>{copied ? "Copied ✓" : "Copy evidence summary"}</button>
        <button className="evh-btn" style={{ background: "var(--e-teal)", color: "#fff" }} onClick={() => window.print()}>Save as PDF</button>
      </div>

      <header className="evh-hero">
        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
          <p className="evh-k" style={{ color: "#F2C879" }}>Evidence · priority · governance</p>
          <h1 style={{ fontSize: "clamp(26px,4.5vw,40px)", fontWeight: 800, margin: "8px 0" }}>What we measure, what we've published, how we protect patients.</h1>
          <p style={{ maxWidth: 760, color: "rgba(255,255,255,.85)", fontSize: 15 }}>Dr. Muddu Surendra Nehru, MD · Professor of Medicine · {PUB_STATS.years} years · {PUB_STATS.patients} patients treated · {PUB_STATS.books} books · {PUB_STATS.international} international papers ({PUB_STATS.internationalYear}) · DPIIT DIPP275722. Aggregate, consented evidence only — individual results vary.</p>
          <div style={{ marginTop: 12 }}>
            <span className="evh-chip">✓ Pre-specified endpoints</span><span className="evh-chip">✓ Locked protocol</span><span className="evh-chip">✓ Timestamped publications</span><span className="evh-chip">✓ DPDP + consent</span>
          </div>
        </div>
      </header>

      <div className="evh-wrap">
        <div className="evh-tabs evh-noprint" role="tablist">
          {TABS.map((t) => (<button key={t.id} role="tab" aria-selected={tab === t.id} className="evh-tab" data-on={tab === t.id} onClick={() => setTab(t.id)}>{t.label}</button>))}
        </div>

        <section hidden={tab !== "outcomes"} className="evh-card evh-rise">
          <p className="evh-k">Outcomes & endpoints</p>
          <h2 style={{ fontSize: 21, fontWeight: 800, margin: "6px 0 12px" }}>Pick an endpoint to see exactly how it is defined and reported</h2>
          <div className="evh-ep evh-noprint">
            {ENDPOINTS.map((e) => (<button key={e.id} className="evh-epbtn" data-on={ep === e.id} onClick={() => setEp(e.id)}>{e.name}</button>))}
          </div>
          <div className="evh-card" style={{ background: "var(--e-paper)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 800 }}>{active.name}</h3>
            <p className="evh-li"><b>Definition</b><span>{active.def}</span></p>
            <p className="evh-li"><b>Reference</b><span>{active.ref}</span></p>
            <p className="evh-li"><b>Why it matters</b><span>{active.why}</span></p>
            <p className="evh-li"><b>Reported as</b><span>{active.report}</span></p>
          </div>
          <p style={{ fontSize: 12, color: "var(--e-ink2)", marginTop: 10 }}>No performance is claimed here; targets are locked in the protocol before analysis. Aggregate figures are released only with signed consent and ethics oversight.</p>
        </section>

        <section hidden={tab !== "method"} className="evh-card evh-rise">
          <p className="evh-k">Method & validation</p>
          <h2 style={{ fontSize: 21, fontWeight: 800, margin: "6px 0 12px" }}>The Dr. Nehru Method, and how it is validated</h2>
          <p className="evh-li"><b>▸</b><span>India-specific cutoffs link waist, WHtR, BMI (Asian), TyG, HOMA-IR, skeletal-muscle and visceral-fat signals into 32 metabolic subtypes.</span></p>
          <p className="evh-li"><b>▸</b><span>Each subtype receives a personalised 30-day diet, daily sleep/exercise, and lab-phenotyped medicine titration; reviewed at 90 days.</span></p>
          <p className="evh-li"><b>▸</b><span>Development cohort locks the protocol; a separate validation cohort tests it; protocol fixed before prospective analysis.</span></p>
          <p className="evh-li"><b>▸</b><span>Reference standards: HbA1c (HPLC), fasting insulin/lipids, eGFR/UACR where indicated; sample size justified by biostatistician; TRIPOD+AI / STARD reporting; PROBAST bias check.</span></p>
          <p className="evh-li"><b>▸</b><span>Honest position: a clinical-protocol / implementation innovation (India-specific, first at this scale locally) — not a "first-in-world" device claim.</span></p>
        </section>

        <section hidden={tab !== "pubs"} className="evh-rise">
          <div className="evh-grid">
            {PUB_CATEGORIES.map((p) => (
              <div key={p.label} className="evh-stat"><b>{p.count}</b><span style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>{p.label}</span>
                <p style={{ fontSize: 12.5, marginTop: 8, color: "rgba(255,255,255,.85)", lineHeight: 1.5 }}>{p.detail}</p></div>
            ))}
          </div>
          <div className="evh-card" style={{ marginTop: 14 }}>
            <div className="evh-ep evh-noprint" style={{ marginBottom: 10 }}>
              <button className="evh-epbtn" data-on={pubFilter === "all"} onClick={() => setPubFilter("all")}>All titled</button>
              <button className="evh-epbtn" data-on={pubFilter === "international"} onClick={() => setPubFilter("international")}>International journals</button>
              <button className="evh-epbtn" data-on={pubFilter === "book"} onClick={() => setPubFilter("book")}>Books</button>
            </div>
            {titled.length > 0 ? (
              <div style={{ display: "grid", gap: 10 }}>
                {titled.map((p) => (
                  <div key={p.id} className="evh-pub">
                    <strong style={{ fontSize: 14, lineHeight: 1.45 }}>{p.title}</strong>
                    <p style={{ fontSize: 12.5, color: "var(--e-ink2)", marginTop: 4 }}>{p.venue}{p.citation ? ` · ${p.citation}` : ""} · {p.year}{p.url ? <> · <a href={p.url} style={{ color: "var(--e-teal)", fontWeight: 700 }}>link</a></> : null}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="evh-card" style={{ background: "var(--e-paper)" }}>
                <p className="evh-li"><b>▸</b><span>Remaining official titles are being catalogued. The counts above are verified; individual titles, venues and offprints are released on request for reviewers, funders and partners.</span></p>
              </div>
            )}
            <p className="evh-li" style={{ marginTop: 10 }}><b>▸</b><span>Publications and books are dated prior work — they timestamp the method and establish priority for IP and grant novelty arguments.</span></p>
            <a href="mailto:surendra.muddu@gmail.com?subject=Request%3A%20full%20publication%20list%20%26%20offprints" className="evh-btn evh-noprint" style={{ background: "var(--e-teal)", color: "#fff", display: "inline-block", marginTop: 6 }}>Request full list & offprints</a>
          </div>
        </section>

        <section hidden={tab !== "gov"} className="evh-card evh-rise">
          <p className="evh-k">Governance & consent</p>
          <h2 style={{ fontSize: 21, fontWeight: 800, margin: "6px 0 12px" }}>Clinician gate, DPDP, audit, fairness</h2>
          <p className="evh-li"><b>▸</b><span>Every output will be clinician-reviewed; the platform screens and supports — it will not diagnose or prescribe autonomously.</span></p>
          <p className="evh-li"><b>▸</b><span>Written informed consent will be obtained; DPDP Act 2023 / Rules 2025 will apply, with pseudonymised records, role-based access and an audit log; the system will abstain on low confidence.</span></p>
          <p className="evh-li"><b>▸</b><span>No patient names or faces will be published without signed consent; abnormal results will be returned with referral.</span></p>
          <p className="evh-li"><b>▸</b><span>Performance will be reported by age / sex / region / comorbidity, with ethics (IEC) oversight and CTRI registration where applicable.</span></p>
          <p style={{ fontSize: 12, color: "var(--e-ink2)", marginTop: 10 }}>Screening / education only — not a diagnosis. Remission / target-range; individual results vary. Confirm with your doctor.</p>
        </section>
      </div>
    </div>
  );
}
