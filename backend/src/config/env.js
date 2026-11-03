const path = require("node:path");
const dotenv = require("dotenv");
const { z } = require("zod");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const fields = parsed.error.issues.map((issue) => issue.path.join(".")).join(", ");
  throw new Error(`Invalid backend environment configuration: ${fields}`);
}

module.exports = { env: parsed.data };
