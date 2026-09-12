import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      include: { category: true, tags: true },
      orderBy: { date: "desc" },
    });

    return NextResponse.json({
      articles: articles.map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        body: a.body,
        source: a.source as "telegram" | "tenchat" | "site",
        category: a.category?.name ?? "Без рубрики",
        tags: a.tags.map((t) => t.name),
        date: a.date.toISOString().split("T")[0],
        readingTime: a.readingTime,
        originalUrl: a.originalUrl,
      })),
    });
  } catch (error) {
    console.error("Ошибка загрузки статей:", error);
    return NextResponse.json(
      { error: "Не удалось загрузить статьи" },
      { status: 500 }
    );
  }
}