const { sql } = require("./backend/src/config/db");

async function main() {
  const rows = await sql`
    SELECT
      l.id,
      l.display_name,
      COUNT(DISTINCT s.category)::int AS score_count,
      COUNT(DISTINCT m.metric_key)::int AS metric_count
    FROM locations l
    LEFT JOIN locality_scores s ON s.location_id = l.id
    LEFT JOIN locality_metrics m ON m.location_id = l.id
    GROUP BY l.id, l.display_name
    ORDER BY l.id
  `;

  console.table(rows);
}

main().catch(console.error);
