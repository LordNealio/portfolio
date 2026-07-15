import { Link } from "react-router-dom";
import { site } from "../data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <p className="eyebrow">Let's build something</p>
            <p className="h2 footer-lead">
              Open to collaborators, employers, investors, nonprofit&nbsp;partners, and the
              genuinely&nbsp;curious.
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
          <span className="muted">© {new Date().getFullYear()} {site.name} · {site.location}</span>
          <nav className="footer-nav" aria-label="Footer">
            <Link to="/work">Work</Link>
            <Link to="/vision">Vision</Link>
            <Link to="/about">About</Link>
            <Link to="/now">Now</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <span className="muted footer-built">Designed &amp; directed by Justin Neal · built with AI assistance</span>
        </div>
      </div>
    </footer>
  );
}
