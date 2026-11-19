"use client";
import { useMemo, useState } from "react";
import type { Partner, PartnerType } from "@/lib/partners";

const TYPE_META: Record<PartnerType, { label: string; color: string; bg: string }> = {
  doctor: { label: "Partner Doctor", color: "#0E7C7B", bg: "#E7F2F1" },
  lab: { label: "Nearby Lab", color: "#8A5A12", bg: "#FBF1DE" },
  pharmacy: { label: "Nearby Pharmacy", color: "#1E9E6A", bg: "#E8F5EE" },
};

function TypeIcon({ type }: { type: PartnerType }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (type === "doctor") return (<svg viewBox="0 0 24 24" width="22" height="22" {...c} aria-hidden="true"><path d="M5 3v5a4 4 0 0 0 8 0V3" /><path d="M9 12v3a5 5 0 0 0 10 0v-2" /><circle cx="19" cy="10" r="2" /></svg>);
  if (type === "lab") return (<svg viewBox="0 0 24 24" width="22" height="22" {...c} aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" /><path d="M7.5 15h9" /></svg>);
  return (<svg viewBox="0 0 24 24" width="22" height="22" {...c} aria-hidden="true"><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-45 12 12)" /><path d="M8.5 8.5l7 7" /></svg>);
}

export default function CareNetwork({ partners }: { partners: Partner[] }) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"all" | PartnerType>("all");
  const typesPresent = useMemo(() => Array.from(new Set(partners.map((p) => p.type))), [partners]);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return partners.filter((p) => (tab === "all" || p.type === tab))
      .filter((p) => !t || [p.name, p.clinic, p.area, p.state].join(" ").toLowerCase().includes(t));
  }, [partners, q, tab]);

  return (
    <section className="cnet" aria-label="Partner doctors and nearby labs & pharmacies">
      <style>{`
        .cnet{--n-ink:#0A1E3C;--n-ink2:#33415C;--n-paper:#F6F3EA;--n-line:#E4DECF;--n-teal:#0E7C7B;--n-amber:#E8A13A;--n-wa:#1FA855;
          background:var(--n-paper);color:var(--n-ink);border-radius:20px;padding:20px;
          font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans Telugu",sans-serif;}
        .cnet-card{background:#fff;border:1px solid var(--n-line);border-radius:16px;padding:16px;box-shadow:0 1px 2px rgba(10,30,60,.05),0 12px 30px -20px rgba(10,30,60,.22);transition:transform .15s ease,box-shadow .15s ease;}
        .cnet-card:hover{transform:translateY(-3px);box-shadow:0 2px 4px rgba(10,30,60,.06),0 20px 40px -20px rgba(10,30,60,.3);}
        .cnet-tab{border:1px solid var(--n-line);background:#fff;border-radius:999px;padding:6px 14px;font-size:12.5px;font-weight:700;color:var(--n-ink2);}
        .cnet-tab[data-on="true"]{background:var(--n-ink);color:#fff;border-color:var(--n-ink);}
        .cnet-cta{display:inline-flex;align-items:center;gap:6px;border-radius:10px;padding:8px 12px;font-size:12.5px;font-weight:800;color:#fff;transition:filter .15s ease,transform .15s ease;}
        .cnet-cta:hover{filter:brightness(1.07);transform:translateY(-1px);}
        .cnet input:focus-visible,.cnet-tab:focus-visible,.cnet-cta:focus-visible{outline:3px solid var(--n-teal);outline-offset:2px;}
        @media(prefers-reduced-motion:reduce){.cnet-card,.cnet-cta{transition:none}}
      `}</style>

      <h2 className="text-xl font-extrabold sm:text-2xl">Care near you — partner doctors, labs &amp; pharmacies</h2>
      <p className="mt-1 text-sm text-[var(--n-ink2)]">Doctor-led network across India. Call, WhatsApp or open the Google Map for each partner. Care aims at remission / target range; individual results vary.</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, clinic, area…" aria-label="Search partners"
          className="w-full sm:w-64 rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "var(--n-line)" }} />
        <button className="cnet-tab" data-on={tab === "all"} onClick={() => setTab("all")}>All</button>
        {typesPresent.map((t) => (
          <button key={t} className="cnet-tab" data-on={tab === t} onClick={() => setTab(t)}>{TYPE_META[t].label}s</button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="mt-6 text-sm text-[var(--n-ink2)]">No partners match yet. More doctors, labs and pharmacies are being added across India.</p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <article key={p.id} className="cnet-card flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: TYPE_META[p.type].bg, color: TYPE_META[p.type].color }}>
                  <TypeIcon type={p.type} />
                </span>
                <span className="rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide" style={{ background: TYPE_META[p.type].bg, color: TYPE_META[p.type].color }}>{TYPE_META[p.type].label}</span>
              </div>
              <h3 className="mt-3 text-base font-extrabold leading-snug">{p.name}</h3>
              {p.clinic && <p className="text-[13px] text-[var(--n-ink2)]">{p.clinic}</p>}
              <p className="mt-1 text-[13px] font-semibold" style={{ color: "var(--n-teal)" }}>{p.area}, {p.state}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a className="cnet-cta" style={{ background: "var(--n-ink)" }} href={`tel:+91${p.phone}`}>Call</a>
                <a className="cnet-cta" style={{ background: "var(--n-wa)" }} target="_blank" rel="noopener noreferrer" href={`https://wa.me/91${p.phone}?text=Namaste%2C%20I%20found%20you%20on%20HOMA%20Care%20Network.`}>WhatsApp</a>
                <a className="cnet-cta" style={{ background: "var(--n-teal)" }} target="_blank" rel="noopener noreferrer" href={p.mapsUrl}>Google Map</a>
              </div>
            </article>
          ))}
        </div>
      )}
      <p className="mt-4 text-[11px] text-[var(--n-ink2)]">Listed with each partner&apos;s consent. Partners: share your Google Maps <strong>business</strong> link (use &quot;Add your business&quot; if missing) so patients reach the right door.</p>
    </section>
  );
}
