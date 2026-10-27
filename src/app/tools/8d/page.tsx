import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Отчёт 8D онлайн для рекламаций и отказов",
  description:
    "Пройдите восемь шагов 8D: сдерживание, причина, корректирующие действия и предупреждение повторения. Экспорт отчёта.",
  alternates: { canonical: "/tools/8d" },
};

const STEPS = [
  { code: "D0", text: "Подготовка и немедленные меры." },
  { code: "D1", text: "Формирование команды." },
  { code: "D2", text: "Описание проблемы фактами." },
  { code: "D3", text: "Временные меры сдерживания." },
  { code: "D4", text: "Корневая причина и её проверка." },
  { code: "D5", text: "Выбор корректирующих действий." },
  { code: "D6", text: "Внедрение действий и проверка эффективности." },
  { code: "D7", text: "Предупреждение повторения проблемы." },
  { code: "D8", text: "Итоги и признание вклада команды." },
];

export default function EightDPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <nav className="text-xs text-gray-600 mb-8">
        <Link href="/" className="hover:text-gray-300">Главная</Link>
        <span className="mx-2">→</span>
        <Link href="/tools" className="hover:text-gray-300">Инструменты</Link>
        <span className="mx-2">→</span>
        <span className="text-gray-400">Отчёт 8D</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
        Отчёт 8D онлайн: от рекламации до предупреждения повторения
      </h1>
      <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-3xl">
        Пройдите восемь шагов структурированного решения проблемы: сдерживание, поиск причины,
        корректирующие действия и меры, которые не дадут проблеме вернуться. Формат подходит
        для работы с несколькими подразделениями и заказчиком.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Когда использовать</h2>
      <p className="text-gray-400 leading-relaxed mb-6">
        Рекламация или претензия, гарантийный случай, серьёзный отказ, повторяющийся дефект,
        случай, требующий отчёта для заказчика.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Шаги 8D</h2>
      <ol className="space-y-3 mb-6">
        {STEPS.map((step) => (
          <li
            key={step.code}
            className="flex gap-4 p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/30"
          >
            <span className="shrink-0 w-10 text-center text-sm font-bold text-[var(--electric-blue)]">
              {step.code}
            </span>
            <span className="text-sm text-gray-300 leading-relaxed">{step.text}</span>
          </li>
        ))}
      </ol>

      <h2 className="text-xl font-semibold text-white mb-3">Что вы получите</h2>
      <p className="text-gray-400 leading-relaxed mb-6">
        Отчёт 8D в виде документа для печати: описание проблемы, меры сдерживания, корневая
        причина, корректирующие действия и подтверждение эффективности.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Границы метода</h2>
      <p className="text-gray-400 leading-relaxed mb-8">
        Инструмент структурирует работу, но не заменяет исследование причины, испытания и
        решения ответственных специалистов. Меры по безопасности выполняются по действующим
        процедурам независимо от заполнения отчёта.
      </p>

      <div className="p-6 rounded-xl border border-[var(--electric-blue)]/20 bg-[var(--electric-blue)]/5 mb-10">
        <p className="text-sm text-gray-300 mb-4">
          Рабочая версия инструмента готовится. Причины и действия можно подготовить в «5
          почему», а затем перенести в шаги D4–D5 отчёта.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tools/5why"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-sm text-gray-300 hover:text-white hover:border-[var(--electric-blue)]/50 transition-colors min-h-[44px]"
          >
            Подготовить причины в «5 почему»
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white text-sm font-medium transition-all min-h-[44px]"
          >
            Подготовить отчёт 8D
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-white mb-3">Вопросы</h2>
      <div className="space-y-4 text-gray-400 leading-relaxed mb-10">
        <details className="rounded-lg border border-[var(--border-subtle)] p-4">
          <summary className="cursor-pointer text-white font-medium">Обязательно ли заполнять все шаги?</summary>
          <p className="mt-2">Для полного отчёта — да, но можно сохранить черновик и вернуться позже.</p>
        </details>
        <details className="rounded-lg border border-[var(--border-subtle)] p-4">
          <summary className="cursor-pointer text-white font-medium">Можно ли перенести данные из «5 почему»?</summary>
          <p className="mt-2">Да, причины и действия переносятся в шаги D4 и D5 без повторного ввода.</p>
        </details>
      </div>

      <div className="p-6 rounded-xl border border-[var(--teal-accent)]/20 bg-[var(--teal-accent)]/5">
        <h2 className="text-lg font-semibold text-white mb-2">Нужен отчёт, который выдержит вопросы заказчика?</h2>
        <p className="text-sm text-gray-300 mb-4">
          Обсудите задачу: поможем определить, какие доказательства нужны на шагах D4–D7.
        </p>
        <Link
          href="/contacts"
          className="inline-flex items-center gap-2 text-sm text-[var(--teal-accent)] hover:text-white transition-colors font-medium"
        >
          Обсудить задачу
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
