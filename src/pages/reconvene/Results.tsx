import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ORIGINAL_34,
  ORIGINAL_OPTIONS,
  PROPOSED_34,
  PROPOSED_OPTIONS,
} from "../../data/reconvening34";
import {
  ReconveneShell,
  REC_BASE,
  StandingNotice,
} from "../../components/reconvene/ReconveneShell";
import { reconveneApi, type ResultsPayload } from "../../lib/reconveneApi";

// Aggregate results only. When no real data exists the page says so — it never
// invents counts, percentages, or testimonials.

type State = "loading" | "off" | "empty" | "error" | "ready";

export function ReconveneResults() {
  const [state, setState] = useState<State>(reconveneApi.enabled ? "loading" : "off");
  const [data, setData] = useState<ResultsPayload | null>(null);

  useEffect(() => {
    if (!reconveneApi.enabled) return;
    let alive = true;
    reconveneApi.results().then((r) => {
      if (!alive) return;
      if (!r) return setState("error");
      setData(r);
      setState(r.submissions > 0 ? "ready" : "empty");
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <ReconveneShell title="Results">
      <section className="rec-sec">
        <h2>Results &amp; accounting</h2>
        <p className="rec-lead">
          What the community has said so far. Counts only — no names, no contact details, no
          free-text comments.
        </p>
        <StandingNotice />
      </section>

      {state === "loading" && <p className="rec-fine">Loading the current tally…</p>}

      {state === "off" && (
        <div className="rec-empty">
          <h3>No results yet</h3>
          <p>
            Collection has not been switched on for this build, so there is nothing to
            report. When submissions open, aggregate counts will appear here — and only
            after real responses exist.
          </p>
          <Link className="rec-btn ghost" to={`${REC_BASE}/review`}>
            Review the 34 anyway
          </Link>
        </div>
      )}

      {state === "empty" && (
        <div className="rec-empty">
          <h3>No submissions yet</h3>
          <p>Collection is open, but no one has submitted a review so far. Be the first.</p>
          <Link className="rec-btn" to={`${REC_BASE}/review`}>
            Take the review →
          </Link>
        </div>
      )}

      {state === "error" && (
        <div className="rec-status rec-status--err" role="alert">
          <b>Could not load the results.</b> The tally is temporarily unavailable — nothing
          is wrong with your submission if you already sent one.
        </div>
      )}

      {state === "ready" && data && (
        <>
          <div className="rec-card" style={{ marginBottom: 18 }}>
            <h3>{data.submissions.toLocaleString()} reviews submitted</h3>
            <p className="rec-fine" style={{ margin: 0 }}>
              {data.additions.toLocaleString()} community contributions received. Recorded
              against <code>{data.originalVersion}</code> and <code>{data.proposedVersion}</code>
              . Last updated {new Date(data.generatedAt).toLocaleString()}.
            </p>
          </div>

          <h3 style={{ margin: "22px 0 10px" }}>The Original 34</h3>
          {ORIGINAL_34.map((r) => (
            <Tally
              key={r.n}
              n={r.n}
              title={r.title}
              options={ORIGINAL_OPTIONS}
              counts={data.original[String(r.n)] || {}}
            />
          ))}

          <h3 style={{ margin: "28px 0 10px" }}>The Proposed New 34</h3>
          {PROPOSED_34.map((r) => (
            <Tally
              key={r.n}
              n={r.n}
              title={r.title}
              options={PROPOSED_OPTIONS}
              counts={data.proposed[String(r.n)] || {}}
            />
          ))}
        </>
      )}
    </ReconveneShell>
  );
}

function Tally({
  n,
  title,
  options,
  counts,
}: {
  n: number;
  title: string;
  options: { value: string; label: string }[];
  counts: Record<string, number>;
}) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return (
    <div className="rec-card" style={{ marginBottom: 10 }}>
      <div className="rec-card-head">
        <span className="rec-num" aria-hidden="true">
          {n}
        </span>
        <h3>{title}</h3>
      </div>
      {total === 0 ? (
        <p className="rec-fine" style={{ margin: 0 }}>
          No responses on this entry yet.
        </p>
      ) : (
        <div className="rec-tally">
          {options.map((o) => {
            const v = counts[o.value] || 0;
            const pct = Math.round((v / total) * 100);
            return (
              <div className="rec-tally-row" key={o.value}>
                <div className="rec-tally-bar">
                  <div className="rec-tally-fill" style={{ width: `${pct}%` }} />
                  <span className="rec-tally-name">{o.label}</span>
                </div>
                <span className="rec-fine">
                  {v} · {pct}%
                </span>
              </div>
            );
          })}
          <p className="rec-fine" style={{ margin: "4px 0 0" }}>
            {total} {total === 1 ? "response" : "responses"} on this entry.
          </p>
        </div>
      )}
    </div>
  );
}
