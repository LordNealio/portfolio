import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StoryCarousel } from "../components/StoryCarousel";
import { R_MODULE, R_CAROUSEL } from "../data/reparationsModule";
import { useReveal } from "../lib/useReveal";

// Education module for "The R Word" (Reparations) study. A content-notice gate
// leads into a swipeable carousel of finished slides (presented as-is), then a
// CTA into the study. Mirrors the N-Word "Enigmatic Cipher" module's shell.
const KEY = "rword.module.v1.entered";
const read = (k: string, d = "") => {
  try {
    return localStorage.getItem(k) ?? d;
  } catch {
    return d;
  }
};
const write = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* ignore */
  }
};

export function RWordModule() {
  const [entered, setEntered] = useState(() => read(KEY) === "1");
  useReveal([entered]);

  useEffect(() => {
    document.title = "The Big Payback? — Reparations Education Module";
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, []);

  const enter = () => {
    setEntered(true);
    write(KEY, "1");
  };

  return (
    <Shell>
      {!entered ? (
        <div className="study-card cip-gate reveal">
          <p className="study-eyebrow">{R_MODULE.eyebrow}</p>
          <h1 className="study-h1">{R_MODULE.title}</h1>
          <p className="study-sub">{R_MODULE.subtitle}</p>
          <div className="cip-eq">
            <span className="cip-eq-label">Essential question</span>
            <p>{R_MODULE.essentialQuestion}</p>
          </div>
          <div className="cip-notice" role="note">
            <strong>Content notice.</strong> {R_MODULE.notice}
          </div>
          <button className="study-btn primary cip-enter" onClick={enter}>
            Enter the module →
          </button>
        </div>
      ) : (
        <>
          <StoryCarousel data={R_CAROUSEL} />

          <section className="cip-complete">
            <div className="cip-done">
              <p className="cip-done-h">A clue is not a conclusion.</p>
              <p className="study-fine">
                The module lays out the questions; the study measures what changes when the evidence is
                made visible. No responses are saved in this preview.
              </p>
              <div className="cip-done-actions">
                <Link to="/study/r-word" className="study-btn primary">
                  Take the study →
                </Link>
                <Link to="/study/r-word/34" className="study-btn ghost">
                  Reconvening the 34 →
                </Link>
                <Link to="/work/reparations" className="study-btn ghost">
                  Back to the project
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="section page-top study cipher">
      <div className="wrap study-wrap">
        <div className="cip-top reveal">
          <Link to="/study/r-word" className="cip-back">
            ← Back to the study
          </Link>
          <span className="cip-eyebrow">Education Module</span>
        </div>
        {children}
      </div>
    </section>
  );
}
