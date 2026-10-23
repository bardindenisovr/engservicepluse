import type { Metadata } from "next";
import Cases from "@/components/Cases";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Кейсы",
  description:
    "Материалы-кейсы о практике технического сервиса: диспетчеризация обращений, стандарты партнёрской сети, управление гарантией и ЗИП. Ситуация, анализ, решение, результат.",
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
  return <Cases initialArticles={articles} standalone />;
}