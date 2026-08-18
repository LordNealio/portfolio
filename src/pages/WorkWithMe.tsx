import { useEffect } from "react";
import { Link } from "react-router-dom";
import { WORK_WITH_ME as W } from "../data/workWithMe";
import { site } from "../data/site";
import { useReveal } from "../lib/useReveal";

export function WorkWithMe() {
  useReveal([]);
  useEffect(() => {
    document.title = "Bring me the problem — NIL · Just Neal";
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, []);

  const book = (subject: string) =>
    W.bookingUrl ? W.bookingUrl : `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;
  const BookBtn = ({ label, subject, variant = "primary" }: { label: string; subject: string; variant?: "primary" | "ghost" }) => {
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
        </header>

        <hr className="ww-rule" />

        {/* You probably don't need to hire me */}
        <section className="ww-block">
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
        </section>

        <hr className="ww-rule" />

        {/* The process */}
        <section className="ww-block">
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

        {/* 60 minutes */}
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

        {/* Close */}
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
          <p className="ww-connect-note reveal">
            {W.close.connectNote.replace(/ use Connect instead\.$/, " use ")}
            <Link to="/connect" className="ilink">
              Connect
            </Link>{" "}
            instead.
          </p>
        </section>
      </div>
    </article>
  );
}
