import { describe, expect, it } from 'vitest';
import data from '../fixtures/reference-charts.json';
import {
  assertIndependentOrigins,
  compareKnownFields,
  runReferenceDiff,
  type ReferenceCorpus,
} from '../../scripts/reference-diff';
import { calculateChart } from '@/domain/astrology/calculate';

// Static JSON is the oracle; tests never copy actual values into expected fields.
const corpus = data as ReferenceCorpus;
describe('source-derived partial chart corpus, not complete certified charts', () => {
  it('admits external pinned passages and explicit independent derivations', () => {
    expect(() => assertIndependentOrigins(corpus)).not.toThrow();
    expect(corpus.cases).toHaveLength(24);
    expect(new Set(corpus.cases.map((c) => c.input.date.month)).size).toBe(12);
    expect(new Set(corpus.cases.map((c) => c.expected.mingBranch)).size).toBe(12);
    expect(new Set(corpus.cases.map((c) => c.expected.bodyBranch)).size).toBe(12);
  });
  it('compares only known fields against external expected values', () => {
    const results = runReferenceDiff(corpus);
    expect(results).toHaveLength(24);
    for (const item of results) {
      expect(item.status, item.id).toBe('pass-known-fields');
      expect(item.fields.length).toBeGreaterThanOrEqual(6);
      expect(item.unverifiedFields.length).toBeGreaterThan(0);
    }
    expect(results.reduce((n, c) => n + c.fields.length, 0)).toBe(146);
  });
  it('detects wrong engine output without changing the independent oracle', () => {
    const original = JSON.stringify(corpus);
    const input = corpus.cases[0];
    const actual = calculateChart(input.input);
    actual.palaces.find((p) => p.name === 'Mệnh')!.branch = 'Tuất';
    expect(compareKnownFields(input, actual).status).toBe('fail');
    expect(JSON.stringify(corpus)).toBe(original);
  });
  it('detects duplicate star occurrences even inside the correct palace', () => {
    const item = corpus.cases[0];
    const actual = calculateChart(item.input);
    const palace = actual.palaces.find((p) => p.stars.some((s) => s.name === 'Tả Phù'))!;
    palace.stars.push({ ...palace.stars.find((s) => s.name === 'Tả Phù')! });
    const result = compareKnownFields(item, actual);
    expect(result.status).toBe('fail');
    expect(result.fields.find((f) => f.field === 'Tả Phụ')?.pass).toBe(false);
  });
  it.each([
    'engine-derived',
    'missing-source',
    'missing-excerpt',
    'missing-derivation',
    'snapshot-policy',
    'unknown-field',
  ])('rejects bad origin: %s', (kind) => {
    const invalid = structuredClone(corpus);
    if (kind === 'engine-derived') invalid.cases[0].provenance.engineUsedForExpected = true;
    if (kind === 'missing-source') invalid.cases[0].provenance.sourceIds = ['fictional-book'];
    if (kind === 'missing-excerpt') invalid.cases[0].provenance.excerptIds = ['fictional-passage'];
    if (kind === 'missing-derivation') invalid.cases[0].provenance.derivation = '';
    if (kind === 'snapshot-policy') invalid.oraclePolicy.regressionSnapshotsAreGroundTruth = true;
    if (kind === 'unknown-field')
      Object.assign(invalid.cases[0].expected, { ignoredField: 'must not silently pass' });
    expect(() => runReferenceDiff(invalid)).toThrow();
  });
});
