import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Supreme-style lookbook: a clickable grid that opens a full-screen pop-up
 * slideshow (prev/next, arrow keys, Esc). Self-healing — any image that isn't
 * present is hidden, and the whole section stays invisible until at least one
 * exists. Wire filenames now; drop the files in later.
 */
export function Gallery({ title, images }: { title: string; images: string[] }) {
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<number | null>(null);
  const visible = images.filter((s) => !failed.has(s));

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % visible.length));
      else if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? i : (i - 1 + visible.length) % visible.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, visible.length]);

  if (visible.length === 0) return null;

  const step = (dir: number) =>
    setOpen((i) => (i === null ? i : (i + dir + visible.length) % visible.length));

  return (
    <section className="detail-gallery lookbook">
      <div className="lookbook-head reveal">
        <h2 className="h2">{title}</h2>
        <span className="lookbook-count">{visible.length} looks · tap to view</span>
      </div>

      <div className="lookbook-grid">
        {visible.map((src, i) => (
          <button
            className="lookbook-thumb reveal"
            key={src}
            onClick={() => setOpen(i)}
            aria-label={`Open look ${i + 1} of ${visible.length}`}
          >
            <img
              src={src}
              alt={`${title} — look ${i + 1}`}
              loading="lazy"
              decoding="async"
              onError={() => setFailed((f) => new Set(f).add(src))}
            />
            <span className="lookbook-idx">{String(i + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      {open !== null &&
        visible[open] &&
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
              <img src={visible[open]} alt={`${title} — look ${open + 1}`} />
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
            <div className="lightbox-counter">
              {String(open + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
