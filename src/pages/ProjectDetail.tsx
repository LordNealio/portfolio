import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, projects, projectDisciplines, STATUS_LABEL } from "../data/projects";
import { Cover } from "../components/Cover";
import { Gallery } from "../components/Gallery";
import { ProjectCard } from "../components/ProjectCard";
import { useReveal } from "../lib/useReveal";

export function ProjectDetail() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;
  useReveal([slug]);

  useEffect(() => {
    if (project) document.title = `${project.title} — NIL · Just Neal`;
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
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
  const disciplines = projectDisciplines(project);
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? projects[idx - 1] : projects[projects.length - 1];
  const next = idx < projects.length - 1 ? projects[idx + 1] : projects[0];

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
              <Cover project={project} variant="hero" />
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
        {project.video && (
          <section className="detail-video reveal">
            <video src={project.video} controls playsInline preload="metadata" />
          </section>
        )}

        {project.audioEmbed && (
          <section className="detail-audio reveal">
            <iframe
              title={`${project.title} — listen`}
              width="100%"
              height="420"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={project.audioEmbed}
            />
          </section>
        )}

        <div className="detail-cols">
          <div className="detail-main">
            {project.problem && <Block title="The problem" body={project.problem} />}
            {project.solution && <Block title="The concept" body={project.solution} />}
            {project.process && <Block title="Process" body={project.process} />}
            {project.lessons && <Block title="What I learned" body={project.lessons} />}
            {project.futureVision && <Block title="Future vision" body={project.futureVision} />}

            {project.features.length > 0 && (
              <section className="detail-block reveal">
                <h2 className="h3">Key features</h2>
                <ul className="feature-list">
                  {project.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="detail-side">
            <div className="side-card reveal">
              <h3 className="side-h">Discipline</h3>
              <div className="side-tags">
                {disciplines.map((d) => (
                  <span className="tag" key={d}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div className="side-card reveal">
              <h3 className="side-h">My role</h3>
              <p className="muted">{project.role}</p>
            </div>
            {project.audience && (
              <div className="side-card reveal">
                <h3 className="side-h">Intended audience</h3>
                <p className="muted">{project.audience}</p>
              </div>
            )}
            {project.technology.length > 0 && (
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
            )}
          </aside>
        </div>

        {project.sections && project.sections.length > 0 && (
          <article className="detail-essay">
            {project.sections.map((s, i) => (
              <section className="essay-section reveal" key={i}>
                {s.heading && <h2 className="essay-h">{s.heading}</h2>}
                {s.sub && <p className="essay-sub">{s.sub}</p>}
                {s.body.split("\n\n").map((para, j) => (
                  <p className="essay-p" key={j}>
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </article>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <Gallery title={project.sections ? "The image" : "Lookbook"} images={project.gallery} />
        )}

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

        {/* Click through the archive */}
        <nav className="detail-nav reveal" aria-label="Browse the archive">
          <Link to={`/work/${prev.slug}`} className="detail-nav-link prev">
            <span className="detail-nav-dir">← Previous</span>
            <span className="detail-nav-title">{prev.title}</span>
          </Link>
          <Link to="/work" className="detail-nav-all">
            All work
          </Link>
          <Link to={`/work/${next.slug}`} className="detail-nav-link next">
            <span className="detail-nav-dir">Next →</span>
            <span className="detail-nav-title">{next.title}</span>
          </Link>
        </nav>
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
