/** Reading Brief v1 transport boundary. This does not change InterpretationReport. */
export type ReadingTopic = 'overview' | 'career' | 'finance' | 'relationship';
export type ReadingStatus = 'ready' | 'insufficient-evidence' | 'unavailable';
export type ReadingOrigin = 'user-chart' | 'demonstration' | 'structural-mock';
export type ReadingVerification =
  'structure-validated' | 'independently-verified' | 'unverified' | 'not-applicable';
export type ReadingReason =
  | 'unsupported-profile'
  | 'invalid-chart'
  | 'incomplete-catalog'
  | 'unknown-birth-time'
  | 'topic-not-admitted'
  | 'missing-source'
  | 'unreviewed-rule'
  | 'insufficient-context'
  | 'unresolved-conflict'
  | 'mock-only';

export interface BriefClaim {
  claimId: string;
  templateId: string;
  templateVersion: string;
  plainText: string;
  evidenceIds: string[];
  scope: 'editorial-symbolic';
}

export interface BriefInsight extends BriefClaim {
  id: string;
  title: string;
  deduplicationKey: string;
  priority: 'primary' | 'secondary' | 'supporting';
  rankingReasons: Array<'topic-match' | 'approved-primary-rule' | 'distinct-evidence'>;
  exclusionIds: string[];
  nextStep?: string;
}

export interface BriefEvidence {
  id: string;
  signalIds: string[];
  rule: { id: string; version: string; status: 'text-reviewed' | 'editorial' };
  passageIds: string[];
  sourceIds: string[];
  origin: 'chart-backed' | 'structural-mock';
  explanation: string;
  limitations: string[];
}

export interface ReadingBriefV1 {
  schemaVersion: 'reading-brief-v1';
  readingId: string;
  topic: ReadingTopic;
  status: ReadingStatus;
  dataOrigin: ReadingOrigin;
  verificationStatus: ReadingVerification;
  calculationProfile: string | null;
  calendarRuleVersion: string | null;
  engineVersion: string | null;
  ruleSetVersion: string;
  sourceRevision: {
    repositoryCommit: string;
    catalogPath: 'src/domain/interpretation/catalog.ts';
    passagesPath: 'src/domain/interpretation/knowledge.ts';
    sources: Array<{ sourceId: string; revision: string; url: string }>;
  };
  conclusion: BriefClaim | null;
  insights: BriefInsight[];
  topicReading: {
    topic: 'career' | 'finance' | 'relationship';
    state: 'supported';
    paragraphs: BriefClaim[];
    nextStep?: string;
  } | null;
  evidence: BriefEvidence[];
  exclusions: Array<{ id: string; reason: ReadingReason; relatedRuleId?: string }>;
  validation: {
    reasons: ReadingReason[];
    message: string | null;
    schema: 'not-run' | 'passed';
    grounding: 'not-run' | 'passed' | 'demonstration-only';
    contradictionReview: 'not-evaluated-domain-gap';
    independentVerificationRef: string | null;
  };
}

/** R04B supplies immutable, source-bound resolution. This schema cannot infer rule admission. */
export interface ReadingBriefResolvers {
  template: (
    claim: BriefClaim,
    brief: ReadingBriefV1,
  ) => {
    approved: boolean;
    exactText: boolean;
    predicatesMatch: boolean;
    deduplicationKey: string;
    requiredRuleIds: string[];
  } | null;
  evidence: (evidence: BriefEvidence, brief: ReadingBriefV1) => boolean;
  signal: (signalId: string, brief: ReadingBriefV1) => boolean;
  independentReview?: (reference: string, brief: ReadingBriefV1) => boolean;
}

export type BriefValidation = { ok: true; value: ReadingBriefV1 } | { ok: false; issues: string[] };

const topics = ['overview', 'career', 'finance', 'relationship'] as const;
const statuses = ['ready', 'insufficient-evidence', 'unavailable'] as const;
const origins = ['user-chart', 'demonstration', 'structural-mock'] as const;
const verifications = [
  'structure-validated',
  'independently-verified',
  'unverified',
  'not-applicable',
] as const;
const reasons = [
  'unsupported-profile',
  'invalid-chart',
  'incomplete-catalog',
  'unknown-birth-time',
  'topic-not-admitted',
  'missing-source',
  'unreviewed-rule',
  'insufficient-context',
  'unresolved-conflict',
  'mock-only',
] as const;
const rankings = ['topic-match', 'approved-primary-rule', 'distinct-evidence'] as const;

type Shape = Record<string, unknown>;

function record(value: unknown, path: string, issues: string[]): Shape | null {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    issues.push(`${path}: expected object`);
    return null;
  }
  return value as Shape;
}

function keys(
  value: Shape,
  required: string[],
  optional: string[],
  path: string,
  issues: string[],
) {
  for (const key of required) if (!(key in value)) issues.push(`${path}.${key}: required`);
  for (const key of Object.keys(value)) {
    if (!required.includes(key) && !optional.includes(key))
      issues.push(`${path}.${key}: unknown field`);
  }
}

function str(value: unknown, path: string, issues: string[]): value is string {
  if (typeof value === 'string' && value.trim().length > 0) return true;
  issues.push(`${path}: expected nonempty string`);
  return false;
}

function nullableStr(value: unknown, path: string, issues: string[]) {
  if (value !== null) str(value, path, issues);
}

function choice(value: unknown, allowed: readonly string[], path: string, issues: string[]) {
  if (typeof value !== 'string' || !allowed.includes(value)) issues.push(`${path}: invalid value`);
}

function array(
  value: unknown,
  path: string,
  issues: string[],
  item: (v: unknown, p: string) => void,
) {
  if (!Array.isArray(value)) {
    issues.push(`${path}: expected array`);
    return;
  }
  value.forEach((v, i) => item(v, `${path}[${i}]`));
}

function stringArray(value: unknown, path: string, issues: string[], allowed?: readonly string[]) {
  array(value, path, issues, (v, p) =>
    allowed ? choice(v, allowed, p, issues) : str(v, p, issues),
  );
  if (Array.isArray(value) && new Set(value).size !== value.length)
    issues.push(`${path}: duplicate item`);
}

function claim(value: unknown, path: string, issues: string[], insight = false) {
  const v = record(value, path, issues);
  if (!v) return;
  const base = ['claimId', 'templateId', 'templateVersion', 'plainText', 'evidenceIds', 'scope'];
  const extra = ['id', 'title', 'deduplicationKey', 'priority', 'rankingReasons', 'exclusionIds'];
  keys(v, insight ? [...base, ...extra] : base, insight ? ['nextStep'] : [], path, issues);
  for (const key of ['claimId', 'templateId', 'templateVersion', 'plainText'])
    str(v[key], `${path}.${key}`, issues);
  stringArray(v.evidenceIds, `${path}.evidenceIds`, issues);
  if (Array.isArray(v.evidenceIds) && v.evidenceIds.length === 0)
    issues.push(`${path}.evidenceIds: required`);
  choice(v.scope, ['editorial-symbolic'], `${path}.scope`, issues);
  if (!insight) return;
  for (const key of ['id', 'title', 'deduplicationKey']) str(v[key], `${path}.${key}`, issues);
  choice(v.priority, ['primary', 'secondary', 'supporting'], `${path}.priority`, issues);
  stringArray(v.rankingReasons, `${path}.rankingReasons`, issues, rankings);
  if (Array.isArray(v.rankingReasons) && v.rankingReasons.length === 0)
    issues.push(`${path}.rankingReasons: required`);
  stringArray(v.exclusionIds, `${path}.exclusionIds`, issues);
  if ('nextStep' in v) str(v.nextStep, `${path}.nextStep`, issues);
}

function evidence(value: unknown, path: string, issues: string[]) {
  const v = record(value, path, issues);
  if (!v) return;
  keys(
    v,
    ['id', 'signalIds', 'rule', 'passageIds', 'sourceIds', 'origin', 'explanation', 'limitations'],
    [],
    path,
    issues,
  );
  str(v.id, `${path}.id`, issues);
  stringArray(v.signalIds, `${path}.signalIds`, issues);
  const rule = record(v.rule, `${path}.rule`, issues);
  if (rule) {
    keys(rule, ['id', 'version', 'status'], [], `${path}.rule`, issues);
    str(rule.id, `${path}.rule.id`, issues);
    str(rule.version, `${path}.rule.version`, issues);
    choice(rule.status, ['text-reviewed', 'editorial'], `${path}.rule.status`, issues);
  }
  stringArray(v.passageIds, `${path}.passageIds`, issues);
  stringArray(v.sourceIds, `${path}.sourceIds`, issues);
  if (Array.isArray(v.passageIds) && !v.passageIds.length)
    issues.push(`${path}.passageIds: required`);
  if (Array.isArray(v.sourceIds) && !v.sourceIds.length) issues.push(`${path}.sourceIds: required`);
  choice(v.origin, ['chart-backed', 'structural-mock'], `${path}.origin`, issues);
  str(v.explanation, `${path}.explanation`, issues);
  stringArray(v.limitations, `${path}.limitations`, issues);
}

/** Strictly validates the transport and, with resolvers, its runtime grounding. */
export function validateReadingBrief(
  input: unknown,
  resolvers?: ReadingBriefResolvers,
): BriefValidation {
  const issues: string[] = [];
  const v = record(input, 'brief', issues);
  if (!v) return { ok: false, issues };
  keys(
    v,
    [
      'schemaVersion',
      'readingId',
      'topic',
      'status',
      'dataOrigin',
      'verificationStatus',
      'calculationProfile',
      'calendarRuleVersion',
      'engineVersion',
      'ruleSetVersion',
      'sourceRevision',
      'conclusion',
      'insights',
      'topicReading',
      'evidence',
      'exclusions',
      'validation',
    ],
    [],
    'brief',
    issues,
  );
  choice(v.schemaVersion, ['reading-brief-v1'], 'schemaVersion', issues);
  str(v.readingId, 'readingId', issues);
  choice(v.topic, topics, 'topic', issues);
  choice(v.status, statuses, 'status', issues);
  choice(v.dataOrigin, origins, 'dataOrigin', issues);
  choice(v.verificationStatus, verifications, 'verificationStatus', issues);
  for (const key of ['calculationProfile', 'calendarRuleVersion', 'engineVersion'])
    nullableStr(v[key], key, issues);
  str(v.ruleSetVersion, 'ruleSetVersion', issues);

  const rev = record(v.sourceRevision, 'sourceRevision', issues);
  if (rev) {
    keys(
      rev,
      ['repositoryCommit', 'catalogPath', 'passagesPath', 'sources'],
      [],
      'sourceRevision',
      issues,
    );
    str(rev.repositoryCommit, 'sourceRevision.repositoryCommit', issues);
    choice(
      rev.catalogPath,
      ['src/domain/interpretation/catalog.ts'],
      'sourceRevision.catalogPath',
      issues,
    );
    choice(
      rev.passagesPath,
      ['src/domain/interpretation/knowledge.ts'],
      'sourceRevision.passagesPath',
      issues,
    );
    array(rev.sources, 'sourceRevision.sources', issues, (source, path) => {
      const s = record(source, path, issues);
      if (!s) return;
      keys(s, ['sourceId', 'revision', 'url'], [], path, issues);
      for (const key of ['sourceId', 'revision', 'url']) str(s[key], `${path}.${key}`, issues);
    });
    if (Array.isArray(rev.sources)) {
      if (!rev.sources.length) issues.push('sourceRevision.sources: required');
      const ids = rev.sources.map((s: unknown) => record(s, 'source', [])?.sourceId);
      if (new Set(ids).size !== ids.length)
        issues.push('sourceRevision.sources: duplicate sourceId');
    }
  }

  if (v.conclusion !== null) claim(v.conclusion, 'conclusion', issues);
  array(v.insights, 'insights', issues, (item, path) => claim(item, path, issues, true));
  if (v.topicReading !== null) {
    const t = record(v.topicReading, 'topicReading', issues);
    if (t) {
      keys(t, ['topic', 'state', 'paragraphs'], ['nextStep'], 'topicReading', issues);
      choice(t.topic, ['career', 'finance', 'relationship'], 'topicReading.topic', issues);
      choice(t.state, ['supported'], 'topicReading.state', issues);
      array(t.paragraphs, 'topicReading.paragraphs', issues, (item, path) =>
        claim(item, path, issues),
      );
      if (Array.isArray(t.paragraphs) && !t.paragraphs.length)
        issues.push('topicReading.paragraphs: required');
      if ('nextStep' in t) str(t.nextStep, 'topicReading.nextStep', issues);
    }
  }
  array(v.evidence, 'evidence', issues, (item, path) => evidence(item, path, issues));
  array(v.exclusions, 'exclusions', issues, (item, path) => {
    const e = record(item, path, issues);
    if (!e) return;
    keys(e, ['id', 'reason'], ['relatedRuleId'], path, issues);
    str(e.id, `${path}.id`, issues);
    choice(e.reason, reasons, `${path}.reason`, issues);
    if ('relatedRuleId' in e) str(e.relatedRuleId, `${path}.relatedRuleId`, issues);
  });
  const val = record(v.validation, 'validation', issues);
  if (val) {
    keys(
      val,
      [
        'reasons',
        'message',
        'schema',
        'grounding',
        'contradictionReview',
        'independentVerificationRef',
      ],
      [],
      'validation',
      issues,
    );
    stringArray(val.reasons, 'validation.reasons', issues, reasons);
    nullableStr(val.message, 'validation.message', issues);
    choice(val.schema, ['not-run', 'passed'], 'validation.schema', issues);
    choice(
      val.grounding,
      ['not-run', 'passed', 'demonstration-only'],
      'validation.grounding',
      issues,
    );
    choice(
      val.contradictionReview,
      ['not-evaluated-domain-gap'],
      'validation.contradictionReview',
      issues,
    );
    nullableStr(val.independentVerificationRef, 'validation.independentVerificationRef', issues);
  }

  if (issues.length) return { ok: false, issues };
  const brief = input as ReadingBriefV1;
  const { status, dataOrigin, verificationStatus, validation } = brief;
  if (brief.topic !== 'career' && status === 'ready') issues.push('topic: only career is admitted');
  if (dataOrigin === 'structural-mock') {
    if (
      verificationStatus !== 'not-applicable' ||
      validation.grounding !== 'demonstration-only' ||
      [brief.calculationProfile, brief.calendarRuleVersion, brief.engineVersion].some(
        (x) => x !== null,
      )
    ) {
      issues.push('structural-mock: invalid verification or calculation metadata');
    }
  } else if (dataOrigin === 'demonstration') {
    if (verificationStatus !== 'unverified' || validation.grounding !== 'demonstration-only') {
      issues.push('demonstration: invalid verification or grounding');
    }
  } else {
    if (
      !['structure-validated', 'independently-verified', 'unverified'].includes(verificationStatus)
    ) {
      issues.push('user-chart: invalid verification');
    }
    if (validation.reasons.includes('mock-only')) issues.push('user-chart: mock-only reason');
    if (validation.grounding === 'demonstration-only')
      issues.push('user-chart: demonstration grounding');
  }
  if (verificationStatus === 'independently-verified') {
    if (
      !validation.independentVerificationRef ||
      !resolvers?.independentReview?.(validation.independentVerificationRef, brief)
    ) {
      issues.push('independent verification: unresolved review artifact');
    }
  } else if (validation.independentVerificationRef !== null) {
    issues.push('independentVerificationRef: unexpected');
  }
  if (dataOrigin !== 'user-chart') {
    if (!validation.reasons.includes('mock-only') || !validation.message)
      issues.push('demo/mock: visible label required');
  }
  if (status === 'ready') {
    if (
      !brief.conclusion ||
      brief.insights.length < 1 ||
      brief.insights.length > 3 ||
      !brief.topicReading ||
      brief.topicReading.paragraphs.length < 1 ||
      brief.evidence.length === 0
    ) {
      issues.push('ready: conclusion, 1–3 insights, paragraphs and evidence required');
    }
    if (brief.topicReading?.topic !== brief.topic) issues.push('topicReading.topic: mismatch');
    if (dataOrigin === 'user-chart') {
      if (
        verificationStatus === 'unverified' ||
        validation.reasons.length ||
        validation.message !== null ||
        validation.schema !== 'passed' ||
        validation.grounding !== 'passed'
      )
        issues.push('ready user-chart: validation not passed');
      if (
        [brief.calculationProfile, brief.calendarRuleVersion, brief.engineVersion].some(
          (x) => x === null,
        )
      ) {
        issues.push('ready user-chart: calculation versions required');
      }
      if (!resolvers) issues.push('ready user-chart: grounding resolvers required');
    }
  } else {
    if (brief.conclusion !== null || brief.insights.length || brief.topicReading !== null)
      issues.push('non-ready: claims forbidden');
    if (!validation.reasons.length || !validation.message)
      issues.push('non-ready: reason and message required');
    if (status === 'unavailable' && brief.evidence.length)
      issues.push('unavailable: evidence forbidden');
  }
  if (brief.insights.length > 3) issues.push('insights: maximum three');
  if (
    status === 'ready' &&
    dataOrigin !== 'user-chart' &&
    validation.grounding !== 'demonstration-only'
  ) {
    issues.push('demo/mock ready: demonstration-only grounding required');
  }

  const evidenceById = new Map<string, BriefEvidence>();
  for (const item of brief.evidence) {
    if (evidenceById.has(item.id)) issues.push(`evidence.${item.id}: duplicate ID`);
    evidenceById.set(item.id, item);
    if (dataOrigin === 'user-chart' && (item.origin !== 'chart-backed' || !item.signalIds.length)) {
      issues.push(`evidence.${item.id}: chart-backed signals required`);
    }
    if (dataOrigin === 'structural-mock' && item.origin !== 'structural-mock') {
      issues.push(`evidence.${item.id}: structural mock only`);
    }
    const sourceIds = new Set(brief.sourceRevision.sources.map((source) => source.sourceId));
    for (const id of item.sourceIds)
      if (!sourceIds.has(id)) issues.push(`evidence.${item.id}: unresolved source ${id}`);
    if (dataOrigin === 'user-chart' && status === 'ready') {
      if (!resolvers?.evidence(item, brief))
        issues.push(`evidence.${item.id}: rule/passage not admitted`);
      for (const id of item.signalIds)
        if (!resolvers?.signal(id, brief))
          issues.push(`evidence.${item.id}: unresolved signal ${id}`);
    }
  }
  const exclusionIds = new Set<string>();
  for (const exclusion of brief.exclusions) {
    if (exclusionIds.has(exclusion.id)) issues.push(`exclusion.${exclusion.id}: duplicate ID`);
    exclusionIds.add(exclusion.id);
  }
  const claims = [
    brief.conclusion,
    ...brief.insights,
    ...(brief.topicReading?.paragraphs ?? []),
  ].filter((item): item is BriefClaim => item !== null);
  const seen = new Map<string, BriefClaim>();
  for (const item of claims) {
    for (const id of item.evidenceIds)
      if (!evidenceById.has(id)) issues.push(`claim.${item.claimId}: unresolved evidence ${id}`);
    const previous = seen.get(item.claimId);
    if (
      previous &&
      (previous.plainText !== item.plainText ||
        previous.templateId !== item.templateId ||
        previous.templateVersion !== item.templateVersion ||
        previous.scope !== item.scope ||
        JSON.stringify(previous.evidenceIds) !== JSON.stringify(item.evidenceIds))
    ) {
      issues.push(`claim.${item.claimId}: inconsistent reuse`);
    }
    seen.set(item.claimId, item);
    if (dataOrigin === 'user-chart' && status === 'ready') {
      const template = resolvers?.template(item, brief);
      if (!template?.approved || !template.exactText || !template.predicatesMatch) {
        issues.push(`claim.${item.claimId}: template not approved or mismatched`);
      } else {
        const rules = new Set(item.evidenceIds.map((id) => evidenceById.get(id)?.rule.id));
        for (const ruleId of template.requiredRuleIds)
          if (!rules.has(ruleId)) {
            issues.push(`claim.${item.claimId}: missing rule ${ruleId}`);
          }
      }
    }
  }
  const semantic = new Set<string>();
  const insightIds = new Set<string>();
  for (const insight of brief.insights) {
    if (insightIds.has(insight.id)) issues.push(`insight.${insight.id}: duplicate ID`);
    insightIds.add(insight.id);
    if (semantic.has(insight.deduplicationKey))
      issues.push(`insight.${insight.id}: duplicate semantic key`);
    semantic.add(insight.deduplicationKey);
    for (const id of insight.exclusionIds)
      if (!exclusionIds.has(id)) issues.push(`insight.${insight.id}: unresolved exclusion ${id}`);
    if (dataOrigin === 'user-chart' && status === 'ready') {
      const template = resolvers?.template(insight, brief);
      if (template && template.deduplicationKey !== insight.deduplicationKey) {
        issues.push(`insight.${insight.id}: template semantic key mismatch`);
      }
    }
  }
  return issues.length ? { ok: false, issues } : { ok: true, value: brief };
}
