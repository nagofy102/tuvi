import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { astro } from 'iztro';
import { calculateChart, RULE_PROFILE } from '../src/domain/astrology/legacy-vietnamese';
import { dateString, lunarToSolar, solarToLunar } from '../src/domain/calendar/legacy-vietnamese';
import type { CivilDate, LunarDate } from '../src/domain/calendar/types';
import type { BirthInput, ChartResult } from '../src/domain/astrology/types';
import { solar2lunar as bridgeLunar } from '../src/domain/calendar/engine-bridge';

// Inspect the actual transitive converter used by iztro, not an alternative installation.
const requireEngine = createRequire(createRequire(import.meta.url).resolve('iztro'));
const calendar = requireEngine('lunar-lite') as typeof import('lunar-lite');
const requireCalendar = createRequire(requireEngine.resolve('lunar-lite'));
const { Lunar } = requireCalendar('lunar-typescript') as typeof import('lunar-typescript');

export type Category =
  | 'project_calendar_error'
  | 'upstream_leap_flag_loss'
  | 'upstream_lunar_tuple_mismatch'
  | 'upstream_regular_month_preconstruction'
  | 'upstream_calendar_rejection'
  | 'upstream_other_error'
  | 'calendar_solar_divergence'
  | 'project_adapter_error'
  | 'chart_structure_error'
  | 'zi_policy_mismatch';

export interface Finding {
  stage: 'calendar' | 'chart' | 'relation';
  category: Category;
  solar: CivilDate;
  lunar?: LunarDate;
  input?: BirthInput;
  detail: string;
}

export interface AuditOptions {
  startYear: number;
  endYear: number;
  progress?: (message: string) => void;
}

export interface AuditReport {
  startedAt: string;
  finishedAt: string;
  profile: string;
  versions: Record<string, string>;
  range: { startYear: number; endYear: number };
  calendar: {
    days: number;
    projectPassed: number;
    projectFailed: number;
    upstreamRepresentable: number;
    upstreamFailed: number;
    solarDivergences: number;
    invalidDay30Rejected: number;
    invalidDay30Attempted: number;
    invalidDay30Accepted: number;
    continuationErrors: number;
    bridgePassed: number;
    bridgeFailed: number;
  };
  charts: { dates: number; attempts: number; passed: number; failed: number };
  relations: { checked: number; passed: number; failed: number; unavailable: number };
  findings: Finding[];
}

const TIMES = [
  [0, 0],
  [0, 59],
  [1, 0],
  [22, 59],
  [23, 0],
  [23, 59],
] as const;
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const message = (error: unknown) => (error instanceof Error ? error.message : String(error));

function installedVersion(entry: string, name: string): string {
  let directory = dirname(entry);
  while (directory !== dirname(directory)) {
    try {
      const pkg = JSON.parse(readFileSync(resolve(directory, 'package.json'), 'utf8')) as {
        name?: string;
        version?: string;
      };
      if (pkg.name === name && pkg.version) return pkg.version;
    } catch {
      /* Continue above entry subdirectories. */
    }
    directory = dirname(directory);
  }
  throw new Error(`Cannot identify installed version for ${name}.`);
}

export function nextDate(date: CivilDate): CivilDate {
  const next = new Date(Date.UTC(date.year, date.month - 1, date.day + 1));
  return { year: next.getUTCFullYear(), month: next.getUTCMonth() + 1, day: next.getUTCDate() };
}

function sameLunar(a: LunarDate, b: ReturnType<typeof calendar.solar2lunar>): boolean {
  return (
    a.year === b.lunarYear &&
    a.month === b.lunarMonth &&
    a.day === b.lunarDay &&
    a.isLeapMonth === b.isLeap
  );
}

export function inspectUpstream(
  lunar: LunarDate,
  converter = calendar,
): {
  category?: Category;
  detail: string;
  solar?: CivilDate;
} {
  try {
    const raw = converter.lunar2solar(dateString(lunar), lunar.isLeapMonth);
    const roundTrip = converter.solar2lunar(raw.toString());
    if (!sameLunar(lunar, roundTrip)) {
      return {
        category:
          lunar.isLeapMonth &&
          !roundTrip.isLeap &&
          lunar.year === roundTrip.lunarYear &&
          lunar.month === roundTrip.lunarMonth &&
          lunar.day === roundTrip.lunarDay
            ? 'upstream_leap_flag_loss'
            : 'upstream_lunar_tuple_mismatch',
        detail: `Upstream round trip changed lunar tuple: ${JSON.stringify(roundTrip)}`,
      };
    }
    return {
      solar: { year: raw.solarYear, month: raw.solarMonth, day: raw.solarDay },
      detail: 'Lunar tuple preserved; not expert validation.',
    };
  } catch (error) {
    // Require signed success AND unsigned failure before attributing preconstruction.
    try {
      Lunar.fromYmd(lunar.year, lunar.isLeapMonth ? -lunar.month : lunar.month, lunar.day);
      if (lunar.isLeapMonth) {
        try {
          Lunar.fromYmd(lunar.year, lunar.month, lunar.day);
        } catch {
          return { category: 'upstream_regular_month_preconstruction', detail: message(error) };
        }
      }
      return { category: 'upstream_other_error', detail: message(error) };
    } catch {
      return { category: 'upstream_calendar_rejection', detail: message(error) };
    }
  }
}

export function chartSignature(chart: ChartResult): string {
  return JSON.stringify({
    cuc: chart.cuc,
    soul: chart.soul,
    body: chart.body,
    palaces: [...chart.palaces]
      .sort((a, b) => a.branchIndex - b.branchIndex)
      .map((p) => ({
        ...p,
        stars: [...p.stars].sort((a, b) => a.name.localeCompare(b.name)),
      })),
  });
}

export function validStructure(chart: ChartResult): boolean {
  const major = chart.palaces.flatMap((p) => p.stars.filter((s) => s.group === 'major'));
  return (
    chart.palaces.length === 12 &&
    new Set(chart.palaces.map((p) => p.name)).size === 12 &&
    new Set(chart.palaces.map((p) => p.branchIndex)).size === 12 &&
    chart.palaces.every(
      (p) => Number.isInteger(p.branchIndex) && p.branchIndex >= 0 && p.branchIndex < 12,
    ) &&
    chart.palaces.filter((p) => p.isBodyPalace).length === 1 &&
    major.length === 14 &&
    new Set(major.map((s) => s.name)).size === 14
  );
}

export async function runAudit(
  options: AuditOptions,
  dependencies: {
    toLunar?: typeof solarToLunar;
    toSolar?: typeof lunarToSolar;
    chart?: typeof calculateChart;
  } = {},
): Promise<AuditReport> {
  const toLunar = dependencies.toLunar ?? solarToLunar;
  const toSolar = dependencies.toSolar ?? lunarToSolar;
  const calculate = dependencies.chart ?? calculateChart;
  if (
    !Number.isInteger(options.startYear) ||
    !Number.isInteger(options.endYear) ||
    options.startYear < 1950 ||
    options.endYear > 2026 ||
    options.startYear > options.endYear
  ) {
    throw new Error('Audit range must be integer years within 1950–2026.');
  }
  const report: AuditReport = {
    startedAt: new Date().toISOString(),
    finishedAt: '',
    profile: RULE_PROFILE,
    versions: {
      iztro: (requireEngine('iztro/package.json') as { version: string }).version,
      lunarLite: (requireEngine('lunar-lite/package.json') as { version: string }).version,
      lunarTypescript: installedVersion(
        requireCalendar.resolve('lunar-typescript'),
        'lunar-typescript',
      ),
      vietnameseCalendar: installedVersion(
        createRequire(import.meta.url).resolve('@dqcai/vn-lunar'),
        '@dqcai/vn-lunar',
      ),
      node: process.version,
      engineBridge: 'vn-bridge-v1',
    },
    range: { startYear: options.startYear, endYear: options.endYear },
    calendar: {
      days: 0,
      projectPassed: 0,
      projectFailed: 0,
      upstreamRepresentable: 0,
      upstreamFailed: 0,
      solarDivergences: 0,
      invalidDay30Rejected: 0,
      invalidDay30Attempted: 0,
      invalidDay30Accepted: 0,
      continuationErrors: 0,
      bridgePassed: 0,
      bridgeFailed: 0,
    },
    charts: { dates: 0, attempts: 0, passed: 0, failed: 0 },
    relations: { checked: 0, passed: 0, failed: 0, unavailable: 0 },
    findings: [],
  };
  const chartDates = new Map<string, { solar: CivilDate; lunar: LunarDate }>();
  const expandedDates = new Set<string>();
  const representatives = new Set<string>();
  let lastProgress = performance.now();
  const progress = async (force = false) => {
    if (force || performance.now() - lastProgress > 15_000) {
      options.progress?.(
        `Calendar days: ${report.calendar.days}; charts: ${report.charts.attempts}; chart failures: ${report.charts.failed}`,
      );
      lastProgress = performance.now();
    }
    await new Promise<void>((resolve) => setImmediate(resolve));
  };

  for (
    let solar: CivilDate = { year: options.startYear, month: 1, day: 1 };
    solar.year <= options.endYear;
    solar = nextDate(solar)
  ) {
    report.calendar.days++;
    let lunar: LunarDate;
    try {
      lunar = toLunar(solar);
      if (!same(toSolar(lunar), solar))
        throw new Error('Vietnamese calendar round trip changed the civil date.');
      report.calendar.projectPassed++;
    } catch (error) {
      report.calendar.projectFailed++;
      report.findings.push({
        stage: 'calendar',
        category: 'project_calendar_error',
        solar,
        detail: message(error),
      });
      continue;
    }
    try {
      const bridged = bridgeLunar(dateString(solar));
      if (
        bridged.lunarYear !== lunar.year ||
        bridged.lunarMonth !== lunar.month ||
        bridged.lunarDay !== lunar.day ||
        bridged.isLeap !== lunar.isLeapMonth
      ) {
        throw new Error('Engine bridge changed the Vietnamese lunar tuple.');
      }
      report.calendar.bridgePassed++;
    } catch (error) {
      report.calendar.bridgeFailed++;
      report.findings.push({
        stage: 'calendar',
        category: 'project_adapter_error',
        solar,
        lunar,
        detail: message(error),
      });
    }
    const probe = inspectUpstream(lunar);
    if (probe.category) {
      report.calendar.upstreamFailed++;
      report.findings.push({
        stage: 'calendar',
        category: probe.category,
        solar,
        lunar,
        detail: probe.detail,
      });
    } else {
      report.calendar.upstreamRepresentable++;
      if (!same(probe.solar, solar)) {
        report.calendar.solarDivergences++;
        report.findings.push({
          stage: 'calendar',
          category: 'calendar_solar_divergence',
          solar,
          lunar,
          detail: `Same lunar tuple maps to upstream solar ${JSON.stringify(probe.solar)}; informational, not proof of incorrect stars.`,
        });
      }
    }
    let following: LunarDate;
    try {
      following = toLunar(nextDate(solar));
    } catch (error) {
      report.calendar.continuationErrors++;
      report.findings.push({
        stage: 'calendar',
        category: 'project_calendar_error',
        solar,
        lunar,
        detail: `Next-day probe failed: ${message(error)}`,
      });
      continue;
    }
    const monthEnd = lunar.day >= 29 && following.day === 1;
    if (monthEnd && lunar.day === 29) {
      report.calendar.invalidDay30Attempted++;
      try {
        toSolar({ ...lunar, day: 30 });
        report.calendar.invalidDay30Accepted++;
        report.findings.push({
          stage: 'calendar',
          category: 'project_calendar_error',
          solar,
          lunar,
          detail: 'Invalid day 30 in a 29-day month was accepted.',
        });
      } catch {
        report.calendar.invalidDay30Rejected++;
      }
    }
    const newYearEdge =
      (lunar.month === 1 && lunar.day === 1 && !lunar.isLeapMonth) || following.year !== lunar.year;
    const key = dateString(solar);
    // Chart one noon/male profile at every actual lunar month end and every converter failure.
    if (
      monthEnd ||
      probe.category ||
      newYearEdge ||
      (lunar.isLeapMonth && [15, 16].includes(lunar.day))
    ) {
      chartDates.set(key, { solar, lunar });
    }
    // Expand hour/gender/policy matrix at representatives in each civil year, plus 1985 leap month 2.
    const tag = newYearEdge
      ? `year-edge-${lunar.day === 1 ? 'first' : 'last'}`
      : lunar.isLeapMonth && [15, 16, 29, 30].includes(lunar.day)
        ? `leap-${lunar.day}`
        : monthEnd
          ? `month-end-${lunar.day}`
          : undefined;
    const representative = `${solar.year}:${tag}`;
    if (
      (tag && !representatives.has(representative)) ||
      (lunar.year === 1985 && lunar.month === 2 && lunar.isLeapMonth)
    ) {
      representatives.add(representative);
      chartDates.set(key, { solar, lunar });
      expandedDates.add(key);
    }
    if (report.calendar.days % 250 === 0) await progress();
  }
  await progress(true);

  const check = (input: BirthInput & { calendar: 'solar' }): ChartResult | undefined => {
    report.charts.attempts++;
    try {
      const result = calculate(input);
      if (!validStructure(result)) {
        report.charts.failed++;
        report.findings.push({
          stage: 'chart',
          category: 'chart_structure_error',
          solar: input.date,
          input,
          detail: '12 unique branches/palaces, one Thân, or 14 unique major stars check failed.',
        });
        return;
      }
      const expectedLunar = toLunar(
        input.hour === 23 && input.ziPolicy === 'next_day_at_23'
          ? nextDate(input.date)
          : input.date,
      );
      if (
        !same(result.solar, input.date) ||
        !same(result.lunar, toLunar(input.date)) ||
        !same(result.effectiveLunar, expectedLunar)
      ) {
        throw new Error('Adapter changed original/effective date unexpectedly.');
      }
      report.charts.passed++;
      return result;
    } catch (error) {
      report.charts.failed++;
      let effective: LunarDate;
      try {
        effective = toLunar(
          input.hour === 23 && input.ziPolicy === 'next_day_at_23'
            ? nextDate(input.date)
            : input.date,
        );
      } catch (diagnosticError) {
        report.findings.push({
          stage: 'chart',
          category: 'project_calendar_error',
          solar: input.date,
          input,
          detail: `${message(error)}; effective-date probe failed: ${message(diagnosticError)}`,
        });
        return;
      }
      const upstream = inspectUpstream(effective);
      let category: Category = upstream.category ?? 'project_adapter_error';
      if (!upstream.category) {
        try {
          astro.withOptions({
            type: 'lunar',
            dateStr: dateString(effective),
            timeIndex: Math.floor((input.hour + 1) / 2) % 12,
            gender: input.gender,
            isLeapMonth: effective.isLeapMonth,
            fixLeap: input.leapPolicy === 'split_at_15',
            language: 'vi-VN',
            config: {
              algorithm: 'default',
              yearDivide: 'normal',
              horoscopeDivide: 'normal',
              dayDivide: 'current',
              ageDivide: 'normal',
            },
          });
        } catch {
          category = 'upstream_other_error';
        }
      }
      report.findings.push({
        stage: 'chart',
        category,
        solar: input.date,
        lunar: effective,
        input,
        detail: `${message(error)}${error instanceof Error && error.cause ? `; cause: ${message(error.cause)}` : ''}`,
      });
    }
  };
  const compare = (
    a: ChartResult | undefined,
    b: ChartResult | undefined,
    input: BirthInput,
    detail: string,
  ) => {
    if (!a || !b) {
      report.relations.unavailable++;
      return;
    }
    report.relations.checked++;
    if (chartSignature(a) === chartSignature(b)) report.relations.passed++;
    else {
      report.relations.failed++;
      report.findings.push({
        stage: 'relation',
        category: 'zi_policy_mismatch',
        solar: input.date,
        input,
        detail,
      });
    }
  };
  for (const [key, { solar, lunar }] of chartDates) {
    report.charts.dates++;
    const base: BirthInput & { calendar: 'solar' } = {
      calendar: 'solar',
      date: solar,
      gender: 'male',
      hour: 12,
      minute: 0,
      leapPolicy: 'split_at_15',
      ziPolicy: 'civil_midnight',
    };
    check(base);
    if (expandedDates.has(key)) {
      for (const gender of ['male', 'female'] as const) {
        for (const leapPolicy of lunar.isLeapMonth
          ? (['split_at_15', 'same_month'] as const)
          : (['split_at_15'] as const)) {
          const current = { ...base, gender, leapPolicy };
          const midnight = check({ ...current, hour: 0 });
          let nextMidnight: ChartResult | undefined;
          for (const [hour, minute] of TIMES.slice(1)) {
            const input = { ...current, hour, minute };
            const actual = check(input);
            if (hour === 0 || hour === 23)
              compare(
                midnight,
                actual,
                input,
                'Same civil date and Tý branch must preserve chart under civil_midnight.',
              );
            if (hour === 23) {
              const forward = check({ ...input, ziPolicy: 'next_day_at_23' });
              nextMidnight ??= check({ ...current, date: nextDate(solar), hour: 0 });
              compare(
                nextMidnight,
                forward,
                input,
                'next_day_at_23 must equal next civil day at 00:00 under the same gender/leap policy.',
              );
            }
          }
        }
      }
    }
    if (report.charts.dates % 10 === 0) await progress();
  }
  report.finishedAt = new Date().toISOString();
  await progress(true);
  return report;
}
