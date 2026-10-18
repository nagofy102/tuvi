import type { ChartGraph, GraphEdge, GraphNode } from '../graph/types';
import type {
  ConditionTrace,
  EvaluationBatch,
  GraphRule,
  InferenceTrace,
  NodeSelector,
  RuleCondition,
  RuleEvaluation,
  RuleEvaluationStatus,
} from './types';

type Outcome = ConditionTrace['outcome'];

function selectorMatches(node: GraphNode, selector: NodeSelector): boolean {
  return (
    node.kind === selector.kind &&
    Object.entries(selector.attributes ?? {}).every(
      ([key, value]) => node.attributes[key] === value,
    )
  );
}

function evidenceAllowed(edge: GraphEdge, minimum: 'chart-fact' | 'approved-structural-testing') {
  if (minimum === 'chart-fact') return edge.evidenceLevel === 'chart-fact';
  return ['chart-fact', 'approved-structural-testing'].includes(edge.evidenceLevel);
}

function combine(
  condition: RuleCondition,
  children: ConditionTrace[],
  operation: 'all' | 'any',
): ConditionTrace {
  const outcomes = children.map((child) => child.outcome);
  let outcome: Outcome;
  if (operation === 'all') {
    outcome = outcomes.includes('FALSE')
      ? 'FALSE'
      : outcomes.includes('BLOCKED')
        ? 'BLOCKED'
        : outcomes.includes('MISSING')
          ? 'MISSING'
          : 'TRUE';
  } else {
    outcome = outcomes.includes('TRUE')
      ? 'TRUE'
      : outcomes.includes('BLOCKED')
        ? 'BLOCKED'
        : outcomes.includes('MISSING')
          ? 'MISSING'
          : 'FALSE';
  }
  return {
    condition,
    outcome,
    nodeIds: [...new Set(children.flatMap((child) => child.nodeIds))],
    edgeIds: [...new Set(children.flatMap((child) => child.edgeIds))],
    factIds: [...new Set(children.flatMap((child) => child.factIds))],
    reason: `${operation.toUpperCase()} condition evaluated as ${outcome}`,
  };
}

export function evaluateCondition(graph: ChartGraph, condition: RuleCondition): ConditionTrace {
  if (condition.type === 'node-exists') {
    const nodes = graph.nodes.filter((node) => selectorMatches(node, condition.selector));
    return {
      condition,
      outcome: nodes.length ? 'TRUE' : 'FALSE',
      nodeIds: nodes.map((node) => node.id),
      edgeIds: [],
      factIds: nodes.flatMap((node) => node.provenance.factIds),
      reason: nodes.length ? 'Matching graph node exists' : 'No matching graph node exists',
    };
  }
  if (condition.type === 'node-property-equals') {
    const node = graph.nodes.find((candidate) => candidate.id === condition.nodeId);
    if (!node || !Object.hasOwn(node.attributes, condition.property)) {
      return {
        condition,
        outcome: 'MISSING',
        nodeIds: node ? [node.id] : [],
        edgeIds: [],
        factIds: node?.provenance.factIds ?? [],
        reason: node ? 'Required node property is missing' : 'Required node is missing',
      };
    }
    return {
      condition,
      outcome: node.attributes[condition.property] === condition.value ? 'TRUE' : 'FALSE',
      nodeIds: [node.id],
      edgeIds: [],
      factIds: node.provenance.factIds,
      reason:
        node.attributes[condition.property] === condition.value
          ? 'Node property equals expected value'
          : 'Node property differs from expected value',
    };
  }
  if (condition.type === 'edge-exists') {
    const fromIds = new Set(
      graph.nodes.filter((node) => selectorMatches(node, condition.from)).map((node) => node.id),
    );
    const toIds = new Set(
      graph.nodes.filter((node) => selectorMatches(node, condition.to)).map((node) => node.id),
    );
    if (!fromIds.size || !toIds.size) {
      return {
        condition,
        outcome: 'MISSING',
        nodeIds: [...fromIds, ...toIds],
        edgeIds: [],
        factIds: [],
        reason: 'A required edge endpoint is missing',
      };
    }
    const candidates = graph.edges.filter((edge) => {
      if (edge.relation !== condition.relation) return false;
      const forward = fromIds.has(edge.from) && toIds.has(edge.to);
      const reverse = !edge.directed && fromIds.has(edge.to) && toIds.has(edge.from);
      return forward || reverse;
    });
    const usable = candidates.filter((edge) => evidenceAllowed(edge, condition.minimumEvidence));
    const selected = usable.length ? usable : candidates;
    return {
      condition,
      outcome: usable.length ? 'TRUE' : candidates.length ? 'BLOCKED' : 'FALSE',
      nodeIds: [...new Set(selected.flatMap((edge) => [edge.from, edge.to]))],
      edgeIds: selected.map((edge) => edge.id),
      factIds: [...new Set(selected.flatMap((edge) => edge.provenance.factIds))],
      reason: usable.length
        ? 'Required verified edge exists'
        : candidates.length
          ? 'Only unverified or unresolved edges exist'
          : 'Required edge does not exist',
    };
  }
  if (condition.type === 'all' || condition.type === 'any') {
    return combine(
      condition,
      condition.conditions.map((item) => evaluateCondition(graph, item)),
      condition.type,
    );
  }
  const child = evaluateCondition(graph, condition.condition);
  return {
    ...child,
    condition,
    outcome:
      child.outcome === 'TRUE' ? 'FALSE' : child.outcome === 'FALSE' ? 'TRUE' : child.outcome,
    reason: `NOT condition evaluated from ${child.outcome}`,
  };
}

function isEligible(rule: GraphRule, mode: EvaluationBatch['mode']): boolean {
  if (rule.eligibility.researchOnly || rule.status === 'research-only') return false;
  if (mode === 'structural-test') return rule.eligibility.approvedForStructuralTesting;
  return (
    rule.status === 'production' &&
    rule.eligibility.profileCompatible &&
    rule.eligibility.productionEligible
  );
}

function traceFor(
  rule: GraphRule,
  status: RuleEvaluationStatus,
  checks: ConditionTrace[],
  reason: string,
  claimRef: string | null,
  modifiers: string[] = [],
  exceptions: string[] = [],
): InferenceTrace {
  return {
    ruleId: rule.id,
    ruleVersion: rule.version,
    status,
    conditionChecks: checks,
    graphNodeIds: [...new Set(checks.flatMap((check) => check.nodeIds))],
    graphEdgeIds: [...new Set(checks.flatMap((check) => check.edgeIds))],
    chartFactIds: [...new Set(checks.flatMap((check) => check.factIds))],
    appliedModifierIds: modifiers,
    appliedExceptionIds: exceptions,
    unresolvedDependencyIds: rule.dependencies
      .filter((dependency) => dependency.status !== 'verified')
      .map((dependency) => dependency.id),
    evidenceRefs: [...rule.evidenceRefs],
    conclusionClaimRef: claimRef,
    reason,
  };
}

export function evaluateRule(
  graph: ChartGraph,
  rule: GraphRule,
  mode: EvaluationBatch['mode'],
): RuleEvaluation {
  if (!isEligible(rule, mode)) {
    const status = 'BLOCKED_UNVERIFIED_DEPENDENCY';
    return {
      ruleId: rule.id,
      status,
      claimRef: null,
      trace: traceFor(rule, status, [], `Rule is not eligible in ${mode} mode`, null),
    };
  }
  if (rule.dependencies.some((dependency) => dependency.status !== 'verified')) {
    const status = 'BLOCKED_UNVERIFIED_DEPENDENCY';
    return {
      ruleId: rule.id,
      status,
      claimRef: null,
      trace: traceFor(rule, status, [], 'Rule has unverified or unresolved dependencies', null),
    };
  }
  const primary = evaluateCondition(graph, rule.conditions);
  const checks = [primary];
  if (primary.outcome === 'FALSE') {
    return {
      ruleId: rule.id,
      status: 'NOT_MATCHED',
      claimRef: null,
      trace: traceFor(rule, 'NOT_MATCHED', checks, 'Required conditions are false', null),
    };
  }
  if (primary.outcome === 'MISSING') {
    return {
      ruleId: rule.id,
      status: 'INSUFFICIENT_DATA',
      claimRef: null,
      trace: traceFor(rule, 'INSUFFICIENT_DATA', checks, 'Required facts are missing', null),
    };
  }
  if (primary.outcome === 'BLOCKED') {
    return {
      ruleId: rule.id,
      status: 'BLOCKED_UNVERIFIED_DEPENDENCY',
      claimRef: null,
      trace: traceFor(
        rule,
        'BLOCKED_UNVERIFIED_DEPENDENCY',
        checks,
        'Required relation is unverified',
        null,
      ),
    };
  }

  const exceptionChecks = rule.exceptions.map((exception) => ({
    id: exception.id,
    check: evaluateCondition(graph, exception.when),
  }));
  checks.push(...exceptionChecks.map((item) => item.check));
  const missingException = exceptionChecks.find((item) =>
    ['MISSING', 'BLOCKED'].includes(item.check.outcome),
  );
  if (missingException) {
    const status =
      missingException.check.outcome === 'BLOCKED'
        ? 'BLOCKED_UNVERIFIED_DEPENDENCY'
        : 'INSUFFICIENT_DATA';
    return {
      ruleId: rule.id,
      status,
      claimRef: null,
      trace: traceFor(rule, status, checks, 'Exception could not be resolved safely', null),
    };
  }
  const appliedException = exceptionChecks.find((item) => item.check.outcome === 'TRUE');
  if (appliedException) {
    return {
      ruleId: rule.id,
      status: 'SUPPRESSED_BY_EXCEPTION',
      claimRef: null,
      trace: traceFor(
        rule,
        'SUPPRESSED_BY_EXCEPTION',
        checks,
        'An explicit exception suppresses the conclusion',
        null,
        [],
        [appliedException.id],
      ),
    };
  }

  const counterChecks = rule.counterconditions.map((condition) =>
    evaluateCondition(graph, condition),
  );
  checks.push(...counterChecks);
  if (counterChecks.some((check) => check.outcome !== 'FALSE')) {
    const status = counterChecks.some((check) => check.outcome === 'TRUE')
      ? 'CONFLICTED'
      : counterChecks.some((check) => check.outcome === 'BLOCKED')
        ? 'BLOCKED_UNVERIFIED_DEPENDENCY'
        : 'INSUFFICIENT_DATA';
    return {
      ruleId: rule.id,
      status,
      claimRef: null,
      trace: traceFor(rule, status, checks, 'Countercondition is present or unresolved', null),
    };
  }
  if (rule.conflictReview === 'unresolved') {
    return {
      ruleId: rule.id,
      status: 'CONFLICTED',
      claimRef: null,
      trace: traceFor(rule, 'CONFLICTED', checks, 'Conflict review is unresolved', null),
    };
  }

  let claimRef = rule.conclusion.claimRef;
  const appliedModifiers: string[] = [];
  for (const modifier of rule.modifiers) {
    const check = evaluateCondition(graph, modifier.when);
    checks.push(check);
    if (check.outcome === 'TRUE') {
      claimRef = modifier.setClaimRef;
      appliedModifiers.push(modifier.id);
    } else if (check.outcome === 'MISSING' || check.outcome === 'BLOCKED') {
      const status =
        check.outcome === 'BLOCKED' ? 'BLOCKED_UNVERIFIED_DEPENDENCY' : 'INSUFFICIENT_DATA';
      return {
        ruleId: rule.id,
        status,
        claimRef: null,
        trace: traceFor(rule, status, checks, 'Modifier could not be resolved safely', null),
      };
    }
  }
  return {
    ruleId: rule.id,
    status: 'MATCHED',
    claimRef,
    trace: traceFor(
      rule,
      'MATCHED',
      checks,
      'All required conditions passed',
      claimRef,
      appliedModifiers,
    ),
  };
}

export function evaluateRules(
  graph: ChartGraph,
  rules: readonly GraphRule[],
  mode: EvaluationBatch['mode'],
): EvaluationBatch {
  const eligible = rules.filter((rule) => isEligible(rule, mode));
  if (!rules.length) return { mode, status: 'NO_ELIGIBLE_RULES', evaluations: [], claims: [] };
  const evaluations = rules.map((rule) => evaluateRule(graph, rule, mode));
  const matched = evaluations.filter((result) => result.status === 'MATCHED');
  const conflicts = new Set<string>();
  for (const left of matched) {
    const leftRule = rules.find((rule) => rule.id === left.ruleId)!;
    for (const right of matched) {
      if (left === right || !right.claimRef) continue;
      if (leftRule.conclusion.opposesClaimRefs.includes(right.claimRef)) {
        conflicts.add(left.ruleId);
        conflicts.add(right.ruleId);
      }
    }
  }
  const resolved = evaluations.map((result) =>
    conflicts.has(result.ruleId)
      ? {
          ...result,
          status: 'CONFLICTED' as const,
          claimRef: null,
          trace: {
            ...result.trace,
            status: 'CONFLICTED' as const,
            conclusionClaimRef: null,
            reason: 'Matched rule conflicts with another matched conclusion',
          },
        }
      : result,
  );
  return {
    mode,
    status: eligible.length ? 'EVALUATED' : 'NO_ELIGIBLE_RULES',
    evaluations: resolved,
    claims: resolved.flatMap((result) =>
      result.status === 'MATCHED' && result.claimRef ? [result.claimRef] : [],
    ),
  };
}
