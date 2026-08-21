// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH FOR ALL PROJECTS
// To add a project: copy a record, fill the fields, drop it in the array below.
// Nothing here is fabricated — fields with unknown data are left empty or marked.
// ─────────────────────────────────────────────────────────────────────────────
import type { EssaySection } from "./essays";
import { charmQuarkBigBen, iAm22, dearYe } from "./essays";

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

export interface Book {
  title: string;
  author: string;
  href: string;
  neal?: boolean; // author shares a variation of "Neal" (Neal · Neil · Neale) — the recurring name
}

// A self-contained, inline swipeable carousel of finished slides (finalized
// image assets — presented as-is, never overlaid or redesigned).
export interface StoryCarousel {
  eyebrow?: string;
  title: string;
  intro?: string;
  images: { src: string; alt: string }[];
  video?: { embed: string; caption?: string }; // an embedded video shown under the carousel
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
  kind?: string; // what it IS in one word (App/Media/Research…); defaults from discipline
  accent?: string; // per-project accent for the placeholder art
  image?: string; // real cover art (path in /public); falls back to generative art
  imageFit?: "cover" | "contain"; // how the cover fills the tile (default cover)
  imageDark?: boolean; // use a dark letterbox behind a dark logo (with imageFit "contain")
  feature?: string; // a wide feature image (infographic/ad) shown full-width near the top of the detail page
  // Optional clickable hotspots over the feature image (Supreme-style): each opens the
  // lookbook lightbox (project.gallery) at `start`. Coordinates are percentages of the image.
  featureHotspots?: { label: string; left: number; top: number; width: number; height: number; start?: number }[];
  studyPath?: string; // internal route to a participant research experience
  studyPathLabel?: string; // custom label for the studyPath button (defaults to "Enter the study (preview)")
  moduleLink?: { label: string; href: string }; // a direct link to a companion module (e.g. an education module)
  audioEmbed?: string; // an embeddable player URL (e.g. SoundCloud w.soundcloud.com/player)
  audioBar?: { url: string; label: string }; // a bottom mini-player (for full-screen layouts where an inline embed can't sit)
  video?: string; // a self-hosted video file (path in /public) rendered as an HTML5 player
  sections?: EssaySection[]; // long-form essay rendered on the detail page
  storyCarousel?: StoryCarousel; // an inline swipeable carousel of finished slides shown on the detail page
  books?: Book[]; // a reading list rendered on the detail page
  gallery?: string[]; // optional lookbook/gallery image paths shown on the detail page
  layout?: "cinematic" | "lab" | "carousel" | "spend"; // custom detail layout (fashion house, lab gateway, image carousel, or the Spend Dat Shit app)
  chapterOf?: string; // this work is a chapter of another (parent slug); hidden from the grid, surfaced on the parent
  pillars?: string[]; // thematic pillars (e.g. Navigating Ignorance, Gaining Glory, Reparations) for the lab gateway
  chaptersTitle?: string; // heading for this work's chapters section on its detail page
  chaptersFirst?: boolean; // render the chapters section at the top of the body (right under Honest status)
  chaptersIntro?: string; // a synthesized intro paragraph above the chapters
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
    feature: "/art/mindvault-overview.jpg",
    audioBar: { url: "https://soundcloud.com/pimpcofficial/gitcha-mind-right", label: "Pimp C — “Gitcha Mind Right”" },
    chaptersTitle: "The origin",
    chaptersIntro:
      "MindVault began as MindWrite — a published 90-day meditation journal and the founding nonprofit initiative that seeded the whole ecosystem. The book is the origin the app grew out of.",
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
    audioBar: { url: "https://soundcloud.com/kendrick-lamar-music/mirror", label: "Kendrick Lamar — “Mirror”" },
    subtitle: "A reflection tool for the people closest to you",
    summary:
      "A private iPhone web app that mirrors your own patterns in relationships — never a dossier on anyone else.",
    category: "AI & Knowledge Tools",
    tags: ["PWA", "Privacy-first", "AI", "Relationships", "TypeScript"],
    status: "live",
    year: "2026",
    featured: true,
    accent: "#7C9CBF",
    image: "/art/mirror.jpg",
    imageFit: "contain",
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
    chapterOf: "the-lab",
    pillars: ["Gaining Glory", "Especially Reparations"],
    title: "LegacyBridge",
    kind: "App",
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
    subtitle: "Learn how you work — one shift at a time",
    summary:
      "A self-learning app for restaurant crews that turns each shift into reflection and progress — a daily check-in, in-shift capture, and an AI \"Work Mirror\" that shows staff how they actually work, wrapped in a game layer and architectural privacy.",
    category: "Featured Products",
    tags: ["AI", "Hospitality", "Wellbeing", "Gamification", "Next.js", "B2B"],
    status: "live",
    year: "2026",
    featured: true,
    accent: "#2E6B4F",
    role:
      "Founder and product lead — I identified the hospitality-burnout gap, designed the privacy model that makes the tool safe for staff to use, and shaped the self-learning loop that turns shifts into progress.",
    audience:
      "Restaurant staff and managers — a pilot is targeted at Din Tai Fung (roughly 20–50 staff, 3-month pilot).",
    problem:
      "Frontline restaurant work carries real cognitive and emotional load, and the tools that exist are either surveillance in disguise or generic wellness apps — nothing helps staff actually learn from their own shifts, privately.",
    solution:
      "A mobile-first daily loop — Prepare, Work, Reflect, Learn — where each shift earns XP toward learning levels (Awareness → Leadership), a rotating micro-skill and prompts across six learning paths keep it fresh, and a weekly AI \"Work Mirror\" turns entries into patterns, a strength, and one experiment to try. Entries are private by row-level security, the manager view is aggregated and anonymized, and gamification data is never visible to managers.",
    features: [
      "Daily loop with XP, streaks, and levels (Awareness → Leadership) — rewards honest reflection, not app usage",
      "Micro-skill of the day plus rotating prompts across six learning paths (self-awareness, focus, communication, problem-solving, resilience, growth)",
      "Pre-shift check-in (mood + energy + intention → AI tip)",
      "In-shift voice/text logging with stress detection",
      "End-of-shift reflection with AI summary and optional anonymous team share",
      "Weekly \"Work Mirror\" — AI surfaces your patterns, a consistent strength, and one experiment for next week",
      "Manager dashboard — anonymized aggregates only; individual entries, XP, and streaks are never visible",
    ],
    technology: ["Next.js 16", "Supabase (RLS)", "Claude Sonnet", "Vercel"],
    process:
      "Clean end-to-end build with a privacy-first schema. Team analytics are populated only on explicit opt-in, and XP, levels, and streaks are computed from each staffer's own entries — never exposed to managers.",
    lessons:
      "Trust is the feature — if staff believe a manager can read their words or see their streaks, the tool is worthless, so privacy is architectural, not a setting. And the gamification has to serve reflection, not productivity pressure.",
    futureVision: "Run the Din Tai Fung pilot, then deepen the learning engine — schedule-aware streaks, achievements, and a levels curriculum — so the app teaches people about their own work over time.",
    links: [{ label: "Live app", href: "https://workwrite-app.vercel.app/", verified: true }],
    relatedProjects: ["mindvault", "creation-os"],
    note: "Live — a self-learning app that helps restaurant crews learn how they work, one shift at a time.",
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
    relatedProjects: ["rapgod"],
    note: "A concept presentation for an unconfirmed event — not a ticketed, live festival.",
  },

  // ── 6. E.MANUAL ───────────────────────────────────────────────────────────
  {
    slug: "emanual",
    chapterOf: "the-lab",
    pillars: ["Gaining Glory"],
    title: "E.Manual",
    kind: "App",
    subtitle: "The modern man's survival guide",
    summary:
      "A 30-day, education-first life-skills app across five tracks — money, discipline, connection, body basics, and staying solid.",
    category: "Education & Learning",
    tags: ["Education", "Life skills", "React Native", "Expo", "Non-shaming"],
    status: "live",
    year: "2026",
    featured: true,
    accent: "#C88A4B",
    image: "/art/emanual.jpg",
    imageFit: "contain",
    imageDark: true,
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
    links: [{ label: "Play the arcade", href: "https://s4us1mcgamer.vercel.app", verified: true }],
    relatedProjects: ["mindvault"],
  },

  // ── 11. RAPGOD ────────────────────────────────────────────────────────────
  {
    slug: "rapgod",
    title: "RapGod",
    audioBar: {
      url: "https://soundcloud.com/chancetherapper/all-we-got-feat-kanye-west-chicago-childrens-choir",
      label: "Chance the Rapper — “All We Got”",
    },
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
    chaptersTitle: "In this archive",
    chaptersFirst: true,
    chaptersIntro:
      "The RapGod method — reading music as documented symbolism — extends into specific works. GNX and Dear Ye / Mission Control are chapters of the same archive; each has its own full breakdown, with the films below.",
    storyCarousel: {
      eyebrow: "Questions for Ye",
      title: "The Donda story",
      intro:
        "It started after I'd taken a break from music, when I heard my mother's name — Gloria — inside Ye's Donda. One name was a coincidence; eleven became a question. This is the path I traced through the music: names, dates, and places that kept lining up with my own life. Swipe through.",
      images: [
        { src: "/art/donda/01.jpg", alt: "Questions for Ye — one was a coincidence, eleven became a question. It started with my mother's name: Gloria. (1 of 9)" },
        { src: "/art/donda/02.jpg", alt: "Question 01 — Gloria: why does Donda begin and end with Gloria? My mother's name was Gloria. (2 of 9)" },
        { src: "/art/donda/03.jpg", alt: "Question 02 — Hurricane: after Gloria came Hurricane, the song that brought me back to music. (3 of 9)" },
        { src: "/art/donda/04.jpg", alt: "Question 03 — Justin: on Remote Control Pt 2 I heard 'Justin, Justin — doin' damage.' My first name is Justin. (4 of 9)" },
        { src: "/art/donda/05.jpg", alt: "Question 04 — Neal / Kneel: in Chakras the line sounds like 'kneel / Neal.' My last name is Neal. (5 of 9)" },
        { src: "/art/donda/06.jpg", alt: "Question 05 — Come to Life: one meaning of Neal is 'cloud'; the line 'floating on a silver lining.' Neal → cloud → silver lining. (6 of 9)" },
        { src: "/art/donda/07.jpg", alt: "Question 06 — Phoenix: I moved to Phoenix in June 2019, the same period as Jesus Is King and Up from the Ashes. (7 of 9)" },
        { src: "/art/donda/08.jpg", alt: "Question 07 — Hamilton: No Child Left Behind was signed at Hamilton High School — my high school. The path so far: Gloria, Hurricane, Justin, Neal, Come to Life, Phoenix, Hamilton. (8 of 9)" },
        { src: "/art/donda/09.jpg", alt: "Four more songs — Jesus Lord (Jay Electronica), Pure Souls (my son Sol), the number 24 (Kobe / my son's birthday), and the Moon (my daughter Luna). Eleven connections. (9 of 9)" },
      ],
      video: {
        embed: "https://archive.org/embed/copy-of-god-mode-theory-proven-kanye-and-me-1",
        caption: "The connections, in motion — a video walk-through of the Donda thread.",
      },
    },
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
    moduleLink: { label: "Enter the case file · Christie × DMX", href: "/exhibit/christie-dmx" },
    links: [{ label: "Live app", href: "https://rap-god.vercel.app/onboarding", verified: true }],
    relatedProjects: ["seven-temples-tour"],
    note: "A research archive with a strict verbatim rule; the symbolism is documented, not invented.",
  },
  {
    slug: "enigma",
    title: "ENIGMA",
    subtitle: "A gate, a riddle, and a chain of case files",
    summary:
      "An interactive front door: choose the curious path or answer a riddle to earn your way in, then follow the investigation.",
    category: "Games & Interactive",
    tags: ["Investigation", "Interactive", "Cultural analysis", "Christie × DMX"],
    status: "live",
    year: "2026",
    featured: false,
    disciplines: ["Culture", "Research"],
    kind: "Experience",
    accent: "#d23a2c",
    image: "/art/enigma/gate-cover.jpg",
    imageFit: "cover",
    role: "Concept, design, writing, and build — the investigation and the experience around it.",
    audience: "Anyone who lands on YoungBlesser — the gate is the site's front door.",
    problem:
      "A body of cultural investigation is easy to scroll past. It needed a way in that rewards curiosity instead of explaining itself.",
    solution:
      "A choice gate: take the curious path — a swipeable ENIGMA carousel of four questions about music that resolve into a pattern — or answer a riddle to earn entry. Either way opens the case files, starting with Agatha Christie × DMX.",
    features: [
      "A choice gate — take the curious path, or answer the riddle to prove you saw it",
      "The ENIGMA intro carousel: four questions about music, then a pattern that shouldn't exist",
      "Case #1 — Agatha Christie × DMX: nine files tracing a title, a number, and an erased word",
      "Doors into the wider archive once you're through",
      "Shown once per visitor, and reachable any time at /enter",
    ],
    technology: ["React", "TypeScript", "Vite"],
    process:
      "Built as the site's onboarding and catalogued here as a work in its own right. Sensitive material is handled as critical analysis — the erased 1939 title is named and shown censored, never reproduced.",
    studyPath: "/enter",
    studyPathLabel: "Enter ENIGMA",
    moduleLink: { label: "Read the case file · Christie × DMX", href: "/exhibit/christie-dmx" },
    links: [],
    relatedProjects: ["rapgod"],
    note: "The gate is the site's front door; this entry is that same experience, catalogued as a work.",
  },

  // ── 13. MINDWRITE (origin) ────────────────────────────────────────────────
  {
    slug: "mindwrite",
    title: "MindWrite",
    kind: "Book",
    chapterOf: "mindvault",
    subtitle: "A published 90-day meditation journal — where it all began",
    summary:
      "A published 90-day guided meditation journal, available on Amazon — and the founding nonprofit initiative that seeded the entire ecosystem.",
    category: "Research & Writing",
    tags: ["Published book", "Journaling", "Nonprofit", "Origin"],
    status: "live",
    year: "2023",
    featured: false,
    accent: "#1D3557",
    image: "/art/mindwrite.jpg",
    imageFit: "contain",
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
      { label: "Instagram", href: "https://www.instagram.com/mindwrite.journal/", verified: true },
    ],
    relatedProjects: ["mindvault"],
    note: "A real, published book — MindWrite: A 90-Day Meditation Journal (2023) — that grew out of the founding nonprofit initiative which seeded the whole ecosystem.",
  },

  // ── 14. PIMPS' PARADISE (flagged) ─────────────────────────────────────────
  {
    slug: "pimps-paradise",
    title: "Project H.O.E",
    subtitle: "A harm-reduction empowerment concept",
    summary:
      "An early harm-reduction and dignity concept for adults, built around empowerment rather than judgment.",
    category: "Nonprofit & Community",
    tags: ["Harm reduction", "Community", "React"],
    status: "live",
    year: "2026",
    featured: false,
    accent: "#0A0A0A",
    image: "/art/hoevalley.jpg",
    imageFit: "contain",
    imageDark: true,
    role: "Founder and designer.",
    audience: "Adults the concept aims to serve through a harm-reduction, dignity-first lens.",
    problem: "Certain adult communities are served by shame and stigma rather than dignity and practical support.",
    solution: "An early ecosystem concept organized around harm reduction and empowerment.",
    features: ["Harm-reduction framing", "Empowerment-first design direction"],
    technology: ["React", "Vite"],
    futureVision: "Clarify the audience and scope as it grows.",
    links: [{ label: "Live app", href: "https://club-paradise.vercel.app/onboarding", verified: true }],
    relatedProjects: [],
    note: "Live — a harm-reduction, dignity-first concept.",
  },

  // ── 15. SPEND DAT SHIT (interactive) ──────────────────────────────────────
  {
    slug: "spend-dat-shit",
    title: "Spend Dat Shit",
    audioBar: { url: "https://soundcloud.com/yungmiami-music/spend-dat", label: "Yung Miami — “Spend Dat”" },
    subtitle: "A satirical marketplace for spending a billionaire's fortune",
    summary:
      "An interactive, Prime-inspired parody store where you blow a billionaire's fortune on real-life relief, obscene luxury, and society-sized power moves — then the Future Oracle predicts your fate.",
    category: "Games & Interactive",
    tags: ["Interactive", "Satire", "React", "Design"],
    status: "live",
    year: "2026",
    featured: false,
    accent: "#ffd814",
    image: "/items/mansion.webp",
    imageFit: "cover",
    imageDark: true,
    layout: "spend",
    role: "Designer and developer — concept, data model, and the surreal Future Oracle.",
    audience: "Anyone who's ever wondered what a fortune actually buys, at scale.",
    problem: "Enormous wealth is an abstraction; the numbers are too big to feel.",
    solution:
      "A playable marketplace that turns net worth into a shopping cart — pairing absurd luxury with the real cost of housing, tuition, and grants so the scale finally lands.",
    features: [
      "Choose among five fortunes; the cart resets and rescales",
      "Real-life, Luxury, Community, and Power-move aisles",
      "Live remaining-balance, spent, percentage, and progress",
      "The Future Oracle — cart-based generative satire",
    ],
    technology: ["React", "TypeScript", "Vite"],
    note: "Satire. Net-worth figures and prices are illustrative estimates; nothing ships and no purchase occurs. Powers the Tithing Experiment.",
    links: [],
    relatedProjects: [],
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

// What a work *is*, in one word — shown to visitors instead of dev status.
const DISC_TO_KIND: Record<Discipline, string> = {
  AI: "App",
  Apps: "App",
  Technology: "App",
  Fashion: "Fashion",
  Branding: "Fashion",
  Music: "Media",
  Film: "Media",
  Culture: "Media",
  Publishing: "Writing",
  Research: "Research",
  Games: "Game",
  Nonprofit: "Nonprofit",
  Education: "Education",
};

export function kindOf(p: Project): string {
  return p.kind ?? DISC_TO_KIND[projectDisciplines(p)[0]];
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
  // ── THE LAB — research, media & applications (gateway) ───────────────────
  house({
    slug: "the-lab",
    title: "A Black wHole",
    kind: "Lab",
    layout: "lab",
    image: "/art/the-lab.jpg",
    imageFit: "contain",
    audioBar: { url: "https://soundcloud.com/kodak-black/kodak-black-no-flockin-freestyle", label: "Kodak Black — “No Flockin Freestyle”" },
    subtitle: "An Interdisciplinary Lab",
    summary:
      "A Black wHole is an interdisciplinary lab that investigates language, identity, history, culture, money, science, memory, and loss — then transforms those inquiries into studies, public media, and practical tools.",
    disciplines: ["Research", "Culture", "Education"],
    accent: "#16202b",
    role: "Founder and lead — an interdisciplinary research, media, and applications lab by Just Neal.",
    note: "A gateway to the lab's studies, public media, and tools — organized by pillar.",
  }),

  // ── NIL — THE LABEL (all fashion, consolidated) ──────────────────────────
  {
    slug: "nil-label",
    title: "NIL — The Label",
    audioBar: { url: "https://soundcloud.com/ninesomnia/takin-swag", label: "ninesomnia — “Takin' Swag”" },
    subtitle: "Name. Image. Likeness. — a heritage clothing house",
    summary:
      "A heritage clothing house in the American Ivy tradition — crest, monogram, and Olympic colors — where every collection is a chapter of one idea: from nothing (Nil), through humility (Kneel), to a name that lasts (Neal).",
    category: "Creative Media & Music",
    disciplines: ["Fashion", "Branding", "Culture"],
    tags: ["Fashion", "Heritage", "Branding", "Made-on-demand"],
    layout: "cinematic",
    status: "in-development",
    year: "2024",
    featured: true,
    accent: "#1b2a3a",
    image: "/nil-crest.svg",
    imageFit: "contain",
    imageDark: true,
    feature: "/art/nil-lookbook.jpg", // Collection 01 index — clickable panels open the lookbook (Supreme-style)
    // Percentages over /art/nil-lookbook.jpg. `start` = index into gallery below. Tune freely.
    featureHotspots: [
      { label: "Olympic — heritage jacket", left: 8, top: 15, width: 16, height: 70, start: 0 },
      { label: "Olympic polo", left: 24, top: 15, width: 11, height: 70, start: 1 },
      { label: "NIL 1989 polo", left: 35, top: 15, width: 12, height: 70, start: 2 },
      { label: "I AM / 22 tee", left: 51, top: 15, width: 12, height: 70, start: 3 },
      { label: "MAG scripture tee", left: 65, top: 15, width: 12, height: 70, start: 11 },
      { label: "Cloud tee", left: 78, top: 38, width: 15, height: 48, start: 5 },
    ],
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
    gallery: [
      "/fashion/1.jpg",
      "/fashion/2.jpg",
      "/fashion/3.jpg",
      "/fashion/4.jpg",
      "/fashion/5.jpg",
      "/fashion/6.jpg",
      "/fashion/7.jpg",
      "/fashion/8.jpg",
      "/fashion/9.jpg",
      "/fashion/10.jpg",
      "/fashion/nila.jpg",
      "/fashion/mag.jpg",
      "/fashion/whitemag.jpg",
      "/fashion/suce.jpg",
      "/fashion/suce2.jpg",
      "/fashion/nilwinterh.jpg",
      "/fashion/nilwintero.jpg",
      "/fashion/nilwinterp.jpg",
    ],
    relatedProjects: ["rapgod", "gloria"],
    note:
      "A complete brand identity and product concept — crest, collections, labels, and lookbooks. Pieces are shown as designed mockups on a made-on-demand model; not yet in full production. (Drop lookbook photos into public/fashion/ as fashion-01.jpg … to populate the Lookbook.)",
  },
  house({
    slug: "arizona-ponderer",
    chapterOf: "the-lab",
    kind: "Media",
    pillars: ["Navigating Ignorance", "Gaining Glory"],
    title: "Arizona Ponderer",
    subtitle: "An investigative broadsheet — Arizona's unanswered questions.",
    summary:
      "A vintage-newspaper art series that turns real questions of value, dignity, and memory into an investigative broadsheet.",
    disciplines: ["Publishing", "Culture"],
    accent: "#b8924a",
    role: "Writer and designer — original work by Just Neal.",
    layout: "carousel",
    gallery: [
      "/art/aponderer-elijahs-fire.jpg",
      "/art/aponderer-have-you-seen.jpg",
      "/art/aponderer-neal-lester.jpg",
      "/art/aponderer-pbs-mysteries.jpg",
      "/art/aponderer-final-trump.jpg",
    ],
    note: "A conceptual print/art series. Images are downloadable from the viewer.",
  }),
  house({ slug: "dear-goat", title: "Dear Goat", subtitle: "A letters series.", disciplines: ["Publishing", "Culture"], accent: "#2c3a2c" }),
  house({ slug: "gloria", title: "Gloria", subtitle: "A tribute — in name and image.", disciplines: ["Music", "Culture"], accent: "#9a7628" }),
  house({ slug: "burning-point", title: "Burning Point", subtitle: "A NIL project.", disciplines: ["Culture"], accent: "#5a2a2e" }),
  house({ slug: "holy-water-wet", title: "H2W", subtitle: "A NIL culture project.", disciplines: ["Music", "Culture"], accent: "#1b2a3a" }),
  house({ slug: "bizbrain", title: "BizBrain", subtitle: "An AI operating brain for a business.", disciplines: ["AI", "Technology"], accent: "#1b2a3a" }),
  house({
    slug: "nous-innovation-labs",
    chapterOf: "the-lab",
    pillars: ["Gaining Glory"],
    title: "Nous Innovation Labs",
    kind: "Nonprofit",
    subtitle: "Human-Centered Learning for the Intelligence Age",
    summary:
      "A nonprofit educational innovation organization focused on AI literacy, reflective learning, and human-centered technology that strengthens communities.",
    disciplines: ["Nonprofit", "Education", "AI"],
    status: "live",
    accent: "#1b2a3a",
    role: "Founder — the nonprofit innovation lab behind the ecosystem.",
    links: [{ label: "Visit Nous Innovation Labs", href: "https://nous-innovation-labs.vercel.app/", verified: true }],
    note: "The nonprofit educational innovation organization behind the work.",
  }),
  house({
    slug: "mission-control",
    title: "Dear Ye / Mission Control",
    kind: "Media",
    chapterOf: "rapgod",
    image: "/art/from-x-to-ye.jpg",
    imageFit: "cover",
    subtitle: "A message from me to Ye.",
    summary:
      "A message to Kanye West — a journey from a prayer that the feet won't fail, to flight, to a mission.",
    disciplines: ["Publishing", "Culture", "Music", "Film"],
    accent: "#16202b",
    role: "Artist and writer — original work by Just Neal.",
    video: "/toye.mp4",
    sections: dearYe,
    note: "A conceptual video and essay. Lyrical interpretations are the artist's own.",
    relatedProjects: ["gnx", "rapgod"],
  }),
  house({
    slug: "nonprofit-builder",
    chapterOf: "the-lab",
    pillars: ["Gaining Glory", "Especially Reparations"],
    title: "Nonprofit Launch Kit",
    kind: "App",
    subtitle: "Launch a nonprofit with confidence — not confusion.",
    summary:
      "An AI-powered platform that walks founders through every step of starting and growing a nonprofit.",
    disciplines: ["Nonprofit", "AI", "Technology"],
    status: "live",
    accent: "#2c3a2c",
    image: "/art/launcher.jpg",
    imageFit: "contain",
    role: "Founder and product designer — an AI nonprofit founder-intelligence platform by Just Neal.",
    audience:
      "Founders launching a community initiative, educational program, church, advocacy group, or charitable foundation.",
    solution:
      "Nonprofit Launch Kit is an AI-powered platform that walks founders through every step of starting and growing a nonprofit organization. Instead of piecing together information from dozens of websites, you'll have a single workspace that helps you make informed decisions, generate required documents, and build an organization ready to make an impact. Whether you're launching a community initiative, educational program, church, advocacy group, or charitable foundation, it helps transform your idea into a legally structured, professionally organized nonprofit — so you spend less time figuring out paperwork and more time building your mission.",
    features: [
      "Generate your mission, vision, and purpose statements",
      "Build your board of directors and define member roles",
      "Create bylaws, conflict-of-interest policies, and governance documents",
      "Generate IRS 501(c)(3) application materials and supporting paperwork",
      "Develop strategic plans, budgets, and fundraising strategies",
      "Organize meetings, votes, and board records",
      "Access AI guidance tailored to your nonprofit's goals and mission",
      "Store everything in one secure workspace as your organization grows",
    ],
    links: [{ label: "Live app", href: "https://nonprofit-launch-kit.vercel.app/", verified: true }],
    note: "Live — an AI-powered nonprofit founder-intelligence platform.",
  }),
  house({
    slug: "rocket-to-pluto",
    title: "Rocket to Pluto",
    subtitle: "A space adventure that teaches young kids to read, count, and explore.",
    disciplines: ["Games", "Education"],
    status: "prototype",
    accent: "#1b2a3a",
    role: "Founder and designer — an educational space game for kids, directed by Just Neal.",
    links: [{ label: "Play the game", href: "https://rocket-to-pluto.vercel.app", verified: true }],
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
  house({
    slug: "blueface-salmon-p-chase",
    chapterOf: "the-lab",
    pillars: ["Navigating Ignorance", "Especially Reparations"],
    title: "Blueface × Salmon P. Chase",
    subtitle: "The man on the $10,000 bill — currency, faith, and legacy.",
    summary:
      "A conceptual artwork built on the real ten-thousand-dollar note, and on Salmon P. Chase — the man who put 'In God We Trust' on American money.",
    disciplines: ["Culture", "Publishing", "Branding"],
    kind: "Research",
    status: "concept",
    accent: "#2c3a2c",
    role: "Artist and creative director — original work by Just Neal.",
    solution:
      "Salmon P. Chase is the portrait on the actual $10,000 bill, and few people shaped American money more. As Lincoln's Treasury Secretary he built the national banking system, printed the first federal paper dollars — the 'greenback' — and had 'In God We Trust' struck onto U.S. currency. The bank that still carries his name is Chase. The piece holds that legacy — architect of American finance and lifelong abolitionist — against its own motto, 'In Darkness We Shine,' and the Blueface reading of money, faith, and worth.",
    features: [
      "Lincoln's Secretary of the Treasury (1861–64) — financed the Union through the Civil War",
      "Put 'In God We Trust' on U.S. currency (first struck 1864)",
      "Built the national banking system and issued the first federal paper money, the 'greenback'",
      "Placed his own portrait on the $1 note and the $10,000 bill — the highest denomination ever publicly circulated",
      "Namesake of Chase Bank (Chase National Bank, 1877 → today's JPMorgan Chase)",
      "Abolitionist lawyer — the 'Attorney General for Runaway Slaves'; helped found the Free Soil and Republican parties",
      "Governor of Ohio, U.S. Senator, and 6th Chief Justice of the United States (1864–73)",
    ],
    image: "/art/chase.jpg",
    imageFit: "contain",
    imageDark: true,
    gallery: ["/art/chase.jpg"],
    note: "A conceptual art piece. Historical facts about Salmon P. Chase are accurate.",
  }),
  house({
    slug: "gnx",
    title: "GNX",
    chapterOf: "rapgod",
    subtitle: "Two cars. One Kendrick. Two questions.",
    summary:
      "A conceptual piece around Kendrick Lamar's GNX — two cars, two sides, and two questions: who is the second car for, and what does GNX mean?",
    disciplines: ["Culture", "Music", "Film"],
    status: "concept",
    accent: "#16202b",
    role: "Artist and creative director — original work by Just Neal, in the RapGod tradition.",
    solution:
      "Built in the RapGod tradition of documented music symbolism, GNX reads Kendrick Lamar's world as a pattern — the acronyms behind YNW, DMX, and GNX, and the lines from 'Euphoria' that frame them — around two questions: who is the second car for, and what does GNX mean?",
    features: [
      "Two cars. Two sides. Two questions: who is the second car for, and what does GNX mean?",
      "Reads Kendrick's world as a pattern — YNW · DMX · GNX",
      "DMX, two ways: 'Dark Man X' officially, 'Divine Master X' in the RapGod reading (X = unknown)",
      "Framed by lines from 'Euphoria'",
    ],
    image: "/art/gnx.jpg",
    imageFit: "contain",
    imageDark: true,
    video: "/gnx.mp4",
    note: "A conceptual art/film piece. Historical and lyrical references are the artist's documented interpretation.",
    relatedProjects: ["rapgod", "mission-control"],
  }),
  house({
    slug: "charm-quark-big-ben",
    chapterOf: "the-lab",
    pillars: ["Gaining Glory"],
    title: "Charm Quark x Big Ben",
    subtitle: "The Rose of Sharon blooms again — the unseen that explains the seen.",
    summary:
      "A symbolic art piece pairing the charm quark, the Rose of Sharon, and 'Big Ben' — some truths are known not because they are seen, but because they explain what is seen.",
    disciplines: ["Culture", "Music", "Research"],
    kind: "Research",
    accent: "#1b2a3a",
    role: "Artist and creative director — original work by Just Neal.",
    image: "/art/bigben.jpg",
    imageFit: "contain",
    gallery: ["/art/bigben.jpg"],
    sections: charmQuarkBigBen,
    note: "A conceptual art piece — interpretation is the artist's own.",
  }),
  house({
    slug: "i-am-or-22",
    chapterOf: "the-lab",
    kind: "Research",
    pillars: ["Gaining Glory"],
    title: "I AM / 22",
    subtitle: "I AM, the elements, and the number 22.",
    summary:
      "A symbolic research piece on the phrase 'I AM' — read through Scripture, the periodic table (Iodine + Americium), and the recurring number 22.",
    disciplines: ["Research", "Culture", "Publishing"],
    accent: "#B8621F",
    role: "Artist, writer, and researcher — original work by Just Neal.",
    image: "/art/iam22-shirt.jpg",
    imageFit: "contain",
    imageDark: true,
    gallery: [
      "/art/iam22-shirt.jpg",
      "/art/iam22-name-of-god.jpg",
      "/art/iam22-inniganus.jpg",
    ],
    sections: iAm22,
    note: "A conceptual research/art piece. The numerical observations are the artist's own, offered as inquiry — not scientific proof or doctrine.",
    relatedProjects: ["charm-quark-big-ben", "rapgod"],
  }),
  house({
    slug: "reparations",
    chapterOf: "the-lab",
    pillars: ["Especially Reparations"],
    title: "The R Word",
    subtitle: "Reparations — on repair, legacy, and what is owed.",
    summary:
      "A guided educational study testing whether balanced exposure to constitutional, equitable, and human-rights frameworks changes how people perceive reparations — part of the Black Builders Toolbox.",
    disciplines: ["Nonprofit", "Culture", "Research"],
    kind: "Research",
    accent: "#2c3a2c",
    role: "Researcher and designer — original study by Just Neal.",
    studyPath: "/study/r-word",
    moduleLink: { label: "Education Module · The Big Payback", href: "/study/r-word/module" },
    note: "A participant research experience, currently in Preview / Educational Demonstration Mode — no data is collected. Formal enrollment requires a backend and ethical/IRB review.",
  }),
  house({
    slug: "the-n-word",
    chapterOf: "the-lab",
    pillars: ["Navigating Ignorance", "Especially Reparations"],
    title: "The N Word",
    subtitle: "Language, Identity, and the N-Word — a study of perception and context.",
    summary:
      "A guided educational study measuring how history, linguistics, and context shape perception of the N-word — part of the Black Builders Toolbox.",
    disciplines: ["Research", "Culture", "Education"],
    kind: "Research",
    accent: "#16202b",
    image: "/art/n-word.jpg",
    imageFit: "contain",
    role: "Researcher and designer — original study by Just Neal.",
    studyPath: "/study/n-word",
    moduleLink: { label: "Education Module 01 · The Enigmatic Cipher", href: "/study/n-word/cipher" },
    note: "A participant research experience, currently in Preview / Educational Demonstration Mode — no data is collected. Formal enrollment requires a backend and ethical/IRB review.",
  }),
  house({
    slug: "reading-list",
    chapterOf: "the-lab",
    pillars: ["Navigating Ignorance"],
    title: "Reading List / Free Game",
    subtitle: "The books behind the thinking.",
    summary: "A curated reading list — the books that shape the ideas across the house.",
    disciplines: ["Research", "Publishing", "Culture"],
    status: "research",
    accent: "#9a7628",
    role: "Curated by Just Neal.",
    links: [{ label: "Virgil Abloh · Free Game", href: "https://free-game.virgilabloh.com/", verified: true }],
    books: [
      { title: "Life after Capitalism", author: "George Gilder", href: "https://www.amazon.com/dp/1684512247" },
      { title: "All About Love: New Visions", author: "bell hooks", href: "https://www.amazon.com/dp/0060959479" },
      { title: "Principles: Life and Work", author: "Ray Dalio", href: "https://www.amazon.com/dp/1501124021" },
      { title: "Scattered Minds", author: "Gabor Maté", href: "https://www.amazon.com/dp/0593714377" },
      { title: "The Three Pillars of Zen", author: "Philip Kapleau", href: "https://www.amazon.com/dp/0385260938" },
      { title: "The Untethered Soul", author: "Michael A. Singer", href: "https://www.amazon.com/dp/1572245379" },
      { title: "Conversations with God, Book 1", author: "Neale Donald Walsch", href: "https://www.amazon.com/dp/0399142789", neal: true },
      { title: "Notes on Complexity", author: "Neil Theise", href: "https://www.amazon.com/dp/B0B74STY6H", neal: true },
      { title: "The Diamond Age", author: "Neal Stephenson", href: "https://www.amazon.com/dp/0553380966", neal: true },
      { title: "Any Day Now: Toward a Black Aesthetic", author: "Larry Neal", href: "https://www.amazon.com/dp/1644231204", neal: true },
      { title: "Black Fire: An Anthology of Afro-American Writing", author: "LeRoi Jones & Larry Neal", href: "https://www.amazon.com/dp/1574780395", neal: true },
      { title: "Autobiography of a Yogi", author: "Paramahansa Yogananda", href: "https://www.amazon.com/dp/0876120796" },
      { title: "Pimp: The Story of My Life", author: "Iceberg Slim", href: "https://www.amazon.com/dp/1451617135" },
      { title: "Atomic Habits", author: "James Clear", href: "https://www.amazon.com/dp/0735211299" },
      { title: "Hebrews to Negroes: Wake Up Black America", author: "Ronald Dalton Jr.", href: "https://www.amazon.com/dp/0986237957" },
      { title: "The Autobiography of Malcolm X", author: "Malcolm X, as told to Alex Haley", href: "https://www.amazon.com/dp/0345350685" },
      { title: "Poor Charlie's Almanack", author: "Charles T. Munger", href: "https://www.amazon.com/dp/1578645018" },
      { title: "The Silva Mind Control Method", author: "José Silva", href: "https://www.amazon.com/dp/1982185600" },
      { title: "The Richest Man in Babylon", author: "George S. Clason", href: "https://www.amazon.com/dp/1954839499" },
      { title: "Secret of the Vajra World: The Tantric Buddhism of Tibet", author: "Reginald A. Ray", href: "https://www.amazon.com/dp/157062917X" },
      { title: "Principles for Success", author: "Ray Dalio", href: "https://www.amazon.com/dp/1982147210" },
      { title: "As a Man Thinketh", author: "James Allen", href: "https://www.amazon.com/dp/1954839367" },
      { title: "The Hero with a Thousand Faces", author: "Joseph Campbell", href: "https://www.amazon.com/dp/1577315936" },
      { title: "Trickster Makes This World", author: "Lewis Hyde", href: "https://www.amazon.com/dp/B0B25WRXZP" },
      { title: "Ready Player One", author: "Ernest Cline", href: "https://www.amazon.com/dp/0307887448" },
      { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", href: "https://www.amazon.com/dp/0345418913" },
      { title: "The Color of Law", author: "Richard Rothstein", href: "https://www.amazon.com/dp/1631494538" },
      { title: "Pachinko", author: "Min Jin Lee", href: "https://www.amazon.com/dp/1455563927" },
    ],
    note: "Each title links to the book on Amazon.",
  }),
  house({
    slug: "covenant",
    chapterOf: "the-lab",
    pillars: ["Gaining Glory"],
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
    kind: "App",
    subtitle: "A mindful café experience in the heart of the desert.",
    summary: "Estrella Nos — a desert luxury café brand and experience, presented online.",
    disciplines: ["Branding", "Culture", "Apps"],
    status: "live",
    accent: "#9a7628",
    role: "Founder and creative director — a desert luxury café brand and experience by Just Neal.",
    links: [{ label: "Visit site", href: "https://bebida-two.vercel.app/", verified: true }],
    note: "Live — the online experience for Estrella Nos, a mindful desert luxury café.",
  }),
  house({
    slug: "sanda-path",
    title: "Sanda Path",
    kind: "App",
    subtitle: "The path of the martial artist — master Sanda and Taekwondo, one drill at a time.",
    summary:
      "A role-based martial-arts training app for Sanda and Taekwondo. Students train, earn XP, and track their journey; parents follow their child's progress; coaches manage their class, post drill videos, and message students.",
    disciplines: ["Apps", "Education", "Games"],
    status: "in-development",
    accent: "#9a2a2a",
    role: "Founder and designer — a gamified martial-arts training app by Just Neal.",
    links: [{ label: "Live preview", href: "https://sanda-path.vercel.app/", verified: true }],
    note: "In development — an early build is live; drills, XP, and role-based features are still being built out.",
  }),
];

// The main works exhibited — shown first, in this order. Everything else is
// grouped under "In Progress" but stays viewable.
const WORK_ORDER = [
  "mindvault",
  "the-lab",
  "rapgod",
  "enigma",
  "nil-label",
  "mirror",
  "spend-dat-shit",
];

// The exhibited set (same slugs) — used to split the archive.
export const EXHIBITED = new Set(WORK_ORDER);
export const isExhibited = (slug: string) => EXHIBITED.has(slug);

// Access gate — the soft, client-side code now applies ONLY to an explicit
// short list of works kept private. Everything else in the archive is public,
// so the full scale of the body of work is visible. (This is a deterrent, not
// real security.) To make a work private, add its slug here; to make one
// public, remove it. Nothing is deleted either way.
const PRIVATE_SLUGS = new Set<string>([
  "pimps-paradise", // Project H.O.E — a sensitive, adults-only concept (kept behind the code by default)
]);
export const isLocked = (slug: string) => PRIVATE_SLUGS.has(slug);

// ── Lenses — ways to enter the archive by discipline (navigation, not rebrand).
// A lens matches by discipline union and/or an explicit slug set. Lens views
// include chapters, so the depth nested inside the Lab surfaces when filtered.
export interface Lens {
  key: string;
  label: string;
  blurb: string;
  disciplines?: Discipline[];
  slugs?: string[];
}
export const LENSES: Lens[] = [
  { key: "create", label: "Create", blurb: "Books, music, film, and design.", disciplines: ["Publishing", "Music", "Film", "Fashion", "Branding"] },
  { key: "build", label: "Build", blurb: "Apps, platforms, and systems.", disciplines: ["Apps", "AI", "Technology", "Games"] },
  { key: "investigate", label: "Investigate", blurb: "RapGod, ENIGMA, and the case files.", slugs: ["enigma", "rapgod", "arizona-ponderer", "gnx", "mission-control", "blueface-salmon-p-chase"] },
  { key: "research", label: "Research", blurb: "Original legal, scientific & linguistic frameworks.", disciplines: ["Research"] },
  { key: "serve", label: "Serve", blurb: "Nonprofit, education, and AI-literacy work.", disciplines: ["Nonprofit", "Education"] },
];
export const getLens = (key: string | null | undefined) => LENSES.find((l) => l.key === key);
export function matchesLens(p: Project, lens: Lens): boolean {
  const byDiscipline = lens.disciplines ? projectDisciplines(p).some((d) => lens.disciplines!.includes(d)) : false;
  const bySlug = lens.slugs ? lens.slugs.includes(p.slug) : false;
  return byDiscipline || bySlug;
}

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

// The exhibited set — the pinned WORK_ORDER works, in order. Single source for
// the home page's featured selection (the archive top uses a chapter-filtered
// variant of the same idea).
export const exhibitedProjects = projects.filter((p) => isExhibited(p.slug));

// Chapters — works folded under a parent (hidden from the grid, shown on the parent).
export const CHAPTER_SLUGS = new Set(projects.filter((p) => p.chapterOf).map((p) => p.slug));
export const chaptersOf = (slug: string) => projects.filter((p) => p.chapterOf === slug);

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
