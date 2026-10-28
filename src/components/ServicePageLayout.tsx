import Link from "next/link";
import type { ServicePage } from "@/data/service-pages-core";

export default function ServicePageLayout({ service }: { service: ServicePage }) {
  const contactsHref = `/contacts?service=${encodeURIComponent(service.slug)}#form`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Хлебные крошки */}
      <nav className="text-xs text-gray-500 mb-8" aria-label="Хлебные крошки">
        <Link href="/services" className="hover:text-[var(--electric-blue)] transition-colors">
          Все услуги
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">{service.title}</span>
      </nav>

      {/* Первый экран */}
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          {service.title}
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed mb-8">{service.lead}</p>

        <div className="flex flex-wrap gap-3 mb-8">
          <span className="px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--graphite)]/50 text-sm text-gray-300">
            {service.duration}
          </span>
          <span className="px-4 py-2 rounded-full border border-[var(--teal-accent)]/30 bg-[var(--teal-accent)]/10 text-sm text-[var(--teal-accent)]">
            {service.price}
          </span>
        </div>

        <Link
          href={contactsHref}
          className="inline-flex items-center gap-2 px-6 py-4 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white font-medium transition-colors"
        >
          {service.ctaText}
        </Link>
      </header>

      {/* Секции */}
      {service.sections.map((section) => (
        <section key={section.heading} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
          {section.kind === "paragraphs" ? (
            <div className="space-y-4">
              {section.paragraphs.map((text, i) => (
                <p key={i} className="text-gray-400 leading-relaxed">
                  {text}
                </p>
              ))}
            </div>
          ) : (
            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--electric-blue)] mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {/* Связанные услуги */}
      {service.related.length > 0 && (
        <section className="mt-12 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/30">
          <h2 className="text-lg font-semibold mb-4">Смотрите также</h2>
          <div className="flex flex-wrap gap-3">
            {service.related.map((rel) => (
              <Link
                key={rel.href}
                href={rel.href}
                className="px-4 py-2 rounded-full border border-[var(--border-subtle)] text-sm text-gray-300 hover:border-[var(--electric-blue)]/50 hover:text-[var(--electric-blue)] transition-colors"
              >
                {rel.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA раздела «Инструменты» */}
      <section className="mt-10 p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/30">
        <h2 className="text-lg font-semibold mb-2">Начните с бесплатного самостоятельного разбора</h2>
        <p className="text-sm text-gray-400 mb-4">«5 почему», диаграмма Исикавы, 8D и А3 — без регистрации.</p>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-sm text-gray-300 hover:text-white hover:border-[var(--electric-blue)]/50 transition-colors min-h-[44px]"
        >
          Выбрать инструмент
        </Link>
      </section>

      {/* Повторный CTA */}
      <section className="mt-10 text-center">
        <Link
          href={contactsHref}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white font-medium transition-colors"
        >
          {service.ctaText}
        </Link>
      </section>
    </div>
  );
}
