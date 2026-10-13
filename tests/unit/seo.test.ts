import { describe, expect, it } from 'vitest';
import { annualSlug, getAnnualContent, parseAnnualYear } from '@/data/annual-content';
import { jsonLd } from '@/lib/seo/site';

describe('public annual content', () => {
  it('resolves the requested canonical example and supplies factual content', () => {
    expect(annualSlug(1986, 'male')).toBe('tuoi-binh-dan-1986-nam-mang');
    const record = getAnnualContent('tu-vi-nam-2026', 'tuoi-binh-dan-1986-nam-mang');
    expect(record?.nominalAge).toBe(41);
    expect(record?.element.name).toBe('Lư Trung Hỏa');
    expect(record?.faq).toHaveLength(3);
  });
  it('provides both gender routes across all supported birth years', () => {
    for (const year of [2026, 2027])
      for (let birth = 1900; birth <= year; birth++)
        for (const gender of ['male', 'female'] as const) {
          expect(getAnnualContent(`tu-vi-nam-${year}`, annualSlug(birth, gender))).not.toBeNull();
        }
  });
  it.each([
    'tuoi-binh-dan-1987-nam-mang',
    'tuoi-unknown-1986-nam-mang',
    'tuoi-binh-dan-1986-other-mang',
    'tuoi-binh-dan-1800-nam-mang',
    '../../etc/passwd',
  ])('rejects invalid slug %s', (slug) => {
    expect(getAnnualContent('tu-vi-nam-2026', slug)).toBeNull();
  });
  it('rejects unsupported annual paths and escapes script delimiters in JSON-LD', () => {
    expect(parseAnnualYear('tu-vi-nam-3000')).toBeNull();
    expect(parseAnnualYear('2026')).toBeNull();
    expect(jsonLd({ text: '</script><script>bad</script>' })).not.toContain('<');
    expect(JSON.parse(jsonLd({ text: '</script>' })).text).toBe('</script>');
  });
});
