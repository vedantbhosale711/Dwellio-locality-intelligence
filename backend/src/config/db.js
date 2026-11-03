const { neon } = require("@neondatabase/serverless");
const { env } = require("./env");

const sql = neon(env.DATABASE_URL);

async function checkDatabaseHealth() {
  await sql`SELECT 1 AS ok`;
  return { status: "connected" };
}

module.exports = { sql, checkDatabaseHealth };
