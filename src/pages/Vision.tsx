import { Link } from "react-router-dom";
import { getProject } from "../data/projects";
import { philosophy } from "../data/site";
import { useReveal } from "../lib/useReveal";

const layers = [
  { n: "01", name: "Intake", body: "Multimodal input — text, voice, images, PDFs, music." },
  { n: "02", name: "Structuring", body: "AI extraction of themes, emotions, symbols, entities, and timelines." },
  { n: "03", name: "Meaning Graph", body: "Graph-based symbolic memory — relationships and vectors, not just rows." },
  { n: "04", name: "Synthesis", body: "Claude writes creator notes, essays, timelines, and emotional maps." },
  { n: "05", name: "Output", body: "Many interfaces — MindVault, WorkWrite, Throne Talk, and what comes next." },
];

const interfaces = ["mindvault", "workwrite", "mirror"];

export function Vision() {
  useReveal([]);
  const cos = getProject("creation-os");

  return (
    <section className="section page-top">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">The connecting idea</p>
          <h1 className="h1">{philosophy.heading}</h1>
          <p className="lead">{philosophy.body}</p>
        </header>

        <div className="vision-quote reveal">
          <p className="h2 serif-i">
            "Stop building disconnected apps. Build one memory engine — and let insight compound
            across time."
          </p>
        </div>

        <div className="vision-section reveal">
          <p className="eyebrow">Creation OS · the architecture</p>
          <h2 className="h2">One shared intelligence layer, many faces.</h2>
          <p className="lead">
            {cos?.summary} It's the substrate the products plug into — not another app, but the thing
            beneath them.
          </p>
        </div>

        <ol className="layers">
          {layers.map((l) => (
            <li className="layer reveal" key={l.n}>
              <span className="layer-n">{l.n}</span>
              <div>
                <h3 className="layer-name">{l.name}</h3>
                <p className="muted">{l.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="vision-section reveal">
          <p className="eyebrow">The interfaces</p>
          <h2 className="h2">Products that already sit on top.</h2>
          <div className="vision-links">
            {interfaces.map((s) => {
              const p = getProject(s);
              if (!p) return null;
              return (
                <Link key={s} to={`/work/${s}`} className="vision-link">
                  <span className="h3">{p.title}</span>
                  <span className="muted">{p.subtitle}</span>
                  <span className="arr">→</span>
                </Link>
              );
            })}
          </div>
          {cos?.note && <p className="detail-note reveal"><span className="note-tag">Honest status</span> {cos.note}</p>}
        </div>
      </div>
    </section>
  );
}
