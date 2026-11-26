import { Send, ExternalLink, ClipboardCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ExpertContacts from "@/components/ExpertContacts";

export const metadata = {
  title: "Контакты | Сервис в плюс",
  description: "Обсудим задачу по инженерному сервису, ТОиР или организации производства и определим подходящий формат работы.",
  alternates: { canonical: "/contacts" },
};

const expectations = [
  "Первичный разбор ситуации и типа проблемы",
  "Какие данные помогут уточнить задачу",
  "Кого из экспертов имеет смысл подключить",
  "Возможный следующий шаг без обязательств начать проект",
];
const preparation = ["Тип оборудования или процесса", "Как проявляется проблема", "На что она влияет", "Срок, до которого нужно изменение"];

export default function ContactsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
          <div className="w-2 h-2 rounded-full bg-[var(--teal-accent)] animate-pulse" />
          <span className="text-xs text-[var(--teal-accent)] tracking-wide uppercase">Контакты</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">Обсудим{" "}<span className="text-[var(--electric-blue)]">вашу задачу</span></h1>
        <p className="text-lg text-gray-400 leading-relaxed">Расскажите, что происходит в сервисе, ТОиР или производстве, на что это влияет и что вы хотите изменить. Не нужно заранее выбирать услугу или готовить большое описание — достаточно обозначить ситуацию.</p>
      </div>
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
        <div className="p-6 md:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40"><ContactForm /></div>
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-[var(--teal-accent)]/20 bg-gradient-to-br from-[var(--teal-accent)]/5 to-transparent">
            <div className="flex items-center gap-3 mb-4"><ClipboardCheck className="w-5 h-5 text-[var(--teal-accent)]" /><h2 className="text-base font-semibold text-white">Что даст первая встреча</h2></div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">Первичное обсуждение — 30 минут, без оплаты и обязательств. Оно не заменяет анализ документов и техническую диагностику, но позволяет понять масштаб задачи и подходящий формат работы.</p>
            <ul className="space-y-2 text-sm text-gray-400 mb-5">{expectations.map((item) => <li key={item} className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--teal-accent)] mt-2 flex-shrink-0" /><span>{item}</span></li>)}</ul>
          </div>
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
            <h2 className="text-base font-semibold text-white mb-4">Что можно указать сразу</h2>
            <ul className="space-y-2 text-sm text-gray-400">{preparation.map((item) => <li key={item} className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--teal-accent)] mt-2 flex-shrink-0" /><span>{item}</span></li>)}</ul>
          </div>
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
            <h2 className="text-base font-semibold text-white mb-4">Прямые контакты</h2><ExpertContacts />
            <h3 className="text-sm font-semibold text-white mt-6 mb-3">Каналы и публикации</h3>
            <div className="space-y-3">
              <a href="https://t.me/engserviceplus" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] hover:border-[#229ED9]/40 hover:bg-[#229ED9]/5 transition-colors"><Send className="w-4 h-4 text-[#4db8e8]" /><div><div className="text-sm text-white">Telegram-канал</div><div className="text-xs text-gray-500">@engserviceplus</div></div></a>
              <a href="https://tenchat.ru/bardin-denisov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--electric-blue)]/40 hover:bg-[var(--electric-blue)]/5 transition-colors"><ExternalLink className="w-4 h-4 text-[var(--electric-blue)]" /><div><div className="text-sm text-white">TenChat</div><div className="text-xs text-gray-500">Публикации и профиль</div></div></a>
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">Первое обсуждение — без оплаты и обязательств. Оно позволяет понять масштаб задачи и подходящий формат работы.</p>
        </div>
      </div>
    </div>
  );
}
