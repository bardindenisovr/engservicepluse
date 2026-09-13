FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
# ... после RUN npm run build ...

# Копируем публичные и статические файлы в папку standalone
RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

# ...
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Копируем публичные и статические файлы в standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Копируем Prisma (если нужно)
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "server.js"]