import { Link } from "react-router-dom";
import { site, org, nil } from "../data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <a className="org-strip" href={org.url} target="_blank" rel="noreferrer">
          <span className="org-badge">Nous</span>
          <span className="org-text">
            <span className="org-name">An initiative of {org.name}</span>
            <span className="org-tag muted">{org.tagline}</span>
          </span>
          <span className="arr" aria-hidden="true">↗</span>
        </a>
        <div className="footer-top">
          <div>
            <p className="eyebrow">The house is open</p>
            <p className="h2 footer-lead">
              For collaborators, clients, investors, and the&nbsp;curious.
            </p>
          </div>
          <div className="footer-cta">
            <a className="btn btn-primary" href={`mailto:${site.contact.email}`}>
              {site.contact.email} <span className="arr">→</span>
            </a>
            <a className="btn btn-ghost" href={site.contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span className="arr">↗</span>
            </a>
          </div>
        </div>
        <hr className="rule" />
        <div className="footer-bottom">
          <span className="muted">
            © {new Date().getFullYear()} NIL · Just Neal · {site.location}
          </span>
          <nav className="footer-nav" aria-label="Footer">
            <Link to="/work">Work</Link>
            <Link to="/store">Store</Link>
            <Link to="/journal">Journal</Link>
            <Link to="/about">About</Link>
            <Link to="/connect">Connect</Link>
          </nav>
          <span className="muted footer-built serif-i">{nil.statement}</span>
        </div>
      </div>
    </footer>
  );
}
