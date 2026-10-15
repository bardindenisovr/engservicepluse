"use client";

import { useState, useEffect, useRef, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2, ImagePlus, Paperclip } from "lucide-react";
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
type MediaMode = "image" | "file" | null;
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
// Escapes values inserted into HTML attributes and text of the article body.
function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
// Allows absolute http(s) URLs and site-relative paths like /files/scheme.png.
function normalizeMediaUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}
const fieldClass = "w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-white focus:border-[var(--electric-blue)]/50 outline-none";
const labelClass = "block text-xs text-gray-500 mb-2";
const mediaButtonClass = "inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border-subtle)] text-xs text-gray-300 hover:text-white hover:border-[var(--electric-blue)]/50 transition-colors";

export default function ArticleForm({ initialData }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initialData?.id);
  const [data, setData] = useState<ArticleData>(initialData ?? emptyArticle);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tagsInput, setTagsInput] = useState((initialData?.tags ?? []).join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [mediaMode, setMediaMode] = useState<MediaMode>(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaText, setMediaText] = useState("");
  const [mediaCaption, setMediaCaption] = useState("");
  const [mediaError, setMediaError] = useState("");
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const mediaUrlRef = useRef<HTMLInputElement>(null);
  // Cursor position in the body textarea saved on blur; null means append to the end.
  const bodySelection = useRef<{ start: number; end: number } | null>(null);

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

  useEffect(() => {
    if (mediaMode) mediaUrlRef.current?.focus();
  }, [mediaMode]);

  function update<K extends keyof ArticleData>(key: K, value: ArticleData[K]) {
    setData(prev => ({ ...prev, [key]: value }));
  }
  function handleTitleChange(value: string) {
    setData(prev => ({
      ...prev, title: value,
      slug: !isEdit && (prev.slug === "" || prev.slug === toSlug(prev.title)) ? toSlug(value) : prev.slug,
    }));
  }
  function openMedia(mode: Exclude<MediaMode, null>) {
    setMediaMode(prev => (prev === mode ? null : mode));
    setMediaUrl("");
    setMediaText("");
    setMediaCaption("");
    setMediaError("");
  }
  function closeMedia() {
    setMediaMode(null);
    setMediaError("");
  }
  function insertIntoBody(snippet: string) {
    const length = data.body.length;
    const saved = bodySelection.current;
    const start = Math.min(saved?.start ?? length, length);
    const end = Math.max(start, Math.min(saved?.end ?? start, length));
    update("body", data.body.slice(0, start) + snippet + data.body.slice(end));
    const caret = start + snippet.length;
    bodySelection.current = { start: caret, end: caret };
    requestAnimationFrame(() => {
      const textarea = bodyRef.current;
      if (!textarea) return;
      textarea.focus();
      textarea.setSelectionRange(caret, caret);
    });
  }
  function handleMediaInsert() {
    const url = normalizeMediaUrl(mediaUrl);
    if (!url) {
      setMediaError("Укажите ссылку с https:// (или http://) либо путь на сайте, начинающийся с /.");
      return;
    }
    const text = mediaText.trim();
    if (!text) {
      setMediaError(mediaMode === "image" ? "Добавьте описание изображения: его прочитают программы экранного доступа и поисковые системы." : "Укажите название вложения.");
      return;
    }
    if (mediaMode === "image") {
      const caption = mediaCaption.trim();
      const figcaption = caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : "";
      insertIntoBody(`\n<figure><img src="${escapeHtml(url)}" alt="${escapeHtml(text)}" loading="lazy" decoding="async" />${figcaption}</figure>\n`);
    } else {
      insertIntoBody(`\n<p><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}</a></p>\n`);
    }
    closeMedia();
  }
  // Enter inside the media panel must not submit the whole article form.
  function handleMediaKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleMediaInsert();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeMedia();
    }
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setError("");
    const originalUrl = (data.originalUrl ?? "").trim();
    if (originalUrl) {
      try {
        const url = new URL(originalUrl);
        if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("protocol");
      } catch {
        setError("Укажите корректную ссылку с http:// или https:// либо оставьте поле пустым.");
        return;
      }
    }
    setSaving(true);
    // Keep the existing source internally until the API and database migration is ready.
    const payload = {
      ...data,
      originalUrl,
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

  const isImage = mediaMode === "image";

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
            <textarea id="article-body" ref={bodyRef} value={data.body} onChange={e => update("body", e.target.value)} onBlur={e => { bodySelection.current = { start: e.currentTarget.selectionStart, end: e.currentTarget.selectionEnd }; }} required rows={14} aria-describedby="article-body-help" className={`${fieldClass} resize-y font-mono text-xs leading-relaxed`} placeholder="<h3>Подзаголовок</h3><p>Текст параграфа...</p>" />
            <p id="article-body-help" className="mt-2 text-[11px] text-gray-600">Поддерживается HTML: &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;a&gt;, &lt;figure&gt;, &lt;img&gt;. Изображение и вложение вставляются в место курсора.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => openMedia("image")} aria-expanded={mediaMode === "image"} aria-controls="article-media-panel" className={mediaButtonClass}>
                <ImagePlus className="w-4 h-4" aria-hidden="true" />Вставить изображение
              </button>
              <button type="button" onClick={() => openMedia("file")} aria-expanded={mediaMode === "file"} aria-controls="article-media-panel" className={mediaButtonClass}>
                <Paperclip className="w-4 h-4" aria-hidden="true" />Добавить вложение
              </button>
            </div>
            {mediaMode && (
              <div id="article-media-panel" role="group" aria-labelledby="article-media-heading" className="mt-3 p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/30 space-y-3">
                <p id="article-media-heading" className="text-sm font-medium text-white">{isImage ? "Изображение по ссылке" : "Вложение по ссылке"}</p>
                <div>
                  <label htmlFor="article-media-url" className={labelClass}>{isImage ? "Ссылка на изображение *" : "Ссылка на файл *"}</label>
                  <input id="article-media-url" ref={mediaUrlRef} type="text" inputMode="url" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} onKeyDown={handleMediaKeyDown} className={`${fieldClass} text-sm`} placeholder={isImage ? "https://… или /images/scheme.png" : "https://… или /files/checklist.pdf"} />
                </div>
                <div>
                  <label htmlFor="article-media-text" className={labelClass}>{isImage ? "Описание изображения (alt) *" : "Название вложения *"}</label>
                  <input id="article-media-text" type="text" value={mediaText} onChange={e => setMediaText(e.target.value)} onKeyDown={handleMediaKeyDown} className={`${fieldClass} text-sm`} placeholder={isImage ? "Схема цепи АВР с контролем напряжения" : "Чек-лист приёмки работ (PDF, 120 КБ)"} />
                </div>
                {isImage && (
                  <div>
                    <label htmlFor="article-media-caption" className={labelClass}>Подпись под изображением</label>
                    <input id="article-media-caption" type="text" value={mediaCaption} onChange={e => setMediaCaption(e.target.value)} onKeyDown={handleMediaKeyDown} className={`${fieldClass} text-sm`} placeholder="Необязательно" />
                  </div>
                )}
                {mediaError && <p role="alert" className="text-xs text-[var(--warm-accent)]">{mediaError}</p>}
                <div className="flex items-center gap-4">
                  <button type="button" onClick={handleMediaInsert} className="px-4 py-2 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white text-sm font-medium transition-all">Вставить в текст</button>
                  <button type="button" onClick={closeMedia} className="text-sm text-gray-500 hover:text-white transition-colors">Отмена</button>
                </div>
              </div>
            )}
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
            <label htmlFor="article-original" className={labelClass}>Ссылка на оригинал (необязательно)</label>
            <input id="article-original" type="url" value={data.originalUrl ?? ""} onChange={e => update("originalUrl", e.target.value)} aria-describedby="article-original-help" className={`${fieldClass} text-sm`} placeholder="https://example.com/publication" />
            <p id="article-original-help" className="mt-2 text-[11px] text-gray-600">Для статьи сайта оставьте поле пустым. Для материала из Telegram или TenChat можно указать ссылку на первоисточник.</p>
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
