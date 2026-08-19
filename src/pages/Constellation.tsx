import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  people,
  CONSTELLATION_INTRO,
  CONSTELLATION_CONNECTS,
  CONSTELLATION_INVITATION,
  CONSTELLATION_DISCLAIMER,
} from "../data/people";
import { useReveal } from "../lib/useReveal";

const GROUP_ORDER = [
  "Music, Story & Creative Vision",
  "Complexity, Language & Learning",
  "Spiritual Inquiry",
  "Testimony, Healing & Community",
];

function initials(name: string) {
  const core = name.replace(/\(.*\)/, "").trim();
  const words = core.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function Constellation() {
  useReveal([]);
  useEffect(() => {
    document.title = "The Constellation — NIL · Just Neal";
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, []);

  const groups = GROUP_ORDER.map((g) => ({ group: g, list: people.filter((p) => p.group === g) })).filter(
    (g) => g.list.length > 0
  );

  return (
    <section className="section page-top">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">Inspirations &amp; Dream Collaborators</p>
          <h1 className="h1">
            The <span className="serif-i">Constellation.</span>
          </h1>
          {CONSTELLATION_INTRO.map((p, i) => (
            <p className={i === 0 ? "lead" : "constellation-intro-p"} key={i}>
              {p}
            </p>
          ))}
        </header>

        {groups.map(({ group, list }) => (
          <div className="constellation-group" key={group}>
            <h2 className="group-head reveal">{group}</h2>
            {list.map((p) => (
              <article className="figure reveal" key={p.name}>
                <div className="figure-head">
                  {p.image ? (
                    <img className="figure-photo" src={p.image} alt={p.name} loading="lazy" />
                  ) : (
                    <span className="figure-mono" aria-hidden="true">
                      {initials(p.name)}
                    </span>
                  )}
                  <h3 className="figure-name">{p.name}</h3>
                  <p className="figure-themes">{p.themes}</p>
                </div>
                <div className="figure-body">
                  {p.body.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                  <dl className="figure-meta">
                    {p.connectedWork && (
                      <div>
                        <dt>Connected work</dt>
                        <dd>{p.connectedWork}</dd>
                      </div>
                    )}
                    {p.dreamCollaboration && (
                      <div>
                        <dt>Dream collaboration</dt>
                        <dd>{p.dreamCollaboration}</dd>
                      </div>
                    )}
                  </dl>
                  {p.link && (
                    <a className="figure-link" href={p.link.href} target="_blank" rel="noreferrer">
                      {p.link.label} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ))}

        {/* What connects the constellation */}
        <section className="constellation-connect reveal">
          <h2 className="h2">
            What connects the <span className="serif-i">constellation?</span>
          </h2>
          <p className="lead">{CONSTELLATION_CONNECTS.intro}</p>
          <ul className="connect-list">
            {CONSTELLATION_CONNECTS.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="constellation-intro-p">{CONSTELLATION_CONNECTS.outro}</p>
        </section>

        {/* Open invitation */}
        <section className="constellation-invite reveal">
          <p className="eyebrow">An open invitation</p>
          {CONSTELLATION_INVITATION.map((p, i) => (
            <p className={i === 0 ? "lead" : "constellation-intro-p"} key={i}>
              {p}
            </p>
          ))}
          <div className="invite-cta">
            <Link to="/work" className="btn btn-primary">
              Explore the Archive <span className="arr">→</span>
            </Link>
            <Link to="/connect" className="btn btn-ghost">
              Propose a collaboration
            </Link>
          </div>
        </section>

        <p className="constellation-disclaimer">{CONSTELLATION_DISCLAIMER}</p>
      </div>
    </section>
  );
}
