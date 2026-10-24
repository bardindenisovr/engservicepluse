import Link from "next/link";
import { FileSearch, ArrowRight, ClipboardList, Users, Scale, Route, CheckCircle2 } from "lucide-react";

interface AuditSectionProps {
  showHeader?: boolean;
  variant?: "summary" | "full";
}

const summaryScope = [
  "Поток заявок и работ",
  "Ответственность и выполнение обязательств",
  "Рекламации",
  "ЗИП",
  "Управленческие данные",
];

const summaryOutput = [
  "Презентация для руководства",
  "Карта рисков и подтверждённых отклонений",
  "Базовые показатели",
  "Дорожная карта на 3–6 месяцев с ответственными и контрольными точками",
];

const fullWhen = [
  "Проблемы затрагивают несколько процессов, а руководство не может уверенно определить причины и очерёдность действий",
  "Сроки регулярно нарушаются",
  "Рекламации повторяются",
  "Незавершённые работы растут",
  "Показатели не дают общей картины",
  "Качество зависит от отдельных сотрудников и ручного вмешательства руководителя",
];

const fullScope = [
  "Поток заявок и выполнение работ",
  "Ответственность и роли",
  "SLA и отчётность клиенту",
  "Рекламации и гарантия",
  "ЗИП и склада",
  "Управленческие данные и показатели",
];

const fullSteps = [
  {
    num: "01",
    title: "Согласуем задачу",
    desc: "Границы, исходные гипотезы и состав результата.",
  },
  {
    num: "02",
    title: "Изучим данные",
    desc: "Интервью и разбор выборки выполненных работ. Наблюдение на площадке — при согласованном доступе.",
  },
  {
    num: "03",
    title: "Сопоставим факт и правила",
    desc: "Сравним реальный процесс с обязательствами и доступными показателями.",
  },
  {
    num: "04",
    title: "Сформируем выводы",
    desc: "Подтверждённые отклонения, ограничения и приоритеты.",
  },
  {
    num: "05",
    title: "Обсудим с руководством",
    desc: "Уточним дорожную карту с владельцами процессов.",
  },
];

const fullDeliverables = [
  "Презентация для руководства: выводы, риски и необходимые решения.",
  "Матрица зрелости и карта подтверждённых отклонений: наблюдение, доказательство, последствие, приоритет.",
  "Базовые показатели с правилами расчёта и ограничениями данных.",
  "Дорожная карта на 3–6 месяцев: действия, зависимости, владельцы и контрольные точки.",
  "Концепция целевых изменений: что перестроить и в какой последовательности.",
];

const fullTeamNeeds = [
  "Ответственный координатор",
  "Доступ к согласованным документам и данным",
  "Участие владельцев процессов",
  "Возможность обсудить выводы с руководителем",
];

const fullBoundaries = [
  "Полный комплект регламентов",
  "Детальное проектирование целевой модели",
  "Внедрение информационной системы",
  "Физические ремонтные работы",
];

export default function AuditSection({ showHeader = true, variant = "summary" }: AuditSectionProps) {
  if (variant === "summary") {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-[var(--border-subtle)]">
        {showHeader && (
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Поймите, где сервис теряет управляемость и с чего начинать изменения
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Проверим согласованный контур обслуживания: поток заявок и работ,
              ответственность, выполнение обязательств, рекламации, ЗИП и
              управленческие данные. Отделим подтверждённые отклонения от
              предположений и определим приоритеты.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--electric-blue)]/10 flex items-center justify-center">
                <FileSearch className="w-5 h-5 text-[var(--electric-blue)]" />
              </div>
              <h3 className="text-lg font-semibold text-white">Что проверим</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              {summaryScope.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--electric-blue)] mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--teal-accent)]/20 bg-gradient-to-br from-[var(--teal-accent)]/5 to-transparent">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--teal-accent)]/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[var(--teal-accent)]" />
              </div>
              <h3 className="text-lg font-semibold text-white">Что получите</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              {summaryOutput.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[var(--teal-accent)] mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-6">
          <div className="text-sm text-gray-500">
            Срок: ориентировочно 2–4 недели · Стоимость: от 120 000 ₽
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white text-sm font-medium transition-all"
            >
              Посмотреть состав аудита
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contacts"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--electric-blue)]/50 text-gray-300 hover:text-white text-sm font-medium transition-all"
            >
              Обсудить аудит
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Аудит сервисной системы: причины потерь и план изменений
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed mb-6">
            Поймите, где сервис теряет управляемость и с чего начинать
            изменения. Для производителей и поставщиков оборудования,
            предприятий с действующей сервисной службой и подразделений ТОиР.
            Проверим согласованный контур обслуживания и подготовим обоснованные
            приоритеты, а не общий список рекомендаций.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="text-sm text-gray-500">Ориентир — 2–4 недели</span>
            <span className="text-sm text-gray-500">·</span>
            <span className="text-sm text-gray-500">От 120 000 ₽</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contacts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white font-medium transition-all min-h-[48px]"
            >
              Обсудить задачу аудита
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#result"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--electric-blue)]/50 text-gray-300 hover:text-white font-medium transition-all min-h-[48px]"
            >
              Что входит в результат
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--electric-blue)]/10 flex items-center justify-center">
            <Route className="w-5 h-5 text-[var(--electric-blue)]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Когда нужен аудит
          </h2>
        </div>
        <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
          Аудит уместен, когда проблемы затрагивают несколько процессов, а
          руководство не может уверенно определить причины и очерёдность
          действий.
        </p>
        <ul className="grid sm:grid-cols-2 gap-3 max-w-4xl">
          {fullWhen.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--electric-blue)] mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--electric-blue)]/10 flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-[var(--electric-blue)]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Что проверяем
          </h2>
        </div>
        <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
          Это возможные направления, а не обещание одинаково глубоко проверить
          все функции в каждом проекте. До старта фиксируем площадки, процессы,
          выборку, участников и глубину проверки.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fullScope.map((item) => (
            <div
              key={item}
              className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/30 text-sm text-gray-300"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-[var(--border-subtle)]">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Как проходит работа
        </h2>
        <div className="grid md:grid-cols-5 gap-4">
          {fullSteps.map((step) => (
            <div key={step.num} className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/20">
              <div className="text-[var(--electric-blue)] font-mono text-sm font-bold mb-3">
                {step.num}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="result" className="max-w-7xl mx-auto px-6 py-12 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--teal-accent)]/10 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[var(--teal-accent)]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Что получает заказчик
          </h2>
        </div>
        <ul className="space-y-4 max-w-4xl">
          {fullDeliverables.map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-300 leading-relaxed">
              <CheckCircle2 className="w-5 h-5 text-[var(--teal-accent)] mt-1 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--electric-blue)]/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-[var(--electric-blue)]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Что потребуется от команды
          </h2>
        </div>
        <ul className="space-y-3 max-w-3xl mb-6">
          {fullTeamNeeds.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--electric-blue)] mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
          Список материалов направляется до старта. Конфиденциальные сведения
          используются в согласованных границах; внешняя публикация результатов
          обсуждается отдельно.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--electric-blue)]/10 flex items-center justify-center">
            <Scale className="w-5 h-5 text-[var(--electric-blue)]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Границы и приёмка
          </h2>
        </div>
        <p className="text-gray-400 leading-relaxed mb-4 max-w-3xl">
          В аудит не входят, если не согласовано отдельно:
        </p>
        <ul className="space-y-2 max-w-3xl mb-6">
          {fullBoundaries.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
          Работа принимается по составу материалов, прослеживаемости выводов к
          данным и проведённому обсуждению. Разногласия и ограничения
          фиксируются; согласие со всеми выводами не является единственным
          критерием приёмки.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-[var(--border-subtle)]">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Что дальше
        </h2>
        <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
          Вы можете внедрять изменения своей командой, заказать проектирование
          отдельных процессов или запустить пилот с сопровождением. Продолжение
          не обязательно. Если решение уже достаточно определено, повторная
          диагностика не требуется.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white font-medium transition-all min-h-[48px]"
          >
            Обсудить аудит
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/architecture"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--electric-blue)]/50 text-gray-300 hover:text-white font-medium transition-all min-h-[48px]"
          >
            Архитектура сервисной системы
          </Link>
          <Link
            href="/implementation"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--electric-blue)]/50 text-gray-300 hover:text-white font-medium transition-all min-h-[48px]"
          >
            Пилот и сопровождение
          </Link>
        </div>
      </section>
    </>
  );
}
