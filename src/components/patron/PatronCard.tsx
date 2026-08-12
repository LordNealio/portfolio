import type { Patron } from "../../data/patron";

function initials(name: string) {
  const w = name.trim().split(/\s+/).filter(Boolean);
  return ((w[0]?.[0] ?? "") + (w[w.length - 1]?.[0] ?? "")).toUpperCase();
}

/** A dossier-style card for one of "The Eight" — an open, honest invitation. */
export function PatronCard({ person }: { person: Patron }) {
  const responded = !!(person.response && person.response.trim());
  return (
    <article className="pe-patron-card reveal">
      <div className="pe-patron-top">
        {person.image ? (
          <img className="pe-patron-photo" src={person.image} alt={person.name} loading="lazy" />
        ) : (
          <span className="pe-patron-mono" aria-hidden="true">
            {initials(person.name)}
          </span>
        )}
        <div className="pe-patron-id">
          <h3 className="pe-patron-name">{person.name}</h3>
          <span className={`pe-status ${responded ? "is-yes" : ""}`}>
            <i className="pe-status-dot" />
            {person.status}
          </span>
        </div>
      </div>
      <dl className="pe-patron-meta">
        <div>
          <dt>Date contacted</dt>
          <dd>{person.dateContacted?.trim() || "—"}</dd>
        </div>
        <div>
          <dt>Response</dt>
          <dd>{person.response?.trim() || "Awaiting reply"}</dd>
        </div>
        <div>
          <dt>Notes</dt>
          <dd>{person.notes?.trim() || "—"}</dd>
        </div>
      </dl>
    </article>
  );
}
