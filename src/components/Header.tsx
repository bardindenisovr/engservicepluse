"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, MessageSquare, X } from "lucide-react";

const mainLinks = [
  ["/cases", "Практика"],
  ["/experts", "Эксперты"],
  ["/articles", "Публикации"],
  ["/tools", "Инструменты"],
  ["/contacts", "Контакты"],
] as const;

const serviceLinks = [
  ["/audit", "Аудит сервисной системы"],
  ["/ekspress-diagnostika", "Экспресс-диагностика сервиса"],
  ["/services#service", "Каталог услуг сервиса"],
  ["/production", "Организация производства — обзор"],
  ["/production#diagnostics", "Производство: диагностика"],
  ["/production#management", "Производство: управление"],
  ["/production#lean", "Производство: потери"],
  ["/production#quality", "Производство: качество"],
  ["/production#training", "Производство: обучение"],
  ["/production#joint", "Совместные задачи"],
  ["/services", "Все услуги"],
] as const;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3" onClick={close}>
          <span className="h-9 w-9 overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]"><img src="/telegram-logo.png" alt="Сервис в плюс" className="h-full w-full object-cover" /></span>
          <span className="hidden leading-tight sm:block"><span className="block text-sm font-semibold text-white">Сервис в плюс</span><span className="block text-[10px] uppercase tracking-wider text-gray-400">Инженерный сервис · ТОиР · Производство</span></span>
        </Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Основная навигация">
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-[var(--graphite)]/50 hover:text-white [&::-webkit-details-marker]:hidden">Услуги<ChevronDown className="h-3.5 w-3.5" /></summary>
            <div className="absolute left-0 top-full mt-1 grid w-[680px] grid-cols-2 gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)] p-3 shadow-xl">
              {serviceLinks.map(([href, label]) => <Link key={href} href={href} className="rounded-md px-3 py-2.5 text-sm text-gray-300 hover:bg-[var(--graphite-light)] hover:text-white">{label}</Link>)}
            </div>
          </details>
          {mainLinks.map(([href, label]) => <Link key={href} href={href} className="rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-[var(--graphite)]/50 hover:text-white">{label}</Link>)}
        </nav>
        <Link href="/contacts?direction=unsure" className="hidden min-h-10 items-center gap-2 rounded-lg bg-[var(--electric-blue)] px-4 py-2 text-sm font-medium text-white xl:inline-flex"><MessageSquare className="h-4 w-4" />Обсудить задачу</Link>
        <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="rounded-md p-2 text-gray-300 xl:hidden" aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={mobileOpen}>{mobileOpen ? <X /> : <Menu />}</button>
      </div>
      {mobileOpen && <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[var(--border-subtle)] bg-[var(--background)] px-6 py-4 xl:hidden" aria-label="Мобильная навигация">
        <details className="mb-2" open><summary className="cursor-pointer py-3 text-sm font-medium text-white">Услуги</summary><div className="grid gap-1 pb-3 pl-3">{serviceLinks.map(([href, label]) => <Link key={href} href={href} onClick={close} className="rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-[var(--graphite)]">{label}</Link>)}</div></details>
        <div className="grid">{mainLinks.map(([href, label]) => <Link key={href} href={href} onClick={close} className="rounded-md px-3 py-3 text-sm text-gray-300 hover:bg-[var(--graphite)]">{label}</Link>)}</div>
        <Link href="/contacts?direction=unsure" onClick={close} className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[var(--electric-blue)] px-4 py-3 text-sm font-medium text-white"><MessageSquare className="h-4 w-4" />Обсудить задачу</Link>
      </nav>}
    </header>
  );
}
