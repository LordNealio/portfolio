import { useEffect } from "react";
import { Link } from "react-router-dom";
import { exhibitedProjects as featured } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";
import { useReveal } from "../lib/useReveal";
import { track } from "../lib/track";

const WORKSHEET = "/art/tools/problem-map.jpg";

const PILLARS = [
  {
    n: "01",
    title: "See",
    tag: "Notice the signal.",
    body: "Patterns, questions, and overlooked relationships — across music, language, culture, systems, and meaning.",
  },
  {
    n: "02",
    title: "Structure",
    tag: "Make the complexity legible.",
    body: "Turn a tangle of ideas into a frame you can hold — a map, a system, a way of seeing it.",
  },
  {
    n: "03",
    title: "Build",
    tag: "Make it usable.",
    body: "Apps, tools, books, experiments, investigations — things you can actually read, try, or share.",
  },
];

// Ways to explore — paths into the world, not a sales funnel.
const EXPLORE = [
  {
    evt: "work_selected",
    label: "The work",
    body: "Apps, books, film, research, systems, experiments — the whole archive.",
    cta: "Explore",
    to: "/work",
  },
  {
    evt: "research_selected",
    label: "The research",
    body: "Original legal, scientific, and linguistic investigations.",
    cta: "Read",
    to: "/work?lens=research",
  },
  {
    evt: "project_selected",
    label: "The Lab",
    body: "RapGod, ENIGMA, and the case files — cultural investigation in progress.",
    cta: "Enter",
    to: "/work?lens=investigate",
  },
  {
    evt: "connect_selected",
    label: "A conversation",
    body: "Artists, researchers, organizations, builders, and the curious.",
    cta: "Connect",
    to: "/connect",
  },
];

export function Home() {
  useReveal([]);
  useEffect(() => {
    document.title = "Just Neal — I find the connections other people miss";
    track("homepage_view");
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, []);

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
            A working archive of research, investigations, tools, writing, and things being built —
            connected less by a category than by a way of seeing.
          </p>
          <div className="hl-cta-row reveal">
            <Link
              to="/work"
              className="btn btn-primary btn-lg"
              onClick={() => track("work_selected", { cta_location: "hero" })}
            >
              Explore the work <span className="arr">→</span>
            </Link>
            <a href="#explore" className="btn btn-ghost btn-lg" onClick={() => track("start_here")}>
              Where do I start?
            </a>
          </div>
        </div>
      </section>

      {/* ── POINT OF VIEW ────────────────────────────────────────────────── */}
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

      {/* ── SELECTED WORK (evidence leads) ───────────────────────────────── */}
      <section className="section hl-featured">
        <div className="wrap">
          <header className="section-head reveal">
            <p className="eyebrow">Selected work</p>
            <h2 className="h1">
              A few to <span className="serif-i">start with.</span>
            </h2>
            <p className="lead">
              A small selection from the archive — enough to show the range, not everything at once.
            </p>
          </header>
          <div className="index-grid">
            {featured.map((p) => (
              <div key={p.slug} onClick={() => track("project_selected", { slug: p.slug })}>
                <ProjectCard project={p} size="index" />
              </div>
            ))}
          </div>
          <Link
            to="/work"
            className="btn btn-ghost featured-all reveal"
            onClick={() => track("work_selected", { cta_location: "featured" })}
          >
            See all work <span className="arr">→</span>
          </Link>
        </div>
      </section>

      {/* ── WAYS TO EXPLORE ──────────────────────────────────────────────── */}
      <section className="section hl-router" id="explore">
        <div className="wrap">
          <header className="section-head reveal">
            <p className="eyebrow">Ways to explore</p>
            <h2 className="h1">
              Follow what <span className="serif-i">interests you.</span>
            </h2>
          </header>
          <div className="hl-router-grid">
            {EXPLORE.map((r) => (
              <Link key={r.evt} to={r.to} className="hl-route reveal" onClick={() => track(r.evt, { cta_location: "explore" })}>
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

      {/* ── PARTICIPATE — don't just look, enter ─────────────────────────── */}
      <section className="section hl-participate">
        <div className="wrap">
          <header className="section-head reveal">
            <p className="eyebrow">Participate</p>
            <h2 className="h1">
              Don't just look. <span className="serif-i">Enter.</span>
            </h2>
            <p className="lead">Some of the work is meant to be used, not only read. A couple of things you can try right now.</p>
          </header>
          <div className="hl-participate-grid">
            <div className="hl-part reveal">
              <span className="hl-part-kicker">A tool I built</span>
              <h3 className="hl-part-h">BizWiz</h3>
              <p className="hl-part-body">
                Have an idea or problem you're trying to organize? Run it through BizWiz. It maps it
                back to you — free, and you keep the map.
              </p>
              <Link to="/bizwiz" className="btn btn-primary" onClick={() => track("bizwiz_started", { cta_location: "home" })}>
                Try BizWiz <span className="arr">→</span>
              </Link>
            </div>
            <div className="hl-part reveal">
              <span className="hl-part-kicker">Free framework</span>
              <h3 className="hl-part-h">The Problem Map</h3>
              <p className="hl-part-body">
                A one-page framework to get a problem out of your head and onto something you can see.
                Yours to view and print.
              </p>
              <div className="hl-cta-row">
                <a
                  className="btn btn-primary"
                  href={WORKSHEET}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("tool_started", { tool: "worksheet" })}
                >
                  Open it <span className="arr">→</span>
                </a>
                <a className="btn btn-ghost" href={WORKSHEET} download onClick={() => track("tool_started", { tool: "worksheet_save" })}>
                  Save / print <span className="arr">↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERSPECTIVE ──────────────────────────────────────────────────── */}
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
          <Link to="/about" className="btn btn-ghost reveal" onClick={() => track("navigation_click", { label: "About", to: "/about", cta_location: "home" })}>
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

      {/* ── CONNECT ──────────────────────────────────────────────────────── */}
      <section className="section hl-final">
        <div className="wrap">
          <h2 className="hl-final-h reveal">
            If our paths <span className="serif-i">intersect.</span>
          </h2>
          <p className="hl-final-sub reveal">
            Collaborators, researchers, artists, organizations, the curious — send me the idea,
            question, project, or opportunity.
          </p>
          <div className="hl-cta-row reveal">
            <Link
              to="/connect"
              className="btn btn-primary btn-lg"
              onClick={() => track("connect_selected", { cta_location: "final" })}
            >
              Start a conversation <span className="arr">→</span>
            </Link>
            <Link
              to="/work"
              className="btn btn-ghost btn-lg"
              onClick={() => track("work_selected", { cta_location: "final" })}
            >
              Explore the work
            </Link>
          </div>
          <p className="hl-workwith reveal">
            Want my attention on a specific problem?{" "}
            <Link to="/work-with-me" className="ilink" onClick={() => track("work_with_me_selected", { cta_location: "home" })}>
              Ways to work with me →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
