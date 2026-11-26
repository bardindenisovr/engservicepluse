import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { ProductionOffers } from "@/components/ProductionIntegration";

export const metadata: Metadata = {
  title: "Организация производства — Игорь Северов | Сервис в Плюс",
  description: "Помощь руководителям производства: учёт, планирование, простои, брак, показатели и снижение потерь. Разбор конкретной задачи с Игорем Северовым",
  alternates: { canonical: "/production" },
};
const steps = ["Вы описываете предприятие, проблему и желаемое изменение.", "Уточняем исходные данные, границы задачи и участников со стороны предприятия.", "Согласуем формат, состав результата, стоимость и сроки.", "Анализируем процесс и разрабатываем решение. Если предусмотрено договорённостью — проводим пилот и обучаем участников.", "Проверяем применение решений и фиксируем следующие действия."];

export default function ProductionPage() {
  return <main className="mx-auto max-w-7xl px-6 pb-20 pt-28">
    <section className="max-w-5xl pb-16">
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--teal-accent)]">Организация производства</p>
      <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">Организация производства: от проблемы к рабочему процессу</h1>
      <p className="mt-6 text-xl leading-relaxed text-gray-300">Помогаю руководителям производственных предприятий разобраться в причинах простоев, брака и срывов плана, выстроить учёт, ответственность и ежедневное управление.</p>
      <p className="mt-4 leading-relaxed text-gray-400">Начинаем с вашей задачи. Определяем, какие данные нужны, проверяем причины и согласуем изменения, которые команда сможет использовать в работе.</p>
      <p className="mt-4 text-sm text-gray-400">Игорь Северов — эксперт-партнёр «Сервис в Плюс» по организации производства.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="#contact" className="rounded-lg bg-[var(--electric-blue)] px-6 py-4 font-medium text-white">Разобрать производственную задачу</Link><Link href="/severov" className="rounded-lg border border-[var(--border-subtle)] px-6 py-4 text-gray-200">Об эксперте</Link></div>
    </section>
    <section className="border-t border-[var(--border-subtle)] py-14"><h2 className="mb-6 text-3xl font-bold text-white">Кому и с чем помогаю</h2><div className="grid gap-8 md:grid-cols-2"><p className="leading-relaxed text-gray-300">Работаю с собственниками небольших и средних производственных предприятий, директорами по производству, руководителями производства, начальниками цехов и участков, мастерами.</p><p className="leading-relaxed text-gray-300">Можно обратиться с одной проблемой или с задачей построить процесс: наладить учёт выработки, разобраться с простоями, снизить повторяемость дефектов, организовать планирование, связать показатели с действиями руководителей или стандартизировать работу участка.</p></div></section>
    <section className="py-14"><h2 className="mb-8 text-3xl font-bold text-white">Пять форматов работы</h2><ProductionOffers /></section>
    <section className="border-t border-[var(--border-subtle)] py-14"><h2 className="mb-8 text-3xl font-bold text-white">Как проходит работа</h2><ol className="grid gap-4 md:grid-cols-5">{steps.map((step, index) => <li key={step} className="rounded-xl border border-[var(--border-subtle)] p-5 text-sm leading-relaxed text-gray-300"><span className="mb-3 block text-xl font-semibold text-[var(--teal-accent)]">{index + 1}</span>{step}</li>)}</ol></section>
    <section id="joint" className="scroll-mt-24 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 p-8"><h2 className="mb-4 text-3xl font-bold text-white">Когда задача затрагивает производство, качество и сервис</h2><p className="max-w-4xl leading-relaxed text-gray-300">Причина рекламаций теряется между производством, качеством и сервисом? Определим, какие данные нужны и кого подключить к разбору. Состав работ и ответственность каждого эксперта согласуем до начала проекта.</p><Link href="/contacts?direction=joint" className="mt-6 inline-block rounded-lg bg-[var(--electric-blue)] px-6 py-4 font-medium text-white">Обсудить совместную задачу</Link></section>
    <section id="contact" className="mx-auto max-w-3xl scroll-mt-24 py-16"><ContactForm defaultDirection="production" formId="production-page" title="Что мешает вашему производству работать стабильно?" intro="Кратко опишите задачу. Уточним исходную ситуацию и возможный формат работы." /></section>
  </main>;
}
