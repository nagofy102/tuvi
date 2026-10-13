import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test, expect } from 'vitest';
import { runAudit } from './tech-audit';

test('RUN_TECH_AUDIT: calendar sweep and targeted chart matrix', async () => {
  const output = resolve('test-results/tech-audit');
  mkdirSync(output, { recursive: true });
  const sources = {
    runner: readFileSync('scripts/tech-audit.test.ts', 'utf8'),
    audit: readFileSync('scripts/tech-audit.ts', 'utf8'),
  };
  const report = await runAudit({
    startYear: Number(process.env.AUDIT_START_YEAR ?? 1950),
    endYear: Number(process.env.AUDIT_END_YEAR ?? 2026),
    progress: (message) => {
      console.log(message);
      writeFileSync(
        resolve(output, 'progress.json'),
        JSON.stringify({ updatedAt: new Date().toISOString(), message }) + '\n',
      );
    },
  });
  const revision = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  const dirty =
    execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim().length > 0;
  const categories = new Map<string, number>();
  for (const finding of report.findings) {
    const key = `${finding.stage}/${finding.category}`;
    categories.set(key, (categories.get(key) ?? 0) + 1);
  }
  writeFileSync(
    resolve(output, 'report.json'),
    JSON.stringify({ revision, dirty, ...report }, null, 2) + '\n',
  );
  const summary = [
    '# RUN_TECH_AUDIT',
    '',
    `Started: ${report.startedAt}; finished: ${report.finishedAt}.`,
    `Revision: ${revision}; dirty worktree: ${dirty}; profile: ${report.profile}.`,
    `Versions: ${JSON.stringify(report.versions)}.`,
    '',
    '## Results',
    '',
    `- Calendar range: ${report.range.startYear}–${report.range.endYear}, ${report.calendar.days} daily inputs.`,
    `- Project calendar round trips: ${report.calendar.projectPassed} passed, ${report.calendar.projectFailed} failed.`,
    `- Invalid day 30 probes: ${report.calendar.invalidDay30Attempted}; rejected: ${report.calendar.invalidDay30Rejected}; incorrectly accepted: ${report.calendar.invalidDay30Accepted}.`,
    `- Next-day probe errors: ${report.calendar.continuationErrors}.`,
    `- Vietnamese engine bridge tuples: ${report.calendar.bridgePassed} passed, ${report.calendar.bridgeFailed} failed.`,
    `- Upstream lunar representation: ${report.calendar.upstreamRepresentable} preserved, ${report.calendar.upstreamFailed} failed.`,
    `- Same lunar tuple / different solar date: ${report.calendar.solarDivergences} informational observations.`,
    `- Chart dates: ${report.charts.dates}; attempts: ${report.charts.attempts}; passed: ${report.charts.passed}; failed: ${report.charts.failed}.`,
    `- Tý relations: ${report.relations.checked} checked; ${report.relations.passed} passed; ${report.relations.failed} failed; ${report.relations.unavailable} unavailable due to missing chart.`,
    '',
    '| Stage/category | Observations |',
    '| --- | --- |',
    ...[...categories].sort().map(([key, count]) => `| ${key} | ${count} |`),
    '',
    '## Interpretation and coverage limits',
    '',
    'The entire date range is scanned for calendar round trips and upstream lunar representation, NOT every chart/time/gender combination.',
    'Charts cover every actual lunar month end, converter failures, Tết edges and leap days 15/16 at noon/male. Expanded representatives per year and all 1985 leap-month-2 dates cover 00:00, 00:59, 01:00, 22:59, 23:00, 23:59, both genders, both late-Tý policies, and both leap policies where applicable.',
    'Adapter/calendar attribution is diagnostic, not expert star-placement ground truth. Both converters can share errors. Solar divergence alone is not classified as incorrect astrology. No model/calendar/star rule is patched by this audit.',
    'Exit 0 means the audit completed, not that all findings passed. AUDIT_STRICT=1 fails on all noninformational findings, including the preserved upstream comparison. AUDIT_PROJECT_STRICT=1 gates project calendar/bridge/chart/relation failures without treating upstream calendar comparison findings as production failures.',
    '',
    '## Reproduction examples',
    '',
    ...report.findings
      .filter((f) => f.category !== 'calendar_solar_divergence')
      .slice(0, 12)
      .map(
        (f) =>
          `- ${f.stage}/${f.category}: ${JSON.stringify(f.solar)}; ${JSON.stringify(f.lunar)}; ${f.detail.replaceAll('\n', ' ')}`,
      ),
    '',
    '## Executable test source',
    '',
    '```typescript',
    sources.runner,
    '```',
    '',
    '## Audit implementation source',
    '',
    '```typescript',
    sources.audit,
    '```',
    '',
  ].join('\n');
  writeFileSync(resolve(output, 'report.md'), summary);
  console.log(summary.split('## Executable test source')[0]);
  expect(report.calendar.days).toBeGreaterThan(0);
  if (process.env.AUDIT_STRICT === '1') {
    expect(report.findings.filter((f) => f.category !== 'calendar_solar_divergence')).toEqual([]);
  }
  if (process.env.AUDIT_PROJECT_STRICT === '1') {
    expect(report.calendar.projectFailed).toBe(0);
    expect(report.calendar.bridgeFailed).toBe(0);
    expect(report.calendar.invalidDay30Accepted).toBe(0);
    expect(report.calendar.continuationErrors).toBe(0);
    expect(report.charts.failed).toBe(0);
    expect(report.relations.failed).toBe(0);
    expect(report.relations.unavailable).toBe(0);
  }
});
