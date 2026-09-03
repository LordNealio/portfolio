import { useId } from "react";
import {
  ORIGINAL_OPTIONS,
  PROPOSED_OPTIONS,
  SOURCES,
  type OriginalResolution,
  type ProposedResolution,
} from "../../data/reconvening34";
import type { ItemAnswer } from "../../lib/reconveneDraft";

// One card renderer for both sets, so no markup is repeated 68 times.

interface Common {
  answer: ItemAnswer;
  onChange: (next: ItemAnswer) => void;
  /** Feedback controls are hidden in read-only contexts (explorers can opt out). */
  interactive?: boolean;
}

export function OriginalCard({
  r,
  answer,
  onChange,
  interactive = true,
}: Common & { r: OriginalResolution }) {
  const gid = useId();
  return (
    <article
      className={`rec-card${answer.choice ? " rec-card--done" : ""}`}
      aria-labelledby={`${gid}-h`}
    >
      <div className="rec-card-head">
        <span className="rec-num" aria-hidden="true">
          {r.n}
        </span>
        <h3 id={`${gid}-h`}>
          <span className="sr-only">Resolution {r.n}. </span>
          {r.title}
        </h3>
      </div>

      <div className="rec-cats">
        {r.categories.map((c) => (
          <span className="rec-cat" key={c}>
            {c}
          </span>
        ))}
      </div>

      <div className="rec-field">
        <span className="rec-field-l">1848 substance — source text</span>
        <p className="rec-source">{r.source}</p>
      </div>

      <div className="rec-field">
        <span className="rec-field-l">In plain language</span>
        <p style={{ margin: 0 }}>{r.plain}</p>
      </div>

      <div className="rec-field">
        <span className="rec-field-l">Why it mattered in 1848</span>
        <p style={{ margin: 0 }}>{r.why}</p>
      </div>

      {r.note && (
        <p className="rec-note">
          <b>Archival note.</b> {r.note}
        </p>
      )}

      <p className="rec-src-link" style={{ margin: "0 0 4px" }}>
        <a href={SOURCES.proceedings} target="_blank" rel="noopener noreferrer">
          Read the published proceedings ↗
        </a>
      </p>

      {interactive && (
        <Choices
          gid={gid}
          legend="How should this carry forward?"
          name={`orig-${r.n}`}
          options={ORIGINAL_OPTIONS}
          answer={answer}
          onChange={onChange}
          commentLabel={`Comment on Resolution ${r.n} (optional)`}
        />
      )}
    </article>
  );
}

export function ProposedCard({
  r,
  relatedTitles,
  answer,
  onChange,
  interactive = true,
}: Common & { r: ProposedResolution; relatedTitles: { n: number; title: string }[] }) {
  const gid = useId();
  const wantsAlt = answer.choice === "alternative" || answer.choice === "support_revised";
  return (
    <article
      className={`rec-card${answer.choice ? " rec-card--done" : ""}`}
      aria-labelledby={`${gid}-h`}
    >
      <div className="rec-card-head">
        <span className="rec-num" aria-hidden="true">
          {r.n}
        </span>
        <h3 id={`${gid}-h`}>
          <span className="sr-only">Proposal {r.n}. </span>
          {r.title}
        </h3>
      </div>

      <div className="rec-field">
        <span className="rec-field-l">What it means</span>
        <p className="rec-source">{r.means}</p>
      </div>

      <div className="rec-field">
        <span className="rec-field-l">Brief reasoning</span>
        <p style={{ margin: 0 }}>{r.why}</p>
      </div>

      {relatedTitles.length > 0 && (
        <div className="rec-field">
          <span className="rec-field-l">Related historical themes</span>
          <p className="rec-fine" style={{ margin: 0 }}>
            {relatedTitles.map((x, i) => (
              <span key={x.n}>
                {i > 0 && " · "}
                Original {x.n} — {x.title}
              </span>
            ))}
          </p>
        </div>
      )}

      {interactive && (
        <Choices
          gid={gid}
          legend="How should this proposal go forward?"
          name={`prop-${r.n}`}
          options={PROPOSED_OPTIONS}
          answer={answer}
          onChange={onChange}
          commentLabel={`Comment on Proposal ${r.n} (optional)`}
          alt={
            wantsAlt
              ? {
                  label: `Alternative wording for Proposal ${r.n} (optional)`,
                  placeholder: "Rewrite it the way you would put it…",
                }
              : undefined
          }
        />
      )}
    </article>
  );
}

function Choices({
  gid,
  legend,
  name,
  options,
  answer,
  onChange,
  commentLabel,
  alt,
}: {
  gid: string;
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  answer: ItemAnswer;
  onChange: (next: ItemAnswer) => void;
  commentLabel: string;
  alt?: { label: string; placeholder: string };
}) {
  return (
    <>
      <fieldset className="rec-choices">
        <legend>{legend}</legend>
        <div className="rec-opts">
          {options.map((o) => (
            <label className="rec-opt" key={o.value}>
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={answer.choice === o.value}
                onChange={() => onChange({ ...answer, choice: o.value })}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {alt && (
        <div className="rec-comment">
          <label className="rec-label" htmlFor={`${gid}-alt`}>
            {alt.label}
          </label>
          <textarea
            id={`${gid}-alt`}
            className="rec-textarea"
            value={answer.alt || ""}
            placeholder={alt.placeholder}
            maxLength={2000}
            onChange={(e) => onChange({ ...answer, alt: e.target.value })}
          />
        </div>
      )}

      <div className="rec-comment">
        <label className="rec-label" htmlFor={`${gid}-c`}>
          {commentLabel}
        </label>
        <textarea
          id={`${gid}-c`}
          className="rec-textarea"
          value={answer.comment || ""}
          maxLength={2000}
          onChange={(e) => onChange({ ...answer, comment: e.target.value })}
        />
      </div>

      {answer.choice && (
        <p className="rec-fine" style={{ margin: "8px 0 0" }}>
          Saved to this device.{" "}
          <button
            type="button"
            className="rec-btn ghost small"
            onClick={() => onChange({})}
            style={{ minHeight: 30, padding: "4px 11px", fontSize: "0.74rem" }}
          >
            Clear
          </button>
        </p>
      )}
    </>
  );
}
