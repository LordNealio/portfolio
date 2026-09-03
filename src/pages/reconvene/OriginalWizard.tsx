import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ORIGINAL_34,
  RECONVENE_VERSIONS,
  SOURCES,
} from "../../data/reconvening34";
import { ReconveneShell, REC_BASE, StandingNotice } from "../../components/reconvene/ReconveneShell";
import {
  loadWizardDraft,
  saveWizardDraft,
  reviewOf,
  setReview,
  skipReview,
  pileCounts,
  reviewedCount,
  generateConfirmationCode,
  type WizardDraft,
  type WizardChoice,
  type NewProposal,
} from "../../lib/wizardDraft";
import {
  formatWizardReview,
  downloadText,
  copyText,
  emailWizardReview,
} from "../../lib/wizardExport";
import { RECONVENE_INBOX } from "../../data/reconvening34";

type Screen = "welcome" | "resolution" | "missing" | "summary" | "done";

export function OriginalWizard() {
  const [draft, setDraft] = useState<WizardDraft>(() => loadWizardDraft());
  const [screen, setScreen] = useState<Screen>("welcome");
  const [idx, setIdx] = useState(0); // 0-33 for resolutions
  const [navOpen, setNavOpen] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const headRef = useRef<HTMLElement | null>(null);

  const save = useCallback((d: WizardDraft) => {
    setDraft(saveWizardDraft(d));
  }, []);

  // Pick up edits from another tab.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "reconvene34.wizard.v1") setDraft(loadWizardDraft());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    headRef.current?.focus();
    window.scrollTo(0, 0);
  }, [screen, idx]);

  // Warn on unload if there's unsaved work.
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (reviewedCount(draft) > 0 && !draft.submitted) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [draft]);

  const total = ORIGINAL_34.length;
  const done = reviewedCount(draft);
  const counts = pileCounts(draft);
  const res = ORIGINAL_34[idx];
  const review = res ? reviewOf(draft, res.n) : null;

  const goToResolution = (i: number) => {
    setIdx(i);
    setScreen("resolution");
    setNavOpen(false);
  };

  const handleChoice = (choice: WizardChoice) => {
    if (!res) return;
    const current = reviewOf(draft, res.n);
    if (current.choice === choice) {
      save(setReview(draft, res.n, { choice: null, status: "unanswered" }));
    } else {
      save(setReview(draft, res.n, { choice }));
    }
  };

  const handleNote = (note: string) => {
    if (!res) return;
    save(setReview(draft, res.n, { note }));
  };

  const goNext = () => {
    if (idx < total - 1) {
      setIdx(idx + 1);
    } else {
      setScreen("missing");
    }
  };

  const goBack = () => {
    if (screen === "resolution" && idx > 0) {
      setIdx(idx - 1);
    } else if (screen === "resolution" && idx === 0) {
      setScreen("welcome");
    } else if (screen === "missing") {
      setIdx(total - 1);
      setScreen("resolution");
    } else if (screen === "summary") {
      setScreen("missing");
    }
  };

  const handleSkip = () => {
    if (res) save(skipReview(draft, res.n));
    goNext();
  };

  const handleSaveAndExit = () => {
    setSent("Your progress is saved to this device. Return any time to continue.");
  };

  const handleSubmit = () => {
    const code = generateConfirmationCode();
    save({
      ...draft,
      submitted: true,
      confirmationCode: code,
    });
    setScreen("done");
  };

  // ── Proposals ──
  const addProposal = () => {
    const p: NewProposal = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      title: "",
      wording: "",
      reasoning: "",
      affected: "",
      relatedNumbers: [],
    };
    save({ ...draft, proposals: [...draft.proposals, p] });
  };

  const updateProposal = (id: string, patch: Partial<NewProposal>) => {
    save({
      ...draft,
      proposals: draft.proposals.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  };

  const removeProposal = (id: string) => {
    save({ ...draft, proposals: draft.proposals.filter((p) => p.id !== id) });
  };

  // ── Export helpers ──
  const doSave = () => {
    downloadText(formatWizardReview(draft), "original-34-my-review.txt");
    setSent("Saved to your device.");
  };
  const doCopy = async () => {
    const ok = await copyText(formatWizardReview(draft));
    setSent(ok ? "Copied to clipboard." : "Could not reach the clipboard.");
  };
  const doEmail = () => {
    const outcome = emailWizardReview(draft, RECONVENE_INBOX);
    setSent(
      outcome === "full"
        ? "Opening your email app."
        : "Review downloaded as a file — attach it to the message."
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // Confirmation screen
  // ═══════════════════════════════════════════════════════════════════════════
  if (screen === "done") {
    return (
      <ReconveneShell title="Review complete">
        <div className="wiz-complete">
          <div className="wiz-complete-badge" aria-hidden="true">&#10003;</div>
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>} tabIndex={-1}>
            Founding Reviser
          </h2>
          <p>
            Your review is part of the Founding Review Circle. Thank you for studying the
            Original 34 and helping shape what may go forward.
          </p>
          <p className="rec-fine">
            These responses are community feedback, not an official election or a claim to
            represent all Black people.
          </p>
          {draft.confirmationCode && (
            <p className="rec-code">{draft.confirmationCode}</p>
          )}
          <p className="rec-fine">
            Keep this confirmation code for your records. It contains no personal information.
          </p>

          <h3>Your review</h3>
          <div className="wiz-piles-row">
            <span className="wiz-pile wiz-pile--keep">Keep {counts.keep}</span>
            <span className="wiz-pile wiz-pile--update">Update {counts.update}</span>
            <span className="wiz-pile wiz-pile--retire">Retire {counts.retire}</span>
            {counts.skipped > 0 && <span className="wiz-pile wiz-pile--skip">Skipped {counts.skipped}</span>}
          </div>
          {draft.proposals.length > 0 && (
            <p className="rec-fine">{draft.proposals.length} new proposal{draft.proposals.length > 1 ? "s" : ""} submitted.</p>
          )}

          <div className="rec-card" style={{ marginTop: 16 }}>
            <h3>Keep a copy</h3>
            {sent && <p className="rec-status rec-status--ok" role="status">{sent}</p>}
            <div className="rec-actions" style={{ marginTop: 8 }}>
              <button type="button" className="rec-btn" onClick={doEmail}>Email my review</button>
              <button type="button" className="rec-btn ghost" onClick={doSave}>Save a copy</button>
              <button type="button" className="rec-btn ghost" onClick={doCopy}>Copy to clipboard</button>
            </div>
          </div>

          <div className="rec-actions" style={{ marginTop: 20 }}>
            <Link className="rec-btn ghost" to={`${REC_BASE}/proposed`}>
              Explore the Proposed New 34 &rarr;
            </Link>
            <Link className="rec-btn ghost" to={`${REC_BASE}`}>
              Back to context
            </Link>
          </div>
        </div>
      </ReconveneShell>
    );
  }

  return (
    <ReconveneShell title="Review the Original 34">
      {/* ── Progress bar (always visible) ── */}
      <div className="wiz-progress-area">
        <div className="wiz-progress-text">
          <span>{done} of {total} reviewed</span>
          <div className="wiz-piles-row">
            <span className="wiz-pile wiz-pile--keep" title="Keep It">{counts.keep}</span>
            <span className="wiz-pile wiz-pile--update" title="Update It">{counts.update}</span>
            <span className="wiz-pile wiz-pile--retire" title="Retire It">{counts.retire}</span>
          </div>
        </div>
        <div
          className="rec-bar"
          role="progressbar"
          aria-valuenow={done}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${done} of ${total} reviewed`}
        >
          <div className="rec-bar-fill" style={{ width: `${total ? Math.round((done / total) * 100) : 0}%` }} />
        </div>
      </div>

      {/* ── Compact navigator ── */}
      <div className="wiz-nav-toggle">
        <button
          type="button"
          className="rec-btn ghost small"
          onClick={() => setNavOpen(!navOpen)}
          aria-expanded={navOpen}
        >
          {navOpen ? "Hide navigator" : "Jump to a resolution"}
        </button>
      </div>
      {navOpen && (
        <nav className="wiz-navigator" aria-label="Resolution navigator">
          {ORIGINAL_34.map((r, i) => {
            const rv = reviewOf(draft, r.n);
            let cls = "wiz-nav-dot";
            if (rv.choice === "keep") cls += " wiz-nav-dot--keep";
            else if (rv.choice === "update") cls += " wiz-nav-dot--update";
            else if (rv.choice === "retire") cls += " wiz-nav-dot--retire";
            else if (rv.status === "skipped") cls += " wiz-nav-dot--skip";
            const isCurrent = screen === "resolution" && i === idx;
            return (
              <button
                key={r.n}
                type="button"
                className={cls}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Resolution ${r.n}: ${r.title}${rv.choice ? ` — ${rv.choice}` : rv.status === "skipped" ? " — skipped" : ""}`}
                onClick={() => goToResolution(i)}
              >
                {r.n}
              </button>
            );
          })}
          <div className="wiz-nav-legend">
            <span><i className="wiz-leg-dot wiz-leg-dot--keep" /> Keep</span>
            <span><i className="wiz-leg-dot wiz-leg-dot--update" /> Update</span>
            <span><i className="wiz-leg-dot wiz-leg-dot--retire" /> Retire</span>
            <span><i className="wiz-leg-dot wiz-leg-dot--skip" /> Skipped</span>
          </div>
        </nav>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
         WELCOME SCREEN
         ═══════════════════════════════════════════════════════════════════════ */}
      {screen === "welcome" && (
        <section className="wiz-welcome">
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>} tabIndex={-1}>
            Review the Original 34
          </h2>
          <p className="rec-lead">
            In 1848, Black leaders gathered in Cleveland and published 34 numbered resolutions
            addressing freedom, equality, education, work, wealth, political action, community
            responsibility, and survival. Review them one at a time and help consider what
            should move forward today.
          </p>
          <p className="rec-fine">
            There are no right answers. You may save your progress, skip a resolution, return
            later, and change any choice before submitting.
          </p>
          <StandingNotice />

          {done > 0 && (
            <div className="rec-status rec-status--ok">
              <b>Welcome back.</b> You have {done} of {total} reviewed. Pick up where you left off
              or jump to any resolution.
            </div>
          )}

          <div className="rec-actions">
            <button
              type="button"
              className="rec-btn"
              onClick={() => {
                if (done > 0) {
                  const firstUnanswered = ORIGINAL_34.findIndex(
                    (r) => !reviewOf(draft, r.n).choice && reviewOf(draft, r.n).status !== "skipped"
                  );
                  setIdx(firstUnanswered >= 0 ? firstUnanswered : 0);
                } else {
                  setIdx(0);
                }
                setScreen("resolution");
              }}
            >
              {done > 0 ? "Continue reviewing" : "Begin with Resolution 1"} &rarr;
            </button>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
         RESOLUTION CARD (one at a time)
         ═══════════════════════════════════════════════════════════════════════ */}
      {screen === "resolution" && res && review && (
        <section className="wiz-card-screen" aria-live="polite">
          <p className="wiz-step-label" ref={headRef as React.RefObject<HTMLParagraphElement>} tabIndex={-1}>
            Resolution {res.n} of {total}
          </p>

          <article className="rec-card wiz-main-card">
            <div className="rec-card-head">
              <span className="rec-num" aria-hidden="true">{res.n}</span>
              <h3>{res.title}</h3>
            </div>

            <div className="rec-cats">
              {res.categories.map((c) => (
                <span className="rec-cat" key={c}>{c}</span>
              ))}
            </div>

            <div className="rec-field">
              <span className="rec-field-l">1848 substance — source text</span>
              <p className="rec-source">{res.source}</p>
            </div>

            <div className="rec-field">
              <span className="rec-field-l">In plain language</span>
              <p style={{ margin: 0 }}>{res.plain}</p>
            </div>

            <div className="rec-field">
              <span className="rec-field-l">Why it mattered in 1848</span>
              <p style={{ margin: 0 }}>{res.why}</p>
            </div>

            {res.note && (
              <p className="rec-note"><b>Archival note.</b> {res.note}</p>
            )}

            <p className="rec-src-link" style={{ margin: "0 0 4px" }}>
              <a href={SOURCES.proceedings} target="_blank" rel="noopener noreferrer">
                Read the published proceedings &#8599;
              </a>
            </p>
          </article>

          {/* ── Three response buttons ── */}
          <fieldset className="wiz-choices">
            <legend className="sr-only">Your choice for Resolution {res.n}</legend>

            <button
              type="button"
              className={`wiz-choice wiz-choice--keep${review.choice === "keep" ? " wiz-choice--selected" : ""}`}
              aria-pressed={review.choice === "keep"}
              onClick={() => handleChoice("keep")}
            >
              <span className="wiz-choice-icon" aria-hidden="true">&#10003;</span>
              <span className="wiz-choice-label">Keep It</span>
              <span className="wiz-choice-help">The core principle should continue substantially as written.</span>
            </button>

            <button
              type="button"
              className={`wiz-choice wiz-choice--update${review.choice === "update" ? " wiz-choice--selected" : ""}`}
              aria-pressed={review.choice === "update"}
              onClick={() => handleChoice("update")}
            >
              <span className="wiz-choice-icon" aria-hidden="true">&#9998;</span>
              <span className="wiz-choice-label">Update It</span>
              <span className="wiz-choice-help">Revise it, modernize it, expand it, merge it with another idea, or add something to it.</span>
            </button>

            <button
              type="button"
              className={`wiz-choice wiz-choice--retire${review.choice === "retire" ? " wiz-choice--selected" : ""}`}
              aria-pressed={review.choice === "retire"}
              onClick={() => handleChoice("retire")}
            >
              <span className="wiz-choice-icon" aria-hidden="true">&#10005;</span>
              <span className="wiz-choice-label">Retire It</span>
              <span className="wiz-choice-help">This resolution should not move forward as part of a modern set.</span>
            </button>
          </fieldset>

          {/* ── Contextual text areas ── */}
          {review.choice === "update" && (
            <div className="wiz-note-area">
              <label className="rec-label" htmlFor="wiz-note">
                What should change or be added?
              </label>
              <p className="rec-fine" style={{ margin: "0 0 6px" }}>
                You can rewrite the resolution, explain what feels outdated, identify what
                should be preserved, suggest what today&rsquo;s version should address, or
                connect it to another resolution.
              </p>
              <textarea
                id="wiz-note"
                className="rec-textarea"
                maxLength={3000}
                value={review.note}
                onChange={(e) => handleNote(e.target.value)}
                style={{ minHeight: 120 }}
              />
              <p className="rec-fine" style={{ margin: "4px 0 0" }}>
                {3000 - review.note.length} characters remaining
              </p>
              {!review.note.trim() && (
                <p className="wiz-gentle-nudge">
                  A note helps explain what you would change — but you can continue without one.
                </p>
              )}
            </div>
          )}

          {review.choice === "retire" && (
            <div className="wiz-note-area">
              <label className="rec-label" htmlFor="wiz-note">
                Why should it be retired? <span className="rec-fine">(optional)</span>
              </label>
              <p className="rec-fine" style={{ margin: "0 0 6px" }}>
                You may explain whether it has been achieved, has become outdated, causes
                concern, belongs somewhere else, or should be replaced by a different idea.
              </p>
              <textarea
                id="wiz-note"
                className="rec-textarea"
                maxLength={3000}
                value={review.note}
                onChange={(e) => handleNote(e.target.value)}
              />
              <p className="rec-fine" style={{ margin: "4px 0 0" }}>
                {3000 - review.note.length} characters remaining
              </p>
            </div>
          )}

          {review.choice === "keep" && (
            <div className="wiz-note-area">
              <label className="rec-label" htmlFor="wiz-note">
                Why should this be kept? <span className="rec-fine">(optional)</span>
              </label>
              <textarea
                id="wiz-note"
                className="rec-textarea"
                maxLength={3000}
                value={review.note}
                onChange={(e) => handleNote(e.target.value)}
              />
              <p className="rec-fine" style={{ margin: "4px 0 0" }}>
                {3000 - review.note.length} characters remaining
              </p>
            </div>
          )}

          {/* ── Navigation ── */}
          <nav className="wiz-step-nav" aria-label="Resolution navigation">
            <button type="button" className="rec-btn ghost" onClick={goBack}>
              &larr; Back
            </button>
            <button type="button" className="rec-btn ghost small" onClick={handleSaveAndExit}>
              Save &amp; Exit
            </button>
            <button type="button" className="rec-btn ghost small" onClick={handleSkip}>
              Skip for Now
            </button>
            <button type="button" className="rec-btn" onClick={goNext}>
              {idx < total - 1 ? "Next →" : "Continue →"}
            </button>
          </nav>
          {sent && (
            <p className="rec-status rec-status--ok" role="status" style={{ marginTop: 10 }}>
              {sent}
            </p>
          )}
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
         WHAT IS MISSING
         ═══════════════════════════════════════════════════════════════════════ */}
      {screen === "missing" && (
        <section className="wiz-missing-screen">
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>} tabIndex={-1}>
            What is missing?
          </h2>
          <p>
            Updating an existing resolution and proposing a completely new resolution are
            different. Use this step for an issue or principle that is not adequately covered
            anywhere in the Original 34.
          </p>
          <p className="rec-fine">
            You may add zero, one, or multiple new proposals. A proposal is not required to
            finish the review.
          </p>

          {draft.proposals.map((p, pi) => (
            <div className="rec-card wiz-proposal-card" key={p.id}>
              <h3>New proposal {pi + 1}</h3>
              <div className="rec-field">
                <label className="rec-label" htmlFor={`prop-title-${p.id}`}>Proposed short title</label>
                <input
                  id={`prop-title-${p.id}`}
                  className="rec-input"
                  maxLength={200}
                  value={p.title}
                  onChange={(e) => updateProposal(p.id, { title: e.target.value })}
                />
              </div>
              <div className="rec-field">
                <label className="rec-label" htmlFor={`prop-word-${p.id}`}>Proposed wording or core idea</label>
                <textarea
                  id={`prop-word-${p.id}`}
                  className="rec-textarea"
                  maxLength={3000}
                  value={p.wording}
                  onChange={(e) => updateProposal(p.id, { wording: e.target.value })}
                />
              </div>
              <div className="rec-field">
                <label className="rec-label" htmlFor={`prop-why-${p.id}`}>Why it is needed</label>
                <textarea
                  id={`prop-why-${p.id}`}
                  className="rec-textarea"
                  maxLength={3000}
                  value={p.reasoning}
                  onChange={(e) => updateProposal(p.id, { reasoning: e.target.value })}
                />
              </div>
              <div className="rec-field">
                <label className="rec-label" htmlFor={`prop-who-${p.id}`}>Who or what it would affect</label>
                <input
                  id={`prop-who-${p.id}`}
                  className="rec-input"
                  maxLength={500}
                  value={p.affected}
                  onChange={(e) => updateProposal(p.id, { affected: e.target.value })}
                />
              </div>
              <button
                type="button"
                className="rec-btn ghost small"
                onClick={() => removeProposal(p.id)}
              >
                Remove this proposal
              </button>
            </div>
          ))}

          <div className="rec-actions">
            <button type="button" className="rec-btn ghost" onClick={addProposal}>
              + Add a new proposal
            </button>
          </div>

          <nav className="wiz-step-nav" style={{ marginTop: 24 }}>
            <button type="button" className="rec-btn ghost" onClick={goBack}>
              &larr; Back to Resolution {total}
            </button>
            <button type="button" className="rec-btn" onClick={() => setScreen("summary")}>
              Review my answers &rarr;
            </button>
          </nav>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
         REVIEW SUMMARY
         ═══════════════════════════════════════════════════════════════════════ */}
      {screen === "summary" && (
        <section className="wiz-summary-screen">
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>} tabIndex={-1}>
            Review before submitting
          </h2>
          <StandingNotice />

          <div className="rec-card">
            <h3>Summary</h3>
            <div className="wiz-piles-row" style={{ marginBottom: 12 }}>
              <span className="wiz-pile wiz-pile--keep">Keep {counts.keep}</span>
              <span className="wiz-pile wiz-pile--update">Update {counts.update}</span>
              <span className="wiz-pile wiz-pile--retire">Retire {counts.retire}</span>
            </div>
            <ul className="wiz-summary-counts">
              {counts.skipped > 0 && <li>{counts.skipped} skipped</li>}
              {counts.unanswered > 0 && <li>{counts.unanswered} unanswered</li>}
              <li>{draft.proposals.length} new proposal{draft.proposals.length !== 1 ? "s" : ""}</li>
            </ul>
            {(counts.skipped > 0 || counts.unanswered > 0) && (
              <p className="rec-fine" style={{ margin: "8px 0 0" }}>
                You may return to unanswered resolutions or submit a partial review.
                Skipped and unanswered items are not counted as any choice.
              </p>
            )}
          </div>

          <div className="rec-card wiz-summary-list" style={{ marginTop: 14 }}>
            <h3>Your choices</h3>
            {ORIGINAL_34.map((r, i) => {
              const rv = reviewOf(draft, r.n);
              const choiceLabel = rv.choice === "keep" ? "Keep It" : rv.choice === "update" ? "Update It" : rv.choice === "retire" ? "Retire It" : rv.status === "skipped" ? "Skipped" : "Unanswered";
              return (
                <div className="wiz-summary-item" key={r.n}>
                  <div className="wiz-summary-item-head">
                    <span className="wiz-summary-num">{r.n}.</span>
                    <span className="wiz-summary-title">{r.title}</span>
                    <span className={`wiz-pile wiz-pile--${rv.choice ?? (rv.status === "skipped" ? "skip" : "none")}`}>
                      {choiceLabel}
                    </span>
                  </div>
                  {rv.note && <p className="rec-fine" style={{ margin: "2px 0 0 24px" }}>{rv.note}</p>}
                  <button
                    type="button"
                    className="wiz-edit-link"
                    onClick={() => goToResolution(i)}
                  >
                    Edit
                  </button>
                </div>
              );
            })}
          </div>

          {draft.proposals.length > 0 && (
            <div className="rec-card" style={{ marginTop: 14 }}>
              <h3>New proposals</h3>
              {draft.proposals.map((p, i) => (
                <div className="wiz-summary-item" key={p.id}>
                  <span className="wiz-summary-num">{i + 1}.</span>
                  <span className="wiz-summary-title">{p.title || "(untitled)"}</span>
                  <button type="button" className="wiz-edit-link" onClick={() => setScreen("missing")}>
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="rec-fine" style={{ marginTop: 14 }}>
            Recorded against version <code>{RECONVENE_VERSIONS.original}</code>, so later
            edits to the wording cannot change what you answered.
          </p>

          <div className="rec-card" style={{ marginTop: 14 }}>
            <h3>Submit or save</h3>
            {sent && <p className="rec-status rec-status--ok" role="status">{sent}</p>}
            <div className="rec-actions" style={{ marginTop: 8 }}>
              <button type="button" className="rec-btn" onClick={handleSubmit}>
                Submit My Review
              </button>
              <button type="button" className="rec-btn ghost" onClick={doEmail}>
                Email my review
              </button>
              <button type="button" className="rec-btn ghost" onClick={doSave}>
                Save a copy
              </button>
              <button type="button" className="rec-btn ghost" onClick={doCopy}>
                Copy to clipboard
              </button>
            </div>
          </div>

          <nav className="wiz-step-nav" style={{ marginTop: 18 }}>
            <button type="button" className="rec-btn ghost" onClick={goBack}>
              &larr; Back
            </button>
          </nav>
        </section>
      )}
    </ReconveneShell>
  );
}
