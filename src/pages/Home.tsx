import { Link } from "react-router-dom";
import { site, nil, philosophy } from "../data/site";
import { projects } from "../data/projects";
import { ArchiveList } from "../components/ArchiveList";
import { ArchiveIndex } from "../components/ArchiveIndex";
import { useReveal } from "../lib/useReveal";

const paths = [
  { icon: "📖", label: "The Story", note: "Who Just Neal is — and why any of this exists.", to: "/about" },
  { icon: "📱", label: "The Apps", note: "MindVault, Mirror, and more — go try them.", to: "/work?d=Apps" },
  { icon: "🧠", label: "The Research", note: "I AM / 22, Charm Quark × Big Ben, and the patterns.", to: "/work?d=Research" },
  { icon: "👕", label: "The Fashion", note: "NIL — the house, its collections and crest.", to: "/store" },
  { icon: "🎵", label: "The Music", note: "RapGod, GNX, Dear Ye — the connections.", to: "/work?d=Music" },
  { icon: "🗂", label: "Everything", note: "Browse the full archive of works.", to: "/work" },
];

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

      {/* ── THE ARCHIVE INDEX (scale) ── */}
      <ArchiveIndex />

      {/* ── START HERE ── */}
      <section className="section start-here">
        <div className="wrap">
          <header className="section-head reveal">
            <p className="eyebrow">Start here</p>
            <h2 className="h1">
              There's no right way <span className="serif-i">to explore.</span>
            </h2>
            <p className="lead">
              This isn't asking you to believe every conclusion — it's an invitation to explore the
              observations, ask questions, and make your own connections. Read, browse, try, and
              decide what resonates.
            </p>
          </header>
          <div className="paths">
            {paths.map((p) => (
              <Link to={p.to} className="path-card reveal" key={p.label}>
                <span className="path-icon" aria-hidden="true">{p.icon}</span>
                <span className="path-label">{p.label}</span>
                <span className="path-note muted">{p.note}</span>
                <span className="path-go" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
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

      {/* ── iNeed$ BANNER ── */}
      <section className="ineed-banner reveal" aria-label="iNeed$ — modern patronage">
        <img className="ineed-banner-bg" src="/art/ineed-grill.jpg" alt="" aria-hidden="true" />
        <div className="ineed-banner-scrim" aria-hidden="true" />
        <div className="wrap ineed-banner-inner">
          <p className="eyebrow ineed-banner-eyebrow">Support the work</p>
          <h2 className="ineed-banner-title">iNeed$</h2>
          <p className="ineed-banner-sub">
            Modern patronage for independent ideas — great work often exists because someone believed in
            it first.
          </p>
          <Link to="/ineed" className="btn btn-primary btn-lg">
            Enter iNeed$ <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
