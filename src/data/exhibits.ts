// ─────────────────────────────────────────────────────────────────────────────
// Scrolling exhibits — long-form image essays presented as a vertical scroll,
// in the spirit of the monograph. Each is reached as its own option from a
// project page (e.g. RapGod). Slides are finalized assets, shown as-is.
// ─────────────────────────────────────────────────────────────────────────────
export interface ExhibitSlide {
  src: string;
  alt: string;
  custom?: string; // renders a bespoke HTML slide (by key) instead of the image
  // An embedded video overlaid on a region of the slide image (percentages of the
  // image box) — e.g. dropped into a "play" area baked into the artwork.
  videoEmbed?: string;
  videoBox?: { left: number; top: number; width: number; height: number };
}

export interface Exhibit {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  parent: { label: string; to: string }; // where it lives / back link
  closing: { line: string; note?: string };
  mode?: "scroll" | "carousel"; // seamless vertical scroll (default) or a click-through carousel
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
    parent: { label: "ENIGMA", to: "/work/enigma" },
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
    id: "gnx",
    eyebrow: "An ENIGMA case file",
    title: "GNX",
    subtitle: "Case No. 2 — 25 years later",
    intro: [
      "Case #1 left us with one question: what does X really mean? 25 years after DMX's '…And Then There Was X,' Kendrick Lamar drops GNX. Three letters. Three possibilities. Is this a double entendre — or a cipher?",
      "Scroll slowly. A clue is not a conclusion.",
    ],
    parent: { label: "ENIGMA", to: "/work/enigma" },
    closing: {
      line: "Three letters. How many meanings? The pattern connects — but where does it lead?",
      note: "The images are finalized case files, presented as-is — an inquiry into pattern, language, and meaning, not a claim.",
    },
    slides: [
      { src: "/art/exhibits/gnx/gnx01.jpg", alt: "Case #2 — 25 Years Later. 1999: DMX, '…And Then There Was X.' 2024: Kendrick Lamar, GNX. Two cars face each other — one white, one black. (1 of 12)" },
      { src: "/art/exhibits/gnx/gnx02.jpg", alt: "Previously: Case #1 — The Origin of X. Agatha Christie's title trail (1939 slur → 1940 'Ten Little Indians' → 1944 'And Then There Were None') beside DMX = 'Divine Master of the Unknown.' The title changed, the name disappeared, None became X. 25 years later → GNX. Case #1 left us with one question: what does X really mean? (2 of 12)" },
      { src: "/art/exhibits/gnx/gnx03.jpg", alt: "The obvious answer: GNX — Grand National eXperimental. Two cars, two meanings? Is 'GNX' a double entendre? (3 of 12)" },
      { src: "/art/exhibits/gnx/gnx04.jpg", alt: "What about G? We have G · N · X but what do they mean? X is known: X = 10 and the unknown. G and N remain unsolved. Many possibilities, not enough evidence yet. (4 of 12)" },
      { src: "/art/exhibits/gnx/gnx05.jpg", alt: "What could G mean? If G · N · X is a code, G could be the key that connects it all. GNX tracks examined: TV Off ('This that Alpha and Omega,' Revelation 1:8), Reincarnated (Ecclesiastes 3:11), Man at the Garden (Genesis 2:15, 3:8, John 20:15), Squabble Up ('Gods knows, I am…' — 'I am' is God's name, Exodus 3:14), Wacced Out Murals ('Know you a God,' Psalm 82:6), Gloria (glory, SZA — Euphoria). Do you lack the heart to glorify Euphoria to make it His? (5 of 12)" },
      { src: "/art/exhibits/gnx/gnx06.jpg", alt: "Gloria → Euphoria. 6½ months before SZA wanted to take Gloria to Euphoria on GNX. The Wiz: 'Everything they say about me is true.' What else is hiding in Euphoria? (6 of 12)" },
      { src: "/art/exhibits/gnx/gnx07.jpg", alt: "What's hiding in Euphoria? Clue 01: YNW Melly — Kendrick says 'In 8 bars… I'm YNW Melly.' Y·N·W = Young · N[—] · World → N = N-word? The unknown 'N' just appeared in Euphoria. Clue 02: DMX on The Breakfast Club (2011) about Drake — Kendrick channels DMX's energy in Euphoria with 'I hate the way…' Clue 03: Kendrick on Silent Hill — 'Peekaboo, can't hide behind your money dawg' — a clear shot at Aubrey. Clue 04: Peekaboo on GNX samples Willie Hale's 'Give Me a Helping Hand.' Did Euphoria just give us the N? (7 of 12)" },
      { src: "/art/exhibits/gnx/gnx08.jpg", alt: "Did we account for everything? Go back to X. Three meanings: 1. The Number — X = 10 in Roman numerals. 2. The Unknown — X is the variable in mathematics; DMX = Divine Master of the Unknown. 3. The Christ — X = Chi (Χ), the Greek letter that is the first letter of Christos (ΧΡΙΣΤΟΣ) — 'Christ.' X as an abbreviation for Christ. XXX? (8 of 12)" },
      { src: "/art/exhibits/gnx/gnx09.jpg", alt: "The X Connects — from helping hands to Peekaboo. 01: XXXTentacion's warning to Drake ('If anybody tries to kill me, it was Drake'). 02: XXXTentacion started the #HelpingHandChallenge before Drake's God's Plan. 03: Kendrick on Silent Hill — 'Peekaboo, can't hide behind your money dawg.' 04: Peekaboo on GNX samples 'Give a Helping Hand.' X → XXX → Drake → God's Plan. Is XXXTentacion's murder a mystery? (9 of 12)" },
      { src: "/art/exhibits/gnx/gnx10.jpg", alt: "Now read GNX again. Three letters, three possibilities. G → God? Evidence from GNX: Man at the Garden, Squabble Up ('I am'), Wacced Out Murals ('Know you a God'), Gloria (glory, same root). N → N-word? Evidence from Euphoria: YNW Melly, the N in YNW, Kendrick's warning to Drake. X → 10 / Unknown / Christ? Evidence from the investigation: Roman numeral, the variable, DMX, Chi = Christos. Three letters. How many meanings? Is there one reading that accounts for all of them? (10 of 12)" },
      { src: "/art/exhibits/gnx/gnx11.jpg", alt: "The Full Cipher. Agatha Christie → 10. DMX → '…And Then There Was X' → None → Unknown (Ten). Euphoria / YNW Melly → YNW → N. Kendrick Lamar → GNX → G.N.X. The pattern connects: N is one middle letter, the center of the pattern; multiple references across art, history, and music; X marks the spot; the N holds the meaning. The N is in the middle. So far the investigation has moved outward. Is there somewhere we haven't looked? Where now? (11 of 12)" },
      { src: "/art/exhibits/gnx/gnx12.jpg", alt: "If N is in the middle of the woodpile… Where to look now? A triangle: N-word at the top, Inward on the left, NWyrd on the right, N at the center. Why is there a second car in the House of the Book? Next exhibit → (12 of 12)" },
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
    parent: { label: "ENIGMA", to: "/work/enigma" },
    mode: "carousel",
    closing: {
      line: "Coincidence, or wyrd? Come with an open ear — leave with your own meaning.",
      note: "The images are finalized case files, presented as-is — an inquiry into pattern and fate, not a claim.",
    },
    slides: [
      { src: "/art/exhibits/nwyrd/n1.jpg", alt: "In the beginning was the word — and you followed it. This is where the journey turns inward. (1 of 6)" },
      { src: "/art/exhibits/nwyrd/n2.jpg", alt: "What is Wyrd? Old English for fate, destiny, what comes to pass — but not a fixed future. Think of wyrd as a web: past actions, present events, people and circumstances shaping what comes next. Wyrd in works: Throne of Blood (1957), Macbeth, Beowulf. Not a straight line — a web. (2 of 6)" },
      { src: "/art/exhibits/nwyrd/n3.jpg", alt: "N + Wyrd: put N at the centre of the web — music, books, people, place, time, and world all connecting. The centre connects: N-WYRD. (3 of 6)" },
      { src: "/art/exhibits/nwyrd/n4.jpg", alt: "Listen first. Don't solve it, don't search for it — just listen. What repeats? What connects? What did you notice? Come with an open ear; leave with your own meaning. (4 of 6)" },
      {
        src: "/art/exhibits/nwyrd/n5.jpg",
        alt: "The N-WYRD Mix — 'The God Frequency': a sequence of songs, words, names, and sounds as one piece. Press play; enter the frequency. (5 of 6)",
        videoEmbed: "https://archive.org/embed/nwyrd-mix-1",
        videoBox: { left: 0, top: 43, width: 100, height: 42 },
      },
      { src: "/art/exhibits/nwyrd/n6.jpg", alt: "What did you hear — coincidence, or wyrd? (6 of 6)" },
    ],
  },
];

export const getExhibit = (id: string) => EXHIBITS.find((e) => e.id === id);

// Case files parented to a given detail route (e.g. "/work/rapgod").
export const exhibitsForParent = (to: string) => EXHIBITS.filter((e) => e.parent.to === to);
