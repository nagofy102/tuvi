import { napAm, yearName } from '@/domain/astrology/sexagenary';

export const ANNUAL_YEARS = [2026, 2027] as const;
export const FEATURED_BIRTH_YEARS = [1960, 1975, 1986, 1990, 1995, 2000] as const;
export type TraditionalGender = 'male' | 'female';

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
export function annualSlug(birthYear: number, gender: TraditionalGender): string {
  return `tuoi-${slugify(yearName(birthYear))}-${birthYear}-${gender === 'male' ? 'nam' : 'nu'}-mang`;
}
export function annualPath(year: number, birthYear: number, gender: TraditionalGender): string {
  return `/tu-vi-nam-${year}/${annualSlug(birthYear, gender)}`;
}
export function parseAnnualYear(path: string): number | null {
  const match = /^tu-vi-nam-(\d{4})$/.exec(path);
  if (!match) return null;
  const year = Number(match[1]);
  return ANNUAL_YEARS.some((y) => y === year) ? year : null;
}
export function getAnnualContent(annualPathValue: string, slug: string) {
  const targetYear = parseAnnualYear(annualPathValue);
  const match = /^tuoi-[a-z-]+-(\d{4})-(nam|nu)-mang$/.exec(slug);
  if (!targetYear || !match) return null;
  const birthYear = Number(match[1]);
  const gender: TraditionalGender = match[2] === 'nam' ? 'male' : 'female';
  if (
    birthYear < 1900 ||
    birthYear > Math.min(targetYear, 2099) ||
    slug !== annualSlug(birthYear, gender)
  )
    return null;
  const birthName = yearName(birthYear);
  const element = napAm(birthYear);
  const genderLabel = gender === 'male' ? 'Nam mạng' : 'Nữ mạng';
  return {
    targetYear,
    birthYear,
    gender,
    genderLabel,
    birthName,
    element,
    targetName: yearName(targetYear),
    targetElement: napAm(targetYear),
    nominalAge: targetYear - birthYear + 1,
    title: `${birthName} ${birthYear} · ${genderLabel}`,
    description: `Tra cứu tuổi ${birthName} ${birthYear} ${genderLabel.toLowerCase()} trong năm ${targetYear}: nạp âm ${element.name}, tuổi mụ và hướng dẫn lập lá số riêng.`,
    path: annualPath(targetYear, birthYear, gender),
    faq: [
      {
        question: `Tuổi ${birthName} ${birthYear} có nạp âm gì?`,
        answer: `Năm âm lịch ${birthName} có nạp âm ${element.name}, thuộc hành ${element.element}. Người sinh trước Tết ${birthYear} cần kiểm tra lại năm âm lịch; không chỉ dùng năm dương lịch.`,
      },
      {
        question: `${genderLabel} ${birthYear} bao nhiêu tuổi mụ trong năm ${targetYear}?`,
        answer: `Nếu sinh trong năm âm lịch ${birthName}, tuổi mụ trong năm âm lịch ${yearName(targetYear)} là ${targetYear - birthYear + 1}, theo công thức năm xét − năm sinh + 1.`,
      },
      {
        question: 'Có thể luận lá số chỉ từ năm sinh và giới tính không?',
        answer:
          'Không. Cần ngày, tháng, năm, giờ sinh và quy ước an sao. Trang này là hồ sơ năm tuổi tham khảo, không phải dự báo cá nhân hay lá số đầy đủ.',
      },
    ],
  };
}
