"use client";

import Link from "next/link";
import { ArrowRight, Target, Wrench, Users, Package, BarChart3, FileSearch, Shield, Network, Cog, GraduationCap } from "lucide-react";

const services = [
  {
    id: "express",
    icon: FileSearch,
    title: "Экспресс-диагностика",
    problem: "Нужен независимый взгляд на конкретную проблему или решение",
    action: "Краткая оценка процесса, рисков и следующих шагов",
    result: "Понимание ситуации и приоритетов без длительного проекта",
    audience: "Руководителям, которым нужно быстрое экспертное мнение",
  },
  {
    id: "audit",
    icon: Target,
    title: "Комплексный аудит",
    problem: "Сервис работает нестабильно, причины проблем неясны",
    action: "Системное обследование всех элементов сервисной системы",
    result: "Карта проблем, рисков, приоритетов и рекомендации",
    audience: "Компаниям, планирующим перестройку сервиса",
  },
  {
    id: "model",
    icon: Cog,
    title: "Проектирование сервисной модели",
    problem: "Нет четкой структуры, процессов и зон ответственности",
    action: "Разработка целевой модели: роли, процессы, регламенты, KPI",
    result: "Понятная система управления сервисом",
    audience: "Компаниям, создающим или масштабирующим сервис",
  },
  {
    id: "sla",
    icon: Shield,
    title: "SLA и KPI",
    problem: "Обязательства не выполняются, показатели не отражают реальность",
    action: "Разработка выполнимых SLA и показателей, отражающих качество",
    result: "Управляемые обязательства и объективная оценка работы",
    audience: "Компаниям с сервисными контрактами и гарантией",
  },
  {
    id: "warranty",
    icon: Wrench,
    title: "Гарантия и рекламации",
    problem: "Гарантийные расходы растут, причины отказов не анализируются",
    action: "Настройка прозрачного процесса, анализ повторных отказов",
    result: "Контроль гарантийных расходов и обратная связь в производство",
    audience: "Производителям оборудования с гарантийными обязательствами",
  },
  {
    id: "network",
    icon: Network,
    title: "Сервисная партнерская сеть",
    problem: "Партнеры работают по разным стандартам, качество нестабильно",
    action: "Разработка модели покрытия, критериев отбора, обучения, контроля",
    result: "Единый уровень сервиса в регионах",
    audience: "Компаниям с географически распределенным сервисом",
  },
  {
    id: "parts",
    icon: Package,
    title: "Управление ЗИП",
    problem: "Запасные части закупаются без модели, простои из-за дефицита",
    action: "Логика планирования, хранения, пополнения с учетом критичности",
    result: "Доступность ЗИП при меньших излишках",
    audience: "Компаниям с критичным оборудованием и долгими поставками",
  },
  {
    id: "economics",
    icon: BarChart3,
    title: "Экономика сервиса",
    problem: "Сервис воспринимается только как затраты, потенциал не используется",
    action: "Анализ затрат и доходов, развитие сервисных продуктов",
    result: "Постгарантийный сервис как источник выручки",
    audience: "Компаниям, развивающим сервисное направление",
  },
  {
    id: "operation",
    icon: Users,
    title: "Эксплуатация оборудования",
    problem: "ТОиР не систематизирован, оборудование работает до отказа",
    action: "Модель технического обслуживания, контроль состояния, профилактика",
    result: "Предсказуемая работа оборудования",
    audience: "Службам эксплуатации и главного инженера",
  },
  {
    id: "support",
    icon: GraduationCap,
    title: "Экспертное сопровождение",
    problem: "Изменения начаты, но команде нужна поддержка при внедрении",
    action: "Сопровождение руководителя или проектной команды",
    result: "Уверенное внедрение изменений и закрепление результата",
    audience: "Руководителям, реализующим изменения",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative z-10 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Заголовок — стратегия, раздел 3 «Все услуги» */}
        <div className="mb-12 pt-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--electric-blue)] animate-pulse" />
            <span className="text-xs text-[var(--electric-blue)] tracking-wide uppercase">
              Все услуги
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
            Услуги по аудиту, организации и развитию{" "}
            <span className="text-[var(--electric-blue)]">инженерного сервиса</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-3xl mt-4 leading-relaxed">
            Выберите формат по задаче: разобраться в проблеме, спроектировать
            процесс или внедрить согласованное решение. Аудит не является
            обязательным условием всех работ — если исходные данные достаточны,
            можно начать с конкретного направления.
          </p>
        </div>

        {/* Сетка услуг: задача → результат → переход (п. 23 — детали видны без наведения) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 hover:border-[var(--electric-blue)]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 bg-[var(--graphite-light)] text-[var(--electric-blue)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-white leading-tight mb-1">
                      {service.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {service.problem}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm mt-4">
                  <div className="pl-15">
                    <p className="text-gray-400 leading-relaxed">
                      <span className="text-[var(--electric-blue)] font-medium">Что делаем: </span>
                      {service.action}
                    </p>
                  </div>
                  <div className="pl-15">
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-[var(--teal-accent)] font-medium">Результат: </span>
                      {service.result}
                    </p>
                  </div>
                  <div className="pl-15">
                    <p className="text-gray-500 text-xs leading-relaxed">
                      <span className="text-gray-400">Кому подходит: </span>
                      {service.audience}
                    </p>
                  </div>
                  <div className="pl-15 pt-2">
                    <Link
                      href="/contacts"
                      className="inline-flex items-center gap-1.5 text-sm text-[var(--electric-blue)] hover:text-[var(--teal-accent)] transition-colors"
                    >
                      Обсудить задачу
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Условия — стратегия, раздел 3 */}
        <div className="mt-12 p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
          <p className="text-sm text-gray-400 leading-relaxed max-w-4xl">
            Сроки указаны для согласованного объёма при наличии данных и доступа
            к участникам. Стоимость зависит от числа площадок, процессов, глубины
            анализа и состава результата. Точная цена, налоги, выезды и расходы
            фиксируются в предложении до начала работ. Если следующий этап
            использует уже собранные материалы, повторная работа в расчёт не
            включается.
          </p>
          <Link
            href="/contacts"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white text-sm font-medium transition-all min-h-[44px]"
          >
            Подобрать формат под задачу
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
