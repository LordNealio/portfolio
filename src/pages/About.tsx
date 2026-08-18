import { Link } from "react-router-dom";
import { about, org, capabilities } from "../data/site";
import { useReveal } from "../lib/useReveal";

export function About() {
  useReveal([]);
  return (
    <section className="section page-top about-page">
      <div className="wrap about-inner">
        <header className="about-hero">
          <p className="eyebrow reveal">{about.eyebrow}</p>
          <h1 className="display about-name reveal">{about.name}</h1>
          <p className="about-opening reveal">{about.opening}</p>
        </header>

        <figure className="about-portrait reveal">
          <img src="/art/yung-blesser.jpg" alt="Just Neal as a child, captioned Yung Blesser." loading="lazy" />
          <figcaption>Yung Blesser — where it started.</figcaption>
        </figure>

        <div className="about-body">
          {about.intro.map((p, i) => (
            <p className="reveal" key={i}>
              {p}
            </p>
          ))}

          <p className="about-mediums reveal">
            {about.mediums.map((m, i) => (
              <span key={m}>
                {m}
                {i < about.mediums.length - 1 && <i aria-hidden="true"> · </i>}
              </span>
            ))}
          </p>

          <p className="reveal">{about.output}</p>

          <div className="about-refrain reveal">
            {about.refrain.map((l, i) => (
              <p key={i} className={i === about.refrain.length - 1 ? "is-turn" : ""}>
                {l}
              </p>
            ))}
          </div>

          <ol className="about-manifesto reveal">
            {about.manifesto.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ol>

          <p className="about-method-lead reveal">{about.methodLead}</p>
          <div className="about-method reveal">
            {about.methodSteps.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>

          <div className="about-thesis reveal">
            {about.thesis.map((l, i) => (
              <p key={i} className={i === about.thesis.length - 1 ? "is-final" : ""}>
                {l}
              </p>
            ))}
          </div>

          <p className="about-sign reveal">{about.signature}</p>
        </div>

        {/* What I do */}
        <div className="about-capabilities">
          <p className="eyebrow reveal">What I do</p>
          <div className="about-caps reveal">
            {capabilities.map((c) => (
              <span className="about-cap" key={c.title}>
                {c.title}
              </span>
            ))}
          </div>
        </div>

        <div className="about-cta-row reveal">
          <Link to="/work" className="btn btn-primary">
            Explore the archive <span className="arr">→</span>
          </Link>
          <Link to="/work-with-me" className="btn btn-ghost">
            Work with me
          </Link>
        </div>

        {/* Organization callout */}
        <a className="org-card reveal" href={org.url} target="_blank" rel="noreferrer">
          <div className="org-card-badge">Nous</div>
          <div className="org-card-body">
            <p className="eyebrow">The organization behind the work</p>
            <h2 className="h3">{org.name}</h2>
            <p className="muted org-card-desc">{org.description}</p>
          </div>
          <span className="org-card-go">
            Visit <span className="arr">↗</span>
          </span>
        </a>
      </div>
    </section>
  );
}
