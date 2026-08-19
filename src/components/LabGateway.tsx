import { useState } from "react";
import { Link } from "react-router-dom";
import { chaptersOf, kindOf } from "../data/projects";
import type { Project } from "../data/projects";
import { useReveal } from "../lib/useReveal";
import { Cover } from "./Cover";

// The three organizing commitments (the nonprofit's philosophy), with copy.
const PILLARS: { name: string; body: string[]; motto: string; cta: string; triad?: string[] }[] = [
  {
    name: "Navigating Ignorance",
    body: [
      "Ignorance is not always a lack of intelligence. It can be produced by missing information, inherited assumptions, restricted access, erased history, misleading language, or questions that were never permitted to be asked.",
      "This work navigates ignorance by restoring context.",
      "It investigates how words acquire meaning, how identities are constructed, how institutions shape public understanding, and how accepted explanations change when overlooked evidence and perspectives are introduced.",
      "The goal is not to shame people for what they do not know. The goal is to make deeper understanding possible.",
    ],
    motto: "Find what is missing. Question what appears settled. Make the unknown navigable.",
    cta: "Explore the questions",
  },
  {
    name: "Gaining Glory",
    body: [
      "Glory is not celebrity, attention, or domination.",
      "It is the recovery of memory, dignity, knowledge, creativity, confidence, ownership, and the ability to imagine beyond what has been inherited or assigned.",
      "This work examines what people can regain when lost history is recovered, personal experience is taken seriously, cultural knowledge is preserved, and useful tools are placed within reach.",
      "Gaining glory means becoming more capable of understanding yourself, telling your story, building what you need, and passing something valuable forward.",
    ],
    motto: "Recover what was buried. Recognize what remains. Build from what is yours.",
    cta: "Discover the work",
  },
  {
    name: "Especially Reparations",
    body: [
      "Understanding is incomplete if it never asks what should be repaired.",
      "Reparations are not limited to a single payment or policy. Repair can involve money, land, ownership, access, preserved testimony, corrected records, education, institutional change, community infrastructure, and the restoration of opportunities that were deliberately denied.",
      "This work investigates both historical harm and its present-day consequences. It also develops practical ways to document loss, preserve legacy, test policy ideas, expand access, and build systems capable of carrying repair forward.",
      "Reparations are not simply the third category beside the other two. They are the direction the first two are meant to serve.",
    ],
    triad: [
      "We navigate ignorance so the harm can be understood.",
      "We gain glory so what was diminished can be restored.",
      "We emphasize reparations so understanding becomes action.",
    ],
    motto: "Study the harm. Name what was taken. Build toward repair.",
    cta: "Enter the reparations work",
  },
];

const WHAT_IS = [
  "The name holds absence and wholeness at the same time.",
  "The hole represents what has been erased, buried, fragmented, misunderstood, or lost.",
  "The whole represents what can begin to form when missing context is restored, separated ideas are brought back into relationship, and understanding is transformed into something useful.",
  "A Black wHole creates space for questions that do not fit neatly within one discipline. It brings histories, symbols, experiences, and fields of knowledge into contact to examine what their relationships might reveal.",
  "In that limited sense, it operates a little like a metaphysical CERN: ideas and disciplines are brought into contact instead of particles.",
  "A connection is not automatically proof. It is a signal — something to document, question, compare with evidence, and develop into public work when it holds up.",
];

const ONE_LAB = [
  "Navigating Ignorance, Gaining Glory, and Especially Reparations are overlapping commitments — not rigid filing categories.",
  "A single project may uncover missing history, restore cultural memory, and create a practical form of repair at the same time.",
  "The purpose of the lab is to hold those relationships together without confusing connection with proof, symbolism with evidence, or a promising prototype with a finished solution.",
];

const PRODUCES = [
  { h: "Studies", d: "Structured inquiries that distinguish observation, testimony, interpretation, hypothesis, and evidence." },
  { h: "Public Media", d: "Essays, educational carousels, visual stories, archives, and cultural analysis that make complex questions approachable." },
  { h: "Practical Tools", d: "Apps, surveys, guides, frameworks, and working prototypes that help people reflect, preserve, organize, participate, learn, and build." },
];
const PRODUCES_NOTE =
  "Every serious project identifies its question, sources, method, current status, limitations, and next step. The process remains visible so people can understand not only what was made, but how the work developed.";

const OPEN_LAB = [
  "A Black wHole is for curious people, researchers, educators, artists, technologists, archivists, community builders, funders, and critical readers.",
  "Review a study. Test a tool. Share a source. Challenge an interpretation. Preserve a story. Propose a collaboration. Help move an inquiry from private observation to public use.",
];

// Secondary format labels on each card (STUDY · APP · THEORY · MEDIA · …).
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

// Bold the standalone words "hole" / "whole" in the explainer.
function emphasizeWhole(text: string) {
  return text.split(/\b(whole|hole)\b/i).map((part, i) =>
    /^(whole|hole)$/i.test(part) ? (
      <strong className="bw-em" key={i}>
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function LabGateway({ project }: { project: Project }) {
  const works = chaptersOf(project.slug);
  const [pillar, setPillar] = useState<string>("All");
  useReveal([pillar]);

  const shown = PILLARS.filter((p) => pillar === "All" || p.name === pillar);

  return (
    <article className="detail lab blackwhole">
      <section className="section page-top">
        <div className="wrap">
          <Link to="/work" className="back-link reveal">
            ← All work
          </Link>

          {/* Hero */}
          <header className="lab-hero reveal">
            <p className="eyebrow">{project.subtitle}</p>
            <h1 className="display lab-title">
              A Black w<span className="bw-h">H</span>ole
            </h1>
            <ul className="bw-pillars-list">
              {PILLARS.map((p) => (
                <li key={p.name}>{p.name}</li>
              ))}
            </ul>
            <p className="lead lab-desc">{project.summary}</p>
            <div className="bw-cta-row">
              <a href="#bw-pillars" className="btn btn-primary">
                Enter the lab <span className="arr">↓</span>
              </a>
              <Link to="/work" className="btn btn-ghost">
                Explore the Archive
              </Link>
            </div>
          </header>

          {/* What is a Black wHole? */}
          <section className="bw-section reveal">
            <h2 className="h2">
              What is a Black w<span className="bw-h">H</span>ole?
            </h2>
            <div className="bw-prose">
              {WHAT_IS.map((p, i) => (
                <p key={i}>{emphasizeWhole(p)}</p>
              ))}
            </div>
          </section>

          {/* Featured education module */}
          <Link to="/study/n-word/cipher" className="bw-featured reveal">
            <div>
              <p className="bw-featured-eyebrow">Featured · Education Module 01</p>
              <p className="bw-featured-title">The Enigmatic Cipher</p>
              <p className="bw-featured-sub">
                An inquiry-based carousel on how words, titles, and classifications change over time.
              </p>
            </div>
            <span className="bw-featured-go">Open the case file →</span>
          </Link>

          {/* Pillar navigation */}
          <div className="lab-filters reveal" id="bw-pillars" role="tablist" aria-label="Filter by commitment">
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

          {/* Pillar sections */}
          {shown.map((info) => {
            const list = works.filter((p) => (p.pillars || []).includes(info.name));
            return (
              <section className="lab-pillar" key={info.name}>
                <h2 className="group-head reveal">{info.name}</h2>
                <div className="bw-prose lab-pillar-body reveal">
                  {info.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {info.triad && (
                    <div className="bw-triad">
                      {info.triad.map((l, i) => (
                        <p key={i}>{l}</p>
                      ))}
                    </div>
                  )}
                </div>
                <p className="bw-motto reveal">{info.motto}</p>
                {pillar === "All" && (
                  <button className="btn btn-ghost bw-pillar-cta reveal" onClick={() => setPillar(info.name)}>
                    {info.cta} <span className="arr">→</span>
                  </button>
                )}
                {list.length > 0 && (
                  <div className="lab-grid">
                    {list.map((p) => (
                      <Link to={`/work/${p.slug}`} className="lab-card reveal" key={p.slug}>
                        <div className="lab-card-media">
                          <Cover project={p} />
                        </div>
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
                              .filter((t) => t !== info.name)
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
                )}
              </section>
            );
          })}

          {/* One lab, three commitments */}
          <section className="bw-section reveal">
            <h2 className="h2">One Lab, Three Commitments</h2>
            <div className="bw-prose">
              {ONE_LAB.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* What the lab produces */}
          <section className="bw-section reveal">
            <h2 className="h2">What the Lab Produces</h2>
            <div className="bw-produces">
              {PRODUCES.map((it) => (
                <div className="bw-produce" key={it.h}>
                  <h3 className="bw-produce-h">{it.h}</h3>
                  <p className="bw-produce-d">{it.d}</p>
                </div>
              ))}
            </div>
            <p className="bw-produce-note">{PRODUCES_NOTE}</p>
          </section>

          {/* An open lab */}
          <section className="bw-section bw-open reveal">
            <p className="eyebrow">An Open Lab</p>
            <div className="bw-prose">
              {OPEN_LAB.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="bw-motto">Enter with a question. Leave with a different way of seeing.</p>
            <div className="bw-cta-row">
              <a href="#bw-pillars" className="btn btn-ghost" onClick={() => setPillar("All")}>
                View current inquiries
              </a>
              <Link to="/connect" className="btn btn-primary">
                Collaborate
              </Link>
            </div>
          </section>
        </div>
      </section>
    </article>
  );
}
