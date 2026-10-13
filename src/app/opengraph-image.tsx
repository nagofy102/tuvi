import { OG_SIZE, renderOgCard } from '@/lib/seo/og-card';
export const alt = 'Huyền Vi — Hiểu vận mệnh, sống an nhiên';
export const size = OG_SIZE;
export const contentType = 'image/png';
export default function Image() {
  return renderOgCard({
    title: 'Hiểu vận mệnh. Sống an nhiên.',
    subtitle: 'TINH HOA TỬ VI VIỆT',
    details: 'Lá số 12 cung · Lịch âm dương · Góc nhìn an nhiên',
  });
}
