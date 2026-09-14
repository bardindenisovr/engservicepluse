# ==========================================
# Этап 2: Runner — запуск приложения
# ==========================================
FROM node:24-slim AS runner

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd --gid 2000 app && \
    useradd --uid 2000 --gid 2000 -m -s /bin/bash app

# Копируем standalone-сборку Next.js
COPY --from=builder --chown=app:app /app/public ./public
COPY --from=builder --chown=app:app /app/.next/standalone ./
COPY --from=builder --chown=app:app /app/.next/static ./.next/static

# Копируем Prisma
COPY --from=builder --chown=app:app /app/prisma ./prisma
COPY --from=builder --chown=app:app /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=app:app /app/node_modules/@prisma ./node_modules/@prisma

USER app

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]