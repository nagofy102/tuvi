import { spawn, execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const argument = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index < 0 ? fallback : process.argv[index + 1];
};
const runs = Number(argument('--runs', '5'));
const label = argument('--label', 'current');
if (!Number.isInteger(runs) || runs < 2 || runs > 10 || !/^[a-z0-9-]+$/.test(label))
  throw new Error('Use --runs 2..10 and a lowercase alphanumeric --label.');
const directory = resolve('test-results/mobile-budget', label);
await mkdir(resolve('test-results/mobile-budget'), { recursive: true });
await mkdir(directory, { recursive: false });
const metadata = {
  revision: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  dirty: Boolean(execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim()),
  mode: 'Lighthouse default mobile simulated throttling; fresh browser per run',
  buildId: (await readFile('.next/BUILD_ID', 'utf8')).trim(),
};
const assertNoTestServer = async () => {
  let response;
  try {
    response = await fetch('http://127.0.0.1:3000', { signal: AbortSignal.timeout(2000) });
  } catch {}
  if (response) throw new Error('Port 3000 serves HTTP; do not measure alongside browser tests.');
};
await assertNoTestServer();
const url = 'http://127.0.0.1:3001';
try {
  await fetch(url);
  throw new Error('Port 3001 already serves HTTP; stop your own server before measuring.');
} catch (error) {
  if (error.message.startsWith('Port 3001')) throw error;
}
const server = spawn(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3001'],
  { stdio: ['ignore', 'ignore', 'pipe'] },
);
let serverErrors = '';
server.stderr.on('data', (chunk) => {
  serverErrors += chunk;
});
const measurements = [];
try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null) throw new Error(`Production server exited: ${serverErrors}`);
    try {
      if ((await fetch(url)).ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((done) => setTimeout(done, 500));
  }
  if (!ready) throw new Error(`Production HTTP readiness failed: ${serverErrors}`);
  for (let run = 1; run <= runs; run++) {
    await assertNoTestServer();
    const path = resolve(directory, `${run}.json`);
    await new Promise((done, fail) => {
      const child = spawn(
        process.execPath,
        [
          'node_modules/lighthouse/cli/index.js',
          url,
          '--chrome-flags=--headless --no-sandbox',
          '--only-categories=performance,accessibility,seo',
          '--output=json',
          `--output-path=${path}`,
          '--quiet',
        ],
        {
          env: { ...process.env, CHROME_PATH: process.env.CHROME_PATH || '/usr/bin/chromium' },
          stdio: ['ignore', 'ignore', 'pipe'],
          timeout: 120000,
        },
      );
      let errors = '';
      child.stderr.on('data', (chunk) => {
        errors += chunk;
      });
      child.on('error', fail);
      child.on('exit', (code, signal) =>
        code === 0 ? done() : fail(new Error(`${signal ?? code}: ${errors}`)),
      );
    });
    await assertNoTestServer();
    const report = JSON.parse(await readFile(path, 'utf8'));
    if (report.runtimeError) throw new Error(JSON.stringify(report.runtimeError));
    const result = {
      run,
      measuredAt: report.fetchTime,
      scores: Object.fromEntries(
        Object.entries(report.categories).map(([key, value]) => [key, value.score * 100]),
      ),
      metrics: Object.fromEntries(
        [
          'first-contentful-paint',
          'largest-contentful-paint',
          'total-blocking-time',
          'cumulative-layout-shift',
        ].map((key) => [key, report.audits[key].numericValue]),
      ),
    };
    measurements.push(result);
    process.stdout.write(`${JSON.stringify(result)}\n`);
  }
  const passed = measurements.every((result) => result.scores.performance > 90);
  await writeFile(
    resolve(directory, 'summary.json'),
    `${JSON.stringify(
      {
        ...metadata,
        measurements,
        passed,
        threshold: 'Every run must exceed 90; no best-run selection',
        limitation: 'Local synthetic measurements, not field Core Web Vitals or a device guarantee',
      },
      null,
      2,
    )}\n`,
  );
  if (!passed) process.exitCode = 1;
} finally {
  server.kill('SIGTERM');
  await new Promise((done) => (server.exitCode !== null ? done() : server.once('exit', done)));
}
