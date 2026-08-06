// ─────────────────────────────────────────────────────────────────────────────
// The Constellation — inspirations & dream collaborators.
//
// To add someone, drop a new object into `people` below. `group` controls the
// section it appears under (order set by GROUP_ORDER in the page). `image` is
// optional — leave it out and a monogram is shown instead.
// ─────────────────────────────────────────────────────────────────────────────
export interface Person {
  name: string;
  themes: string; // "Music • Design • Faith • Independent Creation"
  group: string;
  body: string[]; // paragraphs
  connectedWork?: string;
  dreamCollaboration?: string;
  link?: { label: string; href: string };
  image?: string; // optional portrait (path in /public)
}

export const CONSTELLATION_INTRO = [
  "The artists, researchers, and spiritual thinkers gathered here have shaped how I understand creativity, language, identity, consciousness, education, and human connection.",
  "I do not see music, science, spirituality, technology, and personal history as completely separate fields. My work examines what happens when they interact — when individual experiences, symbols, memories, and ideas combine to form patterns that cannot be understood by examining each element alone.",
  "These people represent different points within that constellation. Some inspired specific books, applications, studies, or creative works. Others developed frameworks that could help me test, strengthen, and communicate what I am building.",
  "They are not presented as current partners or endorsers. They are inspirations — and people with whom I hope to exchange ideas or create something meaningful one day.",
];

export const people: Person[] = [
  // ── Music, Story & Creative Vision ─────────────────────────────────────────
  {
    name: "Ye",
    themes: "Music • Design • Faith • Independent Creation",
    group: "Music, Story & Creative Vision",
    body: [
      "Donda became part of how I processed the memory of my mother, Gloria Neal. Its themes of maternal presence, grief, faith, family, loss, and creative return intersected with my own experiences while traveling through Arizona with my family.",
      "Ye also represents the possibility of working across disciplines without asking permission to remain inside one category. Music can become fashion. Fashion can become architecture. Personal testimony can become film, performance, technology, or a new institution.",
      "That boundaryless approach reflects the larger vision behind the work.",
    ],
    connectedWork: "The Names the Stars Sang, RapGod, NIL by Justin Neal, Mission Control: Gloria",
    dreamCollaboration:
      "An immersive project combining music, memory, fashion, film, technology, and the story of Gloria.",
  },
  {
    name: "Kendrick Lamar",
    themes: "Storytelling • Symbolism • Identity • Cultural Analysis",
    group: "Music, Story & Creative Vision",
    body: [
      "Kendrick Lamar demonstrates how autobiography, cultural memory, spirituality, conflict, and social criticism can coexist inside a single body of work.",
      "The title “gloria,” the layered construction of Euphoria, and the visual language surrounding GNX became important reference points in my RapGod interpretation. These elements connect with my continuing examination of inherited names, hidden authority, family symbolism, interpretation, and the difference between personal resonance and proof of artistic intention.",
      "Kendrick’s work inspires me to build projects that invite people to look beneath the surface while still distinguishing observation, interpretation, and evidence.",
    ],
    connectedWork: "RapGod, The Names the Stars Sang, the GNX interpretation, Mission Control: Gloria",
    dreamCollaboration:
      "An interactive storytelling experience examining music, symbolism, language, identity, and the different meanings audiences construct from the same work.",
  },
  {
    name: "Kid Cudi",
    themes: "Vulnerability • Mental Wellness • Cosmic Imagination",
    group: "Music, Story & Creative Vision",
    body: [
      "Kid Cudi’s music speaks to loneliness, perseverance, emotional struggle, imagination, and the search for purpose.",
      "“King Wizard” connects with my maternal grandfather, Robert Lovell McNeal, who was known as Wizard. “Juste un Clou” and the imagery of moving through clouds intersect with my own Justin–Clou–Cloud–Neal word associations. His larger body of work — including the Solo Dolo, Moon Man, lion, immortality, and pursuit-of-happiness themes — became part of the symbolic vocabulary through which I organized my story.",
      "Cudi’s willingness to make vulnerability visible also aligns with my belief that reflection can become a practical learning tool.",
    ],
    connectedWork: "MindWrite, MindVault, RapGod, Cloud & Fire, The Names the Stars Sang",
    dreamCollaboration:
      "A music-centered reflection experience that helps people document difficult emotions, recognize personal patterns, and transform those experiences into creative expression.",
  },

  // ── Complexity, Language & Learning ────────────────────────────────────────
  {
    name: "Neil Theise",
    themes: "Complexity • Emergence • Consciousness • Connection",
    group: "Complexity, Language & Learning",
    body: [
      "Neil Theise’s Notes on Complexity provides scientific language for an idea that runs through much of my work: smaller parts interacting until a larger and sometimes unpredictable pattern emerges.",
      "A name, lyric, family memory, historical document, visual symbol, or coincidence may appear insignificant in isolation. Complexity theory offers a framework for asking what happens when many such elements interact across time — without automatically treating the resulting pattern as either meaningless or intentionally designed.",
      "Theise’s work could help me describe how I experience and organize connections while establishing appropriate boundaries between observation, interpretation, hypothesis, and evidence.",
    ],
    connectedWork: "RapGod research companion, MindVault, the Neal/Neil constellation, complexity studies",
    dreamCollaboration:
      "A research conversation or educational series examining autobiographical meaning-making, music, memory, language, and consciousness through complexity theory.",
    link: { label: "Notes on Complexity", href: "https://www.spiegelandgrau.com/notes-on-complexity-1" },
  },
  {
    name: "Neal A. Lester",
    themes: "Language • Race • Public Humanities • Community Dialogue",
    group: "Complexity, Language & Learning",
    body: [
      "Neal Lester’s scholarship sits near the center of my N-word research.",
      "As a Foundation Professor of English at Arizona State University and founding director of Project Humanities, he has conducted pioneering work on the N-word and created and taught the first college course in the United States devoted to its study.",
      "His approach recognizes that a word cannot be separated from historical context, race, class, gender, power, identity, and the people using or receiving it. Meaning is constructed socially, but historical injury remains part of any honest examination of reclamation or semantic change.",
      "That perspective directly intersects with my Turing-inspired study of contextual interpretation, linguistic reappropriation, community judgment, historical harm, and the possibility — and limitations — of deliberately changing how a word is understood.",
      "Project Humanities’ emphasis on talking, listening, and connecting also offers a model for transforming this research into a genuine public conversation rather than presenting reclamation as a predetermined conclusion.",
    ],
    connectedWork: "Turing-Inspired N-Word Research Proposal, language-perception surveys, public education module",
    dreamCollaboration:
      "A Project Humanities dialogue, educational study, or community-governed research pilot examining how participants understand the word before and after studying its history, contexts, competing interpretations, and proposed possibilities for semantic change.",
    link: {
      label: "Neal Lester & Project Humanities",
      href: "https://projecthumanities.asu.edu/who-we-are/founding-director",
    },
  },
  {
    name: "Ellen Winner",
    themes: "Psychology • Art • Education • Research Impact",
    group: "Complexity, Language & Learning",
    body: [
      "Ellen Winner is a professor emerita of psychology at Boston College and senior research associate at Project Zero at the Harvard Graduate School of Education.",
      "She authored Project Zero and Its Impact: An Enigmatically Named Little Think Tank That Endured and Grew. The report traces how Project Zero developed from Nelson Goodman’s inquiry into art, cognition, education, and symbol systems into an international collection of adaptable learning frameworks.",
      "The phrase “enigmatically named” initially caught my attention because my research already contains a pathway connecting Neal Stephenson’s Cryptonomicon, the Enigma machine, Alan Turing, hidden meanings, and the work of decoding. In Winner’s report, however, “enigmatic” specifically describes the originally opaque meaning of the name Project Zero. I treat the parallel as a productive point of resonance — not proof that the references were intentionally connected.",
      "More importantly, her report demonstrates how an experimental intellectual project can move from a “hesitant hypothesis” to a durable framework adopted by educators around the world. It also examines how researchers can evaluate whether ideas actually change people’s understanding and practices.",
      "That is directly relevant to my goal of transforming personal observations and creative interpretations into transparent, testable, educational experiences.",
    ],
    connectedWork: "RapGod research companion, Nelson Goodman and Languages of Art, MindVault, the language-perception study",
    dreamCollaboration:
      "Applying Project Zero’s thinking routines and impact-evaluation methods to an educational pilot that measures how participants interpret symbols, music, identity, and difficult language before and after engaging with my materials.",
    link: {
      label: "Read Project Zero and Its Impact",
      href: "https://pz.harvard.edu/sites/default/files/2026-02/PDFImpactReportFULLFinalFilesept292025correctionsmade10-6-25.pdf",
    },
  },

  // ── Spiritual Inquiry ──────────────────────────────────────────────────────
  {
    name: "Neale Donald Walsch",
    themes: "Spiritual Dialogue • Reflection • Purpose • Inner Inquiry",
    group: "Spiritual Inquiry",
    body: [
      "Neale Donald Walsch’s work presents spiritual understanding as an active conversation rather than a set of closed answers.",
      "That approach connects with my interest in journaling, questioning inherited assumptions, documenting spiritual experiences, and helping people examine how they understand God, identity, responsibility, and purpose.",
      "The value of such a conversation is not simply receiving an answer. It is learning how to ask better questions, examine what arises, test ideas with humility, and consider how a spiritual belief affects one’s actions toward other people.",
    ],
    connectedWork: "Covenant, MindWrite, MindVault, spiritual-reflection studies",
    dreamCollaboration:
      "A guided reflection experience built around spiritual questions, personal dialogue, discernment, and the relationship between belief and everyday conduct.",
    link: { label: "Conversations with God Foundation", href: "https://www.cwg.org/" },
  },
];

export const CONSTELLATION_CONNECTS = {
  intro: "Each person approaches meaning from a different direction:",
  bullets: [
    "Ye explores meaning through multidisciplinary creation.",
    "Kendrick Lamar constructs it through layered narrative and symbolism.",
    "Kid Cudi expresses it through emotional vulnerability and cosmic imagination.",
    "Neil Theise studies how it emerges through interacting systems.",
    "Neal Lester examines how language acquires meaning through history, culture, context, and power.",
    "Ellen Winner studies how art, cognition, and educational frameworks affect how people think and learn.",
    "Neale Donald Walsch approaches meaning through spiritual questioning and dialogue.",
  ],
  outro:
    "Together, their work helps define the territory in which my own projects operate: music, memory, language, identity, consciousness, education, technology, and human connection.",
};

export const CONSTELLATION_INVITATION = [
  "This is not only a portfolio of finished products. It is a growing laboratory of books, applications, research studies, educational tools, visual art, fashion, and community projects.",
  "I am interested in collaborating with artists, researchers, educators, developers, designers, community organizations, and thoughtful participants who believe that ideas become more valuable when they are tested, discussed, and developed with other people.",
  "If your work intersects with these questions, I invite you to explore the projects and begin a conversation.",
];

export const CONSTELLATION_DISCLAIMER =
  "This page documents personal influences and future creative aspirations. It does not imply endorsement, affiliation, participation, or an existing relationship with any individual or organization featured.";
