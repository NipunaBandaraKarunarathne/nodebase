import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!, // ✅ REQUIRED
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter, // ✅ THIS FIXES YOUR ERROR
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;