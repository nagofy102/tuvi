import { describe, expect, it } from 'vitest';
import { calculateChart } from '@/domain/astrology/calculate';
import type { BirthInput } from '@/domain/astrology/types';
import { buildChartGraph, validateChartGraph } from '@/domain/graph/builder';

const INPUT: BirthInput = {
  calendar: 'lunar',
  date: { year: 2000, month: 1, day: 1, isLeapMonth: false },
  gender: 'male',
  hour: 0,
  minute: 0,
  leapPolicy: 'split_at_15',
  ziPolicy: 'next_day_at_23',
};

function graph() {
  const chart = calculateChart(INPUT);
  const result = buildChartGraph(chart);
  expect(result.ok).toBe(true);
  if (!result.ok) throw new Error(result.errors.join('; '));
  return { chart, graph: result.graph };
}

describe('chart graph builder', () => {
  it('builds a deterministic graph without mutating chart facts', () => {
    const chart = calculateChart(INPUT);
    const original = structuredClone(chart);
    expect(buildChartGraph(chart)).toEqual(buildChartGraph(chart));
    expect(chart).toEqual(original);
  });

  it('preserves twelve palaces, star placements, states, periods, and profile metadata', () => {
    const { chart, graph: value } = graph();
    expect(value.nodes.filter((node) => node.kind === 'PALACE')).toHaveLength(12);
    expect(value.nodes.filter((node) => node.kind === 'STAR')).toHaveLength(
      chart.palaces.flatMap((palace) => palace.stars).length,
    );
    expect(value.nodes.filter((node) => node.kind === 'PLACEMENT')).toHaveLength(
      chart.palaces.flatMap((palace) => palace.stars).length,
    );
    expect(value.nodes.filter((node) => node.kind === 'PERIOD_CONTEXT')).toHaveLength(12);
    expect(value.edges.filter((edge) => edge.relation === 'STAR_IN_PALACE')).toHaveLength(
      chart.palaces.flatMap((palace) => palace.stars).length,
    );
    expect(value.nodes.find((node) => node.id === value.contextNodeId)?.attributes).toMatchObject({
      profile: chart.provenance.profile,
      engineVersion: chart.provenance.engine,
      calendarVersion: chart.provenance.calendar,
    });
    expect(validateChartGraph(value)).toEqual([]);
  });

  it('creates canonical symmetric geometry without duplicate edges or wraparound errors', () => {
    const { graph: value } = graph();
    const relationCounts = (relation: 'OPPOSITE' | 'TRINE' | 'ADJACENT') =>
      value.edges.filter((edge) => edge.relation === relation);
    expect(relationCounts('OPPOSITE')).toHaveLength(6);
    expect(relationCounts('TRINE')).toHaveLength(12);
    expect(relationCounts('ADJACENT')).toHaveLength(12);
    expect(new Set(value.edges.map((edge) => edge.id)).size).toBe(value.edges.length);
    expect(relationCounts('OPPOSITE')).toContainEqual(
      expect.objectContaining({ from: 'palace:0', to: 'palace:6', directed: false }),
    );
    expect(relationCounts('TRINE')).toContainEqual(
      expect.objectContaining({ from: 'palace:0', to: 'palace:8', directed: false }),
    );
    expect(relationCounts('ADJACENT')).toContainEqual(
      expect.objectContaining({ from: 'palace:0', to: 'palace:11', directed: false }),
    );
    expect(relationCounts('ADJACENT').every((edge) => edge.evidenceLevel === 'unverified')).toBe(
      true,
    );
  });

  it('fails closed when chart palace fields are missing or inconsistent', () => {
    const chart = calculateChart(INPUT);
    expect(buildChartGraph({ ...chart, palaces: chart.palaces.slice(0, 11) })).toEqual({
      ok: false,
      errors: ['Chart must provide 12 unique branch-indexed palaces'],
    });
    const invalid = structuredClone(chart);
    invalid.palaces[0].branch = 'Sai';
    expect(buildChartGraph(invalid)).toEqual({
      ok: false,
      errors: ['Chart palace geometry or star collection is invalid'],
    });
  });
});
