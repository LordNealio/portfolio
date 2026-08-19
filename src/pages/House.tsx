import { useEffect } from "react";
import { Link } from "react-router-dom";
import { site, nil, philosophy } from "../data/site";
import { useReveal } from "../lib/useReveal";

// The House — a short brand / manifesto overview. The full archive-browsing
// experience (featured works, discipline lenses, the archive index) lives on
// /work; the idea and biography live on /about and /vision. This page is the
// distinct "house" moment: identity, the idea behind it, and a way to support it.
export function House() {
  useReveal([]);
  useEffect(() => {
    document.title = "The House — NIL · Just Neal";
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, []);

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
