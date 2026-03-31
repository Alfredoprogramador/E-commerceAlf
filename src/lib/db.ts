import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const rawDatabaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const databaseUrl = rawDatabaseUrl.startsWith("file:")
	? rawDatabaseUrl.slice(5)
	: rawDatabaseUrl;
const adapter = new PrismaBetterSqlite3({ url: databaseUrl });

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
