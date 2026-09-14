# ==========================================
# Этап 1: Builder — сборка приложения
# ==========================================
FROM node:24-slim AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем системные зависимости
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Копируем файлы зависимостей
COPY package*.json ./
COPY prisma ./prisma

# Объявляем build-argument для переменной Метрики
# Это критически важно: NEXT_PUBLIC_ переменные встраиваются
# в код во время сборки, а не во время запуска
ARG NEXT_PUBLIC_YANDEX_METRICA_ID
ENV NEXT_PUBLIC_YANDEX_METRICA_ID=$NEXT_PUBLIC_YANDEX_METRICA_ID

ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Устанавливаем зависимости
RUN npm ci

# Копируем весь исходный код
COPY . .


# Собираем Next.js приложение
RUN npm run build

# ==========================================
# Этап 2: Runner — запуск приложения
# ==========================================
FROM node:24-slim AS runner

WORKDIR /app

# Устанавливаем системные зависимости для runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Создаём пользователя для запуска (не от root)
RUN groupadd --gid 2000 app && \
    useradd --uid 2000 --gid 2000 -m -s /bin/bash app

# Копируем standalone-сборку Next.js
COPY --from=builder --chown=app:app /app/public ./public
COPY --from=builder --chown=app:app /app/.next/standalone ./
COPY --from=builder --chown=app:app /app/.next/static ./.next/static

# Копируем Prisma (для миграций и клиента)
COPY --from=builder --chown=app:app /app/prisma ./prisma
COPY --from=builder --chown=app:app /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=app:app /app/node_modules/@prisma ./node_modules/@prisma

# Переключаемся на непривилегированного пользователя
USER app

# Открываем порт
EXPOSE 3000

# Переменные окружения для runtime
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000
# Запускаем сервер Next.js

CMD ["node", "server.js"]