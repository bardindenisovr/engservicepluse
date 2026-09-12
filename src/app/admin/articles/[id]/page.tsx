import { redirect, notFound } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ArticleForm from "@/components/admin/ArticleForm";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const authed = await isAuthenticated();
  if (!authed) redirect("/admin/login");

  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id: Number(id) },
    include: { tags: true },
  });

  if (!article) notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-white mb-2">Редактирование статьи</h1>
      <p className="text-sm text-gray-500 mb-8">{article.title}</p>
      <ArticleForm
        initialData={{
          id: article.id,
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          body: article.body,
          source: article.source,
          categoryId: article.categoryId,
          tags: article.tags.map((t) => t.name),
          originalUrl: article.originalUrl,
          readingTime: article.readingTime,
          published: article.published,
          featured: article.featured,
        }}
      />
    </div>
  );
}