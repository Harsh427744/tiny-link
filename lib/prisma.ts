// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";   // ← FIXED import

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a Postgres connection pool using DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create the Prisma Pg adapter
const adapter = new PrismaPg(pool);

// Create Prisma client (Prisma 7 requires adapter)
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,                         // ← REQUIRED in Prisma 7
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
