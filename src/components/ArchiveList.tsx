import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects as allProjects, projectDisciplines, DISCIPLINES } from "../data/projects";
import type { Discipline, Project } from "../data/projects";
import { useReveal } from "../lib/useReveal";

/**
 * The archive as an exhibition booklet — a dense, left-aligned list of bold,
 * all-caps names. Typography does the work; no boxes, bullets, or buttons.
 * Hovering the list fades the rest so the eye scans one work at a time.
 */
export function ArchiveList({
  projects = allProjects,
  filterable = true,
}: {
  projects?: Project[];
  filterable?: boolean;
}) {
  const [filter, setFilter] = useState<Discipline | "all">("all");

  const shown = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => projectDisciplines(p).includes(filter)),
    [filter, projects]
  );

  const available = useMemo(
    () => DISCIPLINES.filter((d) => projects.some((p) => projectDisciplines(p).includes(d))),
    [projects]
  );

  useReveal([filter]);

  return (
    <div className="ed-archive">
      {filterable && (
        <div className="ed-filters" role="tablist" aria-label="Filter by discipline">
          <button
            role="tab"
            aria-selected={filter === "all"}
            className={`ed-filter ${filter === "all" ? "on" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          {available.map((d) => (
            <button
              key={d}
              role="tab"
              aria-selected={filter === d}
              className={`ed-filter ${filter === d ? "on" : ""}`}
              onClick={() => setFilter(d)}
            >
              {d}
            </button>
          ))}
        </div>
      )}

      <ol className="ed-list">
        {shown.map((p) => (
          <li className="reveal" key={p.slug}>
            <Link to={`/work/${p.slug}`} className="ed-item">
              {p.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
