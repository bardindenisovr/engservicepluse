# ==========================================
# Этап 1: Builder — сборка приложения
# ==========================================
FROM node:24-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY prisma ./prisma

# Build-arguments для переменных из панели Timeweb
ARG NEXT_PUBLIC_YANDEX_METRICA_ID
ENV NEXT_PUBLIC_YANDEX_METRICA_ID=$NEXT_PUBLIC_YANDEX_METRICA_ID

ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

ARG SMTP_HOST
ENV SMTP_HOST=$SMTP_HOST

ARG SMTP_PORT
ENV SMTP_PORT=$SMTP_PORT

ARG SMTP_USER
ENV SMTP_USER=$SMTP_USER

ARG SMTP_PASS
ENV SMTP_PASS=$SMTP_PASS

ARG LEADS_NOTIFY_TO
ENV LEADS_NOTIFY_TO=$LEADS_NOTIFY_TO

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npm ci

COPY . .

RUN npm run build

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

# Пробрасываем переменные в финальный контейнер
ARG SMTP_HOST
ENV SMTP_HOST=$SMTP_HOST

ARG SMTP_PORT
ENV SMTP_PORT=$SMTP_PORT

ARG SMTP_USER
ENV SMTP_USER=$SMTP_USER

ARG SMTP_PASS
ENV SMTP_PASS=$SMTP_PASS

ARG LEADS_NOTIFY_TO
ENV LEADS_NOTIFY_TO=$LEADS_NOTIFY_TO

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

USER app

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]