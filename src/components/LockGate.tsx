import { useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";

// A soft, client-side access gate for in-progress works. One correct code
// unlocks all locked works for the session (stored in sessionStorage by the
// caller). Not real security — the content still ships in the bundle.
export function LockGate({ project, onUnlock }: { project: Project; onUnlock: () => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (val.trim() === "67") onUnlock();
    else setErr(true);
  };

  return (
    <section className="section page-top">
      <div className="wrap lockgate reveal">
        <p className="lock-eyebrow">Private</p>
        <h1 className="h2 lock-title">{project.title}</h1>
        <p className="lead lock-lead">
          This project is private. Enter the access code to view it.
        </p>
        <form onSubmit={submit} className="lock-form">
          <input
            className="lock-input"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            autoFocus
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              setErr(false);
            }}
            placeholder="Access code"
            aria-label="Access code"
          />
          <button className="btn btn-primary" type="submit">
            Unlock <span className="arr">→</span>
          </button>
        </form>
        {err && <p className="lock-err" role="alert">Incorrect code. Please try again.</p>}
        <Link to="/work" className="lock-back">
          ← Back to all work
        </Link>
      </div>
    </section>
  );
}
