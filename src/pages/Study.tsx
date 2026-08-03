import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "../data/study";
import { studyApi, type Arm, type SavePayload } from "../lib/studyApi";
import { useReveal } from "../lib/useReveal";

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
  return "NW-" + rnd.toUpperCase();
}

// A 7-point scale as an accessible radio group.
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
            <input
              type="radio"
              name={name}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
            />
            <span aria-hidden="true">{n}</span>
            <span className="sr-only">{labels[n - 1] || `${n}`}</span>
          </label>
        ))}
      </div>
      <span className="scale-end">{high}</span>
    </div>
  );
}

export function Study() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [ineligible, setIneligible] = useState(false);
  const [done, setDone] = useState(false);
  const [code] = useState(genCode);
  // Live-enrollment state (all null/false in preview — the live-site default).
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [arm, setArm] = useState<Arm | null>(null);
  const enrolledRef = useRef(false);
  useReveal([step, done, ineligible]);

  // When (and only when) enrollment is enabled, create a participant + arm once.
  useEffect(() => {
    if (!studyApi.enabled || enrolledRef.current) return;
    enrolledRef.current = true;
    studyApi.enroll(code).then((r) => {
      if (r) {
        setParticipantId(r.participantId);
        setArm(r.arm);
      }
    });
  }, [code]);

  // In live mode with the comparison arm, the module + knowledge steps use the
  // neutral active-control material. Preview mode always shows the full module.
  const showComparison = studyApi.enabled && arm === "comparison";

  const set = (id: string, v: unknown) => setAnswers((a) => ({ ...a, [id]: v }));
  const toggleMulti = (id: string, opt: string) =>
    setAnswers((a) => {
      const cur = (a[id] as string[]) || [];
      return { ...a, [id]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] };
    });

  const consentOK = S.consentCheckboxes.every((c) => answers[c.id]);
  const total = STEP_LABELS.length;
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "auto" });

  // Map the current step's answers into a save payload. Pure preview does not
  // call this. Returns null when there is nothing to persist for a step.
  const collect = (s: number, a: Record<string, unknown>): SavePayload | null => {
    if (!participantId) return null;
    const num: { item_id: string; value: number }[] = [];
    const enums: { item_id: string; value: string }[] = [];
    const text: { item_id: string; value: string }[] = [];
    const events: string[] = [];
    const pushNum = (id: string) => {
      const v = a[id];
      if (typeof v === "number") num.push({ item_id: id, value: v });
    };
    const pushText = (id: string) => {
      const v = a[id];
      if (typeof v === "string" && v.trim()) text.push({ item_id: id, value: v });
    };
    let phase = "";
    let consent = false;
    switch (s) {
      case 2: // consent
        phase = "consent";
        consent = true;
        [...S.consentCheckboxes, S.quotationConsent].forEach((c) =>
          num.push({ item_id: c.id, value: a[c.id] ? 1 : 0 })
        );
        break;
      case 4: // background
        phase = "background";
        S.backgroundQuestions.forEach((q) => {
          const v = a[q.id];
          if (Array.isArray(v) && v.length) enums.push({ item_id: q.id, value: v.join("|") });
          else if (typeof v === "string" && v) enums.push({ item_id: q.id, value: v });
          pushText(`${q.id}_self`);
        });
        break;
      case 5: // baseline
        phase = "pre";
        S.perceptionStatements.forEach((p) => pushNum(`pre_${p.id}`));
        S.scenarios.forEach((sc) =>
          S.scenarioMeasures.forEach((m) => pushNum(`pre_${sc.id}_${m.id}`))
        );
        pushText(S.preOpenEnded.id);
        break;
      case 6: // module (or comparison reading)
        phase = "module";
        (showComparison ? S.comparisonModule : S.moduleSections).forEach((m) => {
          events.push(`module_view:${m.id}`);
          pushText(`reflect_${m.id}`);
        });
        break;
      case 7: // knowledge (or comparison check)
        phase = "knowledge";
        (showComparison ? S.comparisonKnowledge : S.knowledgeCheck).forEach((k) => pushNum(k.id));
        break;
      case 8: // post-survey
        phase = "post";
        S.perceptionStatements.forEach((p) => pushNum(`post_${p.id}`));
        S.scenarios.forEach((sc) =>
          S.scenarioMeasures.forEach((m) => pushNum(`post_${sc.id}_${m.id}`))
        );
        if (!showComparison) {
          S.postOnlyStatements.forEach((p) => pushNum(p.id));
          if (typeof a[S.overallChange.id] === "string")
            enums.push({ item_id: S.overallChange.id, value: a[S.overallChange.id] as string });
        }
        break;
      case 9: // reflection
        phase = "reflection";
        S.reflectionQuestions.forEach((r) => pushText(r.id));
        break;
      default:
        return null;
    }
    if (!num.length && !enums.length && !text.length && !events.length && !consent) return null;
    return { participantId, phase, numeric: num, enums, text, events, consent };
  };

  const persist = (s: number, a: Record<string, unknown>) => {
    if (!studyApi.enabled || !participantId) return;
    const payload = collect(s, a);
    if (payload) void studyApi.save(payload);
  };

  const next = () => {
    if (step === 1) {
      const ok = S.eligibility.every((e) => answers[e.id] === "Yes");
      if (!ok) {
        setIneligible(true);
        scrollTop();
        return;
      }
    }
    // Persist the step we are leaving (live mode only; no-op in preview).
    persist(step, answers);
    if (step === total - 1) {
      if (studyApi.enabled && participantId) {
        const interests = (answers.volunteer as string[]) || [];
        const contact = (answers.volunteer_contact as string) || "";
        if (interests.length || contact) void studyApi.volunteer(interests, contact);
        void studyApi.complete(participantId);
      }
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
    const msg = studyApi.enabled
      ? "Leave the study? You may withdraw; responses already saved will be flagged as withdrawn."
      : "Leave the study? Your progress will not be saved.";
    if (confirm(msg)) {
      if (studyApi.enabled && participantId) void studyApi.withdraw(participantId);
      nav("/work/the-n-word");
    }
  };

  // ── End states ──
  if (ineligible) {
    return (
      <Shell>
        <div className="study-card reveal">
          <h1 className="study-h1">Thank you</h1>
          <p className="study-p">
            Based on your answers, this experience isn't a match right now. No research responses have
            been collected. You're welcome to close this page.
          </p>
          <Link to="/work/the-n-word" className="study-btn ghost">
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
          <h1 className="study-h1">{studyApi.enabled ? "Thank you" : "Preview complete"}</h1>
          {studyApi.enabled ? (
            <p className="study-p">
              Your responses have been recorded under your code <strong>{code}</strong>. Thank you for
              taking part. {showComparison ? S.comparisonNote : ""}
            </p>
          ) : (
            <p className="study-p">
              You've reached the end of the preview experience. Because formal enrollment is not open,{" "}
              <strong>none of your responses were saved</strong>. Thank you for helping test the module.
            </p>
          )}
          <Link to="/work/the-n-word" className="study-btn primary">
            ← Back to the project
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      {/* Progress */}
      <div className="study-progress reveal">
        <div className="study-progress-top">
          <span>
            Step {step + 1} of {total} · {STEP_LABELS[step]}
          </span>
          <span className="muted">
            ≈ {S.STUDY.estimatedMinutes} min total{studyApi.enabled ? "" : " · Preview — not saved"}
          </span>
        </div>
        <div className="study-bar">
          <div className="study-bar-fill" style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
      </div>

      <div className="study-card">{renderStep()}</div>

      {/* Nav */}
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

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <div className="reveal">
            <p className="study-eyebrow">Language & Perception Study</p>
            <h1 className="study-h1">{S.STUDY.title}</h1>
            <p className="study-sub">{S.STUDY.subtitle}</p>
            <p className="study-p">{S.STUDY.intro}</p>
            <ul className="study-notices">
              {S.STUDY.notices.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <p className="study-fine">
              We use “N-word” throughout the interface and do not display the uncensored word
              unexpectedly.
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
            <p className="study-fine">
              {studyApi.enabled
                ? "This code lets you request withdrawal of your data later. It is not linked to your identity."
                : "In this preview, the code is generated locally and nothing is stored."}
            </p>
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
              <div className="study-item" key={s.id}>
                <p className="study-item-q">
                  {i + 1}. {s.text}
                </p>
                <Scale
                  name={`pre_${s.id}`}
                  labels={S.LIKERT_7}
                  low="Strongly disagree"
                  high="Strongly agree"
                  value={answers[`pre_${s.id}`] as number}
                  onChange={(v) => set(`pre_${s.id}`, v)}
                />
              </div>
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
            <h3 className="study-h3">Scenarios</h3>
            {S.scenarios.map((sc) => (
              <ScenarioBlock key={`pre_${sc.id}`} sc={sc} phase="pre" answers={answers} set={set} />
            ))}
          </div>
        );
      case 6: {
        const mod = showComparison ? S.comparisonModule : S.moduleSections;
        return (
          <div className="reveal">
            <h2 className="study-h2">{showComparison ? "Reading" : "Educational module"}</h2>
            {mod.map((m, i) => (
              <div className="module-sec" key={m.id}>
                <p className="module-num">Section {i + 1} of {mod.length}</p>
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
      }
      case 7: {
        const kc = showComparison ? S.comparisonKnowledge : S.knowledgeCheck;
        return (
          <div className="reveal">
            <h2 className="study-h2">{showComparison ? "Comprehension check" : "Knowledge check"}</h2>
            <p className="study-fine">
              You won't be removed for any answer. After incorrect answers you may review the material.
            </p>
            {kc.map((k, i) => {
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
      }
      case 8:
        return (
          <div className="reveal">
            <h2 className="study-h2">After the module</h2>
            <p className="study-fine">Rate the same statements again. Your earlier answers aren't shown.</p>
            {S.perceptionStatements.map((s, i) => (
              <div className="study-item" key={s.id}>
                <p className="study-item-q">
                  {i + 1}. {s.text}
                </p>
                <Scale
                  name={`post_${s.id}`}
                  labels={S.LIKERT_7}
                  low="Strongly disagree"
                  high="Strongly agree"
                  value={answers[`post_${s.id}`] as number}
                  onChange={(v) => set(`post_${s.id}`, v)}
                />
              </div>
            ))}
            <h3 className="study-h3">Scenarios</h3>
            {S.scenarios.map((sc) => (
              <ScenarioBlock key={`post_${sc.id}`} sc={sc} phase="post" answers={answers} set={set} />
            ))}
            {!showComparison && (
              <>
                <h3 className="study-h3">About the module</h3>
                {S.postOnlyStatements.map((s, i) => (
                  <div className="study-item" key={s.id}>
                    <p className="study-item-q">
                      {i + 1}. {s.text}
                    </p>
                    <Scale
                      name={s.id}
                      labels={S.LIKERT_7}
                      low="Strongly disagree"
                      high="Strongly agree"
                      value={answers[s.id] as number}
                      onChange={(v) => set(s.id, v)}
                    />
                  </div>
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
              </>
            )}
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
              Separate from your responses, you may express interest in the following.{" "}
              {studyApi.enabled
                ? "If you share contact details, they are stored separately and are not linked to your survey answers."
                : "In this preview, nothing is submitted or stored."}
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

function ScenarioBlock({
  sc,
  phase,
  answers,
  set,
}: {
  sc: { id: string; text: string };
  phase: string;
  answers: Record<string, unknown>;
  set: (id: string, v: unknown) => void;
}) {
  return (
    <div className="scenario">
      <p className="scenario-text">{sc.text}</p>
      {S.scenarioMeasures.map((m) => {
        const key = `${phase}_${sc.id}_${m.id}`;
        return (
          <div className="scenario-measure" key={key}>
            <span className="scenario-q">{m.q}</span>
            <Scale
              name={key}
              labels={["Not at all", "", "", "Moderately", "", "", "Extremely"]}
              low={S.INTENSITY_ENDS.low}
              high={S.INTENSITY_ENDS.high}
              value={answers[key] as number}
              onChange={(v) => set(key, v)}
            />
          </div>
        );
      })}
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="section page-top study">
      <div className="wrap study-wrap">
        {studyApi.enabled ? (
          <div className="study-banner reveal" role="note">
            <strong>Research study — enrollment open.</strong> Your responses are saved under a random
            code and used only for this approved study. You may stop at any time using “Leave study.”
          </div>
        ) : (
          <div className="study-banner reveal" role="note">
            <strong>Preview / Educational Demonstration Mode.</strong> Formal research enrollment is not
            currently open. This is a walkthrough of the participant experience — no responses are saved as
            research data.{" "}
            <button className="study-enroll" disabled>
              Research enrollment coming soon
            </button>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
