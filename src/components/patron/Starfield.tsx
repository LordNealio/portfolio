import { useMemo } from "react";

/**
 * Cinematic hero backdrop: slow-moving gradient auroras, a static star layer,
 * and a handful of minimal twinkling particles. Pure CSS/DOM — no canvas, no
 * dependencies. All motion is disabled under prefers-reduced-motion (in CSS).
 */
export function Starfield({ count = 34 }: { count?: number }) {
  // Deterministic-ish positions (no Date/Math.random dependency at module load).
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i * 137.508) % 100; // golden-angle spread
        const b = (i * 61.803) % 100;
        const size = 1 + ((i * 7) % 3);
        const delay = ((i * 13) % 60) / 10;
        const dur = 3 + ((i * 11) % 40) / 10;
        return { left: a, top: b, size, delay, dur, i };
      }),
    [count]
  );

  return (
    <div className="pe-cosmos" aria-hidden="true">
      <div className="pe-aurora pe-aurora-1" />
      <div className="pe-aurora pe-aurora-2" />
      <div className="pe-aurora pe-aurora-3" />
      <div className="pe-starlayer" />
      <div className="pe-particles">
        {stars.map((s) => (
          <span
            key={s.i}
            className="pe-particle"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
