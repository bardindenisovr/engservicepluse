import { CheckCircle2 } from "lucide-react";

const results = [
  "Появляется прозрачная ответственность за результат",
  "Сокращается время реакции на обращение",
  "Снижается количество потерянных заявок",
  "Уменьшается доля повторных неисправностей",
  "Повышается предсказуемость сроков восстановления",
  "Улучшается управляемость партнеров и подрядчиков",
  "Запасные части становятся доступнее при меньших излишках",
  "Руководство получает понятную управленческую отчетность",
  "Решения принимаются на основе данных, а не ощущений",
  "Сервис становится частью продукта компании",
  "Появляются возможности для постгарантийной выручки",
  "Снижается зависимость от отдельных сотрудников",
];

export default function Results() {
  return (
    <section className="relative z-10 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Заголовок */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--teal-accent)] animate-pulse" />
            <span className="text-xs text-[var(--teal-accent)] tracking-wide uppercase">
              Результат для бизнеса
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            Что меняется после{" "}
            <span className="text-[var(--teal-accent)]">системной работы</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mt-4 leading-relaxed">
            Не абстрактные обещания, а направления измеримого результата.
          </p>
        </div>

        {/* Сетка результатов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result) => (
            <div
              key={result}
              className="flex items-start gap-3 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 hover:border-[var(--teal-accent)]/30 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-300 leading-relaxed">
                {result}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}