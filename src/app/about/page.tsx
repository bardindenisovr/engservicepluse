import type { Metadata } from "next";
import About from "@/components/About";
import AuthorIdentity from "@/components/AuthorIdentity";
import ExpertContacts from "@/components/ExpertContacts";

export const metadata: Metadata = {
  title: "Роман Бардин-Денисов — эксперт-практик по архитектуре инженерного сервиса",
  description:
    "Помогаю производителям и поставщикам оборудования организовать сервис и ТОиР: аудит, проектирование процессов, SLA и KPI, ЗИП, сопровождение внедрения. Член Ассоциации ЕАМ. ORCID: 0009-0003-8458-8787.",
  alternates: {
    canonical: "https://serviceinplus.ru/about",
  },
  openGraph: {
    title: "Роман Бардин-Денисов — эксперт-практик | Сервис в плюс",
    description:
      "Архитектура инженерного сервиса: аудит, процессы, SLA, гарантия, ЗИП, сервисные сети.",
    url: "https://serviceinplus.ru/about",
    siteName: "Сервис в плюс",
    locale: "ru_RU",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Роман Бардин-Денисов — эксперт-практик | Сервис в плюс",
    description:
      "Архитектура инженерного сервиса: аудит, процессы, SLA, гарантия, ЗИП, сервисные сети.",
  },
};

export default function AboutPage() {
  return (
    <div className="relative z-10">
      <About />
      <section aria-label="Связаться с экспертом" className="max-w-7xl mx-auto px-6 py-8">
        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
          <h2 className="text-lg font-semibold text-white mb-4">Как начать</h2>
          <p className="text-sm text-gray-400 mb-4 max-w-2xl leading-relaxed">
            На вводной встрече за 30 минут уточним проблему, доступные данные и возможный первый шаг.
            Если задача вне моего профиля или проект пока не готов к запуску — обозначу это до начала работ.
          </p>
          <ExpertContacts />
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-6"><AuthorIdentity expert /></div>
    </div>
  );
}
