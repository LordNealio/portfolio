import { Link } from "react-router-dom";
import { projects, STATUS_LABEL } from "../data/projects";
import type { Status } from "../data/projects";
import { useReveal } from "../lib/useReveal";

const order: Status[] = ["live", "prototype", "in-development", "concept", "research", "archived"];
const blurb: Record<Status, string> = {
  live: "Deployed and usable right now.",
  prototype: "Built end-to-end; not yet publicly launched.",
  "in-development": "Actively being built.",
  concept: "Designed and specced as a presentation.",
  research: "Architecture, writing, and frameworks.",
  archived: "Origins and paused work.",
};

export function Now() {
  useReveal([]);
  return (
    <section className="section page-top">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">Now · in development</p>
          <h1 className="h1">Where everything actually stands.</h1>
          <p className="lead">
            A living status board. I keep a strict line between what's finished, what's a prototype,
            and what's still a concept — so you always know what you're looking at.
          </p>
        </header>

        <div className="now-board">
          {order.map((status) => {
            const items = projects.filter((p) => p.status === status);
            if (items.length === 0) return null;
            return (
              <div className="now-col reveal" key={status}>
                <div className="now-col-head">
                  <span className="pill" data-s={status}>
                    <span className="dot" /> {STATUS_LABEL[status]}
                  </span>
                  <span className="now-count">{items.length}</span>
                </div>
                <p className="now-blurb muted">{blurb[status]}</p>
                <ul className="now-list">
                  {items.map((p) => (
                    <li key={p.slug}>
                      <Link to={`/work/${p.slug}`} className="now-item">
                        <span className="now-item-title">{p.title}</span>
                        <span className="muted now-item-sub">{p.subtitle}</span>
                        <span className="arr">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
