import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { site, capabilities, philosophy } from "../data/site";
import { projects } from "../data/projects";
import { ProjectGrid } from "../components/ProjectGrid";
import { useReveal } from "../lib/useReveal";

const rotating = ["apps", "tools", "stories", "systems", "questions"];

export function Home() {
  useReveal([]);
  const [wi, setWi] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setWi((i) => (i + 1) % rotating.length), 2200);
    return () => clearInterval(id);
  }, []);

  const liveCount = projects.filter((p) => p.status === "live").length;

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="wrap hero-inner">
          <p className="eyebrow reveal">{site.title}</p>
          <h1 className="display hero-title reveal">
            I turn ideas into
            <br />
            <span className="hero-rotate">
              <span key={wi} className="serif-i gold">
                {rotating[wi]}
              </span>
            </span>
          </h1>
          <p className="lead hero-lead reveal">{site.tagline}</p>
          <div className="hero-cta reveal">
            <Link to="/work" className="btn btn-primary">
              Explore the work <span className="arr">→</span>
            </Link>
            <Link to="/about" className="btn btn-ghost">
              The story
            </Link>
          </div>
          <dl className="hero-stats reveal">
            <div>
              <dt className="h3">{projects.length}</dt>
              <dd className="muted">projects built</dd>
            </div>
            <div>
              <dt className="h3">{liveCount}</dt>
              <dd className="muted">live apps</dd>
            </div>
            <div>
              <dt className="h3">$20MM</dt>
              <dd className="muted">P&amp;L directed in finance</dd>
            </div>
            <div>
              <dt className="h3">1</dt>
              <dd className="muted">connecting idea</dd>
            </div>
          </dl>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <span className="hero-scroll-line" />
        </div>
      </section>

      {/* ── THE WORK — grid of everything ── */}
      <section className="section" id="selected">
        <div className="wrap">
          <header className="section-head reveal">
            <p className="eyebrow">The work · {projects.length} projects</p>
            <h2 className="h1">
              Everything I've built, <span className="serif-i">in one view.</span>
            </h2>
            <p className="lead">
              Journaling apps, an oral-history platform, a festival concept, a life-skills guide —
              different doorways into the same question. Filter by status; each tile is honestly
              labeled.
            </p>
          </header>

          <ProjectGrid />

          <div className="section-more reveal">
            <Link to="/vision" className="btn btn-ghost">
              See how it all connects <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── VISION / THESIS ── */}
      <section className="section vision-teaser">
        <div className="wrap vision-inner">
          <p className="eyebrow reveal">The connecting idea</p>
          <h2 className="h1 reveal">{philosophy.heading}</h2>
          <p className="vision-body reveal">{philosophy.body}</p>
          <Link to="/vision" className="btn btn-ghost reveal">
            How it all connects <span className="arr">→</span>
          </Link>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="section">
        <div className="wrap">
          <header className="section-head reveal">
            <p className="eyebrow">What I do</p>
            <h2 className="h1">Not only a developer.</h2>
            <p className="lead">
              I originate concepts, define products, direct the creative vision, design systems, and
              use AI-assisted development to turn ideas into working prototypes.
            </p>
          </header>
          <div className="cap-grid">
            {capabilities.map((c, i) => (
              <div className="cap reveal" key={c.title}>
                <span className="cap-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="cap-title">{c.title}</h3>
                <p className="muted cap-body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
