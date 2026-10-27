import type { Metadata } from "next";
import Link from "next/link";
import Cases from "@/components/Cases";
import { prisma } from "@/lib/prisma";
import { CASE_TASKS } from "@/data/case-tasks";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Практика организации сервиса и ТОиР",
  description:
    "Подтверждённые кейсы, образцы рабочих материалов и типовые задачи по организации сервиса и ТОиР: условия, действия, результаты и ограничения.",
  alternates: { canonical: "https://serviceinplus.ru/cases" },
};

export default async function CasesPage() {
  const records = await prisma.article.findMany({
    where: { published: true, category: { slug: "cases" } },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      body: true,
      date: true,
      readingTime: true,
      tags: { select: { name: true } },
    },
    orderBy: { date: "desc" },
  });
  const articles = records.map((article) => ({
    ...article,
    date: article.date.toISOString().split("T")[0],
    tags: article.tags.map((tag) => tag.name),
  }));

  return (
    <div className="relative z-10">
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
          Практика организации сервиса и ТОиР
        </h1>
        <p className="mt-4 text-gray-400 max-w-3xl leading-relaxed">
          Смотреть стоит не только на итоговую цифру, но и на условия её получения:
          исходную проблему, действия команды, период и ограничения. В этом разделе
          отдельно представлены подтверждённые кейсы, образцы рабочих материалов и
          типовые задачи. Типовой пример не выдаётся за результат клиентского проекта.
        </p>
      </section>

      <section
        aria-label="Типовые задачи"
        className="max-w-7xl mx-auto px-6 py-10"
      >
        <h2 className="text-2xl font-semibold text-white mb-2">
          Типовые задачи
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Примеры постановок задач — не результаты конкретных клиентских проектов.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {CASE_TASKS.map((item) => (
            <article
              key={item.title}
              className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 flex flex-col"
            >
              <h3 className="text-lg font-semibold text-white leading-snug">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                {item.task}
              </p>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed flex-1">
                {item.result}
              </p>
              <Link
                href={item.ctaHref}
                className="mt-4 inline-flex items-center text-sm font-medium text-[var(--accent)] hover:text-white transition-colors"
              >
                {item.ctaText} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Cases initialArticles={articles} standalone />

      <section
        aria-label="Как публикуются кейсы"
        className="max-w-7xl mx-auto px-6 py-10"
      >
        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
          <h2 className="text-lg font-semibold text-white mb-4">
            Как формируются кейсы
          </h2>
          <div className="space-y-3 text-sm text-gray-400 leading-relaxed max-w-3xl">
            <p>
              Карточка кейса: контекст → исходная проблема → роль Романа → действия →
              результат → период → ограничения → релевантная услуга. Для каждого числа
              указываются показатель, исходный и итоговый уровень, периметр и источник
              подтверждения. Если исходного значения нет, показывается достигнутый
              масштаб, а не заявляемый прирост.
            </p>
            <p>
              Достижения из работы в компании подписываются «Из управленческой практики
              Романа Бардина-Денисова» и не оформляются как результаты независимого
              консалтинга. Географический охват не приравнивается к постоянному
              присутствию, выручка — к прибыли, число прошедших обучение — к доказанному
              изменению качества.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
