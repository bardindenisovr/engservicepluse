import Link from "next/link";
import AuditSection from "@/components/AuditSection";
import Services from "@/components/Services";
import SystemModel from "@/components/SystemModel";
import Results from "@/components/Results";
import Cases from "@/components/Cases";
import About from "@/components/About";
import ForEmployers from "@/components/ForEmployers";
import KnowledgeBase from "@/components/KnowledgeBase";
import { DirectionChoice, ExpertsTeaser } from "@/components/ProductionIntegration";

const competencies = ["Аудит сервиса", "Экспресс-диагностика", "Диспетчеризация", "SLA и KPI", "ТОиР", "Гарантия и ЗИП"];
const situations = [
  "Сроки обслуживания срываются, а причины каждый раз объясняются по-разному.",
  "Рекламации повторяются, но обратная связь не приводит к устойчивым изменениям.",
  "Заявки и ремонты накапливаются между подразделениями без понятного владельца.",
  "Запасы деталей растут, но критичных позиций всё равно не хватает.",
  "Сервис расширяется, а качество зависит от отдельных сотрудников и подрядчиков.",
  "Затраты видны, но себестоимость работ и доходность обслуживания остаются непрозрачными.",
];

export default function Home() {
  return (
    <div className="relative z-10">
      <section className="max-w-[1360px] mx-auto px-6 pt-24 pb-12">
        <div className="max-w-5xl space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[var(--teal-accent)] animate-pulse" />
            <span className="text-xs text-[var(--teal-accent)] tracking-wide uppercase">Инженерный сервис и ТОиР | Организация производства</span>
          </div>
          <h1 className="text-[30px] md:text-[42px] lg:text-[54px] font-bold leading-[1.08] tracking-tight">Разбираем задачи сервиса и производства — <span className="text-[var(--electric-blue)]">от причин к рабочему решению</span></h1>
          <p className="text-[16px] lg:text-[19px] text-gray-300 leading-[1.6] max-w-4xl">Помогаем руководителям предприятий разобраться в причинах простоев, дефектов, рекламаций и срывов плана. Выстраиваем учёт, ответственность и процессы, которые команда сможет использовать в ежедневной работе.</p>
          <p className="max-w-4xl leading-relaxed text-gray-400">Начинаем с вашей задачи: определяем, какие данные нужны, кого подключить к разбору и какой формат работы подойдёт.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contacts?direction=service" className="inline-flex min-h-12 items-center rounded-lg bg-[var(--electric-blue)] px-6 py-3 font-medium text-white">Задача по сервису</Link>
            <Link href="/contacts?direction=production" className="inline-flex min-h-12 items-center rounded-lg border border-[var(--border-subtle)] px-6 py-3 font-medium text-gray-200">Задача по производству</Link>
          </div>
          <Link href="/experts" className="inline-block text-sm text-[var(--electric-blue)] hover:underline">Кто работает по этим направлениям →</Link>
        </div>
      </section>
      <DirectionChoice />
      <SystemModel />
      <Results />
      <Cases />
      <ExpertsTeaser />
      <KnowledgeBase />
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-white">Начнём с вашей задачи</h2>
        <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-gray-300">Опишите ситуацию и выберите направление. Если затрудняетесь с выбором или проблема затрагивает несколько подразделений, укажите это в форме — определим, кого подключить к разбору.</p>
        <Link href="/contacts?direction=unsure" className="mt-7 inline-flex min-h-12 items-center rounded-lg bg-[var(--electric-blue)] px-7 py-3 font-medium text-white">Обсудить задачу</Link>
      </section>
    </div>
  );
}
