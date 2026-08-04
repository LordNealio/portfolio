import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../data/projects";

/**
 * Full-screen cinematic slideshow for the fashion house. It takes over the
 * viewport (fixed) and moves through stages rather than scrolling:
 *   cover → brand/vision slides → the NIL index (clickable strokes/panels)
 *   → the lookbook (browse looks). Esc or Close returns to /work.
 */
export function FashionExperience({ project }: { project: Project }) {
  const nav = useNavigate();
  const gallery = project.gallery ?? [];
  const hotspots = project.featureHotspots ?? [];
  const feature = project.feature;

  const visionLines = [
    "A heritage house built on Name, Image, Likeness.",
    "From Nil — nothing. Through Kneel — humility. To Neal — a name that lasts.",
    "Built to last, not to trend — every collection a chapter of one idea.",
  ];

  type Step = { kind: "cover" } | { kind: "vision"; line: string } | { kind: "index" } | { kind: "lookbook" };
  const steps: Step[] = [
    { kind: "cover" },
    ...visionLines.map((line) => ({ kind: "vision" as const, line })),
    { kind: "index" },
    { kind: "lookbook" },
  ];
  const indexStep = 1 + visionLines.length;
  const lookbookStep = indexStep + 1;

  const [step, setStep] = useState(0);
  const [look, setLook] = useState(0);
  const cur = steps[step];
  const last = gallery.length - 1;

  const go = useCallback(
    (d: number) => setStep((s) => Math.min(Math.max(s + d, 0), steps.length - 1)),
    [steps.length]
  );
  const nextLook = useCallback(() => setLook((l) => (gallery.length ? (l + 1) % gallery.length : 0)), [gallery.length]);
  const prevLook = useCallback(() => setLook((l) => (gallery.length ? (l - 1 + gallery.length) % gallery.length : 0)), [gallery.length]);
  const enterLookAt = (i: number) => {
    setLook(Math.min(Math.max(i, 0), last));
    setStep(lookbookStep);
  };

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") nav("/work");
      else if (e.key === "ArrowRight") cur.kind === "lookbook" ? nextLook() : go(1);
      else if (e.key === "ArrowLeft") cur.kind === "lookbook" ? prevLook() : go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [cur.kind, go, nextLook, prevLook, nav]);

  const heroBg = gallery[0]
    ? { backgroundImage: `linear-gradient(rgba(8,10,14,0.45), rgba(8,10,14,0.8)), url(${gallery[0]})` }
    : undefined;

  return (
    <div className="fx">
      <header className="fx-top">
        <span className="fx-brand">NIL</span>
        <span className="fx-crumb">
          {cur.kind === "lookbook"
            ? `Look ${String(look + 1).padStart(2, "0")} / ${String(gallery.length).padStart(2, "0")}`
            : cur.kind === "index"
            ? "The index"
            : "Name · Image · Likeness"}
        </span>
        <button className="fx-close" onClick={() => nav("/work")} aria-label="Close experience">
          Close ✕
        </button>
      </header>

      <main className="fx-stage" key={step}>
        {cur.kind === "cover" && (
          <button className="fx-cover" style={heroBg} onClick={() => go(1)}>
            <div className="fx-cover-inner">
              <p className="fx-eyebrow">{project.subtitle}</p>
              <h1 className="fx-logo">NIL</h1>
              <p className="fx-sub">Name · Image · Likeness</p>
              <span className="fx-enter">Enter ↓</span>
            </div>
          </button>
        )}

        {cur.kind === "vision" && (
          <button className="fx-vision" onClick={() => go(1)}>
            <p className="fx-vision-line">{cur.line}</p>
            <span className="fx-enter">Continue →</span>
          </button>
        )}

        {cur.kind === "index" && feature && (
          <div className="fx-index">
            <div className="fx-index-frame">
              <img src={feature} alt={`${project.title} — the index`} />
              {hotspots.map((h, i) => (
                <button
                  key={i}
                  className="fx-hot"
                  style={{ left: `${h.left}%`, top: `${h.top}%`, width: `${h.width}%`, height: `${h.height}%` }}
                  onClick={() => enterLookAt(h.start ?? 0)}
                  aria-label={`Enter ${h.label}`}
                >
                  <span className="fx-hot-label">
                    {h.label} <span aria-hidden="true">↗</span>
                  </span>
                </button>
              ))}
            </div>
            <p className="fx-index-hint">
              Select a stroke to enter —{" "}
              <button className="fx-link" onClick={() => enterLookAt(0)}>
                or view the full lookbook →
              </button>
            </p>
          </div>
        )}

        {cur.kind === "lookbook" && gallery.length > 0 && (
          <div className="fx-look">
            <button className="fx-arrow left" onClick={prevLook} aria-label="Previous look">
              ‹
            </button>
            <figure className="fx-look-fig">
              <img src={gallery[look]} alt={`${project.title} — look ${look + 1}`} />
            </figure>
            <button className="fx-arrow right" onClick={nextLook} aria-label="Next look">
              ›
            </button>
            <div className="fx-look-bar">
              <button className="fx-link" onClick={() => setStep(indexStep)}>
                ← Index
              </button>
              <span className="fx-look-count">
                {String(look + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </span>
              <a className="fx-link" href={gallery[look]} download>
                Download ↓
              </a>
            </div>
          </div>
        )}
      </main>

      <footer className="fx-bottom">
        <button
          className="fx-nav-btn"
          onClick={() => (cur.kind === "lookbook" ? prevLook() : go(-1))}
          disabled={cur.kind !== "lookbook" && step === 0}
          aria-label="Back"
        >
          ←
        </button>
        <div className="fx-dots">
          {steps.map((s, i) => (
            <button
              key={i}
              className={`fx-dot ${i === step ? "on" : ""} ${s.kind === "index" ? "mark" : ""}`}
              onClick={() => setStep(i)}
              aria-label={`Go to ${s.kind} ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="fx-nav-btn"
          onClick={() => (cur.kind === "lookbook" ? nextLook() : go(1))}
          aria-label="Next"
        >
          →
        </button>
      </footer>
    </div>
  );
}
