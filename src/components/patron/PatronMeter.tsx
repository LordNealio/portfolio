import { useEffect, useRef, useState } from "react";
import type { Money } from "../../data/patron";

const money = (m: Money) => {
  const cur = m.currency ?? "$";
  return `${cur}${Math.round(m.amount).toLocaleString("en-US")}${m.unit ?? ""}`;
};

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Goal / Raised / Remaining / Percentage with an animated bar. The bar fills and
 * the percentage counts up the first time the meter scrolls into view.
 */
export function PatronMeter({
  goal,
  raised,
  labels = { goal: "Goal", raised: "Raised", remaining: "Remaining" },
  compact = false,
}: {
  goal: Money;
  raised: Money;
  labels?: { goal: string; raised: string; remaining: string };
  compact?: boolean;
}) {
  const pct = goal.amount > 0 ? Math.min(100, (raised.amount / goal.amount) * 100) : 0;
  const remaining: Money = { ...goal, amount: Math.max(0, goal.amount - raised.amount) };
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0); // animated percentage

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced() || !("IntersectionObserver" in window)) {
      setShown(pct);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const start = performance.now();
          const dur = 1100;
          const tick = (t: number) => {
            const k = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - k, 3);
            setShown(pct * eased);
            if (k < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pct]);

  return (
    <div className={`pe-meter ${compact ? "pe-meter--compact" : ""}`} ref={ref}>
      <div className="pe-meter-stats">
        <div className="pe-stat">
          <span className="pe-stat-k">{labels.goal}</span>
          <span className="pe-stat-v">{money(goal)}</span>
        </div>
        <div className="pe-stat">
          <span className="pe-stat-k">{labels.raised}</span>
          <span className="pe-stat-v">{money(raised)}</span>
        </div>
        <div className="pe-stat">
          <span className="pe-stat-k">{labels.remaining}</span>
          <span className="pe-stat-v">{money(remaining)}</span>
        </div>
        <div className="pe-stat pe-stat--pct">
          <span className="pe-stat-k">Funded</span>
          <span className="pe-stat-v">{shown.toFixed(shown < 10 ? 1 : 0)}%</span>
        </div>
      </div>
      <div
        className="pe-bar"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${labels.raised} of ${labels.goal}`}
      >
        <div className="pe-bar-fill" style={{ width: `${shown}%` }} />
      </div>
    </div>
  );
}
