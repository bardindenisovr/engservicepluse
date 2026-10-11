import type { Metadata } from "next";
import KnowledgeBase from "@/components/KnowledgeBase";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "База знаний",
  description: "Практические материалы о сервисной архитектуре, SLA, гарантии, сервисных сетях, ЗИП, ТОиР и экономике сервиса.",
  alternates: { canonical: "https://serviceinplus.ru/articles" },
};

export default async function ArticlesPage() {
  const records = await prisma.article.findMany({
    where: { published: true },
    select: { id: true, slug: true, title: true, excerpt: true, body: true, date: true, readingTime: true, tags: { select: { name: true } } },
    orderBy: { date: "desc" },
  });
  const articles = records.map(article => ({
    ...article,
    date: article.date.toISOString().split("T")[0],
    tags: article.tags.map(tag => tag.name),
  }));
  return <KnowledgeBase initialArticles={articles} standalone />;
}
