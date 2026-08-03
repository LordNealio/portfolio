// ─────────────────────────────────────────────────────────────────────────────
// STUDY CONTENT — "Language, Identity, and the N-Word"
// Versioned instrument with stable question IDs (independent of wording).
// PREVIEW MODE ONLY: no responses are saved as research data on this static site.
// Real enrollment/data collection requires a backend + IRB review (Phase 2).
// ─────────────────────────────────────────────────────────────────────────────

// Formal enrollment is OFF unless a build sets VITE_RESEARCH_ENROLLMENT_ENABLED=true.
// NOTE: even when true, this static site has no backend — data collection still
// requires Phase 2 (Supabase or similar) + institutional/ethical review.
export const RESEARCH_ENROLLMENT_ENABLED =
  (import.meta as { env?: Record<string, string | undefined> }).env
    ?.VITE_RESEARCH_ENROLLMENT_ENABLED === "true";

export const STUDY = {
  studyVersion: "1.0.0-preview",
  consentVersion: "1.0",
  moduleVersion: "1.0",
  instrumentVersion: "1.0",
  estimatedMinutes: "30–40",
  title: "Language, Identity, and the N-Word",
  subtitle:
    "A study of how history, identity, relationships, and context shape the meaning of one of America's most contested words.",
  intro:
    "This project examines whether learning more about the N-word's history, changing meanings, speaker differences, and reclamation debates affects how people interpret it. You will answer an initial survey, complete a short educational module, and answer follow-up questions. The study does not require you to use the word or adopt a particular opinion.",
  notices: [
    "Approximately 30–40 minutes",
    "Adults 18 and older only",
    "Participation is voluntary",
    "Questions may be skipped unless essential for consent",
    "Participants may stop at any time",
    "Material discusses racism, discrimination, offensive language, and racial violence",
  ],
};

export const LIKERT_7 = [
  "Strongly disagree",
  "Disagree",
  "Somewhat disagree",
  "Neither agree nor disagree",
  "Somewhat agree",
  "Agree",
  "Strongly agree",
];

// Intensity scale endpoints/mid; the 1–7 values sit between "Not at all" and "Extremely".
export const INTENSITY_ENDS = { low: "Not at all", mid: "Moderately", high: "Extremely" };

export const eligibility = [
  { id: "elig_age", q: "Are you at least 18 years old?" },
  {
    id: "elig_understand",
    q: "Are you able to understand the study information and voluntarily decide whether to participate?",
  },
  {
    id: "elig_content",
    q: "Do you understand that this experience discusses a racial slur, discrimination, and potentially upsetting history?",
  },
];

export const consentSections: { h: string; body: string }[] = [
  { h: "Purpose", body: "To study whether historical, linguistic, and contextual information affects how people perceive the N-word — including hostile use versus reclaimed or in-group use." },
  { h: "What you will do", body: "Answer a background questionnaire and an initial survey, complete a short educational module and knowledge check, answer a follow-up survey, and write brief reflections." },
  { h: "Estimated duration", body: "Approximately 30–40 minutes, completed at your own pace." },
  { h: "Potential discomfort or emotional risks", body: "The material discusses racism, a racial slur, discrimination, and racial violence, which some people may find upsetting. You may skip non-essential questions and stop at any time." },
  { h: "Possible benefits", body: "You may gain a clearer understanding of the word's history and the debates around it. There is no guarantee of personal benefit. Your participation may help improve educational materials." },
  { h: "Voluntary participation", body: "Participation is entirely voluntary. Choosing not to participate carries no penalty." },
  { h: "Right to skip or withdraw", body: "You may skip any non-essential question and may leave the study at any time using the 'Leave Study' option." },
  { h: "Privacy and data handling", body: "You are identified only by a random code not derived from your personal information. In this preview, no responses are stored as research data. (Formal collection would follow an approved protocol.)" },
  { h: "Researcher contact", body: "[Researcher name and contact — to be provided]" },
  { h: "Participant-concerns contact", body: "[Independent contact for questions about your rights as a participant — to be provided]" },
  { h: "Review / IRB information", body: "[Institutional or ethical review reference — to be provided before formal enrollment]" },
  { h: "Compensation", body: "No compensation is currently offered." },
  { h: "Limits of confidentiality", body: "Please do not include information that could identify you or others in open-ended responses. Anonymized quotations may be used only if you agree below and only under an approved protocol." },
];

export const consentCheckboxes = [
  { id: "c_age", label: "I confirm that I am at least 18 years old." },
  { id: "c_voluntary", label: "I understand that participation is voluntary." },
  { id: "c_stop", label: "I understand that I may stop at any time." },
  { id: "c_distress", label: "I understand that this study discusses offensive and potentially distressing racial language." },
  { id: "c_consent", label: "I consent to participate." },
];

export const quotationConsent = {
  id: "c_quotes",
  label: "Optional: I agree that anonymized quotations from my written responses may be used in research or educational materials.",
};

// ── Background (all optional; every question includes "Prefer not to answer") ──
type Choice = { id: string; label: string };
export interface BackgroundQuestion {
  id: string;
  q: string;
  type: "single" | "multi" | "text";
  options?: Choice[];
  allowSelfDescribe?: boolean;
}

const PNA = { id: "pna", label: "Prefer not to answer" };

export const backgroundQuestions: BackgroundQuestion[] = [
  { id: "bg_age", q: "Age range", type: "single", options: ["18–24", "25–34", "35–44", "45–54", "55–64", "65+"].map((l) => ({ id: l, label: l })).concat([PNA]) },
  { id: "bg_race", q: "Racial or ethnic identity (select all that apply)", type: "multi", allowSelfDescribe: true, options: ["Black or African American", "White", "Hispanic or Latino/a/e", "Asian", "Native American or Alaska Native", "Middle Eastern or North African", "Native Hawaiian or Pacific Islander", "Multiracial"].map((l) => ({ id: l, label: l })).concat([PNA]) },
  { id: "bg_gender", q: "Gender identity", type: "single", allowSelfDescribe: true, options: ["Woman", "Man", "Non-binary"].map((l) => ({ id: l, label: l })).concat([PNA]) },
  { id: "bg_region", q: "General geographic region (not your address)", type: "single", options: ["U.S. Northeast", "U.S. South", "U.S. Midwest", "U.S. West", "Outside the U.S."].map((l) => ({ id: l, label: l })).concat([PNA]) },
  { id: "bg_black_american", q: "Do you identify as Black American?", type: "single", options: ["Yes", "No"].map((l) => ({ id: l, label: l })).concat([PNA]) },
  { id: "bg_familiarity", q: "How familiar are you with discussions about reclaiming racial language?", type: "single", options: ["Not at all familiar", "Slightly familiar", "Moderately familiar", "Very familiar"].map((l) => ({ id: l, label: l })).concat([PNA]) },
  { id: "bg_frequency", q: "How often do you encounter the N-word?", type: "single", options: ["Never", "Rarely", "Sometimes", "Often", "Very often"].map((l) => ({ id: l, label: l })).concat([PNA]) },
  { id: "bg_contexts", q: "In what contexts do you typically encounter it? (select all that apply)", type: "multi", options: ["Music", "Family", "Friends", "Workplace", "School", "Media", "Social media", "Other"].map((l) => ({ id: l, label: l })).concat([PNA]) },
  { id: "bg_targeted", q: "Have you personally been targeted by the word?", type: "single", options: ["Yes", "No"].map((l) => ({ id: l, label: l })).concat([PNA]) },
  { id: "bg_uses_reclaimed", q: "Do you personally use a reclaimed variation?", type: "single", options: ["Yes", "No"].map((l) => ({ id: l, label: l })).concat([PNA]) },
];

// ── Perception statements (stable IDs; used identically pre and post) ──
export const perceptionStatements = [
  { id: "p01", text: "The N-word is always harmful, regardless of who says it." },
  { id: "p02", text: "The identity of the speaker changes how I interpret the word." },
  { id: "p03", text: "The relationship between the speaker and listener changes how I interpret the word." },
  { id: "p04", text: "Tone and intention change how I interpret the word." },
  { id: "p05", text: "Historical context should influence how the word is understood today." },
  { id: "p06", text: "Black Americans can give the word meanings different from those imposed through racism." },
  { id: "p07", text: "Reclaiming the word can represent cultural agency." },
  { id: "p08", text: "Reclaiming the word risks preserving its harmful history." },
  { id: "p09", text: "The word can communicate familiarity or solidarity in some settings." },
  { id: "p10", text: "In-group use and hostile racial use should be treated as different social acts." },
  { id: "p11", text: "A word's meaning can change when a community changes how it uses that word." },
  { id: "p12", text: "I would feel offended hearing the word in almost any context." },
  { id: "p13", text: "I am willing to discuss the word's history and contemporary meanings." },
  { id: "p14", text: "I believe the word could ever be repurposed for a constructive purpose." },
  { id: "p15", text: "I believe Black Americans should have a central voice in determining whether and how the word is reclaimed." },
];

export const preOpenEnded = {
  id: "pre_open",
  q: "In your own words, what gives the N-word its meaning: its history, the speaker, the listener, the intention, the situation, or something else?",
};

// ── Scenario measures ──
export const scenarios = [
  { id: "sc1", text: "A white stranger directs the word angrily toward a Black person." },
  { id: "sc2", text: "A Black friend uses a reclaimed variation affectionately with another Black friend." },
  { id: "sc3", text: "A non-Black friend repeats the word after hearing a Black friend use it." },
  { id: "sc4", text: "A teacher says the full historical term while discussing a primary source." },
  { id: "sc5", text: "A Black musician uses the word in lyrics about Black community life." },
  { id: "sc6", text: 'A journalist says "the N-word" while reporting on a racist incident.' },
  { id: "sc7", text: "A Black organization uses the word in a campaign intended to challenge its historical power." },
];

export const scenarioMeasures = [
  { id: "offensive", q: "How offensive is this use?" },
  { id: "harmful", q: "How harmful is this use?" },
  { id: "acceptable", q: "How acceptable is this use?" },
  { id: "confidence", q: "How confident are you in your judgment?" },
];

// ── Educational module (8 sections) ──
export const moduleSections: { id: string; title: string; body: string[]; reflection: string }[] = [
  {
    id: "m1",
    title: "Why this word is different",
    body: [
      "Over time the word became bound to racial classification, dehumanization, exclusion, humiliation, segregation, and violence. That accumulated history is part of its force today.",
      "Because of that history, its impact cannot be determined solely by a speaker's stated intention. A word can land differently than a speaker means it to.",
    ],
    reflection: "Before reading further — what do you already associate with this word's history?",
  },
  {
    id: "m2",
    title: "Etymology versus social history",
    body: [
      "Etymology tells us where a word came from. Social history tells us what people did with it. Contemporary usage tells us what people may be doing with it now.",
      "Linguistic origins connected to words for the color black do not erase the later history of degradation. Some etymological claims are disputed and should not be presented as settled fact.",
    ],
    reflection: "Does knowing a word's origin change what it means today? Why or why not?",
  },
  {
    id: "m3",
    title: "Meaning and context",
    body: [
      "Meaning may be shaped by many factors at once: the speaker, the listener, the relationship, tone, pronunciation, the situation, consent or invitation, and historical power relationships.",
      "The same string of letters can function very differently depending on these conditions.",
    ],
    reflection: "Which of these factors feels most important to you, and why?",
  },
  {
    id: "m4",
    title: "Language change and reclamation",
    body: [
      "Reclamation (or reappropriation) is a process in which a targeted community changes the use, meaning, emotional force, or ownership of a harmful term.",
      "Reclamation is contested and uneven. It describes a process, not a verdict on whether it is right.",
    ],
    reflection: "Have you seen reclamation happen with any other word or symbol?",
  },
  {
    id: "m5",
    title: "Arguments supporting reclamation",
    body: [
      "These are arguments, not proven conclusions: reclamation may reduce a slur's power; it may communicate familiarity, survival, solidarity, humor, resistance, or cultural membership.",
      "In-group use may serve a different function from hostile external use; a targeted population may claim greater authority over the term used against it; creative repurposing may transform a symbol of degradation into one of agency.",
    ],
    reflection: "Which of these arguments, if any, do you find most persuasive?",
  },
  {
    id: "m6",
    title: "Arguments opposing reclamation",
    body: [
      "Presented fairly: continued use may preserve the slur's visibility and harmful associations; some believe its history cannot be separated from present use; reclaimed use can still distress Black people.",
      "Contextual rules may create confusion; entertainment may encourage imitation without cultural understanding; and no individual can grant permission on behalf of an entire community.",
    ],
    reflection: "Which of these concerns, if any, do you find most serious?",
  },
  {
    id: "m7",
    title: "Repurposing is not universal permission",
    body: [
      "Examining reclamation does not mean everyone receives permission to use the word.",
      "Black Americans hold diverse and conflicting views about it. Understanding a debate is not the same as being invited into a practice.",
    ],
    reflection: "How would you describe the difference between understanding and permission?",
  },
  {
    id: "m8",
    title: "Evidence, interpretation, and hypothesis",
    body: [
      "It helps to distinguish documented evidence, scholarly interpretation, community oral history, personal belief, and untested hypothesis.",
      "The project hypothesis: “Providing historical, linguistic, and contextual information may increase people's ability to distinguish hostile use from reclaimed use and may increase openness to constructive repurposing.” This is a hypothesis being tested — not an established result.",
    ],
    reflection: "How confident should anyone be in a hypothesis that hasn't yet been tested?",
  },
];

// ── Knowledge check (correct index; participants may review, not removed for opinions) ──
export const knowledgeCheck = [
  { id: "k1", q: "Etymology and present-day social meaning are:", options: ["Always identical", "Related but not necessarily identical", "Completely unrelated", "Unsure"], correct: 1 },
  { id: "k2", q: "Reclamation generally refers to:", options: ["Erasing historical records", "A targeted group changing the use or meaning of a harmful term", "Giving everyone permission to use a word", "Prohibiting discussion of the word"], correct: 1 },
  { id: "k3", q: "Which factors may affect interpretation?", options: ["Speaker identity", "Relationship and context", "Tone and intention", "All of the above"], correct: 3 },
  { id: "k4", q: "Does this module claim every Black American supports reclaimed use?", options: ["Yes", "No"], correct: 1 },
  { id: "k5", q: "Which best describes the study?", options: ["It proves reclamation is correct", "It requires participants to adopt a new definition", "It examines whether additional context affects perceptions", "It gives participants permission to use the word"], correct: 2 },
];

// ── Post-module additional statements + overall change ──
export const postOnlyStatements = [
  { id: "pm1", text: "The module increased my understanding of the word's history." },
  { id: "pm2", text: "The module helped me distinguish hostile use from reclaimed use." },
  { id: "pm3", text: "The module presented more than one credible perspective." },
  { id: "pm4", text: "I felt pressured to adopt a particular conclusion." },
  { id: "pm5", text: "The material recognized that Black Americans have diverse views." },
  { id: "pm6", text: "I am now more open to the possibility of constructive repurposing." },
  { id: "pm7", text: "I am now more concerned about the risks of continued use." },
];

export const overallChange = {
  id: "overall_change",
  q: "How did the module affect your overall perception?",
  options: [
    "Much more negative",
    "Somewhat more negative",
    "No meaningful change",
    "Somewhat more positive",
    "Much more positive",
  ],
};

// ── Written reflection ──
export const reflectionQuestions = [
  { id: "r1", q: "What, if anything, changed in your thinking?" },
  { id: "r2", q: "Which part of the module most influenced your response?" },
  { id: "r3", q: "What argument supporting reclamation did you find strongest?" },
  { id: "r4", q: "What argument opposing reclamation did you find strongest?" },
  { id: "r5", q: "What information seemed incomplete, biased, or unsupported?" },
  { id: "r6", q: "Under what circumstances, if any, could repurposing be constructive?" },
  { id: "r7", q: "What boundaries would be necessary to prevent harm?" },
  { id: "r8", q: "What should be added before this module is presented to a larger community?" },
];

export const debrief = [
  "Thank you for participating.",
  "This project investigates whether historical and contextual education changes perceptions of the N-word. The researcher hypothesizes that the module may increase participants' ability to distinguish hostile uses from reclaimed or constructive uses.",
  "The study is not designed to prove that reclamation is correct. No change, increased acceptance, and increased opposition are all legitimate outcomes.",
  "Participation does not create an expectation that you use the word or accept its use by others.",
];

export const supportResources = "[Support resources and researcher / participant-concerns contacts — to be provided.]";

export const volunteerOptions = [
  "A future interview",
  "A focus group",
  "Reviewing educational material",
  "Helping recruit participants",
  "Joining the Black Builders Group",
  "Supporting other Black Builders Toolbox pilots",
];
