const test = require("node:test");
const assert = require("node:assert/strict");
process.env.NODE_ENV = "test";
const { createApp } = require("../src/app");

async function request(app, path) {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    return await fetch(`http://127.0.0.1:${port}${path}`);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
}

test("application health endpoint reports healthy", async () => {
  const response = await request(createApp(), "/api/v1/health");
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.status, "ok");
  assert.equal(body.service, "dwellio-backend");
  assert.ok(Date.parse(body.timestamp));
});

test("root endpoint reports the API status", async () => {
  const response = await request(createApp(), "/");

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    status: "ok",
    service: "dwellio-backend",
    apiVersion: "v1",
  });
});

test("database health endpoint reports a successful injected check", async () => {
  const response = await request(
    createApp({ databaseHealthCheck: async () => ({ status: "connected" }) }),
    "/api/v1/health/database",
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok", database: "connected" });
});

test("database health endpoint safely handles a failed check", async () => {
  const response = await request(
    createApp({ databaseHealthCheck: async () => { throw new Error("connection refused"); } }),
    "/api/v1/health/database",
  );

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    error: {
      code: "DATABASE_UNAVAILABLE",
      message: "The database is temporarily unavailable.",
    },
  });
});

test("unknown routes return the shared not-found response", async () => {
  const response = await request(createApp(), "/api/v1/not-a-route");
  const body = await response.json();

  assert.equal(response.status, 404);
  assert.equal(body.error.code, "NOT_FOUND");
});
