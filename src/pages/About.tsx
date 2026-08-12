import { Link } from "react-router-dom";
import { org, backstory, capabilities } from "../data/site";
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
            Just Neal is a Creative Director, Systems Designer, and Founder working across AI, luxury
            apparel, publishing, software, and education.
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
            That range isn't scattered; it's the point. A background in finance and operations taught
            him how organizations actually run. Years of teaching taught him to make hard things clear.
            NIL is where those disciplines meet: one house, many rooms.
          </p>
        </div>

        {/* Backstory */}
        <div className="backstory">
          <p className="eyebrow reveal">The backstory</p>
          <figure className="backstory-photo reveal">
            <img src="/art/yung-blesser.jpg" alt="Just Neal as a child, captioned Yung Blesser." loading="lazy" />
            <figcaption>Yung Blesser — where it started.</figcaption>
          </figure>
          {backstory.map((b) => (
            <div className="backstory-item reveal" key={b.q}>
              <h2 className="backstory-q">{b.q}</h2>
              <p className="backstory-a">{b.a}</p>
            </div>
          ))}
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

        {/* Capabilities */}
        <div className="about-capabilities">
          <p className="eyebrow reveal">What I do</p>
          <div className="about-caps reveal">
            {capabilities.map((c) => (
              <span className="about-cap" key={c.title}>
                {c.title}
              </span>
            ))}
          </div>
          <Link to="/connect" className="btn btn-ghost about-cta reveal">
            Work with me <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
