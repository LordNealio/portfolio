import { useEffect } from "react";
import { Link } from "react-router-dom";
import { exhibitedProjects as featured } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";
import { useReveal } from "../lib/useReveal";
import { track } from "../lib/track";

// Consulting inquiries route here (kept separate from the site's general email).
const CONSULT_EMAIL = "YoungBlesser88@gmail.com";
const WORKSHEET = "/art/tools/problem-map.jpg";

const PILLARS = [
  {
    n: "01",
    title: "See",
    tag: "Find the signal.",
    body: "Research, pattern recognition, interdisciplinary thinking, synthesis, overlooked relationships, hidden opportunities.",
  },
  {
    n: "02",
    title: "Structure",
    tag: "Turn complexity into a system.",
    body: "Frameworks, workflows, strategy, product concepts, processes, research architecture, operational design.",
  },
  {
    n: "03",
    title: "Build",
    tag: "Make the idea usable.",
    body: "Apps, tools, experiences, books, visual frameworks, prototypes, campaigns, experiments.",
  },
];

const ROUTES = [
  {
    evt: "router_idea",
    label: "I have an idea",
    body: "Help me clarify it, structure it, or turn it into something real.",
    cta: "Build with me",
    to: "/bizwiz",
  },
  {
    evt: "router_problem",
    label: "I have a problem",
    body: "Help me see what I'm missing and design a better system.",
    cta: "Work through it",
    to: "/work-with-me",
  },
  {
    evt: "router_lab",
    label: "I want to explore the Lab",
    body: "Follow the investigations across music, language, identity, culture, systems, and meaning.",
    cta: "Enter the Lab",
    to: "/work?lens=investigate",
  },
  {
    evt: "router_collab",
    label: "I want to collaborate",
    body: "Artists, researchers, organizations, builders, educators, and curious people.",
    cta: "Connect",
    to: "/connect",
  },
];

export function Home() {
  useReveal([]);
  useEffect(() => {
    document.title = "Justin Neal — I find the connections other people miss";
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, []);

  // The href="#router" anchor does the scrolling natively (robust everywhere,
  // respects scroll-margin-top); the handler only records the conversion event.
  const goStart = () => track("start_here");

  return (
    <div className="hl">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hl-hero">
        <div className="wrap hl-hero-inner">
          <p className="eyebrow reveal">Just Neal · Research · Systems · Strategy · Story</p>
          <h1 className="hl-hero-h reveal">
            I find the connections <span className="serif-i">other people miss.</span>
          </h1>
          <p className="hl-hero-sub reveal">
            I turn complex ideas, overlooked connections, and unfinished concepts into research,
            systems, tools, stories, and experiences people can actually use.
          </p>
          <div className="hl-cta-row reveal">
            <a href="#router" className="btn btn-primary btn-lg" onClick={goStart}>
              Start here <span className="arr">→</span>
            </a>
            <Link
              to="/work"
              className="btn btn-ghost btn-lg"
              onClick={() => track("explore_work", { from: "hero" })}
            >
              Explore the Archive
            </Link>
          </div>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────────────────────── */}
      <section className="section hl-pillars">
        <div className="wrap">
          <div className="hl-pillar-grid">
            {PILLARS.map((p) => (
              <div className="hl-pillar reveal" key={p.n}>
                <span className="hl-pillar-n">{p.n}</span>
                <h2 className="hl-pillar-title">{p.title}</h2>
                <p className="hl-pillar-tag">{p.tag}</p>
                <p className="hl-pillar-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE ROUTER ───────────────────────────────────────────────────── */}
      <section className="section hl-router" id="router">
        <div className="wrap">
          <header className="section-head reveal">
            <p className="eyebrow">Start here</p>
            <h2 className="h1">
              What brought you <span className="serif-i">here?</span>
            </h2>
          </header>
          <div className="hl-router-grid">
            {ROUTES.map((r) => (
              <Link
                key={r.evt}
                to={r.to}
                className="hl-route reveal"
                onClick={() => track(r.evt)}
              >
                <span className="hl-route-label">{r.label}</span>
                <span className="hl-route-body">{r.body}</span>
                <span className="hl-route-cta">
                  {r.cta} <span className="arr">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ────────────────────────────────────────────────── */}
      <section className="section hl-featured">
        <div className="wrap">
          <header className="section-head reveal">
            <p className="eyebrow">Featured work</p>
            <h2 className="h1">
              A few to <span className="serif-i">start with.</span>
            </h2>
            <p className="lead">
              A small selection from the archive — enough to show the range, not everything at once.
            </p>
          </header>
          <div className="index-grid">
            {featured.map((p) => (
              <div key={p.slug} onClick={() => track("featured_project", { slug: p.slug })}>
                <ProjectCard project={p} size="index" />
              </div>
            ))}
          </div>
          <Link
            to="/work"
            className="btn btn-ghost featured-all reveal"
            onClick={() => track("see_all_work")}
          >
            See all work <span className="arr">→</span>
          </Link>
        </div>
      </section>

      {/* ── CONSULTING / $100 ENTRY OFFER ────────────────────────────────── */}
      <section className="section hl-offer">
        <div className="wrap hl-offer-inner">
          <div className="hl-offer-lead reveal">
            <p className="eyebrow">Consulting</p>
            <h2 className="hl-offer-h">Bring me the mess.</h2>
            <ul className="hl-offer-list">
              <li>An idea you can't organize.</li>
              <li>A project that isn't clicking.</li>
              <li>A system that feels harder than it should.</li>
              <li>A connection you think might matter.</li>
            </ul>
          </div>
          <div className="hl-offer-card reveal">
            <span className="hl-offer-price">$100</span>
            <span className="hl-offer-name">“What am I missing?”</span>
            <p className="hl-offer-desc">
              A focused outside read: what I see, what you may be missing, and what I'd do next. The
              accessible way to start — not cheap consulting.
            </p>
            <a
              className="btn btn-primary"
              href={`mailto:${CONSULT_EMAIL}?subject=${encodeURIComponent("What am I missing? — $100 async review")}`}
              onClick={() => track("start_100")}
            >
              Start with $100 <span className="arr">→</span>
            </a>
            <Link
              to="/work-with-me"
              className="hl-offer-more"
              onClick={() => track("consulting_details")}
            >
              See how it works →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BIZWIZ ───────────────────────────────────────────────────────── */}
      <section className="section hl-bizwiz">
        <div className="wrap hl-split">
          <div className="reveal">
            <p className="eyebrow">Not ready to talk yet?</p>
            <h2 className="hl-split-h">Start with BizWiz.</h2>
          </div>
          <div className="hl-split-body reveal">
            <p>
              A guided diagnostic that helps organize your idea, problem, audience, resources,
              constraints, and next move — before we ever speak. Free, and you keep the map.
            </p>
            <Link to="/bizwiz" className="btn btn-primary" onClick={() => track("open_bizwiz")}>
              Open BizWiz <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FREE RESOURCE ────────────────────────────────────────────────── */}
      <section className="section hl-worksheet">
        <div className="wrap hl-split">
          <div className="reveal">
            <p className="eyebrow">Free resource</p>
            <h2 className="hl-split-h">Start on paper.</h2>
          </div>
          <div className="hl-split-body reveal">
            <p>
              Use this one-page framework to get the problem out of your head and onto something you
              can see.
            </p>
            <div className="hl-cta-row">
              <a
                className="btn btn-primary"
                href={WORKSHEET}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("worksheet_view")}
              >
                View worksheet <span className="arr">→</span>
              </a>
              <a
                className="btn btn-ghost"
                href={WORKSHEET}
                download
                onClick={() => track("worksheet_save")}
              >
                Save / print <span className="arr">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY ──────────────────────────────────────────────────── */}
      <section className="section hl-about">
        <div className="wrap">
          <header className="section-head reveal">
            <p className="eyebrow">The perspective</p>
            <h2 className="h1">
              Built between <span className="serif-i">disciplines.</span>
            </h2>
          </header>
          <p className="hl-about-body reveal">
            Accountant by training. Systems thinker by practice. My background moves through finance,
            operations, research, technology, culture, education, and creative work. The common thread
            is the same: understand the system, find what others are overlooking, and build something
            clearer from it.
          </p>
          <Link to="/about" className="btn btn-ghost reveal" onClick={() => track("about")}>
            About Justin <span className="arr">→</span>
          </Link>
        </div>
      </section>

      {/* ── EPIGRAPH ─────────────────────────────────────────────────────── */}
      <section className="hl-epigraph">
        <div className="wrap">
          <blockquote className="hl-epigraph-q reveal">
            “Know he a genius, he just can't claim it,
            <br />
            cuz they left him no platforms to explain it.”
          </blockquote>
          <cite className="hl-epigraph-cite reveal">— Nipsey Hussle, “Dedication”</cite>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="section hl-final">
        <div className="wrap">
          <h2 className="hl-final-h reveal">
            What are you trying to <span className="serif-i">make happen?</span>
          </h2>
          <p className="hl-final-sub reveal">
            Send me the idea, problem, question, project, or opportunity.
          </p>
          <div className="hl-cta-row reveal">
            <Link
              to="/connect"
              className="btn btn-primary btn-lg"
              onClick={() => track("start_conversation")}
            >
              Start a conversation <span className="arr">→</span>
            </Link>
            <Link
              to="/work"
              className="btn btn-ghost btn-lg"
              onClick={() => track("explore_work", { from: "final" })}
            >
              Explore the Archive
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
