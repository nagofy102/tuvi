import type { GraphNodeKind, GraphRelation, GraphValue } from '../graph/types';

export type RuleEvaluationStatus =
  | 'MATCHED'
  | 'NOT_MATCHED'
  | 'INSUFFICIENT_DATA'
  | 'BLOCKED_UNVERIFIED_DEPENDENCY'
  | 'SUPPRESSED_BY_EXCEPTION'
  | 'CONFLICTED';

export interface NodeSelector {
  kind: GraphNodeKind;
  attributes?: Readonly<Record<string, GraphValue>>;
}

export type RuleCondition =
  | { type: 'node-exists'; selector: NodeSelector }
  | {
      type: 'edge-exists';
      relation: GraphRelation;
      from: NodeSelector;
      to: NodeSelector;
      minimumEvidence: 'chart-fact' | 'approved-structural-testing';
    }
  | { type: 'node-property-equals'; nodeId: string; property: string; value: GraphValue }
  | { type: 'all'; conditions: RuleCondition[] }
  | { type: 'any'; conditions: RuleCondition[] }
  | { type: 'not'; condition: RuleCondition };

export interface RuleDependency {
  id: string;
  status: 'verified' | 'unverified' | 'unresolved';
  evidenceRefs: string[];
}

export interface RuleEligibility {
  researchOnly: boolean;
  approvedForStructuralTesting: boolean;
  profileCompatible: boolean;
  productionEligible: boolean;
}

export interface RuleModifier {
  id: string;
  when: RuleCondition;
  setClaimRef: string;
}

export interface RuleException {
  id: string;
  when: RuleCondition;
}

export interface GraphRule {
  id: string;
  version: string;
  status: 'research-only' | 'structural-test' | 'profile-compatible' | 'production';
  evidenceRefs: string[];
  requiredFacts: string[];
  requiredRelations: GraphRelation[];
  conditions: RuleCondition;
  modifiers: RuleModifier[];
  exceptions: RuleException[];
  counterconditions: RuleCondition[];
  conclusion: {
    claimRef: string;
    conflictGroup: string | null;
    opposesClaimRefs: string[];
  };
  dependencies: RuleDependency[];
  limitations: string[];
  eligibility: RuleEligibility;
  conflictReview: 'reviewed-no-known-conflict' | 'unresolved';
}

export interface ConditionTrace {
  condition: RuleCondition;
  outcome: 'TRUE' | 'FALSE' | 'MISSING' | 'BLOCKED';
  nodeIds: string[];
  edgeIds: string[];
  factIds: string[];
  reason: string;
}

export interface InferenceTrace {
  ruleId: string;
  ruleVersion: string;
  status: RuleEvaluationStatus;
  conditionChecks: ConditionTrace[];
  graphNodeIds: string[];
  graphEdgeIds: string[];
  chartFactIds: string[];
  appliedModifierIds: string[];
  appliedExceptionIds: string[];
  unresolvedDependencyIds: string[];
  evidenceRefs: string[];
  conclusionClaimRef: string | null;
  reason: string;
}

export interface RuleEvaluation {
  ruleId: string;
  status: RuleEvaluationStatus;
  claimRef: string | null;
  trace: InferenceTrace;
}

export interface EvaluationBatch {
  mode: 'structural-test' | 'shadow' | 'production';
  status: 'EVALUATED' | 'NO_ELIGIBLE_RULES';
  evaluations: RuleEvaluation[];
  claims: string[];
}
