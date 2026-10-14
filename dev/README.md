# Development context

## Purpose

Persist architecture, domain decisions, implementation status, and handoffs.
Read this file before making development changes.

## Current status

Steps 2–4 are implemented as a runnable Next.js application with pinned dependencies and
`package-lock.json`. The client handles birth input and calculations; server-rendered annual
pages and server-generated OpenGraph PNGs handle public SEO. PostgreSQL remains a design proposal.
There is no account storage, AI integration, PWA service worker or database migration yet.
General/detailed reference interpretation is now implemented locally using sourced fixed rules;
this is not live AI inference or independent expert sign-off.
Production now uses `nam-phai-chinese-lunar-v1` with Chinese lunar conversion,
explicit Southern Tứ Hóa and fixed leap/Tý rules; see `nam-phai-implementation.md`.
The former Vietnamese v2 profile is archived for its original corpus/audit. Its
1950–2026 results (28,124 bridge tuples and 10,900 selected charts) do not validate
the new profile; see `../test/calendar-remediation.md` for historical evidence.

## References

- `reading-vnext-architecture.md`: audit HV-R01, contract Reading Brief, Rule
  Matrix và thứ tự triển khai. Kế hoạch chờ phê duyệt, không phải API/AI đang chạy.

- `career-reading-contract.md`, `career-reading-implementation.md`: nâng cấp
  Công việc bằng kết nối biểu tượng có nguồn; không mở quy tắc tổ hợp cổ hoặc
  dự báo. Kết quả kiểm tra được ghi riêng tại `../test/career-reading.md`.

- `../design/nam-phai-transition.md`: latest product direction is one Nam Phai
  profile with Chinese leap handling. BA/specialist define exact rules before DEV migration.
- `nam-phai-source-decision.md`, `nam-phai-migration-spec.md`,
  `nam-phai-implementation.md`: specialist/BA decisions and actual implementation;
  final checks are in `../test/nam-phai-migration.md`.
- `competitor-chart-intake.md`: four actually observed external charts and scoped
  comparison, not independent Nam Phái certification or engine-generated answers.

- `thematic-exercises.md`: v6 separates work, finance and relationship exercises
  by admitted group state and shows the conditional action in the first reading.

- `source-registry.md`, `source-registry.json`: reviewed admission records and
  offline `audit:sources`; no new oracle fields or star activation.
- `catalogue-verification.md`: actually read title leaf and institutional catalogue
  leads; historic-copy identity still pending. `published-chart-intake.md` sets
  the contract for future genuinely external worked-chart candidates.

- `source-corpus-intake.md`: expanded partial-source corpus and stricter intake;
  smaller initial mobile payload but >90 remains unstable. Source artifact
  crosscheck and unresolved edition/Khôi–Việt differences: `source-crosscheck.md`.

- `reading-synthesis.md`: v5 đánh giá điều kiện, giữ bằng chứng theo cung gốc và
  kết hợp hai nhóm đã mở; không giả lập tín hiệu đối nghịch hoặc mở luận vận.

- `mobile-redesign.md`: mobile result navigation, editorial reading surface and palace chooser;
  source/calculation rules are unchanged. Research: `../design/competitor-mobile-review.md`.

- `pm-priorities.md`: nội dung v4, hành trình mobile ngắn, xử lý giờ chưa biết và tối đa 10 hồ sơ lưu cục bộ bằng đồng ý rõ ràng; không có đồng bộ tài khoản.

- `ui-content-upgrade.md`: popup/navy-gold, UI sạch nhãn kỹ thuật, chủ đề xuyên cung và dữ kiện hiện tại; không mở dự báo hay Phi Hóa.

- `knowledge-implementation.md`: current v2 reading, source registry, contextual gates and partial-fixture diff.
- `knowledge-source-review.md`: pinned passages and manual derivations for milestones 2–3.

- `architecture.md`: exact planned source tree, module boundaries, delivery sequence.
- `data-models.md`: calculation inputs/outputs, catalogs, rule provenance and validation.
- `schema.sql`: proposed PostgreSQL persistence model; not an applied migration.
- `implementation.md`: actual implementation, supported scope, commands and known limitations.
- `calendar-remediation.md`: current calendar patch, isolated v2 engine seam and verification scope.
- `font-assets.md`: local font derivatives, licenses and reproducibility.
- `ai-interpretation-research.md`: researched AI/open-weight options, quality gates and proposed
  interpretation architecture; not an approved implementation or spending decision.
- `interpretation-implementation.md`: actual local general/detailed reading implementation and checks.
- `interpretation-sources.md`: researched classical passages, rights, safe scope and source conflicts.
- `../design/chart-validation-plan.md`: proposed calendar remediation options, expert review
  milestones, responsibilities and release gates; not implemented or signed off.
- `../test/README.md`: verification status and acceptance gates.
- `../test/tech-audit.md`: authorized RUN_TECH_AUDIT scope, reproduction and diagnostic findings;
  original audit, followed by the authorized patch in `calendar-remediation.md`; no expert sign-off.

## Decisions

- Next.js App Router + strict TypeScript, Tailwind CSS, Framer Motion, React Context.
- A modular monolith first; pure calendar/astrology modules independent of React and storage.
- PostgreSQL for catalogs and opt-in persistence, planned Prisma integration.
- Local, anonymous calculation first; saving and sharing are explicit actions.
- Engine output and AI interpretation are distinct, versioned artifacts.

## Next action

Latest authorization covers knowledge standardization and deeper contextual readings.
Bounded implementation: two active auxiliary pairs, Tử Vi with support, Mệnh–Thân,
four-palace context and why/evidence. Khôi–Việt remains deferred; active syntheses are
editorial reference, not certified prediction. The expanded 36 partial cases are not complete
golden charts. Expand independent sources before deferred rules/named formations;
see `knowledge-implementation.md` and `../test/knowledge-validation.md`.

Review the selected Zi Wei profile against expert-authored Vietnamese chart fixtures before claiming
school-specific production accuracy. The archived v2 engine integrates a Vietnamese calendar seam;
see `calendar-remediation.md`. Invalid dates are still rejected. Persistence, AI and PWA
are separate implementation phases; do not advertise them as available.

The user requested documenting the retention roadmap and researching high-quality interpretation
before deciding on further coding. Do not start AI integration or paid experiments from these proposals.
See `../design/retention-roadmap.md` and `ai-interpretation-research.md` for the pending decisions.

The later RUN_TECH_AUDIT request authorizes the audit scripts and regression checks for
1950–2026. It does not yet authorize a production engine replacement or fabricated golden charts.

The latest user authorization enables AI-assisted research and a bounded reference-reading feature.
The later user request prioritizes calendar remediation; see `calendar-remediation.md`.
The reference feature is implemented; it does not constitute human expert certification, authorization
to fabricate golden data or selection of a paid external AI provider.

## Remaining domain decisions

Latest user decision supersedes the selectable-profile description below: BA and
specialist selected `nam-phai-chinese-lunar-v1`, Chinese lunar conversion, fixed
split-at-15 placement and full next-day rollover at 23:00. See
`nam-phai-source-decision.md` and `nam-phai-migration-spec.md`; implementation and
QA are recorded separately. The Vietnamese profile remains archival regression
evidence, not an alternative school offered in the current product.

Historical birth-place offsets, DST/true-solar-time correction, independent full
school validation, annual prediction/scoring and birth-time rectification remain
outside the selected application profile. Old `implementation.md` records the
previous Vietnamese-calendar implementation and does not certify the new profile.
