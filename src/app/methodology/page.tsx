import Link from "next/link";
import { MessageSquare, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Для кого",
  description:
    "Организация сервиса и ТОиР для производителей, поставщиков и предприятий. Понятные обязательства, ответственность, подготовленные работы и данные для решений.",
};

const segments = [
  {
    title: "Производители, поставщики и интеграторы оборудования",
    text: "Сервис должен поддерживать клиентские обязательства и давать производству обратную связь. Помогу разобраться с повторными выездами и гарантийными расходами, организовать службу или партнёрскую сеть, настроить SLA, ЗИП и экономику обслуживания. Результат — согласованная модель исполнения и проверяемые правила работы.",
    format: "Подходящие форматы: аудит → архитектура службы или сети → пилот. При локальной задаче — отдельный модуль.",
    cta: "Обсудить сервис производителя",
    href: "/contacts",
  },
  {
    title: "Производственные предприятия",
    text: "Когда аварийные работы вытесняют плановые, важно разобраться не только с отказами, но и с подготовкой, приоритетами и передачей заданий. Помогу выстроить поток ТОиР, планирование, взаимодействие ремонта и производства, обеспечение ЗИП и разбор повторных проблем.",
    format: "Подходящие форматы: аудит ТОиР, организация процесса, Lean-пилот и сопровождение. Цель — управляемость обслуживания и обоснованное снижение потерь, а не обещание превратить любое ремонтное подразделение в центр прибыли.",
    cta: "Обсудить задачи ТОиР",
    href: "/contacts",
  },
  {
    title: "Эксплуатация инженерной инфраструктуры, включая ЦОД",
    text: "В центре внимания — организация обслуживания: окна работ, готовность заданий, подрядчики, критичный ЗИП, ответственность и документирование. Помогу проверить управленческие процессы и спроектировать взаимодействие участников. Технические проверки выполняются с профильными специалистами по согласованному объёму.",
    format: "Подходящие форматы: аудит организационных процессов, модель обслуживания и пилот. Работа не является сертификацией объекта и не подтверждает соответствие инфраструктуры стандартам без отдельной компетентной оценки.",
    cta: "Обсудить организацию эксплуатации",
    href: "/contacts",
  },
  {
    title: "Монтажно-сервисные компании",
    text: "Потери часто возникают на переходе от монтажа и пусконаладки к сервису: неполные данные, спорная приёмка, неясные обязательства и повторные выезды. Помогу спроектировать передачу объекта, требования к комплекту документов, контроль выполненных работ и модель затрат по договору.",
    format: "Подходящие форматы: экспресс-диагностика передачи, проектирование процесса, экономика сервиса и сопровождение.",
    cta: "Разобрать передачу объекта в сервис",
    href: "/contacts",
  },
];

export default function MethodologyPage() {
  return (
    <div className="relative z-10">
      {/* === HERO === */}
      <section className="max-w-[1360px] mx-auto px-6 pt-12 pb-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--electric-blue)] animate-pulse" />
            <span className="text-xs text-[var(--electric-blue)] tracking-wide uppercase">
              Для кого
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
            Организация сервиса и ТОиР для производителей, поставщиков и
            предприятий
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed max-w-[720px]">
            Задачи отличаются, но основа одна: понятные обязательства,
            ответственность, подготовленные работы и данные для решений. Формат
            выбирается по ситуации компании, а не по универсальному набору
            методов.
          </p>
        </div>
      </section>

      {/* === SEGMENTS === */}
      <section className="max-w-[1360px] mx-auto px-6 pb-16">
        <div className="grid gap-8">
          {segments.map((s) => (
            <article
              key={s.title}
              className="p-6 md:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
                {s.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-5">{s.text}</p>

              <div className="mb-6 p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/60">
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Подходящие форматы
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{s.format}</p>
              </div>

              <Link
                href={s.href}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white text-sm font-medium transition-all min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4" />
                {s.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* === CTA BOTTOM === */}
      <section className="max-w-[1360px] mx-auto px-6 pb-20">
        <div className="p-8 rounded-2xl border border-[var(--teal-accent)]/20 bg-gradient-to-br from-[var(--teal-accent)]/5 to-transparent">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Не нашли свою ситуацию?
          </h2>
          <p className="text-gray-300 mb-6 max-w-[720px]">
            Опишите задачу — определим, какой формат работы подходит именно вам.
            Вводная встреча 30 минут бесплатно и не заменяет аудит.
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--teal-accent)] hover:bg-[var(--teal-accent)]/90 text-white text-sm font-medium transition-all min-h-[44px]"
          >
            Обсудить задачу
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
