"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Mail, Phone, Send, Calendar, User, EyeOff, Eye, Clock, CheckCircle2, CircleDashed } from "lucide-react";

type Lead = {
  id: number;
  name: string;
  company: string | null;
  position: string | null;
  email: string | null;
  phone: string | null;
  telegram: string | null;
  message: string | null;
  topic: string | null;
  source: string | null;
  helpFormat: string | null;
  preferredContact: string | null;
  sourcePage: string | null;
  sourceTool: string | null;
  consentVersion: string | null;
  newsletterConsent: boolean;
  analysisAttached: boolean;
  analysisLink: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const STATUS_OPTIONS = [
  { value: "new", label: "Новая" },
  { value: "accepted", label: "Принято" },
  { value: "processed", label: "Отработано" },
] as const;

const STATUS_BADGE: Record<string, string> = {
  new: "bg-[var(--teal-accent)]/10 text-[var(--teal-accent)]",
  accepted: "bg-amber-500/10 text-amber-400",
  processed: "bg-gray-600/20 text-gray-500",
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  new: <CircleDashed className="w-3 h-3" />,
  accepted: <Clock className="w-3 h-3" />,
  processed: <CheckCircle2 className="w-3 h-3" />,
};

const PREFERRED_CONTACT_LABEL: Record<string, string> = {
  email: "Email",
  phone: "Телефон",
  telegram: "Telegram",
};

export default function LeadsManager({ leads }: { leads: Lead[] }) {
  const [hideProcessed, setHideProcessed] = useState(true);
  const [statusMap, setStatusMap] = useState<Record<number, string>>(() =>
    Object.fromEntries(leads.map((l) => [l.id, l.status]))
  );
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [errorId, setErrorId] = useState<number | null>(null);

  const counts = useMemo(() => {
    const total = leads.length;
    let nNew = 0;
    let nAccepted = 0;
    let nProcessed = 0;
    for (const l of leads) {
      const s = statusMap[l.id] ?? l.status;
      if (s === "new") nNew++;
      else if (s === "accepted") nAccepted++;
      else if (s === "processed") nProcessed++;
    }
    return { total, nNew, nAccepted, nProcessed };
  }, [leads, statusMap]);

  const visibleLeads = useMemo(() => {
    return leads.filter((l) => {
      const s = statusMap[l.id] ?? l.status;
      if (hideProcessed && s === "processed") return false;
      return true;
    });
  }, [leads, statusMap, hideProcessed]);

  async function handleStatusChange(id: number, nextStatus: string) {
    if (statusMap[id] === nextStatus) return;
    setPendingId(id);
    setErrorId(null);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Не удалось обновить статус");
      }
      setStatusMap((prev) => ({ ...prev, [id]: nextStatus }));
    } catch (e) {
      setErrorId(id);
      console.error(e);
    } finally {
      setPendingId(null);
    }
  }

  function formatPreferred(value: string | null): string | null {
    if (!value) return null;
    return PREFERRED_CONTACT_LABEL[value] ?? value;
  }

  function formatDate(iso: string): string {
    try {
      return new Date(iso).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>
            Всего: <span className="text-white font-semibold">{counts.total}</span>
          </span>
          <span className="text-gray-600">·</span>
          <span>
            Новых:{" "}
            <span className="text-[var(--teal-accent)] font-semibold">{counts.nNew}</span>
          </span>
          <span className="text-gray-600">·</span>
          <span>
            Принято:{" "}
            <span className="text-amber-400 font-semibold">{counts.nAccepted}</span>
          </span>
          <span className="text-gray-600">·</span>
          <span>
            Отработано:{" "}
            <span className="text-gray-400 font-semibold">{counts.nProcessed}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setHideProcessed((v) => !v)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border border-[var(--border-subtle)] text-gray-400 hover:text-white hover:border-[var(--electric-blue)]/30 transition-colors"
          title={hideProcessed ? "Показать отработанные заявки" : "Скрыть отработанные заявки"}
        >
          {hideProcessed ? (
            <>
              <EyeOff className="w-4 h-4" />
              Отработанные скрыты · показать
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Все отображаются · скрыть отработанные
            </>
          )}
        </button>
      </div>

      {visibleLeads.length === 0 ? (
        <div className="p-12 rounded-xl border border-dashed border-[var(--border-subtle)] text-center">
          <p className="text-gray-400">
            {hideProcessed ? "Нет активных заявок" : "Пока нет заявок"}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {hideProcessed && counts.nProcessed > 0 ? (
              <>
                Отработанных скрыто: {counts.nProcessed}.{" "}
                <button
                  type="button"
                  onClick={() => setHideProcessed(false)}
                  className="text-[var(--electric-blue)] hover:underline"
                >
                  Показать их
                </button>
              </>
            ) : (
              <>
                Когда посетитель отправит форму на странице{" "}
                <Link href="/contacts" className="text-[var(--electric-blue)]">
                  /contacts
                </Link>
                , заявка появится здесь.
              </>
            )}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleLeads.map((lead) => {
            const status = statusMap[lead.id] ?? lead.status;
            const isPending = pendingId === lead.id;
            const isError = errorId === lead.id;
            const preferredLabel = formatPreferred(lead.preferredContact);

            return (
              <div
                key={lead.id}
                className={`p-6 rounded-xl border bg-[var(--graphite)]/40 transition-colors ${
                  status === "processed"
                    ? "border-[var(--border-subtle)]/60 opacity-75"
                    : "border-[var(--border-subtle)] hover:border-[var(--electric-blue)]/30"
                }`}
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

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded inline-flex items-center gap-1 ${
                        STATUS_BADGE[status] ?? STATUS_BADGE.new
                      }`}
                    >
                      {STATUS_ICON[status]}
                      {STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-600">
                      <Calendar className="w-3 h-3" />
                      {formatDate(lead.createdAt)}
                    </span>
                  </div>
                </div>

                {preferredLabel && (
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--electric-blue)]/5 border border-[var(--electric-blue)]/20 text-xs text-[var(--electric-blue)]">
                      <Mail className="w-3 h-3" />
                      Удобный способ связи: {preferredLabel}
                    </span>
                  </div>
                )}

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

                {lead.message && (
                  <div className="p-4 rounded-lg bg-[var(--background)]/50 border border-[var(--border-subtle)]">
                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {lead.message}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[11px] text-gray-600">
                    <span>Источник: {lead.source ?? "—"}</span>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-gray-400">
                    Статус:
                    <select
                      value={status}
                      disabled={isPending}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className={`px-2 py-1 rounded-md border bg-[var(--background)] text-white text-xs disabled:opacity-50 ${
                        isError ? "border-red-500/60" : "border-[var(--border-subtle)]"
                      } focus:border-[var(--electric-blue)] focus:outline-none transition-colors`
                      title="Изменить статус заявки"
                    >
                      {STATUS_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {isPending && (
                      <span className="text-gray-600">…</span>
                    )}
                    {isError && !isPending && (
                      <span className="text-red-400">не сохранено
                    )}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
