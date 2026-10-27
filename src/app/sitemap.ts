import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SERVICES } from "@/data/service-pages";

// Generate on request: new publications must not require a new deployment.
export const dynamic = "force-dynamic";

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://serviceinplus.ru").replace(/\/+$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Do not use request time as a fictitious content modification date.
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/audit`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/ekspress-diagnostika`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/methodology`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cases`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/articles`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/contacts`, changeFrequency: "yearly", priority: 0.7 },
  ];

  // Страницы услуг из единого источника данных; /ekspress-diagnostika уже есть в staticPages.
  const servicePages: MetadataRoute.Sitemap = SERVICES.filter(
    (s) => s.href !== "/ekspress-diagnostika",
  ).map((s) => ({
    url: `${BASE_URL}${s.href}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { slug: "asc" },
    });
    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${BASE_URL}/articles/${encodeURIComponent(article.slug)}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
    return [...staticPages, ...servicePages, ...articlePages];
  } catch (error) {
    // A failed database query must not silently publish an incomplete sitemap.
    console.error("[sitemap] Failed to load published articles", error);
    throw error;
  }
}
