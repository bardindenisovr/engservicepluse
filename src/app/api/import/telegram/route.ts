import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FEED_URL = "https://rsshub.app/telegram/channel/engserviceplus";
const IMPORT_SECRET = process.env.IMPORT_SECRET ?? "change-me-in-env";

function parseRSS(xml: string) {
  const items: any[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const getTag = (tag: string) => {
      const m = itemXml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
      return m ? m[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim() : "";
    };

    items.push({
      title: getTag("title"),
      link: getTag("link"),
      description: getTag("description"),
      pubDate: getTag("pubDate"),
    });
  }
  return items;
}

export async function GET(request: Request) {
  // Проверка секретного ключа
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  if (secret !== IMPORT_SECRET) {
    return NextResponse.json({ error: "Доступ запрещён" }, { status: 401 });
  }

  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "ServiceInPlus/1.0" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`RSS fetch failed: ${res.status}`);
    }

    const xml = await res.text();
    const items = parseRSS(xml);

    let imported = 0;

    for (const item of items.slice(0, 10)) {
      if (!item.link) continue;

      const existing = await prisma.article.findFirst({
        where: { originalUrl: item.link },
      });

      if (existing) continue;

      const slug = item.title
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
        .replace(/^-+|-+$/g, "");

      const excerpt = item.description
        .replace(/<[^>]*>/g, "")
        .slice(0, 200)
        .trim();

      await prisma.article.create({
        data: {
          slug: `${slug}-${Date.now().toString().slice(-4)}`,
          title: item.title || "Без названия",
          excerpt: excerpt || "Материал из Telegram-канала",
          body: item.description || "<p>Читайте в оригинале</p>",
          source: "telegram",
          originalUrl: item.link,
          readingTime: 5,
          published: true,
        },
      });

      imported++;
    }

    return NextResponse.json({ ok: true, imported, total: items.length });
  } catch (error) {
    console.error("Ошибка импорта из Telegram:", error);
    return NextResponse.json(
      { error: "Не удалось импортировать материалы" },
      { status: 500 }
    );
  }
}