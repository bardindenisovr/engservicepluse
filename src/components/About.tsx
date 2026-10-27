import Link from "next/link";
import { Send, ExternalLink, MessageSquare, Download, ArrowRight } from "lucide-react";

const helpAreas = [
  "Аудит сервисных систем и ТОиР",
  "Организация и перестройка сервисных служб",
  "SLA и KPI",
  "Гарантия и рекламации",
  "Управление ЗИП",
  "Партнёрские сервисные сети",
  "Экономика обслуживания",
  "Пилоты и поддержка руководителей при внедрении",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 border-t border-[var(--border-subtle)]"
    >
      {/* JSON-LD схема Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Роман Николаевич Бардин-Денисов",
            alternateName: "Роман",
            jobTitle: "Эксперт-практик по архитектуре инженерного сервиса",
            description:
              "Помогает производителям, поставщикам оборудования и предприятиям организовать сервис и ТОиР: аудит, проектирование процессов, SLA и KPI, гарантия, ЗИП, сервисные сети, сопровождение внедрения.",
            url: "https://serviceinplus.ru/about",
            image: "https://serviceinplus.ru/roman.jpg",
            knowsAbout: [
              "Технический сервис",
              "Инженерный сервис",
              "SLA",
              "KPI",
              "Управление гарантией",
              "Рекламации",
              "Сервисная сеть",
              "Управление ЗИП",
              "Экономика сервиса",
              "Постгарантийное обслуживание",
              "Эксплуатация оборудования",
              "ТОиР",
            ],
            sameAs: [
              "https://t.me/engserviceplus",
              "https://tenchat.ru/bardin-denisov",
            ],
            worksFor: {
              "@type": "Organization",
              name: "Сервис в плюс",
              url: "https://serviceinplus.ru",
            },
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Заголовок и лид */}
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--electric-blue)] animate-pulse" />
            <span className="text-xs text-[var(--electric-blue)] tracking-wide uppercase">
              Об эксперте
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Роман Бардин-Денисов — эксперт-практик{" "}
            <span className="text-[var(--electric-blue)]">по архитектуре инженерного сервиса</span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-gray-400 leading-relaxed">
            Помогаю производителям, поставщикам оборудования и предприятиям организовать
            сервис и ТОиР: выявить причины повторных обращений и простоев, выстроить
            ответственность, планирование, работу с ЗИП и показатели. Провожу аудит,
            проектирую процессы и сопровождаю внедрение улучшений.
          </p>
        </div>

        <div className="grid lg:grid-cols-[auto_1fr] gap-10 items-start">
          {/* Фото и карточка */}
          <div className="space-y-5 lg:w-80">
            <div className="relative aspect-[4/5] rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--graphite)] to-[var(--deep-blue)] overflow-hidden">
              <img
                src="/roman.png"
                alt="Роман Бардин-Денисов — эксперт-практик по архитектуре инженерного сервиса"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--background)]/80 to-transparent pointer-events-none" />
            </div>

            <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/50">
              <h2 className="text-lg font-semibold text-white mb-1">
                Роман Бардин-Денисов
              </h2>
              <p className="text-sm text-[var(--electric-blue)] mb-4">
                Эксперт-практик по архитектуре инженерного сервиса
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

          {/* Текстовые блоки по разделу 17 */}
          <div className="space-y-10">
            {/* Мой подход */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Мой подход</h2>
              <div className="space-y-4 text-sm md:text-base text-gray-400 leading-relaxed">
                <p>
                  Сервис становится управляемым, когда обязательства связаны с ресурсами,
                  у процесса есть владелец, а данные помогают принимать решения. Поэтому
                  начинаю с фактов и реального пути работы, а не с набора готовых
                  регламентов. Отделяю подтверждённые выводы от гипотез и фиксирую
                  ограничения.
                </p>
                <p>
                  Lean использую для улучшения потока и взаимодействия, RCA — для проверки
                  причин, TPM — в задачах обслуживания оборудования, где этот подход уместен.
                  Метод выбирается под проблему. Цель — применимый процесс и измеряемая
                  проверка, а не внедрение инструмента ради инструмента.
                </p>
              </div>
            </div>

            {/* С чем помогаю */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">С чем помогаю</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {helpAreas.map((area) => (
                  <div
                    key={area}
                    className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/30"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--electric-blue)] mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-400 leading-relaxed">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Границы экспертизы */}
            <div className="p-6 rounded-xl border border-[var(--teal-accent)]/20 bg-gradient-to-br from-[var(--teal-accent)]/5 to-transparent">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Границы экспертизы</h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                Основной предмет работы — организация инженерного сервиса и взаимодействия
                участников. Промышленное оборудование и инженерная инфраструктура — область
                применения, а не заявление об одинаковой технической квалификации во всех
                системах. Для специальных технических проверок и решений привлекаются
                профильные специалисты по согласованию с заказчиком.
              </p>
            </div>

            {/* Как начать — CTA */}
            <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">Как начать</h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-5">
                На вводной встрече за 30 минут уточним проблему, доступные данные и возможный
                первый шаг. Если задача вне моего профиля или проект пока не готов к запуску —
                обозначу это до начала работ.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contacts"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--electric-blue)] text-[var(--background)] text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Обсудить задачу
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cases"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border-subtle)] text-sm text-gray-300 hover:text-white hover:border-[var(--electric-blue)]/50 transition-colors"
                >
                  Посмотреть практику
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
