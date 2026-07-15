import { Link } from "react-router-dom";
import { site, experience, education, certifications, capabilities } from "../data/site";
import { useReveal } from "../lib/useReveal";

export function About() {
  useReveal([]);
  return (
    <section className="section page-top">
      <div className="wrap">
        <header className="about-hero">
          <p className="eyebrow reveal">About</p>
          <h1 className="h1 reveal">
            An accountant and educator who
            <br />
            <span className="serif-i gold">builds AI-native products.</span>
          </h1>
          <p className="lead about-lead reveal">{site.positioning}</p>
        </header>

        {/* Narrative */}
        <div className="about-narrative">
          <p className="reveal">
            My background isn't a straight line, and that's the point. I earned a{" "}
            <strong>Master of Accountancy</strong> and spent years in finance — running FP&amp;A for a{" "}
            <strong>$20MM</strong> public-media organization, closing the books on a{" "}
            <strong>$20MM</strong> real-estate portfolio, managing federal grants, and applying Lean
            and Kaizen to make broken processes work. I learned how organizations actually run, where
            money and trust flow, and how to turn ambiguity into a plan.
          </p>
          <p className="reveal">
            I also spent years <strong>teaching</strong> — financial accounting at Miami University and
            English to more than 1,500 students in <strong>South Korea</strong>. Teaching taught me to
            make hard things clear, to design for the person on the other side, and to lead with
            curiosity instead of judgment. That instinct shows up in every product I build.
          </p>
          <p className="reveal">
            Now I use <strong>AI-assisted development</strong> to turn ideas into working software. I'm
            honest about how that works: I originate the concepts, define the products, architect the
            prompts, direct the creative vision, test, and make the final calls — and I use AI as
            leverage to ship faster than a solo founder otherwise could. The result is a body of work
            that spans private journaling, family preservation, workplace wellbeing, education, games,
            music, and cultural storytelling — all pointing at one goal.
          </p>
        </div>

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
