import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  projects as allProjects,
  projectDisciplines,
  DISCIPLINES,
  kindOf,
  isExhibited,
  getLens,
  matchesLens,
} from "../data/projects";
import type { Discipline, Project, Lens } from "../data/projects";
import { useReveal } from "../lib/useReveal";
import { useMode } from "../lib/mode";
import { Cover } from "./Cover";

type View = { type: "all" } | { type: "discipline"; d: Discipline } | { type: "lens"; lens: Lens };

/**
 * The archive. "All" shows the exhibited works first, then everything else under
 * "More from the archive". Filtering by a discipline or a lens reveals matching
 * work across the whole body — including chapters nested inside the Lab — so the
 * depth surfaces. Renders as an editorial list (NIL) or a thumbnail grid (Supreme).
 */
export function ArchiveList({
  projects = allProjects,
  filterable = true,
}: {
  projects?: Project[];
  filterable?: boolean;
}) {
  const [searchParams] = useSearchParams();
  const urlLens = getLens(searchParams.get("lens"));
  const urlDiscipline = searchParams.get("d");
  const { mode } = useMode();

  const [view, setView] = useState<View>(() => {
    if (urlLens) return { type: "lens", lens: urlLens };
    if (urlDiscipline && (DISCIPLINES as string[]).includes(urlDiscipline)) {
      return { type: "discipline", d: urlDiscipline as Discipline };
    }
    return { type: "all" };
  });

  // Top-level works (chapters live under their parent) — the "All" view.
  const listable = useMemo(() => projects.filter((p) => !p.chapterOf), [projects]);

  // Disciplines that actually have work across the whole archive (incl chapters).
  const available = useMemo(
    () => DISCIPLINES.filter((d) => projects.some((p) => projectDisciplines(p).includes(d))),
    [projects]
  );

  // The set to render for the current view.
  const filtered = useMemo(() => {
    if (view.type === "discipline") return projects.filter((p) => projectDisciplines(p).includes(view.d));
    if (view.type === "lens") return projects.filter((p) => matchesLens(p, view.lens));
    return [];
  }, [view, projects]);

  const main = useMemo(() => listable.filter((p) => isExhibited(p.slug)), [listable]);
  const rest = useMemo(() => listable.filter((p) => !isExhibited(p.slug)), [listable]);

  useReveal([view, mode]);

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
        <div className="ed-filters" role="tablist" aria-label="Filter the archive">
          <button
            role="tab"
            aria-selected={view.type === "all"}
            className={`ed-filter ${view.type === "all" ? "on" : ""}`}
            onClick={() => setView({ type: "all" })}
          >
            All
          </button>
          {available.map((d) => (
            <button
              key={d}
              role="tab"
              aria-selected={view.type === "discipline" && view.d === d}
              className={`ed-filter ${view.type === "discipline" && view.d === d ? "on" : ""}`}
              onClick={() => setView({ type: "discipline", d })}
            >
              {d}
            </button>
          ))}
        </div>
      )}

      {view.type === "lens" && (
        <div className="ed-lens-banner reveal">
          <div>
            <p className="eyebrow">Lens · {view.lens.label}</p>
            <p className="muted ed-lens-blurb">{view.lens.blurb}</p>
          </div>
          <button className="ed-lens-clear" onClick={() => setView({ type: "all" })}>
            Show all <span className="arr">→</span>
          </button>
        </div>
      )}

      {/* All view — exhibited, then the rest */}
      {view.type === "all" && (
        <>
          {main.length > 0 && renderSet(main)}
          {rest.length > 0 && (
            <>
              <p className="archive-progress reveal">More from the archive</p>
              {renderSet(rest, true)}
            </>
          )}
        </>
      )}

      {/* Filtered view — one set (may include Lab chapters) */}
      {view.type !== "all" &&
        (filtered.length > 0 ? (
          renderSet(filtered)
        ) : (
          <p className="archive-progress reveal">Nothing in this view yet.</p>
        ))}
    </div>
  );
}
