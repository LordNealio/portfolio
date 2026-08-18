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
}

export const EXHIBITS: Exhibit[] = [
  {
    id: "christie-dmx",
    eyebrow: "An Enigma case file",
    title: "Agatha Christie × DMX",
    subtitle: "A mystery from 1939 → 1999",
    intro: [
      "One case, told across ten files: how a novel's changing titles and a rapper's changing name open a question about numbers, words, etymology, classification, and identity.",
      "Scroll slowly. A clue is not a conclusion.",
    ],
    parent: { label: "RapGod", to: "/work/rapgod" },
    closing: {
      line: "What started as a music question became a question about language, classification, and identity.",
      note: "The images are finalized case files, presented as-is. Historical word-usage is documented, not endorsed — this is an inquiry into how meaning changes, not a claim.",
    },
    slides: [
      { src: "/art/exhibits/christie-dmx/01.png", alt: "Case #1 — 'And then there was…' A mystery from 1939 to 1999: Agatha Christie × DMX. What connects them? (1 of 10)" },
      { src: "/art/exhibits/christie-dmx/02.png", alt: "1939 — Agatha Christie publishes the novel now known as 'And Then There Were None' — but that wasn't its original title. (2 of 10)" },
      { src: "/art/exhibits/christie-dmx/03.png", alt: "1999 — 60 years later, DMX releases '…And Then There Was X.' Christie: None; DMX: X; but X = 10. Why does 10 matter? (3 of 10)" },
      { src: "/art/exhibits/christie-dmx/04.png", alt: "Follow the number: Christie counts 10 → 9 → 8 → … → None; DMX replaces None with X; in Roman numerals X = 10. 10 → None → X → 10. Coincidence, or worth digging? (4 of 10)" },
      { src: "/art/exhibits/christie-dmx/05.png", alt: "The number led back to a word: Christie's original 1939 title used a racial slur. The title changed; the word disappeared. Where did the word come from? (5 of 10)" },
      { src: "/art/exhibits/christie-dmx/06.png", alt: "Beyond coincidence — same pattern, different forms: 10 (a number counting down to none), X (a letter that equals ten), and a word removed, then replaced, then reapplied. Three clues, one mystery. (6 of 10)" },
      { src: "/art/exhibits/christie-dmx/07.png", alt: "The word travels: the same slur was applied to dark-skinned natives in multiple regions — India, Australia, the Pacific Islands, the Americas. Why is only the American called African? (7 of 10)" },
      { src: "/art/exhibits/christie-dmx/08.png", alt: "The woodpile clue: Christie uses the word again — 'They do it with mirrors.' A concealed motive [OED 1989], attested by 1800 and in Thornton's 'American Glossary' (1912). What undisclosed fact changes the case? (8 of 10)" },
      { src: "/art/exhibits/christie-dmx/09.png", alt: "The title trail: one story, multiple titles (1939 UK, 1940 US, 1964–1986 US paperbacks). Slur → None → Indians — an unusual history of words, classification, and identity. What changed — language, identity, or both? (9 of 10)" },
      { src: "/art/exhibits/christie-dmx/10.png", alt: "The open case: what started as a music question became a question about numbers, words, etymology, classification, and identity (5×5=25, 5+5=10). That's the investigation — next clue appears 25 years later. (10 of 10)" },
    ],
  },
];

export const getExhibit = (id: string) => EXHIBITS.find((e) => e.id === id);
