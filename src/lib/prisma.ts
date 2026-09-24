import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Создаём адаптер с connection string из переменной окружения
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// Глобальный объект для предотвращения создания множества клиентов в dev-режиме
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}