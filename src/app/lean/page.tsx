import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Бережливое производство в сервисе и ТОиР: статьи и инструменты",
  description:
    "Как применять методы бережливого производства в техническом сервисе: разбор причин, А3, 8D. Статьи и онлайн-инструменты.",
  alternates: { canonical: "/lean" },
};

const ITEMS = [
  {
    href: "/tools/a3",
    title: "Решение проблем по методике А3",
    text: "Основной инструмент кластера: проблема, текущее и целевое состояние, причины, меры и проверка результата на одном листе.",
  },
  {
    href: "/tools/5why",
    title: "«5 почему»",
    text: "Цепочка причин с обратной проверкой «поэтому» — базовый метод поиска корневой причины в бережливом производстве.",
  },
  {
    href: "/tools/ishikawa",
    title: "Диаграмма Исикавы",
    text: "Обзор возможных причин по группам факторов, когда версий много и нужна общая картина.",
  },
  {
    href: "/tools/8d",
    title: "8D",
    text: "Восемь шагов структурированного решения проблемы: сдерживание, причина, корректирующие действия, предупреждение повторения.",
  },
];

export default function LeanPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
        Бережливое производство в сервисе и ТОиР
      </h1>
      <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-3xl">
        Методы бережливого производства помогают убрать повторяющиеся отказы, сократить
        простои и договориться об улучшениях на фактах. Здесь собраны статьи и рабочие
        онлайн-инструменты, с которых можно начать без регистрации.
      </p>

      <h2 className="text-xl font-semibold text-white mb-4">Инструменты кластера</h2>
      <div className="grid gap-4 sm:grid-cols-2 mb-12">
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 hover:border-[var(--electric-blue)]/40 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-[var(--electric-blue)] transition-colors mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.text}</p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--electric-blue)]">
              Открыть
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-white mb-4">Публикации по теме</h2>
      <p className="text-gray-400 leading-relaxed mb-6">
        Разборы методов и практические заметки о внедрении бережливого производства в
        техническом сервисе и ТОиР — в разделе публикаций. Внутри статей есть ссылки на
        подходящие инструменты.
      </p>
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white text-sm font-medium transition-all min-h-[44px] mb-10"
      >
        Перейти к публикациям
        <ArrowRight className="w-4 h-4" />
      </Link>

      <div className="p-6 rounded-xl border border-[var(--teal-accent)]/20 bg-[var(--teal-accent)]/5">
        <h2 className="text-lg font-semibold text-white mb-2">Нужна помощь с внедрением?</h2>
        <p className="text-sm text-gray-300 mb-4">
          Помогаем внедрить методы бережливого производства в сервис: диагностика, аудит,
          практикум для команды, сопровождение проектов.
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
