import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Admin export for Reconvening the 34. Reads /api/reconvene/admin/export with a
// bearer token and downloads CSV. With no Supabase configured the API returns
// 503 and this page simply says "not configured". Not linked from navigation.
// ─────────────────────────────────────────────────────────────────────────────

type Kind = "submissions" | "answers" | "comments" | "additions" | "contacts";

const KINDS: { k: Kind; label: string; note: string }[] = [
  { k: "submissions", label: "Submissions", note: "One row per review, with version ids." },
  { k: "answers", label: "Answers", note: "One row per item choice." },
  { k: "comments", label: "Comments", note: "Free text, including alternative wording." },
  { k: "additions", label: "Community additions", note: "Revisions, replacements, sources, examples." },
  { k: "contacts", label: "Contacts", note: "Private. Only rows where consent was given." },
];

export function ReconveneAdmin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("rec_admin_token") || "");
  const [entered, setEntered] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState<Kind | null>(null);

  useEffect(() => {
    document.title = "Reconvening admin";
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, []);

  const download = async (kind: Kind) => {
    setBusy(kind);
    setStatus(null);
    try {
      const r = await fetch(`/api/reconvene/admin/export?kind=${kind}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (r.status === 401) {
        setStatus("Unauthorized — check the token.");
        return;
      }
      if (r.status === 503) {
        setStatus("Not configured — no database is provisioned for this deployment.");
        return;
      }
      if (!r.ok) {
        setStatus(`Export failed (${r.status}).`);
        return;
      }
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reconvening-34-${kind}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus(`Downloaded ${kind}.csv`);
    } catch {
      setStatus("Network error.");
    } finally {
      setBusy(null);
    }
  };

  if (!token) {
    return (
      <div className="rec">
        <div className="rec-body">
          <div className="rec-wrap">
            <h2>Reconvening the 34 — admin</h2>
            <label className="rec-label" htmlFor="rec-token">
              Admin token
            </label>
            <input
              id="rec-token"
              className="rec-input"
              type="password"
              value={entered}
              onChange={(e) => setEntered(e.target.value)}
            />
            <div className="rec-actions">
              <button
                type="button"
                className="rec-btn"
                onClick={() => {
                  sessionStorage.setItem("rec_admin_token", entered);
                  setToken(entered);
                }}
                disabled={!entered}
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rec">
      <div className="rec-body">
        <div className="rec-wrap">
          <h2>Reconvening the 34 — admin</h2>
          <p className="rec-fine">
            Exports are CSV. Contact rows are separated from response rows so the public
            tally can never be joined to a person by accident.
          </p>
          {status && <div className="rec-status">{status}</div>}
          <div className="rec-cards">
            {KINDS.map((x) => (
              <div className="rec-card" key={x.k}>
                <h3>{x.label}</h3>
                <p className="rec-fine">{x.note}</p>
                <button
                  type="button"
                  className="rec-btn ghost small"
                  onClick={() => download(x.k)}
                  disabled={busy !== null}
                >
                  {busy === x.k ? "Preparing…" : "Download CSV"}
                </button>
              </div>
            ))}
          </div>
          <div className="rec-actions">
            <button
              type="button"
              className="rec-btn ghost"
              onClick={() => {
                sessionStorage.removeItem("rec_admin_token");
                setToken("");
              }}
            >
              Lock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
