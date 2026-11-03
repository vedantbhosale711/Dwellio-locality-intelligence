const { sql } = require("../config/db");

const migration = `
CREATE TABLE IF NOT EXISTS locations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  canonical_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  location_type TEXT NOT NULL CHECK (location_type IN ('city', 'locality', 'address')),
  city_name TEXT,
  state_name TEXT,
  country_name TEXT NOT NULL DEFAULT 'India',
  latitude NUMERIC(9,6),
  longitude NUMERIC(9,6),
  boundary_geojson JSONB,
  provider_name TEXT,
  provider_place_id TEXT,
  source_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  search_document TSVECTOR GENERATED ALWAYS AS (to_tsvector('simple', coalesce(canonical_name, '') || ' ' || coalesce(display_name, '') || ' ' || coalesce(city_name, ''))) STORED,
  discovered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT locations_coordinates_pair CHECK ((latitude IS NULL AND longitude IS NULL) OR (latitude IS NOT NULL AND longitude IS NOT NULL)),
  CONSTRAINT locations_provider_identity_unique UNIQUE NULLS NOT DISTINCT (provider_name, provider_place_id)
);

CREATE INDEX IF NOT EXISTS locations_search_document_index ON locations USING GIN (search_document);
CREATE INDEX IF NOT EXISTS locations_canonical_name_index ON locations (lower(canonical_name));

CREATE TABLE IF NOT EXISTS location_aliases (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  location_id BIGINT NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  alias TEXT NOT NULL,
  normalized_alias TEXT NOT NULL,
  UNIQUE (location_id, normalized_alias)
);
CREATE INDEX IF NOT EXISTS location_aliases_normalized_alias_index ON location_aliases (normalized_alias);

CREATE TABLE IF NOT EXISTS locality_profiles (
  location_id BIGINT PRIMARY KEY REFERENCES locations(id) ON DELETE CASCADE,
  summary TEXT,
  strengths JSONB NOT NULL DEFAULT '[]'::jsonb,
  considerations JSONB NOT NULL DEFAULT '[]'::jsonb,
  insight TEXT,
  source_name TEXT,
  refreshed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS locality_metrics (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  location_id BIGINT NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('safety', 'connectivity', 'healthcare', 'education', 'environment', 'amenities', 'lifestyle', 'housing', 'growth')),
  metric_key TEXT NOT NULL,
  display_label TEXT NOT NULL,
  numeric_value NUMERIC,
  text_value TEXT,
  unit TEXT,
  source_name TEXT NOT NULL,
  source_url TEXT,
  observed_at TIMESTAMPTZ,
  collected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (location_id, category, metric_key, source_name, observed_at)
);
CREATE INDEX IF NOT EXISTS locality_metrics_location_category_index ON locality_metrics (location_id, category);

CREATE TABLE IF NOT EXISTS locality_scores (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  location_id BIGINT NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('safety', 'connectivity', 'healthcare', 'education', 'environment', 'amenities', 'lifestyle', 'housing', 'growth')),
  score NUMERIC(4,2) NOT NULL CHECK (score >= 0 AND score <= 10),
  methodology_version TEXT NOT NULL,
  data_completeness NUMERIC(5,2) NOT NULL CHECK (data_completeness >= 0 AND data_completeness <= 100),
  evidence JSONB NOT NULL DEFAULT '[]'::jsonb,
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (location_id, category, methodology_version)
);
CREATE INDEX IF NOT EXISTS locality_scores_location_category_index ON locality_scores (location_id, category);
`;

async function migrate() {
  const statements = migration
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await sql.query(statement);
  }
  console.log("Database schema is up to date.");
}

migrate().catch((error) => {
  console.error("Database migration failed:", error.message);
  process.exitCode = 1;
});
