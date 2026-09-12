import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Mail, Phone, Send, Building, Calendar, User } from "lucide-react";

export default async function AdminLeadsPage() {
  const authed = await isAuthenticated();
  if (!authed) redirect("/admin/login");

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Заявки</h1>
          <p className="text-sm text-gray-500">
            Всего: {leads.length} · Новых:{" "}
            {leads.filter((l) => l.status === "new").length}
          </p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="p-12 rounded-xl border border-dashed border-[var(--border-subtle)] text-center">
          <p className="text-gray-400 mb-2">Пока нет заявок</p>
          <p className="text-sm text-gray-600">
            Когда посетитель отправит форму на странице{" "}
            <Link href="/contacts" className="text-[var(--electric-blue)]">
              /contacts
            </Link>
            , заявка появится здесь.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 hover:border-[var(--electric-blue)]/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--electric-blue)]/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-[var(--electric-blue)]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{lead.name}</div>
                    <div className="text-xs text-gray-500">
                      {lead.position}
                      {lead.position && lead.company && " · "}
                      {lead.company}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded ${
                      lead.status === "new"
                        ? "bg-[var(--teal-accent)]/10 text-[var(--teal-accent)]"
                        : "bg-gray-600/10 text-gray-500"
                    }`}
                  >
                    {lead.status === "new" ? "Новая" : lead.status}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-600">
                    <Calendar className="w-3 h-3" />
                    {lead.createdAt.toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {/* Контакты */}
              <div className="flex flex-wrap gap-3 mb-4 text-xs">
                {lead.email && (
                  <a
                    href={`mailto:${lead.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border-subtle)] text-gray-400 hover:text-[var(--electric-blue)] hover:border-[var(--electric-blue)]/30 transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    {lead.email}
                  </a>
                )}
                {lead.phone && (
                  <a
                    href={`tel:${lead.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border-subtle)] text-gray-400 hover:text-[var(--electric-blue)] hover:border-[var(--electric-blue)]/30 transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    {lead.phone}
                  </a>
                )}
                {lead.telegram && (
                  <a
                    href={`https://t.me/${lead.telegram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border-subtle)] text-gray-400 hover:text-[#4db8e8] hover:border-[#229ED9]/30 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    {lead.telegram}
                  </a>
                )}
                {lead.topic && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border-subtle)] text-[var(--electric-blue)]">
                    {lead.topic}
                  </span>
                )}
              </div>

              {/* Сообщение */}
              {lead.message && (
                <div className="p-4 rounded-lg bg-[var(--background)]/50 border border-[var(--border-subtle)]">
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {lead.message}
                  </p>
                </div>
              )}

              {/* Мета */}
              <div className="mt-4 flex items-center gap-3 text-[11px] text-gray-600">
                <span>Источник: {lead.source ?? "—"}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Link
          href="/admin"
          className="text-sm text-gray-500 hover:text-white transition-colors"
        >
          ← Назад в админ-панель
        </Link>
      </div>
    </div>
  );
}