import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  CONTACT_METHODS,
  INTEREST_AREAS,
  MISSING_PROMPT,
  ORIGINAL_34,
  ORIGINAL_CATEGORIES,
  ORIGINAL_OPTIONS,
  PROPOSED_34,
  PROPOSED_OPTIONS,
  PROPOSED_SECTIONS,
  RECONVENE,
  RECONVENE_VERSIONS,
  TOTAL_ITEMS,
} from "../../data/reconvening34";
import {
  ReconveneShell,
  REC_BASE,
  Progress,
  StandingNotice,
} from "../../components/reconvene/ReconveneShell";
import { OriginalCard, ProposedCard } from "../../components/reconvene/ResolutionCard";
import { useReconveneDraft } from "../../lib/useReconveneDraft";
import { clearDraft, reviewedCount } from "../../lib/reconveneDraft";
import { reconveneApi, type SubmitResult } from "../../lib/reconveneApi";
import {
  formatReview,
  downloadText,
  copyText,
  emailReview,
} from "../../lib/reconveneExport";
import { RECONVENE_INBOX } from "../../data/reconvening34";

const STEPS = ["The Original 34", "The Proposed New 34", "What is missing", "About you", "Final review"] as const;

const titleOf = (n: number) => ORIGINAL_34.find((r) => r.n === n)?.title ?? "";
const labelOf = (opts: { value: string; label: string }[], v?: string) =>
  opts.find((o) => o.value === v)?.label ?? "—";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ReconveneBallot() {
  const { draft, update, setOriginal, setProposed, answerOf } = useReconveneDraft();
  const [step, setStep] = useState(0);
  const [origCat, setOrigCat] = useState<string | null>(null);
  const [propSec, setPropSec] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ id: string; msg: string }[]>([]);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [hp, setHp] = useState("");
  const started = useRef(Date.now());
  const errRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLHeadingElement | null>(null);

  const done = reviewedCount(draft);
  const c = draft.contact;

  useEffect(() => {
    headRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (errors.length) errRef.current?.focus();
  }, [errors]);

  const setContact = (patch: Partial<typeof c>) =>
    update((d) => ({ ...d, contact: { ...d.contact, ...patch } }));

  const wantsFollowUp =
    c.preferred !== "" && c.preferred !== "No follow-up";

  const validate = () => {
    const e: { id: string; msg: string }[] = [];
    if (c.email && !EMAIL_RE.test(c.email.trim())) {
      e.push({ id: "f-email", msg: "The email address does not look complete." });
    }
    if (wantsFollowUp && !c.email.trim() && !c.phone.trim()) {
      e.push({
        id: "f-email",
        msg: "To receive follow-up, add an email address or a phone number — or set the preferred method to “No follow-up”.",
      });
    }
    if ((c.email.trim() || c.phone.trim()) && !c.consent) {
      e.push({ id: "f-consent", msg: "Tick the consent box before sending contact details." });
    }
    return e;
  };

  const submit = async () => {
    const e = validate();
    setErrors(e);
    if (e.length) return;
    setSending(true);
    const r = await reconveneApi.submit(draft, Date.now() - started.current, hp);
    setResult(r);
    setSending(false);
    if (r.ok) clearDraft();
  };

  const save = () => {
    downloadText(formatReview(draft), "reconvening-34-my-review.txt");
    setSent("Saved to your device as reconvening-34-my-review.txt");
  };

  const copy = async () => {
    const ok = await copyText(formatReview(draft));
    setSent(
      ok
        ? "Your full review is copied — paste it anywhere."
        : "Could not reach the clipboard. Use “Save a copy” instead."
    );
  };

  const email = () => {
    const outcome = emailReview(draft, RECONVENE_INBOX);
    setSent(
      outcome === "full"
        ? "Opening your email app with the review in the message."
        : "Your review was too long for an email body, so it downloaded as a file — attach it to the message that just opened."
    );
  };

  const print = () => window.print();

  // ── Confirmation ──────────────────────────────────────────────────────────
  if (result?.ok) {
    return (
      <ReconveneShell title="Submitted">
        <div className="rec-card">
          <h2>Received</h2>
          <p>
            Your review has been recorded as community feedback. Keep this confirmation code
            if you want to reference your submission later. It contains no personal
            information.
          </p>
          <p className="rec-code">{result.code}</p>
          <p className="rec-fine">
            Contact details, if you gave any, are stored privately and are never shown in
            public results.
          </p>
          <div className="rec-actions">
            <Link className="rec-btn ghost" to={`${REC_BASE}/results`}>
              See the running results
            </Link>
            <Link className="rec-btn ghost" to={`${REC_BASE}/additions`}>
              Add something we missed
            </Link>
          </div>
        </div>
      </ReconveneShell>
    );
  }

  const originalShown = origCat
    ? ORIGINAL_34.filter((r) => r.categories.includes(origCat as never))
    : ORIGINAL_34;
  const proposedShown = propSec
    ? PROPOSED_34.filter((r) => r.sectionId === propSec)
    : PROPOSED_34;

  return (
    <ReconveneShell title="Review ballot">
      <section className="rec-sec">
        <h2 tabIndex={-1} ref={headRef}>
          {STEPS[step]}
        </h2>
        <StandingNotice />
        <Progress done={done} total={TOTAL_ITEMS} />
        <p className="rec-fine" style={{ marginTop: 8 }}>
          Step {step + 1} of {STEPS.length}. Nothing is required — skip anything you would
          rather not answer. Your progress saves to this device as you go, so you can leave
          and come back.
        </p>
      </section>

      {errors.length > 0 && (
        <div className="rec-errors" tabIndex={-1} ref={errRef} role="alert">
          <h3>Before sending, please check {errors.length === 1 ? "this" : "these"}:</h3>
          <ul>
            {errors.map((e, i) => (
              <li key={i}>
                <a href={`#${e.id}`}>{e.msg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Step 0: Original 34 ── */}
      {step === 0 && (
        <>
          <div className="rec-filters" style={{ marginBottom: 16 }}>
            <button
              type="button"
              className="rec-chip"
              aria-pressed={origCat === null}
              onClick={() => setOrigCat(null)}
            >
              All 34
            </button>
            {ORIGINAL_CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                className="rec-chip"
                aria-pressed={origCat === cat}
                onClick={() => setOrigCat(origCat === cat ? null : cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="rec-cards">
            {originalShown.map((r) => (
              <OriginalCard
                key={r.n}
                r={r}
                answer={answerOf("original", r.n)}
                onChange={(a) => setOriginal(r.n, a)}
              />
            ))}
          </div>
        </>
      )}

      {/* ── Step 1: Proposed 34 ── */}
      {step === 1 && (
        <>
          <div className="rec-filters" style={{ marginBottom: 16 }}>
            <button
              type="button"
              className="rec-chip"
              aria-pressed={propSec === null}
              onClick={() => setPropSec(null)}
            >
              All 34
            </button>
            {PROPOSED_SECTIONS.map((s) => (
              <button
                type="button"
                key={s.id}
                className="rec-chip"
                aria-pressed={propSec === s.id}
                onClick={() => setPropSec(propSec === s.id ? null : s.id)}
              >
                {s.numeral}. {s.title}
              </button>
            ))}
          </div>
          <div className="rec-cards">
            {proposedShown.map((r) => (
              <ProposedCard
                key={r.n}
                r={r}
                relatedTitles={r.related.map((n) => ({ n, title: titleOf(n) }))}
                answer={answerOf("proposed", r.n)}
                onChange={(a) => setProposed(r.n, a)}
              />
            ))}
          </div>
        </>
      )}

      {/* ── Step 2: What is missing ── */}
      {step === 2 && (
        <div className="rec-card">
          <label className="rec-label" htmlFor="f-missing">
            {MISSING_PROMPT}
          </label>
          <textarea
            id="f-missing"
            className="rec-textarea"
            style={{ minHeight: 180 }}
            maxLength={5000}
            value={draft.missing}
            onChange={(e) => update((d) => ({ ...d, missing: e.target.value }))}
          />
          <p className="rec-fine">
            Optional. If you would rather submit a full proposal, a source, or a practical
            example, use <Link to={`${REC_BASE}/additions`}>Add to it</Link>.
          </p>
        </div>
      )}

      {/* ── Step 3: About you ── */}
      {step === 3 && (
        <div className="rec-card">
          <p>
            Every field here is optional. Provide contact details only if you want the
            private review link, September 6 gathering details, or project updates.
          </p>
          <p className="rec-legend">
            <b>Privacy.</b> Contact details are stored privately, are never displayed in
            public results, and are never sent to analytics. Aggregate counts are the only
            thing published. You may submit the whole review without giving any contact
            information at all.
          </p>

          <div className="rec-field">
            <label className="rec-label" htmlFor="f-name">
              First name or chosen name
            </label>
            <input
              id="f-name"
              className="rec-input"
              autoComplete="given-name"
              value={c.name}
              maxLength={80}
              onChange={(e) => setContact({ name: e.target.value })}
            />
          </div>

          <div className="rec-field">
            <label className="rec-label" htmlFor="f-email">
              Email
            </label>
            <input
              id="f-email"
              className="rec-input"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={c.email}
              maxLength={160}
              aria-invalid={errors.some((e) => e.id === "f-email") || undefined}
              onChange={(e) => setContact({ email: e.target.value })}
            />
          </div>

          <div className="rec-field">
            <label className="rec-label" htmlFor="f-phone">
              Phone
            </label>
            <input
              id="f-phone"
              className="rec-input"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={c.phone}
              maxLength={40}
              onChange={(e) => setContact({ phone: e.target.value })}
            />
          </div>

          <div className="rec-field">
            <label className="rec-label" htmlFor="f-pref">
              Preferred contact method
            </label>
            <select
              id="f-pref"
              className="rec-select"
              value={c.preferred}
              onChange={(e) => setContact({ preferred: e.target.value })}
            >
              <option value="">No preference given</option>
              {CONTACT_METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="rec-field">
            <label className="rec-label" htmlFor="f-city">
              City
            </label>
            <input
              id="f-city"
              className="rec-input"
              autoComplete="address-level2"
              value={c.city}
              maxLength={80}
              onChange={(e) => setContact({ city: e.target.value })}
            />
          </div>

          <div className="rec-field">
            <label className="rec-label" htmlFor="f-state">
              State
            </label>
            <input
              id="f-state"
              className="rec-input"
              autoComplete="address-level1"
              value={c.state}
              maxLength={60}
              onChange={(e) => setContact({ state: e.target.value })}
            />
          </div>

          <fieldset className="rec-choices">
            <legend>Areas of experience or interest (optional)</legend>
            <div className="rec-opts">
              {INTEREST_AREAS.map((a) => (
                <label className="rec-opt" key={a}>
                  <input
                    type="checkbox"
                    checked={c.interests.includes(a)}
                    onChange={(e) =>
                      setContact({
                        interests: e.target.checked
                          ? [...c.interests, a]
                          : c.interests.filter((x) => x !== a),
                      })
                    }
                  />
                  <span>{a}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="rec-field" style={{ marginTop: 14 }} id="f-consent">
            <label className="rec-opt">
              <input
                type="checkbox"
                checked={c.consent}
                aria-invalid={errors.some((e) => e.id === "f-consent") || undefined}
                onChange={(e) => setContact({ consent: e.target.checked })}
              />
              <span>
                I consent to this project storing the contact details I entered above, kept
                private and used only to reach me about this project.
              </span>
            </label>
          </div>

          <div className="rec-field">
            <label className="rec-opt">
              <input
                type="checkbox"
                checked={c.updates}
                onChange={(e) => setContact({ updates: e.target.checked })}
              />
              <span>
                Send me the private review link, September 6 gathering details, and project
                updates.
              </span>
            </label>
          </div>

          {/* Spam trap — never shown, never announced. */}
          <div className="rec-hp" aria-hidden="true">
            <label htmlFor="f-website">Leave this field empty</label>
            <input
              id="f-website"
              tabIndex={-1}
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* ── Step 4: Final review ── */}
      {step === 4 && (
        <>
          {!reconveneApi.enabled && (
            <div className="rec-status">
              <b>Online submission is not open yet.</b> Nothing is sent to a server, so your
              review lives only in this browser. Send it in or keep it using the options
              below — that is how it counts for now.
            </div>
          )}
          {result && !result.ok && (
            <div className="rec-status rec-status--err" role="alert">
              {result.reason === "offline" && (
                <>
                  <b>Could not reach the server.</b> You appear to be offline. Your review is
                  still saved on this device — try again when you have a connection.
                </>
              )}
              {result.reason === "rejected" && (
                <>
                  <b>The submission was rejected.</b> Check the fields above and try again.
                </>
              )}
              {result.reason === "server" && (
                <>
                  <b>Something went wrong on our side.</b> Nothing was lost — try again in a
                  moment.
                </>
              )}
              {result.reason === "disabled" && (
                <>
                  <b>Submissions are closed.</b> Nothing was stored.
                </>
              )}
            </div>
          )}

          <div className="rec-card">
            <h3>What you are about to send</h3>
            <ul style={{ paddingLeft: "1.1rem", fontSize: "0.88rem" }}>
              <li>
                {Object.values(draft.original).filter((a) => a.choice).length} of 34
                historical resolutions reviewed
              </li>
              <li>
                {Object.values(draft.proposed).filter((a) => a.choice).length} of 34
                proposals reviewed
              </li>
              <li>
                {
                  [...Object.values(draft.original), ...Object.values(draft.proposed)].filter(
                    (a) => a.comment?.trim()
                  ).length
                }{" "}
                comments
              </li>
              <li>{draft.missing.trim() ? "A note on what is missing" : "No note on what is missing"}</li>
              <li>
                {c.email.trim() || c.phone.trim()
                  ? "Contact details (kept private)"
                  : "No contact details"}
              </li>
            </ul>
            <p className="rec-fine">
              Recorded against <code>{RECONVENE_VERSIONS.original}</code> and{" "}
              <code>{RECONVENE_VERSIONS.proposed}</code>, so later edits to the wording cannot
              change what you answered.
            </p>
          </div>

          <div className="rec-card" style={{ marginTop: 14 }}>
            <h3>Your answers</h3>
            <details>
              <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "0.88rem" }}>
                The Original 34
              </summary>
              <div className="rec-tally" style={{ marginTop: 10 }}>
                {ORIGINAL_34.filter((r) => draft.original[String(r.n)]?.choice).map((r) => (
                  <p key={r.n} className="rec-fine" style={{ margin: 0 }}>
                    <b>{r.n}.</b> {r.title} —{" "}
                    {labelOf(ORIGINAL_OPTIONS, draft.original[String(r.n)]?.choice)}
                  </p>
                ))}
                {done === 0 && <p className="rec-fine">Nothing reviewed yet.</p>}
              </div>
            </details>
            <details style={{ marginTop: 10 }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "0.88rem" }}>
                The Proposed New 34
              </summary>
              <div className="rec-tally" style={{ marginTop: 10 }}>
                {PROPOSED_34.filter((r) => draft.proposed[String(r.n)]?.choice).map((r) => (
                  <p key={r.n} className="rec-fine" style={{ margin: 0 }}>
                    <b>{r.n}.</b> {r.title} —{" "}
                    {labelOf(PROPOSED_OPTIONS, draft.proposed[String(r.n)]?.choice)}
                  </p>
                ))}
              </div>
            </details>
          </div>

          <div className="rec-card" style={{ marginTop: 14 }}>
            <h3>Send it in, or keep it</h3>
            <p className="rec-fine">
              Emailing it is what puts your review in front of the project. Saving, copying
              and printing are for your own records — your answers stay in this browser
              otherwise, and clearing your site data would lose them.
            </p>
            {sent && (
              <p className="rec-status rec-status--ok" role="status" aria-live="polite">
                {sent}
              </p>
            )}
            <div className="rec-actions" style={{ marginTop: 4 }}>
              {reconveneApi.enabled && (
                <button type="button" className="rec-btn" onClick={submit} disabled={sending}>
                  {sending ? "Sending…" : "Submit my review"}
                </button>
              )}
              <button
                type="button"
                className={reconveneApi.enabled ? "rec-btn ghost" : "rec-btn"}
                onClick={email}
              >
                Email my review
              </button>
              <button type="button" className="rec-btn ghost" onClick={save}>
                Save a copy
              </button>
              <button type="button" className="rec-btn ghost" onClick={copy}>
                Copy to clipboard
              </button>
              <button type="button" className="rec-btn ghost" onClick={print}>
                Print / save as PDF
              </button>
              {result && !result.ok && result.reason !== "disabled" && (
                <button
                  type="button"
                  className="rec-btn ghost"
                  onClick={submit}
                  disabled={sending}
                >
                  Try again
                </button>
              )}
            </div>
          </div>
          <p className="rec-fine" style={{ marginTop: 12 }}>
            {RECONVENE.safety}
          </p>
        </>
      )}

      <nav className="rec-actions" aria-label="Ballot steps">
        {step > 0 && (
          <button type="button" className="rec-btn ghost" onClick={() => setStep((s) => s - 1)}>
            ← {STEPS[step - 1]}
          </button>
        )}
        {step < STEPS.length - 1 && (
          <button type="button" className="rec-btn" onClick={() => setStep((s) => s + 1)}>
            {STEPS[step + 1]} →
          </button>
        )}
      </nav>
    </ReconveneShell>
  );
}
