import Link from "next/link";
import { MessageSquare, Send, ExternalLink, Mail, Briefcase } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Контакты | Сервис в плюс",
  description: "Обсудим вашу сервисную задачу — аудит, консультация, проектирование сервисной модели.",
};

export default function ContactsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Заголовок */}
      <div className="mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
          <div className="w-2 h-2 rounded-full bg-[var(--teal-accent)] animate-pulse" />
          <span className="text-xs text-[var(--teal-accent)] tracking-wide uppercase">
            Обсудим задачу
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          Опишите вашу{" "}
          <span className="text-[var(--electric-blue)]">сервисную ситуацию</span>
        </h1>

        <p className="text-lg text-gray-400 leading-relaxed">
          Тип оборудования, география, количество обращений, гарантийная нагрузка,
          сервисная команда, подрядчики или цель изменений. Я предложу формат
          первичного обсуждения.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
        {/* Форма */}
        <div className="p-6 md:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
          <ContactForm />
        </div>

        {/* Контакты и сценарии */}
        <div className="space-y-6">
          {/* Прямые контакты */}
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
            <h2 className="text-base font-semibold text-white mb-4">
              Прямые контакты
            </h2>
            <div className="space-y-3">
              <a
                href="https://t.me/engserviceplus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] hover:border-[#229ED9]/40 hover:bg-[#229ED9]/5 transition-colors"
              >
                <Send className="w-4 h-4 text-[#4db8e8]" />
                <div>
                  <div className="text-sm text-white">Telegram-канал</div>
                  <div className="text-xs text-gray-500">@engserviceplus</div>
                </div>
              </a>

              <a
                href="https://tenchat.ru/bardin-denisov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--electric-blue)]/40 hover:bg-[var(--electric-blue)]/5 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-[var(--electric-blue)]" />
                <div>
                  <div className="text-sm text-white">TenChat</div>
                  <div className="text-xs text-gray-500">Публикации и профиль</div>
                </div>
              </a>
            </div>
          </div>

          {/* Сценарии обращения */}
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
            <h2 className="text-base font-semibold text-white mb-4">
              С чем можно обратиться
            </h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--electric-blue)] mt-2 flex-shrink-0" />
                <span>Аудит сервисной системы или подразделения</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--electric-blue)] mt-2 flex-shrink-0" />
                <span>Проектирование целевой сервисной модели</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--electric-blue)] mt-2 flex-shrink-0" />
                <span>SLA, KPI, гарантия и рекламации</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--electric-blue)] mt-2 flex-shrink-0" />
                <span>Сервисная сеть и партнеры</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--electric-blue)] mt-2 flex-shrink-0" />
                <span>ЗИП, экономика сервиса, ЦОД</span>
              </li>
            </ul>
          </div>

          {/* Для работодателей */}
          <div className="p-6 rounded-2xl border border-[var(--electric-blue)]/20 bg-gradient-to-br from-[var(--electric-blue)]/5 to-transparent">
            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-[var(--electric-blue)] flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-semibold text-white mb-2">
                  Предложение руководящей позиции
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Рассматриваю позиции и проекты, связанные с развитием
                  технического сервиса, эксплуатации и сервисных продуктов.
                  Опишите роль и контекст — отвечу.
                </p>
              </div>
            </div>
          </div>

          {/* Примечание */}
          <p className="text-xs text-gray-600 leading-relaxed">
            Первый разговор — без обязательств. Определим контекст, масштаб
            задачи и возможный формат работы.
          </p>
        </div>
      </div>
    </div>
  );
}