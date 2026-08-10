import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../data/projects";

/**
 * A full-screen cinematic carousel of a work's gallery images. Takes over the
 * viewport (fixed); prev/next, keyboard (←/→/Esc), dots, and per-image download.
 * Self-healing: any image that isn't present yet is skipped automatically.
 */
export function ImageCarousel({ project }: { project: Project }) {
  const nav = useNavigate();
  const all = project.gallery ?? [];
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const images = all.filter((s) => !failed.has(s));
  const [i, setI] = useState(0);

  const back = project.chapterOf ? `/work/${project.chapterOf}` : "/work";
  const idx = images.length ? ((i % images.length) + images.length) % images.length : 0;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") nav(back);
      else if (e.key === "ArrowRight") setI((x) => x + 1);
      else if (e.key === "ArrowLeft") setI((x) => x - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [nav, back]);

  return (
    <div className="cx">
      <header className="cx-top">
        <span className="cx-title">{project.title}</span>
        <span className="cx-count">{images.length ? `${idx + 1} / ${images.length}` : "—"}</span>
        <button className="cx-close" onClick={() => nav(back)} aria-label="Close">
          Close ✕
        </button>
      </header>

      <main className="cx-stage">
        {images.length > 0 ? (
          <>
            <button className="cx-arrow left" onClick={() => setI((x) => x - 1)} aria-label="Previous">
              ‹
            </button>
            <figure className="cx-fig" key={images[idx]}>
              <img src={images[idx]} alt={`${project.title} — ${idx + 1}`} />
            </figure>
            <button className="cx-arrow right" onClick={() => setI((x) => x + 1)} aria-label="Next">
              ›
            </button>
          </>
        ) : (
          <p className="cx-empty">Images coming soon.</p>
        )}

        {/* Hidden preload to detect (and skip) any image that isn't present yet */}
        <div style={{ display: "none" }} aria-hidden="true">
          {all.map((s) => (
            <img key={s} src={s} alt="" onError={() => setFailed((f) => new Set(f).add(s))} />
          ))}
        </div>
      </main>

      <footer className="cx-bottom">
        <div className="cx-dots">
          {images.map((s, n) => (
            <button
              key={s}
              className={`cx-dot ${n === idx ? "on" : ""}`}
              onClick={() => setI(n)}
              aria-label={`Image ${n + 1}`}
            />
          ))}
        </div>
        {images[idx] && (
          <a className="cx-dl" href={images[idx]} download>
            Download ↓
          </a>
        )}
      </footer>
    </div>
  );
}
