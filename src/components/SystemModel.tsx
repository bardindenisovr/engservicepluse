import { RefreshCw } from "lucide-react";

const systemElements = [
  "Клиент и его ожидания",
  "Установленное оборудование",
  "Каналы приема обращений",
  "Классификация запросов",
  "Диспетчеризация",
  "Диагностика",
  "Выездное обслуживание",
  "Удаленная поддержка",
  "Гарантия",
  "Рекламации",
  "Партнеры",
  "Подрядчики",
  "Запасные части",
  "Документация",
  "Информационные системы",
  "SLA",
  "KPI",
  "Аналитика",
  "Экономика",
  "Непрерывное улучшение",
];

const insights = [
  {
    from: "Сокращение сроков",
    requires: "требует доступности инженеров и запасных частей",
  },
  {
    from: "Повышение качества",
    requires: "требует анализа повторных обращений",
  },
  {
    from: "Развитие партнерской сети",
    requires: "требует единых стандартов",
  },
  {
    from: "Автоматизация",
    requires: "не работает без описанных процессов",
  },
  {
    from: "KPI",
    requires: "не помогают, если не связаны с бизнес-результатом",
  },
  {
    from: "Прибыльность сервиса",
    requires: "невозможна без продуктового подхода",
  },
];

export default function SystemModel() {
  return (
    <section className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--graphite)]/30">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Заголовок */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--teal-accent)] animate-pulse" />
            <span className="text-xs text-[var(--teal-accent)] tracking-wide uppercase">
              Авторский подход
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            Сервис как{" "}
            <span className="text-[var(--teal-accent)]">система</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mt-4 leading-relaxed">
            Я работаю не с отдельными симптомами, а со всей сервисной системой.
            Каждый элемент влияет на остальные — и это нельзя игнорировать.
          </p>
        </div>

        {/* Схема системы */}
        <div className="relative mb-16">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
            {/* Левая колонка элементов */}
            <div className="space-y-2">
              {systemElements.slice(0, 10).map((el) => (
                <div
                  key={el}
                  className="px-4 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-sm text-gray-400 hover:border-[var(--teal-accent)]/30 hover:text-gray-300 transition-colors"
                >
                  {el}
                </div>
              ))}
            </div>

            {/* Центральное ядро */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-40 h-40 rounded-full flex items-center justify-center text-center bg-[radial-gradient(circle_at_35%_25%,rgba(101,224,181,0.25),rgba(13,28,39,0.9)_70%)] border border-[var(--teal-accent)]/40 shadow-[0_0_60px_rgba(101,224,181,0.15)]">
                <div>
                  <RefreshCw className="w-6 h-6 text-[var(--teal-accent)] mx-auto mb-2" />
                  <strong className="block text-base font-bold text-white leading-tight">
                    Управляемый<br />сервис
                  </strong>
                </div>
              </div>
            </div>

            {/* Правая колонка элементов */}
            <div className="space-y-2">
              {systemElements.slice(10, 20).map((el) => (
                <div
                  key={el}
                  className="px-4 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-sm text-gray-400 hover:border-[var(--teal-accent)]/30 hover:text-gray-300 transition-colors"
                >
                  {el}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ключевые взаимосвязи */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-6">
            Невозможно улучшить один показатель, не учитывая его влияние на остальные
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight) => (
            <div
              key={insight.from}
              className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/50"
            >
              <p className="text-sm text-white font-medium mb-2">
                {insight.from}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {insight.requires}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}