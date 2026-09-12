"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";

const problems = [
  {
    id: "sla-formal",
    title: "SLA существует только на бумаге",
    cause: "Обязательства проданы без готовности операционной системы",
    effect: "Штрафы, потеря доверия, демотивация команды",
    solution: "Пересмотр SLA и приведение процессов в соответствие",
  },
  {
    id: "repeat-visits",
    title: "Инженеры выезжают повторно",
    cause: "Слабая диагностика, отсутствие ЗИП, неполные данные о неисправности",
    effect: "Рост затрат, недовольство клиентов, потеря маржи",
    solution: "Контрольная точка перед выездом и управление ЗИП",
  },
  {
    id: "warranty-costs",
    title: "Гарантийные расходы растут без анализа",
    cause: "Причины отказов не собираются и не передаются в производство",
    effect: "Неуправляемая себестоимость, повторные дефекты",
    solution: "Система анализа отказов и обратной связи",
  },
  {
    id: "partners-standards",
    title: "Партнеры работают по разным стандартам",
    cause: "Нет единых требований, обучения и контроля качества",
    effect: "Разный клиентский опыт, репутационные риски",
    solution: "Единые регламенты, критерии отбора и оценки партнеров",
  },
  {
    id: "no-visibility",
    title: "Руководитель не видит реальную картину",
    cause: "Данные разрознены, отчетность не отражает процесс",
    effect: "Решения принимаются вслепую",
    solution: "Единая система отчетности и аналитики",
  },
  {
    id: "post-warranty",
    title: "Постгарантийный сервис не приносит выручки",
    cause: "Нет продуктового подхода и сервисных контрактов",
    effect: "Упущенная прибыль, зависимость от продаж оборудования",
    solution: "Разработка сервисных продуктов и тарифов",
  },
  {
    id: "crm-useless",
    title: "CRM есть, но не помогает управлять",
    cause: "Процессы не описаны, система не настроена под реальные задачи",
    effect: "Двойная работа, потеря данных, сопротивление команды",
    solution: "Описание процессов перед настройкой CRM",
  },
  {
    id: "key-people",
    title: "Сервис зависит от отдельных сотрудников",
    cause: "Знания не задокументированы, нет системы наставничества",
    effect: "Высокие риски при уходе ключевых специалистов",
    solution: "База знаний, регламенты, наставничество",
  },
  {
    id: "lost-requests",
    title: "Обращения теряются или обрабатываются долго",
    cause: "Нет единого канала приема и правил приоритизации",
    effect: "Просрочки, недовольство клиентов, хаос в работе",
    solution: "Диспетчеризация и единые правила обработки",
  },
  {
    id: "responsibility-blur",
    title: "Ответственность между подразделениями размыта",
    cause: "Процессы не описаны, зоны ответственности не определены",
    effect: "Конфликты, перекладывание задач, простои",
    solution: "Карта процессов и матрица ответственности",
  },
  {
    id: "data-without-decisions",
    title: "Данные есть, но решения не принимаются",
    cause: "Показатели не связаны с бизнес-результатом",
    effect: "Отчетность ради отчетности, потеря времени",
    solution: "Пересмотр KPI и управленческой отчетности",
  },
  {
    id: "cost-center",
    title: "Сервис воспринимается только как затраты",
    cause: "Нет продуктового подхода и понимания экономики сервиса",
    effect: "Недофинансирование, потеря конкурентного преимущества",
    solution: "Расчет экономики и развитие сервисных продуктов",
  },
];

export default function Diagnostics() {
  const [activeProblem, setActiveProblem] = useState<string | null>(null);

  return (
    <section className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--graphite)]/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Заголовок */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--warm-accent)] animate-pulse" />
            <span className="text-xs text-[var(--warm-accent)] tracking-wide uppercase">
              Точка, где теряются деньги
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            Когда сервис{" "}
            <span className="text-[var(--electric-blue)]">требует перестройки</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mt-4 leading-relaxed">
            Сервисные проблемы редко существуют отдельно. Обычно они являются
            следствием отсутствия целостной модели управления.
          </p>
        </div>

        {/* Сетка проблем */}
                {/* Сетка проблем */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {problems.map((problem, index) => {
            const isActive = activeProblem === problem.id;
            return (
              <button
                key={problem.id}
                onMouseEnter={() => setActiveProblem(problem.id)}
                onMouseLeave={() => setActiveProblem(null)}
                onFocus={() => setActiveProblem(problem.id)}
                onBlur={() => setActiveProblem(null)}
                className={`relative text-left p-4 rounded-lg border transition-all duration-300 flex flex-col ${
                  isActive
                    ? "border-[var(--warm-accent)]/50 bg-[var(--warm-accent)]/5"
                    : "border-[var(--border-subtle)] bg-[var(--graphite)]/50 hover:border-[var(--warm-accent)]/30"
                }`}
              >
                {/* Номер и заголовок в одну строку */}
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-[10px] font-mono text-[var(--warm-accent)] mt-0.5 flex-shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-semibold text-white leading-snug">
                    {problem.title}
                  </h3>
                </div>

                {/* Раскрывающееся описание */}
                <div
                  className={`space-y-1.5 text-[11px] transition-all duration-300 overflow-hidden ${
                    isActive ? "opacity-100 max-h-32 mt-2" : "opacity-0 max-h-0"
                  }`}
                >
                  <div className="flex items-start gap-1.5">
                    <AlertTriangle className="w-3 h-3 text-[var(--warm-accent)] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400 leading-relaxed">{problem.cause}</span>
                  </div>
                  <div className="pl-4 text-gray-500 leading-relaxed">
                    <span className="text-gray-600">→ </span>
                    {problem.effect}
                  </div>
                  <div className="flex items-start gap-1.5 pl-4">
                    <ArrowRight className="w-3 h-3 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                    <span className="text-[var(--teal-accent)] leading-relaxed">{problem.solution}</span>
                  </div>
                </div>

                {/* Подсказка в неактивном состоянии */}
                {!isActive && (
                  <p className="text-[10px] text-gray-600 mt-auto pt-2">
                    Наведите, чтобы увидеть разбор
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* Финальная фраза */}
        <div className="mt-12 p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-center">
          <p className="text-gray-300 italic max-w-3xl mx-auto">
            «Невозможно улучшить один показатель, не учитывая его влияние на
            остальные элементы системы».
          </p>
        </div>
      </div>
    </section>
  );
}