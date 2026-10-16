import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const acquisitionPath = path.join(root, 'dev/knowledge-k14-acquisition.json');
const pilotPath = path.join(root, 'dev/knowledge-k14-book-pilot.json');
const foundationPath = path.join(root, 'dev/knowledge-k06-foundation.json');

const parse = async (file) => JSON.parse(await readFile(file, 'utf8'));
const fail = (message) => {
  throw new Error(message);
};

function collectIds(value, ids = new Set()) {
  if (Array.isArray(value)) value.forEach((item) => collectIds(item, ids));
  else if (value && typeof value === 'object') {
    if (typeof value.id === 'string') ids.add(value.id);
    Object.values(value).forEach((item) => collectIds(item, ids));
  }
  return ids;
}

function pageNumbers(range) {
  const match = /^(\d+)(?:-(\d+))?$/.exec(range);
  if (!match) fail(`Invalid page range: ${range}`);
  const start = Number(match[1]);
  const end = Number(match[2] ?? match[1]);
  if (start > end) fail(`Reversed page range: ${range}`);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function requireFields(candidate) {
  for (const field of [
    'candidateId',
    'disposition',
    'knowledgeType',
    'bookId',
    'sourceLocator',
    'subjectIds',
    'conditions',
    'neutralStatement',
    'evidenceType',
    'limitations',
    'profileStatus',
    'duplicateAssessment',
  ]) {
    if (!(field in candidate)) fail(`${candidate.candidateId ?? 'candidate'} missing ${field}`);
  }
  if (candidate.disposition === 'REVIEW' && !candidate.reviewReason)
    fail(`${candidate.candidateId} missing reviewReason`);
}

const [acquisition, pilot, foundation] = await Promise.all([
  parse(acquisitionPath),
  parse(pilotPath),
  parse(foundationPath),
]);

const candidates = [...pilot.candidates, ...acquisition.candidates];
const candidateIds = candidates.map((candidate) => candidate.candidateId);
if (new Set(candidateIds).size !== candidateIds.length) fail('Duplicate candidate ID');

const foundationIds = collectIds(foundation);
for (const candidate of acquisition.candidates) {
  requireFields(candidate);
}
for (const candidate of candidates) {
  for (const subjectId of candidate.subjectIds) {
    if (!foundationIds.has(subjectId))
      fail(`${candidate.candidateId} has unresolved subject ${subjectId}`);
  }
}

const normalized = new Map();
for (const candidate of candidates) {
  const statement = candidate.neutralStatement.toLocaleLowerCase('vi').replace(/\s+/gu, ' ').trim();
  const previous = normalized.get(statement);
  if (previous) fail(`Exact normalized statement duplicate: ${previous}, ${candidate.candidateId}`);
  normalized.set(statement, candidate.candidateId);
}

const expectedPages = new Map([
  ['book-k14-tan-bien', 277],
  ['book-k14-tong-hop', 442],
]);
const ledgerIds = new Set();
for (const [bookId, expected] of expectedPages) {
  const seen = new Map();
  for (const entry of acquisition.acquisitionLedger.filter((item) => item.bookId === bookId)) {
    if (ledgerIds.has(entry.rangeId)) fail(`Duplicate ledger ID: ${entry.rangeId}`);
    ledgerIds.add(entry.rangeId);
    for (const page of pageNumbers(entry.pdfPages)) {
      const previous = seen.get(page);
      if (previous) fail(`Ledger overlap ${bookId} p.${page}: ${previous}, ${entry.rangeId}`);
      seen.set(page, entry.rangeId);
    }
  }
  for (let page = 1; page <= expected; page += 1) {
    if (!seen.has(page)) fail(`Ledger gap ${bookId} p.${page}`);
  }
  if (seen.size !== expected) fail(`Ledger page total mismatch for ${bookId}`);
}

for (const [key, batch] of Object.entries(acquisition).filter(([key]) => /^batch\d+$/u.test(key))) {
  for (const rangeId of batch.ranges) {
    if (!ledgerIds.has(rangeId)) fail(`${key} references missing ledger range ${rangeId}`);
  }
}
for (const rangeId of acquisition.resumeCheckpoint.completedOrReadReviewRanges) {
  if (!ledgerIds.has(rangeId)) fail(`Checkpoint references missing ledger range ${rangeId}`);
}

for (const book of acquisition.books) {
  const fileName =
    book.bookId === 'book-k14-tan-bien'
      ? 'Tử Vi Đầu Số Tân Biên - Vân Đằng Thái Thứ Lang - thienco.vn.pdf'
      : 'tu vi tong hop-nguyen-phat-loc.pdf';
  const digest = createHash('sha256')
    .update(await readFile(path.join(root, 'book', fileName)))
    .digest('hex');
  if (digest !== book.fileSha256) fail(`PDF hash mismatch for ${book.bookId}`);
}

const disposition = Object.fromEntries(
  ['ACCEPT_AS_RESEARCH', 'MERGE', 'REVIEW', 'REJECT'].map((status) => [
    status,
    candidates.filter((candidate) => candidate.disposition === status).length,
  ]),
);
const primaryBookIds = new Set(['book-k14-tan-bien', 'book-k14-tong-hop']);
const primaryCandidates = candidates.filter((candidate) => primaryBookIds.has(candidate.bookId));
const primaryDisposition = Object.fromEntries(
  ['ACCEPT_AS_RESEARCH', 'MERGE', 'REVIEW', 'REJECT'].map((status) => [
    status,
    primaryCandidates.filter((candidate) => candidate.disposition === status).length,
  ]),
);
const ledgerStatus = Object.fromEntries(
  ['COMPLETED', 'PENDING', 'REVIEW', 'BLOCKED', 'EXCLUDED'].map((status) => [
    status,
    acquisition.acquisitionLedger
      .filter((entry) => entry.status === status)
      .reduce((total, entry) => total + pageNumbers(entry.pdfPages).length, 0),
  ]),
);

console.log(
  JSON.stringify(
    {
      result: 'PASS',
      candidates: candidates.length,
      disposition,
      primaryCandidates: primaryCandidates.length,
      primaryDisposition,
      ledgerPages: ledgerStatus,
      checkedPdfHashes: acquisition.books.length,
    },
    null,
    2,
  ),
);
