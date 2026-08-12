import type { StoryCarousel } from "./projects";

// Education module for "The R Word" (Reparations) study. The 9 slides are
// finished, finalized educational assets — presented as-is, never overlaid or
// redesigned. This file only frames and describes them.
export const R_MODULE = {
  eyebrow: "Education Module · Especially Reparations",
  title: "The Big Payback?",
  subtitle:
    "An evidence-first inquiry into repair — what was taken, what compounded, and what would actually be owed.",
  essentialQuestion:
    "When history becomes visible, what changes — and what would repair actually require?",
  notice:
    "This module references slavery, genocide, land theft, and racial violence. It presents research categories and open questions — not conclusions. Every claim is meant to be traced to a source and tested against the record.",
};

export const R_CAROUSEL: StoryCarousel = {
  eyebrow: "Especially Reparations",
  title: "Examine the question",
  intro:
    "Nine slides that treat reparations as a research question rather than a slogan: the etymological clue, the layers of documented loss, the culture and accounting questions, what counts as evidence, and how a repair might be matched to a proven harm. Swipe through — a clue is not a conclusion.",
  images: [
    { src: "/art/reparations/01.jpg", alt: "E.R. — Especially Reparations. Etymological use: 'used by English colonists to describe dark skinned natives.' The question: 400 years of slavery + identity erasure / genocide + land theft = the big payback? (1 of 9)" },
    { src: "/art/reparations/02.jpg", alt: "The etymological clue — 'used by English colonists to describe dark skinned natives.' Four questions: who used the term, whom did it describe, when and where, and what did 'native' mean in each historical source. A clue is not a conclusion — trace the source. (2 of 9)" },
    { src: "/art/reparations/03.jpg", alt: "Three layers of loss — 01 400 years of slavery (labor, freedom, wealth); 02 identity erasure / genocide (names, records, classifications); 03 land theft (property, inheritance, belonging). What happens when these losses compound? (3 of 9)" },
    { src: "/art/reparations/04.jpg", alt: "Possible additional layers — 04 cultural distortion / media harm; 05 family & community disruption; 06 educational & political exclusion; 07 health & environmental harm; 08 psychological & spiritual injury. These are research categories — each requires evidence. (4 of 9)" },
    { src: "/art/reparations/05.jpg", alt: "The culture question — were harmful messages reflected, or commercially amplified? Who owned the channels, what behavior was rewarded, which images were repeated, who profited, which alternatives were funded. Artist testimony is a lead — trace ownership, contracts, incentives, distribution. (5 of 9)" },
    { src: "/art/reparations/06.jpg", alt: "The accounting question — what was taken, who benefited, what value compounded, who still carries the cost. Reparations requires an accounting: document → value → liability → repair. (6 of 9)" },
    { src: "/art/reparations/07.jpg", alt: "What counts as evidence? Primary records, land & court records, census & classification records, language corpora & dictionaries, and genealogy / oral histories / economic studies. Claim → source → context → test. Cite the exact entry. (7 of 9)" },
    { src: "/art/reparations/08.jpg", alt: "The big payback? Which repair matches which documented harm — direct payments, land & housing, education & community investment, record restoration & identity protection. Prove the harm, design the repair. (8 of 9)" },
    { src: "/art/reparations/09.jpg", alt: "Join the study — answer the pre-survey, review the evidence, answer the post-survey. What changes when history becomes visible? Your response becomes part of the research. (9 of 9)" },
  ],
};
