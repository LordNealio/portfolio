import { useEffect } from "react";
import { people, type PersonGroup } from "../data/people";
import { useReveal } from "../lib/useReveal";

const GROUP_ORDER: PersonGroup[] = ["Inspirations", "Collaborators", "Researchers"];

function initials(name: string) {
  const core = name.replace(/\(.*\)/, "").trim();
  const words = core.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export function Inspirations() {
  useReveal([]);
  useEffect(() => {
    document.title = "Collaborators & Inspirations — NIL · Just Neal";
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
          <p className="eyebrow">The Circle</p>
          <h1 className="h1">
            Collaborators &amp; <span className="serif-i">Inspirations.</span>
          </h1>
          <p className="lead">
            The people whose work shaped mine, and the people I'd want in the room. A living list —
            artists first, with researchers and future collaborators to come.
          </p>
        </header>

        {groups.map(({ group, list }) => (
          <div className="people-group" key={group}>
            <h2 className="group-head reveal">{group}</h2>
            <div className="people-grid">
              {list.map((p) => {
                const Card: React.ElementType = p.link ? "a" : "div";
                const linkProps = p.link ? { href: p.link, target: "_blank", rel: "noreferrer" } : {};
                return (
                  <Card className="person-card reveal" key={p.name} {...linkProps}>
                    <div className="person-top">
                      {p.image ? (
                        <img className="person-photo" src={p.image} alt={p.name} loading="lazy" />
                      ) : (
                        <span className="person-mono" aria-hidden="true">
                          {initials(p.name)}
                        </span>
                      )}
                      {p.tag && <span className="person-tag">{p.tag}</span>}
                    </div>
                    <h3 className="person-name">{p.name}</h3>
                    <p className="person-role">{p.role}</p>
                    <p className="person-note">{p.note}</p>
                    {p.link && (
                      <span className="person-go" aria-hidden="true">
                        Visit ↗
                      </span>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
