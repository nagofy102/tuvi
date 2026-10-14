export interface StarMeaning {
  theme: string;
  reflection: string;
  sourceIds: string[];
}

export interface StarReading extends StarMeaning {
  name: string;
  brightness: string;
  transformation: string;
  passageIds: string[];
}

export interface ReadingEvidence {
  /** Palace from which the direct/trine/opposition relation was evaluated. */
  scopePalace?: string;
  palace: string;
  branch: string;
  relation: 'direct' | 'trine' | 'opposition' | 'body';
  stars: { name: string; brightness: string; transformation: string }[];
}

export interface ContextualInsight {
  ruleId: string;
  title: string;
  text: string;
  why: string;
  passageIds: string[];
  evidence: ReadingEvidence[];
}

export interface RelatedPalaceReading {
  relation: 'trine' | 'opposition';
  name: string;
  branch: string;
  stars: StarReading[];
}

export interface PalaceReading {
  name: string;
  branch: string;
  title: string;
  overview: string;
  reflection: string;
  directStars: StarReading[];
  uninterpretedStars: string[];
  relatedPalaces: RelatedPalaceReading[];
  sourceIds: string[];
  insights: ContextualInsight[];
}

export type ReadingConcern = 'career' | 'finance' | 'relationship';

export interface ReadingCondition {
  id: string;
  label: string;
  met: boolean;
  scopePalace: string;
}

/** Editorial applicability, never confidence in a prediction or a luck score. */
export interface ReadingClaim {
  id: string;
  ruleId: string;
  title: string;
  state: 'supported' | 'mixed' | 'insufficient';
  text: string;
  why: string;
  passageIds: string[];
  evidence: ReadingEvidence[];
  conditions: ReadingCondition[];
  missingPrerequisites: string[];
  limitations: string[];
  selfCheck: string;
  adjustment: string;
}

export interface ThematicReading {
  id: string;
  concern: ReadingConcern;
  title: string;
  paragraphs: string[];
  selfCheck: string;
  adjustment: string;
  palaceNames: string[];
  insights: ContextualInsight[];
  claims: ReadingClaim[];
  /** Career-only source-bounded synthesis; other themes retain their prior contract. */
  careerNarrative?: CareerNarrative;
}

export interface CareerNarrative {
  state: 'direct-career' | 'no-direct-career' | 'insufficient-context';
  why: string;
  evidence: ReadingEvidence[];
  passageIds: string[];
  limitations: string[];
  practice: { prompt: string; action: string };
}

export interface InterpretationReport {
  status: 'ready';
  version: string;
  profile: string;
  knowledgeProfile: string;
  reviewStatus: 'reference-unvalidated';
  summary: {
    paragraphs: string[];
    facts: { label: string; value: string }[];
    focusPalace: string;
    insights: ContextualInsight[];
  };
  palaces: PalaceReading[];
  themes: ThematicReading[];
  sourceIds: string[];
  warnings: string[];
}

export interface UnavailableInterpretation {
  status: 'unavailable';
  reason: 'unsupported-profile' | 'invalid-chart' | 'incomplete-catalog';
  message: string;
}

export type InterpretationResult = InterpretationReport | UnavailableInterpretation;
