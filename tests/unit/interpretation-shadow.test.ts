import { describe, expect, it } from 'vitest';
import { calculateChart } from '@/domain/astrology/calculate';
import { calculateInterpretation } from '@/domain/interpretation/calculate';
import {
  graphShadowEnabled,
  runInterpretationPipeline,
} from '@/domain/interpretation/shadow-pipeline';

function chart() {
  return calculateChart({
    calendar: 'lunar',
    date: { year: 2000, month: 1, day: 1, isLeapMonth: false },
    gender: 'male',
    hour: 0,
    minute: 0,
    leapPolicy: 'split_at_15',
    ziPolicy: 'next_day_at_23',
  });
}

describe('interpretation graph shadow integration', () => {
  it('is disabled by default and preserves the public interpretation output exactly', () => {
    const input = chart();
    const result = runInterpretationPipeline(input);
    expect(result.interpretation).toEqual(calculateInterpretation(input));
    expect(result.shadow).toEqual({
      status: 'DISABLED',
      graph: null,
      evaluation: null,
      errors: [],
      productionOutputChanged: false,
    });
  });

  it('builds a graph in shadow mode but emits no claim when no production rule is eligible', () => {
    const input = chart();
    const result = runInterpretationPipeline(input, { shadowMode: true });
    expect(result.interpretation).toEqual(calculateInterpretation(input));
    expect(result.shadow.status).toBe('NO_ELIGIBLE_RULES');
    expect(result.shadow.graph?.nodes.length).toBeGreaterThan(12);
    expect(result.shadow.evaluation?.claims).toEqual([]);
    expect(result.shadow.productionOutputChanged).toBe(false);
  });

  it('only enables shadow mode for an explicit value', () => {
    expect(graphShadowEnabled('1')).toBe(true);
    expect(graphShadowEnabled('0')).toBe(false);
    expect(graphShadowEnabled(undefined)).toBe(false);
  });
});
