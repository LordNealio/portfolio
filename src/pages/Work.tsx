import { ArchiveList } from "../components/ArchiveList";
import { PlayerBar } from "../components/PlayerBar";
import { useReveal } from "../lib/useReveal";

export function Work() {
  useReveal([]);

  return (
    <section className="section page-top ed-page">
      <div className="ed-watermark" aria-hidden="true">
        <span className="ed-watermark-name">NIL</span>
        <span className="ed-watermark-sub">Portfolio 001</span>
      </div>

      <div className="wrap ed-wrap">
        <p className="ed-brand reveal">NIL — Just Neal</p>
        <p className="ed-script reveal">Select a project to open</p>
        <ArchiveList />
      </div>
      <PlayerBar trackUrl="https://soundcloud.com/kanyewest/whatever-works" label="Kanye West — 'Whatever Works'" />
    </section>
  );
}
