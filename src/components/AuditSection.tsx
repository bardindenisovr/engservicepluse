import Link from "next/link";
import { FileSearch, CheckCircle2, ArrowRight } from "lucide-react";

interface AuditSectionProps {
  showHeader?: boolean;
}

const auditIncludes = [
  "Интервью с руководителями и ключевыми сотрудниками",
  "Анализ структуры сервисного подразделения",
  "Изучение маршрута обращения клиента",
  "Анализ ролей и зон ответственности",
  "Оценка SLA и фактических сроков",
  "Проверка системы KPI",
  "Анализ гарантии и рекламаций",
  "Оценка работы партнеров и подрядчиков",
  "Анализ управления запасными частями",
  "Оценка используемых информационных систем",
  "Анализ отчетности и данных",
  "Оценка экономики сервиса",
];

const auditResults = [
  "Объективная картина текущего состояния",
  "Карта узких мест и рисков",
  "Приоритеты изменений",
  "Целевая модель сервиса",
  "Дорожная карта внедрения",
  "Рекомендации по показателям и ответственности",
];

const auditSteps = [
  { num: "01", title: "Предварительное обсуждение", desc: "Определяем контекст, масштаб и цели аудита" },
  { num: "02", title: "Сбор информации", desc: "Документы, данные, интервью с командой" },
  { num: "03", title: "Диагностика процессов", desc: "Анализ маршрутов заявок, ролей, SLA, гарантии" },
  { num: "04", title: "Анализ данных", desc: "Сроки, повторные обращения, затраты, экономика" },
  { num: "05", title: "Формирование целевой модели", desc: "Как должен работать сервис после изменений" },
  { num: "06", title: "Презентация выводов", desc: "Карта проблем, риски, приоритеты" },
  { num: "07", title: "План практических изменений", desc: "Дорожная карта с этапами и ответственными" },
];

export default function AuditSection({ showHeader = true }: AuditSectionProps) {
  return (
    <section className="relative z-10 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {showHeader && (
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--electric-blue)] animate-pulse" />
              <span className="text-xs text-[var(--electric-blue)] tracking-wide uppercase">
                Главный продукт
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
              Аудит{" "}
              <span className="text-[var(--electric-blue)]">сервисной системы</span>
            </h2>

            <p className="text-lg text-gray-400 max-w-2xl mt-4 leading-relaxed">
              Независимая оценка того, как устроен сервис сейчас, где система
              теряет время, деньги и качество, и какие изменения дадут наибольший
              эффект.
            </p>
          </div>
        )}

        {/* Две колонки: что входит / что получите */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="p-6 md:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[var(--electric-blue)]/10 flex items-center justify-center">
                <FileSearch className="w-5 h-5 text-[var(--electric-blue)]" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Что входит в аудит
              </h3>
            </div>

            <ul className="space-y-3">
              {auditIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--electric-blue)] mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 md:p-8 rounded-2xl border border-[var(--teal-accent)]/20 bg-gradient-to-br from-[var(--teal-accent)]/5 to-transparent">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[var(--teal-accent)]/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[var(--teal-accent)]" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Результат аудита
              </h3>
            </div>

            <ul className="space-y-3">
              {auditResults.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-[var(--teal-accent)]/20">
              <p className="text-xs text-gray-500 leading-relaxed">
                Объем и формат аудита зависят от масштаба сервисной системы,
                количества подразделений и глубины анализа.
              </p>
            </div>
          </div>
        </div>

        {/* Маршрут аудита */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-8">
            Как проходит аудит
          </h3>

          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-[var(--electric-blue)] via-[var(--teal-accent)] to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
              {auditSteps.map((step) => (
                <div key={step.num} className="relative">
                  <div className="w-12 h-12 rounded-full bg-[var(--graphite)] border border-[var(--electric-blue)]/40 flex items-center justify-center text-[var(--electric-blue)] font-mono text-sm font-bold mb-4 relative z-10">
                    {step.num}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showHeader && (
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contacts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white font-medium transition-all min-h-[56px]"
            >
              Обсудить аудит
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--electric-blue)]/50 text-gray-300 hover:text-white font-medium transition-all min-h-[56px]"
            >
              Подробнее об аудите
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}