import { useMemo, useState } from "react";
import { projects as allProjects, STATUS_LABEL } from "../data/projects";
import type { Project, Status } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import { useReveal } from "../lib/useReveal";

type Filter = "all" | Status;

const order: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "prototype", label: "Prototype" },
  { key: "concept", label: "Concept" },
  { key: "research", label: "Research" },
  { key: "archived", label: "Archive" },
];

/**
 * Uniform, gallery-style grid of project tiles with optional status filters.
 * Used as the centerpiece on Home and as the full archive on Work.
 */
export function ProjectGrid({
  projects = allProjects,
  showFilters = true,
}: {
  projects?: Project[];
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.status === filter)),
    [filter, projects]
  );

  // Re-scan reveals whenever the filter swaps the visible tiles.
  useReveal([filter, projects]);

  return (
    <>
      {showFilters && (
        <div className="filters reveal" role="tablist" aria-label="Filter projects by status">
          {order.map((f) => {
            const count =
              f.key === "all" ? projects.length : projects.filter((p) => p.status === f.key).length;
            if (count === 0 && f.key !== "all") return null;
            return (
              <button
                key={f.key}
                role="tab"
                aria-selected={filter === f.key}
                className={`filter ${filter === f.key ? "on" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label} <span className="filter-n">{count}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="index-grid">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} size="index" />
        ))}
      </div>

      {shown.length === 0 && (
        <p className="empty muted">
          Nothing in <strong>{STATUS_LABEL[filter as Status]}</strong> yet.
        </p>
      )}
    </>
  );
}
