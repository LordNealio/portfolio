import type { Project } from "../data/projects";
import { ProjectArt } from "./ProjectArt";

// Renders a project's real cover image when present, otherwise the generative
// placeholder art. Keeps a consistent aspect ratio in both cases.
export function Cover({ project, variant = "card" }: { project: Project; variant?: "card" | "hero" }) {
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
