import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, projects, STATUS_LABEL } from "../data/projects";
import { ProjectArt } from "../components/ProjectArt";
import { ProjectCard } from "../components/ProjectCard";
import { useReveal } from "../lib/useReveal";

export function ProjectDetail() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;
  useReveal([slug]);

  useEffect(() => {
    if (project) document.title = `${project.title} — Justin Neal`;
    return () => {
      document.title = "Justin Neal — Founder, Creative Technologist, Systems Thinker";
    };
  }, [project]);

  if (!project) {
    return (
      <section className="section page-top">
        <div className="wrap">
          <h1 className="h1">Project not found</h1>
          <p className="lead">That project doesn't exist (yet).</p>
          <Link to="/work" className="btn btn-ghost">
            ← Back to all work
          </Link>
        </div>
      </section>
    );
  }

  const related = project.relatedProjects
    .map((s) => projects.find((p) => p.slug === s))
    .filter(Boolean) as typeof projects;

  return (
    <article className="detail">
      {/* Hero */}
      <header className="detail-hero page-top" style={{ ["--accent" as string]: project.accent }}>
        <div className="wrap">
          <Link to="/work" className="back-link reveal">
            ← All work
          </Link>
          <div className="detail-hero-grid">
            <div className="reveal">
              <div className="detail-meta">
                <span className="pill" data-s={project.status}>
                  <span className="dot" /> {STATUS_LABEL[project.status]}
                </span>
                <span className="muted">{project.category}</span>
                <span className="muted">· {project.year}</span>
              </div>
              <h1 className="display detail-title">{project.title}</h1>
              <p className="h3 detail-subtitle muted serif-i">{project.subtitle}</p>
              <p className="lead detail-summary">{project.summary}</p>
              {project.links.length > 0 && (
                <div className="detail-links">
                  {project.links.map((l) => (
                    <a key={l.href} className="btn btn-primary" href={l.href} target="_blank" rel="noreferrer">
                      {l.label} <span className="arr">↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="detail-art reveal">
              <ProjectArt project={project} variant="hero" />
            </div>
          </div>
          {project.note && (
            <p className="detail-note reveal">
              <span className="note-tag">Honest status</span> {project.note}
            </p>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="wrap detail-body">
        <div className="detail-cols">
          <div className="detail-main">
            <Block title="The problem" body={project.problem} />
            <Block title="The concept" body={project.solution} />
            {project.process && <Block title="Process" body={project.process} />}
            {project.lessons && <Block title="What I learned" body={project.lessons} />}
            {project.futureVision && <Block title="Future vision" body={project.futureVision} />}

            <section className="detail-block reveal">
              <h2 className="h3">Key features</h2>
              <ul className="feature-list">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="detail-side">
            <div className="side-card reveal">
              <h3 className="side-h">My role</h3>
              <p className="muted">{project.role}</p>
            </div>
            <div className="side-card reveal">
              <h3 className="side-h">Intended audience</h3>
              <p className="muted">{project.audience}</p>
            </div>
            <div className="side-card reveal">
              <h3 className="side-h">Technology</h3>
              <div className="side-tags">
                {project.technology.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="detail-related">
            <h2 className="h2 reveal">Related work</h2>
            <div className="index-grid">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} size="index" />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <section className="detail-block reveal">
      <h2 className="h3">{title}</h2>
      <p>{body}</p>
    </section>
  );
}
