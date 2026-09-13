import Link from "next/link";
import { Send, ExternalLink, Mail } from "lucide-react";

const navItems = [
  { href: "/services", label: "Чем могу помочь" },
  { href: "/audit", label: "Аудит сервиса" },
  { href: "/methodology", label: "Методология" },
  { href: "/cases", label: "Кейсы" },
  { href: "/about", label: "Об эксперте" },
  { href: "/articles", label: "Публикации" },
  { href: "/contacts", label: "Контакты" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--graphite)]/50 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Основная сетка футера */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Бренд */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              
              <div className="w-9 h-9 rounded-lg bg-[var(--graphite)] border border-[var(--border-subtle)] flex items-center justify-center overflow-hidden">
              <img
              src="/telegram-logo.png"
              alt="Сервис в плюс"
              className="w-full h-full object-cover"
              />
              </div>



              <div>
                <div className="text-sm font-semibold text-white">Сервис в плюс</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                  Архитектура инженерного сервиса
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Помогаю производителям промышленного и инженерного оборудования
              превращать сервис в управляемую систему надежности и прибыли.
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
              Разделы
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-[var(--electric-blue)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
              Связь
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://t.me/engserviceplus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[var(--electric-blue)] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Telegram-канал
                </a>
              </li>
              <li>
                <a
                  href="https://tenchat.ru/bardin-denisov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[var(--electric-blue)] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  TenChat
                </a>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[var(--electric-blue)] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Обсудить задачу
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Финальная фраза */}
        <div className="py-6 border-t border-[var(--border-subtle)]">
          <p className="text-center text-sm text-[var(--teal-accent)] italic">
            «Сервис становится преимуществом, когда им можно управлять»
          </p>
        </div>

        {/* Нижняя строка */}
        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} Сервис в плюс. Все права защищены.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Политика обработки персональных данных
            </Link>
            <Link href="/consent" className="hover:text-gray-300 transition-colors">
              Согласие на обработку данных
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}