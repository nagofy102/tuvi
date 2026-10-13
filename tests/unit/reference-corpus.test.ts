import { describe, expect, it, vi } from 'vitest';
import data from '../fixtures/reference-charts.json';
import {
  assertIndependentOrigins,
  compareKnownFields,
  runReferenceDiff,
  type ReferenceCorpus,
} from '../../scripts/reference-diff';
import { calculateChart } from '@/domain/astrology/calculate';
import * as engine from '@/domain/astrology/calculate';

// Static source-counted fields are partial expectations, not certified full charts.
// Tests never copy actual values into expected fields; origin flags are not proof.
const corpus = data as ReferenceCorpus;
describe('source-derived partial chart corpus, not complete certified charts', () => {
  it('admits external pinned passages and explicit independent derivations', () => {
    expect(() => assertIndependentOrigins(corpus)).not.toThrow();
    expect(corpus.cases).toHaveLength(36);
    expect(new Set(corpus.cases.map((c) => c.input.date.month)).size).toBe(12);
    expect(new Set(corpus.cases.map((c) => c.expected.mingBranch)).size).toBe(12);
    expect(new Set(corpus.cases.map((c) => c.expected.bodyBranch)).size).toBe(12);
  });
  it('compares only known fields against external expected values', () => {
    const results = runReferenceDiff(corpus);
    expect(results).toHaveLength(36);
    for (const item of results) {
      expect(item.status, item.id).toBe('pass-known-fields');
      expect(item.fields.length).toBeGreaterThanOrEqual(6);
      expect(item.unverifiedFields.length).toBeGreaterThan(0);
    }
    expect(results.reduce((n, c) => n + c.fields.length, 0)).toBe(218);
  }, 15_000);
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

  const invalidMutations: [string, (invalid: ReferenceCorpus) => void][] = [
    [
      'solar input outside source scope',
      (c) => {
        Object.assign(c.cases[0].input, { calendar: 'solar' });
      },
    ],
    [
      'leap input outside source scope',
      (c) => {
        Object.assign(c.cases[0].input.date, { isLeapMonth: true });
      },
    ],
    [
      'late Tý outside source scope',
      (c) => {
        c.cases[0].input.hour = 23;
      },
    ],
    [
      'fractional birth hour',
      (c) => {
        c.cases[0].input.hour = 0.5;
      },
    ],
    [
      'negative birth hour',
      (c) => {
        c.cases[0].input.hour = -1;
      },
    ],
    [
      'nonfinite birth minute',
      (c) => {
        c.cases[0].input.minute = Number.NaN;
      },
    ],
    [
      'out-of-range birth minute',
      (c) => {
        c.cases[0].input.minute = 60;
      },
    ],
    [
      'wrong profile',
      (c) => {
        c.profileId = 'unreviewed-profile';
      },
    ],
    [
      'unknown status',
      (c) => {
        c.cases[0].status = 'complete-certified';
      },
    ],
    [
      'blank case ID',
      (c) => {
        c.cases[0].id = ' ';
      },
    ],
    [
      'duplicate case ID',
      (c) => {
        c.cases[1].id = c.cases[0].id;
      },
    ],
    [
      'empty sources',
      (c) => {
        c.sourceDocuments = [];
      },
    ],
    [
      'empty excerpts',
      (c) => {
        c.excerpts = [];
      },
    ],
    [
      'duplicate source',
      (c) => {
        c.sourceDocuments.push(structuredClone(c.sourceDocuments[0]));
      },
    ],
    [
      'duplicate excerpt',
      (c) => {
        c.excerpts.push(structuredClone(c.excerpts[0]));
      },
    ],
    [
      'blank source ID',
      (c) => {
        c.sourceDocuments[0].id = ' ';
      },
    ],
    [
      'blank excerpt ID',
      (c) => {
        c.excerpts[0].id = ' ';
      },
    ],
    [
      'blank excerpt',
      (c) => {
        c.excerpts[0].text = '\t';
      },
    ],
    [
      'blank heading',
      (c) => {
        c.excerpts[0].heading = ' ';
      },
    ],
    [
      'unpinned URL fragment',
      (c) => {
        c.sourceDocuments[0].url = 'https://example.org/#oldid=1963110';
      },
    ],
    [
      'revision prefix',
      (c) => {
        c.sourceDocuments[0].url += '1';
      },
    ],
    [
      'duplicate revision parameter',
      (c) => {
        c.sourceDocuments[0].url += '&oldid=1963110';
      },
    ],
    [
      'non-HTTPS source',
      (c) => {
        c.sourceDocuments[0].url = c.sourceDocuments[0].url.replace('https:', 'http:');
      },
    ],
    [
      'negative revision',
      (c) => {
        c.sourceDocuments[0].revision = -1;
      },
    ],
    [
      'blank derivation',
      (c) => {
        c.cases[0].provenance.derivation = ' ';
      },
    ],
    [
      'blank method',
      (c) => {
        c.cases[0].provenance.method = '\n';
      },
    ],
    [
      'empty case sources',
      (c) => {
        c.cases[0].provenance.sourceIds = [];
      },
    ],
    [
      'duplicate case source',
      (c) => {
        c.cases[0].provenance.sourceIds.push(c.cases[0].provenance.sourceIds[0]);
      },
    ],
    [
      'duplicate case excerpt',
      (c) => {
        c.cases[0].provenance.excerptIds.push(c.cases[0].provenance.excerptIds[0]);
      },
    ],
    [
      'excerpt outside case sources',
      (c) => {
        c.sourceDocuments.push({ id: 'other', url: 'https://example.org/?oldid=1', revision: 1 });
        c.excerpts[0].sourceId = 'other';
      },
    ],
    [
      'unrelated but resolved excerpts',
      (c) => {
        c.cases[0].provenance.excerptIds = ['v2-ming-body-example'];
      },
    ],
    [
      'missing pair placement excerpt',
      (c) => {
        c.cases[0].provenance.excerptIds = c.cases[0].provenance.excerptIds.filter(
          (id) => id !== 'v2-left-right',
        );
      },
    ],
    [
      'missing hour star excerpt',
      (c) => {
        c.cases[0].provenance.excerptIds = c.cases[0].provenance.excerptIds.filter(
          (id) => id !== 'v2-wenchang-wenqu',
        );
      },
    ],
    [
      'missing fire number excerpt',
      (c) => {
        c.cases[0].provenance.excerptIds = c.cases[0].provenance.excerptIds.filter(
          (id) => id !== 'v2-fire-number',
        );
      },
    ],
    [
      'unused source padding',
      (c) => {
        c.sourceDocuments.push({ id: 'unused', url: 'https://example.org/?oldid=1', revision: 1 });
        c.cases[0].provenance.sourceIds.push('unused');
      },
    ],
    [
      'Cục outside source example day',
      (c) => {
        c.cases[0].input.date.day = 15;
      },
    ],
    [
      'Cục outside source example month',
      (c) => {
        c.cases[0].input.date.month = 6;
      },
    ],
    [
      'Tử Vi outside literal branch',
      (c) => {
        c.cases[0].expected.majorStars = { 'Tử Vi': 'Dần' };
      },
    ],
    [
      'invalid Mệnh branch',
      (c) => {
        c.cases[0].expected.mingBranch = 'fictional';
      },
    ],
    [
      'invalid Thân branch',
      (c) => {
        c.cases[0].expected.bodyBranch = ' ';
      },
    ],
    [
      'invalid minor branch',
      (c) => {
        c.cases[0].expected.minorStars['Tả Phụ'] = 'fictional';
      },
    ],
    [
      'unadmitted minor star',
      (c) => {
        c.cases[0].expected.minorStars['Thiên Khôi'] = 'Dần';
      },
    ],
    [
      'major in minor fields',
      (c) => {
        c.cases[0].expected.minorStars['Tử Vi'] = 'Dần';
      },
    ],
    [
      'noncanonical alias',
      (c) => {
        c.cases[0].expected.minorStars['Tả Phù'] = 'Thìn';
      },
    ],
    [
      'empty minor stars',
      (c) => {
        c.cases[0].expected.minorStars = {};
      },
    ],
    [
      'unadmitted major star',
      (c) => {
        c.cases[0].expected.majorStars = { 'Thiên Phủ': 'Dần' };
      },
    ],
    [
      'invalid major branch',
      (c) => {
        c.cases[0].expected.majorStars = { 'Tử Vi': 'fictional' };
      },
    ],
    [
      'empty major stars',
      (c) => {
        c.cases[0].expected.majorStars = {};
      },
    ],
    [
      'unadmitted cục',
      (c) => {
        c.cases[0].expected.cuc = 'Thủy Nhị Cục';
      },
    ],
    [
      'empty unverified fields',
      (c) => {
        c.cases[0].unverifiedFields = [];
      },
    ],
    [
      'blank unverified field',
      (c) => {
        c.cases[0].unverifiedFields = [' '];
      },
    ],
    [
      'duplicate unverified field',
      (c) => {
        c.cases[0].unverifiedFields.push(c.cases[0].unverifiedFields[0]);
      },
    ],
  ];

  it.each(invalidMutations)('rejects %s before invoking the engine', (_name, mutate) => {
    const invalid = structuredClone(corpus);
    mutate(invalid);
    const original = JSON.stringify(invalid);
    const calculate = vi.spyOn(engine, 'calculateChart');
    try {
      expect(() => runReferenceDiff(invalid)).toThrow();
      expect(calculate).not.toHaveBeenCalled();
      expect(JSON.stringify(invalid)).toBe(original);
    } finally {
      calculate.mockRestore();
    }
  });
});
