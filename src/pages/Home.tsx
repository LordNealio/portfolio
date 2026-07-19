import { Link } from "react-router-dom";
import { site, nil, philosophy } from "../data/site";
import { projects } from "../data/projects";
import { ArchiveList } from "../components/ArchiveList";
import { useReveal } from "../lib/useReveal";

export function Home() {
  useReveal([]);

  return (
    <>
      {/* ── HERO ── */}
      <section className="nil-hero">
        <div className="wrap nil-hero-inner">
          <div className="nil-hero-text">
            <p className="eyebrow reveal">Name · Image · Likeness</p>
            <h1 className="nil-word reveal">NIL</h1>
            <p className="nil-name reveal">Just Neal</p>
            <p className="nil-nil reveal serif-i">Name. Image. Likeness.</p>
            <p className="nil-roles reveal">Creative Director — Builder — Storyteller</p>
            <p className="lead nil-tag reveal">{site.tagline}</p>
            <div className="hero-cta reveal">
              <Link to="/work" className="btn btn-primary">
                Explore the Archive <span className="arr">→</span>
              </Link>
              <Link to="/store" className="btn btn-ghost">
                Enter the Store
              </Link>
            </div>
          </div>
          <div className="nil-hero-art reveal">
            <img
              src="/cloud-figure.svg"
              alt="The cloud figure — Neal, robed in white with the G vest"
            />
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>Enter</span>
          <span className="hero-scroll-line" />
        </div>
      </section>

      {/* ── THE IDEA ── */}
      <section className="section nil-idea">
        <div className="wrap">
          <header className="section-head reveal">
            <p className="eyebrow">The idea</p>
            <h2 className="h1">{philosophy.heading}</h2>
            <p className="lead">{philosophy.body}</p>
          </header>
          <div className="nil-meaning">
            {nil.meaning.map((m) => (
              <div className="nil-meaning-item reveal" key={m.term}>
                <h3 className="nil-meaning-term">{m.term}</h3>
                <p className="muted">{m.body}</p>
              </div>
            ))}
          </div>
          <p className="nil-scripture reveal">
            {nil.scriptures.map((s) => s.ref).join("  ·  ")}
          </p>
        </div>
      </section>

      {/* ── THE ARCHIVE ── */}
      <section className="section" id="archive">
        <div className="wrap">
          <header className="section-head reveal">
            <p className="eyebrow">The Archive · {projects.length} works</p>
            <h2 className="h1">
              A body of work, <span className="serif-i">one room at a time.</span>
            </h2>
            <p className="lead">
              Fashion, AI, publishing, film, education, and research — held in a single house. Hover to
              glimpse a work; open it to enter.
            </p>
          </header>
          <ArchiveList />
        </div>
      </section>
    </>
  );
}
