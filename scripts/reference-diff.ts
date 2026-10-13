import { calculateChart } from '../src/domain/astrology/calculate';
import type { BirthInput, ChartResult } from '../src/domain/astrology/types';
import { canonicalStarName } from '../src/domain/interpretation/context';

export interface ReferenceCase {
  id: string;
  input: BirthInput;
  status: string;
  expected: {
    mingBranch: string;
    bodyBranch: string;
    minorStars: Record<string, string>;
    cuc?: string;
    majorStars?: Record<string, string>;
  };
  provenance: {
    engineUsedForExpected: boolean;
    method: string;
    sourceIds: string[];
    excerptIds: string[];
    derivation: string;
  };
  unverifiedFields: string[];
}

export interface ReferenceCorpus {
  schemaVersion: string;
  profileId: string;
  sourceDocuments: { id: string; url: string; revision: number }[];
  excerpts: { id: string; sourceId: string; heading: string; text: string }[];
  oraclePolicy: { engineUsedForExpected: boolean; regressionSnapshotsAreGroundTruth: boolean };
  cases: ReferenceCase[];
}

export function assertIndependentOrigins(corpus: ReferenceCorpus): void {
  if (
    corpus.schemaVersion !== 'source-reference-charts-v1' ||
    corpus.oraclePolicy.engineUsedForExpected !== false ||
    corpus.oraclePolicy.regressionSnapshotsAreGroundTruth !== false ||
    !corpus.cases.length
  )
    throw new Error('Independent source corpus required; engine snapshots are not accepted.');
  const documents = new Set(corpus.sourceDocuments.map((s) => s.id));
  const excerpts = new Map(corpus.excerpts.map((s) => [s.id, s]));
  if (new Set(corpus.cases.map((c) => c.id)).size !== corpus.cases.length)
    throw new Error('Duplicate reference case IDs.');
  for (const source of corpus.sourceDocuments) {
    if (
      !source.url.startsWith('https://') ||
      !Number.isInteger(source.revision) ||
      !source.url.includes(`oldid=${source.revision}`)
    )
      throw new Error('Pinned external source required.');
  }
  for (const excerpt of corpus.excerpts) {
    if (!documents.has(excerpt.sourceId) || !excerpt.text || !excerpt.heading)
      throw new Error('Unresolved source passage.');
  }
  for (const item of corpus.cases) {
    if (
      Object.keys(item.expected).some(
        (key) => !['mingBranch', 'bodyBranch', 'minorStars', 'cuc', 'majorStars'].includes(key),
      )
    )
      throw new Error(`Unrecognized expected field: ${item.id}`);
    if (
      item.provenance.engineUsedForExpected !== false ||
      !item.provenance.derivation ||
      !item.provenance.method ||
      !item.provenance.sourceIds.length ||
      !item.provenance.excerptIds.length ||
      !item.unverifiedFields.length
    )
      throw new Error(`Missing independent provenance: ${item.id}`);
    if (
      !item.provenance.sourceIds.every((id) => documents.has(id)) ||
      !item.provenance.excerptIds.every((id) => {
        const excerpt = excerpts.get(id);
        return excerpt && item.provenance.sourceIds.includes(excerpt.sourceId);
      })
    )
      throw new Error(`Unresolved provenance: ${item.id}`);
    if (
      !item.expected.mingBranch ||
      !item.expected.bodyBranch ||
      !Object.keys(item.expected.minorStars).length
    )
      throw new Error(`No known fields: ${item.id}`);
  }
}

export interface FieldComparison {
  field: string;
  expected: string;
  actual: string;
  pass: boolean;
}
export interface CaseComparison {
  id: string;
  status: 'pass-known-fields' | 'fail' | 'unavailable';
  category: 'none' | 'placement-or-profile' | 'calendar-or-engine-rejection';
  fields: FieldComparison[];
  unverifiedFields: string[];
  error?: string;
}

export function compareKnownFields(item: ReferenceCase, chart: ChartResult): CaseComparison {
  const fields: FieldComparison[] = [];
  const add = (field: string, expected: string, actual: string | undefined) =>
    fields.push({ field, expected, actual: actual ?? 'missing', pass: expected === actual });
  const ming = chart.palaces.filter((p) => p.name === 'Mệnh');
  const body = chart.palaces.filter((p) => p.isBodyPalace);
  add('Mệnh', item.expected.mingBranch, ming.length === 1 ? ming[0].branch : undefined);
  add('Thân', item.expected.bodyBranch, body.length === 1 ? body[0].branch : undefined);
  if (item.expected.cuc) add('Cục', item.expected.cuc, chart.cuc);
  for (const [kind, stars] of [
    ['minor', item.expected.minorStars],
    ['major', item.expected.majorStars ?? {}],
  ] as const) {
    for (const [name, branch] of Object.entries(stars)) {
      const matches = chart.palaces.flatMap((p) =>
        p.stars
          .filter((s) => s.group === kind && canonicalStarName(s.name) === name)
          .map(() => p.branch),
      );
      add(name, branch, matches.length === 1 ? matches[0] : undefined);
    }
  }
  const pass = fields.every((field) => field.pass);
  return {
    id: item.id,
    status: pass ? 'pass-known-fields' : 'fail',
    category: pass ? 'none' : 'placement-or-profile',
    fields,
    unverifiedFields: [...item.unverifiedFields],
  };
}

export function runReferenceDiff(corpus: ReferenceCorpus): CaseComparison[] {
  // Admission happens before any engine call. No code here writes expectations.
  assertIndependentOrigins(corpus);
  return corpus.cases.map((item) => {
    try {
      const chart = calculateChart(item.input);
      if (chart.provenance.profile !== corpus.profileId) throw new Error('Profile mismatch.');
      return compareKnownFields(item, chart);
    } catch (error) {
      return {
        id: item.id,
        status: 'unavailable',
        category: 'calendar-or-engine-rejection',
        fields: [],
        unverifiedFields: [...item.unverifiedFields],
        error: error instanceof Error ? error.message : 'Unknown calculation failure.',
      };
    }
  });
}
