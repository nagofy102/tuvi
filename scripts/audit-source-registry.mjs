import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const output = resolve('test-results/source-registry');
await mkdir(output, { recursive: true });
await build({
  entryPoints: ['scripts/source-admission.ts'],
  outfile: `${output}/validator.cjs`,
  bundle: true,
  platform: 'node',
  format: 'cjs',
  logLevel: 'warning',
});
const { SOURCE_REGISTRY, summarizeSourceRegistry, assertReviewedReferenceSources } = createRequire(
  import.meta.url,
)(`${output}/validator.cjs`);
const summary = summarizeSourceRegistry();
const registryBytes = await readFile('dev/source-registry.json');
const corpusBytes = await readFile('tests/fixtures/reference-charts.json');
assertReviewedReferenceSources(JSON.parse(corpusBytes.toString('utf8')));

// Explicit local files only. No network fetch, OCR, engine call or oracle write.
const argumentsList = process.argv.slice(2);
const artifacts = new Map(
  SOURCE_REGISTRY.sources.flatMap((source) =>
    (source.artifacts ?? []).map((item) => [item.id, item]),
  ),
);
const checked = new Set();
const artifactChecks = [];
for (let index = 0; index < argumentsList.length; index += 3) {
  const [flag, id, file] = argumentsList.slice(index, index + 3);
  if (flag !== '--artifact' || !id || !file || !artifacts.has(id) || checked.has(id))
    throw new Error('Use unique --artifact <registered-id> <local-file> triples.');
  checked.add(id);
  const info = await stat(file);
  if (!info.isFile() || info.size > 20 * 1024 * 1024)
    throw new Error('Only local artifact files up to 20 MiB are accepted.');
  const sha256 = createHash('sha256')
    .update(await readFile(file))
    .digest('hex');
  const expected = artifacts.get(id).sha256;
  artifactChecks.push({ id, sha256, expected, matches: sha256 === expected });
}
const passed = artifactChecks.every((item) => item.matches);
const report = {
  generatedAt: new Date().toISOString(),
  gitRevision: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  dirtyWorktree: Boolean(
    execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim(),
  ),
  registrySha256: createHash('sha256').update(registryBytes).digest('hex'),
  corpusSha256: createHash('sha256').update(corpusBytes).digest('hex'),
  summary,
  artifactChecks,
  passed,
  limitations: [
    'Registry admission checks are not verification of source authenticity, independence or predictive accuracy.',
    'Only explicitly supplied local artifacts are hashed; unprovided images remain unchecked.',
    'Matching bytes cannot promote a crosscheck-only source or create complete golden charts.',
  ],
};
await writeFile(`${output}/report.json`, `${JSON.stringify(report, null, 2)}\n`);
process.stdout.write(
  `${JSON.stringify({ summary, checkedArtifacts: artifactChecks.length, passed })}\nReports: test-results/source-registry/report.json\n`,
);
if (!passed) process.exitCode = 1;
