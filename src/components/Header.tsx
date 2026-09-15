"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MessageSquare } from "lucide-react";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/audit", label: "Аудит" },
  { href: "/services", label: "Услуги" },
  { href: "/methodology", label: "Подход" },
  { href: "/cases", label: "Кейсы" },
  { href: "/about", label: "Об эксперте" },
  { href: "/articles", label: "Публикации" },
  { href: "/contacts", label: "Контакты" },
];

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
            <div className="text-sm font-semibold text-white group-hover:text-[var(--electric-blue)] transition-colors">
              Сервис в плюс
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              Архитектура инженерного сервиса
            </div>
          </div>
        </Link>

        {/* Навигация — десктоп */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[var(--graphite)]/50 rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-[var(--graphite-light)] rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
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