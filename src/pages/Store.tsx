import { Link } from "react-router-dom";
import { projects, projectDisciplines } from "../data/projects";
import { useReveal } from "../lib/useReveal";

// The Store presents fashion as collections, not a product grid — Ralph Lauren,
// not Shopify. Collections are drawn from the Fashion discipline in the archive.
export function Store() {
  useReveal([]);
  const collections = projects.filter((p) => projectDisciplines(p).includes("Fashion"));

  return (
    <section className="section page-top">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">The Store · Collections</p>
          <h1 className="h1">
            Clothing as <span className="serif-i">a language.</span>
          </h1>
          <p className="lead">
            NIL dresses the idea of Name, Image, and Likeness. Presented as collections, not
            products — each one a chapter of the house. Photography and pieces are in preparation.
          </p>
        </header>

        <div className="collections">
          {collections.map((c) => (
            <Link to={`/work/${c.slug}`} className="collection reveal" key={c.slug}>
              <div
                className="collection-plate"
                style={{ ["--accent" as string]: c.accent ?? "var(--gold)" }}
              >
                <span className="collection-mark">NIL</span>
              </div>
              <div className="collection-body">
                <h2 className="h3">{c.title}</h2>
                <p className="muted">{c.subtitle}</p>
                <span className="collection-go">
                  View the collection <span className="arr">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="store-note reveal">
          <span className="note-tag">In preparation</span> The atelier is assembling photography,
          fabric, and fit. Join the list on the{" "}
          <Link to="/connect" className="ilink">
            Connect
          </Link>{" "}
          page to be told when a collection opens.
        </p>
      </div>
    </section>
  );
}
