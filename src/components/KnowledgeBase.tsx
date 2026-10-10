"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, Clock } from "lucide-react";

interface ApiArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[];
  date: string;
  readingTime: number;
}

export default function KnowledgeBase() {
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [sortBy, setSortBy] = useState<"new" | "reading">("new");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search);
    setTag(initial.get("tag") ?? "");
    setCategory(initial.get("category") ?? "");
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/articles", { signal: controller.signal });
        if (!response.ok) throw new Error("Ошибка загрузки публикаций");
        const data = await response.json();
        if (!Array.isArray(data.articles)) throw new Error("Некорректный ответ сервера");
        setArticles(data.articles);
      } catch (e) {
        if (!controller.signal.aborted) {
          console.error(e);
          setError("Не удалось загрузить публикации. Попробуйте ещё раз.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [retry]);

  const categories = useMemo(() => Array.from(new Set(articles.map(a => a.category).filter(Boolean))).sort((a, b) => a.localeCompare(b, "ru")), [articles]);
  const tags = useMemo(() => Array.from(new Set(articles.flatMap(a => a.tags ?? []))).sort((a, b) => a.localeCompare(b, "ru")), [articles]);
  const filtered = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("ru");
    return articles.filter(a =>
      (!category || a.category === category) &&
      (!tag || (a.tags ?? []).includes(tag)) &&
      (!q || [a.title, a.excerpt, a.body, ...(a.tags ?? [])].some(value => (value ?? "").toLocaleLowerCase("ru").includes(q)))
    ).sort((a, b) => sortBy === "reading" ? a.readingTime - b.readingTime : b.date.localeCompare(a.date));
  }, [articles, category, tag, search, sortBy]);

  function reset() { setSearch(""); setCategory(""); setTag(""); }
  const buttonClass = (active: boolean) => `px-3 py-2 rounded-lg text-xs border transition-colors ${active ? "border-[var(--teal-accent)]/50 bg-[var(--teal-accent)]/10 text-[var(--teal-accent)]" : "border-[var(--border-subtle)] text-gray-400 hover:text-white"}`;

  return (
    <section id="articles" className="relative z-10 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-10">
          <p className="text-xs text-[var(--electric-blue)] tracking-wide uppercase mb-6">База знаний</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">Публикации о <span className="text-[var(--electric-blue)]">техническом сервисе</span></h2>
          <p className="text-lg text-gray-400 max-w-2xl mt-4 leading-relaxed">Практические материалы о сервисной архитектуре, SLA, гарантии, сервисных сетях, ЗИП, ТОиР и экономике сервиса.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input aria-label="Поиск публикаций" type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по теме, названию или хэштегу" className="w-full pl-11 pr-10 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-sm text-white outline-none focus:border-[var(--electric-blue)]/50" />
            {search && <button type="button" aria-label="Очистить поиск" onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X className="w-4 h-4" /></button>}
          </div>
          <select aria-label="Сортировка публикаций" value={sortBy} onChange={e => setSortBy(e.target.value as "new" | "reading")} className="px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)] text-sm text-gray-300">
            <option value="new">Сначала новые</option><option value="reading">Быстрое чтение</option>
          </select>
        </div>
        {categories.length > 0 && <div className="flex flex-wrap gap-2 mb-5" aria-label="Разделы">
          <button type="button" aria-pressed={!category} onClick={() => setCategory("")} className={buttonClass(!category)}>Все разделы</button>
          {categories.map(value => <button type="button" key={value} aria-pressed={category === value} onClick={() => setCategory(category === value ? "" : value)} className={buttonClass(category === value)}>{value}</button>)}
        </div>}
        {tags.length > 0 && <div className="mb-8"><p className="text-xs text-gray-500 mb-3">Хэштеги</p><div className="flex flex-wrap gap-2">
          {tags.map(value => <button type="button" key={value} aria-pressed={tag === value} onClick={() => setTag(tag === value ? "" : value)} className={buttonClass(tag === value)}>#{value.replace(/^#/, "")}</button>)}
        </div></div>}
        {(search || category || tag) && <button type="button" onClick={reset} className="mb-6 text-sm text-[var(--electric-blue)]">Сбросить фильтры</button>}
        {loading && <p role="status" className="py-12 text-center text-gray-400">Загрузка публикаций…</p>}
        {!loading && error && <div role="alert" className="p-8 border border-[var(--border-subtle)] rounded-xl text-center"><p className="text-gray-400">{error}</p><button type="button" onClick={() => setRetry(value => value + 1)} className="mt-4 text-[var(--electric-blue)]">Повторить загрузку</button></div>}
        {!loading && !error && <>
          <p aria-live="polite" className="mb-5 text-xs text-gray-500">Найдено материалов: {filtered.length}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(article => <Link key={article.id} href={`/articles/${encodeURIComponent(article.slug)}`} className="flex flex-col p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 hover:border-[var(--electric-blue)]/40 transition-colors group">
              <div className="flex flex-wrap justify-between gap-3 mb-4 text-xs text-gray-500"><span>{article.category}</span><span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{article.readingTime} мин</span></div>
              <h3 className="text-base font-semibold text-white leading-snug mb-3 group-hover:text-[var(--electric-blue)]">{article.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">{(article.tags ?? []).slice(0, 4).map(value => <span key={value}>#{value.replace(/^#/, "")}</span>)}</div>
              <div className="mt-auto flex justify-between gap-3 pt-4 border-t border-[var(--border-subtle)] text-xs"><time dateTime={article.date} className="text-gray-500">{new Date(article.date).toLocaleDateString("ru-RU")}</time><span className="text-[var(--electric-blue)]">Читать →</span></div>
            </Link>)}
          </div>
          {filtered.length === 0 && <div className="p-10 border border-dashed border-[var(--border-subtle)] rounded-xl text-center"><p className="text-gray-400">Материалы не найдены. Измените запрос или выбранные фильтры.</p><button type="button" onClick={reset} className="mt-4 text-sm text-[var(--electric-blue)]">Сбросить фильтры</button></div>}
        </>}
      </div>
    </section>
  );
}
