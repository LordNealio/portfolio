import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  CIPHER,
  SLIDES,
  EVIDENCE_LEGEND,
  SYNTHESIS,
  REFLECTION,
  type EvCat,
} from "../data/cipher";
import { useReveal } from "../lib/useReveal";

// Education Module 01 — "The Enigmatic Cipher". A mobile-first, evidence-labeled
// carousel for the N-Word study, between the pre- and post-survey. Local-only
// storage (matches the study's preview / local-first approach — no backend).
const K = {
  entered: "cipher.v1.entered",
  slide: "cipher.v1.slide",
  reached: "cipher.v1.reachedEnd",
  reflect: "cipher.v1.reflections",
  done: "cipher.v1.complete",
};
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
// MindVault app (existing deployment) for "record your investigation".
const MINDVAULT_URL = "https://mindvault-app-zeta.vercel.app";

export function Cipher() {
  const [entered, setEntered] = useState(() => read(K.entered) === "1");
  const [i, setI] = useState(() => {
    const n = parseInt(read(K.slide, "0"), 10);
    return Number.isFinite(n) && n >= 0 && n < SLIDES.length ? n : 0;
  });
  const [reachedEnd, setReachedEnd] = useState(() => read(K.reached) === "1");
  const [completed, setCompleted] = useState(() => read(K.done) === "1");
  const [expanded, setExpanded] = useState(false);
  const [reflections, setReflections] = useState<Record<number, string>>(() => {
    try {
      return JSON.parse(read(K.reflect, "{}")) as Record<number, string>;
    } catch {
      return {};
    }
  });
  const [copied, setCopied] = useState(false);
  const touchX = useRef<number | null>(null);
  const total = SLIDES.length;
  const slide = SLIDES[i];

  useReveal([entered, i]);
  useEffect(() => {
    document.title = "The Enigmatic Cipher — Education Module 01";
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, []);

  // Persist position + record reaching the end.
  useEffect(() => {
    write(K.slide, String(i));
    if (i === total - 1 && !reachedEnd) {
      setReachedEnd(true);
      write(K.reached, "1");
    }
  }, [i, total, reachedEnd]);

  const go = useCallback(
    (d: number) => setI((x) => Math.min(Math.max(x + d, 0), total - 1)),
    [total]
  );

  // Keyboard nav while the module is entered.
  useEffect(() => {
    if (!entered) return;
    const onKey = (e: KeyboardEvent) => {
      if (expanded) {
        if (e.key === "Escape") setExpanded(false);
        return;
      }
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [entered, expanded, go]);

  const enter = () => {
    setEntered(true);
    write(K.entered, "1");
  };

  const setReflection = (idx: number, v: string) => {
    setReflections((r) => {
      const next = { ...r, [idx]: v };
      write(K.reflect, JSON.stringify(next));
      return next;
    });
  };

  const exportText = () =>
    `THE ENIGMATIC CIPHER — my reflections\n\n` +
    REFLECTION.map((q, idx) => `${idx + 1}. ${q}\n${(reflections[idx] || "").trim() || "—"}`).join("\n\n");

  const copyReflections = async () => {
    try {
      await navigator.clipboard.writeText(exportText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };
  const downloadReflections = () => {
    const blob = new Blob([exportText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enigmatic-cipher-reflections.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const markComplete = () => {
    setCompleted(true);
    write(K.done, "1");
  };

  const catClass = (c: EvCat) => `cip-chip cip-${c}`;

  // ── Content-notice gate ──────────────────────────────────────────────────
  if (!entered) {
    return (
      <Shell>
        <div className="study-card cip-gate reveal">
          <p className="study-eyebrow">{CIPHER.eyebrow}</p>
          <h1 className="study-h1">{CIPHER.title}</h1>
          <p className="study-sub">{CIPHER.subtitle}</p>
          <div className="cip-eq">
            <span className="cip-eq-label">Essential question</span>
            <p>{CIPHER.essentialQuestion}</p>
          </div>
          <div className="cip-notice" role="note">
            <strong>Content notice.</strong> {CIPHER.notice}
          </div>
          <details className="cip-objectives">
            <summary>Learning objectives</summary>
            <ul>
              {CIPHER.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </details>
          <button className="study-btn primary cip-enter" onClick={enter}>
            Enter the case file →
          </button>
        </div>
      </Shell>
    );
  }

  // ── Module ───────────────────────────────────────────────────────────────
  return (
    <Shell>
      {/* Evidence legend — persistent, unobtrusive */}
      <details className="cip-legend reveal">
        <summary>
          <span className="cip-legend-title">Evidence key</span>
          <span className="cip-legend-dots" aria-hidden="true">
            {EVIDENCE_LEGEND.map((l) => (
              <span key={l.cat} className={`cip-dot cip-${l.cat}`} />
            ))}
          </span>
        </summary>
        <ul>
          {EVIDENCE_LEGEND.map((l) => (
            <li key={l.cat}>
              <span className={`cip-chip cip-${l.cat}`}>{l.label}</span>
              <span className="cip-legend-note">{l.note}</span>
            </li>
          ))}
        </ul>
      </details>

      {/* Carousel */}
      <section
        className="cip-carousel"
        aria-roledescription="carousel"
        aria-label="The Enigmatic Cipher — slides"
      >
        <div
          className="cip-stage"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button className="cip-arrow left" onClick={() => go(-1)} disabled={i === 0} aria-label="Previous slide">
            ‹
          </button>
          <figure className="cip-figure" key={slide.id}>
            <button className="cip-imgbtn" onClick={() => setExpanded(true)} aria-label="Expand image for closer reading">
              <img
                className="cip-img"
                src={slide.src}
                alt={slide.alt}
                width={1080}
                height={1080}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="cip-expand" aria-hidden="true">⤢</span>
            </button>
          </figure>
          <button className="cip-arrow right" onClick={() => go(1)} disabled={i === total - 1} aria-label="Next slide">
            ›
          </button>
        </div>

        {/* Evidence labels under the slide */}
        <div className="cip-labels">
          {slide.labels.map((l) => (
            <span key={l.text} className={catClass(l.cat)}>
              {l.text}
            </span>
          ))}
        </div>

        {/* Counter + dots */}
        <div className="cip-nav">
          <span className="cip-count" aria-live="polite">
            {i + 1} of {total}
          </span>
          <div className="cip-dots" role="tablist" aria-label="Choose a slide">
            {SLIDES.map((s, n) => (
              <button
                key={s.id}
                className={`cip-navdot ${n === i ? "on" : ""}`}
                aria-label={`Slide ${n + 1}`}
                aria-current={n === i ? "true" : undefined}
                onClick={() => setI(n)}
              />
            ))}
          </div>
        </div>

        {/* Transcript + Evidence/Sources for the current slide */}
        <details className="cip-panel cip-transcript">
          <summary>Transcript</summary>
          <p>{slide.transcript}</p>
        </details>
        <details className="cip-panel cip-evidence">
          <summary>Evidence &amp; sources</summary>
          <dl>
            <dt>What the image claims</dt>
            <dd>{slide.evidence.claim}</dd>
            <dt>Classification</dt>
            <dd className="cip-evchips">
              {slide.labels.map((l) => (
                <span key={l.text} className={catClass(l.cat)}>
                  {l.text}
                </span>
              ))}
            </dd>
            <dt>Primary or secondary source</dt>
            <dd className={slide.evidence.source.startsWith("SOURCE NEEDED") ? "cip-todo" : ""}>
              {slide.evidence.source}
            </dd>
            <dt>What remains uncertain</dt>
            <dd>{slide.evidence.uncertain}</dd>
            <dt>Questions for further research</dt>
            <dd>{slide.evidence.questions}</dd>
          </dl>
        </details>
      </section>

      {/* Post-carousel synthesis */}
      <section className="cip-after">
        <h2 className="study-h2">After the case file</h2>
        <p className="study-fine">
          The research is not solved. Weigh what the record establishes against what remains open.
        </p>
        {SYNTHESIS.map((s) => (
          <details className="cip-panel" key={s.id}>
            <summary>{s.title}</summary>
            <ul>
              {s.body.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </details>
        ))}
      </section>

      {/* Private reflection */}
      <section className="cip-reflect">
        <h2 className="study-h2">Your reflection</h2>
        <p className="study-fine">
          Private and stored only on this device — no scoring, no profile. Copy or download it to keep it.
        </p>
        {REFLECTION.map((q, idx) => (
          <fieldset className="study-field" key={idx}>
            <legend>
              {idx + 1}. {q}
            </legend>
            <textarea
              className="study-input"
              rows={3}
              value={reflections[idx] || ""}
              onChange={(e) => setReflection(idx, e.target.value)}
            />
          </fieldset>
        ))}
        <div className="cip-reflect-actions">
          <button className="study-btn ghost" onClick={copyReflections}>
            {copied ? "Copied ✓" : "Copy my reflections"}
          </button>
          <button className="study-btn ghost" onClick={downloadReflections}>
            Download (.txt)
          </button>
        </div>
      </section>

      {/* Completion */}
      <section className="cip-complete">
        {!completed ? (
          <>
            <button className="study-btn primary" onClick={markComplete} disabled={!reachedEnd}>
              Mark module complete
            </button>
            {!reachedEnd && (
              <p className="study-fine">Reach the final slide to complete the module.</p>
            )}
          </>
        ) : (
          <div className="cip-done">
            <p className="cip-done-h">Module complete.</p>
            <p className="study-fine">Continue the study, or keep investigating in your own tools.</p>
            <div className="cip-done-actions">
              <Link to="/study/n-word" className="study-btn primary">
                Continue to the post-survey →
              </Link>
              <a className="study-btn ghost" href={MINDVAULT_URL} target="_blank" rel="noreferrer">
                Record your investigation in MindVault ↗
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Expand lightbox */}
      {expanded &&
        createPortal(
          <div className="cip-lightbox" role="dialog" aria-modal="true" onClick={() => setExpanded(false)}>
            <button className="cip-lb-close" onClick={() => setExpanded(false)} aria-label="Close">
              ×
            </button>
            <img src={slide.src} alt={slide.alt} onClick={(e) => e.stopPropagation()} />
          </div>,
          document.body
        )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="section page-top study cipher">
      <div className="wrap study-wrap">
        <div className="cip-top reveal">
          <Link to="/study/n-word" className="cip-back">
            ← Back to the study
          </Link>
          <span className="cip-eyebrow">Education Module 01</span>
        </div>
        {children}
      </div>
    </section>
  );
}
