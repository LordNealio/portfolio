// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH FOR ALL PROJECTS
// To add a project: copy a record, fill the fields, drop it in the array below.
// Nothing here is fabricated — fields with unknown data are left empty or marked.
// ─────────────────────────────────────────────────────────────────────────────

export type Status =
  | "live" // deployed and usable by others
  | "prototype" // functional, built end-to-end, not publicly launched
  | "in-development" // actively being built
  | "concept" // designed / specced / partially built as a presentation
  | "research" // architecture, writing, or framework work
  | "archived"; // origin story or paused

export type Category =
  | "Featured Products"
  | "AI & Knowledge Tools"
  | "Education & Learning"
  | "Nonprofit & Community"
  | "Games & Interactive"
  | "Creative Media & Music"
  | "Research & Writing"
  | "Business & Operations";

// The NIL house disciplines — how the archive is organised.
export type Discipline =
  | "AI"
  | "Apps"
  | "Fashion"
  | "Education"
  | "Publishing"
  | "Film"
  | "Music"
  | "Games"
  | "Research"
  | "Nonprofit"
  | "Branding"
  | "Culture"
  | "Technology";

export const DISCIPLINES: Discipline[] = [
  "AI",
  "Apps",
  "Fashion",
  "Education",
  "Publishing",
  "Film",
  "Music",
  "Games",
  "Research",
  "Nonprofit",
  "Branding",
  "Culture",
  "Technology",
];

export interface ProjectLink {
  label: string;
  href: string;
  verified: boolean; // false = reported but not independently confirmed in this build
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  summary: string; // one sentence
  category: Category;
  tags: string[];
  status: Status;
  year: string;
  featured: boolean;
  disciplines?: Discipline[]; // NIL house disciplines (archive taxonomy)
  accent?: string; // per-project accent for the placeholder art
  image?: string; // real cover art (path in /public); falls back to generative art
  imageFit?: "cover" | "contain"; // how the cover fills the tile (default cover)
  imageDark?: boolean; // use a dark letterbox behind a dark logo (with imageFit "contain")
  audioEmbed?: string; // an embeddable player URL (e.g. SoundCloud w.soundcloud.com/player)
  gallery?: string[]; // optional lookbook/gallery image paths shown on the detail page
  role: string;
  audience: string;
  problem: string;
  solution: string;
  features: string[];
  technology: string[];
  process?: string;
  lessons?: string;
  futureVision?: string;
  links: ProjectLink[];
  relatedProjects: string[]; // slugs
  note?: string; // honest caveat shown on the detail page
}

export const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  prototype: "Prototype",
  "in-development": "In Development",
  concept: "Concept",
  research: "Research",
  archived: "Archive",
};

const core: Project[] = [
  // ── 1. MINDVAULT ──────────────────────────────────────────────────────────
  {
    slug: "mindvault",
    title: "MindVault",
    subtitle: "A private thinking space that compounds over time",
    summary:
      "A local-first AI journaling app that turns daily reflection into habits, published ideas, and collective inquiry.",
    category: "Featured Products",
    tags: ["AI", "Journaling", "Habits", "Local-first", "React"],
    status: "live",
    year: "2026",
    featured: true,
    accent: "#E8B84B",
    image: "/mindvault.svg",
    imageFit: "contain",
    role:
      "Founder, product architect, and creative director — I defined the product, designed the system, wrote the prompt architecture, and directed every iteration through AI-assisted development.",
    audience:
      "Individuals who want a private place to think, build habits, and turn raw reflection into something they can act on or share.",
    problem:
      "Journaling apps either lock your thoughts in a silo or send everything to a server. Reflection rarely turns into momentum — habits, ideas, or output.",
    solution:
      "A mobile-first app with a private local-first core and an opt-in AI layer. Every AI call is labeled at the point of use, so the private base stays private while an outbound layer can atomize goals into habits, publish ideas across formats, and host collective inquiry.",
    features: [
      "Daily journal with morning/evening flows, voice capture, and photo scan",
      "Habit Atomizer — domain-aware questions genuinely re-rank suggested habits, with a safety gate on high-difficulty fitness habits",
      "Publish module — turn a private idea into an IG caption, LinkedIn post, X thread, newsletter, or blog outline",
      "Throne Talk — a Socratic collective-inquiry mode with lenses, timed sessions, and AI synthesis",
      "Searchable Vault of history, Box Breathing, and games",
    ],
    technology: ["React 18", "Vite", "IndexedDB", "Claude (via secure proxy)", "Vercel"],
    process:
      "Built as an evolving system over many sessions. A server-side proxy holds the API key so it never touches the client; new AI features reuse that one pattern. Habit and journal data live in separate IndexedDB stores to avoid schema collisions.",
    lessons:
      "The hardest design tension was keeping a private, local-first soul while adding an outbound AI/publishing layer. The answer was labeling every AI call at the point of use and deferring anything platform-level until retention is proven.",
    futureVision:
      "Campaigns, a content calendar, and 'Built with MindVault' stats — a manual-first analytics layer that never compromises the private core.",
    links: [
      { label: "Live app", href: "https://mindvault-app-zeta.vercel.app", verified: false },
    ],
    relatedProjects: ["workwrite", "creation-os", "mirror"],
  },

  // ── 2. MIRROR ─────────────────────────────────────────────────────────────
  {
    slug: "mirror",
    title: "Mirror",
    subtitle: "A reflection tool for the people closest to you",
    summary:
      "A private iPhone web app that mirrors your own patterns in relationships — never a dossier on anyone else.",
    category: "AI & Knowledge Tools",
    tags: ["PWA", "Privacy-first", "AI", "Relationships", "TypeScript"],
    status: "live",
    year: "2026",
    featured: true,
    accent: "#7C9CBF",
    role:
      "Founder and product author — I set nine non-negotiable principles that constrain the product, and directed a phased build where the AI reflects the writer, never characterizes the other person.",
    audience:
      "A single person who wants to understand their closest relationships more honestly — not manage contacts.",
    problem:
      "Relationship apps drift toward CRMs and scoreboards — profiling the other person, gamifying connection, and sending intimate data to a backend.",
    solution:
      "A client-only PWA with three jobs: Reflect (mirror the writer's own patterns), Prepare (surface open threads before a talk), and Work things out together (an ephemeral, two-person flow on one phone where the app holds process but never referees).",
    features: [
      "Private by architecture — no backend, no accounts, no telemetry; the only network call is to the AI provider",
      "Reflection capture built around self-clarity, with optional one-tap lenses ('How I showed up', 'What I felt')",
      "Before-you-talk prep that surfaces open threads",
      "Ephemeral 'sit down together' flow — dialogue is never persisted",
      "Verbatim, principled AI prompts; data stored only in the browser",
    ],
    technology: ["React", "TypeScript", "Vite", "PWA (vite-plugin-pwa)", "IndexedDB (idb)", "Claude"],
    process:
      "Built in confirmed phases against a strict spec. A 'Do NOT build' list (no scores, streaks, gamification, no profile of the other person, no judging AI, no backend) actively vetoed features during development.",
    lessons:
      "Constraints are the product. Writing down what the app must refuse to do — and stopping to flag any request that violated it — kept a genuinely humane tool from becoming another surveillance-flavored CRM.",
    futureVision:
      "Hardening: encrypted-at-rest backup with an optional app PIN, JSON export/import, and a full accessibility and reduced-motion pass.",
    links: [
      { label: "Live app", href: "https://mirror-app-green-omega.vercel.app", verified: false },
    ],
    relatedProjects: ["mindvault", "creation-os"],
  },

  // ── 3. LEGACYBRIDGE ───────────────────────────────────────────────────────
  {
    slug: "legacybridge",
    title: "LegacyBridge",
    subtitle: "Turn family memory into a book that lasts",
    summary:
      "An AI oral-history platform that guides interviews, transcribes voices, builds timelines, and exports a printable family book.",
    category: "Nonprofit & Community",
    tags: ["AI", "Oral history", "Next.js", "Supabase", "Preservation"],
    status: "live",
    year: "2026",
    featured: true,
    accent: "#B4703A",
    image: "/legacybridge.svg",
    imageFit: "contain",
    imageDark: true,
    role:
      "Founder, product designer, and creative director — I set the archival, editorial tone and defined the full route map and AI interview experience.",
    audience:
      "Families — especially displaced, immigrant, and marginalized communities — whose stories, photographs, and lineage are being lost across generations.",
    problem:
      "Oral histories disappear when the people who hold them pass. Recording, transcribing, organizing, and turning that into something lasting is more work than most families can do.",
    solution:
      "A guided platform where an AI interviewer asks the next question after each answer, transcribes audio, extracts a timeline, and assembles chapters into an exportable book — with families able to invite relatives to contribute.",
    features: [
      "Guided AI interviews that adapt after each response (with static-prompt fallback)",
      "Audio transcription and AI narrative summaries",
      "Automatic timeline extraction from stories",
      "Family invite links with viewer roles",
      "Book builder with PDF export",
    ],
    technology: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Supabase (auth/storage/db, RLS)",
      "Claude Sonnet + Haiku",
      "Whisper transcription",
      "@react-pdf/renderer",
    ],
    process:
      "Full route map built end-to-end — landing, auth, dashboard, upload, interview, timeline, archive, book, onboarding, settings, and join flow — over eight live Supabase tables with row-level security.",
    lessons:
      "This is not a utility app; it is a preservation platform. Leaning into emotional resonance and archival quality (National Geographic × Apple Books) shaped every interface decision.",
    futureVision:
      "Wire up production AI keys, ship the book-export polish, and pilot with a community organization.",
    links: [{ label: "Live app", href: "https://legacybridge-one.vercel.app/", verified: true }],
    relatedProjects: ["mindvault", "creation-os"],
    note:
      "Deployed and usable; some AI features may run in graceful fallback until production AI keys are set.",
  },

  // ── 4. WORKWRITE ──────────────────────────────────────────────────────────
  {
    slug: "workwrite",
    title: "WorkWrite",
    subtitle: "Mental mise en place for restaurant crews",
    summary:
      "An AI journaling and check-in app for frontline restaurant staff, with strict privacy and anonymized manager insights.",
    category: "Featured Products",
    tags: ["AI", "Hospitality", "Wellbeing", "Next.js", "B2B"],
    status: "prototype",
    year: "2026",
    featured: true,
    accent: "#2E6B4F",
    role:
      "Founder and product lead — I identified the hospitality-burnout gap and designed the privacy model that makes the tool safe for staff to actually use.",
    audience:
      "Restaurant staff and managers — a pilot is targeted at Din Tai Fung (roughly 20–50 staff, 3-month pilot).",
    problem:
      "Frontline restaurant work has real cognitive and emotional load, and no existing tool combines in-shift support with privacy staff can trust.",
    solution:
      "A mobile-first flow — pre-shift check-in, in-shift voice logging with stress detection, end-of-shift debrief — where journal entries are private by row-level security and the manager view is aggregated and anonymized.",
    features: [
      "Pre-shift check-in (mood + energy + concerns → AI tip)",
      "In-shift voice/text logging with stress detection",
      "End-of-shift reflection with AI summary and optional anonymous team share",
      "Weekly personal review with mood chart",
      "Manager dashboard — anonymized aggregates only, no individual identifiers",
    ],
    technology: ["Next.js 15", "Supabase (RLS)", "Claude Sonnet", "Vercel"],
    process:
      "Clean end-to-end build with a privacy-first schema. Team analytics are populated only on explicit opt-in.",
    lessons:
      "Trust is the feature. If staff believe a manager can read their words, the tool is worthless — so privacy had to be architectural, not a setting.",
    futureVision: "Run the Din Tai Fung pilot and measure retention and wellbeing signal.",
    links: [],
    relatedProjects: ["mindvault", "creation-os"],
    note: "Clean build, deployable; a live pilot URL is not yet public.",
  },

  // ── 5. THE 7 TEMPLES TOUR ─────────────────────────────────────────────────
  {
    slug: "seven-temples-tour",
    title: "The 7 Temples Tour",
    subtitle: "An interactive digital pilgrimage",
    summary:
      "A cinematic concept site for a South Korea cultural-music festival — an illuminated-manuscript meets Korean-temple experience.",
    category: "Creative Media & Music",
    tags: ["Concept", "Next.js", "Bilingual", "Cultural", "Motion"],
    status: "concept",
    year: "2026",
    featured: true,
    accent: "#D4AF37",
    role:
      "Founder and creative director — I conceived the event, wrote the long-form founder essay, and directed the entire visual language.",
    audience:
      "A presentation audience — festival-goers, cultural partners, and collaborators experiencing the vision of a Korea music pilgrimage.",
    problem:
      "How do you present an ambitious, not-yet-real cultural event so it feels inevitable and worth building?",
    solution:
      "An immersive bilingual (EN/KO) site pairing seven Korean cities with real temples, a musical journey of concept artists with verbatim setlists, and experience pillars — meditation, temple food, film, fashion, community, reflection.",
    features: [
      "Hero, countdown, pillars, cities, and founder teaser on the homepage",
      "7×7 cities-and-temples page pairing each city with a real temple",
      "Flagship artist page with an embedded, verified setlist grid",
      "Long-form founder essay (Why This Exists / Why Seven / Why Music / Why Korea)",
      "EN/KO toggle via a lightweight typed dictionary",
    ],
    technology: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
    process:
      "Draws its symbolic language from the RapGod archive; music links are transcribed verbatim from documented notes, and any song without a confident source falls back to a 'find on YouTube' tile rather than embedding the wrong video.",
    lessons:
      "A concept can be honest and still be cinematic. Clearly framing it as a concept presentation — not a confirmed event — kept the ambition credible.",
    futureVision:
      "The remaining artist pages, culture and travel sections, and a Korean translation of the founder essay.",
    links: [],
    relatedProjects: ["rapgod", "everythang"],
    note: "A concept presentation for an unconfirmed event — not a ticketed, live festival.",
  },

  // ── 6. E.MANUAL ───────────────────────────────────────────────────────────
  {
    slug: "emanual",
    title: "E.Manual",
    subtitle: "The modern man's survival guide",
    summary:
      "A 30-day, education-first life-skills app across five tracks — money, discipline, connection, body basics, and staying solid.",
    category: "Education & Learning",
    tags: ["Education", "Life skills", "React Native", "Expo", "Non-shaming"],
    status: "live",
    year: "2026",
    featured: true,
    accent: "#C88A4B",
    role:
      "Founder and instructional designer — I set the education-first, strictly non-shaming tone and built the curriculum and plan-engine structure from a full spec.",
    audience: "Young men who never got a clear, judgment-free guide to basic life skills.",
    problem:
      "Life-skills content is scattered, often condescending, and rarely structured into something you can actually follow.",
    solution:
      "A 30-day starter path — five tracks × six missions — with education first and coaching second, field guides you can read any time, quizzes, a habit tracker, and a budget calculator, all in a non-shaming tone with crisis-language safety escalation.",
    features: [
      "30-day path across five tracks with a points system and Day-30 review",
      "Field guides (oral hygiene, grooming, laundry, cooking, bills, first aid) — never gated",
      "Module quizzes grounded in the actual lesson text",
      "Habit tracker and budget calculator built in",
      "Personalized 90-day plan generator (restart / foundation / focus branches)",
    ],
    technology: ["Expo SDK 57", "React Native", "TypeScript", "Expo Router", "Zustand", "Supabase (cloud mode)"],
    process:
      "Built against an authoritative 'Build Bible' of spec docs. Curriculum is readable ahead of time ('education first'); only completion is day-gated. Cloud mode activates only when Supabase env vars are present, so it ships as a pure local demo otherwise.",
    lessons:
      "Tone is a feature you can lose in one sentence. Every mission and reflection had to stay judgment-free, and safety escalation for crisis language was non-negotiable.",
    futureVision:
      "Notifications, and syncing habits/quizzes/budget to the cloud.",
    links: [{ label: "Live app", href: "https://emanual-sigma.vercel.app/", verified: true }],
    relatedProjects: ["mindvault"],
    note: "Live — a complete MVP; some cloud sync features are still in progress.",
  },

  // ── 7. CREATION OS (the thesis) ───────────────────────────────────────────
  {
    slug: "creation-os",
    title: "Creation OS",
    subtitle: "One memory engine beneath many apps",
    summary:
      "A unifying symbolic-memory architecture that lets insight compound across every app instead of living in disconnected silos.",
    category: "AI & Knowledge Tools",
    tags: ["Architecture", "AI", "Knowledge graph", "Next.js", "Vision"],
    status: "live",
    year: "2026",
    featured: false,
    accent: "#8A7CC0",
    role: "Architect — I authored the white paper and the five-layer model that connects the products.",
    audience: "Myself as a builder — the substrate the other apps plug into.",
    problem:
      "Building disconnected apps means insight never compounds. Every product starts its memory from zero.",
    solution:
      "A shared intelligence layer — Intake, Structuring, a Meaning Graph, a Synthesis Engine, and an Output layer — that multiple app interfaces (MindVault, WorkWrite, Throne Talk) sit on top of.",
    features: [
      "Multimodal intake (text, voice, images, PDFs, music)",
      "AI extraction of themes, emotions, symbols, entities, and timelines",
      "Graph-based symbolic memory (pgvector + relationships)",
      "A synthesis engine that writes creator notes, essays, and emotional maps",
      "Multiple interfaces over one shared core",
    ],
    technology: ["Next.js", "Tailwind", "Supabase", "PostgreSQL + pgvector", "Claude", "Embeddings"],
    process:
      "Documented in a white paper with a full architect system prompt. An open decision remains: standalone app, shared backend service, or MindVault refactored as the primary interface.",
    lessons:
      "The instinct to keep shipping new apps is the thing to resist. The compounding value is in one shared memory graph with many faces.",
    futureVision:
      "Resolve the build path and route the existing apps through one shared graph.",
    links: [{ label: "Enter Creation OS", href: "https://creation-os-gules.vercel.app/login", verified: true }],
    relatedProjects: ["mindvault", "workwrite", "mirror"],
    note: "The connective thesis behind the products — now a live app (sign-in required) built on the five-layer architecture and white paper.",
  },

  // ── 8. K-SOURCE VAULT ─────────────────────────────────────────────────────
  {
    slug: "k-source-vault",
    title: "K-Source Vault",
    subtitle: "AI-curated Korean textile sourcing",
    summary:
      "A bilingual marketplace that connects verified Korean textile mills with U.S. fashion brands through Claude-powered matching.",
    category: "Business & Operations",
    tags: ["Marketplace", "AI matching", "Bilingual", "Next.js", "B2B"],
    status: "concept",
    year: "2026",
    featured: false,
    accent: "#C1121F",
    role: "Founder and product architect — I defined the entities, roles, and the AI matching workflow.",
    audience: "Korean textile manufacturers seeking U.S. exposure and U.S. brands wanting vetted, AI-curated shortlists.",
    problem:
      "Textile sourcing runs through middlemen and cold directory browsing. Korean mills lack direct U.S. exposure; U.S. buyers lack a trustworthy shortlist.",
    solution:
      "A platform with factory onboarding, a verification badge system, an AI profile generator, buyer sourcing briefs, and a Claude matching engine that scores and ranks factories against each brief.",
    features: [
      "Bilingual factory onboarding with document upload",
      "Verification badges (Bronze / Silver / Gold / Heritage)",
      "AI profile generator — raw factory data to a polished English profile",
      "AI matching engine that ranks factories for a buyer brief",
      "Sample-request tracking and an admin CRM",
    ],
    technology: ["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase", "Claude API"],
    process: "Specced with a full entity model, user roles, and server-side-only Claude endpoints.",
    futureVision: "Build the onboarding and matching MVP and verify a first cohort of mills.",
    links: [],
    relatedProjects: ["creation-os"],
    note: "A specced concept with a defined architecture; not yet built.",
  },

  // ── 9. SOUNDWORLD STUDIO ──────────────────────────────────────────────────
  {
    slug: "soundworld-studio",
    title: "SoundWorld Studio",
    subtitle: "Build worlds, reels, and a music portfolio",
    summary:
      "A creation tool where musicians build 'worlds', run composition sessions with uploads, and assemble reels and a portfolio.",
    category: "Creative Media & Music",
    tags: ["Music", "Creation", "Next.js", "Supabase"],
    status: "prototype",
    year: "2026",
    featured: false,
    accent: "#5A0E17",
    role: "Founder and product designer.",
    audience: "Musicians and creators building a body of work and a story around it.",
    problem: "Musicians lack a single space to organize composition sessions, media, and a shareable portfolio.",
    solution:
      "A Next.js MVP with authentication, 'worlds' (creative universes), composition sessions with audio/video/image uploads, a reel builder, and a portfolio showcase.",
    features: [
      "Auth and a dashboard with stats and quick actions",
      "Worlds — create, view, and delete creative universes",
      "Composition sessions with file uploads",
      "Reel builder",
      "Portfolio showcase with route protection",
    ],
    technology: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase (auth/storage, RLS)", "Framer Motion"],
    futureVision: "Deepen the reel and portfolio experience and test with working musicians.",
    links: [],
    relatedProjects: ["rapgod", "seven-temples-tour"],
    note: "A functional MVP; not publicly launched.",
  },

  // ── 10. S4US1MCGAMER ──────────────────────────────────────────────────────
  {
    slug: "s4us1mcgamer",
    title: "S4US1McGamer",
    subtitle: "A nine-game browser arcade",
    summary:
      "A no-engine, no-backend arcade of nine original browser mini-games built from clean React components and CSS.",
    category: "Games & Interactive",
    tags: ["Games", "React", "TypeScript", "No backend"],
    status: "prototype",
    year: "2026",
    featured: false,
    accent: "#E8B84B",
    role: "Designer and developer of every game.",
    audience: "Anyone who wants a quick, playable arcade — desktop or mobile.",
    problem: "A playground to prove that satisfying games can be built with nothing but components, CSS, and localStorage.",
    solution:
      "Nine self-contained games — a runner, a clicker, memory, a dodge game, Snake, a space shooter, a caterpillar platformer, a fighting game, and a fruit slicer — each with local high scores and touch controls.",
    features: [
      "Nine distinct games with keyboard and on-screen touch controls",
      "Per-game high scores in localStorage",
      "'Crawl' — a three-stage caterpillar-to-butterfly platformer",
      "'S4 Fighter' — a 1v1 CPU-ladder fighting game",
      "'Fruit Slicer' — swipe-to-slice with combos",
    ],
    technology: ["React", "Vite", "TypeScript", "CSS animations", "localStorage"],
    futureVision: "More games and a shared leaderboard.",
    links: [],
    relatedProjects: ["mindvault"],
  },

  // ── 11. RAPGOD ────────────────────────────────────────────────────────────
  {
    slug: "rapgod",
    title: "RapGod",
    subtitle: "The Neal / Nil / Kneel music-symbolism archive",
    summary:
      "A documented archive that maps symbolism across music through a personal framework of revelation, void, and recognition.",
    category: "Research & Writing",
    tags: ["Research", "Music theory", "Archive", "Next.js"],
    status: "live",
    year: "2026",
    featured: false,
    accent: "#D4AF37",
    image: "/rapgod.svg",
    imageFit: "cover",
    role: "Researcher and author of the framework and the documented notes.",
    audience: "A canonical reference the other cultural projects draw from.",
    problem: "Cultural and musical symbolism is scattered and easy to fabricate; it needs a disciplined, documented archive.",
    solution:
      "A Next.js app over a CSV data model — songs, concepts, projects, artifacts, and ~111 documented connections — where the creator notes hold verbatim symbolism and source URLs.",
    features: [
      "A three-part framework: NEAL (revealed), NIL (hidden), KNEEL (recognition)",
      "50+ songs with verbatim documented notes and sources",
      "18 color-coded concepts and ~111 connections",
      "Brand artwork and crests",
      "A verbatim-only rule — no invented interpretation",
    ],
    technology: ["Next.js 14", "CSV data model", "React"],
    process: "Multi-value fields are delimited and every interpretation is quoted from the documented notes — never fabricated.",
    futureVision: "Continue documenting and feed the archive into cultural presentations like The 7 Temples Tour.",
    links: [{ label: "Live app", href: "https://rap-god.vercel.app/onboarding", verified: true }],
    relatedProjects: ["seven-temples-tour", "everythang"],
    note: "A research archive with a strict verbatim rule; the symbolism is documented, not invented.",
  },

  // ── 12. EVERYTHANG ────────────────────────────────────────────────────────
  {
    slug: "everythang",
    title: "Everythang",
    subtitle: "Writing from the WYRD",
    summary:
      "A long-form writing project exploring the WYRD framework — fate, revelation, and meaning-making in plain, personal language.",
    category: "Research & Writing",
    tags: ["Writing", "Philosophy", "Personal"],
    status: "research",
    year: "2026",
    featured: false,
    accent: "#9B9589",
    role: "Author.",
    audience: "Readers open to a personal, philosophical account of meaning and fate.",
    problem: "Some ideas only live in essay form — not an app.",
    solution: "A body of writing built around 'wyrd' (an Anglo-Saxon concept of fate and personal destiny) and a personal cosmology.",
    features: ["Foreword and framing essays", "Connected notes and canvases", "Ties into the RapGod symbolic framework"],
    technology: ["Markdown", "Long-form writing"],
    futureVision: "Shape the material into a publishable collection.",
    links: [],
    relatedProjects: ["rapgod"],
    note: "An in-progress writing project — raw material, not a finished publication.",
  },

  // ── 13. MINDWRITE (origin) ────────────────────────────────────────────────
  {
    slug: "mindwrite",
    title: "MindWrite",
    subtitle: "A published 90-day meditation journal — where it all began",
    summary:
      "A published 90-day guided meditation journal, available on Amazon — and the founding nonprofit initiative that seeded the entire ecosystem.",
    category: "Research & Writing",
    tags: ["Published book", "Journaling", "Nonprofit", "Origin"],
    status: "live",
    year: "2023",
    featured: false,
    accent: "#1D3557",
    role:
      "Author, founder, and operator — I wrote and published the 90-day meditation journal, and built the nonprofit foundation behind it: executive summary, business model canvas, mission, budget, and fundraising, drawing directly on my finance and nonprofit experience.",
    audience: "Communities that benefit from reflective writing as a tool for growth.",
    problem: "Reflective writing has real benefits, but access and structure are uneven — especially where resources are thin.",
    solution:
      "A published 90-day guided meditation journal, backed by a full nonprofit operating foundation — executive summary, business model canvas, mission and vision, budget, fundraising, marketing, and research.",
    features: [
      "Published: MindWrite — A 90-Day Meditation Journal, available on Amazon",
      "A structured 90-day guided reflection practice",
      "Executive summary and business model canvas",
      "Mission, vision, budget, fundraising, and marketing plans",
    ],
    technology: ["Writing & publishing", "Strategy", "Financial modeling", "Nonprofit operations"],
    process: "Written and published as a physical journal, built on real operational and finance experience — grant reporting, budgeting, and nonprofit advising.",
    lessons: "This is the origin of everything that followed — the through-line from a published journal and nonprofit work to AI-native product building.",
    futureVision: "Its spirit lives on in MindVault and the wider ecosystem.",
    links: [
      {
        label: "Get the book on Amazon",
        href: "https://www.amazon.com/MindWrite-90-Day-Meditation-Journal/dp/B0C5PFZV2Z",
        verified: true,
      },
    ],
    relatedProjects: ["mindvault"],
    note: "A real, published book — MindWrite: A 90-Day Meditation Journal (2023) — that grew out of the founding nonprofit initiative which seeded the whole ecosystem.",
  },

  // ── 14. PIMPS' PARADISE (flagged) ─────────────────────────────────────────
  {
    slug: "pimps-paradise",
    title: "Pimps' Paradise",
    subtitle: "A harm-reduction empowerment concept",
    summary:
      "An early harm-reduction and dignity concept for adults, built around empowerment rather than judgment.",
    category: "Nonprofit & Community",
    tags: ["Harm reduction", "Community", "React"],
    status: "live",
    year: "2026",
    featured: false,
    accent: "#0A0A0A",
    role: "Founder and designer.",
    audience: "Adults the concept aims to serve through a harm-reduction, dignity-first lens.",
    problem: "Certain adult communities are served by shame and stigma rather than dignity and practical support.",
    solution: "An early ecosystem concept organized around harm reduction and empowerment.",
    features: ["Harm-reduction framing", "Empowerment-first design direction"],
    technology: ["React", "Vite"],
    futureVision: "Clarify the audience and scope as it grows.",
    links: [{ label: "Live app", href: "https://club-paradise.vercel.app/onboarding", verified: true }],
    relatedProjects: [],
    note:
      "Live — the deployed app is branded \"Club Paradise\". Consider aligning the portfolio title to that public-facing name.",
  },
];

// ── Discipline mapping + house-project factory ──────────────────────────────
const DISC_TO_CATEGORY: Record<Discipline, Category> = {
  AI: "AI & Knowledge Tools",
  Apps: "AI & Knowledge Tools",
  Fashion: "Creative Media & Music",
  Education: "Education & Learning",
  Publishing: "Research & Writing",
  Film: "Creative Media & Music",
  Music: "Creative Media & Music",
  Games: "Games & Interactive",
  Research: "Research & Writing",
  Nonprofit: "Nonprofit & Community",
  Branding: "Creative Media & Music",
  Culture: "Creative Media & Music",
  Technology: "Business & Operations",
};

const CAT_TO_DISC: Record<Category, Discipline[]> = {
  "Featured Products": ["Apps"],
  "AI & Knowledge Tools": ["AI", "Apps"],
  "Education & Learning": ["Education"],
  "Nonprofit & Community": ["Nonprofit"],
  "Games & Interactive": ["Games"],
  "Creative Media & Music": ["Music", "Culture"],
  "Research & Writing": ["Research", "Publishing"],
  "Business & Operations": ["Technology"],
};

/** The disciplines to show/filter by — explicit if set, else derived from category. */
export function projectDisciplines(p: Project): Discipline[] {
  return p.disciplines ?? CAT_TO_DISC[p.category];
}

type HouseInput = Partial<Project> & {
  slug: string;
  title: string;
  subtitle: string;
  disciplines: Discipline[];
};

/** Build an honest house-project record: known bits filled, the rest left as clean placeholders. */
function house(o: HouseInput): Project {
  const summary = o.summary ?? o.subtitle;
  return {
    category: DISC_TO_CATEGORY[o.disciplines[0]],
    tags: o.disciplines,
    status: "concept",
    year: "",
    featured: false,
    role: "Concept and creative direction by Just Neal, under the NIL house.",
    audience: "",
    problem: "",
    solution: summary,
    features: [],
    technology: [],
    links: [],
    relatedProjects: [],
    note: "Part of the NIL house — fuller details coming.",
    ...o,
    summary,
  };
}

// The NIL house archive — the brand's own projects alongside the built work above.
const houseProjects: Project[] = [
  // ── NIL — THE LABEL (all fashion, consolidated) ──────────────────────────
  {
    slug: "nil-label",
    title: "NIL — The Label",
    subtitle: "Name. Image. Likeness. — a heritage clothing house",
    summary:
      "A heritage clothing house in the American Ivy tradition — crest, monogram, and Olympic colors — where every collection is a chapter of one idea: from nothing (Nil), through humility (Kneel), to a name that lasts (Neal).",
    category: "Creative Media & Music",
    disciplines: ["Fashion", "Branding", "Culture"],
    tags: ["Fashion", "Heritage", "Branding", "Made-on-demand"],
    status: "in-development",
    year: "2024",
    featured: true,
    accent: "#1b2a3a",
    image: "/nil-crest.svg",
    imageFit: "contain",
    imageDark: true,
    role:
      "Founder and creative director — I designed the identity, the NJ crest and monogram, the palette, the collections, and the story that ties them together.",
    audience:
      "People who want to wear an idea — Name, Image, Likeness — in clothing built to last rather than to trend.",
    problem:
      "Streetwear chases trends and most heritage houses don't mean anything personal. There was no label that dressed the idea of identity itself.",
    solution:
      "NIL is a heritage house built on Name, Image, and Likeness. A laurel crest and NJ monogram, a tricolor Olympic palette, woven labels and hang tags — a full identity system carried across distinct collections, unified by one code: Nil (nothing), Kneel (humility), Neal (legacy).",
    features: [
      "NIL Heritage — timeless staples: polos, oxfords, knitwear, and outerwear",
      "NIL Atelier — runway-inspired, elevated silhouettes and fabrics",
      "NIL Sport — technical performance and athleisure essentials",
      "NIL Chapters — graphic collections rooted in story, culture, and meaning",
      "NIL Reserve — limited, numbered, exclusive releases",
      "Themed drops — the Olympic Collection (MMXXIV), the Cloud Collection (Neal = cloud, Luke 22:41), the Alpine Collection, the Henson Expedition (1909), and the Scholar Collection (东方传承)",
    ],
    technology: ["Jacquard knit", "Premium cotton-poly", "Embroidery & crest work", "Made-on-demand"],
    process:
      "Built around a complete identity system — the NJ laurel crest, the tricolor palette (navy, cream, red, forest, gold), woven labels and hang tags — and a spiritual through-line: Luke 22:41 and Philippians 2:10, 'from Nil to Name.' The codes read Nil = Nothing (the beginning), Kneel = Humility (the choice), Neal = Legacy / Cloud (the result).",
    futureVision:
      "Move from designed collections and made-on-demand pieces into full production and a flagship drop.",
    links: [],
    // Lookbook slots — drop photos in public/fashion/ named fashion-01.jpg … fashion-12.jpg.
    // Missing files are hidden automatically; the Lookbook stays invisible until at least one exists.
    gallery: Array.from(
      { length: 20 },
      (_, i) => `/fashion/fashion-${String(i + 1).padStart(2, "0")}.jpg`
    ),
    relatedProjects: ["rapgod", "gloria"],
    note:
      "A complete brand identity and product concept — crest, collections, labels, and lookbooks. Pieces are shown as designed mockups on a made-on-demand model; not yet in full production. (Drop lookbook photos into public/fashion/ as fashion-01.jpg … to populate the Lookbook.)",
  },
  house({ slug: "godmind-whitepaper", title: "GodMind Research", subtitle: "On mind, meaning, and machine.", disciplines: ["Research", "Publishing"], status: "research", accent: "#1b2a3a" }),
  house({ slug: "research-review", title: "Research Review", subtitle: "Field notes at the edge of AI and culture.", disciplines: ["Research", "Publishing"], status: "research", accent: "#2c3a2c" }),
  house({ slug: "ideas-worth-sharing", title: "Ideas Worth Sharing", subtitle: "Talks and short pieces worth sharing.", disciplines: ["Publishing", "Culture"], accent: "#9a7628" }),
  house({ slug: "arizona-ponderer", title: "Arizona Ponderer", subtitle: "Writing from the desert.", disciplines: ["Publishing", "Culture"], accent: "#b8924a" }),
  house({ slug: "dear-kendrick", title: "Dear Kendrick", subtitle: "An open letter in the language of the archive.", disciplines: ["Publishing", "Music", "Culture"], accent: "#16202b" }),
  house({ slug: "dear-goat", title: "Dear Goat", subtitle: "A letters series.", disciplines: ["Publishing", "Culture"], accent: "#2c3a2c" }),
  house({ slug: "elijahs-fire", title: "Elijah's Fire", subtitle: "A work in the house's spiritual register.", disciplines: ["Culture", "Publishing"], accent: "#5a2a2e" }),
  house({ slug: "gloria", title: "Gloria", subtitle: "A tribute — in name and image.", disciplines: ["Music", "Culture"], accent: "#9a7628" }),
  house({ slug: "burning-point", title: "Burning Point", subtitle: "A NIL project.", disciplines: ["Culture"], accent: "#5a2a2e" }),
  house({ slug: "holy-water-wet", title: "Holy Water Wet", subtitle: "A NIL culture project.", disciplines: ["Music", "Culture"], accent: "#1b2a3a" }),
  house({ slug: "seven-churches-tour", title: "Seven Churches Tour", subtitle: "A pilgrimage across seven places.", disciplines: ["Culture", "Film", "Music"], accent: "#9a7628", relatedProjects: ["seven-temples-tour"] }),
  house({ slug: "bizbrain", title: "BizBrain", subtitle: "An AI operating brain for a business.", disciplines: ["AI", "Technology"], accent: "#1b2a3a" }),
  house({ slug: "mission-control", title: "Mission Control", subtitle: "A command surface for building and shipping.", disciplines: ["Apps", "Technology"], accent: "#16202b" }),
  house({
    slug: "nonprofit-builder",
    title: "Nonprofit Launch Kit",
    subtitle: "An AI-powered founder-intelligence platform for starting a nonprofit.",
    summary: "An AI platform that gives nonprofit founders the intelligence and tooling to launch and run.",
    disciplines: ["Nonprofit", "AI", "Technology"],
    status: "live",
    accent: "#2c3a2c",
    role: "Founder and product designer — an AI nonprofit founder-intelligence platform by Just Neal.",
    links: [{ label: "Live app", href: "https://nonprofit-launch-kit.vercel.app/", verified: true }],
    note: "Live — an AI-powered nonprofit founder-intelligence platform.",
  }),
  house({ slug: "free-mind-initiative", title: "Free Mind Initiative", subtitle: "A nonprofit initiative for literacy and mental freedom.", disciplines: ["Nonprofit", "Education"], accent: "#2c3a2c" }),
  house({
    slug: "rocket-to-pluto",
    title: "Rocket to Pluto",
    subtitle: "A space adventure that teaches young kids to read, count, and explore.",
    disciplines: ["Games", "Education"],
    status: "prototype",
    accent: "#1b2a3a",
    role: "Founder and designer — an educational space game for kids, directed by Just Neal.",
    note: "A playable vertical slice (Moon Rescue) exists; more of the journey to Pluto is in development.",
  }),
  house({
    slug: "not-a-mixtape",
    title: "Not a Mixtape",
    subtitle: "A record — not a mixtape.",
    summary: "Original music by nwyrdgod — a body of work, released on SoundCloud.",
    disciplines: ["Music", "Culture"],
    status: "live",
    accent: "#5a2a2e",
    role: "Artist and writer — original music by Just Neal (nwyrdgod).",
    links: [
      { label: "Listen on SoundCloud", href: "https://soundcloud.com/nwyrdgod/sets/comin-out-hard-r", verified: true },
    ],
    audioEmbed:
      "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fnwyrdgod%2Fsets%2Fcomin-out-hard-r&color=%239a7628&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false",
    note: "Live — original music on SoundCloud (the “Comin Out Hard” set).",
  }),
  house({ slug: "charm-quark-big-ben", title: "Charm Quark x Big Ben", subtitle: "A collaboration.", disciplines: ["Music", "Culture"], accent: "#1b2a3a" }),
  house({ slug: "i-am-or-22", title: "I Am or 22", subtitle: "A work in the house's cultural register.", disciplines: ["Music", "Publishing", "Culture"], accent: "#16202b" }),
  house({ slug: "reparations", title: "Reparations", subtitle: "On repair, legacy, and what is owed.", disciplines: ["Nonprofit", "Culture", "Research"], accent: "#2c3a2c" }),
  house({
    slug: "covenant",
    title: "Covenant",
    subtitle: "A 90-day challenge — structure your life with scripture and discipline.",
    summary: "A 90-day app that structures daily life around scripture, commitment, and discipline.",
    disciplines: ["Apps", "Education", "Culture"],
    status: "live",
    accent: "#1b2a3a",
    role: "Founder and designer — a scripture-and-discipline challenge app by Just Neal.",
    links: [{ label: "Live app", href: "https://covenant-app-seven.vercel.app/", verified: true }],
    note: "Live — a 90-day covenant challenge built on scripture and daily discipline.",
  }),
  house({
    slug: "estrella-nos",
    title: "Estrella Nos",
    subtitle: "A mindful café experience in the heart of the desert.",
    summary: "Estrella Nos — a desert luxury café brand and experience, presented online.",
    disciplines: ["Branding", "Culture", "Apps"],
    status: "live",
    accent: "#9a7628",
    role: "Founder and creative director — a desert luxury café brand and experience by Just Neal.",
    links: [{ label: "Visit site", href: "https://bebida-two.vercel.app/", verified: true }],
    note: "Live — the online experience for Estrella Nos, a mindful desert luxury café.",
  }),
];

// The Work archive leads with these, in this order; everything else follows.
const WORK_ORDER = [
  "mindvault",
  "mindwrite",
  "rapgod",
  "legacybridge",
  "mirror",
  "not-a-mixtape",
  "workwrite",
  "nil-label",
  "emanual",
  "mission-control",
  "arizona-ponderer",
  "godmind-whitepaper",
  "charm-quark-big-ben",
  "i-am-or-22",
  "reparations",
  "nonprofit-builder",
  "holy-water-wet",
  "seven-temples-tour",
];

function workRank(slug: string): number {
  const i = WORK_ORDER.indexOf(slug);
  return i === -1 ? Number.POSITIVE_INFINITY : i;
}

// Stable sort keeps the pinned order up top and preserves original order for the rest.
export const projects: Project[] = [...core, ...houseProjects].sort(
  (a, b) => workRank(a.slug) - workRank(b.slug)
);

// ── Derived helpers ─────────────────────────────────────────────────────────
export const featuredProjects = projects.filter((p) => p.featured);
export const nonFeatured = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const categories: Category[] = [
  "Featured Products",
  "AI & Knowledge Tools",
  "Education & Learning",
  "Nonprofit & Community",
  "Games & Interactive",
  "Creative Media & Music",
  "Research & Writing",
  "Business & Operations",
];
