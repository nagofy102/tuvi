import { describe, expect, it } from 'vitest';
import { calculateChart } from '@/domain/astrology/calculate';
import { buildChartGraph } from '@/domain/graph/builder';
import { evaluateRule, evaluateRules } from '@/domain/rules/evaluator';
import type { GraphRule, RuleCondition } from '@/domain/rules/types';

function graph() {
  const chart = calculateChart({
    calendar: 'lunar',
    date: { year: 2000, month: 1, day: 1, isLeapMonth: false },
    gender: 'male',
    hour: 0,
    minute: 0,
    leapPolicy: 'split_at_15',
    ziPolicy: 'next_day_at_23',
  });
  const result = buildChartGraph(chart);
  if (!result.ok) throw new Error(result.errors.join('; '));
  return result.graph;
}

const menh: RuleCondition = {
  type: 'node-exists',
  selector: { kind: 'PALACE', attributes: { name: 'Mệnh' } },
};

function rule(overrides: Partial<GraphRule> = {}): GraphRule {
  return {
    id: 'test:rule',
    version: 'test-v1',
    status: 'structural-test',
    evidenceRefs: ['test-only'],
    requiredFacts: ['chart.palaces'],
    requiredRelations: [],
    conditions: menh,
    modifiers: [],
    exceptions: [],
    counterconditions: [],
    conclusion: { claimRef: 'test:claim', conflictGroup: null, opposesClaimRefs: [] },
    dependencies: [],
    limitations: ['Test-only; never production'],
    eligibility: {
      researchOnly: false,
      approvedForStructuralTesting: true,
      profileCompatible: false,
      productionEligible: false,
    },
    conflictReview: 'reviewed-no-known-conflict',
    ...overrides,
  };
}

describe('graph rule evaluator', () => {
  it('matches an eligible structural-test rule and emits a fact-linked trace', () => {
    const result = evaluateRule(graph(), rule(), 'structural-test');
    expect(result).toMatchObject({ status: 'MATCHED', claimRef: 'test:claim' });
    expect(result.trace.graphNodeIds).not.toHaveLength(0);
    expect(result.trace.chartFactIds).not.toHaveLength(0);
    expect(result.trace.ruleVersion).toBe('test-v1');
  });

  it('distinguishes false conditions from missing data', () => {
    expect(
      evaluateRule(
        graph(),
        rule({
          conditions: {
            type: 'node-exists',
            selector: { kind: 'PALACE', attributes: { name: 'Không tồn tại' } },
          },
        }),
        'structural-test',
      ).status,
    ).toBe('NOT_MATCHED');
    expect(
      evaluateRule(
        graph(),
        rule({
          conditions: {
            type: 'node-property-equals',
            nodeId: 'palace:0',
            property: 'missing',
            value: true,
          },
        }),
        'structural-test',
      ).status,
    ).toBe('INSUFFICIENT_DATA');
  });

  it('blocks unverified dependencies, unverified relations, and ineligible rules', () => {
    expect(
      evaluateRule(
        graph(),
        rule({ dependencies: [{ id: 'profile', status: 'unresolved', evidenceRefs: [] }] }),
        'structural-test',
      ).status,
    ).toBe('BLOCKED_UNVERIFIED_DEPENDENCY');
    expect(
      evaluateRule(
        graph(),
        rule({
          conditions: {
            type: 'edge-exists',
            relation: 'ADJACENT',
            from: { kind: 'PALACE', attributes: { branchIndex: 0 } },
            to: { kind: 'PALACE', attributes: { branchIndex: 1 } },
            minimumEvidence: 'approved-structural-testing',
          },
        }),
        'structural-test',
      ).status,
    ).toBe('BLOCKED_UNVERIFIED_DEPENDENCY');
    expect(evaluateRule(graph(), rule(), 'production').status).toBe(
      'BLOCKED_UNVERIFIED_DEPENDENCY',
    );
  });

  it('suppresses with an exception and applies an explicit modifier', () => {
    expect(
      evaluateRule(
        graph(),
        rule({ exceptions: [{ id: 'test:exception', when: menh }] }),
        'structural-test',
      ),
    ).toMatchObject({
      status: 'SUPPRESSED_BY_EXCEPTION',
      trace: { appliedExceptionIds: ['test:exception'] },
    });
    expect(
      evaluateRule(
        graph(),
        rule({ modifiers: [{ id: 'test:modifier', when: menh, setClaimRef: 'test:modified' }] }),
        'structural-test',
      ),
    ).toMatchObject({
      status: 'MATCHED',
      claimRef: 'test:modified',
      trace: { appliedModifierIds: ['test:modifier'] },
    });
  });

  it('fails closed for unresolved conflict review and conflicting matched conclusions', () => {
    expect(
      evaluateRule(graph(), rule({ conflictReview: 'unresolved' }), 'structural-test').status,
    ).toBe('CONFLICTED');
    const left = rule({
      id: 'test:left',
      conclusion: {
        claimRef: 'test:left-claim',
        conflictGroup: 'test',
        opposesClaimRefs: ['test:right-claim'],
      },
    });
    const right = rule({
      id: 'test:right',
      conclusion: {
        claimRef: 'test:right-claim',
        conflictGroup: 'test',
        opposesClaimRefs: ['test:left-claim'],
      },
    });
    const batch = evaluateRules(graph(), [left, right], 'structural-test');
    expect(batch.claims).toEqual([]);
    expect(batch.evaluations.map((item) => item.status)).toEqual(['CONFLICTED', 'CONFLICTED']);
  });

  it('reports no eligible rule and never runs research-only rules in shadow', () => {
    expect(evaluateRules(graph(), [], 'shadow')).toEqual({
      mode: 'shadow',
      status: 'NO_ELIGIBLE_RULES',
      evaluations: [],
      claims: [],
    });
    expect(evaluateRules(graph(), [rule()], 'shadow')).toMatchObject({
      status: 'NO_ELIGIBLE_RULES',
      evaluations: [{ status: 'BLOCKED_UNVERIFIED_DEPENDENCY', claimRef: null }],
      claims: [],
    });
    const contradictoryResearchRule = rule({
      status: 'research-only',
      eligibility: {
        researchOnly: true,
        approvedForStructuralTesting: true,
        profileCompatible: true,
        productionEligible: true,
      },
    });
    expect(evaluateRule(graph(), contradictoryResearchRule, 'production')).toMatchObject({
      status: 'BLOCKED_UNVERIFIED_DEPENDENCY',
      claimRef: null,
    });
  });
});
