// ─────────────────────────────────────────────────────────────────────────────
// Scrolling exhibits — long-form image essays presented as a vertical scroll,
// in the spirit of the monograph. Each is reached as its own option from a
// project page (e.g. RapGod). Slides are finalized assets, shown as-is.
// ─────────────────────────────────────────────────────────────────────────────
export interface ExhibitSlide {
  src: string;
  alt: string;
  custom?: string; // renders a bespoke HTML slide (by key) instead of the image
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
  coda?: { eyebrow: string; title: string; lead: string; embed: string; note?: string }; // a closing embedded video/montage
  sources?: { label: string; url: string }[]; // reference links shown at the end
}

export const EXHIBITS: Exhibit[] = [
  {
    id: "christie-dmx",
    eyebrow: "An Enigma case file",
    title: "Agatha Christie × DMX",
    subtitle: "A mystery from 1939 → 1999",
    intro: [
      "One case, told across eleven files: how a novel's changing titles and a rapper's changing name open a question about numbers, words, etymology, classification, and identity.",
      "Scroll slowly. A clue is not a conclusion.",
    ],
    parent: { label: "RapGod", to: "/work/rapgod" },
    closing: {
      line: "What started as a music question became a question about language, classification, and identity.",
      note: "The images are finalized case files, presented as-is. Historical word-usage is documented, not endorsed — this is an inquiry into how meaning changes, not a claim.",
    },
    audio: { url: "https://soundcloud.com/theawesomegregdawson/my-niggas-ft-dmx", label: "DMX" },
    coda: {
      eyebrow: "Coda",
      title: "Intermission",
      lead: "A closing montage — Malcolm X on land, indigeneity, and what's owed, cut against the X of …And Then There Was X and Dom Kennedy. Press play.",
      embed: "https://archive.org/embed/a-real-ngga-intermission-1",
      note: "A montage assembled for this file; the underlying works belong to their artists.",
    },
    sources: [
      { label: "Etymonline — word history", url: "https://www.etymonline.com/word/nigger" },
      { label: "Wikipedia — And Then There Were None", url: "https://en.wikipedia.org/wiki/And_Then_There_Were_None" },
      { label: "Wikipedia — the “woodpile” idiom", url: "https://en.wikipedia.org/wiki/Nigger_in_the_woodpile" },
      { label: "Wikipedia — DMX", url: "https://en.wikipedia.org/wiki/DMX" },
    ],
    slides: [
      { src: "/art/exhibits/christie-dmx/a01.jpg", alt: "Case #1 — 'And then there was…' A mystery from 1939 to 1999: Agatha Christie × DMX. What connects them? (1 of 9)" },
      { src: "/art/exhibits/christie-dmx/a02.jpg", alt: "1939 — Agatha Christie publishes the novel now known as 'And Then There Were None' — but that wasn't its original title. Follow the title. (2 of 9)" },
      { src: "/art/exhibits/christie-dmx/a03.jpg", alt: "1999 — 60 years later, DMX releases '…And Then There Was X.' Christie: None; DMX: X; but X = 10. Why does 10 matter? (3 of 9)" },
      { src: "/art/exhibits/christie-dmx/a04.jpg", alt: "Follow the number: Christie counts 10 → 9 → 8 → … → None; DMX replaces None with X; in Roman numerals X = 10. 10 → None → X → 10. Coincidence, or worth digging? (4 of 9)" },
      { src: "/art/exhibits/christie-dmx/ax.jpg", alt: "The meaning of DMX — 'Divine Master of the Unknown.' What does 'X' represent? The unknown, the unseen, the unwritten — the origins that were taken away. Malcolm X chose 'X' as his last name to reflect the unknown origins of those who were enslaved. X: a symbol, a question, a truth they tried to erase." },
      { src: "/art/exhibits/christie-dmx/a05.jpg", alt: "The number led back to a word: Christie's original 1939 title used a racial slur. The title changed; the word disappeared. Where did the word come from? (5 of 9)" },
      { src: "", custom: "etymology", alt: "Etymology & identity — one slur crossed many native lands. The word was historically applied to dark-skinned natives across the Philippines (Indigenous Negrito peoples), Central America (the Garifuna), the United States (ODB / Shinnecock), and Hawaii (King Kamehameha I / Native Hawaiian). If it meant 'a dark-skinned native,' what does it mean that it anchored most deeply in the United States — and what might that reveal about land, race, and identity in America? (6 of 9)" },
      { src: "/art/exhibits/christie-dmx/a07.jpg", alt: "The word travels: the same slur, anchored in America, was applied to dark-skinned natives across India, Australia, the Pacific Islands, and the Americas. Why is only the American called African? (7 of 9)" },
      { src: "/art/exhibits/christie-dmx/a08.jpg", alt: "The woodpile clue: Christie uses the idiom again — 'They do it with mirrors.' A concealed motive or unknown factor [OED 1989], attested by 1889 and in Thornton's 'American Glossary' (1912). What undisclosed fact changes the case? (8 of 9)" },
      { src: "/art/exhibits/christie-dmx/a09.jpg", alt: "The title trail: one story, multiple titles — the censored 1939 UK title, 'And Then There Were None' (1940 US), and 'Ten Little Indians' (1954–1966 US paperbacks). Slur → None → Indians. What changed — language, identity, or both? (9 of 9)" },
      { src: "/art/exhibits/christie-dmx/a10.png", alt: "The case summary — Christie's title trail (1939 'Ten Little [censored slur]' → 1940 'Ten Little Indians' → 1944 'And Then There Were None') beside DMX = 'Divine Master of the Unknown,' where X = the unknown. What the case established: ten keeps recurring; a racialized name disappeared from the title; the replacement ends at None; DMX's name points to the unknown; and X is the universal symbol for an unknown. The title changed, the name disappeared, X means the unknown. So what, exactly, is X? The case remains open — next clue: X appears again, 25 years later." },
    ],
  },
  {
    id: "nwyrd",
    eyebrow: "An ENIGMA case file",
    title: "NWyrd",
    subtitle: "Case No. 3 — coincidence, or wyrd?",
    intro: [
      "Wyrd — Old English for fate — isn't a straight line but a web: past actions, present events, people, and circumstances shaping what comes next. Put an N at the center and listen for what repeats.",
      "Scroll slowly. A clue is not a conclusion.",
    ],
    parent: { label: "RapGod", to: "/work/rapgod" },
    closing: {
      line: "Coincidence, or wyrd? Come with an open ear — leave with your own meaning.",
      note: "The images are finalized case files, presented as-is — an inquiry into pattern and fate, not a claim.",
    },
    coda: {
      eyebrow: "The Mix",
      title: "The God Frequency",
      lead: "A sequence of songs, words, names, and sounds as one piece. Press play, and listen for what repeats.",
      embed: "https://archive.org/embed/nwyrd-mix-1",
      note: "A montage assembled for this file; the underlying works belong to their artists.",
    },
    slides: [
      { src: "/art/exhibits/nwyrd/n1.jpg", alt: "In the beginning was the word — and you followed it. This is where the journey turns inward. (1 of 6)" },
      { src: "/art/exhibits/nwyrd/n2.jpg", alt: "What is Wyrd? Old English for fate, destiny, what comes to pass — but not a fixed future. Think of wyrd as a web: past actions, present events, people and circumstances shaping what comes next. Wyrd in works: Throne of Blood (1957), Macbeth, Beowulf. Not a straight line — a web. (2 of 6)" },
      { src: "/art/exhibits/nwyrd/n3.jpg", alt: "N + Wyrd: put N at the centre of the web — music, books, people, place, time, and world all connecting. The centre connects: N-WYRD. (3 of 6)" },
      { src: "/art/exhibits/nwyrd/n4.jpg", alt: "Listen first. Don't solve it, don't search for it — just listen. What repeats? What connects? What did you notice? Come with an open ear; leave with your own meaning. (4 of 6)" },
      { src: "/art/exhibits/nwyrd/n5.jpg", alt: "The N-WYRD Mix — 'The God Frequency': a sequence of songs, words, names, and sounds as one piece. Press play; enter the frequency. (5 of 6)" },
      { src: "/art/exhibits/nwyrd/n6.jpg", alt: "What did you hear — coincidence, or wyrd? (6 of 6)" },
    ],
  },
];

export const getExhibit = (id: string) => EXHIBITS.find((e) => e.id === id);

// Case files parented to a given detail route (e.g. "/work/rapgod").
export const exhibitsForParent = (to: string) => EXHIBITS.filter((e) => e.parent.to === to);
