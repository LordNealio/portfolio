import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  projects as allProjects,
  projectDisciplines,
  DISCIPLINES,
  STATUS_LABEL,
} from "../data/projects";
import type { Discipline, Project } from "../data/projects";
import { useReveal } from "../lib/useReveal";

/**
 * The NIL archive — one long curated list. Each entry is an artifact; hovering
 * one reveals its artwork in the background. Editorial, museum-label typography.
 */
export function ArchiveList({ projects = allProjects }: { projects?: Project[] }) {
  const [filter, setFilter] = useState<Discipline | "all">("all");
  const [active, setActive] = useState<Project | null>(null);

  const shown = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => projectDisciplines(p).includes(filter)),
    [filter, projects]
  );

  // Only offer discipline filters that actually have entries.
  const available = useMemo(
    () => DISCIPLINES.filter((d) => projects.some((p) => projectDisciplines(p).includes(d))),
    [projects]
  );

  useReveal([filter]);

  return (
    <div className="archive" onMouseLeave={() => setActive(null)}>
      {/* background artwork reveal */}
      <div className="archive-bg" aria-hidden="true">
        {active &&
          (active.image ? (
            <img key={active.slug} src={active.image} alt="" className="archive-bg-img" />
          ) : (
            <div
              key={active.slug}
              className="archive-bg-wash"
              style={{ ["--wash" as string]: active.accent ?? "var(--gold)" }}
            />
          ))}
      </div>

      <div className="archive-filters reveal" role="tablist" aria-label="Filter the archive by discipline">
        <button
          role="tab"
          aria-selected={filter === "all"}
          className={`afilter ${filter === "all" ? "on" : ""}`}
          onClick={() => setFilter("all")}
        >
          All <span className="afilter-n">{projects.length}</span>
        </button>
        {available.map((d) => (
          <button
            key={d}
            role="tab"
            aria-selected={filter === d}
            className={`afilter ${filter === d ? "on" : ""}`}
            onClick={() => setFilter(d)}
          >
            {d}
          </button>
        ))}
      </div>

      <ol className="archive-list">
        {shown.map((p, i) => (
          <li className="reveal" key={p.slug}>
            <Link
              to={`/work/${p.slug}`}
              className={`arow ${active && active.slug !== p.slug ? "dim" : ""}`}
              onMouseEnter={() => setActive(p)}
              onFocus={() => setActive(p)}
            >
              <span className="arow-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="arow-title">{p.title}</span>
              <span className="arow-disc">{projectDisciplines(p).join(" · ")}</span>
              <span className="arow-meta">
                {STATUS_LABEL[p.status]}
                {p.year ? ` · ${p.year}` : ""}
              </span>
              <span className="arow-arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
