import { Link } from "react-router-dom";
import type { Cta } from "../../data/patron";

/**
 * Renders a CTA from config as the right element:
 *  • "/route"   → in-app <Link>
 *  • "#anchor"  → in-page anchor
 *  • "https://" → external link (new tab)
 *  • "" / "#"   → inactive button (link not configured yet)
 */
export function PatronButton({
  cta,
  variant = "primary",
  size,
  className = "",
}: {
  cta: Cta;
  variant?: "primary" | "ghost";
  size?: "lg";
  className?: string;
}) {
  const cls = `btn btn-${variant} ${size === "lg" ? "btn-lg" : ""} ${className}`.trim();
  const href = (cta.href || "").trim();
  const arrow = <span className="arr" aria-hidden="true">→</span>;

  if (!href || href === "#") {
    return (
      <button className={cls} disabled title="Link coming soon">
        {cta.label}
      </button>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link className={cls} to={href}>
        {cta.label} {arrow}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a className={cls} href={href}>
        {cta.label} {arrow}
      </a>
    );
  }
  return (
    <a className={cls} href={href} target="_blank" rel="noreferrer">
      {cta.label} <span className="arr" aria-hidden="true">↗</span>
    </a>
  );
}
