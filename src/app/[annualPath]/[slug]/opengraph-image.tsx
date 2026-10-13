import { notFound } from 'next/navigation';
import { getAnnualContent } from '@/data/annual-content';
import { OG_SIZE, renderOgCard } from '@/lib/seo/og-card';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Hồ sơ năm tuổi và ngũ hành nạp âm — Huyền Vi';
export default async function Image({
  params,
}: {
  params: Promise<{ annualPath: string; slug: string }>;
}) {
  const { annualPath, slug } = await params;
  const record = getAnnualContent(annualPath, slug);
  if (!record) notFound();
  return renderOgCard({
    title: `${record.birthName} ${record.birthYear}`,
    subtitle: `NĂM ${record.targetYear} · ${record.genderLabel.toLocaleUpperCase('vi')}`,
    details: `${record.element.name} · Hành ${record.element.element} · ${record.nominalAge} tuổi mụ`,
  });
}
