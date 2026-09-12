"use client";

import { useState } from "react";
import { ArrowRight, Briefcase } from "lucide-react";

const cases = [
  {
    id: "dispatch",
    type: "Типовая ситуация",
    industry: "Производитель промышленного оборудования",
    title: "Перестройка диспетчеризации сервисных обращений",
    situation:
      "Заявки поступали по 5 каналам: телефон, email, Telegram, WhatsApp и через менеджеров. Часть терялась, приоритеты назначались вручную, руководитель выполнял роль диспетчера.",
    problem:
      "Среднее время реакции — не отслеживалось. Повторные обращения — 30%. Клиенты жаловались на отсутствие обратной связи.",
    analysis:
      "Аудит показал: нет единой точки приема, нет классификации запросов, нет правил приоритизации, нет контроля статусов.",
    solution:
      "Внедрена единая точка приема. Разработана классификация по критичности. Настроены маршруты эскалации. Введены SLA по времени реакции.",
    result:
      "Прозрачность статусов каждой заявки. Снижение повторных обращений. Руководитель освобожден от ручной диспетчеризации.",
    insight:
      "Диспетчеризация — не про распределение задач, а про управление потоком и приоритетами.",
  },
  {
    id: "partners",
    type: "Типовая ситуация",
    industry: "Инженерная компания с региональной сетью",
    title: "Формирование единых стандартов для сервисных партнеров",
    situation:
      "В 12 регионах работали независимые подрядчики. Каждый — по своим правилам. Клиентский опыт сильно различался.",
    problem:
      "Жалобы на качество в одних регионах и похвала в других. Нет объективной оценки работы партнеров. Нет программы обучения.",
    analysis:
      "Отсутствуют единые требования к партнерам, нет системы оценки, нет обратной связи по качеству.",
    solution:
      "Разработаны критерии отбора и оценки партнеров. Введены единые регламенты. Настроена система обучения. Внедрена регулярная отчетность.",
    result:
      "Единый уровень сервиса в регионах. Управляемая партнерская сеть. Прозрачная система мотивации.",
    insight:
      "Партнерская сеть работает, когда правила одинаковы для всех — и подкреплены обучением и контролем.",
  },
  {
    id: "warranty",
    type: "Типовая ситуация",
    industry: "Поставщик оборудования для ЦОД",
    title: "Настройка процесса управления гарантией",
    situation:
      "Гарантийные расходы росли без анализа. Каждый случай рассматривался отдельно. Повторяющиеся отказы не фиксировались.",
    problem:
      "Нет связи с производством. Одинаковые дефекты повторяются. Себестоимость гарантии не контролируется.",
    analysis:
      "Процесс гарантии не описан. Ответственность размыта между сервисом, продажами и производством.",
    solution:
      "Разработан прозрачный процесс. Введен анализ повторяющихся отказов. Настроена обратная связь с производством.",
    result:
      "Контроль гарантийных расходов. Снижение повторных дефектов. Четкая зона ответственности каждого подразделения.",
    insight:
      "Гарантия — это не только расходы, но и источник данных о качестве продукта.",
  },
  {
    id: "zip",
    type: "Типовая ситуация",
    industry: "Сервисная служба производителя",
    title: "Управление ЗИП с учетом критичности оборудования",
    situation:
      "Склад запасных частей формировался по интуиции. Одни позиции залеживались, других постоянно не хватало.",
    problem:
      "Простои из-за отсутствия запчастей. Замороженные средства в неликвидных позициях.",
    analysis:
      "Нет связи между номенклатурой ЗИП, статистикой отказов и критичностью оборудования.",
    solution:
      "Разработана логика планирования по критичности. Введены правила пополнения. Настроен контроль оборачиваемости.",
    result:
      "Доступность критичных позиций. Снижение неликвидных остатков. Обоснованные решения по закупкам.",
    insight:
      "ЗИП — инструмент доступности, а не просто склад. Каждая позиция должна быть обоснована риском простоя.",
  },
];

export default function Cases() {
  const [activeCase, setActiveCase] = useState<string | null>(null);

  return (
    <section id="cases" className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--graphite)]/30">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Заголовок */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--warm-accent)] animate-pulse" />
            <span className="text-xs text-[var(--warm-accent)] tracking-wide uppercase">
              Практические задачи
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            Разборы{" "}
            <span className="text-[var(--warm-accent)]">реальных ситуаций</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mt-4 leading-relaxed">
            Обезличенные практические сценарии, которые показывают ход
            профессионального мышления и логику принятия решений.
          </p>
        </div>

        {/* Сетка кейсов */}
        <div className="grid md:grid-cols-2 gap-5">
          {cases.map((item) => {
            const isActive = activeCase === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveCase(item.id)}
                onMouseLeave={() => setActiveCase(null)}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "border-[var(--warm-accent)]/40 bg-[var(--warm-accent)]/5"
                    : "border-[var(--border-subtle)] bg-[var(--graphite)]/40 hover:border-[var(--warm-accent)]/30"
                }`}
              >
                {/* Тег и отрасль */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-medium bg-[var(--warm-accent)]/10 text-[var(--warm-accent)] border border-[var(--warm-accent)]/20">
                    <Briefcase className="w-3 h-3" />
                    {item.type}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {item.industry}
                  </span>
                </div>

                {/* Заголовок */}
                <h3 className="text-lg font-semibold text-white leading-snug mb-3">
                  {item.title}
                </h3>

                {/* Раскрывающееся содержимое */}
                <div
                  className={`space-y-3 text-sm transition-all duration-300 overflow-hidden ${
                    isActive ? "opacity-100 max-h-[600px] mt-4" : "opacity-0 max-h-0"
                  }`}
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-600 block mb-1">
                      Ситуация
                    </span>
                    <p className="text-gray-400 leading-relaxed text-xs">
                      {item.situation}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-600 block mb-1">
                      Проблема
                    </span>
                    <p className="text-[var(--warm-accent)] leading-relaxed text-xs">
                      {item.problem}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-600 block mb-1">
                      Анализ
                    </span>
                    <p className="text-gray-400 leading-relaxed text-xs">
                      {item.analysis}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-600 block mb-1">
                      Решение
                    </span>
                    <p className="text-gray-300 leading-relaxed text-xs">
                      {item.solution}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-600 block mb-1">
                      Результат
                    </span>
                    <p className="text-[var(--teal-accent)] leading-relaxed text-xs">
                      {item.result}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[var(--border-subtle)]">
                    <p className="text-xs text-gray-500 italic leading-relaxed">
                      {item.insight}
                    </p>
                  </div>
                </div>

                {!isActive && (
                  <p className="text-xs text-gray-600 mt-3">
                    Наведите, чтобы увидеть разбор
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Примечание */}
        <p className="mt-8 text-xs text-gray-600 text-center max-w-2xl mx-auto">
          Реальные кейсы клиентов будут добавлены после получения разрешения.
          Сейчас представлены обезличенные экспертные разборы типовых ситуаций.
        </p>
      </div>
    </section>
  );
}