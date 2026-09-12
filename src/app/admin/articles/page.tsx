import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Plus, Edit, Eye, EyeOff } from "lucide-react";

export default async function AdminArticlesPage() {
  const authed = await isAuthenticated();
  if (!authed) redirect("/admin/login");

  const articles = await prisma.article.findMany({
    include: { category: true, tags: true },
    orderBy: { date: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Статьи</h1>
          <p className="text-sm text-gray-500">Всего: {articles.length}</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          Новая статья
        </Link>
      </div>

      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--graphite)] text-xs uppercase tracking-wider text-gray-500">
            <tr>
              <th className="text-left px-4 py-3">Заголовок</th>
              <th className="text-left px-4 py-3">Рубрика</th>
              <th className="text-left px-4 py-3">Источник</th>
              <th className="text-left px-4 py-3">Дата</th>
              <th className="text-center px-4 py-3">Статус</th>
              <th className="text-right px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr
                key={article.id}
                className="border-t border-[var(--border-subtle)] hover:bg-[var(--graphite)]/60 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="text-white font-medium leading-snug line-clamp-1">
                    {article.title}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">/{article.slug}</div>
                </td>
                <td className="px-4 py-4 text-gray-400 text-xs">
                  {article.category?.name ?? "—"}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded ${
                      article.source === "telegram"
                        ? "bg-[#229ED9]/10 text-[#4db8e8]"
                        : article.source === "tenchat"
                        ? "bg-[var(--electric-blue)]/10 text-[var(--electric-blue)]"
                        : "bg-[var(--teal-accent)]/10 text-[var(--teal-accent)]"
                    }`}
                  >
                    {article.source}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-500 text-xs">
                  {article.date.toLocaleDateString("ru-RU")}
                </td>
                <td className="px-4 py-4 text-center">
                  {article.published ? (
                    <Eye className="w-4 h-4 text-[var(--teal-accent)] inline" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-600 inline" />
                  )}
                </td>
                <td className="px-4 py-4 text-right">
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--electric-blue)] hover:text-[var(--teal-accent)] transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Редактировать
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {articles.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <p className="mb-4">Пока нет статей</p>
            <Link
              href="/admin/articles/new"
              className="text-[var(--electric-blue)] hover:text-[var(--teal-accent)] text-sm"
            >
              Создать первую статью
            </Link>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link
          href="/admin"
          className="text-sm text-gray-500 hover:text-white transition-colors"
        >
          ← Назад в админ-панель
        </Link>
      </div>
    </div>
  );
}