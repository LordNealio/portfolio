import type { Cta, Money } from "../../data/patron";
import { PatronMeter } from "./PatronMeter";
import { PatronButton } from "./PatronButton";

/**
 * A goal-driven support card. Used for the headline funds, the classic-car
 * collection, and per-project funding. `size="feature"` is the large treatment.
 */
export function FundCard({
  eyebrow,
  title,
  subtitle,
  description,
  goal,
  raised,
  cta,
  image,
  monthly = false,
  size = "feature",
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description: string;
  goal: Money;
  raised: Money;
  cta: Cta;
  image?: string;
  monthly?: boolean;
  size?: "feature" | "compact";
  children?: React.ReactNode;
}) {
  const labels = monthly
    ? { goal: "Monthly goal", raised: "Current support", remaining: "Remaining" }
    : { goal: "Goal", raised: "Raised", remaining: "Remaining" };
  return (
    <article className={`pe-fund-card pe-fund-card--${size} reveal`}>
      {image && (
        <div className="pe-fund-media">
          <img src={image} alt={title} loading="lazy" />
        </div>
      )}
      <div className="pe-fund-body">
        {eyebrow && <p className="pe-eyebrow">{eyebrow}</p>}
        <h3 className={size === "feature" ? "h2 pe-fund-title" : "h3 pe-fund-title"}>{title}</h3>
        {subtitle && <p className="pe-fund-sub">{subtitle}</p>}
        <p className="pe-fund-desc">{description}</p>
        {children}
        <PatronMeter goal={goal} raised={raised} labels={labels} compact={size === "compact"} />
        <PatronButton cta={cta} variant="primary" className="pe-fund-cta" />
      </div>
    </article>
  );
}
