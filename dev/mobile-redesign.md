# Mobile-first competitor-informed UI refinement

Base: `8da6ed0`. No engine/calendar/knowledge-rule, reading artifact, profile,
fixture, dependency or database changes. Reading knowledge expansion is research
only per the user's authorization; see `../design/competitor-mobile-review.md`.

## Implemented

- Short mobile hero, quieter decorative content, mobile header links to existing
  public tools. Hero copy describes actual free local lookup rather than promising
  predictions. Existing anonymous form and unknown-time validation remain intact.
- Explicit result navigation opens the native full-chart details before navigating
  to it; reading and consented profile sections have stable local anchors. No birth
  information is added to the URL. Links do not imply auto-save or private sharing.
- Editorial reading styling: dark gold-accented header, actual Mệnh/Thân anchor,
  readable paper body, numbered thematic cards, expandable evidence/exercises,
  compact present-context summary with full age/decade/year definitions on demand.
  No new conclusion is inferred from the added chart anchor.
- Palace navigator has twelve native buttons with aria-pressed state. It selects
  the existing palace and, on mobile/tablet, focuses and scrolls to the explanatory
  aside. The aside moves before chart cards visually; DOM/source/chart ordering and
  all twelve actual palaces remain. List is default <=500px. Grid mode remains.
- Mobile cards reduce duplicate star density. Minor stars are hidden in mobile
  preview cards only; all actual stars remain in the selected-palace all-stars
  expander. Star popup, focus restoration and raw classification remain unchanged.
- Contextual symbol glossary clarifies Vô chính diệu, Lợi and symbolic Trường Sinh
  names. These definitions are UI explanations, not new predictive rules.
- Print hides navigation and expands present/reading sections. Existing reduced
  motion, font-size switch, source evidence and local-profile consent are preserved.

## Limitations and handoff

This is not an independent astrology certification, new AI integration, annual
forecast, public deployment or retention A/B experiment. Public SEO routes and OG
remain unchanged; new routes/content clusters need a separate approved phase.
The public year/age pages need content-quality review before scale-out.

No analytics is added. Proposed event measurement must exclude names/birth inputs
and follow an agreed privacy/consent policy. Real device/user testing remains open.
See `../test/mobile-redesign.md` for executed checks rather than claiming the UI
is better than competitors or that Lighthouse/retention targets automatically pass.
