# Development context

## Purpose

Persist architecture, domain decisions, implementation status, and handoffs.
Read this file before making development changes.

## Current status

Steps 2–4 are implemented as a runnable Next.js application with pinned dependencies and
`package-lock.json`. The client handles birth input and calculations; server-rendered annual
pages and server-generated OpenGraph PNGs handle public SEO. PostgreSQL remains a design proposal.
There is no account storage, AI integration, PWA service worker or database migration yet.

## References

- `architecture.md`: exact planned source tree, module boundaries, delivery sequence.
- `data-models.md`: calculation inputs/outputs, catalogs, rule provenance and validation.
- `schema.sql`: proposed PostgreSQL persistence model; not an applied migration.
- `implementation.md`: actual implementation, supported scope, commands and known limitations.
- `font-assets.md`: local font derivatives, licenses and reproducibility.
- `../test/README.md`: verification status and acceptance gates.

## Decisions

- Next.js App Router + strict TypeScript, Tailwind CSS, Framer Motion, React Context.
- A modular monolith first; pure calendar/astrology modules independent of React and storage.
- PostgreSQL for catalogs and opt-in persistence, planned Prisma integration.
- Local, anonymous calculation first; saving and sharing are explicit actions.
- Engine output and AI interpretation are distinct, versioned artifacts.

## Next action

Review the selected Zi Wei profile against expert-authored Vietnamese chart fixtures before claiming
school-specific production accuracy. Extend unsupported Vietnamese/Chinese lunar-month differences
through a verified engine adapter rather than silently normalizing dates. Persistence, AI and PWA
are separate implementation phases; do not advertise them as available.

## Remaining domain decisions

The UI now explicitly selects leap-month splitting (default day 15) and late Tý boundaries
(default civil midnight). The current calendar is the Vietnamese tabular calendar, not an IANA
historical-timezone engine. Star dignity and placements come from iztro's default configuration.
Expert school validation, historical offsets, annual prediction/scoring and birth-time rectification
remain unresolved. See `implementation.md` for the supported reference profile.
