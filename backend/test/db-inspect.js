/**
 * Quick check: what's in the database right now?
 */
const { sql } = require("../src/config/db");

async function run() {
  const locations = await sql`SELECT id, display_name, canonical_name, location_type, city_name FROM locations ORDER BY id LIMIT 20`;
  console.log("Locations:", JSON.stringify(locations, null, 2));
  
  const scores = await sql`SELECT location_id, category, score FROM locality_scores ORDER BY location_id, category LIMIT 50`;
  console.log("\nScores:", JSON.stringify(scores, null, 2));
  
  const profiles = await sql`SELECT location_id, summary FROM locality_profiles LIMIT 10`;
  console.log("\nProfiles:", JSON.stringify(profiles, null, 2));
  
  const metrics = await sql`SELECT location_id, category, metric_key, display_label FROM locality_metrics ORDER BY location_id, category LIMIT 30`;
  console.log("\nMetrics:", JSON.stringify(metrics, null, 2));
}

run().catch((err) => { console.error(err); process.exitCode = 1; });
