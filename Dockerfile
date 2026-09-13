# Этап сборки
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
RUN npm run build

# Этап запуска
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Копируем standalone-сборку Next.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Копируем Prisma-схему для работы миграций (если нужно)
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "server.js"]