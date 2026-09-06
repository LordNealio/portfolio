import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ORIGINAL_34 } from "../../data/reconvening34";
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
} from "../../lib/wizardDraft";
import {
  formatWizardReview,
  downloadText,
  copyText,
  emailWizardReview,
} from "../../lib/wizardExport";
import { RECONVENE_INBOX } from "../../data/reconvening34";

type Screen = "welcome" | "resolution" | "summary" | "done";

export function OriginalWizard() {
  const [draft, setDraft] = useState<WizardDraft>(() => loadWizardDraft());
  const [screen, setScreen] = useState<Screen>("welcome");
  const [idx, setIdx] = useState(0);
  const [sent, setSent] = useState<string | null>(null);
  const headRef = useRef<HTMLElement | null>(null);

  const save = useCallback((d: WizardDraft) => {
    setDraft(saveWizardDraft(d));
  }, []);

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
      setScreen("summary");
    }
  };

  const goBack = () => {
    if (screen === "resolution" && idx > 0) {
      setIdx(idx - 1);
    } else if (screen === "resolution" && idx === 0) {
      setScreen("welcome");
    } else if (screen === "summary") {
      setIdx(total - 1);
      setScreen("resolution");
    }
  };

  const handleSkip = () => {
    if (res) save(skipReview(draft, res.n));
    goNext();
  };

  const handleSubmit = () => {
    const code = generateConfirmationCode();
    save({ ...draft, submitted: true, confirmationCode: code });
    setScreen("done");
  };

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

  // ── Done screen ──
  if (screen === "done") {
    return (
      <ReconveneShell title="Review complete">
        <div className="wiz-complete">
          <div className="wiz-complete-badge" aria-hidden="true">&#10003;</div>
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>} tabIndex={-1}>
            Thank you
          </h2>
          <p>
            Your review is recorded. Keep {counts.keep}, update {counts.update}, retire {counts.retire}.
          </p>
          {draft.confirmationCode && (
            <p className="rec-code">{draft.confirmationCode}</p>
          )}
          <div className="rec-actions" style={{ marginTop: 16 }}>
            <button type="button" className="rec-btn" onClick={doEmail}>Email my review</button>
            <button type="button" className="rec-btn ghost" onClick={doSave}>Save a copy</button>
            <button type="button" className="rec-btn ghost" onClick={doCopy}>Copy to clipboard</button>
          </div>
          {sent && <p className="rec-status rec-status--ok" role="status">{sent}</p>}
          <div className="rec-actions" style={{ marginTop: 20 }}>
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
      {/* ── Simple progress ── */}
      <div className="wiz-progress-area">
        <span>{done} of {total}</span>
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

      {/* ── Welcome ── */}
      {screen === "welcome" && (
        <section className="wiz-welcome">
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>} tabIndex={-1}>
            Review the Original 34
          </h2>
          <p>
            In 1848, Black leaders in Cleveland published 34 resolutions on freedom, equality,
            education, and survival. Read each one and decide: keep it, update it, or retire it.
          </p>
          <StandingNotice />

          {done > 0 && (
            <p className="rec-status rec-status--ok">
              You have {done} of {total} reviewed.
            </p>
          )}

          <div className="rec-actions">
            <button
              type="button"
              className="rec-btn"
              onClick={() => {
                if (done > 0) {
                  const first = ORIGINAL_34.findIndex(
                    (r) => !reviewOf(draft, r.n).choice && reviewOf(draft, r.n).status !== "skipped"
                  );
                  setIdx(first >= 0 ? first : 0);
                } else {
                  setIdx(0);
                }
                setScreen("resolution");
              }}
            >
              {done > 0 ? "Continue" : "Begin"} &rarr;
            </button>
          </div>
        </section>
      )}

      {/* ── Resolution card ── */}
      {screen === "resolution" && res && review && (
        <section className="wiz-card-screen" aria-live="polite">
          <p className="wiz-step-label" ref={headRef as React.RefObject<HTMLParagraphElement>} tabIndex={-1}>
            {res.n} of {total}
          </p>

          <article className="rec-card wiz-main-card">
            <div className="rec-card-head">
              <span className="rec-num" aria-hidden="true">{res.n}</span>
              <h3>{res.title}</h3>
            </div>

            <div className="rec-field">
              <span className="rec-field-l">Source text</span>
              <p className="rec-source">{res.source}</p>
            </div>

            <div className="rec-field">
              <span className="rec-field-l">In plain language</span>
              <p style={{ margin: 0 }}>{res.plain}</p>
            </div>

            <div className="rec-field">
              <span className="rec-field-l">Why it mattered</span>
              <p style={{ margin: 0 }}>{res.why}</p>
            </div>

            {res.note && (
              <p className="rec-note"><b>Note.</b> {res.note}</p>
            )}
          </article>

          {/* ── Three choices ── */}
          <fieldset className="wiz-choices">
            <legend className="sr-only">Your choice for Resolution {res.n}</legend>

            <button
              type="button"
              className={`wiz-choice wiz-choice--keep${review.choice === "keep" ? " wiz-choice--selected" : ""}`}
              aria-pressed={review.choice === "keep"}
              onClick={() => handleChoice("keep")}
            >
              <span className="wiz-choice-label">Keep It</span>
            </button>

            <button
              type="button"
              className={`wiz-choice wiz-choice--update${review.choice === "update" ? " wiz-choice--selected" : ""}`}
              aria-pressed={review.choice === "update"}
              onClick={() => handleChoice("update")}
            >
              <span className="wiz-choice-label">Update It</span>
            </button>

            <button
              type="button"
              className={`wiz-choice wiz-choice--retire${review.choice === "retire" ? " wiz-choice--selected" : ""}`}
              aria-pressed={review.choice === "retire"}
              onClick={() => handleChoice("retire")}
            >
              <span className="wiz-choice-label">Retire It</span>
            </button>
          </fieldset>

          {/* ── Note (shown after any choice) ── */}
          {review.choice && (
            <div className="wiz-note-area">
              <label className="rec-label" htmlFor="wiz-note">
                Add a note <span className="rec-fine">(optional)</span>
              </label>
              <textarea
                id="wiz-note"
                className="rec-textarea"
                maxLength={3000}
                value={review.note}
                onChange={(e) => handleNote(e.target.value)}
              />
            </div>
          )}

          {/* ── Navigation ── */}
          <nav className="wiz-step-nav" aria-label="Resolution navigation">
            <button type="button" className="rec-btn ghost" onClick={goBack}>
              &larr; Back
            </button>
            <button type="button" className="rec-btn ghost small" onClick={handleSkip}>
              Skip
            </button>
            <button type="button" className="rec-btn" onClick={goNext}>
              {idx < total - 1 ? "Next →" : "Finish →"}
            </button>
          </nav>
        </section>
      )}

      {/* ── Summary ── */}
      {screen === "summary" && (
        <section className="wiz-summary-screen">
          <h2 ref={headRef as React.RefObject<HTMLHeadingElement>} tabIndex={-1}>
            Review summary
          </h2>
          <StandingNotice />

          <div className="wiz-piles-row" style={{ marginBottom: 16 }}>
            <span className="wiz-pile wiz-pile--keep">Keep {counts.keep}</span>
            <span className="wiz-pile wiz-pile--update">Update {counts.update}</span>
            <span className="wiz-pile wiz-pile--retire">Retire {counts.retire}</span>
            {counts.skipped > 0 && <span className="wiz-pile wiz-pile--skip">Skipped {counts.skipped}</span>}
          </div>

          <div className="rec-card wiz-summary-list">
            {ORIGINAL_34.map((r, i) => {
              const rv = reviewOf(draft, r.n);
              const choiceLabel = rv.choice === "keep" ? "Keep" : rv.choice === "update" ? "Update" : rv.choice === "retire" ? "Retire" : rv.status === "skipped" ? "Skip" : "—";
              return (
                <div className="wiz-summary-item" key={r.n}>
                  <span className="wiz-summary-num">{r.n}.</span>
                  <span className="wiz-summary-title">{r.title}</span>
                  <span className={`wiz-pile wiz-pile--${rv.choice ?? (rv.status === "skipped" ? "skip" : "none")}`}>
                    {choiceLabel}
                  </span>
                  <button type="button" className="wiz-edit-link" onClick={() => goToResolution(i)}>
                    Edit
                  </button>
                </div>
              );
            })}
          </div>

          <div className="rec-actions" style={{ marginTop: 16 }}>
            <button type="button" className="rec-btn" onClick={handleSubmit}>
              Submit
            </button>
            <button type="button" className="rec-btn ghost" onClick={goBack}>
              &larr; Back
            </button>
          </div>
          {sent && <p className="rec-status rec-status--ok" role="status">{sent}</p>}
        </section>
      )}
    </ReconveneShell>
  );
}
