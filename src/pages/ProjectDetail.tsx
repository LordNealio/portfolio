import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, projects, projectDisciplines, kindOf, isLocked, chaptersOf } from "../data/projects";
import { LockGate } from "../components/LockGate";
import { Cover } from "../components/Cover";
import { Gallery } from "../components/Gallery";
import { FeatureLookbook } from "../components/FeatureLookbook";
import { FashionExperience } from "../components/FashionExperience";
import { LabGateway } from "../components/LabGateway";
import { Comments } from "../components/Comments";
import { ProjectCard } from "../components/ProjectCard";
import { useReveal } from "../lib/useReveal";

export function ProjectDetail() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;
  const [unlocked, setUnlocked] = useState(
    () => typeof sessionStorage !== "undefined" && sessionStorage.getItem("nil-unlock") === "1"
  );
  useReveal([slug, unlocked]);

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

  if (isLocked(project.slug) && !unlocked) {
    return (
      <LockGate
        project={project}
        onUnlock={() => {
          try {
            sessionStorage.setItem("nil-unlock", "1");
          } catch {
            /* ignore */
          }
          setUnlocked(true);
        }}
      />
    );
  }

  const related = project.relatedProjects
    .map((s) => projects.find((p) => p.slug === s))
    .filter(Boolean) as typeof projects;
  const chapters = chaptersOf(project.slug);
  const disciplines = projectDisciplines(project);
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? projects[idx - 1] : projects[projects.length - 1];
  const next = idx < projects.length - 1 ? projects[idx + 1] : projects[0];

  if (project.layout === "cinematic") {
    return <FashionExperience project={project} />;
  }
  if (project.layout === "lab") {
    return <LabGateway project={project} />;
  }

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
                <span className="pill">
                  {project.status === "live" && <i className="live-dot" title="Live" />}
                  {kindOf(project)}
                </span>
                <span className="muted">{disciplines.join(" · ")}</span>
                {project.year && <span className="muted">· {project.year}</span>}
              </div>
              <h1 className="display detail-title">{project.title}</h1>
              <p className="h3 detail-subtitle muted serif-i">{project.subtitle}</p>
              <p className="lead detail-summary">{project.summary}</p>
              {(project.links.length > 0 || project.studyPath) && (
                <div className="detail-links">
                  {project.studyPath && (
                    <Link className="btn btn-primary" to={project.studyPath}>
                      Enter the study (preview) <span className="arr">→</span>
                    </Link>
                  )}
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
        {project.feature &&
          (project.featureHotspots && project.featureHotspots.length > 0 && project.gallery && project.gallery.length > 0 ? (
            <FeatureLookbook
              image={project.feature}
              alt={`${project.title} — lookbook`}
              title={project.title}
              images={project.gallery}
              hotspots={project.featureHotspots}
            />
          ) : (
            <section className="detail-feature reveal">
              <img src={project.feature} alt={`${project.title} — overview`} />
            </section>
          ))}

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

        {chapters.length > 0 && (
          <section className="detail-chapters reveal">
            <h2 className="h2">{project.chaptersTitle ?? "Chapters"}</h2>
            {project.chaptersIntro && <p className="lead detail-chapters-intro">{project.chaptersIntro}</p>}
            <div className="chapter-list">
              {chapters.map((c) => (
                <article className="chapter-card reveal" key={c.slug}>
                  <div className="chapter-info">
                    <span className="chapter-kind">
                      {c.status === "live" && <i className="live-dot" title="Live" />}
                      {kindOf(c)}
                    </span>
                    <h3 className="chapter-title">{c.title}</h3>
                    <p className="chapter-sub muted serif-i">{c.subtitle}</p>
                    <p className="chapter-summary">{c.summary}</p>
                    <div className="chapter-links">
                      <Link to={`/work/${c.slug}`} className="btn btn-ghost">
                        Full breakdown <span className="arr">→</span>
                      </Link>
                      {c.links.map((l) => (
                        <a key={l.href} className="btn btn-ghost" href={l.href} target="_blank" rel="noreferrer">
                          {l.label} <span className="arr">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                  {c.video ? (
                    <video className="chapter-media" src={c.video} controls playsInline preload="metadata" />
                  ) : c.image ? (
                    <Link to={`/work/${c.slug}`} className="chapter-media chapter-cover">
                      <img src={c.image} alt={c.title} loading="lazy" />
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        )}

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

        {project.books && project.books.length > 0 && (
          <section className="reading-list">
            <h2 className="h2 reveal">Reading List</h2>
            <ol className="books">
              {project.books.map((b, i) => (
                <li className="reveal" key={b.href}>
                  <a className="book" href={b.href} target="_blank" rel="noreferrer">
                    <span className="book-idx">{String(i + 1).padStart(2, "0")}</span>
                    <span className="book-main">
                      <span className="book-title">{b.title}</span>
                      <span className="book-author">{b.author}</span>
                    </span>
                    <span className="book-go" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
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

        {/* Public feedback — every work except the research studies */}
        {!project.studyPath && <Comments slug={project.slug} />}

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
