import { ORIGINAL_34, RECONVENE, RECONVENE_VERSIONS, SOURCES } from "../../data/reconvening34";
import { ReconveneShell } from "../../components/reconvene/ReconveneShell";

const noted = ORIGINAL_34.filter((r) => r.note);

export function ReconveneSources() {
  return (
    <ReconveneShell title="Sources & method">
      <section className="rec-sec">
        <h2>Sources &amp; method</h2>
        <p className="rec-lead">
          What comes from the 1848 proceedings, what is editorial interpretation, what is
          proposed in 2026, and what remains an open question.
        </p>
      </section>

      <section className="rec-sec">
        <h2>Primary sources</h2>
        <ul style={{ paddingLeft: "1.1rem" }}>
          <li style={{ marginBottom: 8 }}>
            <a href={SOURCES.proceedings} target="_blank" rel="noopener noreferrer">
              {SOURCES.proceedingsLabel} ↗
            </a>
            <br />
            <span className="rec-fine">
              The published proceedings of the National Convention of Colored Freemen,
              Cleveland, Ohio, September 6–8, 1848. Every entry in the Original 34 is drawn from
              here.
            </span>
          </li>
          <li>
            <a href={SOURCES.overview} target="_blank" rel="noopener noreferrer">
              {SOURCES.overviewLabel} ↗
            </a>
            <br />
            <span className="rec-fine">Supporting historical overview.</span>
          </li>
        </ul>
      </section>

      <section className="rec-sec">
        <h2>How each field is treated</h2>
        <div className="rec-card">
          <p className="rec-field">
            <span className="rec-field-l">1848 substance — source text</span>
            A faithful normalized presentation of the published resolution. Historical
            terminology is preserved rather than silently modernized, because altering it
            would alter the record. Normalization is limited to spelling, punctuation and
            sentence structure for readability.
          </p>
          <p className="rec-field">
            <span className="rec-field-l">In plain language</span>
            Editorial. A contemporary restatement written for this site. It is not the
            convention’s wording and carries no authority of its own.
          </p>
          <p className="rec-field">
            <span className="rec-field-l">Why it mattered in 1848</span>
            Editorial interpretation — an argument about historical significance, open to
            disagreement.
          </p>
          <p className="rec-field" style={{ marginBottom: 0 }}>
            <span className="rec-field-l">Archival note</span>
            Where the record itself is complicated — procedural entries, referred proposals,
            disputed language, reports carried as resolutions — the complication is stated
            rather than smoothed over.
          </p>
        </div>
      </section>

      <section className="rec-sec">
        <h2>The entries that are not simple policy planks</h2>
        <p>
          The 34 were not thirty-four identical adopted planks. These carry archival notes:
        </p>
        <div className="rec-cards">
          {noted.map((r) => (
            <div className="rec-card" key={r.n}>
              <div className="rec-card-head">
                <span className="rec-num" aria-hidden="true">
                  {r.n}
                </span>
                <h3>{r.title}</h3>
              </div>
              <p style={{ margin: 0 }} className="rec-fine">
                {r.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rec-sec">
        <h2>What is proposed rather than recorded</h2>
        <p>
          The Proposed New 34 are a 2026 starting framework written for this project. They
          are not historical, not adopted, and not endorsed by any organization.{" "}
          {RECONVENE.standing}
        </p>
        <p className="rec-legend">
          <b>On “related” entries.</b> {RECONVENE.relatedLegend}
        </p>
      </section>

      <section className="rec-sec">
        <h2>Open questions</h2>
        <ul style={{ paddingLeft: "1.1rem", color: "var(--r-ink-2)" }}>
          <li style={{ marginBottom: 8 }}>
            Whether the convention planned for 1850 ever met. No surviving record currently
            confirms it. The next documented national convention met at Rochester, New York,
            July 6–8, 1853.
          </li>
          <li style={{ marginBottom: 8 }}>
            Why the gap occurred. The Fugitive Slave Act of 1850, kidnapping danger,
            resistance work, migration to Canada, state-level organizing, travel and funding
            limits, and strategic divisions are all plausible contributors. This project
            asserts no single proven cause.
          </li>
          <li>
            The date coincidence in Kendrick Lamar’s “untitled 08 | 09.06.2014.” — the same
            month and day as the convention’s opening, 166 years later, on a song concerned
            with money, banks and shortcuts to success. This is the doorway that led to the
            research and an open interpretive question. No intentional reference is claimed,
            and none should be inferred.
          </li>
        </ul>
      </section>

      <section className="rec-sec">
        <h2>Versioning</h2>
        <p>
          Every submitted response records the version of the text it answered —{" "}
          <code>{RECONVENE_VERSIONS.original}</code> and{" "}
          <code>{RECONVENE_VERSIONS.proposed}</code>. When wording is revised the version id
          changes, so earlier votes are never silently re-attributed to text their authors
          never read.
        </p>
      </section>

      <section className="rec-sec">
        <h2>Privacy</h2>
        <p>
          Reviews can be completed and submitted with no contact details at all. Where
          contact details are given they are stored privately, never displayed in public
          results, and never sent to analytics. Only category and completion events are
          measured; free-text comments and contact information are not.
        </p>
        <p className="rec-fine">{RECONVENE.safety}</p>
      </section>
    </ReconveneShell>
  );
}
