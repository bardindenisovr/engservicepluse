import KnowledgeBase from "@/components/KnowledgeBase";
import Cases from "@/components/Cases";
import About from "@/components/About";
import ForEmployers from "@/components/ForEmployers";import Services from "@/components/Services";
import SystemModel from "@/components/SystemModel";
import Results from "@/components/Results";
import Diagnostics from "@/components/Diagnostics";
import AuditSection from "@/components/AuditSection";
import Link from "next/link";
import { MessageSquare, FileSearch, ArrowRight } from "lucide-react";
import ServiceFlow from "@/components/ServiceFlow";

const competencies = [
  "Аудит сервиса",
  "Сервисная модель",
  "Эксплуатация",
  "SLA и KPI",
  "Гарантия",
  "Партнерская сеть",
  "ЗИП",
  "Экономика сервиса",
];

const trustResults = [
  {
    title: "Управляемые SLA",
    description: "Без необоснованных штрафов и невыполнимых обещаний",
  },
  {
    title: "Меньше повторных выездов",
    description: "Сокращение сроков восстановления за счет системной диагностики",
  },
  {
    title: "Постгарантийный сервис",
    description: "Источник выручки, а не только статья затрат",
  },
];

export default function Home() {
  return (
    <div className="relative z-10">
      {/* === ПЕРВЫЙ ЭКРАН === */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Левая колонка — текст */}
          <div className="space-y-8">
            {/* Плашка эксперта */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[var(--teal-accent)] animate-pulse" />
              <span className="text-xs text-[var(--teal-accent)] tracking-wide uppercase">
              Экспертный сервис для B2B
              </span>
            </div>

            {/* Заголовок */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Превращаю технический сервис в{" "}
              <span className="text-[var(--electric-blue)]">управляемую систему</span>
            </h1>

            {/* Подзаголовок */}
            <p className="text-lg text-gray-400 leading-relaxed">
              От заявок, гарантий и запасных частей — к прозрачным процессам,
              измеримому результату и экономике сервиса.
            </p>

            {/* Пояснение */}
            <p className="text-sm text-gray-500 leading-relaxed">
              Помогаю производственным и инженерным компаниям проектировать,
              оценивать и развивать сервисные системы: процессы, структуру, SLA,
              KPI, партнерскую сеть, гарантию, ЗИП, аналитику и постгарантийное
              обслуживание.
            </p>

            {/* CTA-кнопки */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contacts"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white font-medium transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Обсудить задачу
              </Link>
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--electric-blue)]/50 text-gray-300 hover:text-white font-medium transition-all"
              >
                <FileSearch className="w-4 h-4" />
                Заказать аудит
              </Link>
            </div>

            {/* Ссылка «Посмотреть подход» */}
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--electric-blue)] transition-colors"
            >
              Посмотреть подход
              <ArrowRight className="w-3 h-3" />
            </Link>

            {/* Строка компетенций */}
            <div className="pt-4">
              <p className="text-xs uppercase tracking-widest text-gray-600 mb-3">
                Направления работы
              </p>
              <div className="flex flex-wrap gap-2">
                {competencies.map((comp) => (
                  <span
                    key={comp}
                    className="px-3 py-1.5 text-xs text-gray-400 border border-[var(--border-subtle)] rounded-md hover:border-[var(--electric-blue)]/30 hover:text-gray-300 transition-colors"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка — схема */}
          <div className="lg:sticky lg:top-24">
            <ServiceFlow />
          </div>
        </div>
      </section>

      {/* === БЛОК ДОВЕРИЯ === */}
      <section className="border-y border-[var(--border-subtle)] bg-[var(--graphite)]/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Сервис — это не отдел ремонта. Это система, которая определяет
            надежность оборудования, лояльность заказчика и финансовый результат
            производителя.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {trustResults.map((result) => (
              <div
                key={result.title}
                className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/50 hover:border-[var(--electric-blue)]/30 transition-colors"
              >
                <h3 className="text-base font-semibold text-white mb-2">
                  {result.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* === ДИАГНОСТИКА ПРОБЛЕМ === */}
      <Diagnostics />

      {/* === АУДИТ СЕРВИСНОЙ СИСТЕМЫ === */}
      <AuditSection />
            {/* === УСЛУГИ === */}
      <Services />

      {/* === СЕРВИС КАК СИСТЕМА === */}
      <SystemModel />

      {/* === РЕЗУЛЬТАТЫ === */}
      <Results />
            {/* === КЕЙСЫ === */}
      <Cases />

      {/* === ОБ ЭКСПЕРТЕ === */}
      <About />

      {/* === ДЛЯ РАБОТОДАТЕЛЯ === */}
      <ForEmployers />
            {/* === БАЗА ЗНАНИЙ === */}
      <KnowledgeBase />
    </div>
  );
}