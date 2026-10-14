# HV-K02B/K03A2/K04A — Knowledge phase execution

Ngày: 14/10/2026. Baseline: `origin/main@9a16b73`. Product Owner nghiệm thu K02/K03
ở mức nghiên cứu/prototype và cho phép ba luồng giới hạn dưới đây. Không kết quả nào
tự thay đổi calculation profile, mở rule production hoặc tạo claim luận giải mới.

## Dependency và ưu tiên

`K02B || K03A2 → PM review → K04A dependency review → PO review`.

- K02B và K03A2 có ưu tiên cao hơn K04A và có thể chạy song song.
- K04A chỉ prototype hai rule phương pháp K03A đã tồn tại. Nó không phụ thuộc vào
  kết quả chưa tích hợp của K03A2 và phải ghi blocker nếu vocabulary/profile chưa đủ.
- Rule specification có nguồn của BA/Research là điều kiện trước mọi reasoning
  production. Prototype evaluator không phải sự phê duyệt rule.

## Worktree và ownership

| Task  | Branch / worktree                                                | Exclusive files                                                                                                                                          |
| ----- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| K02B  | `task/hv-k02b-calculation-disagreement` / `/workspace/tuvi-k02b` | `dev/calculation-k02b-disagreement-report.md`, `test/calculation-k02b-observations.json`, `test/calculation-k02b-reproduction.md`                        |
| K03A2 | `task/hv-k03a2-domain-depth` / `/workspace/tuvi-k03a2`           | `dev/knowledge-k03a2-passages.json`, `dev/knowledge-k03a2-rules-candidate.json`, `dev/knowledge-k03a2-report.md`, `test/knowledge-k03a2-rule-cases.json` |
| K04A  | `task/hv-k04a-rule-prototype` / `/workspace/tuvi-k04a`           | `dev/knowledge-k04a-rule-prototype.md`, `dev/knowledge-k04a-rule-prototype.json`, `test/knowledge-k04a-rule-cases.json`                                  |

PM owns the shared registry, integration report, README/status updates and the only
push to `origin/main`. Task sessions must not edit `src/`, production dependencies,
the calculation profile, shared registry or another task's files.

## Acceptance gates

### K02B

1. Reproduce the `1985-03-21` disagreement with pinned algorithms, timezone and
   convention inputs; separate astronomical fact, calendar rule and profile policy.
2. Record source/implementation lineage and rights. Agreement by count is not an oracle.
3. Search for a genuinely independent full-chart family with a comparable profile;
   otherwise return a documented blocker rather than a golden fixture.
4. Keep `lasotuvi` reference-only and `@dqcai/vn-lunar` blocked.

### K03A2

1. Every passage has a stable locator, revision/edition, rights/access state,
   source family and bounded quotation/paraphrase separation.
2. Every candidate method rule declares premises, predicates, profile, conditions,
   exceptions, conflicts, refusal state and proposed tests.
3. Do not infer reader behavior, occupation or outcome, and do not treat volumes of
   the same textual lineage as independent confirmation.

### K04A

1. Use only `k03a-career-context-order-001` and
   `k03a-empty-menh-tai-quan-001`, with their original candidate status.
2. Model candidate/fired/rejected, missing evidence, exclusions, conflicts and
   fail-closed inference trace through the K03B prototype vocabulary.
3. Create no reader-facing claim, weight, production runtime or `src/` change.
4. Tests demonstrate deterministic positive/negative/missing/conflicting structural
   paths without treating mock facts as Tử Vi oracle data.

## Stop conditions

- A disagreement without enough convention/profile evidence remains unresolved.
- Missing or ambiguous domain vocabulary blocks firing; it is not filled by guesswork.
- Any production rule approval, calculation-profile change, paid source or admission
  of a golden fixture returns to Product Owner review.
