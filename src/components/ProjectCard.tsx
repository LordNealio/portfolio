import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { STATUS_LABEL } from "../data/projects";
import { Cover } from "./Cover";

// `size="feature"` = large editorial case-study card. `size="index"` = grid tile.
export function ProjectCard({ project, size = "index" }: { project: Project; size?: "feature" | "index" }) {
  return (
    <Link to={`/work/${project.slug}`} className={`card card--${size} reveal`}>
      <div className="card-art">
        <Cover project={project} />
      </div>
      <div className="card-body">
        <div className="card-top">
          <span className="pill" data-s={project.status}>
            <span className="dot" /> {STATUS_LABEL[project.status]}
          </span>
          <span className="card-cat">{project.category}</span>
        </div>
        <h3 className={size === "feature" ? "h2" : "h3"}>{project.title}</h3>
        <p className="card-sub muted">{size === "feature" ? project.summary : project.subtitle}</p>
        <div className="card-foot">
          <div className="card-tags">
            {project.tags.slice(0, size === "feature" ? 4 : 3).map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          <span className="card-go">
            View <span className="arr">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
