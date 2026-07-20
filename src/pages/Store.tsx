import { Link } from "react-router-dom";
import { useReveal } from "../lib/useReveal";

// One house, presented as collections — Ralph-Lauren-style, not a product grid.
// Everything links into the consolidated NIL — The Label project.
const collections = [
  { name: "NIL Heritage", note: "Timeless staples — polos, oxfords, knitwear, and outerwear.", accent: "#2c3a2c" },
  { name: "NIL Atelier", note: "Runway-inspired. Elevated silhouettes and fabrics.", accent: "#5a2a2e" },
  { name: "NIL Sport", note: "Technical performance and athleisure essentials.", accent: "#1b2a3a" },
  { name: "NIL Chapters", note: "Graphic collections rooted in story, culture, and meaning.", accent: "#16202b" },
  { name: "NIL Reserve", note: "Limited. Numbered. Exclusive.", accent: "#5a2a2e" },
  { name: "The Olympic Collection", note: "Heritage sportswear in the tricolor palette. MMXXIV.", accent: "#9a7628" },
  { name: "The Cloud Collection", note: "Neal = cloud. Behold, he cometh with the clouds — Luke 22:41.", accent: "#8b8370" },
  { name: "Henson Expedition · 1909", note: "Courage. Faith. Endurance. Built for legacy.", accent: "#1b2a3a" },
];

export function Store() {
  useReveal([]);

  return (
    <section className="section page-top">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">The Store · NIL — The Label</p>
          <h1 className="h1">
            Clothing as <span className="serif-i">a language.</span>
          </h1>
          <p className="lead">
            A heritage house built on Name, Image, and Likeness — presented as collections, not
            products. Each is a chapter of the same idea, carried in a crest, a monogram, and a
            tricolor palette. Photography and pieces are in preparation.
          </p>
        </header>

        <div className="collections">
          {collections.map((c) => (
            <Link to="/work/nil-label" className="collection reveal" key={c.name}>
              <div className="collection-plate" style={{ ["--accent" as string]: c.accent }}>
                <span className="collection-mark">NIL</span>
              </div>
              <div className="collection-body">
                <h2 className="h3">{c.name}</h2>
                <p className="muted">{c.note}</p>
                <span className="collection-go">
                  Inside the label <span className="arr">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="store-note reveal">
          <span className="note-tag">In preparation</span> The atelier is assembling photography,
          fabric, and fit. See the full identity in{" "}
          <Link to="/work/nil-label" className="ilink">
            NIL — The Label
          </Link>
          , or join the list on the{" "}
          <Link to="/connect" className="ilink">
            Connect
          </Link>{" "}
          page.
        </p>
      </div>
    </section>
  );
}
