// lib/prisma.ts

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Create pg pool using DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Wrap it with Prisma adapter
const adapter = new PrismaPg(pool);

// Global for hot-reloading in dev
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
