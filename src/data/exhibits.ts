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
    coda: {
      eyebrow: "Coda",
      title: "The Frequency",
      lead: "Press play.",
      embed: "https://www.youtube.com/embed/YFfN2Geu1p8",
    },
    slides: [
      { src: "/art/exhibits/gnx/gnx01.jpg", alt: "Case #2 — 25 Years Later. 1999: DMX, '…And Then There Was X.' 2024: Kendrick Lamar, GNX. Two cars face each other — one white, one black. (1 of 12)" },
      { src: "/art/exhibits/gnx/gnx02.jpg", alt: "Previously: Case #1 — The Origin of X. Agatha Christie's title trail (1939 slur → 1940 'Ten Little Indians' → 1944 'And Then There Were None') beside DMX = 'Divine Master of the Unknown.' The title changed, the name disappeared, None became X. 25 years later → GNX. Case #1 left us with one question: so what's all this mean — and why does it matter? (2 of 12)" },
      { src: "/art/exhibits/gnx/gnx03.jpg", alt: "The obvious answer: GNX — Grand National eXperimental. Two cars, two meanings? Is 'GNX' a double entendre? (3 of 12)" },
      { src: "/art/exhibits/gnx/gnx04.jpg", alt: "Let's start with G. We have G · N · X but what do they mean? X is known: X = 10 and the unknown. G and N remain unsolved. Many possibilities, not enough evidence yet. (4 of 12)" },
      { src: "/art/exhibits/gnx/gnx05.jpg", alt: "What could G mean? If G · N · X is a code, G could be the key that connects it all. GNX tracks examined: TV Off ('This that Alpha and Omega,' Revelation 1:8), Reincarnated (Ecclesiastes 3:11), Man at the Garden (Genesis 2:15, 3:8, John 20:15), Squabble Up ('Gods knows, I am…' — 'I am' is God's name, Exodus 3:14), Wacced Out Murals ('Know you a God,' Psalm 82:6), Gloria (glory, SZA — Euphoria). Do you lack the heart to glorify Euphoria to make it His? (5 of 12)" },
      { src: "/art/exhibits/gnx/gnx06.jpg", alt: "Gloria → Euphoria. 6½ months before SZA wanted to take Gloria to Euphoria on GNX. The Wiz: 'Everything they say about me is true.' What else is hiding in Euphoria? (6 of 12)" },
      { src: "/art/exhibits/gnx/gnx07.jpg", alt: "What's hiding in Euphoria? Clue 01: YNW Melly — Kendrick says 'In 8 bars… I'm YNW Melly.' Y·N·W = Young · N[—] · World → N = N-word? The unknown 'N' just appeared in Euphoria. Clue 02: DMX on The Breakfast Club (2011) about Drake — Kendrick channels DMX's energy in Euphoria with 'I hate the way…' Clue 03: Kendrick on Silent Hill — 'Peekaboo, can't hide behind your money dawg' — a clear shot at Aubrey. Clue 04: Peekaboo on GNX samples Willie Hale's 'Give Me a Helping Hand.' Did Euphoria just give us the N? (7 of 12)" },
      { src: "", videoEmbed: "https://www.youtube.com/embed/mkf176UlDgI", alt: "DMX on The Breakfast Club — 'I don't like anything about Drake' (YouTube Short)" },
      { src: "/art/exhibits/gnx/gnx08.jpg", alt: "Did we account for everything? Go back to X. Three meanings: 1. The Number — X = 10 in Roman numerals. 2. The Unknown — X is the variable in mathematics; DMX = Divine Master of the Unknown. 3. The Christ — X = Chi (Χ), the Greek letter that is the first letter of Christos (ΧΡΙΣΤΟΣ) — 'Christ.' X as an abbreviation for Christ. XXX? (8 of 12)" },
      { src: "", videoEmbed: "https://www.youtube.com/embed/i8FROyYQBQo", alt: "XXXTentacion — 'If anybody tries to kill me, it was Drake' (YouTube Short)" },
      { src: "/art/exhibits/gnx/gnx09.jpg", alt: "The X Connects — from helping hands to Peekaboo. 01: XXXTentacion's warning to Drake ('If anybody tries to kill me, it was Drake'). 02: XXXTentacion started the #HelpingHandChallenge before Drake's God's Plan. 03: Kendrick on Silent Hill — 'Peekaboo, can't hide behind your money dawg.' 04: Peekaboo on GNX samples 'Give a Helping Hand.' X → XXX → Drake → God's Plan. Is XXXTentacion's murder a mystery? (9 of 12)" },
      { src: "", videoEmbed: "https://www.youtube.com/embed/3BWOfL_cGI0", alt: "Peekaboo — Kendrick Lamar (YouTube Short)" },
      { src: "/art/exhibits/gnx/gnx10.jpg", alt: "Now read GNX again. Three letters, three possibilities. G → God? Evidence from GNX: Man at the Garden, Squabble Up ('I am'), Wacced Out Murals ('Know you a God'), Gloria (glory, same root). N → N-word? Evidence from Euphoria: YNW Melly, the N in YNW, Kendrick's warning to Drake. X → 10 / Unknown / Christ? Evidence from the investigation: Roman numeral, the variable, DMX, Chi = Christos. Three letters. How many meanings? Is there one reading that accounts for all of them? (10 of 12)" },
      { src: "/art/exhibits/gnx/gnx11.jpg", alt: "The Full Cipher. Agatha Christie → 10. DMX → '…And Then There Was X' → None → Unknown (Ten). Euphoria / YNW Melly → YNW → N. Kendrick Lamar → GNX → G.N.X. The pattern connects: N is one middle letter, the center of the pattern; multiple references across art, history, and music; X marks the spot; the N holds the meaning. The N is in the middle. So far the investigation has moved outward. Is there somewhere we haven't looked? Where now? (11 of 12)" },
      { src: "/art/exhibits/gnx/gnx12.jpg", alt: "If one GNX is for Dot, who is the second for? A figure stands between two cars in the House of the Book. If N is in the middle of the woodpile… Where to look now? A triangle: N-Wyrd at the top, N-Word bottom-left, Inward bottom-right. (12 of 12)" },
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
  {
    id: "untitled",
    eyebrow: "An ENIGMA case file",
    title: "untitled unmastered.",
    subtitle: "Case No. 4 — the dates are not footnotes",
    intro: [
      "Eight tracks, seven exact dates and one historical range. Read as a set, the timestamps behave less like release notes and more like a second archive — land, labour, rights, revolt, satellites, coups and courts, all filed under a day of the year.",
      "One of those days is September 6. Scroll slowly. A clue is not a conclusion.",
    ],
    parent: { label: "ENIGMA", to: "/work/enigma" },
    mode: "carousel",
    closing: {
      line: "Eight songs, thirty-four minutes, and an account still open.",
      note: "The images are finalized case files, presented as-is. The historical facts on each card are checkable; the connections between them are interpretation, and the personal entries are testimony rather than proof. Nothing here claims the artist intended any of it.",
    },
    sources: [
      { label: "Wikipedia — untitled unmastered.", url: "https://en.wikipedia.org/wiki/Untitled_Unmastered" },
      { label: "Colored Conventions Project — the 1848 proceedings", url: "https://omeka.coloredconventions.org/items/show/280" },
    ],
    slides: [
      { src: "/art/exhibits/untitled/s01.webp", alt: "01 — The dates are not footnotes. Fact: eight tracks carry seven exact dates and one historical range. Connection: the album can be read as a second archive. An evidence board of pinned photographs strung with red thread, a calendar torn to August 19, 2026. (1 of 20)" },
      { src: "/art/exhibits/untitled/s02.webp", alt: "02 — The complete date order. Fact: 05.28.2013 → 06.23 → 06.30 → 08.14 → 08.19 → 09.06 → 09.21.2014 → 2014–2016. Connection: the chronology is different from the track order. A timeline marking all eight dates. (2 of 20)" },
      { src: "/art/exhibits/untitled/s03.webp", alt: "03 — The 2014–2016 crisis. Fact: Ferguson, Tamir Rice, Baltimore, Charleston, Flint and the rise of Black Lives Matter defined the period. Connection: Track 07 carries that crisis atmosphere without one fixed date. Protesters silhouetted with raised hands, a Black Lives Matter placard, and water bottles. (3 of 20)" },
      { src: "/art/exhibits/untitled/s04.webp", alt: "04 — 05.28, land was taken. Fact: Andrew Jackson signed the Indian Removal Act May 28, 1830. Connection: the album's earliest date opens with Indigenous displacement and contested land. A map of the United States traced with red forced-removal routes. (4 of 20)" },
      { src: "/art/exhibits/untitled/s05.webp", alt: "05 — 05.28, Black citizenship fought. Fact: the Black 54th Massachusetts left Boston May 28, 1863 to fight in the Civil War. Connection: removal and Black military citizenship occupy the same date. Soldiers of the 54th standing in formation beneath the flag. (5 of 20)" },
      { src: "/art/exhibits/untitled/s06.webp", alt: "06 — 06.23, workers' power was limited. Fact: Taft–Hartley became law June 23, 1947, restricting organized labor. Connection: the date asks who may organize, work and hold collective power. A broken chain beside the Act. (6 of 20)" },
      { src: "/art/exhibits/untitled/s07.webp", alt: "07 — 06.23, rights were expanded. Fact: Title IX became law June 23, 1972. Connection: the same date contains both restriction and expanded civil rights. The statute laid across an empty classroom. (7 of 20)" },
      { src: "/art/exhibits/untitled/s08.webp", alt: "08 — 06.30, a literal cosmic crash. Fact: the Tunguska explosion occurred June 30, 1908. Connection: Track 06's date intersects the title Cosmic Crashout. An airburst flattening a forest. (8 of 20)" },
      { src: "/art/exhibits/untitled/s09.webp", alt: "09 — 06.30, stars, sovereignty, Corvettes. Fact: Robert Lawrence was selected June 30, 1957; the first Corvette was completed June 30, 1953. Connection: Black space travel and the Corvette share Track 06's date. An astronaut beside a 1953 Corvette against a starfield. (9 of 20)" },
      { src: "/art/exhibits/untitled/s10.webp", alt: "10 — 08.14, revolution and protection. Fact: Bois Caïman is traditionally dated August 14, 1791; Social Security was signed August 14, 1935. Connection: the date joins revolt against power with government responsibility. A torchlit gathering above the Social Security Act. (10 of 20)" },
      { src: "/art/exhibits/untitled/s11.webp", alt: "11 — 08.19, image, signal, receiver. Fact: photography was announced August 19, 1839; Syncom 3 launched August 19, 1964. Connection: the date concerns who sends the image and who receives it. A bellows camera below a satellite broadcasting over Earth. (11 of 20)" },
      { src: "/art/exhibits/untitled/s12.webp", alt: "12 — 08.19, a hidden hand. Fact: the CIA- and British-backed Iran coup culminated August 19, 1953. Connection: manipulation can intensify conflict without erasing real prejudice or valid grievances. A puppeteer's hand strung over a map of Iran. (12 of 20)" },
      { src: "/art/exhibits/untitled/s13.webp", alt: "13 — 08.19 also found me. Fact: I returned to the album August 19, 2026 — 12 years after Track 01's date. Connection: it is also my wedding and home anniversary; attention, not proof. A calendar reading August 19, 2026 beside two wedding bands and a house key. (13 of 20)" },
      { src: "/art/exhibits/untitled/s14.webp", alt: "14 — 09.06, Track 08: bluefaces. Fact: Kendrick dated Track 08 September 6, 2014; its lyrics join blue faces, banks and Corvettes. Connection: the imagery opens a path through Salmon P. Chase and 'In God We Trust' toward reparations. Chase beside an 1864 two-cent coin and a dollar bill. (14 of 20)" },
      { src: "/art/exhibits/untitled/s15.webp", alt: "15 — 09.06, 34 resolutions. Fact: Black delegates adopted 34 resolutions in Cleveland on September 6, 1848. Connection: Track 08 bears the same date 166 years later, 09.06.2014. A convention hall crowd beneath a ledger reading 34 RESOLUTIONS, and the line 09.06.1848 → 09.06.2014. (15 of 20)" },
      { src: "/art/exhibits/untitled/s16.webp", alt: "16 — Macy Gray opens 34th Street. Fact: Macy Gray was born September 6 in Canton, Ohio. Connection: an associative bridge — Ohio → Macy Gray → Macy's → Miracle on 34th Street. A singer at a microphone beside a Macy's 34th Street marquee and the state of Ohio. (16 of 20)" },
      { src: "/art/exhibits/untitled/s17.webp", alt: "17 — Mail, money and national belief. Fact: the 1947 film uses federal mail; the 1994 remake uses 'In God We Trust' on money. Connection: both turn public belief into evidence a court recognizes. Scales of justice between a US Mail sack and an In God We Trust placard. (17 of 20)" },
      { src: "/art/exhibits/untitled/s18.webp", alt: "18 — 09.21, memory, peace, independence. Fact: 'Yes, Virginia' was published September 21; Nkrumah was born September 21; the UN marks Peace Day. Connection: Track 05's mental strain meets belief, forgetting and incomplete freedom. A newspaper, a brain, a portrait, scales and a peace bell. (18 of 20)" },
      { src: "/art/exhibits/untitled/s19.webp", alt: "19 — 09.21, Track 05: justice. Three short lyric fragments chain the words loopholes, justice, justify and obituary. Connection: legal language becomes a chain about violence and the unequal price of justice. A courthouse, scales bound in chain, and an obituary. (19 of 20)" },
      { src: "/art/exhibits/untitled/s20.webp", alt: "20 — Released 3/4. Runtime: 34 minutes. Fact: the album was released March 4, 2016 with eight songs and a displayed 34-minute runtime. Connection: 3/4 → 34 → 34th Street → the unfinished account. A ledger stamped ACCOUNT STILL OPEN. (20 of 20)" },
    ],
  },
];

export const getExhibit = (id: string) => EXHIBITS.find((e) => e.id === id);

// Case files parented to a given detail route (e.g. "/work/rapgod").
export const exhibitsForParent = (to: string) => EXHIBITS.filter((e) => e.parent.to === to);
