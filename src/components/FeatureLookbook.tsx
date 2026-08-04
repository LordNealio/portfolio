import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface Hotspot {
  label: string;
  left: number;
  top: number;
  width: number;
  height: number;
  start?: number;
}

/**
 * A feature image with Supreme-style clickable hotspots. Each hotspot opens a
 * full-screen lookbook lightbox (the project's gallery) at its `start` index,
 * browsable with arrows / keyboard. The image alone still reads fine without JS.
 */
export function FeatureLookbook({
  image,
  alt,
  title,
  images,
  hotspots,
}: {
  image: string;
  alt: string;
  title: string;
  images: string[];
  hotspots: Hotspot[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const count = images.length;

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % count));
      else if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + count) % count));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, count]);

  const openAt = (start?: number) => {
    if (!count) return;
    setOpen(Math.min(Math.max(start ?? 0, 0), count - 1));
  };
  const step = (dir: number) => setOpen((i) => (i === null ? i : (i + dir + count) % count));

  return (
    <section className="detail-feature feature-look reveal">
      <div className="feature-look-frame">
        <img src={image} alt={alt} />
        {count > 0 &&
          hotspots.map((h, i) => (
            <button
              key={i}
              className="feature-hotspot"
              style={{ left: `${h.left}%`, top: `${h.top}%`, width: `${h.width}%`, height: `${h.height}%` }}
              onClick={() => openAt(h.start)}
              aria-label={`Open ${h.label} in the lookbook`}
            >
              <span className="feature-hotspot-label">
                {h.label} <span aria-hidden="true">↗</span>
              </span>
            </button>
          ))}
      </div>
      {count > 0 && <p className="feature-look-hint">Select a look to open the lookbook →</p>}

      {open !== null &&
        images[open] &&
        createPortal(
          <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
            <button className="lightbox-close" onClick={() => setOpen(null)} aria-label="Close">
              ×
            </button>
            <button
              className="lightbox-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous look"
            >
              ‹
            </button>
            <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
              <img src={images[open]} alt={`${title} — look ${open + 1}`} />
            </figure>
            <button
              className="lightbox-nav next"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next look"
            >
              ›
            </button>
            <div className="lightbox-bar" onClick={(e) => e.stopPropagation()}>
              <span className="lightbox-counter">
                {String(open + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <a className="lightbox-download" href={images[open]} download onClick={(e) => e.stopPropagation()}>
                Download ↓
              </a>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
