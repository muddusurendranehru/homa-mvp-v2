"use client";
import { useState } from "react";

const WA = "919963721999";
const FORM_URL = "https://forms.gle/k5RtV8pBP7WuYXdRA";

type Track = { id: string; title: string; who: string; gives: string[]; msg: string };

const TRACKS: Track[] = [
  { id: "academic", title: "Academic", who: "Doctors, faculty, PG students",
    gives: ["Teach or co-teach HOMA metabolic sessions", "Case discussions and CME", "Co-author teaching material"],
    msg: "JOIN HOMA - ACADEMIC" },
  { id: "franchise", title: "Franchise / Partner clinic", who: "Clinics and doctors who want to run the HOMA protocol",
    gives: ["Training in the HOMA method", "Listing on HOMA Care Network", "Shared protocols and patient education"],
    msg: "JOIN HOMA - FRANCHISE" },
  { id: "investor", title: "Investor", who: "Individuals and institutions",
    gives: ["Discussion with the founder", "Evidence pack on request", "Enquiry only, not an offer of shares"],
    msg: "JOIN HOMA - INVESTOR ENQUIRY" },
  { id: "volunteer", title: "Volunteer", who: "Doctors, students, community members",
    gives: ["Health camps and awareness drives", "Patient education in local language", "Flexible time"],
    msg: "JOIN HOMA - VOLUNTEER" },
  { id: "author", title: "Paper / Book writer", who: "Clinicians and researchers",
    gives: ["Co-write papers with Dr. Muddu Surendra Nehru", "Contribute to HOMA books", "Authorship as per contribution"],
    msg: "JOIN HOMA - PAPER / BOOK WRITER" },
];

export default function JoinHoma() {
  const [active, setActive] = useState<string>("all");
  const list = active === "all" ? TRACKS : TRACKS.filter((t) => t.id === active);
  return (
    <section className="jh-wrap">
      <style>{`
        .jh-wrap{max-width:1100px;margin:24px auto;padding:28px 20px;background:#f6f3ea;border-radius:18px;font-family:inherit}
        .jh-wrap h1{font-size:28px;font-weight:800;color:#0b1b33;margin:0 0 8px}
        .jh-sub{color:#475569;margin:0 0 14px;font-size:15px}
        .jh-note{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;font-size:14px;color:#0b1b33;margin-bottom:16px}
        .jh-bar{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px}
        .jh-pill{border:1px solid #e2e8f0;background:#fff;border-radius:999px;padding:8px 14px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap}
        .jh-pill.on{background:#0b1b33;color:#fff;border-color:#0b1b33}
        .jh-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
        .jh-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:18px;display:flex;flex-direction:column}
        .jh-card h2{font-size:18px;font-weight:800;color:#0b1b33;margin:0 0 4px}
        .jh-who{color:#0f766e;font-size:14px;margin:0 0 10px}
        .jh-card ul{margin:0 0 14px;padding-left:18px;color:#334155;font-size:14px;line-height:1.6;flex:1}
        .jh-btn{display:inline-block;text-align:center;background:#16a34a;color:#fff;font-weight:700;border-radius:10px;padding:10px 14px;text-decoration:none}
        .jh-foot{font-size:12px;color:#64748b;margin-top:16px}
      `}</style>
      <h1>Join the HOMA Network</h1>
      <p className="jh-sub">Work with Dr. Muddu Surendra Nehru, M.D. — Professor of Medicine, 30+ years, 13 books, 6 international papers (2026).</p>
      <div className="jh-note">Board and network roles only: no financial liability, no litigation responsibility, no day-to-day operations. Pick the track that fits you and message us on WhatsApp.</div>
      <div className="jh-bar">
        <button className={`jh-pill ${active === "all" ? "on" : ""}`} onClick={() => setActive("all")}>All</button>
        {TRACKS.map((t) => (
          <button key={t.id} className={`jh-pill ${active === t.id ? "on" : ""}`} onClick={() => setActive(t.id)}>{t.title}</button>
        ))}
      </div>
      <div className="jh-grid">
        {list.map((t) => (
          <div key={t.id} className="jh-card">
            <h2>{t.title}</h2>
            <p className="jh-who">{t.who}</p>
            <ul>{t.gives.map((g) => <li key={g}>{g}</li>)}</ul>
            <a className="jh-btn" target="_blank" rel="noopener noreferrer"
               href={FORM_URL}>Join Now (Free)</a>
            <div style={{marginTop: '8px', fontSize: '13px', textAlign: 'center'}}>
            <a href={`https://wa.me/${WA}?text=${encodeURIComponent(t.msg)}`} target="_blank" rel="noopener noreferrer" style={{color: '#16a34a', textDecoration: 'underline'}}>Or message us on WhatsApp</a>
            </div>
          </div>
        ))}
      </div>
      <p className="jh-foot">Roles are voluntary and by mutual written agreement. Nothing on this page is an offer of shares, a job, or a guarantee of income.</p>
    </section>
  );
}
