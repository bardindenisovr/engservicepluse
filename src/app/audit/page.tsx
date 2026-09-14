import Link from "next/link";
import { FileSearch, CheckCircle2, ArrowRight } from "lucide-react";
import AuditSection from "@/components/AuditSection";
import LeadMagnet from "@/components/LeadMagnet";

export const metadata = {
  title: "Аудит сервисной системы",
  description:
    "Независимая оценка того, как устроен сервис сейчас, где система теряет время, деньги и качество, и какие изменения дадут наибольший эффект.",
};

export default function AuditPage() {
  return (
    <div className="relative z-10">
      {/* Первый экран страницы аудита */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--electric-blue)] animate-pulse" />
            <span className="text-xs text-[var(--electric-blue)] tracking-wide uppercase">
              Главный продукт
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Аудит{" "}
            <span className="text-[var(--electric-blue)]">
              сервисной системы
            </span>
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed mb-8">
            Независимая оценка того, как устроен сервис сейчас, где система
            теряет время, деньги и качество, и какие изменения дадут наибольший
            эффект.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contacts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white font-medium transition-all min-h-[56px]"
            >
              Обсудить аудит
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Основной блок про аудит (переиспользуем компонент) */}
      <AuditSection />

      {/* Дополнительный блок: что даёт аудит */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Что вы получите по итогам аудита
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Объективную картину текущего состояния сервиса",
            "Карту узких мест и зон потери эффективности",
            "Перечень рисков и их приоритеты",
            "Целевую модель сервисной системы",
            "Дорожную карту изменений с этапами",
            "Рекомендации по KPI и зонам ответственности",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40"
            >
              <CheckCircle2 className="w-5 h-5 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-300 leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Лид-магниты — полезные материалы за контакт */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-[var(--border-subtle)]">
        <div className="max-w-3xl mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Полезные материалы для самостоятельной работы
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Выберите материал — я отправлю его на ваш email. Без спама, только
            по делу.
          </p>
        </div>
        <LeadMagnet />
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="p-8 md:p-10 rounded-2xl border border-[var(--teal-accent)]/20 bg-gradient-to-br from-[var(--teal-accent)]/5 to-transparent">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[var(--teal-accent)]/10 flex items-center justify-center flex-shrink-0">
              <FileSearch className="w-6 h-6 text-[var(--teal-accent)]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Обсудим ваш аудит
              </h3>
              <p className="text-sm text-gray-400">
                Объем и формат зависят от масштаба сервисной системы
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-2xl">
            Объем и формат аудита зависят от масштаба сервисной системы,
            количества подразделений и глубины анализа. Опишите вашу ситуацию —
            предложу подходящий формат.
          </p>

          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--teal-accent)] hover:bg-[var(--teal-accent)]/90 text-[var(--background)] font-medium transition-all min-h-[56px]"
          >
            Заказать аудит
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}