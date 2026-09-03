import { NavLink, Link } from "react-router-dom";
import { useEffect } from "react";
import { RECONVENE, SOURCES } from "../../data/reconvening34";

// Shared chrome for Reconvening the 34 — a chapter of The R Word inside the
// portfolio hub. The site's Nav and Footer stay in place (App.tsx renders them
// for every non-gate route); this supplies only the section masthead, the
// sub-navigation, and a closing colophon, the same way the study pages do.

export const REC_BASE = "/study/r-word/34";

const TABS: { to: string; label: string; end?: boolean }[] = [
  { to: REC_BASE, label: "Context", end: true },
  { to: `${REC_BASE}/original`, label: "The Original 34" },
  { to: `${REC_BASE}/proposed`, label: "The Proposed New 34" },
  { to: `${REC_BASE}/compare`, label: "Compare" },
  { to: `${REC_BASE}/review`, label: "Review ballot" },
  { to: `${REC_BASE}/additions`, label: "Add to it" },
  { to: `${REC_BASE}/results`, label: "Results" },
  { to: `${REC_BASE}/assembly`, label: "September 6" },
  { to: `${REC_BASE}/sources`, label: "Sources & method" },
];

export function ReconveneShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.title = `${title} — Reconvening the 34`;
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, [title]);

  return (
    <div className="rec">
      <header className="rec-mast">
        <div className="rec-wrap">
          <Link to="/study/r-word" className="rec-back">
            ← The R Word
          </Link>
          <div className="rec-mast-top">
            <span className="rec-kicker">Reconvening the 34</span>
            <span className="rec-fine">Ohio, September 6–8, 1848 → 2026</span>
          </div>
          <h1>{RECONVENE.progression}</h1>
          <p className="rec-invite">{RECONVENE.invitation}</p>
          <nav className="rec-tabs" aria-label="Reconvening the 34 sections">
            {TABS.map((t) => (
              <NavLink key={t.to} to={t.to} end={t.end} className="rec-tab">
                {t.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <div className="rec-body">
        <div className="rec-wrap">{children}</div>
      </div>

      {/* Section colophon — the site's own footer still follows below. */}
      <div className="rec-foot">
        <div className="rec-wrap">
          <div className="rec-foot-links">
            <a href={SOURCES.proceedings} target="_blank" rel="noopener noreferrer">
              1848 proceedings ↗
            </a>
            <Link to={`${REC_BASE}/sources`}>Sources &amp; method</Link>
            <Link to="/study/r-word">The R Word study</Link>
            <Link to="/work/reparations">The project</Link>
          </div>
          <p style={{ margin: 0 }}>
            {RECONVENE.standing} {RECONVENE.safety}
          </p>
        </div>
      </div>
    </div>
  );
}

/** The standing notice shown wherever feedback is collected or displayed. */
export function StandingNotice() {
  return (
    <p className="rec-standing">
      <b>Community feedback — not an official election.</b> {RECONVENE.standing}
    </p>
  );
}

/** Filters, folded away. Twelve chips wrap to five rows on a phone — 251px of a
 *  812px screen — so they sit behind a disclosure that is open on wide screens
 *  and closed on narrow ones. */
export function Filters({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const wide =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 761px)").matches;
  return (
    <details className="rec-filterbox" open={wide}>
      <summary>{label}</summary>
      <div className="rec-filters">{children}</div>
    </details>
  );
}

/** Progress readout. Never nags; the count is informational only. */
export function Progress({ done, total }: { done: number; total: number }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="rec-progress">
      <span>
        {done} of {total} reviewed
      </span>
      <div
        className="rec-bar"
        role="progressbar"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${done} of ${total} items reviewed`}
      >
        <div className="rec-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
