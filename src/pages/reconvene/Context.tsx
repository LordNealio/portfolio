import { Link } from "react-router-dom";
import {
  CONTEXT,
  RECONVENE,
  SOURCES,
  TOTAL_ITEMS,
} from "../../data/reconvening34";
import {
  ReconveneShell,
  REC_BASE,
  Progress,
} from "../../components/reconvene/ReconveneShell";
import { useReconveneDraft } from "../../lib/useReconveneDraft";
import { reviewedCount } from "../../lib/reconveneDraft";

const TAG_LABEL: Record<string, string> = {
  record: "Record",
  interpretation: "Interpretation",
  "open-question": "Open question",
};

export function ReconveneContext() {
  const { draft } = useReconveneDraft();
  const done = reviewedCount(draft);

  return (
    <ReconveneShell title="Context">
      <section className="rec-sec">
        <h2>What this is</h2>
        <p className="rec-lead">
          In September 1848, a national convention of Black Americans met in Ohio and
          published thirty-four numbered resolutions. They planned to meet again in 1850. No
          surviving record confirms that meeting happened.
        </p>
        <p>
          This project does three things: it teaches the history, it preserves the
          thirty-four as they were actually published, and it offers a new thirty-four for
          2026 — as a <b>starting framework</b>, put up for review rather than announced as a
          conclusion.
        </p>
        <ol style={{ paddingLeft: "1.1rem" }}>
          {RECONVENE.purposes.map((p) => (
            <li key={p} style={{ marginBottom: 6, color: "var(--r-ink-2)" }}>
              {p}
            </li>
          ))}
        </ol>
      </section>

      {done > 0 && (
        <section className="rec-sec">
          <div className="rec-card">
            <h3>You have a review in progress</h3>
            <Progress done={done} total={TOTAL_ITEMS} />
            <div className="rec-actions">
              <Link className="rec-btn" to={`${REC_BASE}/review`}>
                Continue the review →
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="rec-sec">
        <h2>The history</h2>
        <p className="rec-fine">
          Each block below is labelled by what kind of claim it is.
        </p>
        {CONTEXT.map((b) => (
          <div className="rec-card" key={b.h} style={{ marginBottom: 12 }}>
            <div style={{ marginBottom: 8 }}>
              <span className={`rec-tag rec-tag--${b.kind}`}>{TAG_LABEL[b.kind]}</span>
            </div>
            <h3>{b.h}</h3>
            {b.body.map((p, i) => (
              <p key={i} style={{ margin: i === b.body.length - 1 ? 0 : undefined }}>
                {p}
              </p>
            ))}
          </div>
        ))}
      </section>

      <section className="rec-sec">
        <h2>Where to begin</h2>
        <p>{RECONVENE.beginThree}</p>
        <div className="rec-actions">
          <Link className="rec-btn" to={`${REC_BASE}/original`}>
            Study the Original 34 →
          </Link>
          <Link className="rec-btn ghost" to={`${REC_BASE}/proposed`}>
            Review the Proposed New 34
          </Link>
          <Link className="rec-btn ghost" to={`${REC_BASE}/review`}>
            Go straight to the ballot
          </Link>
        </div>
      </section>

      <section className="rec-sec">
        <h2>Primary sources</h2>
        <ul style={{ paddingLeft: "1.1rem", fontSize: "0.88rem" }}>
          <li style={{ marginBottom: 6 }}>
            <a href={SOURCES.proceedings} target="_blank" rel="noopener noreferrer">
              {SOURCES.proceedingsLabel} ↗
            </a>
          </li>
          <li>
            <a href={SOURCES.overview} target="_blank" rel="noopener noreferrer">
              {SOURCES.overviewLabel} ↗
            </a>
          </li>
        </ul>
        <p className="rec-fine">{RECONVENE.safety}</p>
      </section>
    </ReconveneShell>
  );
}
