import { useEffect } from "react";
import { useReveal } from "../lib/useReveal";
import {
  HERO,
  WHY_EXISTS,
  THE_EIGHT_INTRO,
  THE_EIGHT,
  FUNDS_INTRO,
  FUNDS,
  GARAGE_INTRO,
  GARAGE,
  COLLECTION,
  WISHLIST,
  DIRECT_SUPPORT,
  PROJECT_FUNDS_INTRO,
  PROJECT_FUNDS,
  NON_FINANCIAL_INTRO,
  NON_FINANCIAL,
  BIG_WISHES_INTRO,
  BIG_WISHES,
  HOW_USED_INTRO,
  HOW_USED,
  WHY_ASKING,
  FINAL_CTA,
} from "../data/patron";
import { Starfield } from "../components/patron/Starfield";
import { PatronCard } from "../components/patron/PatronCard";
import { FundCard } from "../components/patron/FundCard";
import { VehicleCard } from "../components/patron/VehicleCard";
import { SupportTile } from "../components/patron/SupportTile";
import { PatronButton } from "../components/patron/PatronButton";
import { PatronMeter } from "../components/patron/PatronMeter";

export function PatronExperiment() {
  useReveal([]);

  // The page is cinematic dark — force dark theme while mounted, restore after.
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.getAttribute("data-theme");
    root.setAttribute("data-theme", "dark");
    document.title = "The Patron Experiment — NIL · Just Neal";
    return () => {
      if (prev) root.setAttribute("data-theme", prev);
      else root.removeAttribute("data-theme");
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, []);

  const respondedCount = THE_EIGHT.filter((p) => p.response && p.response.trim()).length;

  return (
    <div className="patron">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <header className="pe-hero page-top">
        <Starfield />
        <div className="wrap pe-hero-inner">
          <p className="pe-eyebrow reveal">{HERO.eyebrow}</p>
          <h1 className="display pe-title reveal">{HERO.title}</h1>
          <p className="pe-sub reveal">{HERO.subtitle}</p>
          <div className="pe-hero-body">
            {HERO.body.map((p, i) => (
              <p className="reveal" key={i}>
                {p}
              </p>
            ))}
          </div>
          <div className="pe-hero-cta reveal">
            <PatronButton cta={{ label: "See how to help", href: "#direct-support" }} variant="primary" size="lg" />
            <PatronButton cta={{ label: "The Eight", href: "#the-eight" }} variant="ghost" size="lg" />
          </div>
        </div>
        <div className="pe-hero-fade" aria-hidden="true" />
      </header>

      {/* ── WHY THIS EXISTS ──────────────────────────────────────────────── */}
      <section className="pe-section pe-why">
        <div className="wrap pe-editorial">
          <div className="pe-editorial-head reveal">
            <p className="pe-eyebrow">{WHY_EXISTS.eyebrow}</p>
            <h2 className="h1 pe-h">{WHY_EXISTS.title}</h2>
          </div>
          <div className="pe-editorial-body">
            {WHY_EXISTS.body.map((p, i) => (
              <p className="reveal" key={i}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE EIGHT ────────────────────────────────────────────────────── */}
      <section className="pe-section pe-eight" id="the-eight">
        <div className="wrap">
          <div className="pe-section-head reveal">
            <p className="pe-eyebrow">{THE_EIGHT_INTRO.eyebrow}</p>
            <h2 className="display pe-h">{THE_EIGHT_INTRO.title}</h2>
            <div className="pe-section-lede">
              {THE_EIGHT_INTRO.body.map((p, i) => (
                <p key={i} className={i === 1 ? "pe-emphasis" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="pe-counter reveal">
            <span className="pe-counter-num">
              {respondedCount} / {THE_EIGHT.length}
            </span>
            <span className="pe-counter-label">Responded</span>
          </div>

          <div className="pe-eight-grid">
            {THE_EIGHT.map((p) => (
              <PatronCard key={p.name} person={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WOULD CHANGE EVERYTHING ─────────────────────────────────── */}
      <section className="pe-section pe-funds">
        <div className="wrap">
          <div className="pe-section-head reveal">
            <p className="pe-eyebrow">{FUNDS_INTRO.eyebrow}</p>
            <h2 className="h1 pe-h">{FUNDS_INTRO.title}</h2>
            <div className="pe-section-lede">
              {FUNDS_INTRO.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="pe-fund-grid">
            {FUNDS.map((f) => (
              <FundCard
                key={f.id}
                eyebrow={f.eyebrow}
                title={f.title}
                subtitle={f.subtitle}
                description={f.description}
                goal={f.goal}
                raised={f.raised}
                cta={f.cta}
                monthly={f.id === "monthly-patronage"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── GARAGE GOALS ─────────────────────────────────────────────────── */}
      <section className="pe-section pe-garage">
        <div className="wrap">
          <div className="pe-section-head reveal">
            <p className="pe-eyebrow">{GARAGE_INTRO.eyebrow}</p>
            <h2 className="h1 pe-h">{GARAGE_INTRO.title}</h2>
            <div className="pe-section-lede">
              {GARAGE_INTRO.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="pe-vehicle-grid">
            {GARAGE.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>

          {/* Classic collection */}
          <article className="pe-collection reveal">
            <div className="pe-collection-body">
              <p className="pe-eyebrow">{COLLECTION.eyebrow}</p>
              <h3 className="h2 pe-h">{COLLECTION.title}</h3>
              <p className="pe-fund-desc">{COLLECTION.description}</p>
              <PatronMeter
                goal={COLLECTION.goal}
                raised={COLLECTION.raised}
                labels={{ goal: "Goal", raised: "Raised", remaining: "Remaining" }}
              />
              <PatronButton cta={COLLECTION.cta} variant="primary" className="pe-fund-cta" />
            </div>
            <div className="pe-collection-cars">
              {COLLECTION.cars.map((c, i) => (
                <div className="pe-car-slot" key={i}>
                  {c.image ? (
                    <img src={c.image} alt={c.name || `Collection car ${i + 1}`} loading="lazy" />
                  ) : (
                    <span className="pe-car-ph" aria-hidden="true">
                      ⌁
                    </span>
                  )}
                  <span className="pe-car-status">{c.status}</span>
                  {c.name && <span className="pe-car-name">{c.name}</span>}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* ── AMAZON WISHLIST ──────────────────────────────────────────────── */}
      <section className="pe-section pe-wishlist">
        <div className="wrap pe-wishlist-inner reveal">
          <p className="pe-eyebrow">{WISHLIST.eyebrow}</p>
          <h2 className="h1 pe-h">{WISHLIST.title}</h2>
          <div className="pe-section-lede">
            {WISHLIST.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <PatronButton cta={WISHLIST.cta} variant="primary" size="lg" />
        </div>
      </section>

      {/* ── DIRECT SUPPORT ───────────────────────────────────────────────── */}
      <section className="pe-section pe-direct" id="direct-support">
        <div className="wrap">
          <div className="pe-section-head reveal">
            <p className="pe-eyebrow">{DIRECT_SUPPORT.eyebrow}</p>
            <h2 className="h1 pe-h">{DIRECT_SUPPORT.title}</h2>
          </div>
          <div className="pe-pay-grid">
            {DIRECT_SUPPORT.methods.map((m) => (
              <article className="pe-pay-card reveal" key={m.name}>
                <div className="pe-qr">
                  {m.qr ? <img src={m.qr} alt={`${m.name} QR code`} /> : <span aria-hidden="true">▦</span>}
                </div>
                <div className="pe-pay-info">
                  <h3 className="h3">{m.name}</h3>
                  <p className="pe-pay-handle">{m.handle}</p>
                  {m.note && <p className="pe-pay-note">{m.note}</p>}
                  <PatronButton
                    cta={{ label: `Support via ${m.name}`, href: m.href || "" }}
                    variant="ghost"
                  />
                </div>
              </article>
            ))}
          </div>
          <p className="pe-disclaimer reveal">{DIRECT_SUPPORT.disclaimer}</p>
        </div>
      </section>

      {/* ── FUND A SPECIFIC PROJECT ──────────────────────────────────────── */}
      <section className="pe-section pe-projects">
        <div className="wrap">
          <div className="pe-section-head reveal">
            <p className="pe-eyebrow">{PROJECT_FUNDS_INTRO.eyebrow}</p>
            <h2 className="h1 pe-h">{PROJECT_FUNDS_INTRO.title}</h2>
          </div>
          <div className="pe-proj-grid">
            {PROJECT_FUNDS.map((p) => (
              <FundCard
                key={p.name}
                title={p.name}
                description={p.description}
                goal={p.goal}
                raised={p.raised}
                cta={p.cta}
                image={p.image}
                size="compact"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORT COMES IN MANY FORMS ──────────────────────────────────── */}
      <section className="pe-section pe-forms">
        <div className="wrap">
          <div className="pe-section-head reveal">
            <p className="pe-eyebrow">{NON_FINANCIAL_INTRO.eyebrow}</p>
            <h2 className="h1 pe-h">{NON_FINANCIAL_INTRO.title}</h2>
          </div>
          <div className="pe-tile-grid">
            {NON_FINANCIAL.map((s) => (
              <SupportTile key={s.label} label={s.label} desc={s.desc} cta={s.cta} />
            ))}
          </div>
        </div>
      </section>

      {/* ── THE BIG WISHES ───────────────────────────────────────────────── */}
      <section className="pe-section pe-wishes">
        <div className="wrap">
          <div className="pe-section-head reveal">
            <p className="pe-eyebrow">{BIG_WISHES_INTRO.eyebrow}</p>
            <h2 className="h1 pe-h">{BIG_WISHES_INTRO.title}</h2>
            <div className="pe-section-lede">
              {BIG_WISHES_INTRO.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="pe-tile-grid pe-tile-grid--wishes">
            {BIG_WISHES.map((w) => (
              <SupportTile key={w.label} label={w.label} desc={w.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW SUPPORT IS USED ──────────────────────────────────────────── */}
      <section className="pe-section pe-used">
        <div className="wrap">
          <div className="pe-section-head reveal">
            <p className="pe-eyebrow">{HOW_USED_INTRO.eyebrow}</p>
            <h2 className="h1 pe-h">{HOW_USED_INTRO.title}</h2>
            <p className="pe-section-lede">{HOW_USED_INTRO.note}</p>
          </div>
          <div className="pe-used-grid reveal">
            {HOW_USED.map((c) => (
              <div className="pe-used-item" key={c.label}>
                <span className="pe-used-icon" aria-hidden="true">
                  {c.icon}
                </span>
                <span className="pe-used-label">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY I'M ASKING ───────────────────────────────────────────────── */}
      <section className="pe-section pe-why-asking">
        <div className="wrap pe-editorial">
          <div className="pe-editorial-head reveal">
            <p className="pe-eyebrow">{WHY_ASKING.eyebrow}</p>
            <h2 className="h1 pe-h">{WHY_ASKING.title}</h2>
          </div>
          <div className="pe-editorial-body">
            {WHY_ASKING.body.map((p, i) => (
              <p className="reveal" key={i}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="pe-section pe-final">
        <Starfield count={20} />
        <div className="wrap pe-final-inner reveal">
          <h2 className="display pe-final-h">{FINAL_CTA.headline}</h2>
          <div className="pe-final-body">
            {FINAL_CTA.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="pe-final-actions">
            {FINAL_CTA.buttons.map((b, i) => (
              <PatronButton key={b.label} cta={b} variant={i === 0 ? "primary" : "ghost"} size="lg" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
