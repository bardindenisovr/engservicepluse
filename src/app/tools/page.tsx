import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Онлайн-инструменты для решения проблем сервиса и ТОиР",
  description:
    "5 почему, диаграмма Исикавы, 8D и А3: бесплатные инструменты для разбора повторяющихся проблем. Без регистрации, с экспортом результата.",
  alternates: { canonical: "/tools" },
};

const TOOLS = [
  {
    href: "/tools/5why",
    name: "«5 почему»",
    text: "Проверьте цепочку причин обратным ходом и доведите анализ до плана действий.",
    cta: "Разобрать проблему",
  },
  {
    href: "/tools/ishikawa",
    name: "Диаграмма Исикавы",
    text: "Соберите возможные причины по группам факторов и выберите, что проверять первым.",
    cta: "Построить диаграмму",
  },
  {
    href: "/tools/8d",
    name: "8D",
    text: "Пройдите путь от сдерживания проблемы до предупреждения её повторения.",
    cta: "Подготовить отчёт 8D",
  },
  {
    href: "/tools/a3",
    name: "Решение проблем по методике А3",
    text: "Изложите проблему, анализ и меры на одном листе и согласуйте решение с командой.",
    cta: "Заполнить лист А3",
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
        Инструменты для решения проблем сервиса и ТОиР
      </h1>
      <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-3xl">
        Практические методы для разбора повторяющихся проблем: от поиска причин до плана
        действий. Работайте на своём примере без регистрации, сохраняйте результат и при
        необходимости обсудите задачу с экспертом.
      </p>

      <h2 className="text-xl font-semibold text-white mb-4">Как выбрать</h2>
      <p className="text-gray-400 leading-relaxed mb-8">
        Если причина неясна, начните с «5 почему». Если факторов много, постройте диаграмму
        Исикавы. Если случай связан с рекламацией или участвуют несколько подразделений,
        используйте 8D. Если решение нужно согласовать и показать на одном листе, заполните
        А3.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mb-12">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 hover:border-[var(--electric-blue)]/40 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-[var(--electric-blue)] transition-colors mb-2">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{tool.text}</p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--electric-blue)]">
              {tool.cta}
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>

      <div className="p-6 rounded-xl border border-[var(--teal-accent)]/20 bg-[var(--teal-accent)]/5 mb-10">
        <h2 className="text-lg font-semibold text-white mb-2">Не уверены, какой метод подходит?</h2>
        <p className="text-sm text-gray-300 mb-4">
          Опишите ситуацию, и мы подскажем, с чего начать.
        </p>
        <Link
          href="/contacts"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white text-sm font-medium transition-all min-h-[44px]"
        >
          Подобрать инструмент
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <p className="text-xs text-gray-600 leading-relaxed">
        Инструменты помогают структурировать анализ. Они не заменяют техническую диагностику,
        расследование опасных событий и требования безопасности.
      </p>
    </div>
  );
}
