import { Link } from "react-router-dom";
import { site, org, experience, education, certifications, capabilities } from "../data/site";
import { useReveal } from "../lib/useReveal";

export function About() {
  useReveal([]);
  return (
    <section className="section page-top">
      <div className="wrap">
        <header className="about-hero">
          <p className="eyebrow reveal">About</p>
          <h1 className="h1 reveal">
            A lasting creative institution —
            <br />
            <span className="serif-i gold">not a single brand.</span>
          </h1>
          <p className="lead about-lead reveal">
            Justin "Just" Neal is a Creative Director, Systems Designer, and Founder working across AI,
            luxury apparel, publishing, software, and education.
          </p>
        </header>

        {/* Narrative */}
        <div className="about-narrative">
          <p className="reveal">
            Through his creative house, <strong>NIL</strong> (Name. Image. Likeness.), he develops
            interconnected brands, products, and experiences that explore identity through design,
            technology, and storytelling.
          </p>
          <p className="reveal">
            His multidisciplinary approach combines <strong>finance</strong>, <strong>global culture</strong>,{" "}
            <strong>software development</strong>, and <strong>visual communication</strong> into a body
            of work that favors <strong>timeless systems over fleeting trends</strong> — with the
            ambition of building a lasting creative institution rather than a single successful brand.
          </p>
          <p className="reveal">
            That range isn't scattered; it's the point. A Master of Accountancy and years directing
            $20MM of finance taught him how organizations actually run. Teaching — from Miami University
            to classrooms in South Korea — taught him to make hard things clear. NIL is where those
            disciplines meet: one house, many rooms.
          </p>
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

        {/* Capabilities compact */}
        <div className="about-caps reveal">
          {capabilities.map((c) => (
            <span className="about-cap" key={c.title}>
              {c.title}
            </span>
          ))}
        </div>

        {/* Experience */}
        <div className="about-cols">
          <div className="about-main">
            <h2 className="h2 reveal">Experience</h2>
            <ol className="timeline">
              {experience.map((e) => (
                <li className="tl-item reveal" key={e.role + e.org}>
                  <div className="tl-period muted">{e.period}</div>
                  <div className="tl-body">
                    <h3 className="tl-role">{e.role}</h3>
                    <p className="tl-org gold">
                      {e.org}
                      {e.location ? ` · ${e.location}` : ""}
                    </p>
                    <ul>
                      {e.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="about-side">
            <div className="side-card reveal">
              <h3 className="side-h">Education</h3>
              {education.map((ed) => (
                <p key={ed.degree} className="edu-item">
                  <strong>{ed.degree}</strong>
                  <br />
                  <span className="muted">
                    {ed.org} · {ed.year}
                  </span>
                </p>
              ))}
            </div>
            <div className="side-card reveal">
              <h3 className="side-h">Certifications</h3>
              <ul className="cert-list">
                {certifications.map((c) => (
                  <li key={c} className="muted">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="side-card reveal">
              <h3 className="side-h">Based in</h3>
              <p className="muted">{site.location}</p>
              <Link to="/contact" className="btn btn-ghost side-btn">
                Work with me <span className="arr">→</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
