import type { Metadata } from "next";
import Link from "next/link";

const TELEGRAM_URL =
  "https://t.me/engserviceplus?utm_source=landing&utm_medium=website&utm_campaign=eng_service_plus";

export const metadata: Metadata = {
  title: "Telegram-канал «Сервис в плюс» — Архитектура инженерного сервиса",
  description:
    "Роман Бардин-Денисов, 18 лет практики. Разборы кейсов, регламенты ТОиР, управление SLA и складом ЗИП. Превращаем затратный сервис в прибыльную систему.",
};

export default function TelegramLandingPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-[#F8FAFC]">
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center md:py-28">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#1E293B] ring-1 ring-slate-700">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-12 w-12 text-[#F59E0B]"
              aria-hidden="true"
            >
              <path d="M9.04 15.47l-.38 5.36c.54 0 .78-.24 1.06-.52l2.55-2.45 5.28 3.86c.97.53 1.66.25 1.92-.9l3.48-16.3.01-.01c.3-1.42-.51-1.98-1.45-1.63L1.6 10.8c-1.38.54-1.36 1.31-.24 1.65l4.86 1.52L17.5 6.5c.53-.35 1.02-.16.62.19L9.04 15.47z" />
            </svg>
          </div>

          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-slate-400">
            Telegram-канал «Сервис в плюс»
          </p>

          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Превращаем затратный сервис в{" "}
            <span className="text-[#F59E0B]">прибыльную систему</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
            18 лет практики. Разборы кейсов, регламенты ТОиР, управление SLA и
            складом ЗИП. Присоединяйтесь к сообществу профессионалов.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#F59E0B] px-8 py-4 text-lg font-semibold text-[#0F172A] shadow-lg transition hover:scale-105 hover:bg-amber-400"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M9.04 15.47l-.38 5.36c.54 0 .78-.24 1.06-.52l2.55-2.45 5.28 3.86c.97.53 1.66.25 1.92-.9l3.48-16.3.01-.01c.3-1.42-.51-1.98-1.45-1.63L1.6 10.8c-1.38.54-1.36 1.31-.24 1.65l4.86 1.52L17.5 6.5c.53-.35 1.02-.16.62.19L9.04 15.47z" />
              </svg>
              Подписаться на канал
            </a>
          </div>
        </div>
      </section>

      {/* ───────────── О КАНАЛЕ И АВТОРЕ ───────────── */}
      <section id="about" className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-12 md:items-start md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Автор канала</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              <strong className="text-white">Роман Бардин-Денисов</strong> —
              эксперт по развитию технического и послепродажного сервиса. 18 лет
              строит инженерную инфраструктуру там, где цена отказа — миллионы:
              ЦОДы, пищепром, ритейл.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Специализация — интеграция производства и сервиса через TPM.
              Выстраивает систему без ручного управления.
            </p>
            <div className="mt-8">
              <Link
                href="https://tenchat.ru/bardin-denisov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F59E0B] underline-offset-4 hover:underline"
              >
                Профиль в TenChat →
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-[#1E293B] p-8 ring-1 ring-slate-700">
            <h3 className="mb-6 text-xl font-semibold text-white">
              Кому будет полезен канал
            </h3>
            <ul className="space-y-3 text-slate-300">
              {[
                "Директорам по сервису и руководителям сервисных служб",
                "Производственным компаниям, где сервис — центр затрат",
                "Техническим специалистам, отвечающим за ТОиР",
                "Всем, кто хочет управлять сервисом на основе данных",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#F59E0B]/20 text-[#F59E0B]">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────── О ЧЁМ КАНАЛ ───────────── */}
      <section className="bg-[#1E293B] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            О чём канал
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-400">
            Контент, который помогает принимать решения на основе данных, а не
            скорости выезда бригады.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "📘",
                title: "Разборы кейсов",
                text: "Реальные проекты: что сработало, что нет и почему. ЦОДы, пищепром, ритейл.",
              },
              {
                icon: "📐",
                title: "Регламенты ТОиР",
                text: "Как навести порядок: план выполняется, аварийный фонд снижается вдвое.",
              },
              {
                icon: "🎓",
                title: "Управление SLA и ЗИП",
                text: "Практика управления складом запасных частей и сервисными уровнями.",
              },
              {
                icon: "⚙️",
                title: "Интеграция через TPM",
                text: "Соединяю состояние подшипника с P&L компании. Система без ручного управления.",
              },
              {
                icon: "📊",
                title: "MTBF / MTTR",
                text: "Обучаю мыслить надёжностью, а не скоростью реакции на аварию.",
              },
              {
                icon: "🎯",
                title: "Без воды",
                text: "Только то, что применимо в работе. Никакого инфобизнеса.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-700 bg-[#0F172A] p-6 transition hover:border-[#F59E0B]/50"
              >
                <div className="mb-4 text-4xl">{card.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="text-slate-400">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── ОФФЕР ───────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-3xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-10 ring-1 ring-slate-700 md:p-14">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Первая встреча — 1 час
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              За это время вы получите разбор текущей ситуации, экспертную
              оценку узких мест сервиса и понимание, с чего разумно начать
              изменения. Встреча ни к чему не обязывает.
            </p>
            <a
              href="https://serviceinplus.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#F59E0B] px-10 py-5 text-lg font-semibold text-[#0F172A] shadow-xl transition hover:scale-105 hover:bg-amber-400"
            >
              Обсудить задачу на сайте
            </a>
          </div>
        </div>
      </section>

      {/* ───────────── ФИНАЛЬНЫЙ CTA ───────────── */}
      <section className="bg-[#1E293B] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Присоединяйтесь к каналу
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Разборы кейсов, регламенты ТОиР, управление SLA и ЗИП — в одном
            месте.
          </p>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#F59E0B] px-10 py-5 text-lg font-semibold text-[#0F172A] shadow-xl transition hover:scale-105 hover:bg-amber-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M9.04 15.47l-.38 5.36c.54 0 .78-.24 1.06-.52l2.55-2.45 5.28 3.86c.97.53 1.66.25 1.92-.9l3.48-16.3.01-.01c.3-1.42-.51-1.98-1.45-1.63L1.6 10.8c-1.38.54-1.36 1.31-.24 1.65l4.86 1.52L17.5 6.5c.53-.35 1.02-.16.62.19L9.04 15.47z" />
            </svg>
            Открыть @engserviceplus
          </a>

          <p className="mt-6 text-sm text-slate-500">
            Или скопируйте ссылку:{" "}
            <code className="rounded bg-[#0F172A] px-2 py-1 text-[#F59E0B]">
              t.me/engserviceplus
            </code>
          </p>
        </div>
      </section>

      {/* ───────────── ФУТЕР ───────────── */}
      <footer className="border-t border-slate-800 bg-[#0F172A] py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} «Сервис в плюс». Все права защищены.
          </p>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-[#F59E0B]">
              На главную
            </Link>
            <Link href="/admin" className="hover:text-[#F59E0B]">
              Админка
            </Link>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F59E0B]"
            >
              Telegram
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}