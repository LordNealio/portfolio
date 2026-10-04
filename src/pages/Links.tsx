import { useEffect } from "react";
import { Link } from "react-router-dom";
import { track } from "../lib/track";

// THE LINK TREE — the front door at "/". One tap to each corner of the house;
// the full homepage lives at /home. Site nav/footer are hidden here (see App).
type LinkItem = {
  key: string;
  label: string;
  name: string;
  desc: string;
  to: string;
  external?: boolean;
};

const LINKS: LinkItem[] = [
  {
    key: "mindwrite",
    label: "The book",
    name: "MindWrite",
    desc: "A 90-day meditation journal — on Amazon.",
    to: "https://www.amazon.com/MindWrite-90-Day-Meditation-Journal/dp/B0C5PFZV2Z",
    external: true,
  },
  {
    key: "mindvault",
    label: "The app",
    name: "MindVault",
    desc: "Journal, habits, and reflection — private by design.",
    to: "https://mindvault-app-zeta.vercel.app",
    external: true,
  },
  {
    key: "archive",
    label: "The work",
    name: "The Archive",
    desc: "Apps, books, film, research, systems, experiments.",
    to: "/work",
  },
  {
    key: "enigma",
    label: "The mystery",
    name: "The Enigma",
    desc: "Four questions about music — then a pattern that shouldn't exist.",
    to: "/enigma",
  },
  {
    key: "home",
    label: "Everything",
    name: "Enter the site",
    desc: "Research · Systems · Strategy · Story.",
    to: "/home",
  },
];

export function Links() {
  useEffect(() => {
    document.title = "YoungBlesser — Links";
    track("linktree_view");
    return () => {
      document.title = "YoungBlesser";
    };
  }, []);

  return (
    <section className="linktree">
      <div className="linktree-inner">
        <header className="linktree-head">
          <img className="linktree-crest" src="/nil-crest.svg" alt="" width={64} height={64} />
          <h1 className="linktree-title">YoungBlesser</h1>
          <p className="linktree-sub">Justin Neal · Research, systems, strategy &amp; story.</p>
        </header>

        <ul className="linktree-list">
          {LINKS.map((l) => {
            const body = (
              <>
                <span className="linktree-label">{l.label}</span>
                <span className="linktree-name">{l.name}</span>
                <span className="linktree-desc">{l.desc}</span>
                <span className="linktree-arr" aria-hidden="true">
                  {l.external ? "↗" : "→"}
                </span>
              </>
            );
            const onClick = () => track("linktree_click", { key: l.key, to: l.to });
            return (
              <li key={l.key}>
                {l.external ? (
                  <a className="linktree-link" href={l.to} target="_blank" rel="noreferrer" onClick={onClick}>
                    {body}
                  </a>
                ) : (
                  <Link className="linktree-link" to={l.to} onClick={onClick}>
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
