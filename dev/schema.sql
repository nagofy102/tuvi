-- PostgreSQL schema proposal for Step 1. Not an applied or tested migration.
-- The application must validate JSON contracts and enforce append-only published versions.

CREATE TABLE app_user (
  id uuid PRIMARY KEY,
  auth_subject text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE source_reference (
  id text PRIMARY KEY,
  title text NOT NULL,
  locator text NOT NULL
);

CREATE TABLE rule_profile (
  id text NOT NULL,
  version text NOT NULL,
  school text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'reviewed')),
  calendar_algorithm_version text NOT NULL,
  catalog_version text NOT NULL,
  min_birth_year integer NOT NULL,
  max_birth_year integer NOT NULL,
  policies jsonb NOT NULL CHECK (jsonb_typeof(policies) = 'object'),
  content_hash text NOT NULL CHECK (content_hash ~ '^[0-9a-f]{64}$'),
  reviewed_at timestamptz,
  PRIMARY KEY (id, version),
  UNIQUE (id, version, catalog_version),
  CHECK (min_birth_year <= max_birth_year),
  CHECK (status <> 'reviewed' OR reviewed_at IS NOT NULL)
);

CREATE TABLE rule_profile_source (
  profile_id text NOT NULL,
  profile_version text NOT NULL,
  source_id text NOT NULL REFERENCES source_reference(id),
  PRIMARY KEY (profile_id, profile_version, source_id),
  FOREIGN KEY (profile_id, profile_version) REFERENCES rule_profile(id, version)
);

CREATE TABLE palace_definition (
  id text PRIMARY KEY CHECK (id IN (
    'menh', 'phu_mau', 'phuc_duc', 'dien_trach', 'quan_loc', 'no_boc',
    'thien_di', 'tat_ach', 'tai_bach', 'tu_tuc', 'phu_the', 'huynh_de'
  )),
  name_vi text NOT NULL,
  description_vi text NOT NULL
);

CREATE TABLE star_definition (
  id text NOT NULL,
  catalog_version text NOT NULL,
  name_vi text NOT NULL,
  category text NOT NULL CHECK (category IN ('major', 'auxiliary', 'cycle', 'transformation')),
  element text CHECK (element IN ('wood', 'fire', 'earth', 'metal', 'water')),
  polarity text NOT NULL CHECK (polarity IN ('yang', 'yin', 'mixed', 'unspecified')),
  description_vi text NOT NULL,
  PRIMARY KEY (id, catalog_version)
);

CREATE TABLE star_source (
  star_id text NOT NULL,
  catalog_version text NOT NULL,
  source_id text NOT NULL REFERENCES source_reference(id),
  PRIMARY KEY (star_id, catalog_version, source_id),
  FOREIGN KEY (star_id, catalog_version) REFERENCES star_definition(id, catalog_version)
);

CREATE TABLE birth_profile (
  id uuid PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  display_name text,
  input_schema_version integer NOT NULL CHECK (input_schema_version = 1),
  birth_input jsonb NOT NULL CHECK (jsonb_typeof(birth_input) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX birth_profile_owner_idx ON birth_profile(owner_id);

CREATE TABLE horoscope_chart (
  id uuid PRIMARY KEY,
  profile_id uuid NOT NULL REFERENCES birth_profile(id) ON DELETE CASCADE,
  rule_profile_id text NOT NULL,
  rule_profile_version text NOT NULL,
  catalog_version text NOT NULL,
  engine_version text NOT NULL,
  result_schema_version integer NOT NULL CHECK (result_schema_version = 1),
  input_hash text NOT NULL CHECK (input_hash ~ '^[0-9a-f]{64}$'),
  normalized_birth jsonb NOT NULL CHECK (jsonb_typeof(normalized_birth) = 'object'),
  result_snapshot jsonb NOT NULL CHECK (jsonb_typeof(result_snapshot) = 'object'),
  cuc_element text NOT NULL,
  cuc_number integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (rule_profile_id, rule_profile_version, catalog_version)
    REFERENCES rule_profile(id, version, catalog_version),
  UNIQUE (id, catalog_version),
  UNIQUE (profile_id, rule_profile_id, rule_profile_version, engine_version, input_hash),
  CHECK ((cuc_element, cuc_number) IN (
    ('water', 2), ('wood', 3), ('metal', 4), ('earth', 5), ('fire', 6)
  ))
);

CREATE TABLE chart_palace (
  chart_id uuid NOT NULL REFERENCES horoscope_chart(id) ON DELETE CASCADE,
  palace_kind text NOT NULL REFERENCES palace_definition(id),
  branch_index smallint NOT NULL CHECK (branch_index BETWEEN 0 AND 11),
  stem_index smallint NOT NULL CHECK (stem_index BETWEEN 0 AND 9),
  is_body_palace boolean NOT NULL DEFAULT false,
  PRIMARY KEY (chart_id, palace_kind),
  UNIQUE (chart_id, branch_index)
);
CREATE UNIQUE INDEX chart_one_body_palace_idx ON chart_palace(chart_id) WHERE is_body_palace;
-- Uniqueness means at most 12 palaces / 1 body palace; application requires exactly 12 / 1.

CREATE TABLE chart_star (
  chart_id uuid NOT NULL,
  palace_branch smallint NOT NULL,
  star_id text NOT NULL,
  catalog_version text NOT NULL,
  layer text NOT NULL CHECK (layer IN ('natal', 'decade', 'annual')),
  period_key text NOT NULL, -- 'natal', 'decade:age-start:age-end', or 'annual:YYYY'
  dignity text NOT NULL CHECK (dignity IN ('mieu', 'vuong', 'dac', 'binh', 'ham', 'unclassified')),
  transformations jsonb NOT NULL CHECK (jsonb_typeof(transformations) = 'array'),
  rule_id text NOT NULL,
  source_ids jsonb NOT NULL CHECK (jsonb_typeof(source_ids) = 'array'),
  PRIMARY KEY (chart_id, star_id, layer, period_key),
  FOREIGN KEY (chart_id, palace_branch) REFERENCES chart_palace(chart_id, branch_index) ON DELETE CASCADE,
  FOREIGN KEY (chart_id, catalog_version) REFERENCES horoscope_chart(id, catalog_version) ON DELETE CASCADE,
  FOREIGN KEY (star_id, catalog_version) REFERENCES star_definition(id, catalog_version),
  CHECK ((layer = 'natal' AND period_key = 'natal') OR
    (layer = 'decade' AND period_key ~ '^decade:[0-9]+:[0-9]+$') OR
    (layer = 'annual' AND period_key ~ '^annual:[0-9]{4}$'))
);

CREATE TABLE chart_reading (
  id uuid PRIMARY KEY,
  chart_id uuid NOT NULL REFERENCES horoscope_chart(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('editorial', 'ai')),
  target_year integer NOT NULL CHECK (target_year BETWEEN 1900 AND 2200),
  target_month smallint CHECK (target_month BETWEEN 1 AND 12),
  provider text,
  model text,
  prompt_version text,
  interpretation_version text NOT NULL,
  assessment jsonb CHECK (jsonb_typeof(assessment) = 'object'),
  content_vi text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (kind <> 'ai' OR (provider IS NOT NULL AND model IS NOT NULL AND prompt_version IS NOT NULL))
);
CREATE INDEX chart_reading_chart_idx ON chart_reading(chart_id);

CREATE TABLE share_link (
  id uuid PRIMARY KEY,
  chart_id uuid NOT NULL REFERENCES horoscope_chart(id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE CHECK (token_hash ~ '^[0-9a-f]{64}$'),
  public_snapshot jsonb NOT NULL CHECK (jsonb_typeof(public_snapshot) = 'object'),
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (expires_at > created_at),
  CHECK (revoked_at IS NULL OR revoked_at >= created_at)
);
CREATE INDEX share_link_chart_idx ON share_link(chart_id);

CREATE TABLE annual_content (
  id uuid PRIMARY KEY,
  target_year integer NOT NULL CHECK (target_year BETWEEN 1900 AND 2200),
  birth_year integer NOT NULL CHECK (birth_year BETWEEN 1900 AND 2100),
  traditional_gender text NOT NULL CHECK (traditional_gender IN ('male', 'female')),
  slug text NOT NULL CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title_vi text NOT NULL,
  description_vi text NOT NULL,
  body_vi text NOT NULL,
  faq jsonb NOT NULL CHECK (jsonb_typeof(faq) = 'array'),
  source_ids jsonb NOT NULL CHECK (jsonb_typeof(source_ids) = 'array'),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'reviewed', 'published')),
  content_version text NOT NULL,
  reviewed_at timestamptz,
  published_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (target_year, birth_year, traditional_gender),
  UNIQUE (target_year, slug),
  CHECK (birth_year <= target_year),
  CHECK (status = 'draft' OR reviewed_at IS NOT NULL),
  CHECK (status <> 'published' OR published_at IS NOT NULL)
);
