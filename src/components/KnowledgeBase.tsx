"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, X, ExternalLink, Clock } from "lucide-react";
import { sourceLabels, type ArticleSource } from "@/data/articles";

const sourceFilters: { value: ArticleSource | "all"; label: string }[] = [
  { value: "all", label: "Все источники" },
  { value: "telegram", label: "Telegram" },
  { value: "tenchat", label: "TenChat" },
  { value: "site", label: "Материалы сайта" },
];

interface ApiArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  source: ArticleSource;
  category: string;
  tags: string[];
  date: string;
  readingTime: number;
  originalUrl: string;
}

export default function KnowledgeBase() {
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<ArticleSource | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");
  const [sortBy, setSortBy] = useState<"new" | "reading">("new");
  const [openArticleId, setOpenArticleId] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [articlesRes, categoriesRes] = await Promise.all([
          fetch("/api/articles"),
          fetch("/api/categories"),
        ]);

        let articlesData: { articles: ApiArticle[] } = { articles: [] };
        let categoriesData: { categories: string[] } = { categories: [] };

        if (articlesRes.ok) {
          try {
            articlesData = await articlesRes.json();
          } catch (e) {
            console.error("Не удалось распарсить статьи:", e);
          }
        } else {
          console.error("API статей вернул ошибку:", articlesRes.status);
        }

        if (categoriesRes.ok) {
          try {
            categoriesData = await categoriesRes.json();
          } catch (e) {
            console.error("Не удалось распарсить рубрики:", e);
          }
        } else {
          console.error("API рубрик вернул ошибку:", categoriesRes.status);
        }

        setArticles(articlesData.articles ?? []);
        setCategories(categoriesData.categories ?? []);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = useMemo(() => {
    let result = [...articles];

    if (sourceFilter !== "all") {
      result = result.filter((a) => a.source === sourceFilter);
    }

    if (categoryFilter !== "all") {
      result = result.filter((a) => a.category === categoryFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.body.toLowerCase().includes(q)
      );
    }

    if (sortBy === "new") {
      result.sort((a, b) => b.date.localeCompare(a.date));
    } else {
      result.sort((a, b) => a.readingTime - b.readingTime);
    }

    return result;
  }, [articles, search, sourceFilter, categoryFilter, sortBy]);

  const openArticle = openArticleId
    ? articles.find((a) => a.id === openArticleId)
    : null;

  return (
    <section id="articles" className="relative z-10 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Заголовок */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--electric-blue)] animate-pulse" />
            <span className="text-xs text-[var(--electric-blue)] tracking-wide uppercase">
              База знаний
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            Практические материалы о{" "}
            <span className="text-[var(--electric-blue)]">техническом сервисе</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mt-4 leading-relaxed">
            Статьи о сервисной архитектуре, SLA, гарантии, сервисных сетях,
            ЗИП, ТОиР, экономике сервиса и инженерной инфраструктуре ЦОД.
          </p>
        </div>

        {/* Поиск и сортировка */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Найдите материал по теме: SLA, гарантия, ЗИП, партнёрская сеть…"
              className="w-full pl-11 pr-10 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-sm text-white placeholder:text-gray-600 focus:border-[var(--electric-blue)]/50 outline-none transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "new" | "reading")}
            className="px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-sm text-gray-300 outline-none focus:border-[var(--electric-blue)]/50 cursor-pointer"
          >
            <option value="new">Сначала новые</option>
            <option value="reading">Быстрое чтение</option>
          </select>
        </div>

        {/* Фильтры по источнику */}
        <div className="flex flex-wrap gap-2 mb-4">
          {sourceFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setSourceFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${
                sourceFilter === f.value
                  ? "border-[var(--electric-blue)]/50 bg-[var(--electric-blue)]/10 text-[var(--electric-blue)]"
                  : "border-[var(--border-subtle)] text-gray-500 hover:text-gray-300 hover:border-[var(--electric-blue)]/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Фильтры по рубрикам */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-3 py-1.5 rounded-md text-[11px] border transition-colors ${
              categoryFilter === "all"
                ? "border-[var(--teal-accent)]/50 bg-[var(--teal-accent)]/10 text-[var(--teal-accent)]"
                : "border-[var(--border-subtle)] text-gray-600 hover:text-gray-400"
            }`}
          >
            Все рубрики
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-md text-[11px] border transition-colors ${
                categoryFilter === cat
                  ? "border-[var(--teal-accent)]/50 bg-[var(--teal-accent)]/10 text-[var(--teal-accent)]"
                  : "border-[var(--border-subtle)] text-gray-600 hover:text-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Индикатор загрузки */}
        {loading && (
          <div className="p-10 rounded-xl border border-dashed border-[var(--border-subtle)] text-center">
            <p className="text-gray-400">Загрузка материалов...</p>
          </div>
        )}

        {/* Сетка статей */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((article) => (
              <button
                key={article.id}
                onClick={() => setOpenArticleId(article.id)}
                className="text-left p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 hover:border-[var(--electric-blue)]/40 hover:bg-[var(--graphite)]/60 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded ${
                      article.source === "telegram"
                        ? "bg-[#229ED9]/10 text-[#4db8e8]"
                        : article.source === "tenchat"
                        ? "bg-[var(--electric-blue)]/10 text-[var(--electric-blue)]"
                        : "bg-[var(--teal-accent)]/10 text-[var(--teal-accent)]"
                    }`}
                  >
                    {sourceLabels[article.source]}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-600">
                    <Clock className="w-3 h-3" />
                    {article.readingTime} мин
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white leading-snug mb-3 group-hover:text-[var(--electric-blue)] transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                  <span className="text-[11px] text-gray-600">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-[var(--electric-blue)] group-hover:text-[var(--teal-accent)] transition-colors">
                    Читать →
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Если ничего не найдено */}
        {!loading && filtered.length === 0 && (
          <div className="p-10 rounded-xl border border-dashed border-[var(--border-subtle)] text-center">
            <p className="text-gray-400 mb-2">
              По этому запросу материалов пока нет.
            </p>
            <p className="text-sm text-gray-600">
              Попробуйте изменить формулировку или выбрать другую рубрику.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSourceFilter("all");
                setCategoryFilter("all");
              }}
              className="mt-4 text-sm text-[var(--electric-blue)] hover:text-[var(--teal-accent)] transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Примечание */}
        <p className="mt-10 text-xs text-gray-600 text-center max-w-2xl mx-auto">
          Новые публикации из Telegram-канала и TenChat добавляются после
          синхронизации источников.
        </p>
      </div>

      {/* === МОДАЛЬНОЕ ОКНО СТАТЬИ === */}
      {openArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpenArticleId(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)] p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenArticleId(null)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Мета */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={`text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded ${
                  openArticle.source === "telegram"
                    ? "bg-[#229ED9]/10 text-[#4db8e8]"
                    : openArticle.source === "tenchat"
                    ? "bg-[var(--electric-blue)]/10 text-[var(--electric-blue)]"
                    : "bg-[var(--teal-accent)]/10 text-[var(--teal-accent)]"
                }`}
              >
                {sourceLabels[openArticle.source]}
              </span>
              <span className="text-xs text-gray-500">{openArticle.category}</span>
              <span className="text-xs text-gray-600">
                {new Date(openArticle.date).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-600">
                <Clock className="w-3 h-3" />
                {openArticle.readingTime} мин
              </span>
            </div>

            {/* Заголовок */}
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-6">
              {openArticle.title}
            </h2>

            {/* Теги */}
            <div className="flex flex-wrap gap-2 mb-8">
              {openArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] text-gray-500 border border-[var(--border-subtle)] rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Тело статьи */}
            <div
              className="text-gray-400 leading-relaxed space-y-4 [&_h3]:text-white [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-sm [&_p]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: openArticle.body }}
            />

            {/* Кнопка оригинала */}
            <div className="mt-10 pt-6 border-t border-[var(--border-subtle)]">
              <a
                href={openArticle.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--electric-blue)] hover:text-[var(--teal-accent)] transition-colors"
              >
                Открыть оригинал у автора
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* CTA */}
            <div className="mt-8 p-5 rounded-xl border border-[var(--teal-accent)]/20 bg-[var(--teal-accent)]/5">
              <p className="text-sm text-gray-300 mb-3">
                Если похожая задача существует в вашей компании, её можно
                разобрать на консультации или в рамках аудита.
              </p>
              <a
                href="/contacts"
                className="inline-flex items-center gap-2 text-sm text-[var(--teal-accent)] hover:text-white transition-colors font-medium"
              >
                Обсудить задачу →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}