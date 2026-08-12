import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { StoryCarousel as StoryCarouselData } from "../data/projects";

/**
 * An inline, swipeable carousel of finished slides embedded within a detail
 * page. The slides are finalized image assets — presented as-is, never overlaid
 * or redesigned. Prev/next, dots, counter, touch-swipe, keyboard (←/→ when
 * focused), and click-to-expand into a full-screen lightbox (Esc / click to
 * close). Self-healing: any image not present yet is skipped automatically.
 */
export function StoryCarousel({ data }: { data: StoryCarouselData }) {
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const images = data.images.filter((im) => !failed.has(im.src));
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [hint, setHint] = useState(true); // "tap to read" affordance, until first interaction
  const touchX = useRef<number | null>(null);

  const len = images.length;
  const idx = len ? ((i % len) + len) % len : 0;
  const go = (d: number) => {
    setHint(false);
    setI((x) => x + d);
  };
  const jump = (n: number) => {
    setHint(false);
    setI(n);
  };
  const open = () => {
    setHint(false);
    setZoom(true);
  };

  // Lock body scroll + wire keyboard while the lightbox is open.
  useEffect(() => {
    if (!zoom) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [zoom]);

  const onTouchStart = (e: React.TouchEvent) => {
    setHint(false);
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const current = images[idx];

  return (
    <section className="story-carousel reveal" aria-roledescription="carousel">
      <header className="story-head">
        {data.eyebrow && <p className="eyebrow">{data.eyebrow}</p>}
        <h2 className="h2 story-title">{data.title}</h2>
        {data.intro && <p className="lead story-intro">{data.intro}</p>}
      </header>

      <div
        className="story-stage"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          else if (e.key === "ArrowLeft") go(-1);
        }}
        tabIndex={0}
        role="group"
        aria-label={`${data.title} — slide ${idx + 1} of ${len}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {len > 0 ? (
          <>
            <button className="story-arrow left" onClick={() => go(-1)} aria-label="Previous slide">
              ‹
            </button>
            <button type="button" className="story-frame" onClick={open} aria-label="Expand slide">
              <img src={current.src} alt={current.alt} loading={idx === 0 ? "eager" : "lazy"} />
              <span className="story-expand" aria-hidden="true">
                ⤢
              </span>
              {hint && (
                <span className="story-hint" aria-hidden="true">
                  Tap to read · swipe to move
                </span>
              )}
            </button>
            <button className="story-arrow right" onClick={() => go(1)} aria-label="Next slide">
              ›
            </button>
          </>
        ) : (
          <p className="story-empty">Slides coming soon.</p>
        )}

        {/* Hidden preload — detects and skips any slide not present yet */}
        <div style={{ display: "none" }} aria-hidden="true">
          {data.images.map((im) => (
            <img key={im.src} src={im.src} alt="" onError={() => setFailed((f) => new Set(f).add(im.src))} />
          ))}
        </div>
      </div>

      {len > 0 && (
        <footer className="story-foot">
          <span className="story-count">
            {idx + 1} / {len}
          </span>
          <div className="story-dots">
            {images.map((im, n) => (
              <button
                key={im.src}
                className={`story-dot ${n === idx ? "on" : ""}`}
                onClick={() => jump(n)}
                aria-label={`Go to slide ${n + 1}`}
                aria-current={n === idx}
              />
            ))}
          </div>
        </footer>
      )}

      {zoom &&
        current &&
        createPortal(
          <div className="story-lightbox" onClick={() => setZoom(false)}>
            <button className="story-lb-close" aria-label="Close">
              Close ✕
            </button>
            <button
              className="story-arrow left"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <img src={current.src} alt={current.alt} onClick={(e) => e.stopPropagation()} />
            <button
              className="story-arrow right"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next slide"
            >
              ›
            </button>
            <span className="story-lb-count">
              {idx + 1} / {len}
            </span>
          </div>,
          document.body
        )}
    </section>
  );
}
