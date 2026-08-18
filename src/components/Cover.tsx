import type { Project } from "../data/projects";
import { isLocked } from "../data/projects";
import { ProjectArt } from "./ProjectArt";

// Renders a project's real cover image when present, otherwise the generative
// placeholder art. Private works show a neutral plate — never their artwork.
export function Cover({ project, variant = "card" }: { project: Project; variant?: "card" | "hero" }) {
  if (isLocked(project.slug)) {
    return (
      <div className={`proj-img proj-img--${variant} proj-private`} role="img" aria-label={`${project.title} — private`}>
        <span className="proj-private-lock" aria-hidden="true">◈</span>
        <span className="proj-private-label">Private</span>
      </div>
    );
  }
  if (project.image) {
    return (
      <img
        className={`proj-img proj-img--${project.imageFit ?? "cover"} proj-img--${variant}${
          project.imageDark ? " proj-img--dark" : ""
        }`}
        src={project.image}
        alt={`${project.title} — cover artwork`}
        decoding="async"
      />
    );
  }
  return <ProjectArt project={project} variant={variant} />;
}
