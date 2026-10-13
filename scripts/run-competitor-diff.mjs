import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

// This runner reads external observations; it never creates or updates expectations.
const fixturePath = 'tests/fixtures/competitor-chart-candidates.json';
const fixtureText = await readFile(fixturePath, 'utf8');
const fixtureDigest = createHash('sha256').update(fixtureText).digest('hex');
const fixture = JSON.parse(fixtureText);
if (
  fixture.schemaVersion !== 'competitor-chart-candidates-v1' ||
  fixture.status !== 'external-comparison-only' ||
  fixture.oraclePolicy?.engineGeneratedObservations !== false ||
  fixture.oraclePolicy?.approvedGoldenCharts !== 0 ||
  fixture.oraclePolicy?.sourceIndependenceVerified !== false ||
  fixture.oraclePolicy?.promoteFromAgreement !== false ||
  !Array.isArray(fixture.sources) ||
  !Array.isArray(fixture.cases) ||
  !fixture.cases.length
)
  throw new Error('Invalid comparison-only candidate policy.');
const sources = new Map();
for (const source of fixture.sources) {
  if (
    !source.id ||
    sources.has(source.id) ||
    !source.url?.startsWith('https://') ||
    !['incompatible-declared-school-and-calendar', 'unresolved'].includes(
      source.namPhaiCompatibility,
    )
  )
    throw new Error('Invalid or duplicate competitor source.');
  sources.set(source.id, source);
}
const allowedScalarFields = ['displayedSolar', 'displayedLunar', 'mingBranch', 'bodyBranch', 'cuc'];
const allowedMaps = ['majorStars', 'minorStars', 'palaceBranches'];
const caseIds = new Set();
for (const item of fixture.cases) {
  if (
    !item.id ||
    caseIds.has(item.id) ||
    !sources.has(item.sourceId) ||
    item.status !== 'external-comparison-only' ||
    !['birth-date', 'calculation-date', 'same-for-observed-input', 'unresolved'].includes(
      item.displayedLunarBasis,
    ) ||
    !item.capturedAt ||
    !item.input ||
    !item.observation
  )
    throw new Error('Invalid or duplicate candidate.');
  caseIds.add(item.id);
  for (const [field, value] of Object.entries(item.observation)) {
    if (allowedScalarFields.includes(field)) {
      if (typeof value !== 'string' || !value.trim()) throw new Error('Empty observed field.');
    } else if (allowedMaps.includes(field)) {
      if (
        !value ||
        typeof value !== 'object' ||
        Array.isArray(value) ||
        !Object.keys(value).length ||
        Object.values(value).some((entry) => typeof entry !== 'string' || !entry.trim())
      )
        throw new Error('Invalid observed map.');
    } else throw new Error(`Undeclared observation field: ${field}`);
  }
}
const output = resolve('test-results/competitor-diff');
await mkdir(output, { recursive: true });
await build({
  stdin: {
    contents: "export { calculateChart, RULE_PROFILE } from './src/domain/astrology/calculate';",
    resolveDir: process.cwd(),
    sourcefile: 'competitor-runner.ts',
    loader: 'ts',
  },
  outfile: `${output}/engine.cjs`,
  bundle: true,
  platform: 'node',
  format: 'cjs',
  packages: 'external',
  logLevel: 'warning',
});
const { calculateChart, RULE_PROFILE } = createRequire(import.meta.url)(`${output}/engine.cjs`);
const normalized = (value) => String(value).normalize('NFC').trim().toLocaleLowerCase('vi');
const aliases = new Map([
  ['tả phù', 'tả phụ'],
  ['tử nữ', 'tử tức'],
]);
const canonical = (value) => aliases.get(normalized(value)) ?? normalized(value);
const civilText = (date) =>
  `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
const starBranch = (chart, name, group) => {
  const hits = chart.palaces.flatMap((palace) =>
    palace.stars
      .filter(
        (star) =>
          canonical(star.name) === canonical(name) &&
          (group !== 'majorStars' || star.group === 'major'),
      )
      .map(() => palace.branch),
  );
  return hits.length === 1 ? hits[0] : null;
};
const lunarText = (date) => `${civilText(date)}-${date.isLeapMonth ? 'leap' : 'normal'}`;
const results = fixture.cases.map((item) => {
  const source = sources.get(item.sourceId);
  try {
    const chart = calculateChart(item.input);
    const birthLunar = lunarText(chart.lunar);
    const calculationLunar = lunarText(chart.effectiveLunar);
    const lunarComparable =
      item.displayedLunarBasis !== 'unresolved' &&
      (item.displayedLunarBasis !== 'same-for-observed-input' || birthLunar === calculationLunar);
    const actual = {
      displayedSolar: civilText(chart.solar),
      displayedLunar:
        item.displayedLunarBasis === 'calculation-date' ? calculationLunar : birthLunar,
      mingBranch: chart.palaces.find((palace) => canonical(palace.name) === 'mệnh')?.branch ?? null,
      bodyBranch: chart.palaces.find((palace) => palace.isBodyPalace)?.branch ?? null,
      cuc: chart.cuc,
    };
    const fields = [];
    const unresolvedFields = [];
    for (const [field, observed] of Object.entries(item.observation)) {
      if (allowedScalarFields.includes(field)) {
        if (field === 'displayedLunar' && !lunarComparable) {
          unresolvedFields.push({
            field,
            observed,
            reason: 'Source date-display basis unresolved',
            birthLunar,
            calculationLunar,
          });
          continue;
        }
        fields.push({
          field,
          observed,
          actual: actual[field],
          matches: canonical(observed) === canonical(actual[field]),
        });
      } else {
        for (const [name, value] of Object.entries(observed)) {
          const actualValue =
            field === 'palaceBranches'
              ? (chart.palaces.find((palace) => canonical(palace.name) === canonical(name))
                  ?.branch ?? null)
              : starBranch(chart, name, field);
          fields.push({
            field: `${field}.${name}`,
            observed: value,
            actual: actualValue,
            matches: canonical(value) === canonical(actualValue),
          });
        }
      }
    }
    return {
      id: item.id,
      sourceId: item.sourceId,
      compatibility: source.namPhaiCompatibility,
      status: 'compared-external-observations',
      engineProfile: chart.provenance.profile,
      sourceDisplayedLunarBasis: item.displayedLunarBasis,
      birthLunar,
      calculationLunar,
      unresolvedFields,
      fields,
      matchingFields: fields.filter((field) => field.matches).length,
      differingFields: fields.filter((field) => !field.matches).length,
    };
  } catch (error) {
    return {
      id: item.id,
      sourceId: item.sourceId,
      compatibility: source.namPhaiCompatibility,
      status: 'engine-unavailable',
      error: error instanceof Error ? error.message : String(error),
      fields: [],
    };
  }
});
if (
  createHash('sha256')
    .update(await readFile(fixturePath))
    .digest('hex') !== fixtureDigest
)
  throw new Error('Candidate observations changed during comparison.');
const report = {
  generatedAt: new Date().toISOString(),
  gitRevision: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  dirtyWorktree: Boolean(
    execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim(),
  ),
  engineProfile: RULE_PROFILE,
  fixtureSha256: fixtureDigest,
  policy: fixture.oraclePolicy,
  counts: {
    cases: results.length,
    compared: results.filter((item) => item.status === 'compared-external-observations').length,
    unavailable: results.filter((item) => item.status === 'engine-unavailable').length,
    fieldsCompared: results.reduce((sum, item) => sum + item.fields.length, 0),
    matchingFields: results.reduce(
      (sum, item) => sum + item.fields.filter((field) => field.matches).length,
      0,
    ),
    differingFields: results.reduce(
      (sum, item) => sum + item.fields.filter((field) => !field.matches).length,
      0,
    ),
    approvedGoldenCharts: 0,
  },
  limits: [
    'Incompatible or unresolved source profiles do not establish algorithm pass/fail.',
    'Matching outputs do not establish independent engines, Nam phai accuracy, or predictive validity.',
    'Only persisted observed fields are compared; omitted dignity, transformations and other auxiliaries remain unverified.',
    'Source intervals are represented by their first minute; exact birth minutes were not supplied by source forms.',
  ],
  results,
};
await writeFile(`${output}/report.json`, `${JSON.stringify(report, null, 2)}\n`);
process.stdout.write(
  `${JSON.stringify(report.counts)}\nProfile: ${RULE_PROFILE}\nReport: test-results/competitor-diff/report.json\n`,
);
if (report.counts.unavailable) process.exitCode = 1;
