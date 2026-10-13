import { describe, expect, it } from 'vitest';
import {
  decodeProfiles,
  encodeProfiles,
  validateProfileInput,
  type LocalProfile,
} from '@/domain/profiles/local';
const input = {
  calendar: 'solar' as const,
  date: { year: 1990, month: 5, day: 17 },
  gender: 'male' as const,
  time: '09:30',
  leapPolicy: 'split_at_15' as const,
  ziPolicy: 'next_day_at_23' as const,
};
const profile: LocalProfile = { id: 'test-profile', name: 'Hồ sơ giả lập', input };
describe('consented local input profiles', () => {
  it('does not serialize without explicit consent', () =>
    expect(() => encodeProfiles([profile], false)).toThrow('đồng ý'));
  it('round trips birth input only, not charts or narratives', () => {
    const encoded = encodeProfiles([profile], true);
    expect(decodeProfiles(encoded)).toEqual([profile]);
    expect(encoded).not.toMatch(/palaces|paragraphs|interpretation/);
  });
  it('preserves unknown time without a guessed hour', () => {
    const value = { ...profile, input: { ...input, time: null } };
    expect(decodeProfiles(encodeProfiles([value], true))[0].input.time).toBeNull();
  });
  it.each(['09:99', '24:00', '9:30', undefined])('rejects invalid or absent time %s', (time) =>
    expect(() => validateProfileInput({ ...input, time })).toThrow(),
  );
  it('rejects future births and impossible dates', () => {
    expect(() =>
      validateProfileInput(
        { ...input, date: { year: 2050, month: 5, day: 17 } },
        { year: 2026, month: 10, day: 13 },
      ),
    ).toThrow('tương lai');
    expect(() =>
      validateProfileInput({ ...input, date: { year: 1990, month: 2, day: 30 } }),
    ).toThrow('không tồn tại');
  });
  it.each(['null', '{}', '{"version":1,"profiles":[]}', '{"version":2,"profiles":[]}', 'not-json'])(
    'rejects malformed/unsupported storage %s',
    (raw) => expect(() => decodeProfiles(raw)).toThrow(),
  );
  it('rejects oversized storage, too many profiles, duplicate IDs and unsafe fields', () => {
    expect(() => decodeProfiles(' '.repeat(100001))).toThrow();
    expect(() =>
      encodeProfiles(
        Array.from({ length: 11 }, (_, i) => ({ ...profile, id: `id-${i}` })),
        true,
      ),
    ).toThrow();
    expect(() => encodeProfiles([profile, profile], true)).toThrow();
    expect(() =>
      decodeProfiles(encodeProfiles([profile], true).replace('"name":"Hồ sơ giả lập"', '"name":5')),
    ).toThrow();
  });
  it('keeps leap flags and late Ty policy independently of local storage', () => {
    const value = {
      ...profile,
      input: {
        ...input,
        calendar: 'lunar' as const,
        date: { year: 2023, month: 2, day: 1, isLeapMonth: true },
        ziPolicy: 'next_day_at_23' as const,
      },
    };
    expect(decodeProfiles(encodeProfiles([value], true))).toEqual([value]);
  });
  it('rejects old selectable rules and mismatched stored provenance', () => {
    expect(() => validateProfileInput({ ...input, ziPolicy: 'civil_midnight' })).toThrow();
    expect(() => validateProfileInput({ ...input, leapPolicy: 'same_month' })).toThrow();
    const encoded: unknown = JSON.parse(encodeProfiles([profile], true));
    expect(encoded).toMatchObject({ version: 2, calculationProfile: 'nam-phai-chinese-lunar-v1' });
    expect(() =>
      decodeProfiles(
        encodeProfiles([profile], true).replace('nam-phai-chinese-lunar-v1', 'legacy'),
      ),
    ).toThrow();
  });
});
