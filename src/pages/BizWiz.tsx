import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { STEPS, type BizField, type BizStep } from "../data/bizwiz";

const CONTACT = "YoungBlesser88@gmail.com";
const KEY = "bizwiz.v1";

type Answers = Record<string, string | string[]>;

const read = (): { answers: Answers; index: number; done: boolean } => {
  try {
    return { answers: {}, index: 0, done: false, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return { answers: {}, index: 0, done: false };
  }
};

// Reflective prompts keyed to the user's top friction — clearly labelled as
// questions to explore, never as a diagnosis.
const FRICTION_PROMPT: Record<string, string> = {
  People: "Which role is doing two jobs — and which of the two is the real bottleneck?",
  Process: "Which step exists mostly because it always has?",
  Money: "Where does money leak between the value you create and the value you capture?",
  Technology: "What are you doing by hand that a system could do once and repeat?",
  Marketing: "Who already believes what you'd have to convince a stranger of?",
  Information: "What decision keeps waiting on a number nobody actually tracks?",
  Time: "What consumes the most hours for the least leverage?",
  Strategy: "If you could only win at one thing, which would make the rest easier?",
  Sales: "Where do interested people quietly go silent — and why there?",
  Operations: "What breaks first when volume doubles?",
};

export function BizWiz() {
  const saved = useMemo(read, []);
  const [answers, setAnswers] = useState<Answers>(saved.answers);
  const [index, setIndex] = useState(saved.index);
  const [done, setDone] = useState(saved.done);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "BizWiz — NIL · Just Neal";
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ answers, index, done }));
    } catch {
      /* ignore */
    }
  }, [answers, index, done]);

  const realSteps = STEPS.filter((s) => !s.interstitial);
  const step = STEPS[index];
  const realIndex = STEPS.slice(0, index + 1).filter((s) => !s.interstitial).length;
  const pct = done ? 100 : Math.round((realIndex / realSteps.length) * 100);

  const set = (id: string, v: string | string[]) => setAnswers((a) => ({ ...a, [id]: v }));
  const toggleMulti = (id: string, opt: string) =>
    setAnswers((a) => {
      const cur = (a[id] as string[]) || [];
      return { ...a, [id]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] };
    });

  const stepComplete = (s: BizStep) => {
    if (s.interstitial || s.optional || !s.fields) return true;
    const f = s.fields[0];
    const v = answers[f.id];
    if (f.kind === "multiselect") return Array.isArray(v) && v.length > 0;
    return typeof v === "string" ? v.trim().length > 0 : Array.isArray(v) ? v.length > 0 : false;
  };

  const next = () => {
    if (index < STEPS.length - 1) setIndex(index + 1);
    else setDone(true);
    window.scrollTo(0, 0);
  };
  const back = () => {
    if (done) setDone(false);
    else if (index > 0) setIndex(index - 1);
    window.scrollTo(0, 0);
  };
  const restart = () => {
    if (!confirm("Start over? This clears your saved answers on this device.")) return;
    setAnswers({});
    setIndex(0);
    setDone(false);
    window.scrollTo(0, 0);
  };

  // ── Field renderer ────────────────────────────────────────────────────────
  const renderField = (f: BizField) => {
    const label = "label" in f && f.label ? <label className="bw-label">{f.label}</label> : null;
    if (f.kind === "choice") {
      const v = answers[f.id];
      return (
        <div className="bw-field" key={f.id}>
          {label}
          <div className="bw-choices">
            {f.options.map((o) => (
              <button key={o} className={`bw-choice ${v === o ? "on" : ""}`} onClick={() => set(f.id, o)} aria-pressed={v === o}>
                {o}
              </button>
            ))}
          </div>
        </div>
      );
    }
    if (f.kind === "multiselect") {
      const v = (answers[f.id] as string[]) || [];
      return (
        <div className="bw-field" key={f.id}>
          {label}
          <div className="bw-choices">
            {f.options.map((o) => (
              <button key={o} className={`bw-choice ${v.includes(o) ? "on" : ""}`} onClick={() => toggleMulti(f.id, o)} aria-pressed={v.includes(o)}>
                {o}
              </button>
            ))}
          </div>
        </div>
      );
    }
    if (f.kind === "select") {
      const opts = f.fromMultiselect ? ((answers[f.fromMultiselect] as string[]) || []) : f.options || [];
      const v = answers[f.id];
      if (opts.length === 0)
        return (
          <div className="bw-field" key={f.id}>
            {label}
            <p className="bw-hint">Select above first.</p>
          </div>
        );
      return (
        <div className="bw-field" key={f.id}>
          {label}
          <div className="bw-choices">
            {opts.map((o) => (
              <button key={o} className={`bw-choice sm ${v === o ? "on" : ""}`} onClick={() => set(f.id, o)} aria-pressed={v === o}>
                {o}
              </button>
            ))}
          </div>
        </div>
      );
    }
    // text
    const v = (answers[f.id] as string) || "";
    return (
      <div className="bw-field" key={f.id}>
        {label}
        {f.multiline ? (
          <textarea className="bw-input" rows={4} placeholder={f.placeholder} value={v} onChange={(e) => set(f.id, e.target.value)} />
        ) : (
          <input className="bw-input" placeholder={f.placeholder} value={v} onChange={(e) => set(f.id, e.target.value)} />
        )}
      </div>
    );
  };

  // ── Results model ─────────────────────────────────────────────────────────
  const a = answers;
  const s = (id: string) => (typeof a[id] === "string" ? (a[id] as string).trim() : "");
  const arr = (id: string) => (a[id] as string[]) || [];
  const constraints = [
    a.stage ? `Stage: ${a.stage}` : "",
    s("revenue") ? `Revenue: ${s("revenue")}` : "",
    s("customers") ? `Customers: ${s("customers")}` : "",
    s("team") ? `Team: ${s("team")}` : "",
    s("systems") ? `Systems: ${s("systems")}` : "",
    s("rTime") ? `Losing time: ${s("rTime")}` : "",
    s("rMoney") ? `Losing money: ${s("rMoney")}` : "",
  ].filter(Boolean);
  const openQuestions = [
    s("unsure"),
    s("rDependency") && `Over-reliance: ${s("rDependency")}`,
    s("rRepeat") && `Repeated by hand: ${s("rRepeat")}`,
    s("rOneThing") && `Highest-leverage fix: ${s("rOneThing")}`,
  ].filter(Boolean) as string[];
  const topFriction = s("frictionTop") || arr("friction")[0] || "";
  const explore = FRICTION_PROMPT[topFriction];

  const sections: { h: string; lines: string[]; note?: string }[] = [
    { h: "Current state", lines: [s("what"), ...constraints].filter(Boolean) },
    { h: "Desired state", lines: [s("goal")].filter(Boolean) },
    { h: "Primary friction", lines: [topFriction && `Most important: ${topFriction}`, arr("friction").length ? arr("friction").join(" · ") : ""].filter(Boolean) },
    { h: "Known constraints", lines: constraints },
    { h: "Assumptions to test", lines: [s("belief") && `You believe: ${s("belief")}`, s("rAssumption") && `Would be wrong if: ${s("rAssumption")}`].filter(Boolean) as string[] },
    { h: "Possible questions to explore", lines: [...openQuestions, explore].filter(Boolean) as string[], note: "Prompts, not conclusions — starting points for a closer look." },
    { h: "What you've already tried", lines: [s("tried"), s("triedResult") && `Result: ${s("triedResult")}`].filter(Boolean) as string[] },
  ].filter((sec) => sec.lines.length > 0);

  const mapText =
    `MY BIZWIZ BUSINESS MAP\n${s("subject") ? "Subject: " + s("subject") + "\n" : ""}\n` +
    sections.map((sec) => `${sec.h.toUpperCase()}\n${sec.lines.map((l) => "· " + l).join("\n")}`).join("\n\n") +
    `\n\n— Mapped with BizWiz · YoungBlesser.com`;

  const mailto = (subject: string) =>
    `mailto:${CONTACT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mapText + "\n\n(You can also attach the printed PDF of this map.)")}`;

  const copyMap = async () => {
    try {
      await navigator.clipboard.writeText(mapText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <article className="bizwiz section page-top">
      <div className="wrap bw-wrap">
        <div className="bw-top no-print">
          <Link to="/work-with-me" className="bw-back-link">
            ← Work with me
          </Link>
          <span className="bw-kicker">BizWiz</span>
        </div>

        {!done ? (
          <>
            <div className="bw-progress no-print" aria-hidden="true">
              <div className="bw-progress-bar" style={{ width: `${pct}%` }} />
            </div>

            <section className="bw-step" key={step.id}>
              <p className="bw-step-n">{step.interstitial ? "" : `BizWiz / ${step.n}`}</p>
              <h1 className="bw-step-title">{step.title}</h1>
              {step.prompt && <p className="bw-step-prompt">{step.prompt}</p>}
              {step.fields && <div className="bw-fields">{step.fields.map(renderField)}</div>}

              <div className="bw-nav">
                <button className="bw-btn ghost" onClick={back} disabled={index === 0}>
                  Back
                </button>
                <button className="bw-btn primary" onClick={next} disabled={!stepComplete(step)}>
                  {index === STEPS.length - 1 ? "See my Business Map →" : step.optional ? "Continue" : "Continue →"}
                </button>
              </div>
              {step.optional && <p className="bw-skip-note">Optional — continue any time.</p>}
            </section>
          </>
        ) : (
          <section className="bw-results">
            <header className="bw-results-head">
              <p className="bw-step-n">Your Business Map</p>
              <h1 className="bw-step-title">
                Here's the problem, <span className="serif-i">mapped.</span>
              </h1>
              <p className="bw-step-prompt">Your own answers, organized. Save it, print it, or send it with a review request.</p>
            </header>

            <div className="bw-map">
              {sections.map((sec) => (
                <div className="bw-map-cell" key={sec.h}>
                  <h2 className="bw-map-h">{sec.h}</h2>
                  {sec.note && <p className="bw-map-note">{sec.note}</p>}
                  <ul className="bw-map-lines">
                    {sec.lines.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="bw-map-foot">Mapped with BizWiz · YoungBlesser.com</p>

            <div className="bw-actions no-print">
              <button className="bw-btn ghost" onClick={() => window.print()}>
                Save / Print (PDF)
              </button>
              <button className="bw-btn ghost" onClick={copyMap}>
                {copied ? "Copied ✓" : "Copy my map"}
              </button>
              <button className="bw-btn ghost" onClick={back}>
                Edit answers
              </button>
              <button className="bw-btn ghost" onClick={restart}>
                Start over
              </button>
            </div>

            <div className="bw-routes no-print">
              <p className="eyebrow">You've mapped the problem. Now let me look at it.</p>
              <div className="bw-routes-grid">
                <a className="bw-route" href={mailto("What Am I Missing? — $100 review (BizWiz map attached)")}>
                  <span className="bw-route-price">$100</span>
                  <span className="bw-route-name">What Am I Missing?</span>
                  <span className="bw-route-desc">Send me your map. I'll return what I see, what you may be missing, and what I'd do next.</span>
                  <span className="bw-route-go">Get my review →</span>
                </a>
                <a className="bw-route" href={mailto("Bring me the problem — $350 session (BizWiz map attached)")}>
                  <span className="bw-route-price">$350</span>
                  <span className="bw-route-name">Bring me the problem</span>
                  <span className="bw-route-desc">A 60-minute working session. I'll review your map beforehand so we skip the basics.</span>
                  <span className="bw-route-go">Book a session →</span>
                </a>
              </div>
              <Link to="/work-with-me" className="bw-route-more">
                See all the ways to work together →
              </Link>
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
