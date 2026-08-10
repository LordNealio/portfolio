import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  projects as allProjects,
  projectDisciplines,
  DISCIPLINES,
  kindOf,
  isExhibited,
} from "../data/projects";
import type { Discipline, Project } from "../data/projects";
import { useReveal } from "../lib/useReveal";
import { useMode } from "../lib/mode";
import { Cover } from "./Cover";

/**
 * The archive — the exhibited works first, then everything else under
 * "In Progress" (still viewable). Renders as an editorial list (NIL) or a dense
 * thumbnail grid (Supreme). Each work shows its kind, with a subtle live dot.
 */
export function ArchiveList({
  projects = allProjects,
  filterable = true,
}: {
  projects?: Project[];
  filterable?: boolean;
}) {
  const [searchParams] = useSearchParams();
  const initialDiscipline = searchParams.get("d");
  const [filter, setFilter] = useState<Discipline | "all">(
    initialDiscipline && (DISCIPLINES as string[]).includes(initialDiscipline)
      ? (initialDiscipline as Discipline)
      : "all"
  );
  const { mode } = useMode();

  // Chapters live under their parent work, not on the grid.
  const listable = useMemo(() => projects.filter((p) => !p.chapterOf), [projects]);

  const shown = useMemo(
    () =>
      filter === "all"
        ? listable
        : listable.filter((p) => projectDisciplines(p).includes(filter)),
    [filter, listable]
  );

  const main = useMemo(() => shown.filter((p) => isExhibited(p.slug)), [shown]);
  const rest = useMemo(() => shown.filter((p) => !isExhibited(p.slug)), [shown]);

  const available = useMemo(
    () => DISCIPLINES.filter((d) => listable.some((p) => projectDisciplines(p).includes(d))),
    [listable]
  );

  useReveal([filter, mode]);

  const renderSet = (list: Project[], forceList = false) =>
    mode === "supreme" && !forceList ? (
      <div className="sup-grid">
        {list.map((p) => (
          <Link to={`/work/${p.slug}`} className="sup-item reveal" key={p.slug}>
            <div className="sup-thumb">
              <Cover project={p} />
            </div>
            <span className="sup-title">{p.title}</span>
            <span className="sup-meta">
              {p.status === "live" && <i className="live-dot" title="Live" />}
              {kindOf(p)}
            </span>
          </Link>
        ))}
      </div>
    ) : (
      <ol className="ed-list">
        {list.map((p) => (
          <li className="reveal" key={p.slug}>
            <Link to={`/work/${p.slug}`} className="ed-item">
              <span className="ed-item-title">{p.title}</span>
              <span className="ed-item-kind">
                {p.status === "live" && <i className="live-dot" title="Live" />}
                {kindOf(p)}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    );

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

      {main.length > 0 && renderSet(main)}

      {rest.length > 0 && (
        <>
          <p className="archive-progress reveal">In Progress</p>
          {renderSet(rest, true)}
        </>
      )}
    </div>
  );
}
