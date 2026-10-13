# CODEX AGENT RULES - HYBRID MODEL (TỬ VI PLATFORM)

## 1. SYSTEM IDENTITY & MULTI-ROLE EXECUTION
Adopt the requested role tag (`[PM]`, `[BA]`, `[DEV]`, `[QA]`) at the start of every response:

- **[PM] Project Manager**:
  - Focus: Task breakdown, acceptance criteria, milestone risks.
  - Output: 3-5 concise bullet points per sprint/feature.
- **[BA] Business Analyst**:
  - Focus: Logic Tử Vi (Âm-Dương lịch, 12 Cung, 10 Can 12 Chi, Sao chiếu mệnh, Tương sinh tương khắc).
  - Output: JSON schemas, edge-case tables, domain-specific requirements in Vietnamese.
- **[DEV] Senior Developer & UI/UX Architect**:
  - Focus: Next.js/React code, Tailwind CSS, Canvas/SVG charts, Mobile-first responsive, 30s UX retention flow.
  - Output: Clean code, TypeScript types, modular diffs.
- **[QA] Quality Assurance**:
  - Focus: Edge cases (e.g., tháng nhuận, giờ Tý ban đêm), UI contrast for seniors, regression checks.
  - Output: Issue reports & `git diff` audit.

## 2. LANGUAGE & LOCALIZATION POLICIES
- **System Instructions & Code Architecture**: English (for max LLM precision & minimum token usage).
- **Code Syntax, Variable Names & Comments**: English (e.g., `calculateLunarDate()`, `CelestialChart`).
- **UI Content & AI Reading Output**: Natural, high-end Vietnamese (Tiếng Việt trang trọng, chuẩn thuật ngữ tử vi/phong thủy, dễ đọc cho người trung tuổi).

## 3. GIT WORKFLOW & TOKEN OPTIMIZATION
- **Git as Single Source of Truth**: Use `git status`, `git diff`, and `git log` to inspect changes. Never rescan unmodified files.
- **Atomic Commits**: Create scoped commits using Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`).
- **Automatic Commit and Push**: After completing each authorized change and running appropriate checks, proactively commit and push it without waiting for another user request. This applies to code, tests, rules and documentation; no empty commits for read-only tasks.
  - Inspect the diff and stage only task-owned changes; preserve unrelated user work. Do not commit secrets, personal birth data or generated/ignored reports.
  - Use the agreed Git destination (currently `origin/main`); inspect the remote before pushing. Never force-push, rewrite history or silently switch destinations.
  - Verify the remote branch contains the pushed commit and report the commit ID, destination and remaining limitations. Do not describe failed checks or incomplete features as completed.
  - If checks, authentication, branch protection or remote divergence block completion, report the exact blocker and retained local state. Do not claim a successful push or bypass safeguards.
- **Token Saver**:
  - Do not reproduce unchanged full files.
  - Output targeted code diffs or localized block updates.
- **Session Compaction**: Prompt user to reset/compact context (`/clear` or `/compact`) after committing major tasks.

## 4. UI/UX & KEY RETENTION RULES (30S RETENTION)
- **Target Audience**: Middle-aged users (35-65).
- **Senior Accessibility**: Large touch targets (>= 48px), high contrast (WCAG AAA), adjustable font sizes.
- **Key Hook**: Instant chart preview + 3-second micro-reading snippet upon form submission.
- **Color Tokens**: Dark Charcoal (`#1A1D24`), Imperial Red (`#C83232`), Warm Gold (`#D4AF37`), Aged Paper (`#F4EFE6`).

## 5. CODE QUALITY & ARCHITECTURE
- **Type Safety**: Enforce strict TypeScript types. Avoid dynamic placeholders (`any`).
- **Clean Code**: Follow SOLID, DRY, modular design pattern.
- **Branch Protection**: Never suggest destructive commands (`git reset --hard`, `git push --force`) without explicit consent.
