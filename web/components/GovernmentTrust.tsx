'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { MouseEvent } from 'react';

/* ---- Text you may want to edit later lives here, at the top ---- */
const EYEBROW = 'Registered · Licensed · Recognized since 1987';
const HEADLINE = 'Trusted by every government. Recognized across parties.';
const SUBHEAD =
  "Leaders from every party have received Dr. Muddu's books and attended HOMA events. Because medicine doesn't take sides.";

type BadgeKind = 'govt' | 'council' | 'peer' | 'real' | 'leader' | 'icon';

const BADGES: Record<BadgeKind, { bg: string; fg?: string }> = {
  icon: { bg: '#f59e0b', fg: '#1f2937' }, // amber, dark text so it stays readable
  govt: { bg: '#1e3a8a' }, // navy
  council: { bg: '#0f766e' }, // teal (slightly darker than #0d9488 so white text stays readable)
  peer: { bg: '#b45309' }, // amber
  real: { bg: '#c2410c' }, // orange
  leader: { bg: '#1e3a8a' }, // navy
};

type TrustCard = {
  title: string;
  badge: string;
  kind: BadgeKind;
  image: string;
  alt: string;
  caption: string;
  fit: 'contain' | 'cover'; // certificates = contain (whole page visible), photos = cover
  pos?: string; // optional crop position for photos, e.g. 'center 20%'
};

const CARDS: TrustCard[] = [
  {
    title: 'Telangana State Medical Council',
    badge: 'MEDICAL COUNCIL',
    kind: 'council',
    image: '/images/tsmc-certificate.jpg',
    alt: 'Telangana State Medical Council registration certificate of Dr. Muddu Surendra Nehru MD',
    caption:
      'Registered Physician since 14 September 1987 · Registration No: AMC18142 · Valid until 11 December 2027',
    fit: 'contain',
  },
  {
    title: 'Telangana Government License',
    badge: 'GOVERNMENT',
    kind: 'govt',
    image: '/images/telangana-license.jpg',
    alt: 'Telangana Government private medical care establishment registration certificate for HOMA Healthcare Center',
    caption:
      'Registered under T.S. Allopathic Private Medical Care Establishments Act 2002 · Reg No: 414/DM&HO/RR/2008 · Valid 2023–2028',
    fit: 'contain',
  },
  {
    title: 'DPIIT Recognition',
    badge: 'GOVERNMENT',
    kind: 'govt',
    image: '/images/dpit-certificate.jpg',
    alt: 'DPIIT recognition certificate for HOMA',
    caption: 'DPIIT Recognised · Certificate DIPP275722',
    fit: 'contain',
  },
  {
    title: 'IMA AP CON 2022 Speaker',
    badge: 'PEER RECOGNITION',
    kind: 'peer',
    image: '/images/ima-apcon-2022.jpg',
    alt: 'Dr. Muddu Surendra Nehru MD at the 7th IMA AP Conference 2022, Nandyal',
    caption:
      'Invited speaker at 7th IMA AP Conference 2022, Nandyal · Introduced by Dr. Nagamani MD DGO',
    fit: 'contain',
  },
  {
    title: 'KMC Alumni CME Certificate',
    badge: 'MEDICAL COUNCIL',
    kind: 'council',
    image: '/images/kmc-cme-certificate.jpg',
    alt: 'CME certificate for 6 credit hours awarded by the A.P. Medical Council to Dr. Muddu Surendra Nehru MD',
    caption: '6 credit hours awarded by A.P. Medical Council · CME Speaker',
    fit: 'contain',
  },
  {
    title: 'Lybrate GoodMD Award',
    badge: 'PEER',
    kind: 'peer',
    image: '/images/goodmd-certificate.jpg',
    alt: 'Lybrate GoodMD certificate of appreciation, 2022, for Dr. Muddu Surendra Nehru MD',
    caption: 'Certificate of Appreciation · 2022 · Outstanding commitment to serve humanity',
    fit: 'contain',
  },
  {
    title: 'HOMA Clinic — Real Presence',
    badge: 'REAL CLINIC',
    kind: 'real',
    image: '/images/clinic-night.jpg',
    alt: 'HOMA Healthcare Center clinic in Gachibowli, Hyderabad, at night',
    caption: "Our clinic in Gachibowli, Hyderabad — because diabetes doesn't keep office hours",
    fit: 'cover',
  },
  {
    title: 'Dr. Muddu with Dr. Madhavi',
    badge: 'REAL CIRCLE',
    kind: 'real',
    image: '/images/doctor-and-madhavi.jpg',
    alt: 'Dr. Muddu Surendra Nehru MD with Dr. Madhavi at HOMA Healthcare Center',
    caption:
      'Dr. Muddu with Dr. Madhavi, physician and sister of Megastar Chiranjeevi, at HOMA Healthcare Center',
    fit: 'cover',
  },
  {
    title: "Hon'ble CM Receives 'BP: The Untold Truth'",
    badge: 'GOVERNMENT',
    kind: 'govt',
    image: '/images/cm-revanth-reddy.jpg',
    alt: "Chief Minister Sri A. Revanth Reddy receiving Dr. Muddu's book BP: The Untold Truth",
    caption:
      "Sri A. Revanth Reddy, Chief Minister of Telangana, receiving Dr. Muddu's book on hypertension",
    fit: 'cover',
    pos: 'center 20%',
  },
  {
    title: "IT Minister Receives 'BP: The Untold Truth'",
    badge: 'GOVERNMENT',
    kind: 'govt',
    image: '/images/minister-sridhar-babu.jpg',
    alt: "Minister Sri Duddilla Sridhar Babu receiving Dr. Muddu's book BP: The Untold Truth",
    caption:
      "Sri Duddilla Sridhar Babu, Minister for IT & Commerce, receiving Dr. Muddu's book 'BP: The Untold Truth'",
    fit: 'cover',
    pos: 'center 20%',
  },
  {
    title: 'Megastar Chiranjeevi Trusts HOMA',
    badge: 'CULTURAL ICON',
    kind: 'icon',
    image: '/images/chiranjeevi.jpg',
    alt: 'Dr. Muddu Surendra Nehru MD with Megastar Chiranjeevi',
    caption:
      "Actor Chiranjeevi received Dr. Muddu's medical guidance — a personal relationship, not a paid endorsement",
    fit: 'cover',
    pos: 'center 20%',
  },
];

const TRUST_BAR = [
  'Licensed since 1987',
  'DPIIT Recognised',
  'IMA Speaker',
  '13 Books Published',
  '6 Peer-Reviewed Papers',
  '5,000+ Patients Treated',
];

const CSS = `
.gt-section{background:#fff;padding:100px 20px}
.gt-wrap{max-width:1120px;margin:0 auto}
.gt-head{text-align:center;margin:0 auto 48px;max-width:760px}
.gt-eyebrow{color:#0d9488;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px}
.gt-title{color:#1e3a8a;font-size:clamp(26px,4.6vw,40px);font-weight:800;line-height:1.18;margin:0 0 14px}
.gt-sub{color:#64748b;font-size:16px;line-height:1.55;margin:0 auto;max-width:620px}

.gt-grid{display:grid;grid-template-columns:1fr;gap:20px}

.gt-card{
  display:flex;flex-direction:column;background:#fff;border:1px solid #e2e8f0;border-radius:20px;
  overflow:hidden;text-decoration:none;color:inherit;box-shadow:0 8px 24px rgba(15,23,42,.06);
  transition:transform .25s ease,box-shadow .25s ease;-webkit-tap-highlight-color:transparent;
}
.gt-card:active{transform:scale(.99)}
.gt-card:focus-visible{outline:3px solid #0d9488;outline-offset:3px}

.gt-img{position:relative;aspect-ratio:4/3;background:#f1f5f9;border-bottom:1px solid #e2e8f0}
.gt-missing{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:16px;text-align:center;color:#94a3b8;font-size:13px}

.gt-body{padding:16px 18px 20px;display:flex;flex-direction:column;gap:10px;flex:1}
.gt-badge{align-self:flex-start;color:#fff;font-size:11px;font-weight:700;letter-spacing:.8px;padding:4px 10px;border-radius:999px}
.gt-card h3{margin:0;color:#1e3a8a;font-size:18px;font-weight:700;line-height:1.25}
.gt-cap{margin:0;color:#475569;font-size:14px;line-height:1.5}

.gt-bar{display:flex;flex-wrap:wrap;justify-content:center;gap:10px 22px;margin:44px 0 0;padding:20px 16px;background:#f0fdfa;border:1px solid #ccfbf1;border-radius:20px}
.gt-bar span{color:#134e4a;font-size:14px;font-weight:600;white-space:nowrap}
.gt-bar span::before{content:"\\2713\\00a0";color:#0d9488;font-weight:800}

.gt-cta{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-top:36px}
.gt-btn{display:inline-block;border-radius:999px;padding:14px 28px;font-size:16px;font-weight:700;text-decoration:none;text-align:center}
.gt-btn-primary{background:#f97316;color:#fff;border:2px solid #f97316}
.gt-btn-primary:hover{background:#ea580c;border-color:#ea580c}
.gt-btn-outline{background:transparent;color:#1e3a8a;border:2px solid #1e3a8a}
.gt-btn-outline:hover{background:#1e3a8a;color:#fff}
.gt-btn:focus-visible{outline:3px solid #0d9488;outline-offset:3px}

@media (min-width:640px){
  .gt-grid{grid-template-columns:repeat(2,1fr)}
}
@media (min-width:1024px){
  .gt-grid{grid-template-columns:repeat(3,1fr);gap:24px}
}
@media (hover:hover){
  .gt-card:hover{transform:translateY(-4px);box-shadow:0 18px 36px rgba(15,23,42,.12)}
}
@media (max-width:639px){
  .gt-section{padding:60px 16px}
  .gt-head{margin-bottom:32px}
  .gt-bar{justify-content:flex-start}
  .gt-btn{width:100%}
}
@media (prefers-reduced-motion:reduce){.gt-card{transition:none}}
`;

function CardImage({
  src,
  alt,
  fit,
  pos,
}: {
  src: string;
  alt: string;
  fit: 'contain' | 'cover';
  pos?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="gt-img">
      {failed ? (
        <span className="gt-missing">Image coming soon</span>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 360px"
          style={{ objectFit: fit, objectPosition: fit === 'cover' ? pos ?? 'center 30%' : 'center' }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export default function GovernmentTrust() {
  // href="#" for now: stop the page jumping to the top. Later this opens a modal.
  const hold = (e: MouseEvent<HTMLAnchorElement>) => e.preventDefault();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="gt-section" id="credentials" aria-labelledby="gt-title">
        <div className="gt-wrap">
          <div className="gt-head">
            <p className="gt-eyebrow">{EYEBROW}</p>
            <h2 className="gt-title" id="gt-title">
              {HEADLINE}
            </h2>
            <p className="gt-sub">{SUBHEAD}</p>
          </div>

          <div className="gt-grid">
            {CARDS.map((card) => (
              <Link
                key={card.title}
                href="#"
                className="gt-card"
                onClick={hold}
                aria-label={`${card.title}. ${card.caption}`}
              >
                <CardImage src={card.image} alt={card.alt} fit={card.fit} pos={card.pos} />
                <div className="gt-body">
                  <span
                    className="gt-badge"
                    style={{ background: BADGES[card.kind].bg, color: BADGES[card.kind].fg ?? '#fff' }}
                  >
                    {card.badge}
                  </span>
                  <h3>{card.title}</h3>
                  <p className="gt-cap">{card.caption}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="gt-bar">
            {TRUST_BAR.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="gt-cta">
            <a href="#about" className="gt-btn gt-btn-outline">
              Meet Dr. Muddu &rarr;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
