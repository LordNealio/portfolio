import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getExhibit } from "../data/exhibits";
import { useReveal } from "../lib/useReveal";
import { PlayerBar } from "../components/PlayerBar";

export function ExhibitPage() {
  const { id } = useParams();
  const exhibit = id ? getExhibit(id) : undefined;
  useReveal([id]);

  useEffect(() => {
    if (exhibit) document.title = `${exhibit.title} — NIL · Just Neal`;
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, [exhibit]);

  if (!exhibit) {
    return (
      <section className="section page-top">
        <div className="wrap">
          <h1 className="h1">Exhibit not found</h1>
          <Link to="/work" className="btn btn-ghost">
            ← Back to all work
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="exhibit">
      {/* Top bar */}
      <div className="wrap exhibit-top">
        <Link to={exhibit.parent.to} className="exhibit-back">
          ← {exhibit.parent.label}
        </Link>
        <span className="exhibit-kicker">{exhibit.eyebrow}</span>
      </div>

      {/* Cover */}
      <header className="exhibit-cover">
        <div className="wrap">
          <p className="exhibit-eyebrow reveal">{exhibit.eyebrow}</p>
          <h1 className="exhibit-title reveal">{exhibit.title}</h1>
          <p className="exhibit-sub reveal">{exhibit.subtitle}</p>
          <div className="exhibit-intro">
            {exhibit.intro.map((p, i) => (
              <p className="reveal" key={i}>
                {p}
              </p>
            ))}
          </div>
          <p className="exhibit-scroll reveal" aria-hidden="true">
            Scroll to open the file <span>↓</span>
          </p>
        </div>
      </header>

      {/* Slides — a seamless vertical scroll, like turning the pages of a file */}
      <div className="exhibit-slides">
        {exhibit.slides.map((s, i) => (
          <figure className="exhibit-slide" key={s.src}>
            <img
              src={s.src}
              alt={s.alt}
              width={1024}
              height={1536}
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
            />
          </figure>
        ))}
      </div>

      {/* Closing */}
      <footer className="exhibit-end">
        <div className="wrap">
          <p className="exhibit-eyebrow reveal">End of file</p>
          <p className="exhibit-end-line reveal">{exhibit.closing.line}</p>
          {exhibit.closing.note && <p className="exhibit-end-note reveal">{exhibit.closing.note}</p>}
          <Link to={exhibit.parent.to} className="btn btn-primary exhibit-end-cta reveal">
            Back to {exhibit.parent.label} <span className="arr">→</span>
          </Link>
        </div>
      </footer>

      {/* Soundtrack — a dismissible mini-player, if the exhibit has one */}
      {exhibit.audio && <PlayerBar trackUrl={exhibit.audio.url} label={exhibit.audio.label} />}
    </article>
  );
}
