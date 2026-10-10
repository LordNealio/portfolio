import { useEffect } from "react";
import { Link } from "react-router-dom";
import { track } from "../lib/track";

// THE LINK TREE — the front door at "/". MindWrite, MindVault, or the full
// site; the homepage lives at /home. Site nav/footer are hidden here (see App).
type Product = {
  key: string;
  label: string;
  name: string;
  desc: string;
  to: string;
  mark: string;
  markShape: "round" | "square";
};
type Door = { key: string; label: string; to: string };

// Each product wears its own mark: the MindWrite disc, the MindVault Mondrian.
const PRODUCTS: Product[] = [
  {
    key: "mindwrite",
    label: "The journal",
    name: "MindWrite",
    desc: "The 90-day journal method. Capture → Examine → Connect → Create.",
    to: "/work/mindwrite",
    mark: "/mindwrite-mark.svg",
    markShape: "round",
  },
  {
    key: "mindvault",
    label: "The app",
    name: "MindVault",
    desc: "The journal in your pocket — when the notebook isn't with you.",
    to: "/work/mindvault",
    mark: "/mindvault.svg",
    markShape: "square",
  },
];

// Everything else — the homepage, the apps, and the full archive share one card.
const SITE = {
  label: "Everything else",
  name: "Enter the site",
  desc: "Apps, tools, research, writing, and everything in between.",
  doors: [
    { key: "home", label: "Home", to: "/home" },
    { key: "apps", label: "Apps", to: "/work?lens=build" },
    { key: "archive", label: "Archive", to: "/work" },
  ] as Door[],
};

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
          <h1 className="linktree-title">
            YoungBlesser<span className="linktree-tld">.com</span>
          </h1>
          <p className="linktree-sub">
            I find the connections <span className="serif-i">other people miss.</span>
          </p>
        </header>

        <ul className="linktree-list">
          {PRODUCTS.map((p) => (
            <li key={p.key}>
              <Link
                className="linktree-link linktree-link--mark"
                to={p.to}
                onClick={() => track("linktree_click", { key: p.key, to: p.to })}
              >
                <img
                  className={`linktree-mark linktree-mark--${p.markShape}`}
                  src={p.mark}
                  alt=""
                  width={56}
                  height={56}
                />
                <span className="linktree-card-body">
                  <span className="linktree-label">{p.label}</span>
                  <span className="linktree-name">{p.name}</span>
                  <span className="linktree-desc">{p.desc}</span>
                </span>
                <span className="linktree-arr" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
          <li>
            <div className="linktree-card">
              <div className="linktree-card-body">
                <span className="linktree-label">{SITE.label}</span>
                <span className="linktree-name">{SITE.name}</span>
                <span className="linktree-desc">{SITE.desc}</span>
                <div className="linktree-doors">
                  {SITE.doors.map((d) => (
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
        </ul>
      </div>
    </section>
  );
}
