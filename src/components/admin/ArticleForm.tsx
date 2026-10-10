"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface Category { id: number; name: string; }
interface ArticleData {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  source?: string;
  categoryId: number | null;
  tags: string[];
  originalUrl: string;
  readingTime: number;
  published: boolean;
  featured: boolean;
}
interface Props { initialData?: ArticleData; }
const emptyArticle: ArticleData = {
  slug: "", title: "", excerpt: "", body: "", source: "site",
  categoryId: null, tags: [], originalUrl: "", readingTime: 5,
  published: true, featured: false,
};
function toSlug(input: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
    ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };
  return input.toLowerCase().trim().replace(/[а-яё]/g, char => map[char] ?? char)
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const fieldClass = "w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-white focus:border-[var(--electric-blue)]/50 outline-none";
const labelClass = "block text-xs text-gray-500 mb-2";

export default function ArticleForm({ initialData }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initialData?.id);
  const [data, setData] = useState<ArticleData>(initialData ?? emptyArticle);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tagsInput, setTagsInput] = useState((initialData?.tags ?? []).join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/categories", { signal: controller.signal })
      .then(async res => {
        if (!res.ok) throw new Error("categories");
        return res.json();
      })
      .then(result => setCategories(result.categories ?? []))
      .catch(() => {
        if (!controller.signal.aborted) setCategoryError("Не удалось загрузить рубрики. Обновите страницу перед изменением рубрики.");
      });
    return () => controller.abort();
  }, []);

  function update<K extends keyof ArticleData>(key: K, value: ArticleData[K]) {
    setData(prev => ({ ...prev, [key]: value }));
  }
  function handleTitleChange(value: string) {
    setData(prev => ({
      ...prev, title: value,
      slug: !isEdit && (prev.slug === "" || prev.slug === toSlug(prev.title)) ? toSlug(value) : prev.slug,
    }));
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setError("");
    setSaving(true);
    // Keep the existing source internally until the API and database migration is ready.
    const payload = {
      ...data,
      source: data.source ?? "site",
      tags: Array.from(new Set(tagsInput.split(",").map(tag => tag.trim()).filter(Boolean))),
    };
    try {
      const res = await fetch(isEdit ? `/api/admin/articles/${initialData?.id}` : "/api/admin/articles", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const result = await res.json().catch(() => ({}));
        throw new Error(result.error ?? "Не удалось сохранить статью");
      }
      router.push("/admin/articles");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Ошибка соединения");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Link href="/admin/articles" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />Назад к списку
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label htmlFor="article-title" className={labelClass}>Заголовок *</label>
            <input id="article-title" type="text" value={data.title} onChange={e => handleTitleChange(e.target.value)} required className={fieldClass} placeholder="SLA не начинается с договора" />
          </div>
          <div>
            <label htmlFor="article-slug" className={labelClass}>Slug (URL) *</label>
            <input id="article-slug" type="text" value={data.slug} onChange={e => update("slug", e.target.value)} required className={`${fieldClass} font-mono text-sm`} placeholder="sla-ne-nachinaetsya-s-dogovora" />
          </div>
          <div>
            <label htmlFor="article-excerpt" className={labelClass}>Краткое описание *</label>
            <textarea id="article-excerpt" value={data.excerpt} onChange={e => update("excerpt", e.target.value)} required rows={3} className={`${fieldClass} resize-y text-sm`} placeholder="1–2 предложения о чём статья" />
          </div>
          <div>
            <label htmlFor="article-body" className={labelClass}>Текст статьи (HTML или обычный текст) *</label>
            <textarea id="article-body" value={data.body} onChange={e => update("body", e.target.value)} required rows={14} className={`${fieldClass} resize-y font-mono text-xs leading-relaxed`} placeholder="<h3>Подзаголовок</h3><p>Текст параграфа...</p>" />
            <p className="mt-2 text-[11px] text-gray-600">Поддерживается HTML: &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;a&gt;</p>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <label htmlFor="article-category" className={labelClass}>Рубрика</label>
            <select id="article-category" value={data.categoryId ?? ""} disabled={Boolean(categoryError)} onChange={e => update("categoryId", e.target.value ? Number(e.target.value) : null)} className={fieldClass}>
              <option value="">Без рубрики</option>
              {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
            {categoryError && <p role="alert" className="mt-2 text-xs text-[var(--warm-accent)]">{categoryError}</p>}
          </div>
          <div>
            <label htmlFor="article-tags" className={labelClass}>Теги (через запятую)</label>
            <input id="article-tags" type="text" value={tagsInput} onChange={e => setTagsInput(e.target.value)} className={`${fieldClass} text-sm`} placeholder="SLA, гарантия, ЗИП" />
          </div>
          <div>
            <label htmlFor="article-original" className={labelClass}>Ссылка на оригинал *</label>
            <input id="article-original" type="url" value={data.originalUrl} onChange={e => update("originalUrl", e.target.value)} required className={`${fieldClass} text-sm`} placeholder="https://example.com/publication" />
          </div>
          <div>
            <label htmlFor="article-reading-time" className={labelClass}>Время чтения (мин)</label>
            <input id="article-reading-time" type="number" min={1} max={60} value={data.readingTime} onChange={e => update("readingTime", Number(e.target.value))} className={fieldClass} />
          </div>
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={data.published} onChange={e => update("published", e.target.checked)} className="w-4 h-4 accent-[var(--electric-blue)]" />
              <span className="text-sm text-gray-300">Опубликована</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={data.featured} onChange={e => update("featured", e.target.checked)} className="w-4 h-4 accent-[var(--teal-accent)]" />
              <span className="text-sm text-gray-300">Рекомендуемая</span>
            </label>
          </div>
        </div>
      </div>
      {error && <p role="alert" className="text-sm text-[var(--warm-accent)]">{error}</p>}
      <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-subtle)]">
        <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 disabled:opacity-50 text-white font-medium transition-all">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Сохранение..." : isEdit ? "Сохранить" : "Создать статью"}
        </button>
        <Link href="/admin/articles" className="text-sm text-gray-500 hover:text-white transition-colors">Отмена</Link>
      </div>
    </form>
  );
}
