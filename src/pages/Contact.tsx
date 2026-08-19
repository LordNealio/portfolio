import { useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../data/site";
import { useReveal } from "../lib/useReveal";
import { track } from "../lib/track";

// Paste your free Web3Forms access key here to turn on the form (the recipient
// email is stored by Web3Forms against this key — it is NEVER in this code or the
// page). Until it's set, the page shows a plain "Send a message" mailto link.
const WEB3FORMS_KEY = "";

const invites = [
  "Collaborators & co-founders",
  "Researchers & people contributing to an investigation",
  "Anyone who wants to work with me directly",
  "Investors",
  "Developers & designers",
  "Nonprofit partners",
  "Educators & researchers",
  "Artists & cultural organizations",
  "Community organizations",
];

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    track("inquiry_started", { method: "form" });
    const data = new FormData(e.currentTarget);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "New message from the NIL site");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setStatus("ok");
        track("inquiry_submitted", { method: "form" });
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return <p className="form-ok reveal">Thank you — your message is on its way.</p>;
  }

  return (
    <form className="contact-form reveal" onSubmit={onSubmit}>
      <input className="field" type="text" name="name" placeholder="Your name" required />
      <input className="field" type="email" name="email" placeholder="Your email" required />
      <textarea className="field" name="message" placeholder="Your message" rows={5} required />
      {/* honeypot */}
      <input type="checkbox" name="botcheck" tabIndex={-1} style={{ display: "none" }} />
      <button className="btn btn-primary btn-lg" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"} <span className="arr">→</span>
      </button>
      {status === "error" && (
        <p className="form-err">Something went wrong — please try again.</p>
      )}
    </form>
  );
}

export function Contact() {
  useReveal([]);
  return (
    <section className="section page-top contact">
      <div className="wrap contact-inner">
        <p className="eyebrow reveal">Contact & collaboration</p>
        <h1 className="display contact-title reveal">
          Let's build
          <br />
          <span className="serif-i gold">something worth making.</span>
        </h1>
        <p className="lead contact-lead reveal">
          Whether you want to explore a project, collaborate, hire, invest, donate, or just compare
          notes — the door is open.
        </p>

        {WEB3FORMS_KEY ? (
          <ContactForm />
        ) : (
          <div className="contact-cta reveal">
            <a
              className="btn btn-primary btn-lg"
              href={`mailto:${site.contact.email}`}
              onClick={() => track("inquiry_started", { method: "mailto" })}
            >
              Send a message <span className="arr">→</span>
            </a>
          </div>
        )}

        <p className="contact-workwith reveal">
          Want my direct help on a specific problem?{" "}
          <Link to="/work-with-me" className="ilink" onClick={() => track("work_with_me_selected", { cta_location: "connect" })}>
            See the ways to work together →
          </Link>
        </p>

        <div className="contact-invites reveal">
          <p className="eyebrow">Especially glad to hear from</p>
          <ul className="invite-list">
            {invites.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
