"use client";

import { useState } from "react";
import { Download, Loader2, CheckCircle2 } from "lucide-react";

const magnets = [
  {
    id: "audit-checklist",
    title: "Чек-лист аудита сервисной службы",
    description:
      "50 пунктов для самостоятельной диагностики: процессы, SLA, гарантия, ЗИП, партнёры, аналитика.",
    fileUrl: "/downloads/audit-checklist.pdf",
  },
  {
    id: "partner-matrix",
    title: "Матрица оценки сервисного партнёра",
    description:
      "Критерии выбора и оценки подрядчиков: компетенции, сроки, качество, прозрачность.",
    fileUrl: "/downloads/partner-matrix.pdf",
  },
  {
    id: "sla-readiness",
    title: "Чек-лист готовности к SLA-контракту",
    description:
      "Проверьте, готова ли ваша сервисная система выполнять обязательства по времени реакции.",
    fileUrl: "/downloads/sla-readiness.pdf",
  },
];

export default function LeadMagnet() {
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!selected) {
      setError("Выберите материал");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          message: `Запрос лид-магнита: ${selected}`,
          topic: "Лид-магнит",
          source: "lead-magnet",
        }),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error ?? "Не удалось отправить");
        setSending(false);
        return;
      }

      setSuccess(true);
      setSending(false);

      // Отправляем цель в Метрику
      if (typeof window !== "undefined" && (window as any).ym) {
        (window as any).ym(112550935, "reachGoal", "lead_magnet_download");
      }

      // Запускаем скачивание выбранного файла
      const magnet = magnets.find((m) => m.id === selected);
      if (magnet) {
        const a = document.createElement("a");
        a.href = magnet.fileUrl;
        a.download = "";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch {
      setError("Ошибка соединения");
      setSending(false);
    }
  }

  if (success) {
    return (
      <div className="p-8 rounded-2xl border border-[var(--teal-accent)]/20 bg-[var(--teal-accent)]/5 text-center">
        <CheckCircle2 className="w-10 h-10 text-[var(--teal-accent)] mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">
          Материал отправлен
        </h3>
        <p className="text-sm text-gray-400">
          Скачивание началось. Если файл не открылся — напишите мне в Telegram.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Выбор материала */}
      <div className="grid md:grid-cols-3 gap-3">
        {magnets.map((magnet) => (
          <button
            key={magnet.id}
            onClick={() => setSelected(magnet.id)}
            className={`text-left p-5 rounded-xl border transition-all ${
              selected === magnet.id
                ? "border-[var(--electric-blue)]/50 bg-[var(--electric-blue)]/5"
                : "border-[var(--border-subtle)] bg-[var(--graphite)]/40 hover:border-[var(--electric-blue)]/30"
            }`}
          >
            <Download
              className={`w-5 h-5 mb-3 ${
                selected === magnet.id
                  ? "text-[var(--electric-blue)]"
                  : "text-gray-500"
              }`}
            />
            <h4 className="text-sm font-semibold text-white mb-2 leading-snug">
              {magnet.title}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              {magnet.description}
            </p>
          </button>
        ))}
      </div>

      {/* Форма */}
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 space-y-4"
      >
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Имя <span className="text-[var(--warm-accent)]">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--background)] text-white focus:border-[var(--electric-blue)]/50 outline-none"
              placeholder="Как к вам обращаться"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Email <span className="text-[var(--warm-accent)]">*</span>
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--background)] text-white focus:border-[var(--electric-blue)]/50 outline-none"
              placeholder="you@company.ru"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">Компания</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--background)] text-white focus:border-[var(--electric-blue)]/50 outline-none"
              placeholder="Название компании"
            />
          </div>
        </div>

        {error && <p className="text-sm text-[var(--warm-accent)]">{error}</p>}

        <button
          type="submit"
          disabled={sending || !selected}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-all"
        >
          {sending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Отправка...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Скачать материал
            </>
          )}
        </button>

        <p className="text-[11px] text-gray-600 text-center">
          Нажимая кнопку, вы соглашаетесь на обработку персональных данных
        </p>
      </form>
    </div>
  );
}