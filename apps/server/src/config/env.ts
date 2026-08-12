import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().min(1000).max(65535).default(5000),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors,
  );

  process.exit(1);
}

export const env = parsedEnv.data;
