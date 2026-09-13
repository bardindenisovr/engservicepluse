import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CHANNEL_URL = "https://t.me/s/engserviceplus";
const IMPORT_SECRET = process.env.IMPORT_SECRET ?? "change-me-in-env";

function parseTelegramHTML(html: string) {
  const posts: { title: string; text: string; link: string; date: string }[] = [];

  // Разбиваем на блоки сообщений
  const messageRegex =
    /<div class="tgme_widget_message_wrap[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
  const matches = html.match(messageRegex);

  if (!matches) return posts;

  for (const block of matches) {
    // Ссылка на пост
    const linkMatch = block.match(/data-post="([^"]+)"/);
    const link = linkMatch ? `https://t.me/${linkMatch[1]}` : "";

    // Дата
    const dateMatch = block.match(/<time[^>]*datetime="([^"]+)"/);
    const date = dateMatch ? dateMatch[1] : "";

    // Текст
    const textMatch = block.match(
      /<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/
    );
    const rawText = textMatch ? textMatch[1] : "";

    // Очищаем HTML-теги
    const cleanText = rawText
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]*>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();

    if (!cleanText || !link) continue;

    posts.push({
      title: cleanText.split("\n")[0].slice(0, 100),
      text: cleanText,
      link,
      date,
    });
  }

  return posts;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  if (secret !== IMPORT_SECRET) {
    return NextResponse.json({ error: "Доступ запрещён" }, { status: 401 });
  }

  try {
    const res = await fetch(CHANNEL_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
      },
    });

    if (!res.ok) {
      throw new Error(`Telegram fetch failed: ${res.status}`);
    }

    const html = await res.text();
    const posts = parseTelegramHTML(html);

    if (posts.length === 0) {
      return NextResponse.json({
        ok: false,
        error:
          "Не удалось извлечь посты. Возможно, изменилась структура страницы.",
        htmlLength: html.length,
      });
    }

    let imported = 0;

    for (const post of posts.slice(-10)) {
      // последние 10
      if (!post.link) continue;

      const existing = await prisma.article.findFirst({
        where: { originalUrl: post.link },
      });

      if (existing) continue;

      const slug = post.title
        .toLowerCase()
        .replace(/[а-яё]/g, (c) => {
          const map: Record<string, string> = {
            а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
            з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
            п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
            ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
          };
          return map[c] ?? c;
        })
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80);

      await prisma.article.create({
        data: {
          slug: `${slug || "post"}-${Date.now().toString().slice(-5)}`,
          title: post.title || "Материал из Telegram",
          excerpt: post.text.slice(0, 200),
          body: post.text
            .split("\n")
            .map((line) => `<p>${line}</p>`)
            .join(""),
          source: "telegram",
          originalUrl: post.link,
          readingTime: Math.max(3, Math.ceil(post.text.length / 1000)),
          published: true,
        },
      });

      imported++;
    }

    return NextResponse.json({
      ok: true,
      imported,
      total: posts.length,
    });
  } catch (error) {
    console.error("Ошибка импорта из Telegram:", error);
    return NextResponse.json(
      {
        error: "Не удалось импортировать материалы",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}