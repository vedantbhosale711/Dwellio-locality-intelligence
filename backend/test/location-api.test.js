const test = require("node:test");
const assert = require("node:assert/strict");
process.env.NODE_ENV = "test";
const { createApp } = require("../src/app");

const location = {
  id: 1,
  name: "Kharghar",
  canonicalName: "Kharghar",
  type: "locality",
  city: "Navi Mumbai",
  state: "Maharashtra",
  country: "India",
  coordinates: { latitude: 19.033, longitude: 73.065 },
};

const repository = {
  searchLocations: async () => [location],
  getLocationDetails: async (id) => (id === 1 ? { ...location, profile: { strengths: [], considerations: [] }, scores: [] } : null),
  getLocationsByIds: async () => [{ ...location, scores: [{ category: "connectivity", score: 8.5, dataCompleteness: 75 }] }],
  getRecommendationCandidates: async () => [{ ...location, scores: [{ category: "connectivity", score: 8.5, dataCompleteness: 75 }] }],
};

async function request(path, options) {
  const server = createApp({ locationRepository: repository }).listen(0);
  const { port } = server.address();
  try {
    return await fetch(`http://127.0.0.1:${port}${path}`, options);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
}

test("search returns cached database locations", async () => {
  const response = await request("/api/v1/locations/search?q=Kharghar");
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.data[0].name, "Kharghar");
});

test("location detail returns the frontend-facing profile shape", async () => {
  const response = await request("/api/v1/locations/1");
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.data.id, 1);
  assert.ok(Array.isArray(body.data.scores));
});

test("comparison validates and returns selected localities", async () => {
  const response = await request("/api/v1/locations/compare?ids=1,2");
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.meta.requestedCount, 2);
});

test("recommendations use submitted priorities and stored scores", async () => {
  const priorities = { safety: 0, connectivity: 10, healthcare: 0, education: 0, environment: 0, amenities: 0, lifestyle: 0, housing: 0, growth: 0 };
  const response = await request("/api/v1/recommendations", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ priorities, limit: 5 }),
  });
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.data[0].matchScore, 85);
});
