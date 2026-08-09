import { useEffect, useState } from "react";
import { commentsApi, type Comment } from "../lib/commentsApi";

// Public feedback on a work. Comments are moderated — a new one is held for the
// owner's approval before it appears, so submitting shows a "pending" note.
// When the backend isn't configured yet, the whole section stays quiet.
export function Comments({ slug }: { slug: string }) {
  const [status, setStatus] = useState<"loading" | "ok" | "unconfigured" | "error">("loading");
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    commentsApi.list(slug).then((r) => {
      if (!live) return;
      setStatus(r.status);
      setComments(r.comments);
    });
    return () => {
      live = false;
    };
  }, [slug]);

  if (status === "loading" || status === "unconfigured") {
    // Keep the placement visible without a broken form before the backend exists.
    return (
      <section className="comments reveal">
        <h2 className="h2">Feedback</h2>
        <p className="muted comments-soon">
          {status === "loading" ? "Loading feedback…" : "Comments are opening soon."}
        </p>
      </section>
    );
  }

  const fmt = (iso: string) => {
    const d = new Date(iso);
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!author.trim() || !body.trim()) {
      setErr("Please add your name and a comment.");
      return;
    }
    setSending(true);
    const r = await commentsApi.submit(slug, author.trim(), body.trim(), website);
    setSending(false);
    if (r.ok) {
      setSent(true);
      setBody("");
    } else {
      setErr("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="comments reveal">
      <h2 className="h2">Feedback</h2>
      <p className="muted comments-lead">
        Leave a comment. Comments are reviewed before they appear publicly.
      </p>

      {comments.length > 0 ? (
        <ul className="comment-list">
          {comments.map((c) => (
            <li className="comment" key={c.id}>
              <div className="comment-head">
                <span className="comment-author">{c.author}</span>
                <span className="comment-date">{fmt(c.created_at)}</span>
              </div>
              <p className="comment-body">{c.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted comments-empty">No comments yet — be the first.</p>
      )}

      {sent ? (
        <p className="comments-thanks">Thank you — your comment will appear once it's approved.</p>
      ) : (
        <form className="comment-form" onSubmit={submit}>
          <input
            className="comment-input"
            placeholder="Your name"
            value={author}
            maxLength={60}
            onChange={(e) => setAuthor(e.target.value)}
            aria-label="Your name"
          />
          <textarea
            className="comment-input"
            placeholder="Your comment"
            rows={3}
            value={body}
            maxLength={2000}
            onChange={(e) => setBody(e.target.value)}
            aria-label="Your comment"
          />
          {/* Honeypot — hidden from humans */}
          <input
            className="comment-hp"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            aria-hidden="true"
          />
          {err && <p className="comment-err">{err}</p>}
          <button className="btn btn-primary" type="submit" disabled={sending}>
            {sending ? "Sending…" : "Post comment →"}
          </button>
        </form>
      )}
    </section>
  );
}
