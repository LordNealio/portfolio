import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ORIGINAL_34,
  ORIGINAL_CATEGORIES,
  RECONVENE_VERSIONS,
} from "../../data/reconvening34";
import {
  ReconveneShell,
  REC_BASE,
  Progress,
  StandingNotice,
  Filters,
} from "../../components/reconvene/ReconveneShell";
import { OriginalCard } from "../../components/reconvene/ResolutionCard";
import { useReconveneDraft } from "../../lib/useReconveneDraft";

export function OriginalExplorer() {
  const { draft, setOriginal, answerOf } = useReconveneDraft();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [onlyUnreviewed, setOnlyUnreviewed] = useState(false);

  const done = Object.values(draft.original).filter((a) => a.choice).length;

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ORIGINAL_34.filter((r) => {
      if (cat && !r.categories.includes(cat as never)) return false;
      if (onlyUnreviewed && draft.original[String(r.n)]?.choice) return false;
      if (!needle) return true;
      return (
        String(r.n) === needle ||
        r.title.toLowerCase().includes(needle) ||
        r.source.toLowerCase().includes(needle) ||
        r.plain.toLowerCase().includes(needle) ||
        r.why.toLowerCase().includes(needle)
      );
    });
  }, [q, cat, onlyUnreviewed, draft.original]);

  return (
    <ReconveneShell title="The Original 34">
      <section className="rec-sec">
        <h2>The Original 34 — Ohio, 1848</h2>
        <p className="rec-lead">
          The numbered series as published in the proceedings. Source text is kept separate
          from the plain-language explanation, and archival notes mark the entries that were
          procedural, referred, disputed, or substantially a report.
        </p>
        <StandingNotice />
        <p className="rec-fine">
          Historical terminology is preserved inside the labelled source text. Version{" "}
          <code>{RECONVENE_VERSIONS.original}</code>.
        </p>
      </section>

      <div className="rec-toolbar">
        <Progress done={done} total={ORIGINAL_34.length} />
        <label className="sr-only" htmlFor="rec-q">
          Search the Original 34
        </label>
        <input
          id="rec-q"
          className="rec-input"
          type="search"
          placeholder="Search by number, title, or wording…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ marginTop: 10 }}
        />
        <Filters label={`Filter${cat ? ` · ${cat}` : ""}${onlyUnreviewed ? " · unreviewed" : ""}`}>
          <button
            type="button"
            className="rec-chip"
            aria-pressed={cat === null}
            onClick={() => setCat(null)}
          >
            All
          </button>
          {ORIGINAL_CATEGORIES.map((c) => (
            <button
              type="button"
              key={c}
              className="rec-chip"
              aria-pressed={cat === c}
              onClick={() => setCat(cat === c ? null : c)}
            >
              {c}
            </button>
          ))}
          <button
            type="button"
            className="rec-chip"
            aria-pressed={onlyUnreviewed}
            onClick={() => setOnlyUnreviewed((v) => !v)}
          >
            Unreviewed only
          </button>
        </Filters>
      </div>

      <p className="rec-fine" aria-live="polite" style={{ marginBottom: 12 }}>
        Showing {shown.length} of {ORIGINAL_34.length}.
      </p>

      <div className="rec-cards">
        {shown.map((r) => (
          <OriginalCard
            key={r.n}
            r={r}
            answer={answerOf("original", r.n)}
            onChange={(a) => setOriginal(r.n, a)}
          />
        ))}
        {shown.length === 0 && (
          <p className="rec-empty">Nothing matches those filters yet.</p>
        )}
      </div>

      <div className="rec-actions">
        <Link className="rec-btn" to={`${REC_BASE}/review-original`}>
          Review the Original 34 &rarr;
        </Link>
        <Link className="rec-btn ghost" to={`${REC_BASE}/proposed`}>
          Next: the Proposed New 34 &rarr;
        </Link>
        <Link className="rec-btn ghost" to={`${REC_BASE}/review`}>
          Go to the full ballot
        </Link>
      </div>
    </ReconveneShell>
  );
}
