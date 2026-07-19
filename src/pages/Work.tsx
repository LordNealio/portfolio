import { ArchiveList } from "../components/ArchiveList";
import { projects } from "../data/projects";
import { useReveal } from "../lib/useReveal";

export function Work() {
  useReveal([]);

  return (
    <section className="section page-top">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">The Archive · {projects.length} works</p>
          <h1 className="h1">
            Every project is <span className="serif-i">an artifact.</span>
          </h1>
          <p className="lead">
            One long, curated record of the house — apps, fashion, publishing, film, education, and
            research. Hover an entry to glimpse it; open one to enter the room. Each is honestly
            labeled for what it is.
          </p>
        </header>

        <ArchiveList />
      </div>
    </section>
  );
}
