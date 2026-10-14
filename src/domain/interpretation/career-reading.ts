import type { ChartPalace, ChartStar } from '../astrology/types';
import { mod } from '../astrology/sexagenary';
import { INTERPRETATION_SOURCES } from './catalog';
import { KNOWLEDGE_PASSAGES, KNOWLEDGE_RULES, resolvePassage, STAR_PASSAGE_IDS } from './knowledge';
import type { CareerNarrative, ContextualInsight, ReadingEvidence } from './types';

/** Original noun phrases bounded by the reviewed principal-* symbolic passages. */
const PRINCIPAL_FOCUS: Readonly<Record<string, string>> = {
  'Tử Vi': 'điều phối và trách nhiệm',
  'Thiên Cơ': 'suy xét và thích nghi',
  'Thái Dương': 'đóng góp và trách nhiệm công khai',
  'Vũ Khúc': 'quản lý nguồn lực',
  'Thiên Đồng': 'hài hòa và nghỉ ngơi',
  'Liêm Trinh': 'quy tắc và ranh giới',
  'Thiên Phủ': 'gìn giữ và phân bổ nguồn lực',
  'Thái Âm': 'chăm chút nền tảng đời sống riêng',
  'Tham Lang': 'trải nghiệm và giao tiếp',
  'Cự Môn': 'diễn đạt và làm rõ thông tin',
  'Thiên Tướng': 'phối hợp và trách nhiệm',
  'Thiên Lương': 'bảo trợ và kinh nghiệm',
  'Thất Sát': 'tự chủ và cân nhắc trước hành động',
  'Phá Quân': 'thay đổi và quản lý hao phí',
};

/** BA-reviewed bridges connect a symbolic subject to an actual palace role. */
const APPROACH_BRIDGES: Readonly<Record<string, string>> = {
  'Tử Vi': 'Góc nhìn về điều phối mở thêm câu chuyện giữ nhịp chung và phân rõ trách nhiệm.',
  'Thiên Cơ':
    'Góc nhìn về suy xét và thích nghi mở thêm câu chuyện lựa chọn phương án khi điều kiện thay đổi.',
  'Thái Dương':
    'Góc nhìn về đóng góp đặt thêm câu hỏi về phần trách nhiệm được thể hiện qua kết quả chung.',
  'Vũ Khúc': 'Góc nhìn về quản lý nguồn lực nối cách làm với những gì cần sử dụng và gìn giữ.',
  'Thiên Đồng':
    'Góc nhìn về hài hòa đặt cách thực hiện bên cạnh nhu cầu giữ nhịp sinh hoạt và nghỉ ngơi.',
  'Liêm Trinh': 'Góc nhìn về quy tắc làm rõ thêm phạm vi và ranh giới của từng phần việc.',
  'Thiên Phủ': 'Góc nhìn về gìn giữ và phân bổ nối việc thực hiện với cách sắp xếp nguồn lực.',
  'Thái Âm':
    'Góc nhìn về nền tảng đời sống riêng đặt công việc cạnh những điều cần chăm chút ngoài công việc.',
  'Tham Lang':
    'Góc nhìn về trải nghiệm và giao tiếp mở thêm câu chuyện tiếp xúc và trao đổi với người khác.',
  'Cự Môn': 'Góc nhìn về diễn đạt đặt thêm câu hỏi về cách một ý được trình bày và hiểu rõ.',
  'Thiên Tướng': 'Góc nhìn về phối hợp nối phần việc của mỗi bên với trách nhiệm chung.',
  'Thiên Lương':
    'Góc nhìn về bảo trợ và kinh nghiệm mở thêm câu chuyện học từ điều đã trải qua và hỗ trợ nhau.',
  'Thất Sát':
    'Góc nhìn về tự chủ đặt việc lựa chọn hành động bên cạnh sự cân nhắc trước khi thực hiện.',
  'Phá Quân': 'Góc nhìn về thay đổi nối việc chọn cách làm mới với những phần nguồn lực cần bỏ ra.',
};

const BODY_CONTEXT: Readonly<Record<string, string>> = {
  'Phu Thê':
    'Góc nhìn về người bạn đời đặt công việc bên cạnh câu chuyện đồng hành và trách nhiệm trong đời sống chung.',
  'Tài Bạch':
    'Góc nhìn về tiền và nguồn lực đặt cách sử dụng những gì đang có bên cạnh trách nhiệm công việc.',
  'Thiên Di':
    'Góc nhìn về môi trường bên ngoài đặt cách thực hiện một việc bên cạnh những điều kiện quanh nó.',
  'Quan Lộc':
    'Góc nhìn của cung an Thân cùng nằm ở cung công việc, nên bối cảnh đọc tập trung vào chính phần việc và trách nhiệm đang xét.',
  'Phúc Đức':
    'Góc nhìn về nền tảng tinh thần và gia đình đặt câu chuyện công việc bên cạnh những điều cần giữ cho đời sống riêng.',
};

function rulePassages(id: string): string[] {
  return KNOWLEDGE_RULES.find((candidate) => candidate.id === id)?.passageIds ?? [];
}

function validPassage(id: string): boolean {
  const passage = KNOWLEDGE_PASSAGES.find((candidate) => candidate.id === id);
  return Boolean(
    passage &&
    passage.heading.trim() &&
    passage.excerpt.trim() &&
    passage.reading.trim() &&
    INTERPRETATION_SOURCES.some((source) => source.id === passage.sourceId),
  );
}

function existingPassageIds(ids: string[]): string[] {
  return [...new Set(ids)].filter(validPassage);
}

function admittedRule(id: string, status: 'editorial' | 'text-reviewed'): boolean {
  const rule = KNOWLEDGE_RULES.find((candidate) => candidate.id === id);
  return Boolean(
    rule && rule.status === status && rule.passageIds.length && rule.passageIds.every(validPassage),
  );
}

function directPrincipals(palace: ChartPalace): ChartStar[] {
  return palace.stars.filter((star) => star.group === 'major');
}

function reviewedPrincipals(palace: ChartPalace): ChartStar[] {
  return palace.stars.filter((star) => {
    if (star.group !== 'major' || !Object.hasOwn(PRINCIPAL_FOCUS, star.name)) return false;
    const passageId = STAR_PASSAGE_IDS[star.name];
    if (!passageId) return false;
    const id = `symbol-${passageId.replace('principal-', '')}`;
    return (
      admittedRule(id, 'text-reviewed') &&
      KNOWLEDGE_RULES.find((rule) => rule.id === id)!.passageIds.includes(passageId)
    );
  });
}

function focus(stars: ChartStar[]): string {
  const concepts = [...new Set(stars.flatMap((star) => PRINCIPAL_FOCUS[star.name].split(' và ')))];
  if (concepts.length < 2) return concepts.join('');
  return `${concepts.slice(0, -1).join(', ')} và ${concepts[concepts.length - 1]}`;
}

function proof(palace: ChartPalace, relation: ReadingEvidence['relation']): ReadingEvidence {
  return {
    palace: palace.name,
    branch: palace.branch,
    relation,
    stars: reviewedPrincipals(palace).map(({ name, brightness, transformation }) => ({
      name,
      brightness,
      transformation,
    })),
  };
}

export interface CareerReading {
  title: string;
  paragraphs: string[];
  narrative: CareerNarrative;
}

/** Symbolic comparison of distinct palace perspectives, never a personal forecast. */
export function readCareerNarrative(
  palaces: ChartPalace[],
  contextualGroups: ContextualInsight[],
): CareerReading {
  const career = palaces.find((palace) => palace.name === 'Quan Lộc')!;
  const menh = palaces.find((palace) => palace.name === 'Mệnh')!;
  const cooperation = palaces.find((palace) => palace.name === 'Nô Bộc')!;
  const body = palaces.find((palace) => palace.isBodyPalace)!;
  const scope = [career, menh, cooperation];
  const careerStars = reviewedPrincipals(career);
  const menhStars = reviewedPrincipals(menh);
  const cooperationStars = reviewedPrincipals(cooperation);
  const synthesisAllowed = admittedRule('career-cross-palace', 'editorial');
  const contextAllowed = admittedRule('palace-context', 'editorial');
  const enoughContexts = scope.filter((palace) => reviewedPrincipals(palace).length).length >= 2;
  const enoughSymbols =
    new Set(scope.flatMap(reviewedPrincipals).map((star) => star.name)).size >= 2;
  const careerSourcesAvailable = careerStars.length === directPrincipals(career).length;
  const ready =
    synthesisAllowed && contextAllowed && enoughContexts && enoughSymbols && careerSourcesAvailable;
  const state: CareerNarrative['state'] = !ready
    ? 'insufficient-context'
    : careerStars.length
      ? 'direct-career'
      : 'no-direct-career';
  const focusText = focus(careerStars);
  const sample =
    careerStars.length === 2 &&
    cooperationStars.length === 1 &&
    careerStars.some((star) => star.name === 'Thái Dương') &&
    careerStars.some((star) => star.name === 'Cự Môn') &&
    cooperationStars.some((star) => star.name === 'Thiên Tướng');
  const title = !ready
    ? 'Công việc: phạm vi đọc còn giới hạn'
    : !careerStars.length
      ? 'Công việc: đọc từ các góc nhìn bổ sung'
      : sample
        ? 'Công việc: trách nhiệm, cách trao đổi và sự phối hợp'
        : `Công việc: ${focusText}`;
  const paragraphs: string[] = [];

  if (!ready) {
    paragraphs.push(
      !synthesisAllowed || !contextAllowed || !careerSourcesAvailable
        ? 'Nguồn hoặc quy tắc cho mạch công việc chưa đủ điều kiện để kết nối các góc nhìn. Các chính tinh vẫn giữ nguyên trong lá số; phần đọc này chưa dùng chúng để đưa ra một luận điểm tổng hợp.'
        : 'Chưa đủ hai góc nhìn chính tinh từ các cung khác nhau để nối thành một mạch công việc. Bản đọc giữ lại dữ kiện trong phần căn cứ, không lấy một sao riêng lẻ để kết luận về khả năng hay hướng nghề nghiệp của bạn.',
    );
  } else if (!careerStars.length) {
    paragraphs.push(
      'Cung công việc không có chính tinh riêng, nên mạch đọc này bắt đầu từ các góc nhìn bổ sung. Cách tiếp cận một việc được đặt cạnh cách phối hợp với người khác, thay vì chọn thay một trọng tâm cho cung công việc.',
    );
  } else if (sample) {
    paragraphs.push(
      'Trục công việc của lá số đặt cạnh nhau hai chủ đề: đảm nhận trách nhiệm và làm rõ thông tin. Khi đọc cùng góc nhìn về sự phối hợp, điều đáng chú ý là mối liên hệ giữa phần việc cần hoàn thành, cách các bên hiểu nhau và trách nhiệm mỗi bên nhận.',
    );
  } else {
    paragraphs.push(
      `Trọng tâm của mạch công việc là ${focusText}. Từ đây, bản đọc đối chiếu cách thực hiện một việc với cách tiếp cận và sự phối hợp ở các cung liên hệ.`,
    );
  }

  if (ready) {
    const perspectives = menhStars.map((star) => APPROACH_BRIDGES[star.name]);
    if (cooperationStars.length && !sample) {
      perspectives.push(
        ...cooperationStars.map((star) =>
          star.name === 'Thiên Tướng'
            ? 'Sự phối hợp được đọc qua cách các bên cùng nhận và thực hiện trách nhiệm.'
            : star.name === 'Cự Môn'
              ? 'Góc nhìn về quan hệ cộng tác bổ sung cách các bên trao đổi và làm rõ thông tin.'
              : `Trong quan hệ cộng tác, ${APPROACH_BRIDGES[star.name].charAt(0).toLowerCase()}${APPROACH_BRIDGES[star.name].slice(1)}`,
        ),
      );
    }
    if (perspectives.length) paragraphs.push(perspectives.join(' '));
  }

  const bodyAllowed = ready && admittedRule('menh-than-context', 'editorial');
  const bodyText = bodyAllowed
    ? body.branchIndex === menh.branchIndex
      ? 'Mệnh và Thân cùng một vị trí, nên góc nhìn về cách tiếp cận một việc được đọc trong cùng bối cảnh.'
      : (BODY_CONTEXT[body.name] ??
        `Cung an Thân đặt thêm góc nhìn của ${body.name} cạnh câu chuyện công việc.`)
    : '';
  const activeGroups = ready
    ? contextualGroups.filter(
        (insight) =>
          (insight.ruleId === 'pair-support' || insight.ruleId === 'pair-literacy') &&
          admittedRule(insight.ruleId, 'editorial'),
      )
    : [];
  const support = activeGroups.some((insight) => insight.ruleId === 'pair-support');
  const literacy = activeGroups.some((insight) => insight.ruleId === 'pair-literacy');
  const modifierText =
    support && literacy
      ? 'Các nhóm bổ trợ đủ điều kiện làm rõ thêm hai mặt của mạch đọc: sự phối hợp và cách học hỏi, trình bày thông tin.'
      : support
        ? 'Nhóm bổ trợ đủ điều kiện làm rõ thêm mặt phối hợp và chia sẻ trách nhiệm trong mạch đọc.'
        : literacy
          ? 'Nhóm bổ trợ đủ điều kiện làm rõ thêm mặt học hỏi và trình bày thông tin trong mạch đọc.'
          : '';
  if (bodyText || modifierText) paragraphs.push([bodyText, modifierText].filter(Boolean).join(' '));
  if (paragraphs.length === 1) {
    paragraphs.push(
      ready
        ? 'Mạch đọc đặt các góc nhìn cạnh nhau để bạn đối chiếu với đời sống, chưa chọn thay bạn một nghề hay khẳng định một kết quả công việc.'
        : 'Bạn vẫn xem được vị trí cung và các nguồn biểu tượng bên dưới. Phần gợi ý thực hành là một lựa chọn riêng, không bù cho căn cứ luận giải còn thiếu.',
    );
  }

  const evidence: ReadingEvidence[] = scope.map((palace) => proof(palace, 'direct'));
  if (bodyAllowed && !scope.some((palace) => palace.branchIndex === body.branchIndex))
    evidence.push(proof(body, 'body'));
  evidence.push(
    ...activeGroups.flatMap((insight) =>
      insight.evidence.map((item) => ({
        ...item,
        stars: item.stars.filter(
          (star) =>
            !Object.hasOwn(PRINCIPAL_FOCUS, star.name) ||
            palaces.some(
              (palace) =>
                palace.name === item.palace &&
                palace.branch === item.branch &&
                reviewedPrincipals(palace).some((principal) => principal.name === star.name),
            ),
        ),
      })),
    ),
  );
  const passageIds = existingPassageIds([
    ...rulePassages('career-cross-palace'),
    ...rulePassages('palace-context'),
    ...evidence.flatMap((item) =>
      item.stars.map((star) => STAR_PASSAGE_IDS[star.name]).filter(Boolean),
    ),
    ...activeGroups.flatMap((insight) => insight.passageIds),
    ...(bodyAllowed ? rulePassages('menh-than-context') : []),
  ]);
  const relation = mod(career.branchIndex - menh.branchIndex, 12);
  const geometry =
    relation === 4 || relation === 8
      ? 'Mệnh và Quan Lộc có quan hệ tam hợp (cùng nhóm địa chi) theo vị trí thật.'
      : 'Mệnh và Quan Lộc được giữ theo vị trí thật, không tự gán quan hệ tam hợp.';
  const provenance = scope
    .map((palace) => {
      const stars = reviewedPrincipals(palace);
      const unavailable = directPrincipals(palace).filter(
        (star) => !stars.some((reviewed) => reviewed.name === star.name),
      );
      return `${palace.name} tại ${palace.branch}: ${stars.length ? stars.map((star) => `${star.name} → ${resolvePassage(STAR_PASSAGE_IDS[star.name]).reading.replace(/[.!?。]+$/u, '')}`).join('; ') : directPrincipals(palace).length ? 'chính tinh đang có chưa được dùng vì quy tắc hoặc nguồn chưa đủ điều kiện' : 'không có chính tinh riêng; không mượn sao cung khác thành tọa thủ'}${unavailable.length ? `; ${unavailable.map((star) => star.name).join(', ')} vẫn ở cung này nhưng không tham gia mạch luận` : ''}.`;
    })
    .join(' ');
  return {
    title,
    paragraphs,
    narrative: {
      state,
      why: `${provenance} ${geometry} Nô Bộc được chọn làm góc nhìn phối hợp theo chủ đề biên tập, không mặc nhiên là tam hợp của Quan Lộc. ${ready ? 'Có ít nhất hai cung khác nhau với chính tinh đã có nguồn biểu tượng.' : 'Chưa đạt điều kiện kết nối các góc nhìn có nguồn.'} Kết nối giữa các ý nghĩa là diễn giải do dự án biên soạn; nguồn cổ không chứa nguyên văn đoạn tổng hợp hiện đại này.${bodyAllowed ? ` Mệnh tại ${menh.branch}; Thân tại ${body.branch}, cung ${body.name}: ${body.branchIndex === menh.branchIndex ? 'cùng vị trí, không đếm hai lần' : 'hai vị trí riêng, không gộp sao'}.` : ''}${activeGroups.length ? ` Các góc bổ sung: ${activeGroups.map((insight) => insight.why).join(' ')}` : ''}`,
      evidence,
      passageIds,
      limitations: [
        'Chỉ so sánh các ý nghĩa biểu tượng có nguồn, không xác nhận tính cách, khả năng hoặc kết quả nghề nghiệp.',
        ...scope
          .filter((palace) => !reviewedPrincipals(palace).length)
          .map(
            (palace) =>
              `${palace.name} không có chính tinh được dùng trực tiếp; không suy ra yếu kém hoặc chuyển sao từ cung liên hệ.`,
          ),
        'Miếu/vượng, Tứ Hóa, cách cục và vận hạn không tham gia mạch luận này.',
      ],
      practice: {
        prompt:
          'Trong một việc bạn đang cùng người khác thực hiện, điều gì đã rõ và điều gì còn cần trao đổi?',
        action:
          'Chọn một điểm cần thống nhất để hai bên dễ phối hợp hơn. Bạn tự chọn tình huống phù hợp; đây là gợi ý thực hành, không phải kết luận rằng bạn đang gặp bất đồng.',
      },
    },
  };
}
