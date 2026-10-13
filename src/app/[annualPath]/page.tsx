import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import {
  ANNUAL_YEARS,
  FEATURED_BIRTH_YEARS,
  annualPath,
  parseAnnualYear,
} from '@/data/annual-content';
import { napAm, yearName } from '@/domain/astrology/sexagenary';

export function generateStaticParams() {
  return ANNUAL_YEARS.map((year) => ({ annualPath: `tu-vi-nam-${year}` }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ annualPath: string }>;
}): Promise<Metadata> {
  const { annualPath: path } = await params;
  const year = parseAnnualYear(path);
  if (!year) notFound();
  return {
    title: `Tử vi năm ${year} — Tra cứu năm tuổi`,
    description: `Tra cứu năm tuổi và nạp âm trong năm ${yearName(year)} ${year}. Lập lá số riêng theo đầy đủ ngày và giờ sinh.`,
    alternates: { canonical: `/${path}` },
  };
}
export default async function AnnualIndex({ params }: { params: Promise<{ annualPath: string }> }) {
  const { annualPath: path } = await params;
  const year = parseAnnualYear(path);
  if (!year) notFound();
  return (
    <section className="page-width annual-index">
      <span className="eyebrow">
        NĂM {yearName(year).toLocaleUpperCase('vi')} · {year}
      </span>
      <h1>
        Một năm mới.
        <br />
        <em>Một góc nhìn mới.</em>
      </h1>
      <p className="page-intro">
        Tra cứu năm tuổi, ngũ hành nạp âm và những câu hỏi giúp bạn nhìn lại hành trình. Năm{' '}
        {yearName(year)} thuộc nạp âm {napAm(year).name}.
      </p>
      <div className="annual-year-links">
        {ANNUAL_YEARS.map((y) => (
          <Link key={y} href={`/tu-vi-nam-${y}`} aria-current={year === y ? 'page' : undefined}>
            {y}
          </Link>
        ))}
      </div>
      <h2>Khám phá theo năm sinh</h2>
      <div className="annual-grid">
        {FEATURED_BIRTH_YEARS.map((birthYear) => (
          <article key={birthYear}>
            <span>{napAm(birthYear).name}</span>
            <h3>
              {yearName(birthYear)} <em>{birthYear}</em>
            </h3>
            <div>
              <Link href={annualPath(year, birthYear, 'male')}>
                Nam mạng <ArrowUpRight size={16} />
              </Link>
              <Link href={annualPath(year, birthYear, 'female')}>
                Nữ mạng <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="year-lookup">
        <h2>Năm sinh của bạn</h2>
        <p>Chọn một năm âm lịch từ 1900 đến {year} để mở hồ sơ tuổi tương ứng.</p>
        <div className="all-year-links">
          {Array.from({ length: year - 1899 }, (_, i) => year - i).map((birthYear) => (
            <details key={birthYear}>
              <summary>
                {birthYear} · {yearName(birthYear)}
              </summary>
              <Link href={annualPath(year, birthYear, 'male')}>Nam mạng</Link>
              <Link href={annualPath(year, birthYear, 'female')}>Nữ mạng</Link>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
