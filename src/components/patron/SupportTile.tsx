import type { Cta } from "../../data/patron";
import { PatronButton } from "./PatronButton";

/** A compact glass tile — used for non-financial support, big wishes, and the
 *  "how support is used" grid. Icon and CTA are both optional. */
export function SupportTile({
  icon,
  label,
  desc,
  cta,
}: {
  icon?: string;
  label: string;
  desc?: string;
  cta?: Cta;
}) {
  return (
    <article className="pe-tile reveal">
      {icon && (
        <span className="pe-tile-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <h3 className="pe-tile-label">{label}</h3>
      {desc && <p className="pe-tile-desc">{desc}</p>}
      {cta && <PatronButton cta={cta} variant="ghost" className="pe-tile-cta" />}
    </article>
  );
}
