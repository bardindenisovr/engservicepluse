import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Диаграмма Исикавы онлайн для анализа причин",
  description:
    "Соберите причины проблемы по группам факторов и выделите те, которые нужно проверить. Экспорт результата.",
  alternates: { canonical: "/tools/ishikawa" },
};

const STEPS = [
  "Формулируете проблему.",
  "Добавляете причины в группы и при необходимости уточняете их подпричинами.",
  "Отмечаете наиболее вероятные и проверяемые причины.",
  "Для каждой выбранной причины указываете, чем её подтвердить.",
  "Переносите выбранные причины в «5 почему», 8D или А3 — без повторного ввода.",
];

export default function IshikawaPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <nav className="text-xs text-gray-600 mb-8">
        <Link href="/" className="hover:text-gray-300">Главная</Link>
        <span className="mx-2">→</span>
        <Link href="/tools" className="hover:text-gray-300">Инструменты</Link>
        <span className="mx-2">→</span>
        <span className="text-gray-400">Диаграмма Исикавы</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
        Диаграмма Исикавы онлайн: соберите все причины проблемы на одной схеме
      </h1>
      <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-3xl">
        Укажите проблему, распределите возможные причины по группам факторов и выберите те,
        которые нужно проверить в первую очередь. Диаграмма помогает команде увидеть картину
        целиком, прежде чем искать решение.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Когда использовать</h2>
      <p className="text-gray-400 leading-relaxed mb-6">
        Когда у проблемы много возможных причин, мнения в команде расходятся и нужно
        упорядочить версии перед проверкой.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Группы факторов</h2>
      <p className="text-gray-400 leading-relaxed mb-3">
        По умолчанию используется классический набор: Люди, Оборудование, Материалы, Методы,
        Измерения, Окружающая среда. Для сервиса доступен набор: Заявка и планирование,
        Специалист, Запасные части и ЗИП, Документация, Взаимодействие подразделений, Условия
        эксплуатации. Группы можно переименовать под вашу ситуацию.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Как это работает</h2>
      <ol className="list-decimal list-inside space-y-2 text-gray-400 leading-relaxed mb-6">
        {STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h2 className="text-xl font-semibold text-white mb-3">Что вы получите</h2>
      <p className="text-gray-400 leading-relaxed mb-6">
        Схему в виде диаграммы, список причин с приоритетами и план их проверки.
      </p>

      <h2 className="text-xl font-semibold text-white mb-3">Границы метода</h2>
      <p className="text-gray-400 leading-relaxed mb-8">
        Диаграмма показывает версии, а не доказывает их. Наличие причины на схеме не означает,
        что она реально повлияла на событие.
      </p>

      <div className="p-6 rounded-xl border border-[var(--electric-blue)]/20 bg-[var(--electric-blue)]/5 mb-10">
        <p className="text-sm text-gray-300 mb-4">
          Рабочая версия инструмента готовится. Пока вы можете построить диаграмму в свободной
          форме или начать с цепочки причин в «5 почему».
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tools/5why"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-sm text-gray-300 hover:text-white hover:border-[var(--electric-blue)]/50 transition-colors min-h-[44px]"
          >
            Начать с «5 почему»
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white text-sm font-medium transition-all min-h-[44px]"
          >
            Построить диаграмму
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-white mb-3">Вопросы</h2>
      <div className="space-y-4 text-gray-400 leading-relaxed mb-10">
        <details className="rounded-lg border border-[var(--border-subtle)] p-4">
          <summary className="cursor-pointer text-white font-medium">Чем диаграмма отличается от «5 почему»?</summary>
          <p className="mt-2">Исикава расширяет круг версий, «5 почему» углубляет одну из них. Методы дополняют друг друга.</p>
        </details>
        <details className="rounded-lg border border-[var(--border-subtle)] p-4">
          <summary className="cursor-pointer text-white font-medium">Можно ли использовать вместе?</summary>
          <p className="mt-2">Да, это рекомендуемая последовательность: сначала общая картина на диаграмме, затем углубление выбранной причины.</p>
        </details>
      </div>

      <div className="p-6 rounded-xl border border-[var(--teal-accent)]/20 bg-[var(--teal-accent)]/5">
        <h2 className="text-lg font-semibold text-white mb-2">Причин много, а времени на проверку мало?</h2>
        <p className="text-sm text-gray-300 mb-4">
          Обсудите задачу и определите, какие версии проверять первыми.
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
