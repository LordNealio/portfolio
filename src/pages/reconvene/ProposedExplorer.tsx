import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ORIGINAL_34,
  PROPOSED_34,
  PROPOSED_SECTIONS,
  RECONVENE,
  RECONVENE_VERSIONS,
} from "../../data/reconvening34";
import {
  ReconveneShell,
  REC_BASE,
  Progress,
  StandingNotice,
} from "../../components/reconvene/ReconveneShell";
import { ProposedCard } from "../../components/reconvene/ResolutionCard";
import { useReconveneDraft } from "../../lib/useReconveneDraft";

const titleOf = (n: number) => ORIGINAL_34.find((r) => r.n === n)?.title ?? "";

export function ProposedExplorer() {
  const { draft, setProposed, answerOf } = useReconveneDraft();
  const [q, setQ] = useState("");
  const [sec, setSec] = useState<string | null>(null);
  const [onlyUnreviewed, setOnlyUnreviewed] = useState(false);

  const done = Object.values(draft.proposed).filter((a) => a.choice).length;

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PROPOSED_34.filter((r) => {
      if (sec && r.sectionId !== sec) return false;
      if (onlyUnreviewed && draft.proposed[String(r.n)]?.choice) return false;
      if (!needle) return true;
      return (
        String(r.n) === needle ||
        r.title.toLowerCase().includes(needle) ||
        r.means.toLowerCase().includes(needle) ||
        r.why.toLowerCase().includes(needle)
      );
    });
  }, [q, sec, onlyUnreviewed, draft.proposed]);

  return (
    <ReconveneShell title="The Proposed New 34">
      <section className="rec-sec">
        <h2>The Proposed New 34: 2026–2076</h2>
        <p className="rec-lead">
          A starting framework, offered for review. These have not been adopted and are not
          final. Your response is what decides which of them go forward.
        </p>
        <StandingNotice />
        <p className="rec-standing" style={{ borderLeftColor: "var(--r-navy)", background: "#f3f7fb" }}>
          <b>{RECONVENE.governing}</b>
          <br />
          {RECONVENE.beginThree}
        </p>
        <p className="rec-fine">
          Version <code>{RECONVENE_VERSIONS.proposed}</code>.
        </p>
      </section>

      <div className="rec-toolbar">
        <Progress done={done} total={PROPOSED_34.length} />
        <label className="sr-only" htmlFor="rec-pq">
          Search the Proposed New 34
        </label>
        <input
          id="rec-pq"
          className="rec-input"
          type="search"
          placeholder="Search by number, title, or wording…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ marginTop: 10 }}
        />
        <div className="rec-filters">
          <button
            type="button"
            className="rec-chip"
            aria-pressed={sec === null}
            onClick={() => setSec(null)}
          >
            All sections
          </button>
          {PROPOSED_SECTIONS.map((s) => (
            <button
              type="button"
              key={s.id}
              className="rec-chip"
              aria-pressed={sec === s.id}
              onClick={() => setSec(sec === s.id ? null : s.id)}
            >
              {s.numeral}. {s.title}
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
        </div>
      </div>

      <p className="rec-fine" aria-live="polite" style={{ marginBottom: 12 }}>
        Showing {shown.length} of {PROPOSED_34.length}.
      </p>

      {PROPOSED_SECTIONS.map((s) => {
        const items = shown.filter((r) => r.sectionId === s.id);
        if (items.length === 0) return null;
        return (
          <section key={s.id} aria-labelledby={`sec-${s.id}`}>
            <div className="rec-sechead">
              <span className="rec-kicker">Section {s.numeral}</span>
              <h2 id={`sec-${s.id}`}>{s.title}</h2>
            </div>
            <div className="rec-cards">
              {items.map((r) => (
                <ProposedCard
                  key={r.n}
                  r={r}
                  relatedTitles={r.related.map((n) => ({ n, title: titleOf(n) }))}
                  answer={answerOf("proposed", r.n)}
                  onChange={(a) => setProposed(r.n, a)}
                />
              ))}
            </div>
          </section>
        );
      })}

      {shown.length === 0 && <p className="rec-empty">Nothing matches those filters yet.</p>}

      <div className="rec-actions">
        <Link className="rec-btn" to={`${REC_BASE}/review`}>
          Go to the ballot →
        </Link>
        <Link className="rec-btn ghost" to={`${REC_BASE}/compare`}>
          Compare old and new
        </Link>
      </div>
    </ReconveneShell>
  );
}
