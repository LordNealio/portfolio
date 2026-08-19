import { useEffect } from "react";
import { Link } from "react-router-dom";
import { WORK_WITH_ME as W } from "../data/workWithMe";
import { useReveal } from "../lib/useReveal";

export function WorkWithMe() {
  useReveal([]);
  useEffect(() => {
    document.title = "Bring me the problem — NIL · Just Neal";
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, []);

  const mailto = (subject: string) =>
    `mailto:${W.contactEmail}?subject=${encodeURIComponent(subject)}`;
  const book = (subject: string) => (W.bookingUrl ? W.bookingUrl : mailto(subject));

  const BookBtn = ({
    label,
    subject,
    variant = "primary",
  }: {
    label: string;
    subject: string;
    variant?: "primary" | "ghost";
  }) => {
    const href = book(subject);
    const external = href.startsWith("http");
    return (
      <a className={`btn btn-${variant}`} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {label} <span className="arr">→</span>
      </a>
    );
  };

  return (
    <article className="ww section page-top">
      <div className="wrap ww-inner">
        {/* Hero */}
        <header className="ww-hero">
          <p className="eyebrow reveal">{W.eyebrow}</p>
          <h1 className="display ww-title reveal">{W.title}</h1>
          <p className="ww-intro reveal">{W.intro}</p>
          <ul className="ww-problems">
            {W.problems.map((p) => (
              <li className="reveal" key={p}>
                {p}
              </li>
            ))}
          </ul>
          <p className="ww-bringthat reveal">{W.bringThat}</p>
          <p className="ww-supporting reveal">{W.supporting}</p>
          <div className="ww-cta-row ww-hero-ctas reveal">
            <Link className="btn btn-primary" to="/bizwiz">
              {W.heroCtas.primary} <span className="arr">→</span>
            </Link>
            <BookBtn label={W.heroCtas.secondary} subject="Book a working session — $350" variant="ghost" />
          </div>
        </header>

        <hr className="ww-rule" />

        {/* Philosophy — you don't have to pay me to learn from me */}
        <section className="ww-block">
          <p className="eyebrow reveal">{W.dontHire.eyebrow}</p>
          <h2 className="ww-h reveal">{W.dontHire.title}</h2>
          <div className="ww-prose">
            {W.dontHire.body.map((p, i) => (
              <p className="reveal" key={i}>
                {p}
              </p>
            ))}
          </div>
        </section>

        <hr className="ww-rule" />

        {/* BizWiz — free entry point */}
        <section className="ww-block ww-bizwiz">
          <p className="eyebrow reveal">{W.bizwiz.eyebrow}</p>
          <h2 className="ww-h reveal">{W.bizwiz.title}</h2>
          <div className="ww-prose">
            {W.bizwiz.body.map((p, i) => (
              <p className="reveal" key={i}>
                {p}
              </p>
            ))}
          </div>
          <p className="ww-fine reveal">{W.bizwiz.note}</p>
          <div className="ww-cta-row reveal">
            <Link className="btn btn-primary" to="/bizwiz">
              {W.bizwiz.cta} <span className="arr">→</span>
            </Link>
          </div>
        </section>

        <hr className="ww-rule" />

        {/* BizWiz Toolkit — the Problem Map + coming soon */}
        <section className="ww-block ww-toolkit">
          <p className="eyebrow reveal">{W.toolkit.eyebrow}</p>
          <h2 className="ww-h reveal">{W.toolkit.title}</h2>
          <p className="ww-lead reveal">{W.toolkit.lead}</p>

          {W.toolkit.tools
            .filter((t) => t.status === "live")
            .map((t) => (
              <figure className="ww-tool-live reveal" key={t.code}>
                <div className="ww-tool-live-head">
                  <span className="ww-tool-code">TOOL · {t.code}</span>
                  <h3 className="ww-tool-name">{t.name}</h3>
                  <p className="ww-tool-desc">{t.desc}</p>
                </div>
                <a className="ww-tool-frame" href={t.img} target="_blank" rel="noreferrer" aria-label={`View ${t.name} full size`}>
                  <img src={t.img} alt={t.alt} loading="lazy" />
                </a>
                <figcaption className="ww-tool-actions">
                  <a className="btn btn-primary" href={t.img} target="_blank" rel="noreferrer">
                    View full size <span className="arr">→</span>
                  </a>
                  <a className="btn btn-ghost" href={t.img} download>
                    Save / print <span className="arr">↓</span>
                  </a>
                </figcaption>
              </figure>
            ))}

          <div className="ww-tool-soon">
            {W.toolkit.tools
              .filter((t) => t.status === "soon")
              .map((t) => (
                <div className="ww-tool-card reveal" key={t.code}>
                  <span className="ww-tool-code">TOOL · {t.code}</span>
                  <h3 className="ww-tool-name sm">{t.name}</h3>
                  <p className="ww-tool-desc">{t.desc}</p>
                  <span className="ww-tool-soon-tag">Coming soon</span>
                </div>
              ))}
          </div>
        </section>

        <hr className="ww-rule" />

        {/* $100 — What am I missing? */}
        <section className="ww-block ww-review">
          <p className="eyebrow reveal">{W.review100.eyebrow}</p>
          <h2 className="ww-h reveal">{W.review100.title}</h2>
          <p className="ww-lead reveal">{W.review100.lead}</p>
          <ol className="ww-review-steps">
            {W.review100.steps.map((s) => (
              <li className="ww-review-step reveal" key={s.n}>
                <span className="ww-step-n">{s.n}</span>
                <div>
                  <h3 className="ww-step-h">{s.h}</h3>
                  <p className="ww-step-b">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="ww-fine reveal">{W.review100.note}</p>
          <div className="ww-cta-row reveal">
            <BookBtn label={W.review100.cta} subject="What am I missing? — $100 async review" />
          </div>
        </section>

        <hr className="ww-rule" />

        {/* 60 minutes — $350 */}
        <section className="ww-block ww-session">
          <p className="ww-session-price reveal">
            <span className="ww-min">{W.session.minutes}</span>
            <span className="ww-cost">{W.session.price}</span>
          </p>
          <div className="ww-prose reveal">
            {W.session.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="ww-cta-row reveal">
            <BookBtn label={W.session.cta} subject="Book a 60-minute session — $350" />
          </div>
        </section>

        <hr className="ww-rule" />

        {/* Tiers */}
        <section className="ww-block">
          <h2 className="ww-h reveal">{W.tiers.title}</h2>
          <p className="ww-lead reveal">{W.tiers.lead}</p>
          <div className="ww-tiers">
            {W.tiers.items.map((t) => (
              <div className="ww-tier reveal" key={t.name}>
                <h3 className="ww-tier-name">{t.name}</h3>
                <p className="ww-tier-body">{t.body}</p>
                <p className="ww-tier-price">{t.price}</p>
              </div>
            ))}
          </div>
          <div className="ww-cta-row reveal">
            <BookBtn label={W.tiers.cta} subject="Discuss a project" variant="ghost" />
          </div>
        </section>

        <hr className="ww-rule" />

        {/* Service ladder */}
        <section className="ww-block ww-ladder">
          <p className="eyebrow reveal">{W.ladder.eyebrow}</p>
          <h2 className="ww-h reveal">{W.ladder.title}</h2>
          <p className="ww-lead reveal">{W.ladder.lead}</p>
          <ol className="ww-rungs">
            {W.ladder.rungs.map((r) => {
              const inner = (
                <>
                  <span className="ww-rung-price">{r.price}</span>
                  <span className="ww-rung-name">{r.name}</span>
                  <span className="ww-rung-body">{r.body}</span>
                  <span className="ww-rung-go">→</span>
                </>
              );
              return (
                <li className="ww-rung reveal" key={r.name}>
                  {"to" in r && r.to ? (
                    <Link className="ww-rung-link" to={r.to}>
                      {inner}
                    </Link>
                  ) : (
                    <a className="ww-rung-link" href={book(r.subject!)}>
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        <hr className="ww-rule" />

        {/* What can you bring me */}
        <section className="ww-block">
          <h2 className="ww-h reveal">{W.bring.title}</h2>
          <div className="ww-bring">
            {W.bring.items.map((b) => (
              <div className="ww-bring-item reveal" key={b.h}>
                <h3 className="ww-bring-h">{b.h}</h3>
                <p className="ww-bring-b">{b.body}</p>
              </div>
            ))}
          </div>
          <p className="ww-bring-outro reveal">
            {W.bring.outro[0]} <span className="gold">{W.bring.outro[1]}</span>
          </p>
        </section>

        <hr className="ww-rule" />

        {/* The process */}
        <section className="ww-block ww-method">
          <p className="ww-maxim reveal">{W.process.maxim}</p>
          <h2 className="ww-h reveal">{W.process.title}</h2>
          <ol className="ww-process">
            {W.process.steps.map((s, i) => (
              <li className="ww-step reveal" key={s.h}>
                <span className="ww-step-n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="ww-step-h">{s.h}</h3>
                  {s.body.map((b, j) => (
                    <p className="ww-step-b" key={j}>
                      {b}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <hr className="ww-rule" />

        {/* How I think */}
        <section className="ww-block">
          <h2 className="ww-h reveal">{W.howIThink.title}</h2>
          <div className="ww-prose">
            {W.howIThink.body.map((p, i) => (
              <p className="reveal" key={i}>
                {p}
              </p>
            ))}
          </div>
          <p className="ww-fine reveal">
            {W.howIThink.aboutNote}{" "}
            <Link to="/about" className="ilink">
              About
            </Link>
            .
          </p>
        </section>

        <hr className="ww-rule" />

        {/* Before you book */}
        <section className="ww-block">
          <h2 className="ww-h reveal">{W.before.title}</h2>
          <div className="ww-prose">
            {W.before.body.map((p, i) => (
              <p className="reveal" key={i}>
                {p}
              </p>
            ))}
          </div>
          <p className="ww-quote reveal">{W.before.quote}</p>
          <p className="ww-then reveal">{W.before.then}</p>
          <div className="ww-cta-row reveal">
            <Link className="btn btn-ghost" to="/work">
              Explore the Archive <span className="arr">→</span>
            </Link>
          </div>
        </section>

        <hr className="ww-rule" />

        {/* Close + contact */}
        <section className="ww-block ww-close">
          <p className="ww-close-lead reveal">{W.close.lead}</p>
          <p className="ww-close-lines reveal">
            {W.close.lines.map((l, i) => (
              <span key={i}>
                {l}
                <br />
              </span>
            ))}
          </p>
          <p className="ww-close-big reveal">{W.close.big}</p>
          <div className="ww-cta-row reveal">
            <BookBtn label={W.close.cta} subject="Book a 60-minute session — $350" />
          </div>
          <div className="ww-contact reveal">
            {W.contact.lines.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
            <p className="ww-contact-line">
              <a className="ilink" href={mailto("Bring me the problem")}>
                {W.contactEmail}
              </a>
              <span className="ww-dot">·</span>
              <span>{W.contactDomain}</span>
            </p>
            <p className="ww-connect-note">
              {W.contact.note.replace(/ use Connect instead\.$/, " use ")}
              <Link to="/connect" className="ilink">
                Connect
              </Link>{" "}
              instead.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
