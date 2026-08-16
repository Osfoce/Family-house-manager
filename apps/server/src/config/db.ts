import { env } from "./env.js";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";
import { AppError } from "../common/errors/AppError.js";

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

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected via prisma");
  } catch (err) {
    const error = new AppError("Failed to connect to the database", 500, err);
    console.error(error.message, error.details);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };
