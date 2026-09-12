import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FileText, Users, Tag, FolderTree, Plus } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminPage() {
  const authed = await isAuthenticated();
  if (!authed) redirect("/admin/login");

  const [articlesCount, leadsCount, tagsCount, categoriesCount] =
    await Promise.all([
      prisma.article.count(),
      prisma.lead.count(),
      prisma.tag.count(),
      prisma.category.count(),
    ]);

  const stats = [
    { label: "Статьи", value: articlesCount, icon: FileText, href: "/admin/articles" },
    { label: "Заявки", value: leadsCount, icon: Users, href: "/admin/leads" },
    { label: "Теги", value: tagsCount, icon: Tag, href: "/admin/tags" },
    { label: "Рубрики", value: categoriesCount, icon: FolderTree, href: "/admin/categories" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Админ-панель</h1>
          <p className="text-sm text-gray-500">Управление сайтом «Сервис в плюс»</p>
        </div>
        <LogoutButton />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 hover:border-[var(--electric-blue)]/40 transition-colors"
            >
              <Icon className="w-5 h-5 text-[var(--electric-blue)] mb-3" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          Новая статья
        </Link>
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--electric-blue)]/40 text-gray-300 hover:text-white font-medium transition-all"
        >
          Все статьи
        </Link>
      </div>
    </div>
  );
}