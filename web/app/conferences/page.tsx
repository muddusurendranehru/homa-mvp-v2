import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Conferences, Lectures & Awards | Dr. Muddu Surendra Nehru, M.D.",
  description:
    "MEND 2026 Outstanding Clinical Award, medical college lectures, and Government of Telangana precision diabetes pilot collaboration with Govt. Medical College Mulugu.",
};

const NAVY = "#1e3a8a";
const TEAL = "#0d9488";

const MEND_2026 = [
  {
    src: "/images/conferences/mend-2026/mend-2026-award-01.jpg",
    alt: "Dr. Muddu Surendra Nehru receiving the MEND 2026 Outstanding Clinical Award on stage",
    caption: "Outstanding Clinical Award — presentation on stage",
  },
  {
    src: "/images/conferences/mend-2026/mend-2026-award-02.jpg",
    alt: "Dr. Muddu Surendra Nehru with trophy and certificate at MEND 2026",
    caption: "With certificate and award at MEND 2026",
  },
  {
    src: "/images/conferences/mend-2026/mend-2026-award-03.jpg",
    alt: "MEND Trust award ceremony for Dr. Muddu Surendra Nehru",
    caption: "Metabolic Excellence and Networking (MEND) ceremony",
  },
  {
    src: "/images/conferences/mend-2026/mend-2026-award-04.jpg",
    alt: "Dr. Muddu Surendra Nehru honored at MEND 2026 conference",
    caption: "Honored for clinical focus on diabetes and metabolic syndrome",
  },
];

const MULUGU = [
  {
    src: "/images/camps/mulugu/mulugu-01.jpg",
    alt: "HOMA letter to Government General Hospital Mulugu on precision diabetes pilot",
    caption: "Precision diabetes reversal pilot — Govt. General Hospital, Mulugu",
  },
  {
    src: "/images/camps/mulugu/mulugu-03.jpg",
    alt: "HOMA pilot program details for Mulugu district hospital",
    caption: "90-day pilot: screening, meals, and follow-up at no cost to patients",
  },
  {
    src: "/images/camps/mulugu/mulugu-04.jpg",
    alt: "HOMA support for Mulugu hospital staff and patients",
    caption: "Clinical training, labs, and Metric Explorer app for partner hospitals",
  },
];

type LecturePhoto = { src: string; alt: string; caption: string; pos?: string };

const LECTURES: LecturePhoto[] = [
  { src: "/images/homa-thub-agenda-launch.jpg", alt: "HOMA Agenda conference launch with doctors and partners on stage", caption: "HOMA Agenda conference: diabetes care research launch", pos: "center 40%" },
  { src: "/images/homa-thub-junior-doctors.jpg", alt: "Junior doctors from the HOMA research team at T-Hub, Hyderabad", caption: "Junior doctors outreach and T-Hub research collaboration", pos: "center 45%" },
  { src: "/images/homa-lecture-premier-talk.jpg", alt: "Dr. Muddu Surendra Nehru MD giving a metabolic health talk at Premier Hospital", caption: "Metabolic health talk at Premier Hospital", pos: "center 40%" },
  { src: "/images/homa-lecture-premier-screen.jpg", alt: "Dr. Muddu Surendra Nehru MD presenting on obesity and metabolic health at Premier Hospital", caption: "Patient education session on metabolic health", pos: "center 35%" },
  { src: "/images/homa-mnr-book-handover.jpg", alt: "Dr. Muddu Surendra Nehru MD presenting his book at MNR Medical College, Sangareddy", caption: "Book presentation at MNR Medical College" },
  { src: "/images/homa-mnr-vice-chairman-students.jpg", alt: "Dr. Muddu Surendra Nehru MD with MNR Vice Chairman Sri Manthena Raju and a student volunteer", caption: "With Vice Chairman Sri Manthena Raju and student volunteer", pos: "center 30%" },
  { src: "/images/homa-mnr-research-meeting.jpg", alt: "Research team meeting at MNR Medical College", caption: "TyG index research team, MNR Sangareddy" },
  { src: "/images/homa-lecture-book-launch.jpg", alt: "Book launch event for HOMA Agenda on diabetes care", caption: "HOMA Agenda book launch", pos: "center 25%" },
  { src: "/images/homa-lecture-agenda-team.jpg", alt: "HOMA team presenting the HOMA Agenda", caption: "Presenting the HOMA Agenda" },
  { src: "/images/homa-lecture-press-coverage.jpg", alt: "Newspaper coverage of a HOMA health event", caption: "In the news", pos: "center top" },
  { src: "/images/homa-mnr-cme-certificate.jpg", alt: "Certificate for HOMA 2026 Metabolic Medicine CME at MNR Medical College", caption: "HOMA 2026 Metabolic Medicine CME" },
  { src: "/images/homa-press-meet-panel.jpg", alt: "Dr. Muddu Surendra Nehru MD at a press meet panel", caption: "Press meet on metabolic health" },
  { src: "/images/homa-event-stage-panel.jpg", alt: "Dr. Muddu Surendra Nehru MD on a stage panel", caption: "Speaking on a health panel" },
  { src: "/images/homa-felicitation-1.jpg", alt: "Dr. Muddu Surendra Nehru MD being felicitated", caption: "Felicitation at an event" },
  { src: "/images/homa-felicitation-2.jpg", alt: "Dr. Muddu Surendra Nehru MD receiving recognition", caption: "Recognition for service" },
  { src: "/images/homa-felicitation-group.jpg", alt: "Group photo at a felicitation event", caption: "With the organising team" },
];

function PhotoFigure({
  src,
  alt,
  caption,
  pos,
  ratio = "4 / 3",
}: {
  src: string;
  alt: string;
  caption: string;
  pos?: string;
  ratio?: string;
}) {
  return (
    <figure className="conf-card">
      <div className="conf-frame" style={{ aspectRatio: ratio }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="conf-img"
          style={pos ? { objectPosition: pos } : undefined}
        />
      </div>
      <figcaption className="conf-caption">{caption}</figcaption>
    </figure>
  );
}

const CSS = `
.conf-page{background:#fff;color:#0f172a;min-height:100vh;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.conf-wrap{max-width:1200px;margin:0 auto;padding:0 16px}
.conf-hero{padding:48px 0 32px;text-align:center}
.conf-eyebrow{color:${TEAL};font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin:0 0 12px}
.conf-h1{color:${NAVY};font-size:30px;line-height:1.2;font-weight:800;margin:0 auto 16px;max-width:820px}
.conf-sub{color:#475569;font-size:16px;line-height:1.6;margin:0 auto 20px;max-width:720px}
.conf-trust{display:inline-block;color:${NAVY};background:#f0fdfa;border:1px solid #99f6e4;border-radius:999px;padding:8px 16px;font-size:13px;font-weight:600}
.conf-section{padding:40px 0}
.conf-h2{color:${NAVY};font-size:24px;font-weight:800;margin:0 0 8px;text-align:center}
.conf-h2::after{content:"";display:block;width:56px;height:3px;background:${TEAL};border-radius:2px;margin:10px auto 0}
.conf-section-sub{color:#475569;font-size:15px;line-height:1.55;text-align:center;margin:12px auto 28px;max-width:720px}
.conf-grid{display:grid;gap:16px;grid-template-columns:repeat(2,1fr)}
.conf-grid-mend{grid-template-columns:1fr}
.conf-card{margin:0;background:#fff;border-radius:16px;box-shadow:0 2px 10px rgba(15,23,42,.08);overflow:hidden}
.conf-frame{width:100%;background:#f1f5f9;overflow:hidden;position:relative}
.conf-img{width:100%;height:100%;object-fit:cover;display:block}
.conf-caption{font-size:13px;color:#475569;text-align:center;padding:10px 8px;line-height:1.4}
.conf-cta{margin:24px 0 64px;background:linear-gradient(135deg,#f0fdfa,#eff6ff);border-radius:16px;box-shadow:0 2px 10px rgba(15,23,42,.08);padding:40px 20px;text-align:center}
.conf-cta h2{color:${NAVY};font-size:26px;font-weight:800;margin:0 0 10px}
.conf-cta p{color:#475569;font-size:16px;margin:0 0 24px}
.conf-btns{display:flex;flex-direction:column;gap:12px;align-items:center}
.conf-btn{display:inline-block;color:#fff;font-weight:700;font-size:15px;text-decoration:none;padding:14px 26px;border-radius:12px}
.conf-btn-primary{background:#ea580c}
.conf-btn-secondary{background:#16a34a}
@media(min-width:640px){
  .conf-h1{font-size:38px}
  .conf-grid-mend{grid-template-columns:repeat(2,1fr);gap:20px}
  .conf-grid{grid-template-columns:repeat(3,1fr);gap:20px}
  .conf-btns{flex-direction:row;justify-content:center}
}
@media(min-width:1024px){
  .conf-h1{font-size:44px}
  .conf-grid-mend{grid-template-columns:repeat(2,1fr);gap:24px}
  .conf-grid-lectures{grid-template-columns:repeat(4,1fr);gap:20px}
  .conf-h2{font-size:30px}
}
`;

export default function ConferencesPage() {
  return (
    <main className="conf-page">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="conf-hero">
        <div className="conf-wrap">
          <p className="conf-eyebrow">CONFERENCES · LECTURES · AWARDS</p>
          <h1 className="conf-h1">Clinical recognition and teaching</h1>
          <p className="conf-sub">
            Photos from national metabolic conferences, medical college CME sessions, and
            government hospital collaborations. Educational context only — individual results
            vary under medical supervision.
          </p>
          <span className="conf-trust">
            MEND Trust · MNR Medical College · Government of Telangana pilots
          </span>
        </div>
      </section>

      <section className="conf-section" aria-labelledby="mend-title">
        <div className="conf-wrap">
          <h2 id="mend-title" className="conf-h2">MEND 2026 — Outstanding Clinical Award</h2>
          <p className="conf-section-sub">
            Metabolic Excellence and Networking (MEND Trust) honored Dr. Muddu Surendra Nehru,
            M.D. for dedicated clinical work on diabetes, metabolic syndrome, and insulin
            resistance — including research on the triglyceride–glucose (TyG) index and leadership
            at HOMA Healthcare Center, Gachibowli.
          </p>
          <div className="conf-grid conf-grid-mend">
            {MEND_2026.map((p) => (
              <PhotoFigure key={p.src} {...p} ratio="16 / 10" />
            ))}
          </div>
        </div>
      </section>

      <section className="conf-section" aria-labelledby="mulugu-title">
        <div className="conf-wrap">
          <h2 id="mulugu-title" className="conf-h2">Mulugu district — government hospital pilot</h2>
          <p className="conf-section-sub">
            HOMA Healthcare Center and Govt. Medical College Mulugu are coordinating a precision
            diabetes reversal and early-detection pilot. India-specific HOMA-IR and TyG cutoffs
            help identify insulin resistance early — before HbA1c rises — so lifestyle change can
            start under physician oversight.
          </p>
          <div className="conf-grid">
            {MULUGU.map((p) => (
              <PhotoFigure key={p.src} {...p} ratio="3 / 4" />
            ))}
          </div>
        </div>
      </section>

      <section className="conf-section" aria-labelledby="lectures-title">
        <div className="conf-wrap">
          <h2 id="lectures-title" className="conf-h2">Lectures &amp; recognition</h2>
          <p className="conf-section-sub">
            Medical college talks, press meets, and CME sessions on metabolic health across
            Telangana and Andhra Pradesh.
          </p>
          <div className="conf-grid conf-grid-lectures">
            {LECTURES.map((p) => (
              <PhotoFigure key={p.src} {...p} />
            ))}
          </div>
        </div>
      </section>

      <section className="conf-wrap">
        <div className="conf-cta">
          <h2>Ready to check your metabolic risk?</h2>
          <p>Use our free calculators or book a clinical assessment at HOMA Healthcare Center.</p>
          <div className="conf-btns">
            <Link href="/tools" className="conf-btn conf-btn-primary">
              Free HOMA-IR &amp; TyG tools →
            </Link>
            <a
              href="https://wa.me/919963721999"
              target="_blank"
              rel="noopener noreferrer"
              className="conf-btn conf-btn-secondary"
            >
              WhatsApp Dr. Muddu →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
