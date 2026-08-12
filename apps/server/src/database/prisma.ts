// import { Pool } from "pg";
import { env } from "../config/env.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// const pool = new Pool({ connectionString: process.env.DATABASE_URL, });
const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { prisma };
