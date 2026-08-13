import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Starfield } from "../components/patron/Starfield";
import { SpendDatShit, type SpendSummary } from "../components/spend/SpendDatShit";
import { money, type Person } from "../data/spend";
import {
  HERO,
  THE_EIGHT,
  THE_EIGHT_INTRO,
  QUESTION,
  POST_VOTE,
  TRANSITION,
  SUMMARY,
  SHARE,
  REAL_SUPPORT,
  DISCLAIMER,
  TITHING_META,
  type TithePerson,
} from "../data/tithing";
import { useReveal } from "../lib/useReveal";

type Phase = "intro" | "spending" | "summary";

const readTally = (): Record<string, number> => {
  try {
    return JSON.parse(localStorage.getItem("tithing.v1.tally") || "{}");
  } catch {
    return {};
  }
};
const reduced = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Count-up animated number, triggered on mount. */
function CountUp({ value, format }: { value: number; format: (n: number) => string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduced()) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1300;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      setN(value * e);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Guarantee the final value even if rAF is throttled (e.g. tab hidden).
    const done = window.setTimeout(() => setN(value), dur + 150);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
    };
  }, [value]);
  return <>{format(n)}</>;
}

export function TithingExperiment() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [selectedId, setSelectedId] = useState(THE_EIGHT[0].id);
  const [vote, setVote] = useState<string | null>(() => {
    try {
      return localStorage.getItem("tithing.v1.vote");
    } catch {
      return null;
    }
  });
  const [transition, setTransition] = useState(false);
  const [summary, setSummary] = useState<SpendSummary | null>(null);
  const [copied, setCopied] = useState(false);
  useReveal([vote, phase, transition]);

  // Cinematic dark — force dark theme while mounted; restore on exit.
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.getAttribute("data-theme");
    root.setAttribute("data-theme", "dark");
    document.title = "The Tithing Experiment — NIL · Just Neal";
    return () => {
      if (prev) root.setAttribute("data-theme", prev);
      else root.removeAttribute("data-theme");
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, []);

  const selected = THE_EIGHT.find((p) => p.id === selectedId) ?? THE_EIGHT[0];
  const respondedCount = THE_EIGHT.filter((p) => p.response && p.response.trim()).length;
  const tithePct = TITHING_META.tithePct;

  // The Eight → Spend Dat Shit people, budget = 90% of net worth.
  const spendPeople: Person[] = THE_EIGHT.map((p) => ({
    id: p.id,
    name: p.name,
    shortName: p.shortName,
    initials: p.initials,
    fortune: Math.round(p.netWorth * (1 - tithePct)),
    accent: p.accent,
  }));

  function castVote(id: string) {
    setVote(id);
    try {
      localStorage.setItem("tithing.v1.vote", id);
      const tally = readTally();
      tally[id] = (tally[id] || 0) + 1;
      localStorage.setItem("tithing.v1.tally", JSON.stringify(tally));
    } catch {
      /* ignore */
    }
  }

  function beginSim() {
    setTransition(false);
    setPhase("spending");
    window.scrollTo(0, 0);
  }
  function handleFinish(s: SpendSummary) {
    setSummary(s);
    setPhase("summary");
    window.scrollTo(0, 0);
  }

  const shareText = summary
    ? `${SHARE.templates[0].replace("{amount}", money(summary.spent))} ${SHARE.templates[1].replace("{person}", summary.personShort)}`
    : "";

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(`${shareText} ${SHARE.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  }
  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "The Tithing Experiment", text: shareText, url: SHARE.url });
      } catch {
        /* cancelled */
      }
    } else {
      copyShare();
    }
  }
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(
    SHARE.url
  )}&hashtags=${encodeURIComponent(SHARE.hashtags)}`;

  // ── SPENDING PHASE — immersive full-screen takeover ──────────────────────
  if (phase === "spending") {
    return (
      <div className="tithing-sim">
        <div className="tithe-simbar">
          <button className="tithe-exit" onClick={() => setPhase("intro")}>
            ← Exit simulation
          </button>
          <span className="tithe-simbar-label">The Tithing Experiment · fictional simulation</span>
        </div>
        <SpendDatShit
          people={spendPeople}
          initialPersonId={selectedId}
          allowSwitch
          titheNote={TRANSITION.banner}
          onFinish={handleFinish}
        />
      </div>
    );
  }

  return (
    <div className="tithing">
      {phase === "summary" && summary ? (
        <SummaryScreen
          summary={summary}
          shareText={shareText}
          xHref={xHref}
          copied={copied}
          onCopy={copyShare}
          onNativeShare={nativeShare}
          onRestart={() => {
            setSummary(null);
            setPhase("intro");
          }}
        />
      ) : (
        <>
          {/* ── HERO ──────────────────────────────────────────────────────── */}
          <header className="t-hero page-top">
            <Starfield />
            <div className="wrap t-hero-inner">
              <p className="t-eyebrow reveal">{HERO.eyebrow}</p>
              <h1 className="display t-title reveal">{HERO.title}</h1>
              <p className="t-sub reveal">{HERO.subtitle}</p>
              <div className="t-hero-body">
                {HERO.body.map((p, i) => (
                  <p className="reveal" key={i}>
                    {p}
                  </p>
                ))}
              </div>
              <div className="t-hero-cta reveal">
                <button className="btn btn-primary btn-lg" onClick={() => setTransition(true)}>
                  Enter the simulation <span className="arr">→</span>
                </button>
                <a className="btn btn-ghost btn-lg" href="#the-eight">
                  Meet the Eight <span className="arr">↓</span>
                </a>
              </div>
            </div>
            <div className="t-hero-fade" aria-hidden="true" />
          </header>

          {/* ── THE EIGHT ─────────────────────────────────────────────────── */}
          <section className="t-section" id="the-eight">
            <div className="wrap">
              <div className="t-head reveal">
                <p className="t-eyebrow">{THE_EIGHT_INTRO.eyebrow}</p>
                <h2 className="h1 t-h">{THE_EIGHT_INTRO.title}</h2>
                <p className="t-note">{THE_EIGHT_INTRO.note}</p>
              </div>
              <div className="t-counter reveal">
                <span className="t-counter-num">
                  {respondedCount} / {THE_EIGHT.length}
                </span>
                <span className="t-counter-label">Responded</span>
              </div>
              <p className="t-pick-hint reveal">
                {POST_VOTE.pickPrompt} — <strong>{selected.name}</strong> selected
              </p>
              <div className="t-eight-grid">
                {THE_EIGHT.map((p) => (
                  <TitheCard key={p.id} person={p} tithePct={tithePct} selected={p.id === selectedId} onSelect={() => setSelectedId(p.id)} />
                ))}
              </div>
              <div className="t-eight-cta reveal">
                <button className="btn btn-primary btn-lg" onClick={() => setTransition(true)}>
                  Spend {selected.shortName}&apos;s remaining 90% <span className="arr">→</span>
                </button>
                <span className="t-eight-cta-note">Pick anyone above, then step into the simulation.</span>
              </div>
            </div>
          </section>

          {/* ── THE QUESTION ──────────────────────────────────────────────── */}
          <section className="t-section t-question">
            <div className="wrap t-question-inner reveal">
              <p className="t-eyebrow">{QUESTION.eyebrow}</p>
              <h2 className="display t-question-h">{QUESTION.headline}</h2>
              <p className="t-question-body">{QUESTION.body}</p>
              <div className="t-vote">
                {QUESTION.options.map((o) => (
                  <button
                    key={o.id}
                    className={`t-vote-btn ${vote === o.id ? "chosen" : ""}`}
                    onClick={() => castVote(o.id)}
                    aria-pressed={vote === o.id}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              {vote && <p className="t-vote-thanks">{QUESTION.thanks}</p>}
            </div>
          </section>

          {/* ── SUPPORT THE IDEA (post-vote) ─────────────────────────────── */}
          {vote && (
            <section className="t-section t-postvote reveal">
              <div className="wrap t-postvote-inner">
                <p className="t-eyebrow">{POST_VOTE.eyebrow}</p>
                <h2 className="h1 t-h">{POST_VOTE.headline}</h2>
                <div className="t-postvote-body">
                  {POST_VOTE.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="t-postvote-selected">
                  <span className="t-ps-avatar" style={{ background: selected.accent }}>
                    {selected.initials}
                  </span>
                  <div>
                    <span className="t-ps-label">Selected fortune</span>
                    <strong>{selected.name}</strong>
                    <span className="t-ps-worth">{money(selected.netWorth, true)} estimated net worth</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-lg t-enter" onClick={() => setTransition(true)}>
                  {POST_VOTE.cta} <span className="arr">→</span>
                </button>
              </div>
            </section>
          )}

          {/* ── REAL SUPPORT ──────────────────────────────────────────────── */}
          <RealSupport />

          <p className="t-disclaimer wrap">{DISCLAIMER}</p>
        </>
      )}

      {/* ── TRANSITION OVERLAY ──────────────────────────────────────────── */}
      {transition && (
        <div className="t-transition" role="dialog" aria-modal="true" aria-label="Entering the simulation">
          <div className="t-transition-inner">
            <p className="t-eyebrow">Simulation begins</p>
            <p className="t-trans-person">
              Selected person
              <strong>{selected.name}</strong>
            </p>
            <div className="t-trans-lines">
              {TRANSITION.lines.map((l, i) => (
                <p key={i}>{l}</p>
              ))}
            </div>
            <div className="t-trans-numbers">
              <div>
                <span className="t-trans-k">{TRANSITION.titheLabel}</span>
                <strong className="t-trans-tithe">
                  <CountUp value={selected.netWorth * tithePct} format={(v) => money(v)} />
                </strong>
              </div>
              <div>
                <span className="t-trans-k">{TRANSITION.budgetLabel}</span>
                <strong className="t-trans-budget">
                  <CountUp value={selected.netWorth * (1 - tithePct)} format={(v) => money(v)} />
                </strong>
              </div>
            </div>
            <div className="t-trans-actions">
              <button className="btn btn-primary btn-lg" onClick={beginSim}>
                {TRANSITION.begin}
              </button>
              <button className="btn btn-ghost" onClick={() => setTransition(false)}>
                Not yet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── The Eight card (selectable) ───────────────────────────────────────────────
function TitheCard({
  person,
  tithePct,
  selected,
  onSelect,
}: {
  person: TithePerson;
  tithePct: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const responded = !!(person.response && person.response.trim());
  return (
    <button className={`t-card reveal ${selected ? "is-selected" : ""}`} onClick={onSelect} aria-pressed={selected}>
      <div className="t-card-top">
        {person.image ? (
          <img className="t-card-photo" src={person.image} alt={person.name} loading="lazy" />
        ) : (
          <span className="t-card-mono" style={{ background: person.accent }} aria-hidden="true">
            {person.initials}
          </span>
        )}
        <div className="t-card-id">
          <h3 className="t-card-name">{person.name}</h3>
          <span className={`t-status ${responded ? "is-yes" : ""}`}>
            <i /> {person.status}
          </span>
        </div>
        {selected && <span className="t-card-check" aria-hidden="true">✓</span>}
      </div>
      <dl className="t-card-meta">
        <div>
          <dt>Est. net worth</dt>
          <dd>{money(person.netWorth, true)}</dd>
        </div>
        <div>
          <dt>Hypothetical 10%</dt>
          <dd className="t-card-tithe">{money(person.netWorth * tithePct, true)}</dd>
        </div>
        <div>
          <dt>Date contacted</dt>
          <dd>{person.dateContacted?.trim() || "—"}</dd>
        </div>
        <div>
          <dt>Response</dt>
          <dd>{person.response?.trim() || "Awaiting reply"}</dd>
        </div>
      </dl>
      {person.notes?.trim() && <p className="t-card-notes">{person.notes}</p>}
    </button>
  );
}

// ── After-simulation summary ─────────────────────────────────────────────────
function SummaryScreen({
  summary,
  shareText,
  xHref,
  copied,
  onCopy,
  onNativeShare,
  onRestart,
}: {
  summary: SpendSummary;
  shareText: string;
  xHref: string;
  copied: boolean;
  onCopy: () => void;
  onNativeShare: () => void;
  onRestart: () => void;
}) {
  return (
    <>
      <section className="t-section t-summary page-top">
        <Starfield count={16} />
        <div className="wrap t-summary-inner reveal">
          <p className="t-eyebrow">The receipt</p>
          <p className="t-summary-spent-label">{SUMMARY.spentLabel}</p>
          <h1 className="display t-summary-spent">{money(summary.spent)}</h1>
          <p className="t-summary-sub">
            of {summary.personName}&apos;s remaining 90% ({money(summary.fortune, true)}) — {summary.percentage < 0.0001 ? "<0.0001" : summary.percentage.toFixed(4)}% spent
          </p>

          {summary.lines.length > 0 && (
            <ul className="t-breakdown">
              {summary.lines
                .slice()
                .sort((a, b) => b.subtotal - a.subtotal)
                .map((l) => (
                  <li key={l.name}>
                    <span className="t-bd-name">
                      {l.name} <em>× {l.qty.toLocaleString()}</em>
                    </span>
                    <span className="t-bd-sub">{money(l.subtotal)}</span>
                  </li>
                ))}
            </ul>
          )}

          {/* Share card */}
          <div className="t-share-card">
            <div className="t-qr" aria-hidden="true">
              ▦
              <span>Scan to visit</span>
            </div>
            <div className="t-share-body">
              <p className="t-share-quote">“{shareText}”</p>
              <p className="t-share-url">{SHARE.url}</p>
              <div className="t-share-actions">
                <button className="btn btn-primary" onClick={onNativeShare}>
                  Share
                </button>
                <button className="btn btn-ghost" onClick={onCopy}>
                  {copied ? "Copied ✓" : "Copy link"}
                </button>
                <a className="btn btn-ghost" href={xHref} target="_blank" rel="noreferrer">
                  Post on X ↗
                </a>
              </div>
            </div>
          </div>

          {/* The 10% question */}
          <div className="t-tenpct">
            <h2 className="h2 t-h">{SUMMARY.tenPctHeadline}</h2>
            <p>{SUMMARY.tenPctBody}</p>
            <div className="t-tenpct-actions">
              <Link className="btn btn-ghost" to={SUMMARY.buttons.learnMore.href}>
                {SUMMARY.buttons.learnMore.label}
              </Link>
              <a className="btn btn-primary" href={SUMMARY.buttons.support.href}>
                {SUMMARY.buttons.support.label}
              </a>
              <button className="btn btn-ghost" onClick={onNativeShare}>
                {SUMMARY.buttons.share.label}
              </button>
              <button className="btn btn-ghost" onClick={onRestart}>
                Run it again
              </button>
              <Link className="btn btn-ghost" to={SUMMARY.buttons.home.href}>
                {SUMMARY.buttons.home.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RealSupport />
      <p className="t-disclaimer wrap">{DISCLAIMER}</p>
    </>
  );
}

// ── Real support (clearly separated from the fictional simulation) ───────────
function RealSupport() {
  return (
    <section className="t-section t-real" id="real-support">
      <div className="wrap">
        <div className="t-head reveal">
          <p className="t-eyebrow t-real-eyebrow">{REAL_SUPPORT.eyebrow}</p>
          <h2 className="h1 t-h">{REAL_SUPPORT.title}</h2>
          <p className="t-note">{REAL_SUPPORT.note}</p>
        </div>
        <div className="t-real-grid">
          {REAL_SUPPORT.cards.map((c) => {
            const href = (c.cta.href || "").trim();
            const inactive = !href || href === "#";
            const internal = href.startsWith("/") || href.startsWith("#");
            return (
              <article className="t-real-card reveal" key={c.title}>
                <h3 className="t-real-title">{c.title}</h3>
                <p className="t-real-desc">{c.desc}</p>
                {inactive ? (
                  <button className="btn btn-ghost" disabled title="Link coming soon">
                    {c.cta.label}
                  </button>
                ) : internal ? (
                  <Link className="btn btn-ghost" to={href}>
                    {c.cta.label} <span className="arr">→</span>
                  </Link>
                ) : (
                  <a className="btn btn-ghost" href={href} target="_blank" rel="noreferrer">
                    {c.cta.label} ↗
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
