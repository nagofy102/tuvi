# Application architecture — Step 1

## Delivery scope

This document preserves the Step 1 target architecture. Steps 2–4 now have working source;
see `implementation.md` for the actual modules. The following tree includes future areas such as
database/auth/AI/PWA; their presence in this plan does not mean those features are implemented.

```text
tuvi/
├── AGENTS.md
├── RULE_BASE.md
├── README.md
├── design/
│   ├── README.md
│   └── product-spec.md
├── dev/
│   ├── README.md
│   ├── architecture.md
│   ├── data-models.md
│   └── schema.sql
├── test/
│   └── README.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── manifest.ts
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── la-so/page.tsx
│   │   ├── lich-am-duong/page.tsx
│   │   ├── [annualPath]/[slug]/page.tsx
│   │   ├── [annualPath]/[slug]/opengraph-image.tsx
│   │   ├── chia-se/[token]/page.tsx
│   │   └── api/
│   │       ├── charts/route.ts
│   │       ├── charts/[id]/route.ts
│   │       ├── readings/route.ts
│   │       └── shares/route.ts
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── birth-form/
│   │   ├── horoscope/
│   │   ├── accessibility/
│   │   └── almanac/
│   ├── features/
│   │   ├── chart/
│   │   ├── reader/
│   │   ├── sharing/
│   │   └── export/
│   ├── domain/
│   │   ├── calendar/{types,solar,lunar,time,validation}.ts
│   │   └── astrology/{types,sexagenary,palaces,stars,cycles,calculate}.ts
│   ├── data/
│   │   ├── catalogs/
│   │   ├── rule-profiles/
│   │   └── editorial/
│   ├── lib/
│   │   ├── validation/
│   │   ├── seo/
│   │   ├── export/
│   │   └── server/{db,auth,ai,rate-limit}.ts
│   └── providers/preferences-provider.tsx
├── prisma/{schema.prisma,migrations/,seed.ts}
├── public/{icons/,fonts/,textures/,sw.js}
├── tests/{unit/,integration/,e2e/,fixtures/}
└── package.json + lockfile + framework/test configuration
```

The filesystem route `app/[annualPath]/[slug]/page.tsx` validates `annualPath` against
`^tu-vi-nam-[0-9]{4}$` and unsupported combinations returning `notFound()`.
Its colocated `opengraph-image.tsx` uses the same validation and editorial record.

## Boundaries and data flow

1. Form validates civil/lunar input, timezone, leap flag and supported range.
2. Calendar module normalizes to solar and lunar dates; rejects ambiguous/invalid dates.
3. Astrology engine takes normalized input plus an immutable, reviewed rule profile.
4. Engine computes stems/branches, Mệnh/Thân, cục, twelve palaces, stars and cycles.
5. UI immediately displays the result; AI is a separate optional asynchronous request.
6. Only explicit saving writes a chart. Shares reference a sanitized presentation snapshot.

`domain/` must not import React, Next.js, database clients, environment variables or AI providers.
Ship the same deterministic engine to client/server where practical. Catalog loading stays outside
the calculation function. Client clock must not implicitly select an annual interpretation year.

Use server components for landing/editorial shells and metadata; client components only for forms,
palace interaction, preferences and animations. Add `server-only` to DB, auth and provider modules.
React Context stores display preferences; chart URL/state must not leak personal birth data.

## Database and access

PostgreSQL holds immutable versioned catalog entries, calculation profiles and opt-in chart snapshots.
Prisma is the planned application adapter; `schema.sql` is a specification to translate into tested
migrations when persistence is implemented, not a second migration authority.

No database or AI credentials are needed for Step 2's UI. Later, `DATABASE_URL` belongs in secure
environment configuration. AI provider/model and credentials will be selected during integration.
Do not include credentials in documentation, browser bundles or version control.

Persisted profiles require an authenticated owner. Anonymous calculations remain in memory.
Every read/write endpoint checks ownership; UUID unpredictability is not authorization.
Charts have twelve rows inserted transactionally and read back through validated domain contracts.
Published catalog/profile versions are append-only; use a new version for corrections.

## SEO, sharing and PWA

- `/tu-vi-nam-2026/tuoi-binh-dan-1986-nam-mang` resolves a reviewed editorial record,
  not a user's chart. Static generation is limited to supported records; no blank combinatorial pages.
- Use Article, BreadcrumbList and eligible FAQPage JSON-LD. Schema.org has no standard
  `Horoscope` type; do not emit an invented type or promise FAQ rich-result eligibility.
- Use `next/og`/ImageResponse for server-generated cards; Canvas is reserved for client exports.
- Private chart/API/share pages use appropriate noindex and cache controls; shares expire and can be revoked.
- Cache static assets/editorial content in the future service worker; never cache private API/AI responses.
- PNG/PDF export needs font embedding, Vietnamese text support and print-safe layouts; verify later.

## Implementation sequence

| Step | Deliverable | Completion evidence |
| --- | --- | --- |
| 1 | Architecture, domain model, persistence design | Document consistency review |
| 2 | Next.js landing page and 12-palace UI | Build, responsive/accessibility interaction checks |
| 3 | Verified lunar conversion and chart engine | Independent calendar vectors and expert-reviewed chart fixtures |
| 4 | Annual SEO pages and OG generator | Real route responses, metadata, JSON-LD and rendered cards |
| Later | Auth, saved charts, AI, almanac, exports, PWA, operations | Feature-specific tests and production readiness audit |

The four initial steps alone do not fulfill all production requirements. Deployment also needs
observability, backups/restore, retention/deletion, abuse controls, provider failures and security review.
