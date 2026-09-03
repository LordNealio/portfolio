import { useRef, useState } from "react";
import {
  ORIGINAL_34,
  PROPOSED_34,
  RECONVENE,
} from "../../data/reconvening34";
import {
  ReconveneShell,
  StandingNotice,
} from "../../components/reconvene/ReconveneShell";
import { reconveneApi, type AdditionPayload, type SubmitResult } from "../../lib/reconveneApi";
import { emailAddition } from "../../lib/reconveneExport";
import { RECONVENE_INBOX } from "../../data/reconvening34";

const KINDS: { value: AdditionPayload["kind"]; label: string; hint: string }[] = [
  { value: "revision", label: "A revision", hint: "Reword an entry that is close but not right." },
  { value: "replacement", label: "A replacement", hint: "Swap an entry for something better." },
  { value: "missing", label: "A missing subject", hint: "Something neither set covers." },
  { value: "source", label: "A source", hint: "A record, document, or study that should inform an entry." },
  { value: "example", label: "A practical example", hint: "Something already working that others could copy." },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ReconveneAdditions() {
  const [kind, setKind] = useState<AdditionPayload["kind"]>("missing");
  const [targetSet, setTargetSet] = useState<"original" | "proposed" | "">("");
  const [targetNumber, setTargetNumber] = useState<string>("");
  const [body, setBody] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [errors, setErrors] = useState<{ id: string; msg: string }[]>([]);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [sending, setSending] = useState(false);
  const started = useRef(Date.now());
  const errRef = useRef<HTMLDivElement | null>(null);

  const needsTarget = kind === "revision" || kind === "replacement";

  const send = async () => {
    const e: { id: string; msg: string }[] = [];
    if (body.trim().length < 12) {
      e.push({ id: "a-body", msg: "Write at least a sentence describing your contribution." });
    }
    if (needsTarget && !targetNumber) {
      e.push({ id: "a-target", msg: "Choose which entry this revises or replaces." });
    }
    if (sourceUrl.trim() && !/^https?:\/\//i.test(sourceUrl.trim())) {
      e.push({ id: "a-url", msg: "A source link should begin with http:// or https://" });
    }
    if (email.trim() && !EMAIL_RE.test(email.trim())) {
      e.push({ id: "a-email", msg: "The email address does not look complete." });
    }
    if (email.trim() && !consent) {
      e.push({ id: "a-consent", msg: "Tick the consent box before sending an email address." });
    }
    setErrors(e);
    if (e.length) {
      errRef.current?.focus();
      return;
    }
    setSending(true);
    const r = await reconveneApi.addition(
      {
        kind,
        targetSet: targetSet || undefined,
        targetNumber: targetNumber ? Number(targetNumber) : null,
        body: body.trim(),
        sourceUrl: sourceUrl.trim() || undefined,
        name: name.trim() || undefined,
        email: email.trim() || undefined,
        consent,
      },
      Date.now() - started.current,
      hp
    );
    setResult(r);
    setSending(false);
    if (r.ok) {
      setBody("");
      setSourceUrl("");
    }
  };

  if (result?.ok) {
    return (
      <ReconveneShell title="Contribution received">
        <div className="rec-card">
          <h2>Received</h2>
          <p>Your contribution has been recorded for review. Keep this code if you want to reference it.</p>
          <p className="rec-code">{result.code}</p>
          <div className="rec-actions">
            <button type="button" className="rec-btn ghost" onClick={() => setResult(null)}>
              Add another
            </button>
          </div>
        </div>
      </ReconveneShell>
    );
  }

  const options = targetSet === "original" ? ORIGINAL_34 : targetSet === "proposed" ? PROPOSED_34 : [];

  return (
    <ReconveneShell title="Add to it">
      <section className="rec-sec">
        <h2>Add to it</h2>
        <p className="rec-lead">
          Propose a revision or a replacement, name a subject both sets miss, point to a
          source that should inform an entry, or describe a practical example already
          working somewhere.
        </p>
        <StandingNotice />
      </section>

      {!reconveneApi.enabled && (
        <div className="rec-status">
          <b>Online submission is not open yet.</b> Fill this in and use{" "}
          <b>Email this contribution</b> — that is how it reaches the project for now.
        </div>
      )}
      {result && !result.ok && result.reason !== "disabled" && (
        <div className="rec-status rec-status--err" role="alert">
          {result.reason === "offline"
            ? "Could not reach the server — you appear to be offline. Your text is still in the form; try again when you have a connection."
            : result.reason === "rejected"
              ? "The contribution was rejected. Check the fields and try again."
              : "Something went wrong on our side. Try again in a moment."}
        </div>
      )}

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

      <div className="rec-card">
        <fieldset className="rec-choices">
          <legend>What kind of contribution is this?</legend>
          <div className="rec-opts">
            {KINDS.map((k) => (
              <label className="rec-opt" key={k.value}>
                <input
                  type="radio"
                  name="a-kind"
                  checked={kind === k.value}
                  onChange={() => setKind(k.value)}
                />
                <span>
                  {k.label}
                  <br />
                  <span className="rec-fine">{k.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="rec-field" style={{ marginTop: 14 }} id="a-target">
          <label className="rec-label" htmlFor="a-set">
            Which set does it concern? {needsTarget ? "(required)" : "(optional)"}
          </label>
          <select
            id="a-set"
            className="rec-select"
            value={targetSet}
            onChange={(e) => {
              setTargetSet(e.target.value as typeof targetSet);
              setTargetNumber("");
            }}
          >
            <option value="">Neither / not specific</option>
            <option value="original">The Original 34 (1848)</option>
            <option value="proposed">The Proposed New 34 (2026)</option>
          </select>
        </div>

        {targetSet && (
          <div className="rec-field">
            <label className="rec-label" htmlFor="a-num">
              Which entry?
            </label>
            <select
              id="a-num"
              className="rec-select"
              value={targetNumber}
              onChange={(e) => setTargetNumber(e.target.value)}
            >
              <option value="">Choose an entry</option>
              {options.map((r) => (
                <option key={r.n} value={r.n}>
                  {r.n}. {r.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="rec-field">
          <label className="rec-label" htmlFor="a-body">
            Your contribution
          </label>
          <textarea
            id="a-body"
            className="rec-textarea"
            style={{ minHeight: 160 }}
            maxLength={5000}
            value={body}
            aria-invalid={errors.some((e) => e.id === "a-body") || undefined}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="rec-field" id="a-url">
          <label className="rec-label" htmlFor="a-src">
            Source link (optional)
          </label>
          <input
            id="a-src"
            className="rec-input"
            type="url"
            inputMode="url"
            placeholder="https://"
            value={sourceUrl}
            maxLength={500}
            onChange={(e) => setSourceUrl(e.target.value)}
          />
        </div>

        <hr className="rec-hr" />

        <p className="rec-legend">
          <b>Privacy.</b> Name and email are optional and are used only to follow up on this
          contribution. They are never published and never sent to analytics.
        </p>

        <div className="rec-field">
          <label className="rec-label" htmlFor="a-name">
            Name (optional)
          </label>
          <input
            id="a-name"
            className="rec-input"
            value={name}
            maxLength={80}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="rec-field" id="a-email">
          <label className="rec-label" htmlFor="a-mail">
            Email (optional)
          </label>
          <input
            id="a-mail"
            className="rec-input"
            type="email"
            inputMode="email"
            value={email}
            maxLength={160}
            aria-invalid={errors.some((e) => e.id === "a-email") || undefined}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="rec-field" id="a-consent">
          <label className="rec-opt">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>
              I consent to this project storing the contact details I entered, kept private
              and used only to reach me about this contribution.
            </span>
          </label>
        </div>

        <div className="rec-hp" aria-hidden="true">
          <label htmlFor="a-website">Leave this field empty</label>
          <input
            id="a-website"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </div>

        <div className="rec-actions">
          {reconveneApi.enabled && (
            <button type="button" className="rec-btn" onClick={send} disabled={sending}>
              {sending ? "Sending…" : "Send contribution"}
            </button>
          )}
          <button
            type="button"
            className={reconveneApi.enabled ? "rec-btn ghost" : "rec-btn"}
            onClick={() => {
              if (body.trim().length < 12) {
                setErrors([
                  { id: "a-body", msg: "Write at least a sentence before emailing it in." },
                ]);
                errRef.current?.focus();
                return;
              }
              emailAddition(
                {
                  kind,
                  targetSet: targetSet || undefined,
                  targetNumber: targetNumber ? Number(targetNumber) : null,
                  body: body.trim(),
                  sourceUrl: sourceUrl.trim() || undefined,
                  name: name.trim() || undefined,
                  email: email.trim() || undefined,
                },
                RECONVENE_INBOX
              );
            }}
          >
            Email this contribution
          </button>
        </div>
        <p className="rec-fine" style={{ marginTop: 12 }}>
          {RECONVENE.safety}
        </p>
      </div>
    </ReconveneShell>
  );
}
