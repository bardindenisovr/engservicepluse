"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

const topics = [
  "Аудит сервисной системы",
  "Консультация",
  "Проектирование сервисной модели",
  "Эксплуатация оборудования",
  "Гарантия и рекламации",
  "SLA и KPI",
  "Партнерская сеть",
  "Управление ЗИП",
  "Экономика сервиса",
  "Сервис ЦОД",
  "Другое",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    telegram: "",
    message: "",
    topic: "",
    preferredContact: "email",
  });
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const contactValue = [form.email, form.phone, form.telegram]
      .map((v) => v.trim())
      .filter(Boolean)[0];

    if (!contactValue) {
      setError("Укажите хотя бы один способ связи: email, телефон или Telegram");
      return;
    }

    if (!consent) {
      setError("Необходимо согласие на обработку персональных данных");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          contact: contactValue,
          source: "contact-form",
        }),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error ?? "Не удалось отправить заявку");
        setSending(false);
        return;
      }

      setSuccess(true);
      setSending(false);

      // Отправляем цель в Яндекс.Метрику
      if (typeof window !== "undefined" && (window as any).ym) {
        (window as any).ym(112550935, "reachGoal", "lead_form_submit");
      }
    } catch {
      setError("Ошибка соединения. Попробуйте еще раз.");
      setSending(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-[var(--teal-accent)]/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-[var(--teal-accent)]" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-3">
          Заявка отправлена
        </h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          Спасибо. Мы свяжемся с вами в ближайшее время, чтобы обсудить задачу
          и предложить формат первичного разговора.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
          Описание задачи <span className="text-[var(--warm-accent)]">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--background)] text-white focus:border-[var(--electric-blue)]/50 outline-none resize-vertical text-sm"
          placeholder="Что происходит, на что это влияет, что вы хотите изменить"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-2">
          Контакт для связи <span className="text-[var(--warm-accent)]">*</span>
        </label>
        <input
          type="text"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--background)] text-white focus:border-[var(--electric-blue)]/50 outline-none"
          placeholder="Email, телефон +7 ... или @telegram"
        />
        <p className="mt-1.5 text-[11px] text-gray-600 leading-relaxed">
          Любой удобный способ связи — достаточно одного
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-2">Телефон</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--background)] text-white focus:border-[var(--electric-blue)]/50 outline-none"
            placeholder="+7 ..."
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-2">Telegram</label>
          <input
            type="text"
            value={form.telegram}
            onChange={(e) => update("telegram", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--background)] text-white focus:border-[var(--electric-blue)]/50 outline-none"
            placeholder="@username"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-2">
          Тема обращения
        </label>
        <select
          value={form.topic}
          onChange={(e) => update("topic", e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--background)] text-white focus:border-[var(--electric-blue)]/50 outline-none"
        >
          <option value="">Можно не выбирать — обсудим на встрече</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-2">
          Удобный способ связи
        </label>
        <div className="flex flex-wrap gap-3">
          {[
            { value: "email", label: "Email" },
            { value: "telegram", label: "Telegram" },
            { value: "phone", label: "Телефон" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-400"
            >
              <input
                type="radio"
                name="preferredContact"
                value={opt.value}
                checked={form.preferredContact === opt.value}
                onChange={(e) => update("preferredContact", e.target.value)}
                className="accent-[var(--electric-blue)]"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--graphite)]/30">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="w-4 h-4 mt-0.5 accent-[var(--electric-blue)] flex-shrink-0"
        />
        <span className="text-xs text-gray-500 leading-relaxed">
          Я согласен на обработку персональных данных в соответствии с{" "}
          <a
            href="/privacy"
            className="text-[var(--electric-blue)] hover:underline"
          >
            политикой обработки персональных данных
          </a>
        </span>
      </label>

      {error && <p className="text-sm text-[var(--warm-accent)]">{error}</p>}

      <button
        type="submit"
        disabled={sending || !consent}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-all"
      >
        {sending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Отправка...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Обсудить задачу
          </>
        )}
      </button>

      <p className="text-[11px] text-gray-600 text-center leading-relaxed">
        Обязательных полей всего два: имя и способ связи. Остальное поможет
        подготовиться к разговору.
      </p>
    </form>
  );
}
