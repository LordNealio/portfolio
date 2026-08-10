import { useState } from "react";
import { Link } from "react-router-dom";
import { chaptersOf, kindOf } from "../data/projects";
import type { Project } from "../data/projects";
import { useReveal } from "../lib/useReveal";

const PILLARS = ["Navigating Ignorance", "Gaining Glory", "Reparations"];
const FORMATS = ["ALL", "RESEARCH", "MEDIA", "APPS"] as const;
type Format = (typeof FORMATS)[number];

// Map a work's kind to the lab's format buckets.
function formatOf(p: Project): Exclude<Format, "ALL"> {
  const k = kindOf(p);
  return k === "App" ? "APPS" : k === "Media" ? "MEDIA" : "RESEARCH";
}

/**
 * The Lab — a gateway over its chapters (research, media, apps), organized by
 * thematic pillar with an ALL·RESEARCH·MEDIA·APPS filter. Each work keeps its
 * own full page; this is the curated entry point.
 */
export function LabGateway({ project }: { project: Project }) {
  const works = chaptersOf(project.slug);
  const [filter, setFilter] = useState<Format>("ALL");
  useReveal([filter]);

  const match = (p: Project) => filter === "ALL" || formatOf(p) === filter;

  return (
    <article className="detail lab">
      <section className="section page-top">
        <div className="wrap">
          <Link to="/work" className="back-link reveal">
            ← All work
          </Link>

          <header className="lab-hero reveal">
            <p className="eyebrow">{project.subtitle}</p>
            <h1 className="display lab-title">{project.title}</h1>
            <p className="lab-tagline">RESEARCH • MEDIA • APPS</p>
            <p className="lead lab-desc">{project.summary}</p>
          </header>

          <div className="lab-filters reveal" role="tablist" aria-label="Filter by format">
            {FORMATS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={`ed-filter ${filter === f ? "on" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {PILLARS.map((pillar) => {
            const list = works.filter((p) => (p.pillars || []).includes(pillar) && match(p));
            if (list.length === 0) return null;
            return (
              <section className="lab-pillar" key={pillar}>
                <h2 className="group-head reveal">{pillar}</h2>
                <div className="lab-grid">
                  {list.map((p) => (
                    <Link to={`/work/${p.slug}`} className="lab-card reveal" key={p.slug}>
                      <div className="lab-card-top">
                        <span className="lab-format">{formatOf(p)}</span>
                        {p.status === "live" && <i className="live-dot" title="Live" />}
                      </div>
                      <h3 className="lab-card-title">{p.title}</h3>
                      <p className="lab-card-sub">{p.subtitle}</p>
                      <p className="lab-card-summary">{p.summary}</p>
                      <div className="lab-tags">
                        {(p.pillars || []).map((t) => (
                          <span className="lab-tag" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="lab-card-go" aria-hidden="true">
                        Open →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </article>
  );
}
