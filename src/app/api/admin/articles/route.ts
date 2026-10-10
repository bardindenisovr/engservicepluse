import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }
  try {
    const articles = await prisma.article.findMany({
      include: { category: true, tags: true },
      orderBy: { date: "desc" },
    });
    return NextResponse.json({
      articles: articles.map((a) => ({
        id: a.id, slug: a.slug, title: a.title, excerpt: a.excerpt,
        source: a.source, categoryId: a.categoryId,
        categoryName: a.category?.name ?? "",
        tags: a.tags.map((t) => t.name),
        published: a.published, featured: a.featured,
        date: a.date.toISOString().split("T")[0], readingTime: a.readingTime,
      })),
    });
  } catch (error) {
    console.error("Ошибка загрузки статей:", error);
    return NextResponse.json({ error: "Ошибка загрузки" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { slug, title, excerpt, body: articleBody, source, categoryId,
      tags, readingTime, published, featured } = body;
    if (![slug, title, excerpt, articleBody].every(
      value => typeof value === "string" && value.trim().length > 0
    )) {
      return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
    }
    if (body.originalUrl != null && typeof body.originalUrl !== "string") {
      return NextResponse.json({ error: "Неверная ссылка на оригинал" }, { status: 400 });
    }
    const originalUrl = (body.originalUrl ?? "").trim();
    if (originalUrl) {
      try {
        const url = new URL(originalUrl);
        if (!["http:", "https:"].includes(url.protocol)) throw new Error("protocol");
      } catch {
        return NextResponse.json({ error: "Укажите ссылку с протоколом http или https" }, { status: 400 });
      }
    }
    if (tags != null && (!Array.isArray(tags) || tags.some(tag => typeof tag !== "string"))) {
      return NextResponse.json({ error: "Неверный формат тегов" }, { status: 400 });
    }
    const tagMap = new Map<string, string>();
    for (const tag of tags ?? []) {
      const name = tag.trim();
      const tagSlug = toSlug(name);
      if (tagSlug && !tagMap.has(tagSlug)) tagMap.set(tagSlug, name);
    }
    const article = await prisma.article.create({
      data: {
        slug: slug.trim(), title: title.trim(), excerpt: excerpt.trim(),
        body: articleBody,
        source: source ?? "site",
        categoryId: categoryId || null,
        originalUrl,
        readingTime: Number(readingTime) || 5,
        published: published !== false,
        featured: featured === true,
        tags: {
          connectOrCreate: Array.from(tagMap, ([tagSlug, name]) => ({
            where: { slug: tagSlug }, create: { slug: tagSlug, name },
          })),
        },
      },
    });
    return NextResponse.json({ article });
  } catch (error) {
    console.error("Ошибка создания статьи:", error);
    return NextResponse.json(
      { error: "Ошибка создания. Возможно, slug уже используется." }, { status: 500 }
    );
  }
}

function toSlug(input: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
    ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };
  return input.toLowerCase().trim().replace(/[а-яё]/g, char => map[char] ?? char)
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
