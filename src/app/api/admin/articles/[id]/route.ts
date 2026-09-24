import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

// ─────────── GET: получить одну статью ───────────
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const { id } = await params;
  const articleId = parseInt(id, 10);
  if (isNaN(articleId)) {
    return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
  }

  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: { category: true, tags: true },
    });

    if (!article) {
      return NextResponse.json({ error: "Статья не найдена" }, { status: 404 });
    }

    return NextResponse.json({
      article: {
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        body: article.body,
        source: article.source,
        categoryId: article.categoryId,
        categoryName: article.category?.name ?? "",
        tags: article.tags.map((t) => t.name),
        originalUrl: article.originalUrl,
        readingTime: article.readingTime,
        published: article.published,
        featured: article.featured,
        date: article.date.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.error("Ошибка загрузки статьи:", error);
    return NextResponse.json({ error: "Ошибка загрузки" }, { status: 500 });
  }
}

// ─────────── PUT: обновить статью ───────────
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const { id } = await params;
  const articleId = parseInt(id, 10);
  if (isNaN(articleId)) {
    return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
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

    const updated = await prisma.article.update({
      where: { id: articleId },
      data: {
        ...(slug !== undefined && { slug }),
        ...(title !== undefined && { title }),
        ...(excerpt !== undefined && { excerpt }),
        ...(articleBody !== undefined && { body: articleBody }),
        ...(source !== undefined && { source }),
        ...(categoryId !== undefined && { categoryId: categoryId || null }),
        ...(originalUrl !== undefined && { originalUrl }),
        ...(readingTime !== undefined && { readingTime: Number(readingTime) || 5 }),
        ...(published !== undefined && { published: published !== false }),
        ...(featured !== undefined && { featured: featured === true }),
        ...(tags !== undefined && {
          tags: {
            set: [],
            connectOrCreate: (tags ?? []).map((name: string) => ({
              where: { slug: toSlug(name) },
              create: { slug: toSlug(name), name },
            })),
          },
        }),
      },
    });

    return NextResponse.json({ article: updated });
  } catch (error) {
    console.error("Ошибка обновления статьи:", error);
    return NextResponse.json(
      { error: "Не удалось обновить статью. Возможно, slug уже используется." },
      { status: 500 }
    );
  }
}

// ─────────── DELETE: удалить статью ───────────
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const { id } = await params;
  const articleId = parseInt(id, 10);
  if (isNaN(articleId)) {
    return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
  }

  try {
    // Отключаем связи с тегами, чтобы delete не упал на внешних ключах
    await prisma.article.update({
      where: { id: articleId },
      data: { tags: { set: [] } },
    });

    await prisma.article.delete({ where: { id: articleId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка удаления статьи:", error);
    return NextResponse.json(
      { error: "Не удалось удалить статью" },
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