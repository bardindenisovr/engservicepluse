"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
}

interface ArticleData {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  source: string;
  categoryId: number | null;
  tags: string[];
  originalUrl: string;
  readingTime: number;
  published: boolean;
  featured: boolean;
}

interface Props {
  initialData?: ArticleData;
}

const emptyArticle: ArticleData = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  source: "site",
  categoryId: null,
  tags: [],
  originalUrl: "",
  readingTime: 5,
  published: true,
  featured: false,
};

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[а-яё]/g, (char) => {
      const map: Record<string, string> = {
        а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
        з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
        п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
        ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
      };
      return map[char] ?? char;
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ArticleForm({ initialData }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initialData?.id);

  const [data, setData] = useState<ArticleData>(initialData ?? emptyArticle);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tagsInput, setTagsInput] = useState(
    (initialData?.tags ?? []).join(", ")
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((d) => setCategories(d.categories ?? []))
      .catch(() => {});
  }, []);

  function update<K extends keyof ArticleData>(key: K, value: ArticleData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(value: string) {
    update("title", value);
    if (!isEdit && (data.slug === "" || data.slug === toSlug(data.title))) {
      update("slug", toSlug(value));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...data,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const url = isEdit
        ? `/api/admin/articles/${initialData?.id}`
        : "/api/admin/articles";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error ?? "Не удалось сохранить статью");
        setSaving(false);
        return;
      }

      router.push("/admin/articles");
      router.refresh();
    } catch {
      setError("Ошибка соединения");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к списку
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка — основное */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Заголовок *
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-white focus:border-[var(--electric-blue)]/50 outline-none"
              placeholder="SLA не начинается с договора"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => update("slug", e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-white focus:border-[var(--electric-blue)]/50 outline-none font-mono text-sm"
              placeholder="sla-ne-nachinaetsya-s-dogovora"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Краткое описание *
            </label>
            <textarea
              value={data.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-white focus:border-[var(--electric-blue)]/50 outline-none resize-vertical text-sm"
              placeholder="1–2 предложения о чём статья"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Текст статьи (HTML или обычный текст) *
            </label>
            <textarea
              value={data.body}
              onChange={(e) => update("body", e.target.value)}
              required
              rows={14}
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-white focus:border-[var(--electric-blue)]/50 outline-none resize-vertical font-mono text-xs leading-relaxed"
              placeholder="<h3>Подзаголовок</h3><p>Текст параграфа...</p>"
            />
            <p className="mt-2 text-[11px] text-gray-600">
              Поддерживается HTML: &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;a&gt;
            </p>
          </div>
        </div>

        {/* Правая колонка — мета */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs text-gray-500 mb-2">Источник</label>
            <select
              value={data.source}
              onChange={(e) => update("source", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-white focus:border-[var(--electric-blue)]/50 outline-none"
            >
              <option value="site">Материал сайта</option>
              <option value="telegram">Telegram</option>
              <option value="tenchat">TenChat</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">Рубрика</label>
            <select
              value={data.categoryId ?? ""}
              onChange={(e) =>
                update("categoryId", e.target.value ? Number(e.target.value) : null)
              }
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-white focus:border-[var(--electric-blue)]/50 outline-none"
            >
              <option value="">Без рубрики</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Теги (через запятую)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-white focus:border-[var(--electric-blue)]/50 outline-none text-sm"
              placeholder="SLA, гарантия, ЗИП"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Ссылка на оригинал *
            </label>
            <input
              type="url"
              value={data.originalUrl}
              onChange={(e) => update("originalUrl", e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-white focus:border-[var(--electric-blue)]/50 outline-none text-sm"
              placeholder="https://tenchat.ru/... или https://t.me/..."
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Время чтения (мин)
            </label>
            <input
              type="number"
              min={1}
              max={60}
              value={data.readingTime}
              onChange={(e) => update("readingTime", Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-white focus:border-[var(--electric-blue)]/50 outline-none"
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.published}
                onChange={(e) => update("published", e.target.checked)}
                className="w-4 h-4 accent-[var(--electric-blue)]"
              />
              <span className="text-sm text-gray-300">Опубликована</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="w-4 h-4 accent-[var(--teal-accent)]"
              />
              <span className="text-sm text-gray-300">Рекомендуемая</span>
            </label>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-[var(--warm-accent)]">{error}</p>
      )}

      <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-subtle)]">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 disabled:opacity-50 text-white font-medium transition-all"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Сохранение..." : isEdit ? "Сохранить" : "Создать статью"}
        </button>
        <Link
          href="/admin/articles"
          className="text-sm text-gray-500 hover:text-white transition-colors"
        >
          Отмена
        </Link>
      </div>
    </form>
  );
}