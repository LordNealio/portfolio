// ─────────────────────────────────────────────────────────────────────────────
// EDUCATION MODULE 01 — "The Enigmatic Cipher"
// An inquiry-based carousel lesson for the N-Word research study. It sits
// between the pre-survey and post-survey.
//
// The 12 carousel images are FINALIZED educational assets (public/art/cipher/*).
// They are displayed as-is: never regenerated, cropped, recolored, or overlaid.
// Alt text + transcripts describe them for accessibility. Evidence labels
// classify the material without altering the artwork.
//
// SOURCE POLICY: only source information clearly present in the images or the
// project is recorded. Unverified claims carry a developer-facing TODO
// ("SOURCE NEEDED — do not publish this claim as documented.") and must not be
// presented as documented until a primary/secondary source is added.
// ─────────────────────────────────────────────────────────────────────────────

export const CIPHER = {
  eyebrow: "N-Word Research Project · Education Module 01",
  title: "The Enigmatic Cipher",
  subtitle: "How words, titles, classifications, and hidden assumptions change over time.",
  essentialQuestion:
    "What happens when a word is removed, renamed, or reassigned — but its historical function or associations remain?",
  notice:
    "This module contains uncensored historical racial language and examines its use in etymology, literature, accounting language, mathematics, music, and American classification. The language is presented for critical educational analysis — not endorsement.",
  objectives: [
    "Distinguish documented history from disputed origins and personal interpretation.",
    "Examine how changing a word or title can change — and sometimes remove — historical context.",
    "Understand the difference between noticing a pattern and proving a causal relationship.",
    "Identify which questions require additional primary-source research.",
    "Record how the material affected or changed your interpretation.",
  ],
};

// The four persistent evidence categories (the legend).
export type EvCat = "documented" | "disputed" | "interpretive" | "personal";
export const EVIDENCE_LEGEND: { cat: EvCat; label: string; note: string }[] = [
  { cat: "documented", label: "Documented Record", note: "Supported by a primary or secondary source." },
  { cat: "disputed", label: "Disputed or Unresolved", note: "Contested, uncertain, or not an accepted account." },
  { cat: "interpretive", label: "Interpretive Connection", note: "A proposed relationship — not proof of intent." },
  { cat: "personal", label: "Personal Research Observation", note: "The researcher's own note or reflection." },
];

export interface EvLabel {
  text: string;
  cat: EvCat;
}
export interface CipherSlide {
  id: string;
  src: string;
  alt: string;
  transcript: string;
  labels: EvLabel[];
  evidence: {
    claim: string;
    source: string; // a real source, or the SOURCE-NEEDED sentinel below
    uncertain: string;
    questions: string;
  };
}

export const SOURCE_NEEDED = "SOURCE NEEDED — do not publish this claim as documented.";

export const SLIDES: CipherSlide[] = [
  {
    id: "01-hook",
    src: "/art/cipher/01-hook.png",
    alt: "Vintage newspaper-style title card asking whether America has the 'Indian giver' story backwards, with icons for who gave, who took back, and who was renamed.",
    transcript:
      "An Etymological Mystery. Headline: 'What if America has the Indian Giver story backwards?' Three icons frame the inquiry — a gift ('Who gave?'), an unlocked padlock ('Who took back?'), and a feather ('Who was renamed?'). Footer: swipe to follow the word.",
    labels: [
      { text: "Research Question", cat: "interpretive" },
      { text: "Interpretive Connection", cat: "interpretive" },
    ],
    evidence: {
      claim: "Poses the module's central inquiry: that the popular 'Indian giver' narrative may invert who gave and who took.",
      source: SOURCE_NEEDED,
      uncertain: "This is a framing question, not a claim; nothing here is asserted as fact yet.",
      questions: "Where does the phrase 'Indian giver' first appear in print, and how did its meaning shift?",
    },
  },
  {
    id: "02-word-pattern",
    src: "/art/cipher/02-word-pattern.png",
    alt: "A linguistics slide placing the -er agent-noun pattern (build+er, dig+er, paint+er) beside a hypothesized spelling of the racial slur, with a 'Dictionary Reality' panel of caveats.",
    transcript:
      "Linguistic fun fact — 'the word that breaks the pattern?' The slide lays out the English agent-noun pattern: build + er = builder, dig + er = digger, paint + er = painter, then poses 'nig + er = ?'. A 'Dictionary Reality' panel states: 'nig' can mean to renege or revoke; a dictionary entry calls 'nig' short for 'renig'; Merriam-Webster lists 'reneger' for the doer; the resemblance to the slur is NOT an accepted etymology; the spelling pattern suggests a connection; etymology requires evidence.",
    labels: [
      { text: "Disputed or Unresolved", cat: "disputed" },
      { text: "Linguistic Hypothesis", cat: "disputed" },
    ],
    evidence: {
      claim: "Proposes a spelling-pattern resemblance between the slur and an '-er' agent noun. The slide itself states this is NOT accepted etymology.",
      source:
        "Merriam-Webster is cited on the slide ('nig' / 'renig' / 'reneger'). " + SOURCE_NEEDED + " (verify the exact dictionary entries and dates before presenting as documented).",
      uncertain: "Whether the spelling resemblance reflects any actual etymological relationship. It is presented as a hypothesis under investigation, not a conclusion.",
      questions: "What do the OED and Merriam-Webster actually record for 'nig'/'renig'? Is there any documented etymological link, or only orthographic coincidence?",
    },
  },
  {
    id: "03-hopi-knowledge",
    src: "/art/cipher/03-hopi-knowledge.png",
    alt: "A slide summarizing a Hopi oral tradition in which the first gift was knowledge — Ant People, Màasaw, and the Hopi — asking who the true 'Indian givers' were.",
    transcript:
      "In Hopi oral tradition: 'The first gift was knowledge.' Three entries — (1) Ant People: survival, shelter, food-storage knowledge; (2) Màasaw: corn, planting stick, responsibility for the land; (3) Hopi: dry-farming knowledge refined across generations. It asks: 'Who are the true Indian givers?' and answers 'The ones who gave knowledge — not the ones accused of taking back.' A note reads: a traditional account; details may vary by Hopi community.",
    labels: [
      { text: "Cultural Account", cat: "interpretive" },
      { text: "Source Verification Required", cat: "disputed" },
    ],
    evidence: {
      claim: "Recounts a Hopi oral tradition centering knowledge as the first gift, reframing the 'Indian giver' idea.",
      source: SOURCE_NEEDED + " (a cited, community-accountable source for this account is required; the slide notes details vary by community).",
      uncertain: "The specific details and their generality across Hopi communities; oral traditions vary and should not be flattened into a single authoritative version.",
      questions: "Which published Hopi sources or community authorities document this account, and how do versions differ?",
    },
  },
  {
    id: "04-identity",
    src: "/art/cipher/04-identity.png",
    alt: "Documentary-style panel 'Etymology & Identity — one slur crossed many native lands,' showing groups labeled Philippines (Indigenous Negrito Peoples), Central America (Garifuna People), United States (ODB / Russell Tyrone Jones · Shinnecock), and Hawaii (King Kamehameha I · Native Hawaiian).",
    transcript:
      "Etymology & Identity — 'one slur crossed many native lands.' Four labeled images: Philippines (Indigenous Negrito Peoples); Central America (Garifuna People); United States (ODB / Russell Tyrone Jones · Shinnecock); Hawaii (King Kamehameha I · Native Hawaiian). Text: if the slur was historically used to mean 'a dark-skinned native,' what does it mean that the word became most deeply anchored in the United States? What might that reveal about the history of land, race, and identity in America?",
    labels: [
      { text: "Interpretive Connection", cat: "interpretive" },
      { text: "Identity Question", cat: "interpretive" },
    ],
    evidence: {
      claim: "That the slur was historically applied to dark-skinned Indigenous peoples across regions (Philippines, Central America, Hawaii), and asks why it became most deeply anchored in the United States.",
      source: SOURCE_NEEDED + " (documentation for the term's application to each named people, and for the individual heritage claims, is required).",
      uncertain: "Whether shared usage implies shared identity or ancestry, and the specific heritage claims (e.g., ODB's Shinnecock ancestry) each need their own verification.",
      questions: "What primary records document the term's application in each region? What is documented about each named individual's Indigenous heritage, and about why the word anchored in the U.S.?",
    },
  },
  {
    id: "05-identity-alt",
    src: "/art/cipher/05-identity-alt.png",
    alt: "A second 'Etymology & Identity — one slur crossed many native lands' panel, extending the theme to Andaman Islands (Indigenous Andamanese), Australia (Sol Bellear · Bundjalung), United States (Dick Gregory), and Fiji (Ratu Seru Cakobau).",
    transcript:
      "Etymology & Identity — 'one slur crossed many native lands,' continued with four more labeled portraits: Andaman Islands (Indigenous Andamanese); Australia (Sol Bellear · Bundjalung); United States (Dick Gregory · Black American); Fiji (Ratu Seru Cakobau · iTaukei Fijian). Text: English colonists also applied the slur to dark-skinned native peoples in India, Australia, and Polynesia. It asks whether that old usage preserves an identity clue or only shows how colonizers reused one word across peoples, and cautions: appearance alone does not prove ancestry — family records, tribal ties, and historical evidence matter.",
    labels: [
      { text: "Interpretive Connection", cat: "interpretive" },
      { text: "Identity Question", cat: "interpretive" },
    ],
    evidence: {
      claim: "Extends the identity theme to four more regions (Andaman, Australia, U.S., Fiji), asking whether shared colonial usage preserves an identity clue.",
      source: SOURCE_NEEDED + " (documentation for the colonial application of the term across these regions is required).",
      uncertain: "Whether shared colonial usage implies any shared identity or ancestry; the slide itself cautions appearance does not prove ancestry.",
      questions: "Which primary colonial-era records document this usage in each region?",
    },
  },
  {
    id: "06-woodpile",
    src: "/art/cipher/06-woodpile.png",
    alt: "A slide on 'The Woodpile Clue' — a dated, offensive historical idiom — explaining its meaning ('some undisclosed fact') and an accounting gloss, and noting Agatha Christie's reuse of the phrase.",
    transcript:
      "'The Woodpile Clue,' labeled a historical idiom that is offensive and dated. The Meaning: 'some fact of considerable importance that is not disclosed — something suspicious or wrong.' The Accounting Connection: early glosses described it as a way of accounting for missing fuel — an explanation for a discrepancy, not a formal bookkeeping term. It notes Agatha Christie repeats the clue in 'And Then There Were None' (Justice Wargrave) and 'They Do It With Mirrors' (Inspector Curry), and asks: what undisclosed fact changes the case?",
    labels: [
      { text: "Documented Historical Idiom", cat: "documented" },
      { text: "Interpretive Application", cat: "interpretive" },
    ],
    evidence: {
      claim: "The idiom is a real, dated English phrase meaning an undisclosed important fact; the slide adds an 'accounting for missing fuel' gloss and Christie reuses.",
      source:
        "The idiom's meaning is recorded in English dictionaries (secondary). The 'accounting for missing fuel' gloss and the specific Christie citations: " + SOURCE_NEEDED + ".",
      uncertain: "The origin/accounting gloss and whether Christie's uses are meaningful beyond the idiom's ordinary sense.",
      questions: "Which dictionaries record the idiom and its earliest attestations? Where exactly does Christie use it, and in what sense?",
    },
  },
  {
    id: "07-title-trail",
    src: "/art/cipher/07-title-trail.png",
    alt: "A slide 'The Title Trail — one story, three titles,' tracing Agatha Christie's novel through its 1939 UK title, the 1940 US 'And Then There Were None,' and later US 'Ten Little Indians,' framed as truth → erasure → replacement.",
    transcript:
      "'The Title Trail — one story, three titles.' 1939, United Kingdom: original title (which used the slur). 1940, United States: 'And Then There Were None' (removal). 1964–1986, US paperbacks: 'Ten Little Indians' (substitution). Labeled documented publication history. The thesis under examination: truth → erasure → replacement. It asks whether the title changes only remove offensive language or can also be read as shifting who disappears from the story, and cautions: not a single global sequence — the U.S. used 'None' before later using 'Indians.'",
    labels: [
      { text: "Documented Publication History", cat: "documented" },
      { text: "Interpretive Question", cat: "interpretive" },
    ],
    evidence: {
      claim: "Christie's novel was published under different titles over time (UK original; US 'And Then There Were None'; later 'Ten Little Indians').",
      source:
        "Publication history of Agatha Christie's 1939 novel (secondary/reference). " + SOURCE_NEEDED + " for exact editions/dates; the slide notes the sequence was not a single global chronology.",
      uncertain: "Whether the retitling should be read as 'shifting who disappears' (interpretation) versus simply removing a slur.",
      questions: "What do bibliographies record for each edition and country? Which interpretation the evidence supports.",
    },
  },
  {
    id: "08-cta",
    src: "/art/cipher/08-cta.png",
    alt: "A call-to-action slide, 'The investigation continues,' inviting the learner to follow the studies, record reflections in MindWrite, and organize evidence in MindVault.",
    transcript:
      "The next step: 'The investigation continues.' 1) Follow the studies. 2) Get your MindWrite. 3) Organize the evidence in MindVault. 'Get your mind ready for what comes next.'",
    labels: [{ text: "Reflection Prompt", cat: "personal" }],
    evidence: {
      claim: "Invites continued inquiry and note-taking in the project's tools.",
      source: "Refers to the project's own MindWrite / MindVault tools.",
      uncertain: "Nothing factual is claimed here.",
      questions: "What would you want to record or organize before the post-survey?",
    },
  },
  {
    id: "09-bonus-turing",
    src: "/art/cipher/09-bonus-turing.png",
    alt: "Bonus research note 'Turing's Hidden Axiom,' quoting Robin Gandy (1956) that Turing called the axiom of extensionality by the dated slur, and explaining extensionality (A = B if they have the same members).",
    transcript:
      "Bonus research note: 'Turing's Hidden Axiom.' It reports that in 1956 Robin Gandy wrote that Alan Turing 'always spoke of the axiom of extensionality' using a dated, offensive phrase (the woodpile idiom). Labeled a historical quotation, offensive and dated. Extensionality in plain English: A = B if A and B have the same members — a change in name does not change what the set contains. It asks: when a word or title changes, what history remains inside and what becomes harder to see? A note: 'Not proof — a reason to investigate more carefully.' Source: R. O. Gandy, The Journal of Symbolic Logic, 1956.",
    labels: [
      { text: "Documented Turing Reference", cat: "documented" },
      { text: "Interpretive Application", cat: "interpretive" },
    ],
    evidence: {
      claim: "Gandy (1956) recorded Turing using the dated idiom for the axiom of extensionality; the module reads extensionality (renaming does not change membership) as a metaphor for its inquiry.",
      source: "R. O. Gandy, The Journal of Symbolic Logic, 1956 (as cited on the slide). Verify the exact quotation and page.",
      uncertain: "The metaphorical application (renaming vs. content) is interpretive, not a claim about Turing's intent.",
      questions: "What is the exact Gandy quotation and citation? Does the extensionality analogy hold up under scrutiny?",
    },
  },
  {
    id: "10-bonus-cipher",
    src: "/art/cipher/10-bonus-cipher.png",
    alt: "Bonus connection 'The Enigmatic Cipher,' tracing Neal Stephenson → The Diamond Age (1995) → Cryptonomicon (1999) → Enigma → Alan Turing, and comparing the novel's codebreaking method to this project's method.",
    transcript:
      "Bonus connection: 'The Enigmatic Cipher.' A cipher wheel accompanies a chain: Neal Stephenson → The Diamond Age (1995) → Cryptonomicon (1999) → Enigma → Alan Turing. 'How the novel began': Stephenson says its kernel was the Allies hiding that they had broken the Enigma code; the novel moves between WWII codebreaking and the modern information age. 'The shared investigative method' compares Cryptonomicon (codes, hidden signals, misdirection, information beneath the surface) with this project (etymology, idioms, title changes, missing historical context). A personal note: 'My name is Neal. Stephenson's book leads to Turing. Turing's phrase led me deeper into this study.' A method line: 'Not proof — a research model: decode · cross-check · trace the source.' Source: Neal Stephenson, official Cryptonomicon page.",
    labels: [
      { text: "Documented Literary Connection", cat: "documented" },
      { text: "Personal Research Observation", cat: "personal" },
    ],
    evidence: {
      claim: "Neal Stephenson wrote The Diamond Age (1995) and Cryptonomicon (1999), which involve cryptography, the Enigma code, and Turing; the researcher notes a personal name connection and adopts a decode/cross-check/trace method.",
      source: "Neal Stephenson, official Cryptonomicon page (as cited on the slide); the publication facts are documented. The name-connection is a personal observation, not evidence of intent.",
      uncertain: "The name connection and its significance are personal/interpretive, not documented intent.",
      questions: "The publication and plot facts are verifiable; what, if anything, could make the name connection more than coincidence?",
    },
  },
  {
    id: "11-final-dmx",
    src: "/art/cipher/11-final-dmx.png",
    alt: "Final connection 'The Final Variable,' comparing Agatha Christie's title change (Ten → None) with DMX's 1999 album '…And Then There Was X,' reading X as the Roman numeral ten (Ten → None → X → Ten).",
    transcript:
      "Final connection: 'The Final Variable.' Left: Agatha Christie, 1939 — the story begins with ten; the title becomes 'And Then There Were None.' Center: '…and then there was X — X = 10.' Right: DMX, 1999 — the album title reads '…And Then There Was X.' The pattern: Ten → None → X → Ten. Christie's title moves from ten to none; DMX's title moves from none to X; read X as the Roman numeral 10 and the ten returns. It states plainly: no documented proof of intent — an interpretive cipher worth investigating. It asks: coincidence, homage, or cultural echo? Source: youngblesser.com.",
    labels: [
      { text: "Documented Titles", cat: "documented" },
      { text: "Interpretive Cultural Connection", cat: "interpretive" },
    ],
    evidence: {
      claim: "Christie's title (Ten → None) and DMX's 1999 album '…And Then There Was X' are both real; the module reads them as a Ten → None → X → Ten cipher.",
      source: "The Christie title and the DMX album title/year are documented (reference). The connection between them: interpretive — the slide states there is 'no documented proof of intent.'",
      uncertain: "Whether the parallel is coincidence, homage, or cultural echo. The slide explicitly disclaims documented intent.",
      questions: "Are there any statements by DMX or collaborators about the title? What evidence would distinguish coincidence from homage?",
    },
  },
  {
    id: "12-closing",
    src: "/art/cipher/12-closing.png",
    alt: "Closing card, 'The question is yours,' urging the reader to think, trace the sources, test the connection, share what they find, and not to take the researcher's word for it.",
    transcript:
      "'The question is yours.' Does X complete the pattern — or does it open another question? 'Don't take my word for it.' Think · trace the sources · test the connection · share what you find. 'Send this to someone who will question it.' Explore more research, stories and tools.",
    labels: [{ text: "Reflection Prompt", cat: "personal" }],
    evidence: {
      claim: "Closes the module by returning the inquiry to the learner and emphasizing source-tracing over conclusion.",
      source: "The researcher's own closing prompt.",
      uncertain: "By design — the module ends with an open question, not an answer.",
      questions: "Which connection would you investigate first, and what source would you look for?",
    },
  },
];

// Post-carousel synthesis — four expandable sections.
export const SYNTHESIS = [
  {
    id: "record",
    title: "What the record establishes",
    body: [
      "The English '-er' agent-noun pattern (builder, digger, painter) is ordinary morphology — the slide itself states the slur's resemblance is not an accepted etymology.",
      "Agatha Christie's 1939 novel was published under different titles over time; the retitling is documented publication history (though not a single global sequence).",
      "Robin Gandy's 1956 note recording Turing's use of the dated idiom is a documented quotation (Journal of Symbolic Logic, 1956).",
      "Neal Stephenson's The Diamond Age (1995) and Cryptonomicon (1999) — involving the Enigma code and Turing — are documented works. DMX's '…And Then There Was X' (1999) is a documented album title.",
    ],
  },
  {
    id: "disputed",
    title: "What remains disputed",
    body: [
      "Any etymological link between the slur and 'nig/renig' is NOT accepted; the resemblance is orthographic, and etymology requires evidence.",
      "The Hopi account requires cited, community-accountable sources; details vary by community.",
      "The colonial cross-regional application of the slur, and the accounting/idiom gloss, need primary documentation.",
      "Whether retitlings 'shift who disappears' is an interpretation, not a documented intent.",
    ],
  },
  {
    id: "proposes",
    title: "What this study proposes",
    body: [
      "The project is investigating possible relationships among language, identity, erasure, classification, accounting discrepancies, literature, mathematics, and music.",
      "The method is explicitly stated on the slides: decode, cross-check, and trace the source — treating a noticed pattern as a signal to investigate, never as proof.",
    ],
  },
  {
    id: "test",
    title: "What evidence would test the proposition?",
    body: [
      "Dictionary entries and attestation dates (OED, Merriam-Webster) for 'nig'/'renig' and the woodpile idiom.",
      "Bibliographic publication records for each Christie edition, by country and date.",
      "The exact Gandy quotation and citation; statements by authors or artists about their titles.",
      "Community-accountable sources for the Hopi account; primary colonial-era records for cross-regional usage.",
      "Any documented author/artist intent that would distinguish coincidence from homage.",
    ],
  },
];

// Private reflection prompts (stored locally; exportable).
export const REFLECTION = [
  "Which connection in this module appears best supported, and why?",
  "Which connection remains primarily interpretive?",
  "Can removing offensive language reduce harm while also obscuring part of the historical record?",
  "How should educators preserve the record without repeating its harm?",
  "What evidence would change your conclusion?",
  "What question would you investigate next?",
  "How has your understanding changed since the pre-survey?",
];
