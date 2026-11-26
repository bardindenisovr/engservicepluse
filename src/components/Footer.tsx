import Link from "next/link";
import { FooterDirections } from "@/components/ProductionIntegration";
import { Send, ExternalLink, Mail } from "lucide-react";
import ExpertContacts from "@/components/ExpertContacts";

const navItems = [
  { href: "/services", label: "Все услуги" },
  { href: "/audit", label: "Аудит" },
  { href: "/ekspress-diagnostika", label: "Экспресс-диагностика" },
  { href: "/production", label: "Организация производства" },
  { href: "/methodology", label: "Методология" },
  { href: "/cases", label: "Практика" },
  { href: "/experts", label: "Эксперты" },
  { href: "/articles", label: "Публикации" },
  { href: "/contacts", label: "Контакты" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative z-10 mt-20 border-t border-[var(--border-subtle)] bg-[var(--graphite)]/50"><FooterDirections />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]"><img src="/telegram-logo.png" alt="Сервис в плюс" className="h-full w-full object-cover" /></div>
              <div><div className="text-sm font-semibold text-white">Сервис в плюс</div><div className="text-[10px] uppercase tracking-wider text-gray-500">Инженерный сервис | ТОиР | Производство</div></div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">Диагностика и организация работы сервиса, ТОиР и производства. Профильные задачи ведут эксперты соответствующих направлений; состав работ и ответственность согласуются до начала проекта.</p>
          </div>
          <div><h3 className="mb-4 text-xs uppercase tracking-widest text-gray-500">Разделы</h3><ul className="space-y-2">{navItems.map((item) => <li key={item.label}><Link href={item.href} className="text-sm text-gray-400 transition-colors hover:text-[var(--electric-blue)]">{item.label}</Link></li>)}</ul></div>
          <div>
            <h3 className="mb-4 text-xs uppercase tracking-widest text-gray-500">Связь</h3><ExpertContacts />
            <ul className="mt-5 space-y-3">
              <li><a href="https://t.me/engserviceplus" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[var(--electric-blue)]"><Send className="h-4 w-4" />Telegram-канал</a></li>
              <li><a href="https://tenchat.ru/bardin-denisov" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[var(--electric-blue)]"><ExternalLink className="h-4 w-4" />TenChat</a></li>
              <li><Link href="/contacts" className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[var(--electric-blue)]"><Mail className="h-4 w-4" />Обсудить задачу</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--border-subtle)] py-6"><p className="text-center text-sm italic text-[var(--teal-accent)]">«Сервис становится преимуществом, когда им можно управлять»</p></div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-6 md:flex-row">
          <p className="text-xs text-gray-500">© {currentYear} Сервис в плюс. Все права защищены.</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500"><Link href="/privacy" className="transition-colors hover:text-gray-300">Политика обработки персональных данных</Link><Link href="/consent" className="transition-colors hover:text-gray-300">Согласие на обработку данных</Link></div>
        </div>
      </div>
    </footer>
  );
}
