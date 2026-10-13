import type { ChartPalace } from '../astrology/types';
import { AUXILIARY_GROUPS, canonicalStarName, fourPalaces, readContextualGroups } from './context';
import { resolveRule } from './knowledge';
import type { ContextualInsight, ReadingClaim, ReadingCondition, ReadingEvidence } from './types';

/** Preserve each origin-relative scope; identical rule IDs do not imply identical evidence. */
export function mergeContextualInsights(insights: ContextualInsight[]): ContextualInsight[] {
  const grouped = new Map<string, ContextualInsight>();
  for (const insight of insights) {
    const prior = grouped.get(insight.ruleId);
    if (!prior) {
      grouped.set(insight.ruleId, structuredClone(insight));
      continue;
    }
    prior.passageIds = [...new Set([...prior.passageIds, ...insight.passageIds])];
    const reasons = prior.why.split('\n');
    if (!reasons.includes(insight.why)) prior.why += `\n${insight.why}`;
    for (const item of insight.evidence) {
      const match = prior.evidence.find(
        (candidate) =>
          candidate.palace === item.palace &&
          candidate.branch === item.branch &&
          candidate.relation === item.relation &&
          candidate.scopePalace === item.scopePalace,
      );
      if (!match) prior.evidence.push(structuredClone(item));
      else
        for (const star of item.stars) {
          if (
            !match.stars.some(
              (candidate) =>
                candidate.name === star.name &&
                candidate.brightness === star.brightness &&
                candidate.transformation === star.transformation,
            )
          ) {
            match.stars.push({ ...star });
          }
        }
    }
  }
  return [...grouped.values()];
}

const APPLICATIONS = {
  'pair-support': {
    selfCheck:
      'Chọn một việc chung vừa làm: ai nhận từng phần, kết quả cần đạt và hạn hoàn thành đã được xác nhận chưa?',
    adjustment:
      'Nếu trách nhiệm chưa rõ, ghi người phụ trách, kết quả cần đạt và mốc báo vướng mắc; để người nhận việc xác nhận trước khi bắt đầu.',
  },
  'pair-literacy': {
    selfCheck:
      'Chọn một quyết định gần đây: dữ kiện nào đã được ghi lại, kiểm tra từ nguồn đầu tiên và xác nhận với người liên quan?',
    adjustment:
      'Nếu trao đổi chưa thống nhất, chốt ba dòng: việc cần làm, dữ kiện đã xác nhận và điều còn phải hỏi; xác nhận lại trước khi quyết định.',
  },
  'ziwei-support-context': {
    selfCheck:
      'Ở một việc bạn đang điều phối, phần nào cần bạn quyết định và phần nào đã giao nhưng bạn vẫn làm thay?',
    adjustment:
      'Nếu bạn đang tự làm hết, giao lại một phần có tiêu chí hoàn tất rõ và đặt mốc kiểm tra giữa chặng.',
  },
} as const;

type ActiveClaimRule = keyof typeof APPLICATIONS;

function evaluateScope(origin: ChartPalace, palaces: ChartPalace[], ruleId: ActiveClaimRule) {
  const scope = fourPalaces(origin, palaces);
  const names = ruleId === 'pair-literacy' ? ['Văn Xương', 'Văn Khúc'] : ['Tả Phụ', 'Hữu Bật'];
  const conditions: ReadingCondition[] = names.map((name) => ({
    id: `member-${name}`,
    label: `Đúng một ${name} trong bốn cung liên hệ của ${origin.name}`,
    scopePalace: origin.name,
    met:
      scope
        .flatMap((palace) => palace.stars)
        .filter((star) => star.group !== 'major' && canonicalStarName(star.name) === name)
        .length === 1,
  }));
  conditions.unshift({
    id: 'rule-active',
    label: 'Quy tắc và nhóm phụ trợ đã được mở trong hồ sơ biên tập',
    scopePalace: origin.name,
    met:
      resolveRule(ruleId).status === 'editorial' &&
      (ruleId !== 'ziwei-support-context' || resolveRule('pair-support').status === 'editorial'),
  });
  conditions.push({
    id: 'principal-context',
    label: `Có chính tinh trong bốn cung liên hệ của ${origin.name}`,
    scopePalace: origin.name,
    met: scope.some((palace) => palace.stars.some((star) => star.group === 'major')),
  });
  if (ruleId === 'ziwei-support-context')
    conditions.push({
      id: 'ziwei-direct',
      label: `Tử Vi tọa thủ tại ${origin.name}`,
      scopePalace: origin.name,
      met: origin.stars.some((star) => star.name === 'Tử Vi' && star.group === 'major'),
    });
  const evidence: ReadingEvidence[] = scope.map((palace, index) => ({
    scopePalace: origin.name,
    palace: palace.name,
    branch: palace.branch,
    relation: index === 0 ? 'direct' : index === 3 ? 'opposition' : 'trine',
    stars: palace.stars
      .filter((star) => star.group === 'major' || names.includes(canonicalStarName(star.name)))
      .map(({ name, brightness, transformation }) => ({ name, brightness, transformation })),
  }));
  return { origin, conditions, evidence, matched: conditions.every((condition) => condition.met) };
}

/** Apply only the existing editorial gates. Missing support is never an adverse signal. */
export function buildReadingClaims(
  palaces: ChartPalace[],
  originNames: readonly string[],
): ReadingClaim[] {
  return (Object.keys(APPLICATIONS) as ActiveClaimRule[]).map((ruleId) => {
    const rule = resolveRule(ruleId);
    const scopes = originNames.map((name) =>
      evaluateScope(
        palaces.find((palace) => palace.name === name)!,
        palaces,
        ruleId,
      ),
    );
    const matches = scopes.filter((scope) => scope.matched);
    const selected = matches.length ? matches : scopes;
    const insights = mergeContextualInsights(
      matches.flatMap(({ origin }) =>
        readContextualGroups(origin, palaces).filter((insight) => insight.ruleId === ruleId),
      ),
    );
    const title =
      ruleId === 'ziwei-support-context'
        ? 'Vai trò điều phối đặt cạnh nguồn hỗ trợ'
        : AUXILIARY_GROUPS.find((group) => group.ruleId === ruleId)!.title;
    return {
      id: `claim-${ruleId}`,
      ruleId,
      title,
      state: matches.length ? 'supported' : 'insufficient',
      text: matches.length
        ? insights[0].text
        : 'Chưa đủ điều kiện để mở góc tự đối chiếu này; không suy ra một điểm yếu từ yếu tố chưa có.',
      why: matches.length
        ? insights[0].why
        : 'Không có cung xuất phát trong chủ đề đáp ứng đồng thời mọi điều kiện của quy tắc. Các vị trí dưới đây là dữ kiện để kiểm tra, không phải kết luận bất lợi.',
      passageIds: [
        ...new Set([...rule.passageIds, ...insights.flatMap((insight) => insight.passageIds)]),
      ],
      evidence: selected.flatMap((scope) => scope.evidence),
      conditions: selected.flatMap((scope) => scope.conditions),
      missingPrerequisites: matches.length
        ? []
        : selected.flatMap((scope) =>
            scope.conditions
              .filter((condition) => !condition.met)
              .map((condition) => condition.label),
          ),
      limitations: [
        rule.limits,
        'Điều kiện và bài tập là biên tập có nguồn biểu tượng; không chứng nhận tính cách, kết quả đời sống hoặc dự báo.',
      ],
      selfCheck: matches.length ? APPLICATIONS[ruleId].selfCheck : '',
      adjustment: matches.length ? APPLICATIONS[ruleId].adjustment : '',
    };
  });
}
