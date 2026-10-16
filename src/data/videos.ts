// ─────────────────────────────────────────────────────────────────────────────
// THE VIDEO LIBRARY — every video and reel Just Neal has made, grouped by series.
//
// To add a video: add an entry to VIDEOS with its series. To add a new cut of an
// existing video: put it FIRST in that video's `versions` (newest first). The
// library only ever shows the two most recent versions of anything.
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
  versions: VideoVersion[]; // newest first
};

/** Series in the order they appear on the page. */
export const SERIES: { name: string; blurb: string }[] = [
  { name: "Phoenix & Hamilton", blurb: "The Donda thread — Gloria, Phoenix, Hamilton, and the connections in motion." },
  { name: "34", blurb: "Why 34 keeps showing up — from 1848 to Salmon P. Chase to Kendrick." },
  { name: "ENIGMA case files", blurb: "The mysteries, told in motion." },
  { name: "Letters", blurb: "Messages in video form." },
];

/** How many versions of one video the library shows. */
export const MAX_VERSIONS = 2;

export const VIDEOS: Video[] = [
  {
    id: "hamilton-all-love",
    title: "Hamilton — All Love",
    series: "Phoenix & Hamilton",
    desc: "Ye, meet a real Hamiltonian — Computer Love, California Love, and No Child Left Behind.",
    page: { label: "RapGod", to: "/work/rapgod" },
    vertical: true,
    versions: [
      { label: "v2", date: "2026-10-16", src: "/videos/hamilton-all-love-v2.mp4", poster: "/videos/hamilton-all-love-v2.jpg" },
    ],
  },
  {
    id: "donda-thread",
    title: "God Mode Theory — Kanye & me",
    series: "Phoenix & Hamilton",
    desc: "The connections, in motion — a walk-through of the Donda thread: Gloria, Hurricane, Justin, Neal, Phoenix, Hamilton.",
    page: { label: "RapGod", to: "/work/rapgod" },
    versions: [{ label: "Video", embed: "https://archive.org/embed/copy-of-god-mode-theory-proven-kanye-and-me-1" }],
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

/** The versions the library shows for a video: the newest MAX_VERSIONS. */
export function shownVersions(v: Video): VideoVersion[] {
  return v.versions.slice(0, MAX_VERSIONS);
}
