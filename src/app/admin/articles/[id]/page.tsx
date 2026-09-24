"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type ArticleForm = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  source: string;
  categoryId: string;
  tags: string;
  originalUrl: string;
  readingTime: number;
  published: boolean;
  featured: boolean;
};

const EMPTY_FORM: ArticleForm = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  source: "site",
  categoryId: "",
  tags: "",
  originalUrl: "",
  readingTime: 5,
  published: true,
  featured: false,
};

const inputClass =
  "w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
const labelClass = "mb-1 block text-sm font-medium text-gray-900";

export default function EditArticlePage() {
  const params = useParams<{ id?: string }>();

  const [id, setId] = useState<string>("");
  const [form, setForm] = useState<ArticleForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ─────── Определяем id надёжно ───────
  useEffect(() => {
    const fromParams = params?.id;

    if (fromParams && fromParams !== "undefined") {
      setId(String(fromParams));
      return;
    }

    if (typeof window !== "undefined") {
      const segments = window.location.pathname.split("/").filter(Boolean);
      const last = segments[segments.length - 1];
      if (last && /^\d+$/.test(last)) {
        setId(last);
      } else {
        setId("");
      }
    }
  }, [params]);

  // ─────── Загрузка статьи ───────
  useEffect(() => {
    if (!id) {
      setError(
        "Не удалось определить ID статьи. Проверьте URL — он должен быть вида /admin/articles/5"
      );
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/admin/articles/${id}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(
            errData.error || `Ошибка загрузки (${res.status})`
          );
        }
        const data = await res.json();
        const a = data.article;

        if (!cancelled) {
          setForm({
            slug: a.slug ?? "",
            title: a.title ?? "",
            excerpt: a.excerpt ?? "",
            body: a.body ?? "",
            source: a.source ?? "site",
            categoryId: a.categoryId ? String(a.categoryId) : "",
            tags: Array.isArray(a.tags) ? a.tags.join(", ") : "",
            originalUrl: a.originalUrl ?? "",
            readingTime: a.readingTime ?? 5,
            published: a.published ?? true,
            featured: a.featured ?? false,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Не удалось загрузить статью"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // ─────── Сохранение ───────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        slug: form.slug.trim(),
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        body: form.body,
        source: form.source,
        categoryId: form.categoryId ? Number(form.categoryId) : null,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        originalUrl: form.originalUrl.trim(),
        readingTime: Number(form.readingTime) || 5,
        published: form.published,
        featured: form.featured,
      };

      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          errData.error || `Ошибка сохранения (${res.status})`
        );
      }

      setSuccess(true);

      // Прямое перенаправление — срабатывает всегда
      if (typeof window !== "undefined") {
        window.location.href = "/admin/articles";
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось сохранить статью"
      );
    } finally {
      setSaving(false);
    }
  }

  // ─────── Удаление ───────
  async function handleDelete() {
    if (!id) return;
    if (!confirm("Удалить эту статью? Действие необратимо.")) return;
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Ошибка удаления (${res.status})`);
      }
      if (typeof window !== "undefined") {
        window.location.href = "/admin/articles";
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось удалить статью"
      );
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-gray-900">Загрузка статьи…</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {id ? `Редактирование статьи #${id}` : "Редактирование статьи"}
        </h1>
        <Link
          href="/admin/articles"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← К списку
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-red-800">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded border border-green-300 bg-green-50 px-4 py-3 text-green-800">
          Сохранено. Возвращаемся к списку…
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded border border-gray-300 bg-white p-6 text-gray-900"
      >
        <div>
          <label className={labelClass}>Заголовок *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Slug *</label>
          <input
            type="text"
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className={`${inputClass} font-mono text-sm`}
          />
        </div>

        <div>
          <label className={labelClass}>Краткое описание *</label>
          <textarea
            required
            rows={3}
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Текст статьи *</label>
          <textarea
            required
            rows={14}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className={`${inputClass} font-mono text-sm`}
          />
        </div>

        <div>
          <label className={labelClass}>Ссылка на источник *</label>
          <input
            type="url"
            required
            value={form.originalUrl}
            onChange={(e) =>
              setForm({ ...form, originalUrl: e.target.value })
            }
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className={labelClass}>Источник</label>
            <input
              type="text"
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>ID категории</label>
            <input
              type="number"
              value={form.categoryId}
              onChange={(e) =>
                setForm({ ...form, categoryId: e.target.value })
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Время чтения (мин)</label>
            <input
              type="number"
              min={1}
              value={form.readingTime}
              onChange={(e) =>
                setForm({ ...form, readingTime: Number(e.target.value) })
              }
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Теги (через запятую)</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="отопление, вентиляция, автоматизация"
            className={inputClass}
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-900">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                setForm({ ...form, published: e.target.checked })
              }
            />
            Опубликована
          </label>

          <label className="flex items-center gap-2 text-sm text-gray-900">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm({ ...form, featured: e.target.checked })
              }
            />
            Избранная
          </label>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={handleDelete}
            className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Удалить статью
          </button>

          <div className="flex gap-3">
            <Link
              href="/admin/articles"
              className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-900 transition hover:bg-gray-50"
            >
              Отмена
            </Link>
            <button
              type="submit"
              disabled={saving || !id}
              className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Сохранение…" : "Сохранить"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}