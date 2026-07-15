import { site } from "../data/site";
import { useReveal } from "../lib/useReveal";

const invites = [
  "Collaborators & co-founders",
  "Employers & recruiters",
  "Investors",
  "Developers & designers",
  "Nonprofit partners",
  "Educators & researchers",
  "Artists & cultural organizations",
  "Community organizations",
];

export function Contact() {
  useReveal([]);
  return (
    <section className="section page-top contact">
      <div className="wrap contact-inner">
        <p className="eyebrow reveal">Contact & collaboration</p>
        <h1 className="display contact-title reveal">
          Let's build
          <br />
          <span className="serif-i gold">something worth making.</span>
        </h1>
        <p className="lead contact-lead reveal">
          Whether you want to explore a project, collaborate, hire, invest, donate, or just compare
          notes — the door is open.
        </p>

        <div className="contact-cta reveal">
          <a className="btn btn-primary btn-lg" href={`mailto:${site.contact.email}`}>
            {site.contact.email} <span className="arr">→</span>
          </a>
          <a className="btn btn-ghost btn-lg" href={site.contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <span className="arr">↗</span>
          </a>
        </div>

        <div className="contact-invites reveal">
          <p className="eyebrow">Especially glad to hear from</p>
          <ul className="invite-list">
            {invites.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
