// ─────────────────────────────────────────────────────────────────────────────
// THE VIDEO LIBRARY — every video and reel Just Neal has made, grouped by series.
//
// To add a video: add an entry to VIDEOS with its series. To add a new cut of an
// existing video: put it FIRST in that video's `versions` (newest first). The
// library only ever shows the two most recent versions of anything.
//
// A video with no versions yet shows as "Coming soon" — list a planned part
// before it's released and drop its file in when it's ready.
//
// A version plays from `embed` (an Archive.org / YouTube / Instagram embed URL)
// or `src` (a file in /public, e.g. "/videos/hamilton-all-love-v2.mp4").
// ─────────────────────────────────────────────────────────────────────────────

export type VideoVersion = {
  label: string; // e.g. "v2", "Final cut", "Reel"
  date?: string; // ISO date, shown when present
  embed?: string;
  src?: string;
  poster?: string; // still shown before a `src` video plays
};

export type Video = {
  id: string;
  title: string;
  series: string;
  desc: string;
  page?: { label: string; to: string }; // where the full story lives on the site
  vertical?: boolean; // 9:16 reels get a portrait frame
  cover?: string; // artwork for the card — shown before release, and as the poster fallback
  versions: VideoVersion[]; // newest first; empty = "Coming soon"
  /** Password-locked: versions' `src` is scrambled with the password (see unlockSrc); the card asks for it first. */
  locked?: boolean;
};

/** Unscramble a locked video's src with the password the viewer typed. Returns null if it doesn't decode to a video path. */
export function unlockSrc(enc: string, password: string): string | null {
  try {
    const raw = atob(enc);
    let out = "";
    for (let i = 0; i < raw.length; i++) out += String.fromCharCode(raw.charCodeAt(i) ^ password.charCodeAt(i % password.length));
    return out.startsWith("/videos/") && out.endsWith(".mp4") ? out : null;
  } catch {
    return null;
  }
}

/** Series in the order they appear on the page. */
export const SERIES: { name: string; slug: string; blurb: string }[] = [
  {
    name: "The Hamiltonian Solution",
    slug: "hamiltonian-solution",
    blurb: "A five-part story from Hamilton, Ohio — Ye, Donda, Phoenix, Jay Electronica, Kid Cudi — and an epilogue that ties it together.",
  },
  { name: "The Donda thread", slug: "donda-thread", blurb: "Gloria, Hurricane, Justin, Neal — the connections in motion." },
  { name: "34", slug: "34", blurb: "Why 34 keeps showing up — from 1848 to Salmon P. Chase to Kendrick." },
  { name: "ENIGMA case files", slug: "enigma-case-files", blurb: "The mysteries, told in motion." },
  { name: "Letters", slug: "letters", blurb: "Messages in video form." },
];

/** How many versions of one video the library shows. */
export const MAX_VERSIONS = 2;

export const VIDEOS: Video[] = [
  // ── The Hamiltonian Solution — in series order ──
  {
    id: "hamiltonian-1",
    title: "Part I · H-Town! Love Story of Ye and The Bush",
    series: "The Hamiltonian Solution",
    desc: "Ye, meet a real Hamiltonian — Computer Love, California Love, and No Child Left Behind.",
    vertical: true,
    cover: "/videos/hamiltonian-part-1-cover.jpg",
    versions: [
      { label: "Final", date: "2026-10-24", src: "/videos/hamiltonian-part-1-final.mp4" },
      { label: "v8", date: "2026-10-19", src: "/videos/hamiltonian-part-1-v8.mp4", poster: "/videos/hamiltonian-part-1-cover.jpg" },
      { label: "v2", date: "2026-10-16", src: "/videos/hamilton-all-love-v2.mp4", poster: "/videos/hamilton-all-love-v2.jpg" },
    ],
  },
  {
    id: "hamiltonian-2",
    title: "Part II · The Donda Dissertation",
    series: "The Hamiltonian Solution",
    desc: "What does Ye's mother have to do with a kid from Hamilton?",
    vertical: true,
    cover: "/videos/hamiltonian-part-2-cover.jpg",
    versions: [
      { label: "Final", date: "2026-10-24", src: "/videos/hamiltonian-part-2-final.mp4" },
      { label: "v8", date: "2026-10-22", src: "/videos/hamiltonian-part-2-v8.mp4", poster: "/videos/hamiltonian-part-2-v8.jpg" },
    ],
  },
  {
    id: "hamiltonian-3",
    title: "Part III · Up From the Ashes",
    series: "The Hamiltonian Solution",
    desc: "Phoenix, and the patterns: 777 · 111 · 333.",
    vertical: true,
    cover: "/videos/hamiltonian-part-3-cover.jpg",
    versions: [{ label: "Final", date: "2026-10-24", src: "/videos/hamiltonian-part-3-final.mp4" }],
  },
  {
    id: "hamiltonian-4",
    title: "Part IV · Trill Jesus Is Lord",
    series: "The Hamiltonian Solution",
    desc: "June 4, waiting for Jay Electronica — and the path from kneel to Neal.",
    vertical: true,
    cover: "/videos/hamiltonian-part-4-cover.jpg",
    versions: [
      { label: "v6", date: "2026-10-25", src: "/videos/hamiltonian-part-4-v6.mp4", poster: "/videos/hamiltonian-part-4-cover.jpg" },
    ],
  },
  {
    id: "hamiltonian-5",
    title: "Part V · King Wizard",
    series: "The Hamiltonian Solution",
    desc: "Kid Cudi in Phoenix — \"This one's for Ye.\" Locked preview.",
    vertical: true,
    cover: "/videos/hamiltonian-part-5-cover.jpg",
    locked: true,
    versions: [
      { label: "v5", date: "2026-10-25", src: "GkdaUVRcRh5YQhwHAVMLAVBVUwMLAVcdWEEH", poster: "/videos/hamiltonian-part-5-cover.jpg" },
    ],
  },
  {
    id: "hamiltonian-epilogue",
    title: "Epilogue · The Hamiltonian Solution",
    series: "The Hamiltonian Solution",
    desc: "What do you call someone from Hamilton, Ohio? A Hamiltonian.",
    vertical: true,
    versions: [],
  },
  {
    id: "donda-thread",
    title: "God Mode Theory — Kanye & me",
    series: "The Donda thread",
    desc: "The connections, in motion — a walk-through of the Donda thread: Gloria, Hurricane, Justin, Neal, Phoenix, Hamilton.",
    page: { label: "RapGod", to: "/work/rapgod" },
    versions: [{ label: "Video", embed: "https://archive.org/embed/copy-of-god-mode-theory-proven-kanye-and-me-1" }],
  },
  {
    id: "stranger-than-legal-fiction",
    title: "Stranger Than Legal Fiction · Part I",
    series: "34",
    desc: "A little tale of an accountant… and reparations. A Kendrick track dated 09.06, the 1848 Colored National Convention, and \"In God We Trust.\"",
    vertical: true,
    versions: [
      { label: "v7", date: "2026-10-04", src: "/videos/stranger-than-legal-fiction-v7.mp4", poster: "/videos/stranger-than-legal-fiction-v7.jpg" },
    ],
  },
  {
    id: "stranger-than-legal-fiction-2",
    title: "Stranger Than Legal Fiction · Part II",
    series: "34",
    desc: "Every road led back to reparations — John Stewart, the Black Green Lantern, and two names: O'Neil and Neal.",
    vertical: true,
    versions: [
      { label: "Draft", date: "2026-10-25", src: "/videos/stranger-than-legal-fiction-part-2.mp4", poster: "/videos/stranger-than-legal-fiction-part-2.jpg" },
    ],
  },
  {
    id: "head-is-the-answer",
    title: "Head Is the Answer",
    series: "34",
    desc: "Kendrick Lamar and SZA said it. I did the math. H-E-A-D = 18.",
    vertical: true,
    versions: [
      { label: "M1", date: "2026-10-25", src: "/videos/head-is-the-answer.mp4", poster: "/videos/head-is-the-answer.jpg" },
    ],
  },
  {
    id: "the-head-is-18",
    title: "The Head Is 18",
    series: "34",
    desc: "Why the head comes out to 18.",
    vertical: true,
    versions: [
      { label: "Video", date: "2026-10-25", src: "/videos/the-head-is-18.mp4", poster: "/videos/the-head-is-18.jpg" },
    ],
  },
  {
    id: "big-daddy-from-cincinnati",
    title: "Big Daddy From Cincinnati",
    series: "34",
    desc: "The man who first brought Kendrick Lamar to Ohio — and passed SZA's demo to Top Dawg.",
    vertical: true,
    versions: [
      { label: "Video", date: "2026-10-25", src: "/videos/big-daddy-from-cincinnati.mp4", poster: "/videos/big-daddy-from-cincinnati.jpg" },
    ],
  },
  {
    id: "why-34",
    title: "Why does 34 keep showing up?",
    series: "34",
    desc: "From the 1848 Colored National Convention to Salmon P. Chase, Kendrick Lamar, and beyond.",
    page: { label: "Blueface × Salmon P. Chase", to: "/work/blueface-salmon-p-chase" },
    versions: [{ label: "Video", embed: "https://archive.org/embed/chase-untitled" }],
  },
  {
    id: "gnx",
    title: "GNX",
    series: "ENIGMA case files",
    desc: "Two cars. One Kendrick. Two questions.",
    page: { label: "GNX", to: "/work/gnx" },
    versions: [{ label: "Video", src: "/gnx.mp4" }],
  },
  {
    id: "christie-dmx-intermission",
    title: "Agatha Christie × DMX — Intermission",
    series: "ENIGMA case files",
    desc: "Case No. 1: a mystery from 1939 to 1999.",
    page: { label: "Case No. 1", to: "/exhibit/christie-dmx" },
    versions: [{ label: "Video", embed: "https://archive.org/embed/a-real-ngga-intermission-1" }],
  },
  {
    id: "nwyrd-mix",
    title: "NWyrd — the mix",
    series: "ENIGMA case files",
    desc: "Case No. 3: coincidence, or wyrd?",
    page: { label: "Case No. 3", to: "/exhibit/nwyrd" },
    versions: [{ label: "Video", embed: "https://archive.org/embed/nwyrd-mix-1" }],
  },
  {
    id: "dear-ye",
    title: "Dear Ye",
    series: "Letters",
    desc: "A message from me to Ye.",
    page: { label: "Dear Ye / Mission Control", to: "/work/mission-control" },
    versions: [{ label: "Video", src: "/toye.mp4" }],
  },
];

export const getSeries = (slug: string | undefined) => SERIES.find((s) => s.slug === slug);

/** The versions the library shows for a video: the newest MAX_VERSIONS. */
export function shownVersions(v: Video): VideoVersion[] {
  return v.versions.slice(0, MAX_VERSIONS);
}

/** Artwork for a video: its cover, else its newest version's poster. */
export function artOf(v: Video): string | undefined {
  return v.cover ?? v.versions[0]?.poster;
}
