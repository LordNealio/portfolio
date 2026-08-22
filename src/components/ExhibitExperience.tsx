import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Exhibit, ExhibitSlide } from "../data/exhibits";

// A full-screen, click-through case experience (exhibit mode: "carousel"). It
// takes over the viewport — the rest of the site sits under it — and pages
// through the slides one at a time. A slide can carry an embedded video, dropped
// into a region of its artwork (e.g. a baked-in "play" area).
type Step = { kind: "slide"; slide: ExhibitSlide } | { kind: "closing" };

export function ExhibitExperience({ exhibit }: { exhibit: Exhibit }) {
  const nav = useNavigate();
  const touchX = useRef<number | null>(null);

  const steps: Step[] = exhibit.slides.map((slide) => ({ kind: "slide" as const, slide }));
  steps.push({ kind: "closing" });

  const len = steps.length;
  const [step, setStep] = useState(0);
  const go = (d: number) => setStep((s) => Math.min(Math.max(s + d, 0), len - 1));
  const cur = steps[step];
  const exit = () => nav(exhibit.parent.to);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exit();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len]);

  useEffect(() => {
    document.title = `${exhibit.title} — NIL · Just Neal`;
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, [exhibit.title]);

  return (
    <div className="nx">
      <div className="nx-top">
        <span className="nx-kicker">{exhibit.eyebrow}</span>
        <button className="nx-close" onClick={exit} aria-label="Close experience">
          Close ✕
        </button>
      </div>

      <div
        className="nx-stage"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {cur.kind === "slide" &&
          (cur.slide.videoEmbed && cur.slide.videoBox ? (
            <div className="nx-slide nx-media">
              <img src={cur.slide.src} alt={cur.slide.alt} />
              <div
                className="nx-media-video"
                style={{
                  left: `${cur.slide.videoBox.left}%`,
                  top: `${cur.slide.videoBox.top}%`,
                  width: `${cur.slide.videoBox.width}%`,
                  height: `${cur.slide.videoBox.height}%`,
                }}
              >
                <iframe
                  src={cur.slide.videoEmbed}
                  title={`${exhibit.title} — mix`}
                  allow="fullscreen; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <button className="nx-slide" onClick={() => go(1)} aria-label="Next">
              <img src={cur.slide.src} alt={cur.slide.alt} />
            </button>
          ))}

        {cur.kind === "closing" && (
          <div className="nx-closing">
            <p className="nx-kicker">End of file</p>
            <p className="nx-closing-line">{exhibit.closing.line}</p>
            {exhibit.closing.note && <p className="nx-note">{exhibit.closing.note}</p>}
            <button className="nx-begin" onClick={exit}>
              Back to {exhibit.parent.label} <span className="arr">→</span>
            </button>
          </div>
        )}
      </div>

      <div className="nx-controls">
        <button className="nx-arrow" onClick={() => go(-1)} disabled={step === 0} aria-label="Previous">
          ←
        </button>
        <div className="nx-dots">
          {steps.map((s, i) => (
            <button
              key={i}
              className={`nx-dot ${i === step ? "on" : ""} ${s.kind === "slide" && s.slide.videoEmbed ? "vid" : ""}`}
              onClick={() => setStep(i)}
              aria-label={`Step ${i + 1}`}
              aria-current={i === step}
            />
          ))}
        </div>
        <button className="nx-arrow" onClick={() => go(1)} disabled={step === len - 1} aria-label="Next">
          →
        </button>
      </div>
    </div>
  );
}
