"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, MessageSquare } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Логотип и название */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-[var(--graphite)] border border-[var(--border-subtle)] flex items-center justify-center relative overflow-hidden">
            <img
              src="/telegram-logo.png"
              alt="Сервис в плюс"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="text-sm font-semibold text-white group-hover:text-[var(--electric-blue)] transition-colors whitespace-nowrap">
              Сервис в плюс
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider whitespace-nowrap">
              Архитектура инженерного сервиса | ТОиР
            </div>
          </div>
        </Link>

        {/* Навигация — десктоп (все ссылки в HTML для SEO) */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Услуги — CSS-only раскрытие */}
          <div className="relative group">
            <button
              className="px-3 py-2 text-sm text-gray-400 group-hover:text-white hover:bg-[var(--graphite)]/50 rounded-md transition-colors inline-flex items-center gap-1"
              aria-expanded="false"
            >
              Услуги
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-64 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)] shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <Link
                href="/audit"
                className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[var(--graphite-light)] transition-colors"
              >
                Аудит сервисной системы
              </Link>
              <Link
                href="/ekspress-diagnostika"
                className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[var(--graphite-light)] transition-colors"
              >
                Экспресс-диагностика
              </Link>
              <div className="border-t border-[var(--border-subtle)] mt-2 pt-2">
                <Link
                  href="/services"
                  className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-[var(--graphite-light)] transition-colors"
                >
                  Все услуги
                </Link>
              </div>
            </div>
          </div>

          {/* Остальные разделы — открыто */}
          <Link href="/methodology" className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[var(--graphite)]/50 rounded-md transition-colors">
            Для кого
          </Link>
          <Link href="/cases" className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[var(--graphite)]/50 rounded-md transition-colors">
            Практика
          </Link>
          <Link href="/about" className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[var(--graphite)]/50 rounded-md transition-colors">
            Об эксперте
          </Link>
          <Link href="/articles" className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[var(--graphite)]/50 rounded-md transition-colors">
            Публикации
          </Link>
          <Link href="/contacts" className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[var(--graphite)]/50 rounded-md transition-colors">
            Контакты
          </Link>
        </nav>

        {/* CTA + мобильная кнопка */}
        <div className="flex items-center gap-3">
          <Link
            href="/contacts"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white text-sm font-medium transition-all min-h-[44px]"
          >
            <MessageSquare className="w-4 h-4" />
            Обсудить задачу
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
            aria-label="Меню"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--border-subtle)] bg-[var(--graphite)]">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {/* Услуги */}
            <details className="group">
              <summary className="w-full text-left px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-[var(--graphite-light)] rounded-md transition-colors flex items-center justify-between cursor-pointer list-none">
                Услуги
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="pl-4 mt-1 flex flex-col gap-1">
                <Link
                  href="/audit"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-[var(--graphite-light)] rounded-md transition-colors"
                >
                  Аудит сервисной системы
                </Link>
                <Link
                  href="/ekspress-diagnostika"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-[var(--graphite-light)] rounded-md transition-colors"
                >
                  Экспресс-диагностика
                </Link>
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-[var(--graphite-light)] rounded-md transition-colors"
                >
                  Все услуги
                </Link>
              </div>
            </details>

            <Link href="/methodology" onClick={() => setMobileOpen(false)} className="px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-[var(--graphite-light)] rounded-md transition-colors">
              Для кого
            </Link>
            <Link href="/cases" onClick={() => setMobileOpen(false)} className="px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-[var(--graphite-light)] rounded-md transition-colors">
              Практика
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-[var(--graphite-light)] rounded-md transition-colors">
              Об эксперте
            </Link>
            <Link href="/articles" onClick={() => setMobileOpen(false)} className="px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-[var(--graphite-light)] rounded-md transition-colors">
              Публикации
            </Link>
            <Link href="/contacts" onClick={() => setMobileOpen(false)} className="px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-[var(--graphite-light)] rounded-md transition-colors">
              Контакты
            </Link>
            <Link
              href="/contacts"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--electric-blue)] text-white text-sm font-medium min-h-[48px]"
            >
              <MessageSquare className="w-4 h-4" />
              Обсудить задачу
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
