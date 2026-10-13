import { describe, expect, it, vi } from 'vitest';
import corpusData from '../fixtures/reference-charts.json';
import {
  assertIndependentOrigins,
  runReferenceDiff,
  type ReferenceCorpus,
} from '../../scripts/reference-diff';
import * as engine from '@/domain/astrology/calculate';
import {
  SOURCE_REGISTRY,
  assertReviewedReferenceSources,
  summarizeSourceRegistry,
} from '../../scripts/source-admission';

const corpus = corpusData as ReferenceCorpus;

describe('reviewed source admission, not source authenticity or predictive validation', () => {
  it('admits the existing static partial corpus without consulting the engine', () => {
    const calculate = vi.spyOn(engine, 'calculateChart');
    const before = JSON.stringify(corpus);
    try {
      expect(() => assertIndependentOrigins(corpus)).not.toThrow();
      expect(calculate).not.toHaveBeenCalled();
      expect(JSON.stringify(corpus)).toBe(before);
    } finally {
      calculate.mockRestore();
    }
  });

  it('reports bounded admission without counting scans as independent editions or complete charts', () => {
    const summary = summarizeSourceRegistry();
    expect(summary.oracleDocumentCount).toBe(1);
    expect(summary.oraclePassageCount).toBe(6);
    expect(summary.statuses).toEqual({
      'reviewed-partial-oracle': 1,
      'reading-reference-only': 1,
      'facsimile-crosscheck-only': 2,
    });
    expect(summary.completeGoldenCharts).toBe(0);
    expect(summary.independentEditionsVerified).toBe(false);
  });

  it('does not admit a scan by changing its status declaration', () => {
    const registry = structuredClone(SOURCE_REGISTRY);
    registry.sources.find((item) => item.kind === 'facsimile-artifact')!.status =
      'reviewed-partial-oracle';
    expect(() => assertReviewedReferenceSources(corpus, registry)).toThrow();
  });

  it('rejects a reading-only book as a placement oracle even with copied fixture declarations', () => {
    const candidate = structuredClone(corpus);
    const book = SOURCE_REGISTRY.sources.find((item) => item.status === 'reading-reference-only')!;
    candidate.sourceDocuments = [{ id: book.id, url: book.url, revision: book.revision! }];
    candidate.excerpts.forEach((item) => {
      item.sourceId = book.id;
    });
    candidate.cases.forEach((item) => {
      item.provenance.sourceIds = [book.id];
    });
    expect(() => assertReviewedReferenceSources(candidate)).toThrow();
  });

  it('requires reviewed permission for each expected field, not merely a matching quotation', () => {
    const registry = structuredClone(SOURCE_REGISTRY);
    registry.sources.forEach((source) =>
      source.passages.forEach((item) => {
        item.allowedExpectedFields = item.allowedExpectedFields.filter(
          (field) => field !== 'minorStars.Tả Phụ',
        );
      }),
    );
    expect(() => assertReviewedReferenceSources(corpus, registry)).toThrow();
  });

  it.each([
    'complete-count',
    'independent-editions',
    'duplicate-artifact',
    'invalid-digest',
    'unsafe-url',
  ])('rejects invalid registry metadata: %s', (kind) => {
    const registry = structuredClone(SOURCE_REGISTRY);
    const scan = registry.sources.find((item) => item.artifacts?.length)!;
    if (kind === 'complete-count') registry.completeGoldenCharts = 1;
    if (kind === 'independent-editions') registry.independentEditionsVerified = true;
    if (kind === 'duplicate-artifact') scan.artifacts!.push({ ...scan.artifacts![0] });
    if (kind === 'invalid-digest') scan.artifacts![0].sha256 = 'not-sha256';
    if (kind === 'unsafe-url') scan.artifacts![0].url = 'http://example.org/scan';
    expect(() => summarizeSourceRegistry(registry)).toThrow();
  });

  const mutations: [string, (value: ReferenceCorpus) => void][] = [
    [
      'changed quotation under an approved passage ID',
      (value) => {
        value.excerpts[0].text += 'altered';
      },
    ],
    [
      'changed heading under an approved passage ID',
      (value) => {
        value.excerpts[0].heading = 'Unreviewed replacement';
      },
    ],
    [
      'new revision with the same document ID',
      (value) => {
        value.sourceDocuments[0].revision = 1963111;
        value.sourceDocuments[0].url = value.sourceDocuments[0].url.replace('1963110', '1963111');
      },
    ],
    [
      'mirror URL claiming the original revision',
      (value) => {
        value.sourceDocuments[0].url = 'https://example.org/copied-book?oldid=1963110';
      },
    ],
    [
      'unreviewed additional document',
      (value) => {
        value.sourceDocuments.push({
          id: 'not-reviewed',
          revision: 1,
          url: 'https://example.org/?oldid=1',
        });
      },
    ],
    [
      'unreviewed additional excerpt',
      (value) => {
        value.excerpts.push({
          id: 'not-reviewed',
          sourceId: value.sourceDocuments[0].id,
          heading: 'New rule',
          text: 'Do not silently approve.',
        });
      },
    ],
  ];

  it.each(mutations)('rejects %s before any engine comparison', (_name, mutate) => {
    const candidate = structuredClone(corpus);
    mutate(candidate);
    const before = JSON.stringify(candidate);
    const calculate = vi.spyOn(engine, 'calculateChart');
    try {
      expect(() => runReferenceDiff(candidate)).toThrow();
      expect(calculate).not.toHaveBeenCalled();
      expect(JSON.stringify(candidate)).toBe(before);
    } finally {
      calculate.mockRestore();
    }
  });
});
