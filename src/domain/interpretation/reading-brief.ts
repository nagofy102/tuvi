import type { ChartResult, ChartStar } from '../astrology/types';
import { INTERPRETATION_SOURCES } from './catalog';
import { INTERPRETATION_VERSION } from './calculate';
import { KNOWLEDGE_PROFILE, resolvePassage, resolveRule } from './knowledge';
import {
  APPROVED_A1_SEMANTIC_KEY,
  resolveApprovedClaimTemplate,
  type ApprovedClaimTemplate,
  type CareerSignalPredicate,
} from './reading-claim-registry';
import {
  validateReadingBrief,
  type BriefClaim,
  type BriefEvidence,
  type ReadingBriefResolvers,
  type ReadingBriefV1,
  type ReadingReason,
  type ReadingTopic,
} from './reading-brief-schema';
import type { InterpretationResult, InterpretationReport, ReadingEvidence } from './types';

const SOURCE_COMMIT = '17ac24329b7b8657353450e97a8c51134ed9aaa3';
const REQUIRED_RULE_IDS = [
  'symbol-3',
  'symbol-10',
  'symbol-11',
  'career-cross-palace',
  'palace-context',
] as const;

export interface ReadingSignal {
  id: string;
  scopePalace: string;
  palace: string;
  branch: string;
  relation: ReadingEvidence['relation'];
  stars: Array<Pick<ChartStar, 'name' | 'brightness' | 'transformation'>>;
  kind: 'principal-context';
  principalPresence: 'present' | 'absent';
  sourceAdmission: 'admitted' | 'not-applicable';
  geometry: { scopeBranchIndex: number; branchIndex: number };
}

export interface ReadingSignalSet {
  calculationProfile: string;
  calendarRuleVersion: string;
  engineVersion: string;
  verificationStatus: 'structure-validated';
  chartValidation: 'passed' | 'failed';
  signals: ReadingSignal[];
}

export interface BuildReadingBriefInput {
  chart: ChartResult;
  interpretation: InterpretationResult;
  readingId: string;
  topic?: ReadingTopic;
}

function signalId(palace: string): string {
  return `career:${palace === 'Mệnh' ? 'menh' : palace === 'Quan Lộc' ? 'quan-loc' : 'no-boc'}:direct`;
}

function sameStars(
  left: Array<Pick<ChartStar, 'name' | 'brightness' | 'transformation'>>,
  right: Array<Pick<ChartStar, 'name' | 'brightness' | 'transformation'>>,
): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function reportEvidenceMatchesChart(report: InterpretationReport, chart: ChartResult): boolean {
  const career = report.themes.find((theme) => theme.concern === 'career')?.careerNarrative;
  if (!career) return false;
  return ['Mệnh', 'Quan Lộc', 'Nô Bộc'].every((palaceName) => {
    const palace = chart.palaces.find((candidate) => candidate.name === palaceName);
    const evidence = career.evidence.find(
      (candidate) => candidate.palace === palaceName && candidate.relation === 'direct',
    );
    if (!palace || !evidence || evidence.branch !== palace.branch) return false;
    return sameStars(
      evidence.stars,
      palace.stars
        .filter((star) => star.group === 'major')
        .map(({ name, brightness, transformation }) => ({ name, brightness, transformation })),
    );
  });
}

export function adaptReadingSignalSet(
  chart: ChartResult,
  report: InterpretationReport,
): ReadingSignalSet {
  const metadataMatches =
    report.version === INTERPRETATION_VERSION &&
    report.profile === chart.provenance.profile &&
    report.knowledgeProfile === KNOWLEDGE_PROFILE.id &&
    report.reviewStatus === 'reference-unvalidated';
  const signals = ['Mệnh', 'Quan Lộc', 'Nô Bộc'].flatMap((palaceName) => {
    const palace = chart.palaces.find((candidate) => candidate.name === palaceName);
    if (!palace) return [];
    const stars = palace.stars
      .filter((star) => star.group === 'major')
      .map(({ name, brightness, transformation }) => ({ name, brightness, transformation }));
    return [
      {
        id: signalId(palaceName),
        scopePalace: palaceName,
        palace: palaceName,
        branch: palace.branch,
        relation: 'direct' as const,
        stars,
        kind: 'principal-context' as const,
        principalPresence: stars.length ? ('present' as const) : ('absent' as const),
        sourceAdmission: stars.length ? ('admitted' as const) : ('not-applicable' as const),
        geometry: { scopeBranchIndex: palace.branchIndex, branchIndex: palace.branchIndex },
      },
    ];
  });
  return {
    calculationProfile: chart.provenance.profile,
    calendarRuleVersion: chart.provenance.calendar,
    engineVersion: chart.provenance.engine,
    verificationStatus: 'structure-validated',
    chartValidation:
      metadataMatches && signals.length === 3 && reportEvidenceMatchesChart(report, chart)
        ? 'passed'
        : 'failed',
    signals,
  };
}

function templatePredicatesMatch(
  template: ApprovedClaimTemplate,
  signals: ReadingSignalSet,
  report: InterpretationReport,
): boolean {
  if (signals.chartValidation !== 'passed') return false;
  const career = report.themes.find((theme) => theme.concern === 'career')?.careerNarrative;
  const matches = (predicate: CareerSignalPredicate): boolean => {
    if (predicate.kind === 'career-synthesis-gate') {
      return predicate.value === true && career?.state === 'direct-career';
    }
    const signal = signals.signals.find((candidate) => candidate.palace === predicate.palace);
    if (!signal) return false;
    if (predicate.kind === 'no-direct-principal') return signal.principalPresence === 'absent';
    return (
      signal.principalPresence === 'present' &&
      signal.sourceAdmission === 'admitted' &&
      signal.stars.some((star) => star.name === predicate.star)
    );
  };
  if (!template.requiredSignalPredicates.every(matches)) return false;

  // A1 was approved for one exact symbolic structure. Additional principals need a new review.
  const expected = new Map<string, string[]>([
    ['Mệnh', []],
    ['Quan Lộc', ['Cự Môn', 'Thái Dương']],
    ['Nô Bộc', ['Thiên Tướng']],
  ]);
  return [...expected].every(([palace, names]) => {
    const actual = signals.signals
      .find((signal) => signal.palace === palace)!
      .stars.map((star) => star.name)
      .sort((a, b) => a.localeCompare(b, 'vi'));
    return (
      JSON.stringify(actual) === JSON.stringify([...names].sort((a, b) => a.localeCompare(b, 'vi')))
    );
  });
}

function sourceRevision(): ReadingBriefV1['sourceRevision'] {
  const ids = ['classical-stars-vol1', 'classical-context-vol1', 'classical-layout-vol2'];
  return {
    repositoryCommit: SOURCE_COMMIT,
    catalogPath: 'src/domain/interpretation/catalog.ts',
    passagesPath: 'src/domain/interpretation/knowledge.ts',
    sources: ids.map((sourceId) => {
      const source = INTERPRETATION_SOURCES.find((candidate) => candidate.id === sourceId)!;
      return {
        sourceId,
        revision: sourceId === 'classical-layout-vol2' ? '1963110' : '7913704',
        url: source.url!,
      };
    }),
  };
}

function evidenceForRule(ruleId: string, signalIds: string[]): BriefEvidence {
  const rule = resolveRule(ruleId);
  const sourceIds = [...new Set(rule.passageIds.map((id) => resolvePassage(id).sourceId))];
  return {
    id: `career:a1:evidence:${ruleId}`,
    signalIds,
    rule: {
      id: ruleId,
      version: `git:${SOURCE_COMMIT}:src/domain/interpretation/knowledge.ts#${ruleId}`,
      status: rule.status as 'text-reviewed' | 'editorial',
    },
    passageIds: [...rule.passageIds],
    sourceIds,
    origin: 'chart-backed',
    explanation: ruleId.startsWith('symbol-')
      ? 'Tiền đề biểu tượng được nối với đúng chính tinh và cung gốc trong lá số.'
      : 'Quy tắc biên tập nối các cung theo chủ đề, không thay đổi vị trí sao.',
    limitations: [rule.limits],
  };
}

function baseBrief(
  input: BuildReadingBriefInput,
  status: ReadingBriefV1['status'],
  reasons: ReadingReason[],
  message: string | null,
): ReadingBriefV1 {
  return {
    schemaVersion: 'reading-brief-v1',
    readingId: input.readingId,
    topic: input.topic ?? 'career',
    status,
    dataOrigin: 'user-chart',
    verificationStatus: 'structure-validated',
    calculationProfile: input.chart.provenance.profile,
    calendarRuleVersion: input.chart.provenance.calendar,
    engineVersion: input.chart.provenance.engine,
    ruleSetVersion: `${KNOWLEDGE_PROFILE.id}@${SOURCE_COMMIT}`,
    sourceRevision: sourceRevision(),
    conclusion: null,
    insights: [],
    topicReading: null,
    evidence: [],
    exclusions: [],
    validation: {
      reasons,
      message,
      schema: 'passed',
      grounding: 'not-run',
      contradictionReview: 'not-evaluated-domain-gap',
      independentVerificationRef: null,
    },
  };
}

function validatedFallback(brief: ReadingBriefV1): ReadingBriefV1 {
  const result = validateReadingBrief(brief);
  if (result.ok) return result.value;
  throw new Error(`ReadingBrief fallback violated the shared schema: ${result.issues.join('; ')}`);
}

function unavailable(input: BuildReadingBriefInput, reason: ReadingReason, message: string) {
  return validatedFallback(baseBrief(input, 'unavailable', [reason], message));
}

function insufficient(input: BuildReadingBriefInput, reason: ReadingReason, message: string) {
  return validatedFallback(baseBrief(input, 'insufficient-evidence', [reason], message));
}

export function createCareerReadingResolvers(
  signalSet: ReadingSignalSet,
  report: InterpretationReport,
): ReadingBriefResolvers {
  const signalIds = new Set(signalSet.signals.map((signal) => signal.id));
  return {
    template: (claim, brief) => {
      const template = resolveApprovedClaimTemplate(claim, brief);
      if (!template) return null;
      return {
        approved: template.approval.status === 'user-approved',
        exactText:
          claim.plainText === template.approvedText && template.allowedVariables.length === 0,
        predicatesMatch: templatePredicatesMatch(template, signalSet, report),
        deduplicationKey: template.deduplicationKey,
        requiredRuleIds: [...template.requiredRuleIds],
      };
    },
    evidence: (item) => {
      const rule = resolveRule(item.rule.id);
      return (
        REQUIRED_RULE_IDS.includes(item.rule.id as (typeof REQUIRED_RULE_IDS)[number]) &&
        item.rule.version ===
          `git:${SOURCE_COMMIT}:src/domain/interpretation/knowledge.ts#${item.rule.id}` &&
        item.rule.status === rule.status &&
        JSON.stringify(item.passageIds) === JSON.stringify(rule.passageIds) &&
        item.sourceIds.every((sourceId) =>
          item.passageIds.some((passageId) => resolvePassage(passageId).sourceId === sourceId),
        )
      );
    },
    signal: (id) => signalIds.has(id),
  };
}

/** Builds a source-bounded local Brief. It never repairs or invents unsupported claims. */
export function buildCareerReadingBrief(input: BuildReadingBriefInput): ReadingBriefV1 {
  if ((input.topic ?? 'career') !== 'career') {
    return unavailable(
      input,
      'topic-not-admitted',
      'Chủ đề này chưa có bộ quy tắc luận giải đã duyệt.',
    );
  }
  if (input.interpretation.status === 'unavailable') {
    return unavailable(input, input.interpretation.reason, input.interpretation.message);
  }
  const report = input.interpretation;
  const signalSet = adaptReadingSignalSet(input.chart, report);
  if (signalSet.chartValidation !== 'passed') {
    return unavailable(
      input,
      'invalid-chart',
      'Dữ kiện lá số và bản đọc nền không khớp nên chưa thể tạo luận giải.',
    );
  }

  const conclusionTemplate = resolveApprovedClaimTemplate(
    {
      claimId: 'career-style-a-summary',
      templateId: 'career-a1-conclusion',
      templateVersion: 'draft-1',
      plainText:
        'Trong lá số của bạn, công việc nổi bật ở mối liên hệ giữa trách nhiệm công khai, cách làm rõ thông tin và sự phối hợp giữa các bên.',
      evidenceIds: [],
      scope: 'editorial-symbolic',
    },
    baseBrief(input, 'insufficient-evidence', ['insufficient-context'], 'pending'),
  );
  const insightTemplate = resolveApprovedClaimTemplate(
    {
      claimId: 'career-style-a-integrated',
      templateId: 'career-a1-insight',
      templateVersion: 'draft-1',
      plainText:
        'Với bạn, nét riêng của chủ đề công việc nằm ở chỗ trách nhiệm gắn với cách diễn đạt cho rõ; sự phối hợp là lớp nghĩa đi cùng, không thay thế trọng tâm ấy.',
      evidenceIds: [],
      scope: 'editorial-symbolic',
    },
    baseBrief(input, 'insufficient-evidence', ['insufficient-context'], 'pending'),
  );
  if (
    !conclusionTemplate ||
    !insightTemplate ||
    !templatePredicatesMatch(conclusionTemplate, signalSet, report) ||
    !templatePredicatesMatch(insightTemplate, signalSet, report)
  ) {
    return insufficient(
      input,
      'insufficient-context',
      'Chưa đủ căn cứ đã duyệt để tạo luận giải Công việc cho cấu trúc lá số này.',
    );
  }

  const byPalace = new Map(signalSet.signals.map((signal) => [signal.palace, signal.id]));
  const evidence = [
    evidenceForRule('symbol-3', [byPalace.get('Quan Lộc')!]),
    evidenceForRule('symbol-10', [byPalace.get('Quan Lộc')!]),
    evidenceForRule('symbol-11', [byPalace.get('Nô Bộc')!]),
    evidenceForRule('career-cross-palace', [...byPalace.values()]),
    evidenceForRule('palace-context', [...byPalace.values()]),
  ];
  const evidenceIds = evidence.map((item) => item.id);
  const conclusion: BriefClaim = {
    claimId: 'career-style-a-summary',
    templateId: conclusionTemplate.templateId,
    templateVersion: conclusionTemplate.templateVersion,
    plainText: conclusionTemplate.approvedText,
    evidenceIds,
    scope: 'editorial-symbolic',
  };
  const paragraph: BriefClaim = {
    claimId: 'career-style-a-integrated',
    templateId: insightTemplate.templateId,
    templateVersion: insightTemplate.templateVersion,
    plainText: insightTemplate.approvedText,
    evidenceIds,
    scope: 'editorial-symbolic',
  };
  const brief: ReadingBriefV1 = {
    ...baseBrief(input, 'ready', [], null),
    conclusion,
    insights: [
      {
        ...paragraph,
        id: 'career-a1-insight',
        title: 'Trách nhiệm và lời nói rõ nghĩa',
        deduplicationKey: APPROVED_A1_SEMANTIC_KEY,
        priority: 'primary',
        rankingReasons: ['topic-match', 'approved-primary-rule'],
        exclusionIds: [],
      },
    ],
    topicReading: { topic: 'career', state: 'supported', paragraphs: [paragraph] },
    evidence,
    validation: {
      reasons: [],
      message: null,
      schema: 'passed',
      grounding: 'passed',
      contradictionReview: 'not-evaluated-domain-gap',
      independentVerificationRef: null,
    },
  };
  const result = validateReadingBrief(brief, createCareerReadingResolvers(signalSet, report));
  if (!result.ok) {
    return insufficient(
      input,
      'insufficient-context',
      'Căn cứ luận giải chưa vượt qua kiểm tra liên kết nên phần này chưa được hiển thị.',
    );
  }
  return result.value;
}
