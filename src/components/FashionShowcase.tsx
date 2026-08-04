import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { FeatureLookbook } from "./FeatureLookbook";
import { Gallery } from "./Gallery";

/**
 * A full-bleed, cinematic detail layout for the fashion house — a title card,
 * the interactive lookbook index, a sequence of immersive look "scenes" that
 * reveal as you move through them, the house story, and the full lookbook.
 * Rendered instead of the standard case-study body when project.layout ===
 * "cinematic". Kept on a deliberate dark stage in both light and dark themes.
 */
export function FashionShowcase({
  project,
  prev,
  next,
  disciplines,
}: {
  project: Project;
  prev: Project;
  next: Project;
  disciplines: string[];
}) {
  const gallery = project.gallery ?? [];
  const hero = gallery[0];
  // A curated spread of looks for the cinematic sequence (falls back gracefully).
  const sceneIdx = [0, 3, 6, 10, 11, 16].filter((i) => i < gallery.length);
  const collections = ["Heritage", "Atelier", "Sport", "Chapters", "Reserve", "Winter"];

  return (
    <article className="detail fashion-cine">
      <Link to="/work" className="cine-back">
        ← All work
      </Link>

      {/* Title card */}
      <header
        className="cine-hero"
        style={hero ? { backgroundImage: `url(${hero})` } : undefined}
      >
        <div className="cine-hero-inner">
          <p className="cine-eyebrow">{disciplines.join(" · ")}</p>
          <h1 className="cine-title">{project.title}</h1>
          <p className="cine-tagline">{project.subtitle}</p>
          <span className="cine-scroll" aria-hidden="true">
            Scroll to enter ↓
          </span>
        </div>
      </header>

      {/* The interactive index */}
      {project.feature && project.featureHotspots && gallery.length > 0 && (
        <section className="cine-stage cine-index">
          <p className="cine-label reveal">Collection 01 — the index</p>
          <div className="reveal">
            <FeatureLookbook
              image={project.feature}
              alt={`${project.title} — lookbook`}
              title={project.title}
              images={gallery}
              hotspots={project.featureHotspots}
            />
          </div>
        </section>
      )}

      {/* Cinematic look sequence */}
      {sceneIdx.length > 0 && (
        <section className="cine-looks" aria-label="Looks">
          {sceneIdx.map((idx, n) => (
            <figure className="cine-look reveal" key={gallery[idx]}>
              <img src={gallery[idx]} alt={`${project.title} — look ${idx + 1}`} loading="lazy" decoding="async" />
              <figcaption className="cine-look-cap">
                <span className="cine-look-no">{String(n + 1).padStart(2, "0")}</span>
                <span className="cine-look-name">
                  NIL — {collections[n % collections.length]}
                </span>
              </figcaption>
            </figure>
          ))}
        </section>
      )}

      {/* The house story */}
      <section className="cine-stage cine-story">
        <p className="cine-label reveal">The code</p>
        <blockquote className="cine-quote reveal">
          Nil — nothing. Kneel — humility. Neal — a name that lasts.
        </blockquote>
        {project.process && <p className="cine-body reveal">{project.process}</p>}
        {project.solution && <p className="cine-body reveal">{project.solution}</p>}
      </section>

      {/* Collections */}
      {project.features.length > 0 && (
        <section className="cine-stage cine-collections">
          <p className="cine-label reveal">The collections</p>
          <div className="cine-coll-grid">
            {project.features.map((f, i) => {
              const [name, ...rest] = f.split(" — ");
              return (
                <div className="cine-coll reveal" key={f}>
                  <span className="cine-coll-no">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="cine-coll-name">{name}</h3>
                    {rest.length > 0 && <p className="cine-coll-desc">{rest.join(" — ")}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Full lookbook */}
      {gallery.length > 0 && (
        <section className="cine-stage cine-lookbook">
          <Gallery title="The full lookbook" images={gallery} />
        </section>
      )}

      {/* Nav */}
      <nav className="cine-nav" aria-label="Browse the archive">
        <Link to={`/work/${prev.slug}`} className="cine-nav-link">
          <span className="cine-nav-dir">← Previous</span>
          <span className="cine-nav-title">{prev.title}</span>
        </Link>
        <Link to="/work" className="cine-nav-all">
          All work
        </Link>
        <Link to={`/work/${next.slug}`} className="cine-nav-link right">
          <span className="cine-nav-dir">Next →</span>
          <span className="cine-nav-title">{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
