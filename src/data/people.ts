// ─────────────────────────────────────────────────────────────────────────────
// Collaborators & Inspirations — people who have inspired the work, and people
// the house would like to collaborate with.
//
// To add someone, drop a new object below. `group` controls the section it
// appears under (add new groups freely). `image` is optional — leave it out and
// a monogram is shown instead.
// ─────────────────────────────────────────────────────────────────────────────
export type PersonGroup = "Inspirations" | "Researchers" | "Collaborators";

export interface Person {
  name: string;
  role: string; // e.g. "Artist · Producer"
  group: PersonGroup;
  tag?: string; // small label on the card, e.g. "Inspiration" / "Dream collaborator"
  note: string; // why they inspire, or what of theirs resonated
  link?: string; // optional external link
  image?: string; // optional portrait (path in /public)
}

// Order within a group is preserved. Order of groups on the page is set in the
// page component (GROUP_ORDER there).
export const people: Person[] = [
  {
    name: "Ye (Kanye West)",
    role: "Artist · Producer · Designer",
    group: "Inspirations",
    tag: "Inspiration",
    note: "Reinvented what a rap album could be — soul-sampled maximalism, gospel, and design as extensions of a single vision. A standing reminder to treat every project as art, not product.",
  },
  {
    name: "Kendrick Lamar",
    role: "Artist · Writer",
    group: "Inspirations",
    tag: "Inspiration",
    note: "Builds albums like literature — dense with symbolism, structure, and moral weight. The closest thing in music to the documented-symbolism approach behind RapGod.",
  },
  {
    name: "Kid Cudi",
    role: "Artist",
    group: "Inspirations",
    tag: "Inspiration",
    note: "Made vulnerability sound like its own genre — humming, mood, and mental-health honesty that gave a generation permission to feel out loud.",
  },
  {
    name: "Neale Donald Walsch",
    role: "Author · Conversations with God",
    group: "Collaborators",
    tag: "Would like to collaborate",
    note: "His work documents perceived communication with God and the effort to make an intensely personal experience publicly understandable — the same epistemological question at the center of my own work: how to communicate and evaluate what feels spiritually significant without assuming conviction proves causation.",
    link: "https://www.cwg.org/",
  },
  {
    name: "Neil Theise",
    role: "Author · Complexity theorist",
    group: "Collaborators",
    tag: "Would like to collaborate",
    note: "In Notes on Complexity he describes how coherence and adaptive patterns emerge from the relationships between parts, not the parts alone — the language I've been reaching for to understand how meaning gathers across music, memory, names, texts, and personal history.",
    link: "https://www.spiegelandgrau.com/notes-on-complexity-1",
  },
];
