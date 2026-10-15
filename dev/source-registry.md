# Reviewed source registry — milestone A

## Consolidated source boundary

There are two deliberately separate registry families. `source-registry.json`
and its validator describe reviewed runtime admission. The
`knowledge-source-registry.{json,schema}` family records research candidates.
Candidate, blocked, source-backed and approved states retain their existing
meaning and are never promoted by documentation consolidation. Source, artifact,
passage and rule IDs, rights/access state, hashes, locators and retained lawful
excerpts stay in the machine artifacts.

No source inventory, catalogue hit, partial scan, competitor observation or
methodology-only rule directly licenses a personalized claim. Independent lineage,
school/profile compatibility, substantive passage, stated conditions/exceptions,
and the relevant admission gate are required. K03A3 yielded no usable substantive
rule; K03A4 provides one trace-only source classification candidate. HV-K05 adds
three bounded Quan Lộc candidates in `knowledge-k05-quan-loc-candidates.json`,
all from the same unresolved textual family: they are research records, not
runtime or K04B authorization. Paid or permissioned material requires PO approval
of price, licence and allowed use before acquisition.

HV-K06 additionally normalizes bounded source-backed vocabulary for twelve
palaces, fourteen major-star candidates, selected auxiliary families, state/aspect
terms and methodology. `knowledge-k06-foundation.json` is a research catalog; its
IDs may support future graph/DSL design, but unresolved profile geometry, state
tables and transformation variants remain blocked from runtime use.

The consolidated historical provenance covers bibliographic catalogue checks,
classical-passage review, corpus intake/crosscheck, K01 inventory and K03A–K06
research. Full detail remains recoverable from the HV-M01 predecessor paths in
Git; this contract and the JSON artifacts are the active entry point.

Baseline `9831010`; registry version `source-admission-2026-10-13-v1`.
This is source governance for partial chart comparisons, not new reading content.

## Implemented contract

`source-registry.json` records four **source entries**, not four independent books:

- One pinned transcription allowed for the existing partial-source corpus.
- One pinned transcription allowed as a reading reference only.
- Two crosscheck-only entries for separate leaves of the **same** Archive artifact.
  Four downloaded image digests include cover, title leaf and leaves 72/74.

Six canonical excerpts record exact heading/text and allowed expected field paths.
The existing corpus still has 36 partial cases / 218 fields and zero complete
golden charts. Entry status names describe usage permission, not reliability scores.
No independent textual editions are certified by this registry.

`scripts/source-admission.ts` checks the reviewed registry separately from corpus
declarations. `assertIndependentOrigins` invokes it before the engine can compare:

1. Document ID, URL and pinned revision must match an admitted partial source.
2. Every passage ID, source ID, heading and quotation must exactly match the
   reviewed record. Fixture edits cannot self-approve replacement text.
3. Each expected field needs an allowed referenced passage. Existing stricter
   literal Cục/Tử Vi and non-leap/known-hour scope gates remain unchanged.
4. Facsimile artifacts are restricted to crosschecking even if their status is
   altered; reading-only sources cannot become placement answers by fixture claims.
5. Invalid/duplicate artifact metadata, unsafe URLs and unsupported complete-chart
   or independent-edition declarations fail this bounded registry version.

The registry itself is Git-reviewed configuration, not untrusted runtime input.
A deliberate reviewed edit can change admission; it needs evidence, a version
change and tests. Exact string equality is not remote verification or proof a
quote is correct. The source gate has no engine calls, network fetches or output
generation. It does not activate rules in `src/domain/interpretation/knowledge.ts`.

## Reproducible offline audit

```sh
npm run audit:sources
npm run audit:sources -- --artifact scan-leaf-72 /tmp/tuvi-source-page72.jpg
```

The first command checks registry/corpus admission metadata only. Explicit
`--artifact <registered-id> <local-file>` triples additionally check downloaded
bytes; absent files are not claimed checked. No network fetch, OCR or scan
redistribution occurs. Inputs are read-only, limited to individual files up to
20 MiB. Unknown/duplicate artifact IDs, invalid arguments or a digest mismatch
fail the command; mismatches appear in the generated report.

The ignored `test-results/source-registry/report.json` includes revision/dirty
state, registry/corpus SHA-256, checked artifact IDs and remaining limitations.
The audit writes only its own ignored build/report outputs, never expectations.
CLI output distinguishes a passing metadata audit from how many artifacts were
actually hashed. Matching image bytes cannot promote a source, authenticate an
edition or establish predictive validity.

## Bibliographic handoff

The consolidated catalogue research reads the title leaf's
南陽堂 imprint. It does not verify date 1600, historical authorship or institutional
copy identity. Three modern NDL catalogue records are leads, not content already
reviewed or admitted complete charts. The official Digital Archives service
returned 403; NIJL bounded searches did not establish the historic-copy match.

Keep publisher observations, volume-number differences, Khôi/Việt mnemonics and
leap-policy conflicts in the research record. Acquire lawful published chart
evidence under the published-chart intake contract in `calculation-spec.md` before new
expected fields or star groups. Current status: A remains in progress; C and D
remain blocked/planned as recorded in
[PM status](../design/pm-milestone-status.md).
