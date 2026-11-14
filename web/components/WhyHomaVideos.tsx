"use client";

import Image from "next/image";
import Link from "next/link";
import SectionCta from "@/components/SectionCta";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

export type WhyHomaShort = {
  youtubeId: string;
  title: string;
  subtitle: string;
  ctaHref?: string;
  ctaLabel?: string;
};

/** Add entries here when new Shorts are ready — carousel picks them up automatically. */
export const WHY_HOMA_SHORTS: WhyHomaShort[] = [
  {
    youtubeId: "BsWMLrhtKqM",
    title: "Midnight. New Town. Papa Unwell. Where Is the Medical Shop?",
    subtitle: "New town? HOMA knows the way.",
    ctaHref: "/pharmacy",
    ctaLabel: "Nearby medical shop finder",
  },
  {
    youtubeId: "hr2e19dMKmc",
    title: "Too Much Health Advice? HOMA Is Your Companion",
    subtitle: "One doctor. One plan. No confusion.",
  },
  {
    youtubeId: "hi_eWeYTbEU",
    title: "Post Your Walk & Meal, Earn HOMA Coins",
    subtitle: "Free. No blood tests. No payment.",
    ctaHref: "/communities",
    ctaLabel: "Join free WhatsApp communities",
  },
];

function thumbUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function embedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1`;
}

function ShortVideoCard({
  video,
  isPlaying,
  onPlay,
  onStop,
}: {
  video: WhyHomaShort;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
}) {
  const articleRef = useRef<HTMLElement>(null);
  const playLabel = `Play video: ${video.title}`;

  useEffect(() => {
    const node = articleRef.current;
    if (!node || !isPlaying) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && !entry.isIntersecting) onStop();
      },
      { root: null, threshold: 0.35 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [isPlaying, onStop]);

  return (
    <article className="wh-card" ref={articleRef}>
      <div className="wh-aspect">
        {isPlaying ? (
          <iframe
            src={embedUrl(video.youtubeId)}
            title={video.title}
            className="wh-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="wh-facade"
            onClick={onPlay}
            aria-label={playLabel}
          >
            <img
              src={thumbUrl(video.youtubeId)}
              alt=""
              className="wh-thumb"
              loading="lazy"
              decoding="async"
              width={480}
              height={854}
            />
            <span className="wh-play" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <h3 className="wh-title">{video.title}</h3>
      <p className="wh-sub">{video.subtitle}</p>
      {video.ctaHref && video.ctaLabel ? (
        <Link href={video.ctaHref} className="wh-cta">
          {video.ctaLabel} →
        </Link>
      ) : null}
    </article>
  );
}

export default function WhyHomaVideos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [allSlidesVisible, setAllSlidesVisible] = useState(true);

  const count = WHY_HOMA_SHORTS.length;
  const showPager = count > 1 && !allSlidesVisible;

  const stopPlayback = useCallback(() => setPlayingId(null), []);

  const updateFitAndIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAllSlidesVisible(track.scrollWidth <= track.clientWidth + 4);

    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length === 0) return;

    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((slide, i) => {
      const slideCenter = slide.offsetLeft - track.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(slideCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActiveIndex(best);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateFitAndIndex();

    const onScroll = () => {
      stopPlayback();
      updateFitAndIndex();
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => updateFitAndIndex());
    ro.observe(track);

    return () => {
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [updateFitAndIndex, stopPlayback, count]);

  const scrollToIndex = (index: number) => {
    stopPlayback();
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    if (!track || !slide) return;
    const left = slide.offsetLeft - track.offsetLeft;
    track.scrollTo({ left, behavior: "smooth" });
    setActiveIndex(index);
  };

  const onPrev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const onNext = () => scrollToIndex(Math.min(count - 1, activeIndex + 1));

  const onTrackKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!showPager) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      onPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      onNext();
    }
  };

  return (
    <section
      id="why-homa-videos"
      className="wh-sec"
      aria-labelledby="why-homa-videos-title"
      style={{ "--wh-count": count } as CSSProperties}
    >
      <style>{WH_CSS}</style>
      <div className="wh-wrap">
        <div className="wh-eyebrow">WHY HOMA?</div>
        <h2 id="why-homa-videos-title" className="wh-h2">
          Wake Up India. Take Health Into Your Hands.
        </h2>
        <p className="wh-intro">
          Empowering the wealth of healthy, ethical medical knowledge. Tap to play — no signup, loads only when you choose.
        </p>

        <div className={`wh-carousel ${allSlidesVisible ? "wh-carousel--fit" : ""}`}>
          {showPager ? (
            <button
              type="button"
              className="wh-arrow wh-arrow--prev"
              onClick={onPrev}
              disabled={activeIndex <= 0}
              aria-label="Previous video"
            >
              ‹
            </button>
          ) : null}

          <div
            ref={trackRef}
            className="wh-track"
            role="region"
            aria-roledescription="carousel"
            aria-label="Why HOMA video shorts"
            tabIndex={showPager ? 0 : undefined}
            onKeyDown={onTrackKeyDown}
          >
            {WHY_HOMA_SHORTS.map((video, i) => (
              <div
                key={video.youtubeId}
                className="wh-slide"
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                aria-hidden={showPager && i !== activeIndex ? true : undefined}
              >
                <ShortVideoCard
                  video={video}
                  isPlaying={playingId === video.youtubeId}
                  onPlay={() => setPlayingId(video.youtubeId)}
                  onStop={() => {
                    if (playingId === video.youtubeId) stopPlayback();
                  }}
                />
              </div>
            ))}
          </div>

          {showPager ? (
            <button
              type="button"
              className="wh-arrow wh-arrow--next"
              onClick={onNext}
              disabled={activeIndex >= count - 1}
              aria-label="Next video"
            >
              ›
            </button>
          ) : null}
        </div>

        {showPager ? (
          <div className="wh-dots" role="tablist" aria-label="Choose video slide">
            {WHY_HOMA_SHORTS.map((video, i) => (
              <button
                key={video.youtubeId}
                type="button"
                role="tab"
                className={`wh-dot${i === activeIndex ? " wh-dot--on" : ""}`}
                aria-selected={i === activeIndex}
                aria-label={`Slide ${i + 1} of ${count}: ${video.title}`}
                onClick={() => scrollToIndex(i)}
              />
            ))}
          </div>
        ) : null}

        <div className="wh-photos">
          <figure className="wh-photo">
            <Image
              src="/images/home-sections/lions-club-talk-panel.webp"
              alt="Dr Muddu Surendra Nehru, M.D., speaking on diabetes, obesity and heart health at Lions Club, Hyderabad"
              width={320}
              height={240}
              className="wh-photo-img"
              loading="lazy"
            />
          </figure>
          <figure className="wh-photo">
            <Image
              src="/images/home-sections/lions-club-talk-audience.webp"
              alt="Dr Muddu Surendra Nehru, M.D., speaking on diabetes, obesity and heart health at Lions Club, Hyderabad"
              width={320}
              height={240}
              className="wh-photo-img"
              loading="lazy"
            />
          </figure>
          <figure className="wh-photo wh-photo--with-cap">
            <Image
              src="/images/home-sections/lions-club-felicitation.webp"
              alt="Dr Muddu Surendra Nehru, M.D., felicitated after his guest lecture on central obesity and HOMA-IR, Lions Club, Hyderabad"
              width={320}
              height={240}
              className="wh-photo-img"
              loading="lazy"
            />
            <figcaption className="wh-photo-figcap">
              Dr Muddu Surendra Nehru, M.D., felicitated after his guest lecture on central obesity and HOMA-IR, Lions Club, Hyderabad
            </figcaption>
          </figure>
          <p className="wh-photo-cap">
            Dr Muddu Surendra Nehru, M.D., speaking on diabetes, obesity and heart health at Lions Club, Hyderabad
          </p>
        </div>

        <SectionCta
          knowMoreHref="/books"
          book={{
            title: "BP: The Untold Truth",
            coverSrc: "/images/home-sections/book-bp-untold-truth.webp",
          }}
        />
      </div>
    </section>
  );
}

const WH_CSS = `
.wh-sec{padding:48px 20px;background:#f8fafc;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;color:#0f172a}
@media (min-width:768px){.wh-sec{padding:64px 32px}}
.wh-wrap{max-width:960px;margin:0 auto}
.wh-eyebrow{font-size:12px;font-weight:700;letter-spacing:.14em;color:#10b981;text-align:center;margin-bottom:10px}
.wh-h2{font-size:clamp(24px,4vw,36px);line-height:1.15;font-weight:800;letter-spacing:-.02em;margin:0 0 10px;text-align:center;color:#1e3a8a}
.wh-intro{text-align:center;color:#64748b;font-size:15px;margin:0 0 28px;max-width:520px;margin-left:auto;margin-right:auto}

.wh-carousel{position:relative;display:flex;align-items:center;gap:8px}
.wh-carousel--fit .wh-track{justify-content:center}

.wh-track{
  display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;
  -webkit-overflow-scrolling:touch;scrollbar-width:none;flex:1;padding:4px 2px 12px;
  scroll-padding-inline:16px
}
.wh-track::-webkit-scrollbar{display:none}

.wh-slide{
  flex:0 0 min(78vw,280px);scroll-snap-align:center;scroll-snap-stop:always
}
@media (min-width:768px){
  .wh-slide{
    flex:0 0 calc((100% - 32px) / min(3, var(--wh-count, 1)));
    max-width:280px
  }
  .wh-carousel--fit .wh-slide{flex:0 0 min(280px,100%)}
}

.wh-card{display:flex;flex-direction:column;gap:8px;height:100%}
.wh-aspect{position:relative;width:100%;aspect-ratio:9/16;border-radius:16px;overflow:hidden;background:#0f172a;box-shadow:0 12px 32px -16px rgba(15,23,42,.35)}
.wh-facade{position:relative;display:block;width:100%;height:100%;padding:0;border:none;cursor:pointer;background:#0f172a}
.wh-facade:focus-visible{outline:3px solid #10b981;outline-offset:2px}
.wh-thumb{width:100%;height:100%;object-fit:cover;display:block}
.wh-play{
  position:absolute;inset:0;margin:auto;width:64px;height:64px;border-radius:999px;
  background:rgba(15,23,42,.72);color:#fff;display:flex;align-items:center;justify-content:center;
  box-shadow:0 8px 24px rgba(0,0,0,.35);pointer-events:none
}
.wh-iframe{position:absolute;inset:0;width:100%;height:100%;border:0}

.wh-title{font-size:15px;font-weight:700;line-height:1.35;color:#0f172a;margin:4px 0 0}
.wh-sub{font-size:13px;line-height:1.45;color:#64748b;margin:0}
.wh-cta{font-size:13px;font-weight:600;color:#0d9488;text-decoration:none;margin-top:2px}
.wh-cta:hover{text-decoration:underline;text-underline-offset:3px}

.wh-arrow{
  flex-shrink:0;width:44px;height:44px;border-radius:999px;border:1px solid #e2e8f0;
  background:#fff;color:#1e3a8a;font-size:28px;line-height:1;cursor:pointer;display:none;
  align-items:center;justify-content:center;transition:background .15s,border-color .15s
}
.wh-arrow:hover:not(:disabled){background:#f1f5f9;border-color:#cbd5e1}
.wh-arrow:disabled{opacity:.35;cursor:not-allowed}
@media (max-width:767px){.wh-arrow{display:flex}}
.wh-arrow--prev{padding-right:2px}
.wh-arrow--next{padding-left:2px}

.wh-dots{display:flex;justify-content:center;gap:8px;margin-top:16px}
.wh-dot{width:8px;height:8px;border-radius:999px;border:none;padding:0;background:#cbd5e1;cursor:pointer}
.wh-dot--on{background:#10b981;transform:scale(1.15)}
.wh-dot:focus-visible{outline:2px solid #10b981;outline-offset:2px}

.wh-photos{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:36px;max-width:980px;margin-left:auto;margin-right:auto}
.wh-photo{margin:0;flex:1 1 140px;max-width:320px}
.wh-photo--with-cap{flex:1 1 180px;max-width:320px;display:flex;flex-direction:column}
.wh-photo-img{width:100%;height:auto;border-radius:12px;border:1px solid #e2e8f0;box-shadow:0 8px 20px -10px rgba(15,23,42,.15)}
.wh-photo-figcap{margin-top:8px;font-size:12px;line-height:1.45;color:#64748b;text-align:center}
.wh-photo-cap{flex:1 1 100%;margin:8px 0 0;text-align:center;font-size:13px;line-height:1.5;color:#64748b}
`;
