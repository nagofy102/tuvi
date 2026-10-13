import type { MetadataRoute } from 'next';
import { ANNUAL_YEARS, annualPath } from '@/data/annual-content';
import { siteUrl } from '@/lib/seo/site';
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '/',
    '/lich-am-duong',
    '/phuong-phap',
    '/quyen-rieng-tu',
    ...ANNUAL_YEARS.map((year) => `/tu-vi-nam-${year}`),
  ];
  return [
    ...pages.map((path) => ({ url: siteUrl(path) })),
    ...ANNUAL_YEARS.flatMap((targetYear) =>
      Array.from({ length: targetYear - 1899 }, (_, i) => 1900 + i).flatMap((birthYear) =>
        (['male', 'female'] as const).map((gender) => ({
          url: siteUrl(annualPath(targetYear, birthYear, gender)),
        })),
      ),
    ),
  ];
}
