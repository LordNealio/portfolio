// ─────────────────────────────────────────────────────────────────────────────
// STUDY CONTENT — "The R Word: Reparations, Repair, and What Is Owed"
// A research survey parallel to the N-Word study (src/data/study.ts).
// Versioned instrument with stable question IDs (independent of wording).
//
// PREVIEW MODE ONLY: no responses are saved as research data on this static site.
// Neutral framing — the intro does NOT disclose the expected direction of change;
// the hypothesis is stated only in the final module section and the debrief.
// The educational module presents each argument WITH its strengths, limitations,
// and counterarguments so this is genuine research, not persuasion.
// Formal enrollment/data collection would require a backend + IRB review (Phase 2).
// ─────────────────────────────────────────────────────────────────────────────
import { LIKERT_7 } from "./study";

export { LIKERT_7 };

export const STUDY_RW = {
  studyVersion: "1.0.0-preview",
  consentVersion: "1.0",
  moduleVersion: "1.0",
  instrumentVersion: "1.0",
  estimatedMinutes: "30–45",
  title: "The R Word",
  subtitle:
    "Reparations, repair, and what is owed — a study of how constitutional, equitable, and human-rights frameworks shape perception.",
  intro:
    "This project examines how people perceive reparations for Black Americans across different situations, and whether learning about historical, constitutional, equitable, and human-rights frameworks affects how people interpret the question. You will answer an initial survey, read a short educational module that presents several arguments together with their limitations and counterarguments, and answer follow-up questions. The study does not require you to adopt a particular opinion.",
  notices: [
    "Approximately 30–45 minutes",
    "Adults 18 and older only",
    "Participation is voluntary",
    "Questions may be skipped unless essential for consent",
    "Participants may stop at any time",
    "Material discusses slavery, racial injustice, law, and contested policy",
  ],
};

// Reuse the same 7-point intensity ends idea as the N-Word study.
export const INTENSITY_ENDS = { low: "Not at all", mid: "Moderately", high: "Extremely" };

export const eligibility = [
  { id: "elig_age", q: "Are you at least 18 years old?" },
  {
    id: "elig_understand",
    q: "Are you able to understand the study information and voluntarily decide whether to participate?",
  },
  {
    id: "elig_content",
    q: "Do you understand that this experience discusses slavery, racial injustice, law, and contested policy questions?",
  },
];

export const consentSections: { h: string; body: string }[] = [
  { h: "Purpose", body: "To study whether learning about historical, constitutional, equitable, and human-rights frameworks affects how people perceive reparations for Black Americans — including their moral necessity, legal and constitutional plausibility, political feasibility, and how they might be implemented." },
  { h: "What you will do", body: "Answer a background questionnaire and an initial survey, read a short educational module that presents several arguments together with their limitations and counterarguments, complete a brief knowledge check, answer a follow-up survey, and write short reflections." },
  { h: "Estimated duration", body: "Approximately 30–45 minutes, completed at your own pace." },
  { h: "Potential discomfort or emotional risks", body: "The material discusses slavery, racial violence and injustice, and politically contested questions, which some people may find upsetting. You may skip non-essential questions and stop at any time." },
  { h: "Possible benefits", body: "You may gain a clearer understanding of the legal, historical, and ethical arguments involved. There is no guarantee of personal benefit. Your participation may help improve educational materials." },
  { h: "Voluntary participation", body: "Participation is entirely voluntary. Choosing not to participate carries no penalty." },
  { h: "Right to skip or withdraw", body: "You may skip any non-essential question and may leave the study at any time using the 'Leave study' option." },
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
  { id: "c_distress", label: "I understand that this study discusses slavery, racial injustice, and contested policy." },
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
const opts = (arr: string[]) => arr.map((l) => ({ id: l, label: l })).concat([PNA]);

export const backgroundQuestions: BackgroundQuestion[] = [
  { id: "bg_age", q: "Age range", type: "single", options: opts(["18–24", "25–34", "35–44", "45–54", "55–64", "65+"]) },
  { id: "bg_race", q: "Racial or ethnic identity (select all that apply)", type: "multi", allowSelfDescribe: true, options: opts(["Black or African American", "White", "Hispanic or Latino/a/e", "Asian", "Native American or Alaska Native", "Middle Eastern or North African", "Native Hawaiian or Pacific Islander", "Multiracial"]) },
  { id: "bg_gender", q: "Gender identity", type: "single", allowSelfDescribe: true, options: opts(["Woman", "Man", "Non-binary"]) },
  { id: "bg_region", q: "General geographic region (not your address)", type: "single", options: opts(["U.S. Northeast", "U.S. South", "U.S. Midwest", "U.S. West", "Outside the U.S."]) },
  { id: "bg_black_american", q: "Do you identify as Black American?", type: "single", options: opts(["Yes", "No"]) },
  // Lineage block — relevant here because reparations proposals often turn on a defined
  // descendant community. Slavery is one item among many, never an eligibility gate.
  { id: "bg_community_identify", q: "Does your family identify with a multigenerational Black American community established in the United States?", type: "single", options: opts(["Yes", "No", "Unsure"]) },
  { id: "bg_grandparents_pre1965", q: "How many of your grandparents came from families already established in the United States before 1965?", type: "single", options: opts(["0", "1", "2", "3", "4", "Unsure"]) },
  { id: "bg_family_experiences", q: "Which experiences are part of your known family history? (select all that apply)", type: "multi", options: opts(["Sharecropping", "Segregation or Jim Crow", "The Great Migration", "Civil-rights activism", "Historically Black churches", "Historically Black neighborhoods or towns", "Military service", "Agricultural labor", "Industrial labor", "Free Black community before the Civil War", "Enslavement", "Indigenous American ancestry or community connection", "Immigration after 1965", "Other", "Unsure"]) },
  { id: "bg_familiarity", q: "Before today, how familiar were you with the arguments for and against reparations?", type: "single", options: opts(["Not at all familiar", "Slightly familiar", "Moderately familiar", "Very familiar"]) },
  { id: "bg_prior_view", q: "Before today, how did you generally view reparations for Black Americans?", type: "single", options: opts(["Strongly opposed", "Somewhat opposed", "Neutral or unsure", "Somewhat supportive", "Strongly supportive"]) },
  { id: "bg_politics", q: "How would you describe your general political outlook? (optional)", type: "single", options: opts(["Conservative", "Moderate", "Liberal", "Libertarian", "Other / none of these"]) },
];

// ── Perception statements (stable IDs; used identically pre and post) ──
// Outcome mapping: rp01 necessity · rp02 constitutional plausibility · rp03 legal
// plausibility · rp04 political feasibility · rp05 identify beneficiaries · rp06
// collective status/recognition · rp07 permanent fund · rp08 implementation
// confidence · rp09 (reverse) charity-not-repayment · rp10 (meta) understanding-gap.
export const perceptionStatements = [
  { id: "rp01", text: "Reparations for Black Americans are morally necessary." },
  { id: "rp02", text: "There is a credible constitutional basis for reparations." },
  { id: "rp03", text: "There is a credible legal basis for reparations beyond simply passing a new law." },
  { id: "rp04", text: "Reparations are politically feasible in the United States." },
  { id: "rp05", text: "It is possible to fairly identify who should receive reparations." },
  { id: "rp06", text: "Black Americans descended from slavery should be recognized as a group with collective claims." },
  { id: "rp07", text: "A permanent fund that invests on behalf of descendants would be a good way to deliver reparations." },
  { id: "rp08", text: "Reparations could actually be implemented through durable institutions." },
  { id: "rp09", text: "Reparations would be charity for past suffering rather than repayment of something owed." },
  { id: "rp10", text: "Most opposition to reparations reflects disagreement with the idea rather than a lack of information about the arguments." },
];

export const preOpenEnded = {
  id: "pre_open",
  q: "In your own words, what does 'reparations' mean to you, and what would make them justified or unjustified?",
};

// ── Educational module (balanced: each path includes strengths, limitations, and
// counterarguments; participants reach their own conclusions) ──
export const moduleSections: { id: string; title: string; body: string[]; reflection: string }[] = [
  {
    id: "rm1",
    title: "What 'reparations' means — and what it doesn't",
    body: [
      "Reparations is often heard as 'the government giving people money for something that happened long ago.' That is one possible form, but the broader idea is repair: addressing harms and their lasting effects through some combination of acknowledgment, compensation, investment, or institutional change.",
      "Reasonable people disagree about whether reparations are owed, to whom, in what form, and by whom. This module lays out three frameworks that have been offered to support reparations — and, for each, the main limitations and counterarguments. None of these is presented as settled law or a proven conclusion.",
    ],
    reflection: "Before reading further — what does the word 'reparations' currently bring to mind for you?",
  },
  {
    id: "rm2",
    title: "Path 1 — The Constitutional Path (the Fourteenth Amendment)",
    body: [
      "Section 1 recognized formerly enslaved people and their descendants as citizens. One argument holds that citizenship did not erase the accumulated harms of slavery, and may have strengthened the government's responsibility to protect the equal standing of the people it had just recognized. Section 4 protected legitimate federal debt, rejected Confederate debt, and barred any compensation for the emancipation or loss of enslaved people.",
      "The interpretation offered here: the Constitution explicitly settled that former enslavers would not be paid for losing what they had treated as property, while saying nothing comparable about the people whose labor and liberty were taken — an asymmetry some read as an unresolved account.",
      "Limitation and counterargument: birthright citizenship does not expressly authorize reparations, and Section 4 does not create an enforceable reparations right. Its relevance is the tension between formal citizenship and later failures of equal protection — a moral and historical argument, not a guaranteed legal remedy. The study tests whether learning this changes perceptions of obligation and plausibility.",
    ],
    reflection: "Did granting citizenship complete the government's obligation, or deepen it? Why?",
  },
  {
    id: "rm3",
    title: "Path 2 — The Equitable Path (unjust enrichment and constructive trust)",
    body: [
      "This framework treats reparations as more than compensation for suffering. It asks whether wealth produced or retained through wrongful conduct can be understood through unjust enrichment: a court may impose a 'constructive trust' requiring the transfer of identifiable property or traceable proceeds that someone cannot equitably keep.",
      "Strength: it reframes reparations as returning wrongfully retained value rather than providing charity.",
      "Limitation and counterargument: constructive trusts generally require identifiable assets, traceable proceeds, and a legally supportable link between the property and the claimant. They do not automatically apply to the entire national economy. This logic may be most plausible for particular land, institutions, funds, or documented proceeds, while a broad national program would likely still require legislation.",
    ],
    reflection: "Where might 'returning wrongfully retained value' apply most clearly — and where does it break down?",
  },
  {
    id: "rm4",
    title: "Path 3 — The Status Path (Malcolm X, the OAAU, and human rights)",
    body: [
      "Malcolm X and the Organization of Afro-American Unity worked to move the struggle beyond a purely domestic civil-rights request — framing the treatment of Black Americans as a human-rights matter with international significance, while building independent political, educational, and economic capacity.",
      "Stated carefully: they were working toward collective organization, international recognition, and a human-rights framework — not a legally completed or internationally recognized sovereign status.",
      "This raises open questions the study asks rather than answers: Would a formally defined descendant community make reparations more administratively plausible? Should eligible Black Americans be recognized as a historically injured people with collective claims? Would lineage documentation strengthen that claim? Could an organized representative institution negotiate and administer remedies more effectively than disconnected individuals? And does framing reparations as human rights and self-determination change how plausible they seem, compared with framing them as a domestic benefit program?",
    ],
    reflection: "Does framing reparations as a human-rights matter change how you weigh them? Why or why not?",
  },
  {
    id: "rm5",
    title: "An institutional destination — a permanent reparations fund",
    body: [
      "If an eligible descendant community can be defined, an obligation recognized, and capital identified, one proposal is a permanent reparations fund that holds and invests assets on behalf of present and future generations — rather than a one-time payment.",
      "Strength: a durable institution could outlast political cycles and compound over time. Limitation and counterargument: it depends on the prior steps (defining beneficiaries, establishing the obligation, and identifying capital), each of which is contested; governance, eligibility, and funding would all require broad political agreement and legislation.",
    ],
    reflection: "Would a permanent, invested fund be more or less plausible to you than direct payments? Why?",
  },
  {
    id: "rm6",
    title: "Evidence, interpretation, and hypothesis",
    body: [
      "It helps to distinguish documented law, scholarly interpretation, advocacy, personal belief, and untested hypothesis. Much of the above is interpretation and argument, not settled law.",
      "The project hypothesis: 'Many people perceive reparations as unnecessary or implausible partly because they have limited exposure to the historical, constitutional, equitable, and human-rights frameworks involved; after balanced education, participants may perceive reparations as more necessary, plausible, and implementable.' This is a hypothesis being tested — not an established result.",
      "The study explicitly allows the opposite outcome: education may produce no change, or may decrease perceived plausibility. Either is a legitimate finding.",
    ],
    reflection: "How confident should anyone be in a hypothesis that has not yet been tested?",
  },
];

// ── Knowledge check (correct index; balanced, factual) ──
export const knowledgeCheck = [
  { id: "k1", q: "Does Section 4 of the Fourteenth Amendment explicitly create an enforceable right to reparations?", options: ["Yes", "No", "Unsure"], correct: 1 },
  { id: "k2", q: "A constructive trust generally requires:", options: ["Nothing in particular", "Identifiable property or traceable proceeds and a supportable connection", "A national vote", "Only a moral argument"], correct: 1 },
  { id: "k3", q: "Malcolm X and the OAAU primarily worked toward:", options: ["A completed, internationally recognized sovereign state", "Collective organization and a human-rights framework", "Ending all civil-rights work", "A one-time cash payment"], correct: 1 },
  { id: "k4", q: "Does this module claim that reparations are legally guaranteed today?", options: ["Yes", "No"], correct: 1 },
  { id: "k5", q: "Which best describes this study?", options: ["It proves reparations are owed", "It requires participants to support reparations", "It examines whether learning about several frameworks affects perceptions", "It is a fundraising campaign"], correct: 2 },
];

// ── Post-module: module evaluation + per-pathway plausibility + which pathway ──
export const postOnlyStatements = [
  { id: "pm1", text: "The module increased my understanding of the arguments about reparations." },
  { id: "pm2", text: "The module presented more than one credible perspective." },
  { id: "pm3", text: "The module fairly presented the limitations and counterarguments." },
  { id: "pm4", text: "I felt pressured to adopt a particular conclusion." },
  { id: "pm5", text: "I am now better able to tell legal arguments apart from moral or political ones." },
];

export const pathwayRatings = [
  { id: "path1_plaus", text: "The Constitutional Path (Fourteenth Amendment)" },
  { id: "path2_plaus", text: "The Equitable Path (unjust enrichment / constructive trust)" },
  { id: "path3_plaus", text: "The Status Path (Malcolm X, the OAAU, human rights)" },
];
export const pathwayRatingPrompt =
  "How much does each framework, on its own, make reparations seem plausible to you?";

export const whichPathway = {
  id: "which_pathway",
  q: "Which framework, if any, most changed your view?",
  options: [
    "The Constitutional Path",
    "The Equitable Path",
    "The Status Path",
    "None changed my view",
  ],
};

export const overallChange = {
  id: "overall_change",
  q: "Overall, how did the module affect your perception of reparations?",
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
  { id: "r2", q: "Which argument did you find strongest, and why?" },
  { id: "r3", q: "Which limitation or counterargument did you find most serious?" },
  { id: "r4", q: "What information seemed incomplete, biased, or unsupported?" },
  { id: "r5", q: "Under what conditions, if any, could reparations be plausible or implementable?" },
  { id: "r6", q: "What are your thoughts on defining an eligible descendant community and on lineage documentation?" },
  { id: "r7", q: "What would you want added before this module is shown to a larger audience?" },
];

export const debrief = [
  "Thank you for participating.",
  "This project investigates whether balanced education about historical, constitutional, equitable, and human-rights frameworks changes perceptions of reparations. The researcher hypothesizes that such education may increase perceived necessity, plausibility, and implementability.",
  "The study is not designed to prove that reparations are owed. No change, decreased support, and increased support are all legitimate outcomes.",
  "Participation does not create any expectation that you support or oppose reparations.",
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
