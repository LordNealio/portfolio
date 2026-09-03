import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "../data/study-reparations";
import { useReveal } from "../lib/useReveal";

// Preview-only reparations study ("The R Word"). Mirrors the N-Word preview
// experience but collects nothing: the code is generated locally and no
// responses leave the browser. A Phase 2 backend (its own study version +
// validation) and IRB review would be required before real enrollment.

const STEP_LABELS = [
  "Introduction",
  "Eligibility",
  "Consent",
  "Your code",
  "Background",
  "Before the module",
  "Educational module",
  "Knowledge check",
  "After the module",
  "Reflection",
  "Debriefing",
  "Volunteer",
];

function genCode() {
  const rnd =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID().replace(/-/g, "").slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return "RW-" + rnd.toUpperCase();
}

function Scale({
  name,
  labels,
  low,
  high,
  value,
  onChange,
}: {
  name: string;
  labels: string[];
  low: string;
  high: string;
  value?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="scale" role="radiogroup" aria-label={`${low} to ${high}`}>
      <span className="scale-end">{low}</span>
      <div className="scale-opts">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <label className={`scale-opt ${value === n ? "on" : ""}`} key={n} title={labels[n - 1] || `${n}`}>
            <input type="radio" name={name} value={n} checked={value === n} onChange={() => onChange(n)} />
            <span aria-hidden="true">{n}</span>
            <span className="sr-only">{labels[n - 1] || `${n}`}</span>
          </label>
        ))}
      </div>
      <span className="scale-end">{high}</span>
    </div>
  );
}

export function StudyReparations() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [ineligible, setIneligible] = useState(false);
  const [done, setDone] = useState(false);
  const [code] = useState(genCode);
  useReveal([step, done, ineligible]);

  const set = (id: string, v: unknown) => setAnswers((a) => ({ ...a, [id]: v }));
  const toggleMulti = (id: string, opt: string) =>
    setAnswers((a) => {
      const cur = (a[id] as string[]) || [];
      return { ...a, [id]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] };
    });

  const consentOK = S.consentCheckboxes.every((c) => answers[c.id]);
  const total = STEP_LABELS.length;
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "auto" });

  const next = () => {
    if (step === 1) {
      const ok = S.eligibility.every((e) => answers[e.id] === "Yes");
      if (!ok) {
        setIneligible(true);
        scrollTop();
        return;
      }
    }
    if (step === total - 1) {
      setDone(true);
      scrollTop();
      return;
    }
    setStep((s) => Math.min(s + 1, total - 1));
    scrollTop();
  };
  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    scrollTop();
  };
  const leave = () => {
    if (confirm("Leave the study? Your progress will not be saved.")) nav("/work/reparations");
  };

  if (ineligible) {
    return (
      <Shell>
        <div className="study-card reveal">
          <h1 className="study-h1">Thank you</h1>
          <p className="study-p">
            Based on your answers, this experience isn't a match right now. No research responses have
            been collected. You're welcome to close this page.
          </p>
          <Link to="/work/reparations" className="study-btn ghost">
            ← Back to the project
          </Link>
        </div>
      </Shell>
    );
  }
  if (done) {
    return (
      <Shell>
        <div className="study-card reveal">
          <p className="study-eyebrow">Completed</p>
          <h1 className="study-h1">Preview complete</h1>
          <p className="study-p">
            You've reached the end of the preview experience. Because formal enrollment is not open,{" "}
            <strong>none of your responses were saved</strong>. Thank you for helping test the module.
          </p>
          <Link to="/work/reparations" className="study-btn primary">
            ← Back to the project
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="study-progress reveal">
        <div className="study-progress-top">
          <span>
            Step {step + 1} of {total} · {STEP_LABELS[step]}
          </span>
          <span className="muted">≈ {S.STUDY_RW.estimatedMinutes} min total · Preview — not saved</span>
        </div>
        <div className="study-bar">
          <div className="study-bar-fill" style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
      </div>

      <div className="study-card">{renderStep()}</div>

      <div className="study-nav reveal">
        <div>
          {step > 0 && (
            <button className="study-btn ghost" onClick={back}>
              ← Back
            </button>
          )}
        </div>
        <button className="study-leave" onClick={leave}>
          Leave study
        </button>
        <div>
          <button className="study-btn primary" onClick={next} disabled={step === 2 && !consentOK}>
            {step === total - 1 ? "Finish" : "Continue →"}
          </button>
        </div>
      </div>
    </Shell>
  );

  function LikertItem({ id, i, text }: { id: string; i: number; text: string }) {
    return (
      <div className="study-item">
        <p className="study-item-q">
          {i + 1}. {text}
        </p>
        <Scale
          name={id}
          labels={S.LIKERT_7}
          low="Strongly disagree"
          high="Strongly agree"
          value={answers[id] as number}
          onChange={(v) => set(id, v)}
        />
      </div>
    );
  }

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <div className="reveal">
            <p className="study-eyebrow">Reparations & Perception Study</p>
            <h1 className="study-h1">{S.STUDY_RW.title}</h1>
            <p className="study-sub">{S.STUDY_RW.subtitle}</p>
            <p className="study-p">{S.STUDY_RW.intro}</p>
            <ul className="study-notices">
              {S.STUDY_RW.notices.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <p className="study-fine">
              The module presents each argument together with its limitations and counterarguments. You
              are not asked to reach any particular conclusion.
            </p>
            <p className="study-fine">
              A companion chapter, <Link to="/study/r-word/34">Reconvening the 34</Link>, studies the
              1848 Colored National Convention in Ohio and invites review of a proposed new
              thirty-four. It is community feedback rather than part of this study.
            </p>
          </div>
        );
      case 1:
        return (
          <div className="reveal">
            <h2 className="study-h2">Eligibility & content notice</h2>
            {S.eligibility.map((e) => (
              <fieldset className="study-field" key={e.id}>
                <legend>{e.q}</legend>
                <div className="yn">
                  {["Yes", "No"].map((o) => (
                    <label className={`chip ${answers[e.id] === o ? "on" : ""}`} key={o}>
                      <input type="radio" name={e.id} checked={answers[e.id] === o} onChange={() => set(e.id, o)} />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="reveal">
            <h2 className="study-h2">Informed consent</h2>
            <div className="consent-body">
              {S.consentSections.map((c) => (
                <div className="consent-sec" key={c.h}>
                  <h3>{c.h}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
            <div className="consent-checks">
              {S.consentCheckboxes.map((c) => (
                <label className="check" key={c.id}>
                  <input type="checkbox" checked={!!answers[c.id]} onChange={(e) => set(c.id, e.target.checked)} />
                  <span>{c.label}</span>
                </label>
              ))}
              <label className="check optional">
                <input
                  type="checkbox"
                  checked={!!answers[S.quotationConsent.id]}
                  onChange={(e) => set(S.quotationConsent.id, e.target.checked)}
                />
                <span>{S.quotationConsent.label}</span>
              </label>
            </div>
            {!consentOK && <p className="study-fine">All five required boxes must be checked to continue.</p>}
          </div>
        );
      case 3:
        return (
          <div className="reveal">
            <h2 className="study-h2">Your anonymous code</h2>
            <p className="study-p">
              This random code identifies your responses. It is not derived from your name, initials,
              birthday, email, or phone. Write it down if you'd like a record.
            </p>
            <div className="code-badge">{code}</div>
            <p className="study-fine">In this preview, the code is generated locally and nothing is stored.</p>
          </div>
        );
      case 4:
        return (
          <div className="reveal">
            <h2 className="study-h2">Background</h2>
            <p className="study-fine">Every question is optional and includes “Prefer not to answer.”</p>
            {S.backgroundQuestions.map((q) => (
              <fieldset className="study-field" key={q.id}>
                <legend>{q.q}</legend>
                {q.type === "text" ? (
                  <input className="study-input" value={(answers[q.id] as string) || ""} onChange={(e) => set(q.id, e.target.value)} />
                ) : (
                  <div className="chips">
                    {q.options!.map((o) => {
                      const selected =
                        q.type === "multi"
                          ? ((answers[q.id] as string[]) || []).includes(o.id)
                          : answers[q.id] === o.id;
                      return (
                        <label className={`chip ${selected ? "on" : ""}`} key={o.id}>
                          <input
                            type={q.type === "multi" ? "checkbox" : "radio"}
                            name={q.id}
                            checked={selected}
                            onChange={() => (q.type === "multi" ? toggleMulti(q.id, o.id) : set(q.id, o.id))}
                          />
                          {o.label}
                        </label>
                      );
                    })}
                  </div>
                )}
                {q.allowSelfDescribe && (
                  <input
                    className="study-input"
                    placeholder="Self-describe (optional)"
                    value={(answers[`${q.id}_self`] as string) || ""}
                    onChange={(e) => set(`${q.id}_self`, e.target.value)}
                  />
                )}
              </fieldset>
            ))}
          </div>
        );
      case 5:
        return (
          <div className="reveal">
            <h2 className="study-h2">Before the module</h2>
            <p className="study-fine">Rate how much you agree with each statement.</p>
            {S.perceptionStatements.map((s, i) => (
              <LikertItem key={s.id} id={`pre_${s.id}`} i={i} text={s.text} />
            ))}
            <fieldset className="study-field">
              <legend>{S.preOpenEnded.q}</legend>
              <textarea
                className="study-input"
                rows={4}
                value={(answers[S.preOpenEnded.id] as string) || ""}
                onChange={(e) => set(S.preOpenEnded.id, e.target.value)}
              />
            </fieldset>
          </div>
        );
      case 6:
        return (
          <div className="reveal">
            <h2 className="study-h2">Educational module</h2>
            <div className="cip-launch">
              <div>
                <p className="cip-launch-eyebrow">Education Module · Especially Reparations</p>
                <p className="cip-launch-title">The Big Payback?</p>
                <p className="cip-launch-sub">
                  An evidence-first carousel: what was taken, what compounded, and what a proven repair
                  would require.
                </p>
              </div>
              <Link to="/study/r-word/module" className="study-btn primary">
                Open the carousel →
              </Link>
            </div>
            {S.moduleSections.map((m, i) => (
              <div className="module-sec" key={m.id}>
                <p className="module-num">
                  Section {i + 1} of {S.moduleSections.length}
                </p>
                <h3 className="study-h3">{m.title}</h3>
                {m.body.map((b, j) => (
                  <p className="study-p" key={j}>
                    {b}
                  </p>
                ))}
                <div className="module-reflect">
                  <label>
                    <span className="reflect-label">Reflection · {m.reflection}</span>
                    <textarea
                      className="study-input"
                      rows={2}
                      value={(answers[`reflect_${m.id}`] as string) || ""}
                      onChange={(e) => set(`reflect_${m.id}`, e.target.value)}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        );
      case 7:
        return (
          <div className="reveal">
            <h2 className="study-h2">Knowledge check</h2>
            <p className="study-fine">
              You won't be removed for any answer. After incorrect answers you may review the material.
            </p>
            {S.knowledgeCheck.map((k, i) => {
              const chosen = answers[k.id] as number | undefined;
              const answered = chosen !== undefined;
              return (
                <fieldset className="study-field" key={k.id}>
                  <legend>
                    {i + 1}. {k.q}
                  </legend>
                  <div className="chips col">
                    {k.options.map((o, oi) => (
                      <label
                        className={`chip ${chosen === oi ? "on" : ""} ${
                          answered && oi === k.correct ? "correct" : ""
                        } ${answered && chosen === oi && oi !== k.correct ? "wrong" : ""}`}
                        key={o}
                      >
                        <input type="radio" name={k.id} checked={chosen === oi} onChange={() => set(k.id, oi)} />
                        {o}
                      </label>
                    ))}
                  </div>
                  {answered && chosen !== k.correct && (
                    <p className="kc-hint">Consider reviewing the related section, then continue.</p>
                  )}
                </fieldset>
              );
            })}
          </div>
        );
      case 8:
        return (
          <div className="reveal">
            <h2 className="study-h2">After the module</h2>
            <p className="study-fine">Rate the same statements again. Your earlier answers aren't shown.</p>
            {S.perceptionStatements.map((s, i) => (
              <LikertItem key={s.id} id={`post_${s.id}`} i={i} text={s.text} />
            ))}

            <h3 className="study-h3">About each framework</h3>
            <p className="study-fine">{S.pathwayRatingPrompt}</p>
            {S.pathwayRatings.map((p) => (
              <div className="study-item" key={p.id}>
                <p className="study-item-q">{p.text}</p>
                <Scale
                  name={p.id}
                  labels={["Not at all", "", "", "Moderately", "", "", "Extremely"]}
                  low={S.INTENSITY_ENDS.low}
                  high={S.INTENSITY_ENDS.high}
                  value={answers[p.id] as number}
                  onChange={(v) => set(p.id, v)}
                />
              </div>
            ))}
            <fieldset className="study-field">
              <legend>{S.whichPathway.q}</legend>
              <div className="chips col">
                {S.whichPathway.options.map((o) => (
                  <label className={`chip ${answers[S.whichPathway.id] === o ? "on" : ""}`} key={o}>
                    <input
                      type="radio"
                      name={S.whichPathway.id}
                      checked={answers[S.whichPathway.id] === o}
                      onChange={() => set(S.whichPathway.id, o)}
                    />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>

            <h3 className="study-h3">About the module</h3>
            {S.postOnlyStatements.map((s, i) => (
              <LikertItem key={s.id} id={s.id} i={i} text={s.text} />
            ))}
            <fieldset className="study-field">
              <legend>{S.overallChange.q}</legend>
              <div className="chips col">
                {S.overallChange.options.map((o) => (
                  <label className={`chip ${answers[S.overallChange.id] === o ? "on" : ""}`} key={o}>
                    <input
                      type="radio"
                      name={S.overallChange.id}
                      checked={answers[S.overallChange.id] === o}
                      onChange={() => set(S.overallChange.id, o)}
                    />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        );
      case 9:
        return (
          <div className="reveal">
            <h2 className="study-h2">Written reflection</h2>
            {S.reflectionQuestions.map((r, i) => (
              <fieldset className="study-field" key={r.id}>
                <legend>
                  {i + 1}. {r.q}
                </legend>
                <textarea
                  className="study-input"
                  rows={3}
                  value={(answers[r.id] as string) || ""}
                  onChange={(e) => set(r.id, e.target.value)}
                />
              </fieldset>
            ))}
            <p className="study-fine">Please avoid including information that could identify you or others.</p>
          </div>
        );
      case 10:
        return (
          <div className="reveal">
            <h2 className="study-h2">Debriefing</h2>
            {S.debrief.map((d, i) => (
              <p className="study-p" key={i}>
                {d}
              </p>
            ))}
            <p className="study-fine">{S.supportResources}</p>
          </div>
        );
      case 11:
        return (
          <div className="reveal">
            <h2 className="study-h2">Optional: volunteer</h2>
            <p className="study-p">
              Separate from your responses, you may express interest in the following. In this preview,
              nothing is submitted or stored.
            </p>
            <div className="chips col">
              {S.volunteerOptions.map((o) => (
                <label className={`chip ${((answers.volunteer as string[]) || []).includes(o) ? "on" : ""}`} key={o}>
                  <input
                    type="checkbox"
                    checked={((answers.volunteer as string[]) || []).includes(o)}
                    onChange={() => toggleMulti("volunteer", o)}
                  />
                  {o}
                </label>
              ))}
            </div>
            <input
              className="study-input"
              placeholder="Contact (email or handle) — optional, stored separately in a real study"
              value={(answers.volunteer_contact as string) || ""}
              onChange={(e) => set("volunteer_contact", e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  }
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="section page-top study">
      <div className="wrap study-wrap">
        <div className="study-banner reveal" role="note">
          <strong>Preview / Educational Demonstration Mode.</strong> Formal research enrollment is not
          currently open. This is a walkthrough of the participant experience — no responses are saved as
          research data.{" "}
          <button className="study-enroll" disabled>
            Research enrollment coming soon
          </button>
        </div>
        {children}
      </div>
    </section>
  );
}
