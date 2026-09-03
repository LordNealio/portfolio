import { Link } from "react-router-dom";
import { ASSEMBLY, ASSEMBLY_PURPOSE } from "../../data/reconveneAssembly";
import { PROPOSED_34 } from "../../data/reconvening34";
import {
  ReconveneShell,
  REC_BASE,
} from "../../components/reconvene/ReconveneShell";

const p30 = PROPOSED_34.find((r) => r.n === 30)!;

export function ReconveneAssembly() {
  const dated = ASSEMBLY.startsAt
    ? new Date(ASSEMBLY.startsAt).toLocaleString(undefined, {
        dateStyle: "full",
        timeStyle: "short",
      })
    : null;

  return (
    <ReconveneShell title="September 6 Assembly">
      <section className="rec-sec">
        <h2>The September 6 Assembly</h2>
        <p className="rec-lead">
          The convention met on September 6, 1848, planned to meet again, and — so far as the
          surviving record shows — did not. The assembly is the answer to that gap: a
          recurring digital reconvening on the same date, so continuity does not depend on
          anyone remembering to call a meeting.
        </p>
      </section>

      <section className="rec-sec">
        <div className="rec-card">
          <div className="rec-card-head">
            <span className="rec-num" aria-hidden="true">
              30
            </span>
            <h3>{p30.title}</h3>
          </div>
          <p className="rec-source">{p30.means}</p>
          <p className="rec-fine" style={{ marginTop: 10, marginBottom: 0 }}>
            {p30.why}
          </p>
        </div>
      </section>

      <section className="rec-sec">
        <h2>What happens there</h2>
        <ul style={{ paddingLeft: "1.1rem" }}>
          {ASSEMBLY_PURPOSE.map((x) => (
            <li key={x} style={{ marginBottom: 6, color: "var(--r-ink-2)" }}>
              {x}
            </li>
          ))}
        </ul>
      </section>

      <section className="rec-sec">
        <h2>Details</h2>
        {dated || ASSEMBLY.platform || ASSEMBLY.joinUrl || ASSEMBLY.registerUrl ? (
          <div className="rec-card">
            <dl style={{ margin: 0 }}>
              {dated && (
                <>
                  <dt className="rec-field-l">When</dt>
                  <dd style={{ margin: "0 0 12px" }}>
                    {dated}
                    {ASSEMBLY.timezone ? ` (${ASSEMBLY.timezone})` : ""}
                  </dd>
                </>
              )}
              {ASSEMBLY.platform && (
                <>
                  <dt className="rec-field-l">Where</dt>
                  <dd style={{ margin: "0 0 12px" }}>{ASSEMBLY.platform}</dd>
                </>
              )}
            </dl>
            {ASSEMBLY.agenda.length > 0 && (
              <>
                <span className="rec-field-l">Agenda</span>
                <ul style={{ paddingLeft: "1.1rem" }}>
                  {ASSEMBLY.agenda.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </>
            )}
            <div className="rec-actions">
              {ASSEMBLY.registerUrl && (
                <a
                  className="rec-btn"
                  href={ASSEMBLY.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register ↗
                </a>
              )}
              {ASSEMBLY.joinUrl && (
                <a
                  className="rec-btn ghost"
                  href={ASSEMBLY.joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join link ↗
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="rec-empty">
            <h3>Not yet announced</h3>
            <p>
              The date, platform and joining details have not been set. Rather than show a
              placeholder link that would not work, this page stays empty until the details
              are real.
            </p>
            <p className="rec-fine">
              To be told when they are: complete the review and tick the box asking for
              gathering details.
            </p>
            <Link className="rec-btn" to={`${REC_BASE}/review`}>
              Take the review →
            </Link>
          </div>
        )}
      </section>
    </ReconveneShell>
  );
}
