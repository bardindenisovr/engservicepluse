// app/admin/articles/page.tsx
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

import DeleteArticleButton from '@/components/admin/DeleteArticleButton';
// Если используете next-auth, раскомментируйте и укажите правильный путь:
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

// Отключаем кэширование, чтобы список всегда был актуальным
export const dynamic = 'force-dynamic';

export default async function AdminArticlesPage() {
  // 1. Проверка прав администратора (если не используете middleware)
  // Если authOptions нет — удалите этот блок или замените на свою проверку.
  const session = await getServerSession(/* authOptions */);
  if (!session || (session.user as any).role !== 'ADMIN') {
    redirect('/login'); // или показать 403
  }

  // 2. Получаем статьи из базы данных
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      createdAt: true,
    },
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление статьями</h1>
        <Link
          href="/admin/articles/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Создать статью
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-500">Статей пока нет.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Заголовок</th>
                <th className="px-4 py-2 text-left">Slug</th>
                <th className="px-4 py-2 text-left">Опубликована</th>
                <th className="px-4 py-2 text-left">Дата создания</th>
                <th className="px-4 py-2 text-left">Действия</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{article.id}</td>
                  <td className="px-4 py-2">{article.title}</td>
                  <td className="px-4 py-2">{article.slug}</td>
                  <td className="px-4 py-2">
                    {article.published ? 'Да' : 'Нет'}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(article.createdAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Редактировать
                    </Link>
                    <DeleteArticleButton articleId={article.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}