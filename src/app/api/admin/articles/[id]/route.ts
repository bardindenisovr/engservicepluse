import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

function validId(id: string) {
  const value = Number(id);
  return /^\d+$/.test(id) && Number.isSafeInteger(value) && value > 0 ? value : null;
}
function bad(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  const articleId = validId((await params).id);
  if (articleId === null) return bad("Неверный ID");
  try {
    const article = await prisma.article.findUnique({ where: { id: articleId }, include: { category: true, tags: true } });
    if (!article) return NextResponse.json({ error: "Статья не найдена" }, { status: 404 });
    return NextResponse.json({ article: {
      id: article.id, slug: article.slug, title: article.title, excerpt: article.excerpt,
      body: article.body, source: article.source, categoryId: article.categoryId,
      categoryName: article.category?.name ?? "", tags: article.tags.map(t => t.name),
      originalUrl: article.originalUrl, readingTime: article.readingTime,
      published: article.published, featured: article.featured,
      date: article.date.toISOString().split("T")[0],
    } });
  } catch (error) {
    console.error("Ошибка загрузки статьи:", error);
    return NextResponse.json({ error: "Ошибка загрузки" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  const articleId = validId((await params).id);
  if (articleId === null) return bad("Неверный ID");
  let body;
  try { body = await request.json(); } catch { return bad("Некорректный JSON"); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return bad("Некорректные данные статьи");
  const { slug, title, excerpt, body: articleBody, source, categoryId, tags, originalUrl, readingTime, published, featured } = body;
  for (const [name, value] of Object.entries({ slug, title, excerpt, body: articleBody })) {
    if (value !== undefined && (typeof value !== "string" || !value.trim())) return bad(`Поле ${name} должно быть непустой строкой`);
  }
  if (source !== undefined && !["site", "telegram", "tenchat"].includes(source)) return bad("Неверный источник");
  if (categoryId !== undefined && categoryId !== null && (!Number.isSafeInteger(categoryId) || categoryId <= 0)) return bad("Неверная рубрика");
  if (published !== undefined && typeof published !== "boolean") return bad("Неверный статус публикации");
  if (featured !== undefined && typeof featured !== "boolean") return bad("Неверный статус избранного");
  if (readingTime !== undefined && (!Number.isSafeInteger(Number(readingTime)) || Number(readingTime) <= 0)) return bad("Время чтения должно быть положительным целым числом");
  let normalizedUrl: string | undefined;
  if (originalUrl !== undefined) {
    if (typeof originalUrl !== "string") return bad("Ссылка должна быть строкой");
    normalizedUrl = originalUrl.trim();
    if (normalizedUrl) {
      try {
        const url = new URL(normalizedUrl);
        if (!["http:", "https:"].includes(url.protocol)) return bad("Допустимы только ссылки HTTP и HTTPS");
      } catch { return bad("Некорректная ссылка на оригинал"); }
    }
  }
  let normalizedTags: { name: string; slug: string }[] | undefined;
  if (tags !== undefined) {
    if (!Array.isArray(tags) || tags.some(t => typeof t !== "string")) return bad("Теги должны быть массивом строк");
    const unique = new Map<string, string>();
    for (const tag of tags as string[]) {
      const name = tag.trim();
      if (!name) continue;
      const tagSlug = toSlug(name);
      if (!tagSlug) return bad("Тег должен содержать буквы или цифры");
      if (!unique.has(tagSlug)) unique.set(tagSlug, name);
    }
    normalizedTags = Array.from(unique, ([slug, name]) => ({ slug, name }));
  }
  try {
    const updated = await prisma.article.update({ where: { id: articleId }, data: {
      ...(slug !== undefined && { slug: slug.trim() }),
      ...(title !== undefined && { title: title.trim() }),
      ...(excerpt !== undefined && { excerpt: excerpt.trim() }),
      ...(articleBody !== undefined && { body: articleBody }),
      ...(source !== undefined && { source }),
      ...(categoryId !== undefined && { categoryId }),
      ...(normalizedUrl !== undefined && { originalUrl: normalizedUrl }),
      ...(readingTime !== undefined && { readingTime: Number(readingTime) }),
      ...(published !== undefined && { published }),
      ...(featured !== undefined && { featured }),
      ...(normalizedTags !== undefined && { tags: { set: [], connectOrCreate: normalizedTags.map(t => ({ where: { slug: t.slug }, create: t })) } }),
    } });
    return NextResponse.json({ article: updated });
  } catch (error) {
    console.error("Ошибка обновления статьи:", error);
    const code = (error as { code?: string }).code;
    if (code === "P2025") return NextResponse.json({ error: "Статья или связанная запись не найдена" }, { status: 404 });
    if (code === "P2002") return NextResponse.json({ error: "Такой slug уже используется" }, { status: 409 });
    return NextResponse.json({ error: "Не удалось обновить статью" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  const articleId = validId((await params).id);
  if (articleId === null) return bad("Неверный ID");
  try {
    await prisma.$transaction([
      prisma.article.update({ where: { id: articleId }, data: { tags: { set: [] } } }),
      prisma.article.delete({ where: { id: articleId } }),
    ]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка удаления статьи:", error);
    if ((error as { code?: string }).code === "P2025") return NextResponse.json({ error: "Статья не найдена" }, { status: 404 });
    return NextResponse.json({ error: "Не удалось удалить статью" }, { status: 500 });
  }
}

function toSlug(input: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };
  return input.toLowerCase().trim().replace(/[а-яё]/g, c => map[c] ?? c).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
