import type { Metadata } from 'next';
import { LandingExperience } from '@/components/landing-experience';
import { calculateChart } from '@/domain/astrology/calculate';
import { jsonLd, siteUrl } from '@/lib/seo/site';

export const metadata: Metadata = { alternates: { canonical: '/' } };
export default function HomePage() {
  const example = calculateChart({
    calendar: 'solar',
    date: { day: 17, month: 5, year: 1990 },
    hour: 9,
    minute: 30,
    gender: 'male',
    leapPolicy: 'split_at_15',
    ziPolicy: 'next_day_at_23',
  });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Huyền Vi',
            url: siteUrl('/'),
            applicationCategory: 'LifestyleApplication',
            operatingSystem: 'Web',
            inLanguage: 'vi',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'VND' },
          }),
        }}
      />
      <LandingExperience example={example} />
    </>
  );
}
