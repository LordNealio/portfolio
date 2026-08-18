import { Link } from "react-router-dom";

// The Archive Index — a typographic "annual report / exhibition catalog" device
// that communicates the SCALE of the body of work without a metrics dashboard.
// Counts are verified against the repository; unverifiable figures (individual
// merch, audio tracks, a feature documentary) are intentionally omitted until
// they're catalogued, rather than printed as false precision.
const INDEX: { n: string; label: string; note?: string }[] = [
  { n: "13", label: "Disciplines", note: "Publishing, music, film, software, design, research, investigations, social impact" },
  { n: "17", label: "Software prototypes", note: "Web-based apps, tools, and platforms" },
  { n: "05", label: "Research frameworks", note: "Original legal, scientific & linguistic studies" },
  { n: "08", label: "NIL — The Label collections", note: "A heritage clothing house" },
  { n: "02", label: "Short films", note: "GNX · Dear Ye / Mission Control" },
  { n: "01", label: "ENIGMA case-file exhibit", note: "An ongoing investigative library" },
];

export function ArchiveIndex() {
  return (
    <section className="section archive-index" aria-labelledby="archive-index-h">
      <div className="wrap">
        <div className="ai-head reveal">
          <p className="eyebrow">The Archive</p>
          <h2 className="h1" id="archive-index-h">
            A growing body of original work,
            <br />
            <span className="serif-i">across many disciplines.</span>
          </h2>
        </div>

        <ol className="ai-list">
          {INDEX.map((row) => (
            <li className="ai-row reveal" key={row.label}>
              <span className="ai-n">{row.n}</span>
              <span className="ai-label">{row.label}</span>
              {row.note && <span className="ai-note">{row.note}</span>}
            </li>
          ))}
          <li className="ai-row ai-row--more reveal">
            <span className="ai-n" aria-hidden="true">
              +
            </span>
            <span className="ai-label">Works in development</span>
            <span className="ai-note">The archive is still being written.</span>
          </li>
        </ol>

        <Link to="/work" className="btn btn-primary ai-cta reveal">
          Explore the Archive <span className="arr">→</span>
        </Link>
      </div>
    </section>
  );
}
