import Link from "next/link";
import { MessageSquare, FileSearch, ChevronRight } from "lucide-react";
import ServiceFlow from "@/components/ServiceFlow";
import Diagnostics from "@/components/Diagnostics";
import AuditSection from "@/components/AuditSection";
import Services from "@/components/Services";
import SystemModel from "@/components/SystemModel";
import Results from "@/components/Results";
import Cases from "@/components/Cases";
import About from "@/components/About";
import ForEmployers from "@/components/ForEmployers";
import KnowledgeBase from "@/components/KnowledgeBase";

const competencies = [
  "Аудит сервиса",
  "Экспресс-диагностика",
  "Диспетчеризация",
  "SLA и KPI",
  "ТОиР",
  "Гарантия и ЗИП",
];

const situations = [
  "Сроки обслуживания срываются, а причины каждый раз объясняются по-разному.",
  "Рекламации повторяются, но обратная связь не приводит к устойчивым изменениям.",
  "Заявки и ремонты накапливаются между подразделениями без понятного владельца.",
  "Запасы деталей растут, но критичных позиций всё равно не хватает.",
  "Сервис расширяется, а качество зависит от отдельных сотрудников и подрядчиков.",
  "Затраты видны, но себестоимость работ и доходность обслуживания остаются непрозрачными.",
];

export default function Home() {
  return (
    <div className="relative z-10">
      {/* === 2.1. ПЕРВЫЙ ЭКРАН === */}
      <section className="max-w-[1360px] mx-auto px-6 pt-6 pb-12">
        <div className="grid lg:grid-cols-[55%_45%] gap-10 items-start">
          {/* ЛЕВАЯ КОЛОНКА */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[var(--teal-accent)] animate-pulse" />
              <span className="text-xs text-[var(--teal-accent)] tracking-wide uppercase">
                Архитектура и внедрение управляемого инженерного сервиса
              </span>
            </div>

            <h1 className="text-[30px] md:text-[42px] lg:text-[54px] font-bold leading-[1.05] tracking-tight max-w-[720px]">
              Сервис работает, но остаётся{" "}
              <span className="text-[var(--electric-blue)]">неуправляемым?</span>
            </h1>

            <p className="text-[16px] lg:text-[19px] text-gray-300 leading-[1.5] max-w-[680px]">
              Помогаю производителям и поставщикам оборудования, техническим
              директорам и руководителям сервиса находить причины повторных
              отказов, срывов сроков и непрозрачных затрат. Провожу аудит,
              проектирую сервисную систему и сопровождаю внедрение.
            </p>

            <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-gray-400">
              {competencies.map((c, i) => (
                <span key={c} className="flex items-center gap-2">
                  {i > 0 && <span className="text-gray-600">·</span>}
                  <span>{c}</span>
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center gap-2 px-8 rounded-xl bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white font-medium transition-all min-h-[56px] w-full sm:w-auto"
              >
                <MessageSquare className="w-4 h-4" />
                Обсудить задачу
              </Link>
              <Link
                href="/audit"
                className="inline-flex items-center justify-center gap-2 px-8 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--electric-blue)]/50 text-gray-300 hover:text-white font-medium transition-all min-h-[56px] w-full sm:w-auto"
              >
                <FileSearch className="w-4 h-4" />
                Посмотреть состав аудита
              </Link>
            </div>

            {/* Вводная встреча — по стратегии 2.1 */}
            <div className="pt-3 p-5 rounded-xl border border-[var(--teal-accent)]/20 bg-[var(--teal-accent)]/5">
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="text-[var(--teal-accent)] font-semibold">
                  Вводная встреча — 30 минут, без оплаты.
                </span>{" "}
                Уточним задачу, границы и следующий шаг. Встреча не заменяет
                аудит документов и процессов.
              </p>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] max-w-[300px] mx-auto lg:mx-0 rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--graphite)] to-[var(--deep-blue)] overflow-hidden">
              <img
                src="/roman.png"
                alt="Роман Бардин-Денисов — архитектор сервисных систем, аудит сервиса и ТОиР"
                width={480}
                height={600}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="max-w-[300px] mx-auto lg:mx-0">
              <div className="text-base font-semibold text-white">
                Роман Бардин-Денисов
              </div>
              <div className="text-xs text-gray-400">
                Архитектор сервисных систем · Аудит сервиса и ТОиР
              </div>
            </div>

            <div className="max-w-[300px] mx-auto lg:mx-0 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
              <div className="text-sm font-semibold text-white mb-3">
                Как идёт работа
              </div>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-[var(--electric-blue)] mt-0.5 flex-shrink-0" />
                  <span>Выбираем формат: аудит или экспресс-диагностика</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-[var(--electric-blue)] mt-0.5 flex-shrink-0" />
                  <span>Фиксируем факты и подтверждённые причины потерь</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                  <span>Дорожная карта и сопровождение изменений</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* === 2.2. ЧТО ОБЪЕДИНЯЕТ ПОДХОД === */}
      <section className="max-w-[1360px] mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--electric-blue)] animate-pulse" />
              <span className="text-xs text-[var(--electric-blue)] tracking-wide uppercase">
                Что объединяет подход
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Не отдельные регламенты, а{" "}
              <span className="text-[var(--electric-blue)]">
                связанная система обслуживания
              </span>
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Процессы, ответственность, обязательства перед клиентом, ЗИП и
              экономика должны работать вместе. Начинаем с фактов, выбираем
              приоритетные изменения и проверяем их на практике. На каждом этапе
              у команды остаются материалы, пригодные для дальнейшей работы.
            </p>
          </div>

          <div>
            <ServiceFlow />
          </div>
        </div>
      </section>

      {/* === 2.3. СИТУАЦИИ ЗАКАЗЧИКА === */}
      <section className="relative z-10 border-t border-[var(--border-subtle)]">
        <div className="max-w-[1360px] mx-auto px-6 py-16">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--warm-accent)] animate-pulse" />
              <span className="text-xs text-[var(--warm-accent)] tracking-wide uppercase">
                Ситуации заказчика
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Когда стоит пересмотреть организацию сервиса
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {situations.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40"
              >
                <span className="text-xs font-mono text-[var(--electric-blue)] mt-1 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl border border-[var(--teal-accent)]/20 bg-[var(--teal-accent)]/5">
            <p className="text-sm text-gray-300 leading-relaxed mb-5">
              Если проблема затрагивает несколько процессов, начните с аудита.
              Если вопрос локальный и границы понятны — с экспресс-диагностики.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white text-sm font-medium transition-all min-h-[44px]"
              >
                Выбрать формат
              </Link>
              <Link
                href="/contacts"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--electric-blue)]/50 text-gray-300 hover:text-white text-sm font-medium transition-all min-h-[44px]"
              >
                Описать ситуацию
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === ТИПОВЫЕ ПРОБЛЕМЫ (существующий блок, не изменён) === */}
      <Diagnostics />

      {/* === 2.4–2.5. УСЛУГИ: АУДИТ / ЭКСПРЕСС-ДИАГНОСТИКА (лиды) === */}
      <section className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--graphite)]/30">
        <div className="max-w-[1360px] mx-auto px-6 py-16">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--electric-blue)] animate-pulse" />
              <span className="text-xs text-[var(--electric-blue)] tracking-wide uppercase">
                С чего начать
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Два прозрачных формата старта
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* 2.4. Аудит сервисной системы */}
            <div className="flex flex-col p-7 md:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
              <h3 className="text-xl font-semibold text-white mb-3">
                Аудит сервисной системы
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-4">
                <span>
                  Срок: <span className="text-gray-300">2–4 недели</span>
                </span>
                <span>
                  Стоимость:{" "}
                  <span className="text-gray-300">от 120 000 ₽</span>
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                Поймите, где сервис теряет управляемость и с чего начинать
                изменения. Проверим согласованный контур обслуживания: поток
                заявок и работ, ответственность, выполнение обязательств,
                рекламации, ЗИП и управленческие данные. Отделим подтверждённые
                отклонения от предположений и определим приоритеты.
              </p>
              <div className="mb-6">
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                  На выходе
                </div>
                <ul className="space-y-1.5 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--electric-blue)] mt-0.5">—</span>
                    Презентация для руководства
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--electric-blue)] mt-0.5">—</span>
                    Карта рисков и подтверждённых отклонений
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--electric-blue)] mt-0.5">—</span>
                    Базовые показатели с правилами расчёта
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--electric-blue)] mt-0.5">—</span>
                    Дорожная карта на 3–6 месяцев с ответственными
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                  В аудит входит концепция изменений; детальное проектирование и
                  внедрение согласуются отдельно.
                </p>
              </div>
              <div className="mt-auto flex flex-wrap gap-3">
                <Link
                  href="/audit"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white text-sm font-medium transition-all min-h-[44px]"
                >
                  Посмотреть состав аудита
                </Link>
                <Link
                  href="/contacts"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--electric-blue)]/50 text-gray-300 hover:text-white text-sm font-medium transition-all min-h-[44px]"
                >
                  Обсудить аудит
                </Link>
              </div>
            </div>

            {/* 2.5. Экспресс-диагностика */}
            <div className="flex flex-col p-7 md:p-8 rounded-2xl border border-[var(--teal-accent)]/20 bg-gradient-to-br from-[var(--teal-accent)]/5 to-transparent">
              <h3 className="text-xl font-semibold text-white mb-3">
                Экспресс-диагностика
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-4">
                <span>
                  Срок: <span className="text-gray-300">5 рабочих дней</span>
                </span>
                <span>
                  Стоимость:{" "}
                  <span className="text-gray-300">от 30 000 ₽</span>
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                Разберите одну проблему, прежде чем запускать большой проект.
                Ограниченная диагностика обработки заявок, рекламаций, выполнения
                SLA, обеспечения ЗИП или другого согласованного участка. На
                выходе — подтверждённые отклонения, ограничения анализа и
                приоритеты следующих действий.
              </p>
              <div className="mt-auto flex flex-wrap gap-3">
                <Link
                  href="/contacts"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--teal-accent)] hover:bg-[var(--teal-accent)]/90 text-white text-sm font-medium transition-all min-h-[44px]"
                >
                  Проверить, подходит ли мой запрос
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === ОСТАЛЬНЫЕ БЛОКИ (существующие, не изменены) === */}
      <AuditSection />
      <Services />
      <SystemModel />
      <Results />
      <Cases />
      <About />
      <ForEmployers />
      <KnowledgeBase />
    </div>
  );
}
