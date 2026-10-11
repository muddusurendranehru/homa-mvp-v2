'use client';

import Image from 'next/image';
import type { ImageLoader } from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

/*
  Unsplash photos go through this small loader, so no change to next.config is needed.
  Next.js calls it for each width it wants and asks Unsplash for a WebP of that size.
*/
const unsplashLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}&w=${width}&q=${quality || 80}&fm=webp`;

type ShowcaseCard = {
  title: string;
  label: string;
  local?: boolean; // true = Card 3 (your real clinic photo)
  src?: string;
  alt?: string;
};

const CARDS: ShowcaseCard[] = [
  {
    title: 'Reach & maintain your goal weight',
    label: 'Reach and maintain your goal weight',
    src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop',
    alt: 'Fresh fruits and vegetables arranged on a dark cloth',
  },
  {
    title: 'Log from any phone, works offline',
    label: 'Log from any phone, works offline',
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop',
    alt: 'Woman checking her smartwatch during a workout',
  },
  {
    title: 'Develop healthy habits daily',
    label: 'Develop healthy habits daily',
    local: true,
  },
  {
    title: 'Doctor-designed meal plan',
    label: 'Doctor-designed meal plan',
    src: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop',
    alt: 'Colorful fresh vegetables spread out on a table',
  },
  {
    title: 'Get a 90-day view of your health',
    label: 'Get a 90-day view of your health',
    src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop',
    alt: 'Smiling man holding a jump rope',
  },
];

const CSS = `
.fs-section{background:#faf7f2;padding:100px 20px;overflow-x:hidden}
.fs-head{text-align:center;margin:0 auto 56px}
.fs-eyebrow{color:#0d9488;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px}
.fs-title{color:#1e3a8a;font-size:clamp(28px,5vw,42px);font-weight:800;line-height:1.15;margin:0 0 14px}
.fs-sub{color:#64748b;font-size:16px;max-width:540px;margin:0 auto;line-height:1.5}

.fs-track{position:relative;display:flex;justify-content:center;align-items:center;padding:30px 0}
.fs-card{
  --y:0px;--s:1;
  flex:0 0 260px;width:260px;height:400px;box-sizing:border-box;padding:16px;border-radius:20px;
  box-shadow:0 12px 32px rgba(15,23,42,.12);
  transform:translateY(var(--y)) scale(var(--s));
  transition:transform .5s ease,opacity .5s ease,box-shadow .25s ease;
  opacity:0;--y:32px;cursor:default;-webkit-tap-highlight-color:transparent;
}
.fs-card:nth-child(n+2){margin-left:-40px}
.fs-card:nth-child(1){z-index:1;background:#0d4a4a}
.fs-card:nth-child(2){z-index:2;background:#f5a623}
.fs-card:nth-child(3){z-index:10;background:#f97316;--s:1.10;box-shadow:0 24px 48px rgba(15,23,42,.25)}
.fs-card:nth-child(4){z-index:4;background:#0f172a}
.fs-card:nth-child(5){z-index:5;background:#38bdf8}
.fs-card.fs-in{opacity:1;--y:0px}

.fs-photo{position:relative;height:220px;border-radius:12px;overflow:hidden;margin-bottom:20px;background:inherit}
.fs-photo::before{content:"";position:absolute;inset:0;background:rgba(0,0,0,.14)}
.fs-photo img{object-fit:cover}
.fs-card h3{margin:0;color:#fff;font-size:20px;font-weight:700;line-height:1.25;letter-spacing:-.3px}

@media (hover:hover) and (min-width:1024px){
  .fs-card.fs-in:hover{--y:-6px;box-shadow:0 20px 40px rgba(15,23,42,.2)}
}
@media (min-width:1024px){
  .fs-card:nth-child(1) h3{padding-right:46px}
  .fs-card:nth-child(2) h3{padding-right:60px}
  .fs-card:nth-child(4) h3{padding-left:60px;padding-right:46px}
}

.fs-dots{display:none}

.fs-cta{text-align:center;margin-top:48px}
.fs-cta p{color:#64748b;font-size:16px;margin:0 0 16px}
.fs-btn{background:#f97316;color:#fff;border:0;border-radius:999px;padding:14px 28px;font-size:16px;font-weight:700;cursor:pointer}
.fs-btn:hover{background:#ea580c}
.fs-btn:focus-visible{outline:3px solid #1e3a8a;outline-offset:3px}

@media (max-width:1023px){
  .fs-section{padding:60px 16px}
  .fs-head{margin-bottom:32px}
  .fs-track{
    justify-content:flex-start;gap:14px;padding:12px 16px 20px;margin:0 -16px;
    overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;
    -webkit-overflow-scrolling:touch;scrollbar-width:none;
  }
  .fs-track::-webkit-scrollbar{display:none}
  .fs-card,.fs-card:nth-child(3){
    flex:0 0 min(78vw,300px);width:min(78vw,300px);margin-left:0;--s:1;
    scroll-snap-align:center;scroll-snap-stop:normal;
    box-shadow:0 12px 32px rgba(15,23,42,.12);
  }
  .fs-card:nth-child(n+2){margin-left:0}
  .fs-card:active{--s:.98}
  .fs-dots{display:flex;justify-content:center;gap:8px;margin-top:6px}
  .fs-dot{width:8px;height:8px;border-radius:50%;background:#cbd5e1;transition:background .2s,transform .2s}
  .fs-dot.fs-active{background:#1e3a8a;transform:scale(1.25)}
}

@media (prefers-reduced-motion:reduce){.fs-card{transition:none;opacity:1;--y:0px}}
`;

export default function FeatureShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);

  const [visible, setVisible] = useState(false);
  const [settled, setSettled] = useState(false);
  const [active, setActive] = useState(0);

  // Fade in when the cards scroll into view (staggered 100ms each)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // After the fade-in, drop the stagger delay so hover feels instant
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setSettled(true), 1200);
    return () => clearTimeout(t);
  }, [visible]);

  // Pagination dots follow the card nearest the centre of the carousel
  const onScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      const el = trackRef.current;
      if (el) {
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        Array.from(el.children).forEach((child, i) => {
          const c = child as HTMLElement;
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActive(best);
      }
      tickingRef.current = false;
    });
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="fs-section" id="feature-showcase" aria-labelledby="fs-title">
        <div className="fs-head">
          <p className="fs-eyebrow">Why HOMA works</p>
          <h2 className="fs-title" id="fs-title">
            One app. Every metabolic signal.
          </h2>
          <p className="fs-sub">
            Track. See. Adjust. The 90-day loop that actually moves your numbers.
          </p>
        </div>

        <div className="fs-track" ref={trackRef} onScroll={onScroll}>
          {CARDS.map((card, i) => (
            <article
              key={card.title}
              className={`fs-card${visible ? ' fs-in' : ''}`}
              role="article"
              aria-label={card.label}
              style={visible && !settled ? { transitionDelay: `${i * 100}ms` } : undefined}
            >
              {card.local ? (
                <Image
                  src="/clinic.jpg"
                  alt="Dr. Muddu Surendra Nehru standing in his consultation room at HOMA Healthcare Center"
                  width={800}
                  height={800}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    objectPosition: 'center 30%',
                    borderRadius: '12px',
                    marginBottom: '20px',
                  }}
                />
              ) : (
                <div className="fs-photo">
                  <Image
                    loader={unsplashLoader}
                    src={card.src ?? ''}
                    alt={card.alt ?? ''}
                    fill
                    sizes="(max-width: 1023px) 78vw, 260px"
                  />
                </div>
              )}
              <h3>{card.title}</h3>
            </article>
          ))}
        </div>

        <div className="fs-dots" aria-hidden="true">
          {CARDS.map((card, i) => (
            <span key={card.title} className={`fs-dot${i === active ? ' fs-active' : ''}`} />
          ))}
        </div>

        <div className="fs-cta">
          <p>Want to see what the tracker looks like inside?</p>
          <a
            className="fs-btn"
            href="/dashboard.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', textDecoration: 'none' }}
          >
            Preview the dashboard &rarr;
          </a>
        </div>
      </section>
    </>
  );
}