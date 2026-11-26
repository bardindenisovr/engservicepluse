import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Эксперты по сервису и производству | Сервис в Плюс", description: "Эксперты по инженерному сервису, ТОиР и организации производства. Выберите профильную задачу или опишите проблему без выбора направления.", alternates: { canonical: "/experts" } };
const card = "rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 p-8";
const outline = "inline-flex min-h-12 items-center rounded-lg border border-[var(--border-subtle)] px-5 py-3 text-gray-200";
const primary = "inline-flex min-h-12 items-center rounded-lg bg-[var(--electric-blue)] px-5 py-3 font-medium text-white";
export default function ExpertsPage() {
  return <main className="mx-auto max-w-7xl px-6 pb-20 pt-28"><section className="max-w-4xl"><h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">Эксперты по инженерному сервису и организации производства</h1><p className="mt-6 text-lg leading-relaxed text-gray-300">У каждого направления — свой ответственный эксперт. Вы можете обратиться с профильной задачей или описать проблему без выбора направления. После первичного обсуждения определим, чьи компетенции нужны.</p></section>
    <section className="mt-12 grid gap-6 md:grid-cols-2"><article className={card}><p className="mb-2 text-sm text-[var(--teal-accent)]">Роман Бардин-Денисов</p><h2 className="text-2xl font-semibold text-white">Инженерный сервис и ТОиР</h2><p className="my-5 leading-relaxed text-gray-300">Аудит и проектирование сервисной системы, SLA и KPI, гарантия, рекламации, ЗИП и экономика обслуживания.</p><div className="flex flex-wrap gap-3"><Link href="/about" className={outline}>Об эксперте</Link><Link href="/contacts?direction=service" className={primary}>Задача по сервису</Link></div></article>
      <article className={card}><p className="mb-2 text-sm text-[var(--teal-accent)]">Игорь Северов</p><h2 className="text-2xl font-semibold text-white">Организация производства</h2><p className="my-5 leading-relaxed text-gray-300">Производственный учёт, планирование, показатели, простои, качество, снижение потерь и обучение руководителей.</p><div className="flex flex-wrap gap-3"><Link href="/severov" className={outline}>Об эксперте</Link><Link href="/contacts?direction=production" className={primary}>Задача по производству</Link></div></article></section>
    <p className="mt-6 text-sm text-gray-400">Состав работ, исполнитель и условия взаимодействия определяются до начала проекта.</p><Link href="/methodology" className="mt-4 inline-block text-[var(--electric-blue)] hover:underline">Посмотреть методологию работы →</Link>
    <section className="mx-auto mt-16 max-w-3xl"><ContactForm formId="experts-page" title="Опишите вашу задачу" intro="Можно не выбирать направление: после первичного обсуждения определим, чьи компетенции нужны." /></section></main>;
}
