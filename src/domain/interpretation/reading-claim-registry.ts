import type { BriefClaim, ReadingBriefV1 } from './reading-brief-schema';

export const APPROVED_A1_SEMANTIC_KEY =
  'career:responsibility-clarity-cooperation:quan3-10:no11:menh-empty';

export interface CareerSignalPredicate {
  kind: 'direct-principal' | 'no-direct-principal' | 'career-synthesis-gate';
  palace?: 'Mệnh' | 'Quan Lộc' | 'Nô Bộc';
  star?: string;
  value?: true;
}

export interface ApprovedClaimTemplate {
  templateId: string;
  templateVersion: string;
  topic: 'career';
  claimKind: 'symbolic-synthesis';
  requiredRuleIds: readonly string[];
  requiredSignalPredicates: readonly CareerSignalPredicate[];
  evidenceResolution: 'all-required-rules-and-passages-plus-matched-signals';
  allowedVariables: readonly [];
  approvedText: string;
  deduplicationKey: string;
  approval: {
    status: 'user-approved';
    reviewerRole: 'Product Owner';
    reviewDate: '2026-10-14';
    approvedSample: 'design/reading-brief-samples.md#Mẫu 1 — A1: một luận điểm tích hợp (đề xuất duyệt văn)';
    evidenceScope: 'editorial-symbolic';
  };
  sourceRevision: {
    repositoryCommit: string;
    passageIds: readonly string[];
    sourceIds: readonly string[];
  };
  limitations: readonly string[];
}

const requiredRuleIds = [
  'symbol-3',
  'symbol-10',
  'symbol-11',
  'career-cross-palace',
  'palace-context',
] as const;

const requiredSignalPredicates = [
  { kind: 'direct-principal', palace: 'Quan Lộc', star: 'Thái Dương' },
  { kind: 'direct-principal', palace: 'Quan Lộc', star: 'Cự Môn' },
  { kind: 'direct-principal', palace: 'Nô Bộc', star: 'Thiên Tướng' },
  { kind: 'no-direct-principal', palace: 'Mệnh' },
  { kind: 'career-synthesis-gate', value: true },
] as const satisfies readonly CareerSignalPredicate[];

const sourceRevision = {
  repositoryCommit: '17ac24329b7b8657353450e97a8c51134ed9aaa3',
  passageIds: [
    'principal-3',
    'principal-10',
    'principal-11',
    'layout-palaces',
    'context-not-uniform',
  ],
  sourceIds: ['classical-stars-vol1', 'classical-context-vol1', 'classical-layout-vol2'],
} as const;

const limitations = [
  'Chỉ diễn giải cấu trúc biểu tượng, không khẳng định năng lực, nghề nghiệp hoặc kết quả thực tế.',
  'Không xét miếu/vượng, Tứ Hóa, cách cục, tín hiệu đối nghịch hoặc vận hạn.',
] as const;

export const APPROVED_CAREER_CLAIM_TEMPLATES = [
  {
    templateId: 'career-a1-conclusion',
    templateVersion: 'draft-1',
    topic: 'career',
    claimKind: 'symbolic-synthesis',
    requiredRuleIds,
    requiredSignalPredicates,
    evidenceResolution: 'all-required-rules-and-passages-plus-matched-signals',
    allowedVariables: [],
    approvedText:
      'Trong lá số của bạn, công việc nổi bật ở mối liên hệ giữa trách nhiệm công khai, cách làm rõ thông tin và sự phối hợp giữa các bên.',
    deduplicationKey: APPROVED_A1_SEMANTIC_KEY,
    approval: {
      status: 'user-approved',
      reviewerRole: 'Product Owner',
      reviewDate: '2026-10-14',
      approvedSample:
        'design/reading-brief-samples.md#Mẫu 1 — A1: một luận điểm tích hợp (đề xuất duyệt văn)',
      evidenceScope: 'editorial-symbolic',
    },
    sourceRevision,
    limitations,
  },
  {
    templateId: 'career-a1-insight',
    templateVersion: 'draft-1',
    topic: 'career',
    claimKind: 'symbolic-synthesis',
    requiredRuleIds,
    requiredSignalPredicates,
    evidenceResolution: 'all-required-rules-and-passages-plus-matched-signals',
    allowedVariables: [],
    approvedText:
      'Với bạn, nét riêng của chủ đề công việc nằm ở chỗ trách nhiệm gắn với cách diễn đạt cho rõ; sự phối hợp là lớp nghĩa đi cùng, không thay thế trọng tâm ấy.',
    deduplicationKey: APPROVED_A1_SEMANTIC_KEY,
    approval: {
      status: 'user-approved',
      reviewerRole: 'Product Owner',
      reviewDate: '2026-10-14',
      approvedSample:
        'design/reading-brief-samples.md#Mẫu 1 — A1: một luận điểm tích hợp (đề xuất duyệt văn)',
      evidenceScope: 'editorial-symbolic',
    },
    sourceRevision,
    limitations,
  },
] as const satisfies readonly ApprovedClaimTemplate[];

export function resolveApprovedClaimTemplate(
  claim: BriefClaim,
  brief: ReadingBriefV1,
): ApprovedClaimTemplate | null {
  if (brief.topic !== 'career' || brief.dataOrigin !== 'user-chart') return null;
  return (
    APPROVED_CAREER_CLAIM_TEMPLATES.find(
      (template) =>
        template.templateId === claim.templateId &&
        template.templateVersion === claim.templateVersion &&
        template.approvedText === claim.plainText &&
        template.sourceRevision.repositoryCommit === brief.sourceRevision.repositoryCommit,
    ) ?? null
  );
}
