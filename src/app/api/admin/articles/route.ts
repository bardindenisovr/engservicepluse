import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  try {
    const articles = await prisma.article.findMany({
      include: { category: true, tags: true },
      orderBy: { date: "desc" },
    });

    return NextResponse.json({
      articles: articles.map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        source: a.source,
        categoryId: a.categoryId,
        categoryName: a.category?.name ?? "",
        tags: a.tags.map((t) => t.name),
        published: a.published,
        featured: a.featured,
        date: a.date.toISOString().split("T")[0],
        readingTime: a.readingTime,
      })),
    });
  } catch (error) {
    console.error("Ошибка загрузки статей:", error);
    return NextResponse.json({ error: "Ошибка загрузки" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      slug,
      title,
      excerpt,
      body: articleBody,
      source,
      categoryId,
      tags,
      originalUrl,
      readingTime,
      published,
      featured,
    } = body;

    if (!slug || !title || !excerpt || !articleBody || !originalUrl) {
      return NextResponse.json(
        { error: "Заполните обязательные поля" },
        { status: 400 }
      );
    }

    const article = await prisma.article.create({
      data: {
        slug,
        title,
        excerpt,
        body: articleBody,
        source: source ?? "site",
        categoryId: categoryId || null,
        originalUrl,
        readingTime: Number(readingTime) || 5,
        published: published !== false,
        featured: featured === true,
        tags: {
          connectOrCreate: (tags ?? []).map((name: string) => ({
            where: { slug: toSlug(name) },
            create: { slug: toSlug(name), name },
          })),
        },
      },
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Ошибка создания статьи:", error);
    return NextResponse.json(
      { error: "Ошибка создания. Возможно, slug уже используется." },
      { status: 500 }
    );
  }
}

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[а-яё]/g, (char) => {
      const map: Record<string, string> = {
        а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
        з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
        п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
        ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
      };
      return map[char] ?? char;
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}