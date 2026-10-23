"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Clock } from "lucide-react";

interface ApiArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category?: string;
  tags: string[];
  date: string;
  readingTime: number;
}
interface Props {
  initialArticles?: ApiArticle[];
  standalone?: boolean;
}

export default function Cases({ initialArticles, standalone = false }: Props) {
  const [articles, setArticles] = useState<ApiArticle[]>(initialArticles ?? []);
  const [loading, setLoading] = useState(initialArticles === undefined);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [sortBy, setSortBy] = useState<"new" | "reading">("new");
  const [retry, setRetry] = useState(0);
  const Heading = standalone ? "h1" : "h2";

  useEffect(() => {
    if (initialArticles !== undefined && retry === 0) return;
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/articles", { signal: controller.signal });
        if (!response.ok) throw new Error("Ошибка загрузки кейсов");
        const data = await response.json();
        if (!Array.isArray(data.articles)) throw new Error("Некорректный ответ сервера");
        setArticles(
          data.articles.filter((item: ApiArticle) => item.category === "Кейсы")
        );
      } catch (e) {
        if (!controller.signal.aborted) {
          console.error(e);
          setError("Не удалось загрузить кейсы. Попробуйте ещё раз.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [initialArticles, retry]);

  function reset() {
    setSearch("");
    setTag("");
  }
  const tags = useMemo(
    () =>
      Array.from(new Set(articles.flatMap((a) => a.tags ?? []))).sort((a, b) =>
        a.localeCompare(b, "ru")
      ),
    [articles]
  );
  const filtered = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("ru");
    return articles
      .filter(
        (a) =>
          (!tag || (a.tags ?? []).includes(tag)) &&
          (!q ||
            [a.title, a.excerpt, a.body, ...(a.tags ?? [])].some((value) =>
              (value ?? "").toLocaleLowerCase("ru").includes(q)
            ))
      )
      .sort((a, b) =>
        sortBy === "reading"
          ? a.readingTime - b.readingTime
          : b.date.localeCompare(a.date)
      );
  }, [articles, tag, search, sortBy]);
  const buttonClass = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs border transition-colors ${
      active
        ? "border-[var(--warm-accent)]/50 bg-[var(--warm-accent)]/10 text-[var(--warm-accent)]"
        : "border-[var(--border-subtle)] text-gray-400 hover:text-white"
    }`;

  return (
    <section
      id="cases"
      className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--graphite)]/30"
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--warm-accent)] animate-pulse" />
            <span className="text-xs text-[var(--warm-accent)] tracking-wide uppercase">
              Практика
            </span>
          </div>
          <Heading className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            Кейсы:{" "}
            <span className="text-[var(--warm-accent)]">
              ситуация, решение, результат
            </span>
          </Heading>
          <p className="text-lg text-gray-400 max-w-2xl mt-4 leading-relaxed">
            Материалы-кейсы о практике сервиса: контекст задачи, анализ,
            принятые решения и результат. Спецрубрика «Кейсы» раздела «Публикации».
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            />
            <input
              aria-label="Поиск кейсов"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по теме, названию или хэштегу"
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-sm text-white outline-none focus:border-[var(--warm-accent)]/50"
            />
          </div>
          <select
            aria-label="Сортировка кейсов"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "new" | "reading")}
            className="px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)] text-sm text-gray-300"
          >
            <option value="new">Сначала новые</option>
            <option value="reading">Быстрое чтение</option>
          </select>
        </div>

        {tags.length > 0 && (
          <div className="mb-8">
            <p className="text-xs text-gray-500 mb-3">Темы кейсов</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={!tag}
                onClick={() => setTag("")}
                className={buttonClass(!tag)}
              >
                Все кейсы
              </button>
              {tags.map((value) => (
                <button
                  type="button"
                  key={value}
                  aria-pressed={tag === value}
                  onClick={() => setTag(tag === value ? "" : value)}
                  className={buttonClass(tag === value)}
                >
                  #{value.replace(/^#/, "")}
                </button>
              ))}
            </div>
          </div>
        )}

        {(search || tag) && (
          <button
            type="button"
            onClick={reset}
            className="mb-6 text-sm text-[var(--warm-accent)]"
          >
            Сбросить фильтры
          </button>
        )}

        {loading && (
          <p role="status" className="py-12 text-center text-gray-400">
            Загрузка кейсов…
          </p>
        )}
        {!loading && error && (
          <div
            role="alert"
            className="p-8 border border-[var(--border-subtle)] rounded-xl text-center"
          >
            <p className="text-gray-400">{error}</p>
            <button
              type="button"
              onClick={() => setRetry((value) => value + 1)}
              className="mt-4 text-[var(--warm-accent)]"
            >
              Повторить загрузку
            </button>
          </div>
        )}
        {!loading && !error && (
          <>
            <p aria-live="polite" className="mb-5 text-xs text-gray-500">
              Найдено кейсов: {filtered.length}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${encodeURIComponent(article.slug)}`}
                  className="flex flex-col p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 hover:border-[var(--warm-accent)]/40 transition-colors group"
                >
                  <span className="inline-flex items-center gap-1 mb-4 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {article.readingTime} мин
                  </span>
                  <h3 className="text-base font-semibold text-white leading-snug mb-3 group-hover:text-[var(--warm-accent)]">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                    {(article.tags ?? []).slice(0, 4).map((value) => (
                      <span key={value}>#{value.replace(/^#/, "")}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex justify-between gap-3 pt-4 border-t border-[var(--border-subtle)] text-xs">
                    <time dateTime={article.date} className="text-gray-500">
                      {new Date(article.date).toLocaleDateString("ru-RU", {
                        timeZone: "UTC",
                      })}
                    </time>
                    <span className="text-[var(--warm-accent)]">Читать →</span>
                  </div>
                </Link>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="p-10 border border-dashed border-[var(--border-subtle)] rounded-xl text-center">
                <p className="text-gray-400">
                  Кейсы не найдены. Измените запрос или выбранные фильтры.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-4 text-sm text-[var(--warm-accent)]"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </>
        )}

        <p className="mt-8 text-xs text-gray-600 text-center max-w-2xl mx-auto">
          Кейсы клиентских проектов публикуются после согласования права на
          раскрытие. Текущие материалы — экспертные разборы типовых ситуаций из
          практики организации сервиса.
        </p>
      </div>
    </section>
  );
}