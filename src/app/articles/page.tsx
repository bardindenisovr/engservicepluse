import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, ExternalLink, Clock, Calendar } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });

  if (!article) return { title: "Статья не найдена" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date.toISOString(),
    },
    alternates: {
      canonical: `/articles/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
    include: { category: true, tags: true },
  });

  if (!article || !article.published) notFound();

  const related = await prisma.article.findMany({
    where: {
      published: true,
      id: { not: article.id },
      OR: [
        { categoryId: article.categoryId ?? undefined },
        { tags: { some: { id: { in: article.tags.map((t) => t.id) } } } },
      ],
    },
    include: { category: true },
    take: 3,
  });

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--electric-blue)] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Все материалы
      </Link>

      <div className="flex flex-wrap items-center gap-3 mb-6 text-xs">
        <span
          className={`uppercase tracking-wider px-2 py-1 rounded ${
            article.source === "telegram"
              ? "bg-[#229ED9]/10 text-[#4db8e8]"
              : article.source === "tenchat"
              ? "bg-[var(--electric-blue)]/10 text-[var(--electric-blue)]"
              : "bg-[var(--teal-accent)]/10 text-[var(--teal-accent)]"
          }`}
        >
          {article.source}
        </span>
        {article.category && (
          <span className="text-gray-500">{article.category.name}</span>
        )}
        <span className="flex items-center gap-1 text-gray-600">
          <Calendar className="w-3 h-3" />
          {article.date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span className="flex items-center gap-1 text-gray-600">
          <Clock className="w-3 h-3" />
          {article.readingTime} мин
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
        {article.title}
      </h1>

      <p className="text-lg text-gray-400 leading-relaxed mb-8">
        {article.excerpt}
      </p>

      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-[var(--border-subtle)]">
          {article.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 text-xs text-gray-500 border border-[var(--border-subtle)] rounded-md"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <div
        className="text-gray-300 leading-relaxed space-y-4 [&_h3]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_a]:text-[var(--electric-blue)]"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />

      <div className="mt-12 pt-6 border-t border-[var(--border-subtle)]">
        <a
          href={article.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[var(--electric-blue)] hover:text-[var(--teal-accent)] transition-colors"
        >
          Открыть оригинал у автора
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-10 p-6 rounded-xl border border-[var(--teal-accent)]/20 bg-[var(--teal-accent)]/5">
        <p className="text-sm text-gray-300 mb-3">
          Если похожая задача существует в вашей компании, её можно разобрать на
          консультации или в рамках аудита.
        </p>
        <Link
          href="/contacts"
          className="inline-flex items-center gap-2 text-sm text-[var(--teal-accent)] hover:text-white transition-colors font-medium"
        >
          Обсудить задачу →
        </Link>
      </div>

      {related.length > 0 && (
        <div className="mt-16 pt-10 border-t border-[var(--border-subtle)]">
          <h2 className="text-lg font-semibold text-white mb-6">
            Похожие материалы
          </h2>
          <div className="grid gap-4">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/articles/${r.slug}`}
                className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 hover:border-[var(--electric-blue)]/40 transition-colors group"
              >
                <h3 className="text-base font-medium text-white group-hover:text-[var(--electric-blue)] transition-colors mb-2">
                  {r.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}