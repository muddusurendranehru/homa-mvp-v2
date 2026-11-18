import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pay Securely — HOMA Healthcare Center",
  description:
    "Secure payment options for HOMA Healthcare Center: doctor consultation + initial assessment, or pay an agreed amount. UPI, card and net banking via Razorpay. Dr. Muddu Surendra Nehru, MD.",
  robots: { index: true, follow: true },
};

type PayOption = {
  id: string;
  title: string;
  te: string;
  desc: string;
  href: string; // empty string = not live yet -> card hidden
  accent: "teal" | "amber";
  icon: "stetho" | "slider" | "calendar" | "mic" | "leaf" | "pill";
};

const OPTIONS: PayOption[] = [
  {
    id: "consult",
    title: "Doctor Consultation + Initial Assessment",
    te: "డాక్టర్ సంప్రదింపు + ప్రాథమిక అంచనా",
    desc: "One-on-one with Dr. Muddu Surendra Nehru, MD. History, review of your current lab reports and a personalised starting plan.",
    href: "https://pages.razorpay.com/pl_U1Tl1UjGMAApBM/view",
    accent: "teal",
    icon: "stetho",
  },
  {
    id: "flexi",
    title: "Pay any amount",
    te: "మీకు నచ్చిన మొత్తం చెల్లించండి",
    desc: "Enter the exact amount our team agreed with you (follow-up, top-up or balance). Staff will tell you the figure before you pay.",
    href: "https://rzp.io/rzp/offSGFo0",
    accent: "amber",
    icon: "slider",
  },
  { id: "program", title: "90-Day Program", te: "", desc: "", href: "", accent: "teal", icon: "calendar" },
  { id: "lectures", title: "Lectures", te: "", desc: "", href: "", accent: "teal", icon: "mic" },
  { id: "diet", title: "Diet", te: "", desc: "", href: "", accent: "teal", icon: "leaf" },
  { id: "medicines", title: "Medicines", te: "", desc: "", href: "", accent: "teal", icon: "pill" },
];

const LIVE = OPTIONS.filter((o) => o.href.trim() !== "");
const SOON = OPTIONS.filter((o) => o.href.trim() === "");

function Icon({ name }: { name: PayOption["icon"] }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "stetho":
      return (<svg viewBox="0 0 24 24" width="26" height="26" {...common} aria-hidden="true"><path d="M5 3v5a4 4 0 0 0 8 0V3" /><path d="M9 12v3a5 5 0 0 0 10 0v-2" /><circle cx="19" cy="10" r="2" /></svg>);
    case "slider":
      return (<svg viewBox="0 0 24 24" width="26" height="26" {...common} aria-hidden="true"><path d="M4 8h10M18 8h2M4 16h2M10 16h10" /><circle cx="16" cy="8" r="2" /><circle cx="8" cy="16" r="2" /></svg>);
    case "calendar":
      return (<svg viewBox="0 0 24 24" width="26" height="26" {...common} aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>);
    case "mic":
      return (<svg viewBox="0 0 24 24" width="26" height="26" {...common} aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>);
    case "leaf":
      return (<svg viewBox="0 0 24 24" width="26" height="26" {...common} aria-hidden="true"><path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16Z" /><path d="M4 20c4-6 8-10 12-12" /></svg>);
    case "pill":
      return (<svg viewBox="0 0 24 24" width="26" height="26" {...common} aria-hidden="true"><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-45 12 12)" /><path d="M8.5 8.5l7 7" /></svg>);
  }
}

export default function PayPage() {
  return (
    <div className="pay-show">
      <style>{`
        .pay-show{--p-ink:#0A1E3C;--p-ink2:#33415C;--p-paper:#F6F3EA;--p-card:#FFFFFF;--p-line:#E4DECF;--p-teal:#0E7C7B;--p-amber:#E8A13A;--p-wa:#1FA855;
          background:var(--p-paper);color:var(--p-ink);min-height:100vh;
          font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans Telugu",sans-serif;
          scrollbar-width:thin;scrollbar-color:var(--p-teal) var(--p-paper);}
        .pay-show ::-webkit-scrollbar{width:10px;height:10px}
        .pay-show ::-webkit-scrollbar-track{background:var(--p-paper)}
        .pay-show ::-webkit-scrollbar-thumb{background:var(--p-teal);border-radius:8px;border:2px solid var(--p-paper)}
        .pay-hero{background:radial-gradient(700px 320px at 88% -10%,rgba(232,161,58,.36),transparent 62%),radial-gradient(520px 280px at 6% 112%,rgba(18,165,160,.34),transparent 60%),linear-gradient(135deg,#0A1E3C 0%,#0E3A5C 46%,#0E7C7B 100%);}
        .pay-card{background:var(--p-card);border:1px solid var(--p-line);border-radius:18px;box-shadow:0 1px 2px rgba(10,30,60,.05),0 12px 30px -20px rgba(10,30,60,.25);transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease;}
        .pay-card:hover{transform:translateY(-3px);box-shadow:0 2px 4px rgba(10,30,60,.06),0 20px 40px -20px rgba(10,30,60,.32);}
        .pay-card:focus-visible{outline:3px solid var(--p-teal);outline-offset:3px;}
        .pay-rise{animation:payRise .55s ease-out both}
        @keyframes payRise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        @media (prefers-reduced-motion:reduce){.pay-rise{animation:none}.pay-card{transition:none}}
      `}</style>

      {/* HERO */}
      <header className="pay-hero text-white">
        <div className="mx-auto max-w-4xl px-5 pb-12 pt-10 sm:pb-16 sm:pt-14">
          <p className="pay-rise text-[12px] font-bold uppercase tracking-[0.22em] text-[#F2C879]">HOMA Healthcare Center · Secure payments</p>
          <h1 className="pay-rise mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ animationDelay: "80ms" }}>
            Pay securely, in one tap.
          </h1>
          <p className="pay-rise mt-3 max-w-xl text-base text-white/85 sm:text-lg" style={{ animationDelay: "160ms" }}>
            చెల్లింపు సురక్షితం. Choose an option below — you pay on Razorpay&apos;s secure page by UPI, card or net banking. Overseas cards accepted.
          </p>
          <div className="pay-rise mt-5 flex flex-wrap gap-2 text-[12px] font-semibold" style={{ animationDelay: "240ms" }}>
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5">✓ Doctor-led · Dr. Muddu Surendra Nehru, MD</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5">✓ DPIIT recognised</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5">✓ Receipt by SMS / email</span>
          </div>
        </div>
      </header>

      {/* OPTIONS */}
      <main className="mx-auto max-w-4xl px-5 py-8 sm:py-10">
        <h2 className="text-xl font-extrabold sm:text-2xl">Choose a payment option</h2>
        <p className="mt-1 text-sm text-[var(--p-ink2)]">No amount is shown here. Our team confirms the exact figure with you before you pay.</p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {LIVE.map((o, i) => (
            <a
              key={o.id}
              href={o.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pay-card pay-rise group flex flex-col p-5 sm:p-6"
              style={{ animationDelay: `${300 + i * 90}ms` }}
              aria-label={`${o.title} — opens secure Razorpay payment in a new tab`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: o.accent === "amber" ? "#FBF1DE" : "#E7F2F1", color: o.accent === "amber" ? "#8A5A12" : "var(--p-teal)" }}
                >
                  <Icon name={o.icon} />
                </span>
                <span className="rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide" style={{ background: "#EEF2F7", color: "var(--p-ink2)" }}>
                  Secure · Razorpay
                </span>
              </div>
              <h3 className="mt-4 text-lg font-extrabold leading-snug">{o.title}</h3>
              {o.te && <p lang="te" className="mt-0.5 text-[13px] text-[var(--p-ink2)]">{o.te}</p>}
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--p-ink2)]">{o.desc}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold" style={{ color: o.accent === "amber" ? "#8A5A12" : "var(--p-teal)" }}>
                Open secure payment
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
              <span className="mt-2 text-[11px] text-[var(--p-ink2)]">UPI · card · net banking · overseas cards</span>
            </a>
          ))}
        </div>

        {SOON.length > 0 && (
          <p className="mt-5 text-[12.5px] text-[var(--p-ink2)]">
            Coming soon: {SOON.map((s) => s.title).join(" · ")}. These options appear here only when live.
          </p>
        )}

        {/* HOW IT WORKS */}
        <section className="mt-8 rounded-2xl border p-5 sm:p-6" style={{ borderColor: "var(--p-line)", background: "#FFFFFF" }}>
          <h2 className="text-lg font-extrabold">How it works</h2>
          <ol className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
            {[
              "Pick the option that matches what our team agreed with you.",
              "Pay on Razorpay's secure page (UPI, card or net banking).",
              "Get your receipt by SMS / email; our team confirms and schedules your care.",
            ].map((s, i) => (
              <li key={s} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold" style={{ background: "var(--p-amber)", color: "var(--p-ink)" }}>{i + 1}</span>
                <span className="text-[var(--p-ink2)]">{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 border-t pt-3 text-[12px] leading-relaxed text-[var(--p-ink2)]" style={{ borderColor: "var(--p-line)" }}>
            You pay on Razorpay&apos;s secure page. HOMA never sees or stores your card or UPI credentials. We receive only a payment confirmation and your contact details for the receipt. Clinical care at HOMA aims at remission through doctor-led, data-driven follow-up; individual results vary.
          </p>
        </section>

        {/* HELP */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="https://wa.me/919963721999?text=Namaste%2C%20I%20need%20help%20with%20a%20HOMA%20payment."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold text-white"
            style={{ background: "var(--p-wa)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1a13 13 0 0 1-5.9-5.2c-.6-1-1-2.1-.9-3 .1-.6.6-1.4 1.1-1.6.3-.1.7-.1.9.1l.9 2c.1.3 0 .6-.2.9l-.5.6c-.1.2-.2.4 0 .7a9.6 9.6 0 0 0 3.6 3.4c.3.2.6.1.8-.1l.7-.8c.2-.3.5-.3.8-.2l2 .9c.3.2.4.7.3 1.1z"/></svg>
            Need help? WhatsApp us
          </a>
          <a href="tel:+919963721999" className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold text-white" style={{ background: "var(--p-ink)" }}>
            Call 09963721999
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-white" style={{ background: "var(--p-ink)" }}>
        <div className="mx-auto max-w-4xl px-5 py-7 text-sm">
          <div className="font-extrabold">HOMA Healthcare Center</div>
          <div className="mt-1 text-white/70">Dr. Muddu Surendra Nehru, MD · Professor of Medicine · DPIIT recognised (DIPP275722)</div>
          <div className="mt-3 flex flex-wrap gap-4 text-white/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/tools" className="hover:text-white">Free tools</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-white/55">Payments processed by Razorpay. This page lists payment options only; it does not display prices or store payment credentials.</p>
        </div>
      </footer>
    </div>
  );
}
