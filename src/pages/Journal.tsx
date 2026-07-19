import { Link } from "react-router-dom";
import { nil } from "../data/site";
import { projects, projectDisciplines } from "../data/projects";
import { useReveal } from "../lib/useReveal";

// The Journal — Are.na meets a print magazine. Essays, research, and thinking.
// Seeded from the Publishing / Research / Culture works in the archive.
export function Journal() {
  useReveal([]);
  const entries = projects.filter((p) =>
    projectDisciplines(p).some((d) => d === "Publishing" || d === "Research" || d === "Culture")
  );

  return (
    <section className="section page-top">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">The Journal</p>
          <h1 className="h1">
            Thinking, <span className="serif-i">in the open.</span>
          </h1>
          <p className="lead">
            Essays, research, scripture, design, culture, and the ideas underneath the work — a
            reading room for the house. Full pieces are being written; these are the threads.
          </p>
        </header>

        <blockquote className="journal-verse reveal">
          <p className="h3 serif-i">"{nil.statement}"</p>
          <cite>{nil.scriptures.map((s) => `${s.ref}`).join("  ·  ")}</cite>
        </blockquote>

        <ol className="journal-list">
          {entries.map((e, i) => (
            <li className="reveal" key={e.slug}>
              <Link to={`/work/${e.slug}`} className="journal-item">
                <span className="journal-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="journal-main">
                  <span className="journal-title">{e.title}</span>
                  <span className="muted journal-sub">{e.subtitle}</span>
                </span>
                <span className="journal-disc">{projectDisciplines(e).join(" · ")}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
