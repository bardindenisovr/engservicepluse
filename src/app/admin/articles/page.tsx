"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Article = { id: number; title: string; slug: string; published: boolean; date: string; tags: string[] };

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/admin/articles", { signal: controller.signal, cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || `Ошибка загрузки (${response.status})`);
        if (!Array.isArray(data.articles)) throw new Error("Сервер вернул неверный список статей");
        setArticles(data.articles);
      } catch (err) {
        if (!controller.signal.aborted) setError(err instanceof Error ? err.message : "Ошибка загрузки");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [retry]);

  return (
    <section className="mx-auto max-w-5xl p-6 text-white">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Управление статьями</h1>
        <Link href="/admin/articles/new" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Добавить статью</Link>
      </div>
      {loading && <p className="text-gray-400">Загрузка статей…</p>}
      {error && <div role="alert" className="rounded border border-red-400 p-4 text-red-300"><p>{error}</p><button type="button" onClick={() => setRetry(value => value + 1)} className="mt-3 underline">Повторить загрузку</button></div>}
      {!loading && !error && articles.length === 0 && <p className="text-gray-400">Статей пока нет. Добавьте первую публикацию.</p>}
      {!loading && !error && <div className="space-y-3">{articles.map(article => (
        <div key={article.id} className="flex flex-wrap items-center justify-between gap-4 rounded border border-gray-700 bg-gray-900 p-4">
          <div className="min-w-0"><h2 className="font-semibold">{article.title}</h2><p className="mt-1 text-sm text-gray-400">{article.published ? "Опубликована" : "Черновик"} · {article.date}</p><p className="mt-1 text-xs text-gray-500">{article.tags?.map(tag => `#${tag}`).join(" ")}</p></div>
          <Link href={`/admin/articles/${article.id}`} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Редактировать</Link>
        </div>
      ))}</div>}
    </section>
  );
}
