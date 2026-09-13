import Link from "next/link";
import { Send, ExternalLink, MessageSquare, Download } from "lucide-react";

const competencies = [
  "Создание сервисных подразделений с нуля",
  "Управление инженерными и сервисными командами",
  "Построение процессов технического сервиса",
  "Развитие регионального обслуживания",
  "Взаимодействие с производством, продажами и клиентами",
  "Управление гарантией и рекламациями",
  "Внедрение показателей и управленческой отчетности",
  "Организация работы с сервисными партнерами",
  "Управление эксплуатацией сложного оборудования",
  "Развитие сервисных продуктов и постгарантийного обслуживания",
];

export default function About() {
  return (
    <section id="about" className="relative z-10 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Заголовок */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--electric-blue)] animate-pulse" />
            <span className="text-xs text-[var(--electric-blue)] tracking-wide uppercase">
              Об эксперте
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            Кто отвечает{" "}
            <span className="text-[var(--electric-blue)]">за результат</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[auto_1fr] gap-10 items-start">
          {/* Фото и карточка */}
          <div className="space-y-5 lg:w-80">
            {/* Фото или плейсхолдер */}
            <div className="relative aspect-[4/5] rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--graphite)] to-[var(--deep-blue)] overflow-hidden">
            <img
            src="/roman.png"
            alt="Роман Бардин-Денисов — эксперт по архитектуре инженерного сервиса"
            className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Затемнение снизу для читаемости, если нужно */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--background)]/80 to-transparent pointer-events-none" />
          </div>

            {/* Карточка эксперта */}
            <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/50">
              <h3 className="text-lg font-semibold text-white mb-1">Роман Николаевич</h3>
              <h3 className="text-lg font-semibold text-white mb-1">Бардин-Денисов</h3>
              <p className="text-sm text-[var(--electric-blue)] mb-4">
                Руководитель и архитектор сервисных систем
              </p>

              <div className="space-y-2 pt-4 border-t border-[var(--border-subtle)]">
                <a
                  href="https://t.me/engserviceplus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-[var(--electric-blue)] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Telegram-канал
                </a>
                <a
                  href="https://tenchat.ru/bardin-denisov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-[var(--electric-blue)] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  TenChat
                </a>
                <Link
                  href="/contacts"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-[var(--electric-blue)] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Обсудить задачу
                </Link>
                <button className="flex items-center gap-2 text-sm text-gray-600 cursor-not-allowed w-full text-left">
                  <Download className="w-4 h-4" />
                  Скачать резюме (скоро)
                </button>
              </div>
            </div>
          </div>

          {/* Текст */}
          <div className="space-y-6">
            {/* Основная цитата */}
            <div className="p-6 rounded-xl border-l-2 border-[var(--electric-blue)] bg-[var(--graphite)]/40">
              <p className="text-lg text-gray-300 italic leading-relaxed">
                «Я рассматриваю сервис не как набор разрозненных функций, а как
                единую управленческую систему. Её задача — обеспечивать
                надежность оборудования, выполнять обязательства перед клиентом
                и создавать измеримый результат для бизнеса».
              </p>
            </div>

            {/* Что решаю */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Задачи, которые я умею решать
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {competencies.map((comp) => (
                  <div
                    key={comp}
                    className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/30"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--electric-blue)] mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-400 leading-relaxed">
                      {comp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Позиционирование */}
            <div className="p-6 rounded-xl border border-[var(--teal-accent)]/20 bg-gradient-to-br from-[var(--teal-accent)]/5 to-transparent">
              <p className="text-sm text-gray-300 leading-relaxed">
                Практический опыт управления сервисными системами: до 50
                сотрудников в прямом и функциональном контуре, а также до 30
                внешних подрядчиков и сервисных партнеров.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}