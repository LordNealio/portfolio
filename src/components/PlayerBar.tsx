import { useEffect, useRef, useState } from "react";
import { track } from "../lib/track";

// A persistent, dismissible mini-player. Autoplay is intentionally OFF — browsers
// block sound until a user gesture, so the visitor presses play once. Reusable:
// the homepage uses the default track; other pages (e.g. an exhibit) pass their own.
const DEFAULT_TRACK = "https://soundcloud.com/nipseyhussle/dedication-feat-kendrick-lamar";
const DEFAULT_LABEL = "Nipsey Hussle — “Dedication”";
const SC_API = "https://w.soundcloud.com/player/api.js";

declare global {
  interface Window {
    // SoundCloud Widget API (loaded at runtime).
    SC?: any;
  }
}

export function PlayerBar({
  trackUrl = DEFAULT_TRACK,
  label = DEFAULT_LABEL,
}: {
  trackUrl?: string;
  label?: string;
} = {}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;
    function init() {
      if (cancelled || !window.SC?.Widget || !iframeRef.current) return;
      const w = window.SC.Widget(iframeRef.current);
      widgetRef.current = w;
      const E = window.SC.Widget.Events;
      w.bind(E.READY, () => setReady(true));
      w.bind(E.PLAY, () => setPlaying(true));
      w.bind(E.PAUSE, () => setPlaying(false));
      w.bind(E.FINISH, () => setPlaying(false));
    }

    if (window.SC?.Widget) {
      init();
      return () => {
        cancelled = true;
      };
    }

    let s = document.querySelector<HTMLScriptElement>(`script[src="${SC_API}"]`);
    if (!s) {
      s = document.createElement("script");
      s.src = SC_API;
      s.async = true;
      document.body.appendChild(s);
    }
    s.addEventListener("load", init);
    return () => {
      cancelled = true;
      s?.removeEventListener("load", init);
    };
  }, []);

  function toggle() {
    const w = widgetRef.current;
    if (!w) return;
    if (playing) {
      w.pause();
      track("music_pause");
    } else {
      w.play();
      track("music_play");
    }
  }

  function dismiss() {
    widgetRef.current?.pause();
    setHidden(true);
    track("music_dismiss");
  }

  const src =
    `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}` +
    "&auto_play=false&visual=false&hide_related=true&show_comments=false" +
    "&show_user=false&show_reposts=false&show_teaser=false&buying=false&sharing=false&download=false";

  return (
    <>
      {/* Off-screen audio host — present (not display:none) so playback continues. */}
      <iframe
        ref={iframeRef}
        className="pbar-frame"
        title="Background audio player"
        allow="autoplay"
        src={hidden ? "about:blank" : src}
        aria-hidden="true"
        tabIndex={-1}
      />
      {!hidden && (
        <div className="pbar" role="region" aria-label="Music player">
          <button
            className="pbar-btn"
            onClick={toggle}
            disabled={!ready}
            aria-label={playing ? "Pause music" : "Play music"}
            aria-pressed={playing}
          >
            {playing ? (
              <span className="pbar-ico" aria-hidden="true">
                <i />
                <i />
              </span>
            ) : (
              <span className="pbar-ico pbar-ico-play" aria-hidden="true" />
            )}
          </button>
          <span className="pbar-label">
            <span className="pbar-kicker">{playing ? "Now playing" : "Play the record"}</span>
            <span className="pbar-title">{label}</span>
          </span>
          <button className="pbar-close" onClick={dismiss} aria-label="Hide music player">
            ×
          </button>
        </div>
      )}
    </>
  );
}
