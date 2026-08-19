import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useReveal } from "../lib/useReveal";
import { track } from "../lib/track";

// ─────────────────────────────────────────────────────────────────────────────
// THE GATE — the campaign on-ramp. Visitors arriving from Instagram / Threads
// (the ENIGMA "4 questions about music" carousel) land here: the same 7 slides,
// then three doors — into the Christie × DMX case, into GNX, or into the site.
// Reached at /enter (bio link) and the aliases /enigma, /christie, /gnx; the
// arriving path just reorders the doors so the matching case is first.
// ─────────────────────────────────────────────────────────────────────────────

const SLIDES = [
  { src: "/art/enigma/01.png", alt: "ENIGMA 01 — Four questions about music. Before I show you something strange. (1 of 7)" },
  { src: "/art/enigma/02.png", alt: "ENIGMA 02 — What's one song or album you've always felt unusually connected to — and why? (2 of 7)" },
  { src: "/art/enigma/03.png", alt: "ENIGMA 03 — Is it impossible for music to contain meaning beyond what the artist consciously intended? (3 of 7)" },
  { src: "/art/enigma/04.png", alt: "ENIGMA 04 — Schopenhauer: music is by no means like the other arts, but a copy of the will itself. (4 of 7)" },
  { src: "/art/enigma/05.png", alt: "ENIGMA 05 — If something seems like a coincidence, does that mean it's not worth digging into? (5 of 7)" },
  { src: "/art/enigma/06.png", alt: "ENIGMA 06 — What if the same coincidence kept reappearing? (6 of 7)" },
  { src: "/art/enigma/07.png", alt: "ENIGMA 07 — Let's test it. A mystery from 1939 to 1999. Case #1: Agatha Christie × DMX. (7 of 7)" },
];

type Door = { key: string; label: string; name: string; desc: string; to: string; evt: string; external?: boolean };

const DOORS: Record<string, Door> = {
  christie: {
    key: "christie",
    label: "Case №1",
    name: "Agatha Christie × DMX",
    desc: "A mystery from 1939 to 1999.",
    to: "/exhibit/christie-dmx",
    evt: "gate_door_christie",
  },
  gnx: {
    key: "gnx",
    label: "Case №2",
    name: "GNX",
    desc: "Two cars. One Kendrick. Two questions.",
    to: "/work/gnx",
    evt: "gate_door_gnx",
  },
  site: {
    key: "site",
    label: "The full body of work",
    name: "Enter the site",
    desc: "Research · Systems · Strategy · Story.",
    to: "/",
    evt: "gate_door_site",
  },
};

const TOTAL = SLIDES.length + 1; // slides + doors panel

export function Enter() {
  useReveal([]);
  const { pathname } = useLocation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // The arriving link reorders the doors so the matching case leads.
  const order =
    pathname.startsWith("/gnx") ? ["gnx", "christie", "site"] : ["christie", "gnx", "site"];
  const doors = order.map((k) => DOORS[k]);

  useEffect(() => {
    document.title = "ENIGMA — Just Neal";
    track("gate_view", { via: pathname });
    return () => {
      document.title = "NIL · Just Neal — Name. Image. Likeness.";
    };
  }, [pathname]);

  function goTo(i: number) {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(TOTAL - 1, i));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  }

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  }

  const atDoors = index >= SLIDES.length;

  return (
    <div className="gate">
      {/* Chrome */}
      <div className="gate-top">
        <Link to="/" className="gate-mark" onClick={() => track("gate_mark_home")}>
          NIL<span className="gate-mark-sub"> · Just Neal</span>
        </Link>
        {!atDoors && (
          <button className="gate-skip" onClick={() => { track("gate_skip"); goTo(SLIDES.length); }}>
            Skip <span className="arr">→</span>
          </button>
        )}
      </div>

      {/* Carousel */}
      <div className="gate-track" ref={trackRef} onScroll={onScroll}>
        {SLIDES.map((s, i) => (
          <div className="gate-slide" key={s.src}>
            <img src={s.src} alt={s.alt} draggable={false} loading={i === 0 ? "eager" : "lazy"} />
          </div>
        ))}

        {/* Doors panel */}
        <div className="gate-slide gate-doors">
          <div className="gate-doors-inner">
            <p className="gate-doors-eyebrow">Three ways in</p>
            <h1 className="gate-doors-h">Follow the pattern — or step into the studio.</h1>
            <div className="gate-doors-grid">
              {doors.map((d, i) => {
                const inner = (
                  <>
                    <span className="gate-door-label">{d.label}</span>
                    <span className="gate-door-name">{d.name}</span>
                    <span className="gate-door-desc">{d.desc}</span>
                    <span className="gate-door-go">
                      Open <span className="arr">→</span>
                    </span>
                  </>
                );
                const cls = `gate-door reveal${i === 0 ? " lead" : ""}`;
                return d.to.startsWith("/") ? (
                  <Link key={d.key} to={d.to} className={cls} onClick={() => track(d.evt)}>
                    {inner}
                  </Link>
                ) : (
                  <a key={d.key} href={d.to} className={cls} onClick={() => track(d.evt)}>
                    {inner}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="gate-controls">
        <button
          className="gate-arrow"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous slide"
        >
          ←
        </button>
        <div className="gate-dots" role="tablist" aria-label="Slides">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              className={`gate-dot${i === index ? " on" : ""}${i === TOTAL - 1 ? " end" : ""}`}
              onClick={() => goTo(i)}
              aria-label={i === TOTAL - 1 ? "The doors" : `Slide ${i + 1}`}
              aria-selected={i === index}
            />
          ))}
        </div>
        <button
          className="gate-arrow"
          onClick={() => goTo(index + 1)}
          disabled={atDoors}
          aria-label="Next slide"
        >
          →
        </button>
      </div>
    </div>
  );
}
