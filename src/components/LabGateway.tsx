import { useState } from "react";
import { Link } from "react-router-dom";
import { chaptersOf, kindOf } from "../data/projects";
import type { Project } from "../data/projects";
import { useReveal } from "../lib/useReveal";

// The three organizing pillars (the nonprofit's philosophy), with descriptions.
const PILLARS: { name: string; desc: string }[] = [
  {
    name: "Navigating Ignorance",
    desc: "Uncovering hidden information, challenging inherited assumptions, and investigating overlooked connections.",
  },
  {
    name: "Gaining Glory",
    desc: "Restoring identity, knowledge, capability, family memory, and community power.",
  },
  {
    name: "Especially Reparations",
    desc: "Documenting losses, identifying responsibility, calculating impact, and developing practical forms of repair.",
  },
];

// Secondary format labels shown on each card (STUDY · APP · THEORY · MEDIA · …).
const LAB_FORMAT: Record<string, string> = {
  "the-n-word": "STUDY",
  reparations: "STUDY",
  "charm-quark-big-ben": "THEORY",
  "i-am-or-22": "THEORY",
  "blueface-salmon-p-chase": "RESEARCH",
  "arizona-ponderer": "MEDIA",
  legacybridge: "APP",
  emanual: "APP",
  "nonprofit-builder": "APP",
  covenant: "APP",
  "nous-innovation-labs": "NONPROFIT",
  "reading-list": "READING",
};
const formatOf = (p: Project) => LAB_FORMAT[p.slug] || kindOf(p).toUpperCase();

/**
 * The Lab — a gateway over its chapters, organized by the nonprofit's three
 * pillars. The pillars are the navigation; format is a small label on each card.
 * Every work keeps its own full page; this is the curated entry point.
 */
export function LabGateway({ project }: { project: Project }) {
  const works = chaptersOf(project.slug);
  const [pillar, setPillar] = useState<string>("All");
  useReveal([pillar]);

  const shown = PILLARS.filter((p) => pillar === "All" || p.name === pillar);

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
            <p className="lab-tagline">NAVIGATE • GAIN • REPAIR</p>
            <p className="lead lab-desc">{project.summary}</p>
          </header>

          <div className="lab-filters reveal" role="tablist" aria-label="Filter by pillar">
            {["All", ...PILLARS.map((p) => p.name)].map((name) => (
              <button
                key={name}
                role="tab"
                aria-selected={pillar === name}
                className={`ed-filter ${pillar === name ? "on" : ""}`}
                onClick={() => setPillar(name)}
              >
                {name}
              </button>
            ))}
          </div>

          {shown.map(({ name, desc }) => {
            const list = works.filter((p) => (p.pillars || []).includes(name));
            if (list.length === 0) return null;
            return (
              <section className="lab-pillar" key={name}>
                <h2 className="group-head reveal">{name}</h2>
                <p className="lab-pillar-desc reveal">{desc}</p>
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
                      {(p.pillars || []).length > 1 && (
                        <div className="lab-tags">
                          {(p.pillars || [])
                            .filter((t) => t !== name)
                            .map((t) => (
                              <span className="lab-tag" key={t}>
                                also: {t}
                              </span>
                            ))}
                        </div>
                      )}
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
