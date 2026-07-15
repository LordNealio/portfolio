import { ProjectGrid } from "../components/ProjectGrid";
import { useReveal } from "../lib/useReveal";

export function Work() {
  useReveal([]);

  return (
    <section className="section page-top">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">The archive</p>
          <h1 className="h1">Everything, honestly labeled.</h1>
          <p className="lead">
            Live products, functional prototypes, and concepts — each marked for what it actually is.
            Nothing here pretends to be further along than it is.
          </p>
        </header>

        <ProjectGrid />
      </div>
    </section>
  );
}
