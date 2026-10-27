import { Send, ExternalLink, CheckCircle2 } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ExpertContacts from "@/components/ExpertContacts";

export const metadata = {
  title: "Контакты | Сервис в плюс",
  description:
    "Обсудим вашу задачу — расскажите, что происходит в сервисе или ТОиР, на что это влияет и что вы хотите изменить.",
};

const meetingBenefits = [
  "Разберём вашу ситуацию и контекст",
  "Определим, чем могу помочь, а чем нет",
  "Наметим возможный формат работы",
  "Вы получите предварительную оценку сроков и бюджета",
];

const prepareItems = [
  "Ваша роль и зона ответственности",
  "Тип оборудования и география",
  "Что сейчас не устраивает",
  "К чему это приводит (деньги, сроки, клиенты)",
  "Желаемый срок изменений",
];

export default function ContactsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Заголовок */}
      <div className="mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
          <div className="w-2 h-2 rounded-full bg-[var(--teal-accent)] animate-pulse" />
          <span className="text-xs text-[var(--teal-accent)] tracking-wide uppercase">
            Контакты
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          Обсудим вашу задачу
        </h1>

        <p className="text-lg text-gray-400 leading-relaxed">
          Расскажите, что происходит в сервисе или ТОиР, на что это влияет и
          что вы хотите изменить. Не нужно заранее выбирать услугу или готовить
          большое описание — достаточно обозначить ситуацию.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
        <div className="space-y-8">
          {/* Что даст первая встреча */}
          <div className="p-6 md:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
            <h2 className="text-xl font-semibold text-white mb-3">
              Что даст первая встреча
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              30 минут, без оплаты. Это не заменяет анализ документов и
              техническую диагностику — но позволяет понять, есть ли задача для
              совместной работы и какой формат подойдёт.
            </p>
            <ul className="space-y-2 mb-6">
              {meetingBenefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold text-white mb-3">
              Что подготовить к разговору
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-400">
              {prepareItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[var(--electric-blue)] mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Форма */}
          <div className="p-6 md:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
            <ContactForm />
          </div>
        </div>

        {/* Контакты */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
            <h2 className="text-base font-semibold text-white mb-4">
              Прямые контакты
            </h2>
            <ExpertContacts />
            <h3 className="text-sm font-semibold text-white mt-6 mb-3">
              Каналы и публикации
            </h3>
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
        </div>
      </div>
    </div>
  );
}
