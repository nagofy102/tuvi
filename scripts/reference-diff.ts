import { calculateChart } from '../src/domain/astrology/calculate';
import type { BirthInput, ChartResult } from '../src/domain/astrology/types';
import { RULE_PROFILE } from '../src/domain/astrology/profile';
import { canonicalStarName } from '../src/domain/interpretation/context';
import { assertReviewedReferenceSources } from './source-admission';

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

const branches = new Set([
  'Tý',
  'Sửu',
  'Dần',
  'Mão',
  'Thìn',
  'Tỵ',
  'Ngọ',
  'Mùi',
  'Thân',
  'Dậu',
  'Tuất',
  'Hợi',
]);
const admittedMinorStars = new Set(['Tả Phụ', 'Hữu Bật', 'Văn Xương', 'Văn Khúc']);
const admittedMajorStars = new Set(['Tử Vi']);

function nonBlank(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function uniqueStrings(values: unknown): values is string[] {
  return (
    Array.isArray(values) &&
    values.length > 0 &&
    values.every(nonBlank) &&
    new Set(values).size === values.length
  );
}

function validStarFields(value: unknown, names: ReadonlySet<string>): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.entries(value).length > 0 &&
    Object.entries(value).every(
      ([name, branch]) => names.has(name) && typeof branch === 'string' && branches.has(branch),
    )
  );
}

export function assertIndependentOrigins(corpus: ReferenceCorpus): void {
  // These metadata checks reject inadmissible records, not certify source accuracy
  // or prove independence. Expected values still require external source review.
  if (
    corpus.schemaVersion !== 'source-reference-charts-v1' ||
    corpus.profileId !== RULE_PROFILE ||
    corpus.oraclePolicy.engineUsedForExpected !== false ||
    corpus.oraclePolicy.regressionSnapshotsAreGroundTruth !== false ||
    !corpus.cases.length ||
    !corpus.sourceDocuments.length ||
    !corpus.excerpts.length
  )
    throw new Error('Independent source corpus required; engine snapshots are not accepted.');
  const documents = new Set(corpus.sourceDocuments.map((s) => s.id));
  const excerpts = new Map(corpus.excerpts.map((s) => [s.id, s]));
  if (documents.size !== corpus.sourceDocuments.length || excerpts.size !== corpus.excerpts.length)
    throw new Error('Duplicate source document or excerpt IDs.');
  if (new Set(corpus.cases.map((c) => c.id)).size !== corpus.cases.length)
    throw new Error('Duplicate reference case IDs.');
  for (const source of corpus.sourceDocuments) {
    let url: URL;
    try {
      url = new URL(source.url);
    } catch {
      throw new Error('Pinned external source required.');
    }
    if (
      !nonBlank(source.id) ||
      url.protocol !== 'https:' ||
      !url.hostname ||
      url.username ||
      url.password ||
      !Number.isSafeInteger(source.revision) ||
      source.revision <= 0 ||
      url.searchParams.getAll('oldid').length !== 1 ||
      url.searchParams.get('oldid') !== String(source.revision)
    )
      throw new Error('Pinned external source required.');
  }
  for (const excerpt of corpus.excerpts) {
    if (
      !nonBlank(excerpt.id) ||
      !documents.has(excerpt.sourceId) ||
      !nonBlank(excerpt.text) ||
      !nonBlank(excerpt.heading)
    )
      throw new Error('Unresolved source passage.');
  }
  for (const item of corpus.cases) {
    if (!nonBlank(item.id) || item.status !== 'manual-source-derived-partial')
      throw new Error(`Unsupported reference case status or ID: ${item.id}`);
    if (
      item.input.calendar !== 'lunar' ||
      item.input.date.isLeapMonth !== false ||
      !Number.isInteger(item.input.hour) ||
      item.input.hour < 0 ||
      item.input.hour >= 23 ||
      !Number.isInteger(item.input.minute) ||
      item.input.minute < 0 ||
      item.input.minute > 59
    )
      throw new Error(`Input outside admitted non-leap lunar/known-hour scope: ${item.id}`);
    if (
      Object.keys(item.expected).some(
        (key) => !['mingBranch', 'bodyBranch', 'minorStars', 'cuc', 'majorStars'].includes(key),
      )
    )
      throw new Error(`Unrecognized expected field: ${item.id}`);
    if (
      item.provenance.engineUsedForExpected !== false ||
      !nonBlank(item.provenance.derivation) ||
      !nonBlank(item.provenance.method) ||
      !uniqueStrings(item.provenance.sourceIds) ||
      !uniqueStrings(item.provenance.excerptIds) ||
      !uniqueStrings(item.unverifiedFields)
    )
      throw new Error(`Missing independent provenance: ${item.id}`);
    if (
      !item.provenance.sourceIds.every((id) => documents.has(id)) ||
      !item.provenance.excerptIds.every((id) => {
        const excerpt = excerpts.get(id);
        return excerpt && item.provenance.sourceIds.includes(excerpt.sourceId);
      }) ||
      !item.provenance.sourceIds.every((id) =>
        item.provenance.excerptIds.some((excerptId) => excerpts.get(excerptId)?.sourceId === id),
      )
    )
      throw new Error(`Unresolved provenance: ${item.id}`);
    if (
      !branches.has(item.expected.mingBranch) ||
      !branches.has(item.expected.bodyBranch) ||
      !validStarFields(item.expected.minorStars, admittedMinorStars) ||
      ('majorStars' in item.expected &&
        !validStarFields(item.expected.majorStars, admittedMajorStars)) ||
      ('cuc' in item.expected && item.expected.cuc !== 'Hỏa Lục Cục')
    )
      throw new Error(`Invalid or unadmitted expected fields: ${item.id}`);
    const requiredPassages = new Set(['v2-ming-body']);
    for (const name of Object.keys(item.expected.minorStars))
      requiredPassages.add(
        name === 'Tả Phụ' || name === 'Hữu Bật' ? 'v2-left-right' : 'v2-wenchang-wenqu',
      );
    if (item.expected.cuc || item.expected.majorStars) {
      requiredPassages.add('v2-fire-ziwei-example');
      if (item.expected.cuc) requiredPassages.add('v2-fire-number');
      // Only the existing literal example is admitted here, not a general cục
      // or principal-placement formula. Wider scope requires reviewed sources.
      if (
        item.input.calendar !== 'lunar' ||
        item.input.date.year !== 1984 ||
        item.input.date.month !== 1 ||
        item.input.date.day !== 1 ||
        item.input.date.isLeapMonth !== false ||
        item.input.hour !== 0 ||
        item.expected.mingBranch !== 'Dần' ||
        (item.expected.majorStars && item.expected.majorStars['Tử Vi'] !== 'Dậu')
      )
        throw new Error(`Outside admitted literal Cục/Tử Vi example: ${item.id}`);
    }
    if ([...requiredPassages].some((id) => !item.provenance.excerptIds.includes(id)))
      throw new Error(`Missing field-specific source passage: ${item.id}`);
  }
  assertReviewedReferenceSources(corpus);
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
