import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const output = resolve('test-results/reference-diff');
await mkdir(output, { recursive: true });
await build({
  entryPoints: ['scripts/reference-diff.ts'],
  outfile: `${output}/runner.cjs`,
  bundle: true,
  platform: 'node',
  format: 'cjs',
  packages: 'external',
  // The package's require condition points at CJS in a type:module .js file.
  // Bundle its real ESM entry, as the versioned engine builder already does.
  plugins: [
    {
      name: 'vietnam-calendar-esm',
      setup(plugin) {
        plugin.onResolve({ filter: /^@dqcai\/vn-lunar$/ }, () => ({
          path: resolve('node_modules/@dqcai/vn-lunar/lib/index.mjs'),
        }));
      },
    },
  ],
  logLevel: 'warning',
});
const { runReferenceDiff } = createRequire(import.meta.url)(`${output}/runner.cjs`);
const input = await readFile('tests/fixtures/reference-charts.json', 'utf8');
const corpus = JSON.parse(input);
const results = runReferenceDiff(corpus);
const counts = {
  cases: results.length,
  passedKnownFields: results.filter((c) => c.status === 'pass-known-fields').length,
  failed: results.filter((c) => c.status === 'fail').length,
  unavailable: results.filter((c) => c.status === 'unavailable').length,
  fieldsCompared: results.reduce((n, c) => n + c.fields.length, 0),
  fieldMismatches: results.reduce((n, c) => n + c.fields.filter((f) => !f.pass).length, 0),
  completeGoldenCharts: 0,
};
const report = {
  generatedAt: new Date().toISOString(),
  gitRevision: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  dirtyWorktree: Boolean(
    execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim(),
  ),
  profile: corpus.profileId,
  fixtureSha256: createHash('sha256').update(input).digest('hex'),
  oraclePolicy: corpus.oraclePolicy,
  counts,
  results,
};
await writeFile(`${output}/report.json`, `${JSON.stringify(report, null, 2)}\n`);
const lines = [
  '# Source-reference chart diff',
  '',
  `Run: ${report.generatedAt}; revision ${report.gitRevision}; dirty=${report.dirtyWorktree}.`,
  `Fixture SHA-256: ${report.fixtureSha256}.`,
  '',
  `Known-field cases passed: ${counts.passedKnownFields}/${counts.cases}; failed: ${counts.failed}; unavailable: ${counts.unavailable}.`,
  `Compared fields: ${counts.fieldsCompared}; mismatches: ${counts.fieldMismatches}.`,
  'These are partial source-derived cases, not complete expert-certified charts; omitted fields are UNVERIFIED, never implicit passes.',
  'Categories placement-or-profile and calendar-or-engine-rejection are diagnostic groups, not established root causes.',
  '',
  '| Case | Result | Category | Known fields | Unverified |',
  '| --- | --- | --- | --- | --- |',
  ...results.map(
    (c) =>
      `| ${c.id} | ${c.status} | ${c.category} | ${c.fields.length} | ${c.unverifiedFields.join(', ')} |`,
  ),
  '',
  ...results.flatMap((c) =>
    c.fields
      .filter((f) => !f.pass)
      .map((f) => `${c.id}: ${f.field}: expected ${f.expected}, actual ${f.actual}`),
  ),
];
await writeFile(`${output}/report.md`, `${lines.join('\n')}\n`);
process.stdout.write(
  `${JSON.stringify(counts)}\nReports: test-results/reference-diff/report.{json,md}\n`,
);
if (counts.failed || counts.unavailable) process.exitCode = 1;
