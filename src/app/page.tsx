import Link from "next/link";
import { MessageSquare } from "lucide-react";
import ServiceFlow from "@/components/ServiceFlow";
import Diagnostics from "@/components/Diagnostics";
import AuditSection from "@/components/AuditSection";
import Services from "@/components/Services";
import SystemModel from "@/components/SystemModel";
import Results from "@/components/Results";
import Cases from "@/components/Cases";
import About from "@/components/About";
import ForEmployers from "@/components/ForEmployers";
import KnowledgeBase from "@/components/KnowledgeBase";

const competencies = [
  "Аудит сервиса",
  "Сервисная модель",
  "SLA и KPI",
  "ТОиР",
  "Гарантия и ЗИП",
];

const results = [
  "Объективную оценку текущей системы",
  "Целевую сервисную модель",
  "Приоритетный план изменений",
];

export default function Home() {
  return (
    <div className="relative z-10">
      {/* === ПЕРВЫЙ ЭКРАН === */}
      <section className="max-w-[1360px] mx-auto px-6 pt-12 pb-16">
        <div className="grid lg:grid-cols-[55%_45%] gap-10 items-start">
          {/* ЛЕВАЯ КОЛОНКА */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[var(--teal-accent)] animate-pulse" />
              <span className="text-xs text-[var(--teal-accent)] tracking-wide uppercase">
                Консалтинг по техническому сервису для B2B
              </span>
            </div>

            <h1 className="text-[34px] md:text-[48px] lg:text-[62px] font-bold leading-[1.05] tracking-tight max-w-[720px]">
              Выстраиваю{" "}
              <span className="text-[var(--electric-blue)]">
                управляемый технический сервис
              </span>{" "}
              для производственных компаний
            </h1>

            <p className="text-[17px] lg:text-[20px] text-gray-300 leading-[1.5] max-w-[680px]">
              Провожу аудит сервисной системы, выявляю потери и проектирую
              процессы, роли, SLA, KPI, гарантию, ЗИП и аналитику — чтобы сервис
              работал предсказуемо, а решения принимались на основе данных.
            </p>

            <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-gray-400">
              {competencies.map((c, i) => (
                <span key={c} className="flex items-center gap-2">
                  {i > 0 && <span className="text-gray-600">·</span>}
                  <span>{c}</span>
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center gap-2 px-6 rounded-xl bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white font-medium transition-all min-h-[56px] w-full sm:w-auto"
              >
                <MessageSquare className="w-4 h-4" />
                Обсудить задачу
              </Link>
              <Link
                href="#cases"
                className="inline-flex items-center justify-center gap-2 px-6 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--electric-blue)]/50 text-gray-200 hover:text-white font-medium transition-all min-h-[56px] w-full sm:w-auto"
              >
                Посмотреть кейсы
              </Link>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed max-w-[600px]">
              На первой встрече уточним задачу, текущую ситуацию и подходящий
              формат работы.
            </p>
          </div>

          {/* ПРАВАЯ КОЛОНКА */}
          <div className="space-y-5">
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--graphite)] to-[var(--deep-blue)] overflow-hidden">
              <img
                src="/roman.png"
                alt="Роман Бардин-Денисов — эксперт по техническому сервису"
                width={640}
                height={800}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="max-w-sm mx-auto lg:mx-0">
              <div className="text-lg font-semibold text-white">Роман</div>
              <div className="text-sm text-gray-400">
                Эксперт по развитию технического и послепродажного сервиса
              </div>
            </div>

            <div className="max-w-sm mx-auto lg:mx-0 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
              <div className="text-sm font-semibold text-white mb-3">
                Что получает компания
              </div>
              <ul className="space-y-2">
                {results.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-2 text-sm text-gray-400"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal-accent)] mt-2 flex-shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* === СХЕМА СЕРВИСНОЙ СИСТЕМЫ (перенесена с первого экрана) === */}
      <section className="max-w-[1360px] mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--electric-blue)] animate-pulse" />
              <span className="text-xs text-[var(--electric-blue)] tracking-wide uppercase">
                Элементы управляемого сервиса
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Процессы объединяются в{" "}
              <span className="text-[var(--electric-blue)]">единую систему</span>{" "}
              и связываются с измеримыми целями бизнеса
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Заявки, плановое обслуживание, диагностика, гарантия и ЗИП,
              аналитика отказов — всё это работает на одну цель: доступность
              оборудования для бизнеса.
            </p>
          </div>

          <div>
            <ServiceFlow />
          </div>
        </div>
      </section>

      {/* === ОСТАЛЬНЫЕ БЛОКИ === */}
      <Diagnostics />
      <AuditSection />
      <Services />
      <SystemModel />
      <Results />
      <Cases />
      <About />
      <ForEmployers />
      <KnowledgeBase />
    </div>
  );
}