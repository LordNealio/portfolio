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

// The lab leads — it's where people take part in the research and where the
// public learning resources live, so it gets the featured (dark) card.
const LAB: LinkItem = {
  key: "lab",
  label: "The lab · Take part",
  name: "A Black wHole",
  desc: "Join the research, or learn from the open studies and public resources.",
  to: "/work/the-lab",
};

// MindWrite gets one card with two doors — the journal and the app are one
// brand, and the card carries the MindWrite mark rather than the page header.
const MINDWRITE = {
  label: "The journal + the app",
  name: "MindWrite",
  desc: "The 90-day journal method. Capture → Examine → Connect → Create.",
  doors: [
    { key: "mindwrite", label: "Journal", to: "/work/mindwrite" },
    { key: "mindvault", label: "App", to: "/work/mindvault" },
  ],
};

const LINKS: LinkItem[] = [
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
          <p className="eyebrow linktree-eyebrow">Just Neal · Research · Systems · Strategy · Story</p>
          <h1 className="linktree-title">YoungBlesser</h1>
          <p className="linktree-sub">
            I find the connections <span className="serif-i">other people miss.</span>
          </p>
        </header>

        <ul className="linktree-list">
          <li>
            <Link
              className="linktree-link linktree-link--feature"
              to={LAB.to}
              onClick={() => track("linktree_click", { key: LAB.key, to: LAB.to })}
            >
              <span className="linktree-label">{LAB.label}</span>
              <span className="linktree-name">
                A Black w<span className="linktree-bw-h">H</span>ole
              </span>
              <span className="linktree-desc">{LAB.desc}</span>
              <span className="linktree-arr" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
          <li>
            <div className="linktree-card">
              <img className="linktree-mark" src="/mindwrite-mark.svg" alt="" width={56} height={56} />
              <div className="linktree-card-body">
                <span className="linktree-label">{MINDWRITE.label}</span>
                <span className="linktree-name">{MINDWRITE.name}</span>
                <span className="linktree-desc">{MINDWRITE.desc}</span>
                <div className="linktree-doors">
                  {MINDWRITE.doors.map((d) => (
                    <Link
                      key={d.key}
                      className="linktree-door"
                      to={d.to}
                      onClick={() => track("linktree_click", { key: d.key, to: d.to })}
                    >
                      {d.label} <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>
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
