import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="section page-top">
      <div className="wrap" style={{ textAlign: "center", paddingBlock: "8vh" }}>
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          404
        </p>
        <h1 className="display">Lost the thread.</h1>
        <p className="lead" style={{ marginInline: "auto", marginBlock: "1.4rem 2rem" }}>
          That page doesn't exist — but the work does.
        </p>
        <Link to="/" className="btn btn-primary">
          Back home <span className="arr">→</span>
        </Link>
      </div>
    </section>
  );
}
