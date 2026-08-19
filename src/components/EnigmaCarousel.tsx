import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ENIGMA_SLIDES as SLIDES } from "../data/enigma";

export type EnigmaDoor = {
  key: string;
  label: string;
  name: string;
  desc: string;
  to?: string; // renders a Link when set, else a button
  onActivate?: () => void;
  lead?: boolean; // emphasized (first) door
};

// The shared ENIGMA experience: the 7 slides as a swipeable carousel, then a
// three-door panel. Used by the /enter gate and the homepage onboarding overlay.
export function EnigmaCarousel({
  doors,
  onMark,
  onSkip,
}: {
  doors: EnigmaDoor[];
  onMark: () => void; // top-left mark (exit)
  onSkip?: () => void; // override Skip; default jumps to the doors panel
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const TOTAL = SLIDES.length + 1;

  function goTo(i: number) {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(TOTAL - 1, i));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  }
  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  }
  const atDoors = index >= SLIDES.length;

  return (
    <div className="gate">
      <div className="gate-top">
        <button className="gate-mark" onClick={onMark}>
          NIL<span className="gate-mark-sub"> · Just Neal</span>
        </button>
        {!atDoors && (
          <button className="gate-skip" onClick={() => (onSkip ? onSkip() : goTo(SLIDES.length))}>
            Skip <span className="arr">→</span>
          </button>
        )}
      </div>

      <div className="gate-track" ref={trackRef} onScroll={onScroll}>
        {SLIDES.map((s, i) => (
          <div className="gate-slide" key={s.src}>
            <img src={s.src} alt={s.alt} draggable={false} loading={i === 0 ? "eager" : "lazy"} />
          </div>
        ))}

        <div className="gate-slide gate-doors">
          <div className="gate-doors-inner">
            <p className="gate-doors-eyebrow">Three ways in</p>
            <h1 className="gate-doors-h">Follow the pattern — or step into the studio.</h1>
            <div className="gate-doors-grid">
              {doors.map((d) => {
                const cls = `gate-door${d.lead ? " lead" : ""}`;
                const inner = (
                  <>
                    <span className="gate-door-label">{d.label}</span>
                    <span className="gate-door-name">{d.name}</span>
                    <span className="gate-door-desc">{d.desc}</span>
                    <span className="gate-door-go">
                      Open <span className="arr">→</span>
                    </span>
                  </>
                );
                return d.to ? (
                  <Link key={d.key} to={d.to} className={cls} onClick={d.onActivate}>
                    {inner}
                  </Link>
                ) : (
                  <button key={d.key} className={cls} onClick={d.onActivate}>
                    {inner}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="gate-controls">
        <button className="gate-arrow" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous slide">
          ←
        </button>
        <div className="gate-dots" role="tablist" aria-label="Slides">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              className={`gate-dot${i === index ? " on" : ""}${i === TOTAL - 1 ? " end" : ""}`}
              onClick={() => goTo(i)}
              aria-label={i === TOTAL - 1 ? "The doors" : `Slide ${i + 1}`}
              aria-selected={i === index}
            />
          ))}
        </div>
        <button className="gate-arrow" onClick={() => goTo(index + 1)} disabled={atDoors} aria-label="Next slide">
          →
        </button>
      </div>
    </div>
  );
}
