# Domain contracts and persistence models

These are Step 1 target contracts for the full persistence-backed application. The current
reference calculation types are in `src/domain/astrology/types.ts`; implementation scope and
differences (Vietnam calendar, 1900–2099 range, school validation) are in `implementation.md`.
No chart from the current reference profile is promoted to an expert-reviewed production profile.

## Representation conventions

- Use stable English identifiers, Vietnamese labels, strict TypeScript and runtime validation.
- Dates are civil `{ year, month, day }` objects, not midnight UTC `Date` conversions.
- Time is local wall-clock `{ hour, minute }` plus an IANA timezone; default UI timezone is
  `Asia/Ho_Chi_Minh`, explicitly confirmed by the user. Do not infer timezone from language.
- Initial intended birth range: 1900–2100 inclusive; release only the range validated against
  independent references. This range is a product limit, not a claim of calendar accuracy.
- Branch indices are Tý=0, Sửu=1, Dần=2, Mão=3, Thìn=4, Tỵ=5, Ngọ=6, Mùi=7,
  Thân=8, Dậu=9, Tuất=10, Hợi=11. Stem indices are Giáp=0 through Quý=9.
- Display cell coordinates are independent of branch indices; never use grid position as palace identity.

## TypeScript contracts (specification; not implemented code)

```ts
type Element = 'wood' | 'fire' | 'earth' | 'metal' | 'water';
type Stem = 'giap' | 'at' | 'binh' | 'dinh' | 'mau' | 'ky' | 'canh' | 'tan' | 'nham' | 'quy';
type Branch = 'ty' | 'suu' | 'dan' | 'mao' | 'thin' | 'ti' | 'ngo' | 'mui' | 'than' | 'dau' | 'tuat' | 'hoi';
type TraditionalGender = 'male' | 'female';
type PalaceKind = 'menh' | 'phu_mau' | 'phuc_duc' | 'dien_trach' | 'quan_loc' | 'no_boc'
  | 'thien_di' | 'tat_ach' | 'tai_bach' | 'tu_tuc' | 'phu_the' | 'huynh_de';
type Dignity = 'mieu' | 'vuong' | 'dac' | 'binh' | 'ham' | 'unclassified';
type Transformation = 'hoa_loc' | 'hoa_quyen' | 'hoa_khoa' | 'hoa_ky';

interface CivilDate { year: number; month: number; day: number }
interface LunarDate extends CivilDate { isLeapMonth: boolean }
interface LocalTime { hour: number; minute: number }
type BirthInput = {
  displayName?: string;
  time: LocalTime;
  timeZone: string;
  timeDisambiguation?: 'earlier' | 'later' | 'reject'; // Default reject; ask when needed
  traditionalGender: TraditionalGender;
} & (
  | { calendar: 'solar'; date: CivilDate }
  | { calendar: 'lunar'; date: LunarDate }
);

interface NormalizedBirth {
  solar: CivilDate;
  lunar: LunarDate;
  time: LocalTime;
  timeZone: string;
  utcOffsetMinutes: number;
  resolvedInstant: string;
  traditionalGender: TraditionalGender;
  hourBranch: Branch;
}

interface SourceReference {
  id: string;
  title: string;
  locator: string; // URL or bibliographic/page reference
}

interface RuleProfile {
  id: string;
  version: string;
  status: 'draft' | 'reviewed';
  school: string;
  calendarAlgorithmVersion: string;
  catalogVersion: string;
  supportedBirthYears: { min: number; max: number };
  timezonePolicy: 'iana_at_birth';
  leapMonthPolicyId: string;
  ziDayBoundaryPolicy: 'civil_midnight' | 'start_of_zi';
  palacePlacementRuleId: string;
  starPlacementRuleId: string;
  cycleRuleId: string;
  dignityTableVersion: string;
  sources: readonly SourceReference[];
  contentHash: string;
}

interface StarDefinition {
  id: string;
  catalogVersion: string;
  nameVi: string;
  category: 'major' | 'auxiliary' | 'cycle' | 'transformation';
  element: Element | null; // Some catalog classifications depend on the school
  polarity: 'yang' | 'yin' | 'mixed' | 'unspecified';
  descriptionVi: string;
  sourceIds: readonly string[];
}

interface StarPlacement {
  starId: string;
  layer: 'natal' | 'decade' | 'annual';
  periodKey: string; // Runtime: natal, decade:age-start:age-end, or annual:YYYY
  dignity: Dignity;
  transformations: readonly Transformation[];
  ruleId: string;
  sourceIds: readonly string[];
}

interface Palace {
  kind: PalaceKind;
  branch: Branch;
  stem: Stem;
  isBodyPalace: boolean; // Thân is attached to a palace, not a thirteenth palace
  stars: readonly StarPlacement[];
}

interface FortunePeriod {
  kind: 'decade' | 'annual';
  palaceBranch: Branch;
  startAge: number;
  endAge: number;
  startYear: number;
  endYear: number;
  ageConvention: 'nominal_lunar' | 'completed_solar';
  ruleId: string;
}

interface ChartResult {
  schemaVersion: 1;
  input: NormalizedBirth;
  calculationContext: {
    effectiveLunarDate: CivilDate;
    effectiveSolarDate: CivilDate;
    appliedAdjustmentRuleIds: readonly string[];
  }; // School-specific calculation dates; never replace the real birth dates
  provenance: {
    ruleProfileId: string;
    ruleProfileVersion: string;
    engineVersion: string;
    catalogVersion: string;
    inputHash: string;
  };
  birthYear: { stem: Stem; branch: Branch; polarity: 'yin' | 'yang' };
  napAm: { id: string; nameVi: string; element: Element };
  cuc: { element: Element; number: 2 | 3 | 4 | 5 | 6 };
  destinyRulerStarId: string;
  bodyRulerStarId: string;
  cycleDirection: 'forward' | 'reverse';
  palaces: readonly Palace[];
  periods: readonly FortunePeriod[];
  warnings: readonly string[];
}

type CalculationOutcome =
  | { ok: true; chart: ChartResult }
  | { ok: false; code: 'INVALID_DATE' | 'INVALID_LEAP_MONTH' | 'AMBIGUOUS_TIME'
      | 'UNSUPPORTED_RANGE' | 'UNREVIEWED_RULE_PROFILE'; messageVi: string };

interface FortuneAssessment {
  targetYear: number;
  scoringModelVersion: string;
  scores: {
    wealth: number;
    career: number;
    relationship: number;
  }; // Runtime: 0..100; interpretive indices, not event probabilities
  evidenceRuleIds: readonly string[];
  sourceIds: readonly string[];
}
```

`calculateChart(normalized, profile, catalogs)` is a pure deterministic function.
No names, current time, network calls or randomness affect the result. Hash canonical input,
profile and engine version server-side when persisted; never use personal-input hashes in public URLs.
The profile needs actual registered policy implementations, not just nonempty policy strings.
`periodKey` must agree with the layer and calculated period; records for different annual/decade
layers cannot collapse into a single star placement. Validate these strings before persistence.

## Catalogs and invariants

Twelve palace labels in domain order: Mệnh, Phụ Mẫu, Phúc Đức, Điền Trạch, Quan Lộc,
Nô Bộc, Thiên Di, Tật Ách, Tài Bạch, Tử Tức, Phu Thê, Huynh Đệ.
This list does not determine direction around the chart; the reviewed placement rule does.

The fourteen major-star identifiers are `tu_vi`, `thien_co`, `thai_duong`, `vu_khuc`,
`thien_dong`, `liem_trinh`, `thien_phu`, `thai_am`, `tham_lang`, `cu_mon`, `thien_tuong`,
`thien_luong`, `that_sat`, `pha_quan`. This is an intended catalog inventory,
not a seed of verified placements or a complete list of auxiliary stars.

| Contract | Enforcement |
| --- | --- |
| Valid Gregorian date/time, IANA timezone and supported range | Runtime input validator; test leap years and ambiguous/nonexistent wall times |
| Lunar month exists, day valid, leap flag valid for that year | Calendar engine and independent fixtures; never normalize silently |
| 12 palaces, each kind and branch once | Runtime result validator; DB uniqueness prevents duplicates, transaction gate checks completeness |
| Exactly one palace has `isBodyPalace=true` | Runtime validator; DB prevents multiple, transaction gate requires one |
| All stars refer to the selected catalog version | Versioned catalog FKs and runtime validation |
| Dignity/transformation/placements cite reviewed rules | Catalog/profile review and fixture tests |
| Same input/profile/engine gives same semantic output | Determinism tests; timestamps are persistence metadata only |
| Cục pairing: water=2, wood=3, metal=4, earth=5, fire=6 | Runtime validator and explicit DB constraint |

## Calendar and school decisions still awaiting validation

- Tháng nhuận: record both civil lunar month and leap status. An sao may use a school-specific
  effective month; it must not rewrite the actual lunar birth date.
- Giờ Tý: normally spans 23:00–00:59 for branch assignment; date boundary treatment differs
  by school. Preserve actual civil dates and record any effective calculation-date adjustment.
- IANA historical offsets and daylight saving: ambiguous local times require an explicit
  disambiguation choice before normalizing; unsupported timezone/date combinations fail clearly.
- Unknown birth time: future UI may allow exploration, but must not silently substitute noon or
  claim a definitive chart. Step 2 requires a time for the initial full-chart form.
- Traditional gender is an explicit calculation parameter for the selected rules, not an inference
  from a name or a model of personal identity. Explain its role in the form.
- Annual cycles and tuổi mụ must declare year-boundary and age conventions separately.

## Persistence schema and lifecycle

`schema.sql` proposes the following entities:

| Entity | Purpose |
| --- | --- |
| `app_user` | Minimal identity record; auth provider integration is later |
| `source_reference` | Citation metadata, never secret values |
| `rule_profile` | Immutable versioned school/policies with review status |
| `rule_profile_source` | Many-to-many provenance |
| `palace_definition` | Fixed twelve palace definitions |
| `star_definition` | Star catalog version and metadata |
| `star_source` | Citations for each versioned star entry |
| `birth_profile` | Owner's explicitly saved validated input |
| `horoscope_chart` | Immutable normalized input/result snapshot and engine provenance |
| `chart_palace` | Twelve uniquely identified palace rows |
| `chart_star` | Layered placements with rule/citation metadata |
| `chart_reading` | Separate AI/editorial interpretation with model/prompt provenance |
| `share_link` | Hashed bearer token, expiry, revocation, sanitized snapshot |
| `annual_content` | Reviewed public annual/year/gender SEO content |

JSONB snapshots are versioned and runtime-validated; SQL alone cannot validate the TypeScript
contracts, all astronomical facts, or immutable catalog review. There is deliberately no fabricated
catalog seed. Enforce append-only rule/catalog/chart records using service permissions or triggers
in the eventual migration, and test that contract before production.

Store birth details only with explicit user action. Prefer no display name in the calculation snapshot.
Deleting an account cascades to saved profiles/charts/readings/shares. Define retention, provider
data handling and export/delete flows before deploying persistence. Tokens must be generated with
cryptographic randomness; store SHA-256 token digests, never raw share tokens.
Share snapshots omit birth details and names unless users opt in separately.

Neither the database nor provider account is provisioned. The SQL file remains a design
design candidate until an actual migration is exercised against PostgreSQL in a later implementation.
