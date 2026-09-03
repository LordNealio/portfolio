import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ORIGINAL_34,
  PROPOSED_34,
  RECONVENE,
  sectionOf,
} from "../../data/reconvening34";
import {
  ReconveneShell,
  REC_BASE,
} from "../../components/reconvene/ReconveneShell";
import { OriginalCard, ProposedCard } from "../../components/reconvene/ResolutionCard";
import { useReconveneDraft } from "../../lib/useReconveneDraft";

// Compare moves between related old and new ideas. The layout is side-by-side on
// desktop and stacked on mobile via CSS grid — one DOM order, so keyboard and
// screen-reader users get the same sequence at every width.

export function ReconveneCompare() {
  const { setOriginal, setProposed, answerOf } = useReconveneDraft();
  const [n, setN] = useState(1);

  const proposal = PROPOSED_34.find((r) => r.n === n)!;
  const related = proposal.related
    .map((x) => ORIGINAL_34.find((r) => r.n === x))
    .filter((r): r is (typeof ORIGINAL_34)[number] => !!r);
  const section = sectionOf(proposal.n);

  return (
    <ReconveneShell title="Compare">
      <section className="rec-sec">
        <h2>Compare</h2>
        <p className="rec-lead">
          Pick a proposal to see the 1848 resolutions that touch the same theme. You can
          record your review from either side.
        </p>
        <p className="rec-legend">
          <b>Legend.</b> {RECONVENE.relatedLegend}
        </p>

        <label className="rec-label" htmlFor="rec-cmp">
          Choose a proposal
        </label>
        <div className="rec-picker" id="rec-cmp" role="group" aria-label="Choose a proposal to compare">
          {PROPOSED_34.map((r) => (
            <button
              type="button"
              key={r.n}
              className="rec-pick"
              aria-pressed={n === r.n}
              aria-label={`Proposal ${r.n}: ${r.title}`}
              onClick={() => setN(r.n)}
            >
              {r.n}
            </button>
          ))}
        </div>
        <p className="rec-fine" aria-live="polite">
          Showing Proposal {proposal.n} — {proposal.title}
          {section ? ` (Section ${section.numeral}, ${section.title})` : ""}, beside{" "}
          {related.length} related historical {related.length === 1 ? "entry" : "entries"}.
        </p>
      </section>

      <div className="rec-compare">
        <div className="rec-compare-col">
          <h3>The Original 34 — 1848</h3>
          <div className="rec-cards">
            {related.map((r) => (
              <OriginalCard
                key={r.n}
                r={r}
                answer={answerOf("original", r.n)}
                onChange={(a) => setOriginal(r.n, a)}
              />
            ))}
            {related.length === 0 && (
              <p className="rec-empty">
                No 1848 entry is marked as touching this theme. That may itself be worth
                saying on the ballot.
              </p>
            )}
          </div>
        </div>

        <div className="rec-compare-col">
          <h3>The Proposed New 34 — 2026</h3>
          <div className="rec-cards">
            <ProposedCard
              r={proposal}
              relatedTitles={related.map((r) => ({ n: r.n, title: r.title }))}
              answer={answerOf("proposed", proposal.n)}
              onChange={(a) => setProposed(proposal.n, a)}
            />
          </div>
        </div>
      </div>

      <div className="rec-actions">
        <button
          type="button"
          className="rec-btn ghost"
          onClick={() => setN((v) => (v > 1 ? v - 1 : PROPOSED_34.length))}
        >
          ← Previous
        </button>
        <button
          type="button"
          className="rec-btn ghost"
          onClick={() => setN((v) => (v < PROPOSED_34.length ? v + 1 : 1))}
        >
          Next →
        </button>
        <Link className="rec-btn" to={`${REC_BASE}/review`}>
          Go to the ballot
        </Link>
      </div>
    </ReconveneShell>
  );
}
