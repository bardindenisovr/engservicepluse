import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
const CHANNEL_URL = "https://t.me/s/engserviceplus";

function escapeHTML(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function parseTelegramHTML(html: string) {
  const posts: { title: string; text: string; link: string; date: string }[] = [];
  const messageRegex = /<div class="tgme_widget_message_wrap[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
  const matches = html.match(messageRegex);
  if (!matches) return posts;
  for (const block of matches) {
    const linkMatch = block.match(/data-post="([^"]+)"/);
    const link = linkMatch ? `https://t.me/${linkMatch[1]}` : "";
    const dateMatch = block.match(/<time[^>]*datetime="([^"]+)"/);
    const date = dateMatch ? dateMatch[1] : "";
    const textMatch = block.match(/<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/);
    const rawText = textMatch ? textMatch[1] : "";
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
    posts.push({ title: cleanText.split("\n")[0].slice(0, 100), text: cleanText, link, date });
  }
  return posts;
}

async function importTelegram(request: Request) {
  const configuredSecret = process.env.IMPORT_SECRET;
  if (!configuredSecret?.trim() || configuredSecret === "change-me-in-env") {
    return NextResponse.json({ error: "Импорт не настроен" }, { status: 503 });
  }
  const authorization = request.headers.get("authorization");
  // Keep existing GET schedules compatible until they move to POST + Bearer.
  const secret = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : request.method === "GET" ? new URL(request.url).searchParams.get("secret") : null;
  const expected = Buffer.from(configuredSecret);
  const provided = Buffer.from(secret ?? "");
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return NextResponse.json({ error: "Доступ запрещён" }, { status: 401 });
  }
  try {
    const res = await fetch(CHANNEL_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
      },
    });
    if (!res.ok) throw new Error(`Telegram fetch failed: ${res.status}`);
    const html = await res.text();
    const posts = parseTelegramHTML(html);
    if (posts.length === 0) {
      return NextResponse.json({ ok: false, error: "Не удалось извлечь посты. Возможно, изменилась структура страницы.", htmlLength: html.length });
    }
    let imported = 0;
    for (const post of posts.slice(-10)) {
      if (!post.link) continue;
      const existing = await prisma.article.findFirst({ where: { originalUrl: post.link } });
      if (existing) continue;
      const slug = post.title.toLowerCase().replace(/[а-яё]/g, (c) => {
        const map: Record<string, string> = {
          а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
        };
        return map[c] ?? c;
      }).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
      await prisma.article.create({
        data: {
          slug: `${slug || "post"}-${Date.now().toString().slice(-5)}`,
          title: post.title || "Материал из Telegram",
          excerpt: post.text.slice(0, 200),
          body: post.text.split("\n").map((line) => `<p>${escapeHTML(line)}</p>`).join(""),
          source: "telegram",
          originalUrl: post.link,
          readingTime: Math.max(3, Math.ceil(post.text.length / 1000)),
          published: true,
        },
      });
      imported++;
    }
    return NextResponse.json({ ok: true, imported, total: posts.length });
  } catch (error) {
    console.error("Ошибка импорта из Telegram:", error);
    return NextResponse.json({ error: "Не удалось импортировать материалы" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return importTelegram(request);
}

export async function POST(request: Request) {
  return importTelegram(request);
}
