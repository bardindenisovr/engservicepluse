import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serviceinplus.ru";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Личные анализы пользователей, черновики и кабинет не индексируются (п. 6.2 документа).
        disallow: ["/admin", "/api/", "/cabinet", "/drafts", "/my"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
