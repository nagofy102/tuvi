import registryData from '../dev/source-registry.json';
import type { ReferenceCorpus } from './reference-diff';

export type SourceAdmissionStatus =
  'reviewed-partial-oracle' | 'reading-reference-only' | 'facsimile-crosscheck-only';

export interface ReviewedSourcePassage {
  id: string;
  heading: string;
  text: string;
  allowedExpectedFields: string[];
}

export interface ReviewedSource {
  id: string;
  url: string;
  revision: number | null;
  kind: 'pinned-transcription' | 'facsimile-artifact';
  status: SourceAdmissionStatus;
  locator: string;
  bibliographicIdentity: string;
  allowedInputScope: string;
  rights: string;
  artifacts?: { id: string; url: string; sha256: string }[];
  passages: ReviewedSourcePassage[];
}

export interface SourceRegistry {
  schemaVersion: string;
  registryVersion: string;
  reviewedOn: string;
  reviewMethod: string;
  bibliographicIdentity: string;
  independentEditionsVerified: boolean;
  completeGoldenCharts: number;
  researchDocuments: string[];
  limitations: string[];
  sources: ReviewedSource[];
}

// This Git-reviewed configuration is separate from mutable corpus declarations.
// It records an admission decision, not proof of textual or predictive accuracy.
export const SOURCE_REGISTRY = registryData as SourceRegistry;

function assertRegistryVersion(registry: SourceRegistry): void {
  const artifactIds = registry.sources.flatMap((source) =>
    (source.artifacts ?? []).map((item) => item.id),
  );
  const passageIds = registry.sources.flatMap((source) => source.passages.map((item) => item.id));
  if (
    registry.schemaVersion !== 'reviewed-reference-sources-v1' ||
    !registry.registryVersion.trim() ||
    registry.completeGoldenCharts !== 0 ||
    registry.independentEditionsVerified !== false ||
    new Set(artifactIds).size !== artifactIds.length ||
    new Set(passageIds).size !== passageIds.length ||
    new Set(registry.sources.map((source) => source.id)).size !== registry.sources.length ||
    registry.sources.some(
      (source) =>
        !source.id.trim() ||
        !isHttps(source.url) ||
        ![
          'reviewed-partial-oracle',
          'reading-reference-only',
          'facsimile-crosscheck-only',
        ].includes(source.status) ||
        !['pinned-transcription', 'facsimile-artifact'].includes(source.kind) ||
        (source.kind === 'facsimile-artifact' && source.status !== 'facsimile-crosscheck-only') ||
        (source.kind === 'facsimile-artifact' && source.revision !== null) ||
        (source.kind === 'pinned-transcription' &&
          (!Number.isSafeInteger(source.revision) ||
            (source.revision ?? 0) <= 0 ||
            new URL(source.url).searchParams.get('oldid') !== String(source.revision))) ||
        (source.artifacts ?? []).some(
          (item) => !item.id.trim() || !isHttps(item.url) || !/^[a-f0-9]{64}$/.test(item.sha256),
        ) ||
        new Set(source.passages.map((passage) => passage.id)).size !== source.passages.length ||
        (source.status !== 'reviewed-partial-oracle' && source.passages.length > 0),
    )
  )
    throw new Error('Invalid reviewed source registry.');
}

function isHttps(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function assertReviewedReferenceSources(
  corpus: ReferenceCorpus,
  registry: SourceRegistry = SOURCE_REGISTRY,
): void {
  assertRegistryVersion(registry);
  const sources = new Map(registry.sources.map((source) => [source.id, source]));
  for (const document of corpus.sourceDocuments) {
    const reviewed = sources.get(document.id);
    if (
      !reviewed ||
      reviewed.kind !== 'pinned-transcription' ||
      reviewed.status !== 'reviewed-partial-oracle' ||
      document.url !== reviewed.url ||
      document.revision !== reviewed.revision
    )
      throw new Error(`Unreviewed or non-oracle source document: ${document.id}`);
  }

  const admittedPassages = new Map<string, ReviewedSourcePassage>();
  const documentIds = new Set(corpus.sourceDocuments.map((document) => document.id));
  for (const excerpt of corpus.excerpts) {
    const source = sources.get(excerpt.sourceId);
    const reviewed = source?.passages.find((passage) => passage.id === excerpt.id);
    if (
      !source ||
      source.status !== 'reviewed-partial-oracle' ||
      !documentIds.has(source.id) ||
      !reviewed ||
      reviewed.heading !== excerpt.heading ||
      reviewed.text !== excerpt.text
    )
      throw new Error(`Unreviewed or altered source passage: ${excerpt.id}`);
    admittedPassages.set(excerpt.id, reviewed);
  }

  for (const item of corpus.cases) {
    const expectedFields = [
      'mingBranch',
      'bodyBranch',
      ...Object.keys(item.expected.minorStars).map((name) => `minorStars.${name}`),
      ...Object.keys(item.expected.majorStars ?? {}).map((name) => `majorStars.${name}`),
      ...('cuc' in item.expected ? ['cuc'] : []),
    ];
    for (const field of expectedFields) {
      if (
        !item.provenance.excerptIds.some((id) =>
          admittedPassages.get(id)?.allowedExpectedFields.includes(field),
        )
      )
        throw new Error(`Expected field lacks reviewed passage scope: ${item.id}/${field}`);
    }
  }
}

export function summarizeSourceRegistry(registry: SourceRegistry = SOURCE_REGISTRY) {
  assertRegistryVersion(registry);
  const statuses: Record<SourceAdmissionStatus, number> = {
    'reviewed-partial-oracle': 0,
    'reading-reference-only': 0,
    'facsimile-crosscheck-only': 0,
  };
  for (const source of registry.sources) statuses[source.status] += 1;
  return {
    registryVersion: registry.registryVersion,
    reviewedOn: registry.reviewedOn,
    statuses,
    oracleDocumentCount: statuses['reviewed-partial-oracle'],
    oraclePassageCount: registry.sources
      .filter((source) => source.status === 'reviewed-partial-oracle')
      .reduce((count, source) => count + source.passages.length, 0),
    completeGoldenCharts: registry.completeGoldenCharts,
    independentEditionsVerified: registry.independentEditionsVerified,
    bibliographicIdentity: registry.bibliographicIdentity,
  };
}
