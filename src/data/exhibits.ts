// ─────────────────────────────────────────────────────────────────────────────
// Scrolling exhibits — long-form image essays presented as a vertical scroll,
// in the spirit of the monograph. Each is reached as its own option from a
// project page (e.g. RapGod). Slides are finalized assets, shown as-is.
// ─────────────────────────────────────────────────────────────────────────────
export interface ExhibitSlide {
  src: string;
  alt: string;
}

export interface Exhibit {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  parent: { label: string; to: string }; // where it lives / back link
  closing: { line: string; note?: string };
  slides: ExhibitSlide[];
  audio?: { url: string; label: string }; // optional SoundCloud track for a bottom mini-player
}

export const EXHIBITS: Exhibit[] = [
  {
    id: "christie-dmx",
    eyebrow: "An Enigma case file",
    title: "Agatha Christie × DMX",
    subtitle: "A mystery from 1939 → 1999",
    intro: [
      "One case, told across nine files: how a novel's changing titles and a rapper's changing name open a question about numbers, words, etymology, classification, and identity.",
      "Scroll slowly. A clue is not a conclusion.",
    ],
    parent: { label: "RapGod", to: "/work/rapgod" },
    closing: {
      line: "What started as a music question became a question about language, classification, and identity.",
      note: "The images are finalized case files, presented as-is. Historical word-usage is documented, not endorsed — this is an inquiry into how meaning changes, not a claim.",
    },
    slides: [
      { src: "/art/exhibits/christie-dmx/a01.jpg", alt: "Case #1 — 'And then there was…' A mystery from 1939 to 1999: Agatha Christie × DMX. What connects them? (1 of 9)" },
      { src: "/art/exhibits/christie-dmx/a02.jpg", alt: "1939 — Agatha Christie publishes the novel now known as 'And Then There Were None' — but that wasn't its original title. Follow the title. (2 of 9)" },
      { src: "/art/exhibits/christie-dmx/a03.jpg", alt: "1999 — 60 years later, DMX releases '…And Then There Was X.' Christie: None; DMX: X; but X = 10. Why does 10 matter? (3 of 9)" },
      { src: "/art/exhibits/christie-dmx/a04.jpg", alt: "Follow the number: Christie counts 10 → 9 → 8 → … → None; DMX replaces None with X; in Roman numerals X = 10. 10 → None → X → 10. Coincidence, or worth digging? (4 of 9)" },
      { src: "/art/exhibits/christie-dmx/a05.jpg", alt: "The number led back to a word: Christie's original 1939 title used a racial slur. The title changed; the word disappeared. Where did the word come from? (5 of 9)" },
      { src: "/art/exhibits/christie-dmx/a06.jpg", alt: "Beyond coincidence — one pattern in three forms: 10 (the number murdered), X (the Roman numeral for ten), and the erased original title and those it replaced. X → 10 → None / 0. (6 of 9)" },
      { src: "/art/exhibits/christie-dmx/a07.jpg", alt: "The word travels: the same slur, anchored in America, was applied to dark-skinned natives across India, Australia, the Pacific Islands, and the Americas. Why is only the American called African? (7 of 9)" },
      { src: "/art/exhibits/christie-dmx/a08.jpg", alt: "The woodpile clue: Christie uses the idiom again — 'They do it with mirrors.' A concealed motive or unknown factor [OED 1989], attested by 1889 and in Thornton's 'American Glossary' (1912). What undisclosed fact changes the case? (8 of 9)" },
      { src: "/art/exhibits/christie-dmx/a09.jpg", alt: "The title trail: one story, multiple titles — the censored 1939 UK title, 'And Then There Were None' (1940 US), and 'Ten Little Indians' (1954–1966 US paperbacks). Slur → None → Indians. What changed — language, identity, or both? (9 of 9)" },
    ],
  },
];

export const getExhibit = (id: string) => EXHIBITS.find((e) => e.id === id);
