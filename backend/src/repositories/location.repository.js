
const { sql } = require("../config/db");

function toNumber(value) {
  return value === null || value === undefined
    ? null
    : Number(value);
}

function mapLocation(row) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.display_name,
    canonicalName: row.canonical_name,
    type: row.location_type,
    city: row.city_name,
    state: row.state_name,
    country: row.country_name,
    coordinates:
      row.latitude === null
        ? null
        : {
            latitude: toNumber(row.latitude),
            longitude: toNumber(row.longitude),
          },
  };
}

async function searchLocations(query, limit) {
  const rows = await sql`
    SELECT id, display_name, canonical_name, location_type,
           city_name, state_name, country_name, latitude, longitude
    FROM locations
    WHERE search_document @@ websearch_to_tsquery('simple', ${query})
       OR canonical_name ILIKE ${"%" + query + "%"}
       OR display_name ILIKE ${"%" + query + "%"}
    ORDER BY
      CASE WHEN lower(canonical_name) = lower(${query})
        THEN 0 ELSE 1 END,
      display_name
    LIMIT ${limit}
  `;

  return rows.map(mapLocation);
}

async function listLocations(limit, offset) {
  const rows = await sql`
    SELECT id, display_name, canonical_name, location_type,
           city_name, state_name, country_name, latitude, longitude
    FROM locations
    WHERE location_type = 'locality'
    ORDER BY display_name
    LIMIT ${limit} OFFSET ${offset}
  `;

  const countResult = await sql`
    SELECT count(*)::int AS total
    FROM locations
    WHERE location_type = 'locality'
  `;

  return {
    locations: rows.map(mapLocation),
    total: countResult[0].total,
  };
}

async function getLocationById(id) {
  const rows = await sql`
    SELECT id, display_name, canonical_name, location_type,
           city_name, state_name, country_name, latitude, longitude
    FROM locations
    WHERE id = ${id}
  `;

  return mapLocation(rows[0]);
}

async function getLocationDetails(id) {
  const location = await getLocationById(id);

  if (!location) return null;

  const [profiles, scoreRows, metricRows] = await Promise.all([
    sql`
      SELECT summary, strengths, considerations, insight,
             source_name, refreshed_at
      FROM locality_profiles
      WHERE location_id = ${id}
    `,
    sql`
      SELECT category, score, methodology_version,
             data_completeness, calculated_at
      FROM locality_scores
      WHERE location_id = ${id}
      ORDER BY category
    `,
    sql`
      SELECT category, metric_key, display_label, numeric_value,
             text_value, unit, source_name, observed_at
      FROM locality_metrics
      WHERE location_id = ${id}
      ORDER BY category, display_label
    `,
  ]);

  const profile = profiles[0] || {};

  const metricsByCategory = metricRows.reduce((groups, metric) => {
    const item = {
      key: metric.metric_key,
      label: metric.display_label,
      value:
        metric.numeric_value === null
          ? metric.text_value
          : Number(metric.numeric_value),
      unit: metric.unit,
      source: metric.source_name,
      observedAt: metric.observed_at,
    };

    (groups[metric.category] ||= []).push(item);
    return groups;
  }, {});

  return {
    ...location,
    profile: {
      summary: profile.summary || null,
      strengths: profile.strengths || [],
      considerations: profile.considerations || [],
      insight: profile.insight || null,
      source: profile.source_name || null,
      refreshedAt: profile.refreshed_at || null,
    },
    scores: scoreRows.map((score) => ({
      category: score.category,
      score: Number(score.score),
      methodologyVersion: score.methodology_version,
      dataCompleteness: Number(score.data_completeness),
      calculatedAt: score.calculated_at,
      metrics: metricsByCategory[score.category] || [],
    })),
  };
}

async function getLocationsByIds(ids) {
  const locationPromises = ids.map(
    (id) => sql`
      SELECT id, display_name, canonical_name, location_type,
             city_name, state_name, country_name, latitude, longitude
      FROM locations
      WHERE id = ${id}
    `
  );

  const locationResults = await Promise.all(locationPromises);
  const locations = locationResults
    .map((rows) => mapLocation(rows[0]))
    .filter(Boolean);

  if (locations.length === 0) return [];

  const scorePromises = ids.map(
    (id) => sql`
      SELECT location_id, category, score, methodology_version,
             data_completeness, calculated_at
      FROM locality_scores
      WHERE location_id = ${id}
      ORDER BY category
    `
  );

  const scoreResults = await Promise.all(scorePromises);
  const scoresByLocation = {};

  for (const scoreRows of scoreResults) {
    for (const row of scoreRows) {
      (scoresByLocation[row.location_id] ||= []).push({
        category: row.category,
        score: Number(row.score),
        methodologyVersion: row.methodology_version,
        dataCompleteness: Number(row.data_completeness),
        calculatedAt: row.calculated_at,
      });
    }
  }

  return locations.map((location) => ({
    ...location,
    scores: scoresByLocation[location.id] || [],
  }));
}

async function getRecommendationCandidates(
  limit = 100,
  locationPreference
) {
  if (!locationPreference) {
    throw new Error("A location preference is required.");
  }

  let rows;

  if (locationPreference.scope === "city") {
    rows = await sql`
      SELECT
        l.id, l.display_name, l.canonical_name, l.location_type,
        l.city_name, l.state_name, l.country_name,
        l.latitude, l.longitude,
        s.category, s.score, s.data_completeness,
        s.methodology_version, s.calculated_at
      FROM locations l
      JOIN locality_scores s ON s.location_id = l.id
      WHERE l.location_type = 'locality'
        AND lower(trim(l.city_name)) =
            lower(trim(${locationPreference.city}))
      ORDER BY l.id, s.category
    `;
  } else if (locationPreference.scope === "state") {
    rows = await sql`
      SELECT
        l.id, l.display_name, l.canonical_name, l.location_type,
        l.city_name, l.state_name, l.country_name,
        l.latitude, l.longitude,
        s.category, s.score, s.data_completeness,
        s.methodology_version, s.calculated_at
      FROM locations l
      JOIN locality_scores s ON s.location_id = l.id
      WHERE l.location_type = 'locality'
        AND lower(trim(l.state_name)) =
            lower(trim(${locationPreference.state}))
      ORDER BY l.id, s.category
    `;
  } else if (locationPreference.scope === "india") {
    rows = await sql`
      SELECT
        l.id, l.display_name, l.canonical_name, l.location_type,
        l.city_name, l.state_name, l.country_name,
        l.latitude, l.longitude,
        s.category, s.score, s.data_completeness,
        s.methodology_version, s.calculated_at
      FROM locations l
      JOIN locality_scores s ON s.location_id = l.id
      WHERE l.location_type = 'locality'
      ORDER BY l.id, s.category
    `;
  } else {
    throw new Error("Invalid location preference scope.");
  }

  const grouped = new Map();

  for (const row of rows) {
    if (!grouped.has(row.id)) {
      grouped.set(row.id, {
        ...mapLocation(row),
        scores: [],
      });
    }

    grouped.get(row.id).scores.push({
      category: row.category,
      score: Number(row.score),
      dataCompleteness: Number(row.data_completeness),
      methodologyVersion: row.methodology_version,
      calculatedAt: row.calculated_at,
    });
  }

  return [...grouped.values()].slice(0, limit);
}

module.exports = {
  searchLocations,
  listLocations,
  getLocationById,
  getLocationDetails,
  getLocationsByIds,
  getRecommendationCandidates,
};
