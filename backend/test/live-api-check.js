/**
 * Live API verification against the real Neon database.
 * Starts the server, tests every endpoint, then exits.
 */
const { env } = require("../src/config/env");
const { createApp } = require("../src/app");
const { checkDatabaseHealth } = require("../src/config/db");
const locationRepository = require("../src/repositories/location.repository");

async function run() {
  const app = createApp({ databaseHealthCheck: checkDatabaseHealth, locationRepository });
  const server = app.listen(0);
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;

  const results = [];

  async function check(label, url, options) {
    try {
      const res = await fetch(url, options);
      const body = await res.json();
      const ok = res.status >= 200 && res.status < 300;
      results.push({ label, status: res.status, ok, summary: JSON.stringify(body).slice(0, 200) });
      console.log(`${ok ? "✔" : "✖"} ${label} → ${res.status}`);
      if (!ok) console.log("  ", JSON.stringify(body));
      return body;
    } catch (err) {
      results.push({ label, ok: false, error: err.message });
      console.log(`✖ ${label} → ERROR: ${err.message}`);
      return null;
    }
  }

  // 1. Root
  await check("GET /", `${base}/`);

  // 2. Health
  await check("GET /api/v1/health", `${base}/api/v1/health`);

  // 3. DB Health
  await check("GET /api/v1/health/database", `${base}/api/v1/health/database`);

  // 4. Search
  const searchResult = await check("GET /api/v1/locations/search?q=Mumbai", `${base}/api/v1/locations/search?q=Mumbai`);

  // 5. Search with short query (validation)
  await check("GET /api/v1/locations/search?q=M (expect 400)", `${base}/api/v1/locations/search?q=M`);

  // 6. Get location by ID (use first result if available)
  if (searchResult && searchResult.data && searchResult.data.length > 0) {
    const id = searchResult.data[0].id;
    await check(`GET /api/v1/locations/${id}`, `${base}/api/v1/locations/${id}`);
  } else {
    await check("GET /api/v1/locations/1", `${base}/api/v1/locations/1`);
  }

  // 7. Compare
  await check("GET /api/v1/locations/compare?ids=1,2", `${base}/api/v1/locations/compare?ids=1,2`);

  // 8. Recommendations
  const priorities = { safety: 10, connectivity: 8, healthcare: 5, education: 3, environment: 7, amenities: 6, lifestyle: 4, housing: 9, growth: 2 };
  await check("POST /api/v1/recommendations", `${base}/api/v1/recommendations`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ priorities, limit: 5 }),
  });

  // 9. Not found
  await check("GET /api/v1/nonexistent (expect 404)", `${base}/api/v1/nonexistent`);

  console.log("\n--- Summary ---");
  const passed = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;
  console.log(`Passed: ${passed}, Failed: ${failed}, Total: ${results.length}`);

  await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
}

run().catch((err) => {
  console.error("Live API check failed:", err);
  process.exitCode = 1;
});
