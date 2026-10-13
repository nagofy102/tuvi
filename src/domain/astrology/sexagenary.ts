export const STEMS = [
  'Giáp',
  'Ất',
  'Bính',
  'Đinh',
  'Mậu',
  'Kỷ',
  'Canh',
  'Tân',
  'Nhâm',
  'Quý',
] as const;
export const BRANCHES = [
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
] as const;
export const mod = (value: number, base: number) => ((value % base) + base) % base;
export function yearName(year: number): string {
  return `${STEMS[mod(year - 4, 10)]} ${BRANCHES[mod(year - 4, 12)]}`;
}

const NAP_AM = [
  ['Hải Trung Kim', 'Kim'],
  ['Lư Trung Hỏa', 'Hỏa'],
  ['Đại Lâm Mộc', 'Mộc'],
  ['Lộ Bàng Thổ', 'Thổ'],
  ['Kiếm Phong Kim', 'Kim'],
  ['Sơn Đầu Hỏa', 'Hỏa'],
  ['Giản Hạ Thủy', 'Thủy'],
  ['Thành Đầu Thổ', 'Thổ'],
  ['Bạch Lạp Kim', 'Kim'],
  ['Dương Liễu Mộc', 'Mộc'],
  ['Tuyền Trung Thủy', 'Thủy'],
  ['Ốc Thượng Thổ', 'Thổ'],
  ['Tích Lịch Hỏa', 'Hỏa'],
  ['Tùng Bách Mộc', 'Mộc'],
  ['Trường Lưu Thủy', 'Thủy'],
  ['Sa Trung Kim', 'Kim'],
  ['Sơn Hạ Hỏa', 'Hỏa'],
  ['Bình Địa Mộc', 'Mộc'],
  ['Bích Thượng Thổ', 'Thổ'],
  ['Kim Bạch Kim', 'Kim'],
  ['Phú Đăng Hỏa', 'Hỏa'],
  ['Thiên Hà Thủy', 'Thủy'],
  ['Đại Trạch Thổ', 'Thổ'],
  ['Thoa Xuyến Kim', 'Kim'],
  ['Tang Đố Mộc', 'Mộc'],
  ['Đại Khê Thủy', 'Thủy'],
  ['Sa Trung Thổ', 'Thổ'],
  ['Thiên Thượng Hỏa', 'Hỏa'],
  ['Thạch Lựu Mộc', 'Mộc'],
  ['Đại Hải Thủy', 'Thủy'],
] as const;
export function napAm(year: number) {
  const [name, element] = NAP_AM[Math.floor(mod(year - 1984, 60) / 2)];
  return { name, element };
}

export function timeIndex(hour: number, minute: number): number {
  if (
    !Number.isInteger(hour) ||
    hour < 0 ||
    hour > 23 ||
    !Number.isInteger(minute) ||
    minute < 0 ||
    minute > 59
  ) {
    throw new Error('Giờ sinh phải nằm trong khoảng 00:00 đến 23:59.');
  }
  return Math.floor((hour + 1) / 2);
}

// Earthly branches run around the perimeter; row/column are 1-based CSS grid coordinates.
export const PALACE_GRID: Readonly<Record<number, { row: number; column: number }>> = {
  5: { row: 1, column: 1 },
  6: { row: 1, column: 2 },
  7: { row: 1, column: 3 },
  8: { row: 1, column: 4 },
  4: { row: 2, column: 1 },
  9: { row: 2, column: 4 },
  3: { row: 3, column: 1 },
  10: { row: 3, column: 4 },
  2: { row: 4, column: 1 },
  1: { row: 4, column: 2 },
  0: { row: 4, column: 3 },
  11: { row: 4, column: 4 },
};
