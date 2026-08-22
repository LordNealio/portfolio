import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getExhibit, ExhibitSlide } from "../data/exhibits";
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

      {/* Slides — a click-through carousel, or a seamless vertical scroll */}
      {exhibit.mode === "carousel" ? (
        <ExhibitCarousel slides={exhibit.slides} />
      ) : (
        <div className="exhibit-slides">
          {exhibit.slides.map((s, i) =>
            s.custom === "etymology" ? (
              <EtymologySlide key={`custom-${i}`} />
            ) : (
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
            )
          )}
        </div>
      )}

      {/* Coda — a closing montage */}
      {exhibit.coda && (
        <section className="exhibit-coda">
          <div className="wrap">
            <p className="exhibit-eyebrow reveal">{exhibit.coda.eyebrow}</p>
            <h2 className="exhibit-coda-title reveal">{exhibit.coda.title}</h2>
            <p className="exhibit-coda-lead reveal">{exhibit.coda.lead}</p>
            <div className="exhibit-coda-frame reveal">
              <iframe
                src={exhibit.coda.embed}
                title={`${exhibit.title} — coda`}
                allow="fullscreen; encrypted-media"
                allowFullScreen
                loading="lazy"
              />
            </div>
            {exhibit.coda.note && <p className="exhibit-coda-note reveal">{exhibit.coda.note}</p>}
          </div>
        </section>
      )}

      {/* Closing */}
      <footer className="exhibit-end">
        <div className="wrap">
          <p className="exhibit-eyebrow reveal">End of file</p>
          <p className="exhibit-end-line reveal">{exhibit.closing.line}</p>
          {exhibit.closing.note && <p className="exhibit-end-note reveal">{exhibit.closing.note}</p>}
          {exhibit.sources && exhibit.sources.length > 0 && (
            <div className="exhibit-sources reveal">
              <p className="exhibit-eyebrow">Sources</p>
              <ul className="exhibit-sources-list">
                {exhibit.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer noopener">
                      {s.label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
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

// A click-through carousel of the case-file slides (one at a time), for exhibits
// with mode: "carousel". Prev/next, dots, counter, keyboard arrows, touch-swipe.
function ExhibitCarousel({ slides }: { slides: ExhibitSlide[] }) {
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);
  const len = slides.length;
  const idx = len ? ((i % len) + len) % len : 0;
  const go = (d: number) => setI((x) => x + d);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [len]);

  const cur = slides[idx];
  return (
    <div className="exhibit-carousel">
      <div
        className="exhibit-carousel-stage"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <button className="exhibit-carousel-arrow left" onClick={() => go(-1)} aria-label="Previous slide">
          ‹
        </button>
        <div className="exhibit-carousel-frame">
          {cur.custom === "etymology" ? (
            <EtymologySlide />
          ) : (
            <img src={cur.src} alt={cur.alt} width={1024} height={1536} decoding="async" />
          )}
        </div>
        <button className="exhibit-carousel-arrow right" onClick={() => go(1)} aria-label="Next slide">
          ›
        </button>
      </div>
      <div className="exhibit-carousel-foot">
        <span className="exhibit-carousel-count">
          {String(idx + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
        </span>
        <div className="exhibit-carousel-dots">
          {slides.map((_, n) => (
            <button
              key={n}
              className={`exhibit-carousel-dot ${n === idx ? "on" : ""}`}
              onClick={() => setI(n)}
              aria-label={`Go to slide ${n + 1}`}
              aria-current={n === idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Slide 06 — rebuilt from A6a in the ENIGMA portrait style (black / red / cream)
// so it flows with the rest of the file. The four-people photo block is lifted
// from the source as an "evidence clipping"; the argument is set as type.
function EtymologySlide() {
  return (
    <section className="exhibit-slide ety" aria-label="Slide 6 — Etymology & Identity">
      <div className="ety-head">
        <span className="ety-num">06</span>
        <span className="ety-enigma">ENIGMA</span>
      </div>
      <h2 className="ety-title">
        Etymology &amp; <span className="ety-red">Identity</span>
      </h2>
      <p className="ety-sub">One slur crossed many native lands.</p>

      <figure className="ety-evidence">
        <img
          src="/art/exhibits/christie-dmx/a06-evidence.jpg"
          alt="Four peoples the slur was historically applied to: Indigenous Negrito peoples (Philippines), the Garifuna (Central America), ODB / Shinnecock (United States), and King Kamehameha I / Native Hawaiian (Hawaii)."
          width={1140}
          height={540}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <p className="ety-line">If “nigger” was historically used to mean “a dark-skinned native,”</p>
      <p className="ety-line ety-red">
        what does it mean that the word became most deeply anchored in the United States?
      </p>
      <p className="ety-line">
        What might that reveal about the history of land, race, and identity in America?
      </p>

      <div className="ety-foot">
        <span>06 / 10</span>
        <span>Follow the word →</span>
      </div>
    </section>
  );
}
