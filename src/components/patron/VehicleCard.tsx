import type { Vehicle } from "../../data/patron";
import { PatronMeter } from "./PatronMeter";
import { PatronButton } from "./PatronButton";

/** A premium garage card — hero image (or gradient placeholder), specs, meter,
 *  and expandable details. Badge marks a NEED vs a DREAM. */
export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const v = vehicle;
  return (
    <article className={`pe-vehicle reveal pe-vehicle--${v.badge.toLowerCase()}`}>
      <div className="pe-vehicle-media" data-badge={v.badge}>
        {v.image ? (
          <img src={v.image} alt={v.name} loading="lazy" />
        ) : (
          <span className="pe-vehicle-ph" aria-hidden="true">
            {v.name}
          </span>
        )}
        <span className="pe-badge">{v.badge}</span>
      </div>
      <div className="pe-vehicle-body">
        <h3 className="h3 pe-vehicle-name">{v.name}</h3>
        {v.model && <p className="pe-vehicle-model">{v.model}</p>}
        <p className="pe-vehicle-desc">{v.description}</p>

        {v.specs && v.specs.length > 0 && (
          <dl className="pe-specs">
            {v.specs.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <PatronMeter goal={v.goal} raised={v.raised} compact />
        <div className="pe-vehicle-actions">
          <PatronButton cta={v.cta} variant="primary" />
          {v.details && v.details.length > 0 && (
            <details className="pe-vehicle-details">
              <summary>Details</summary>
              {v.details.map((d, i) => (
                <p key={i}>{d}</p>
              ))}
            </details>
          )}
        </div>
      </div>
    </article>
  );
}
