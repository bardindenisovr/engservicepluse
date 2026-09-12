"use client";

import { useState } from "react";
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
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section id="services" className="relative z-10 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Заголовок */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--electric-blue)] animate-pulse" />
            <span className="text-xs text-[var(--electric-blue)] tracking-wide uppercase">
              Форматы работы
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            Чем могу{" "}
            <span className="text-[var(--electric-blue)]">помочь</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mt-4 leading-relaxed">
            Подключаюсь как руководитель, независимый эксперт или партнёр по
            проекту — в зависимости от масштаба и срочности задачи.
          </p>
        </div>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = activeService === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "border-[var(--electric-blue)]/40 bg-[var(--electric-blue)]/5"
                    : "border-[var(--border-subtle)] bg-[var(--graphite)]/40 hover:border-[var(--electric-blue)]/30"
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                      isActive
                        ? "bg-[var(--electric-blue)] text-white"
                        : "bg-[var(--graphite-light)] text-[var(--electric-blue)]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white leading-tight mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {service.problem}
                    </p>
                  </div>
                </div>

                {/* Раскрывающееся описание */}
                <div
                  className={`space-y-3 text-sm transition-all duration-300 overflow-hidden ${
                    isActive ? "opacity-100 max-h-60 mt-4" : "opacity-0 max-h-0"
                  }`}
                >
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

                {!isActive && (
                  <p className="text-xs text-gray-600 mt-3 pl-15">
                    Наведите, чтобы увидеть детали
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}