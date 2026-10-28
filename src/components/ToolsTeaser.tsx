import Link from "next/link";
import { Wrench, ArrowRight } from "lucide-react";

const TOOLS = ["5 почему", "Диаграмма Исикавы", "Отчёт 8D", "Лист А3"];

// Блок на главной: бесплатный самостоятельный разбор → /tools (раздел 8 документа)
export default function ToolsTeaser() {
  return (
    <section className="relative z-10 border-t border-[var(--border-subtle)]">
      <div className="max-w-[1360px] mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 p-7 md:p-10 rounded-2xl border border-[var(--electric-blue)]/20 bg-gradient-to-br from-[var(--electric-blue)]/5 to-transparent">
          <div className="flex-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-5">
              <div className="w-2 h-2 rounded-full bg-[var(--electric-blue)] animate-pulse" />
              <span className="text-xs text-[var(--electric-blue)] tracking-wide uppercase">
                Бесплатные инструменты
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
              Проблема повторяется? Разберите её по шагам
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-2xl mb-5">
              Онлайн-инструменты помогают найти причину, спланировать меры и
              оформить отчёт для команды или заказчика. Без регистрации, данные
              сохраняются в вашем браузере.
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Доступные инструменты">
              {TOOLS.map((t) => (
                <li
                  key={t}
                  className="px-3 py-1.5 rounded-full border border-[var(--border-subtle)] text-xs text-gray-300"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 px-8 rounded-xl bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white font-medium transition-all min-h-[56px] w-full sm:w-auto flex-shrink-0"
          >
            <Wrench className="w-4 h-4" aria-hidden="true" />
            Открыть инструменты
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
