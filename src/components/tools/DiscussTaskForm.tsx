"use client";

import { useState, type CSSProperties, type FormEvent } from "react";

const HELP_FORMATS = [
  "диагностика",
  "аудит",
  "практикум",
  "сопровождение",
  "пока не знаю",
];

type Props = {
  sourceTool?: string;
  sourcePage?: string;
  buttonStyle?: CSSProperties;
};

export default function DiscussTaskForm({ sourceTool = "", sourcePage = "", buttonStyle }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    if (!email && !phone) {
      setError("Укажите e-mail или телефон — хотя бы один способ связи.");
      setStatus("error");
      return;
    }
    if (fd.get("privacyConsent") !== "on") {
      setError("Требуется согласие на обработку персональных данных.");
      setStatus("error");
      return;
    }
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    );
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email,
      phone,
      company: String(fd.get("company") || "").trim(),
      role: String(fd.get("role") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      helpFormat: String(fd.get("helpFormat") || ""),
      attachAnalysis: fd.get("attachAnalysis") === "on",
      privacyConsent: true,
      newsletterConsent: fd.get("newsletterConsent") === "on",
      sourceTool,
      sourcePage: sourcePage || (typeof window !== "undefined" ? window.location.pathname : ""),
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
    };
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setError("Не удалось отправить заявку. Попробуйте ещё раз или напишите на почту.");
    }
  }

  if (status === "ok") {
    return (
      <p role="status" style={{ color: "#34d399", lineHeight: 1.6 }}>
        Заявка получена. Я изучу описание и отвечу до конца следующего рабочего дня.
        Роман Бардин-Денисов, «Сервис в плюс».
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
      <label style={{ display: "grid", gap: 6 }}>
        Имя *
        <input name="name" required autoComplete="name" style={input} />
      </label>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <label style={{ display: "grid", gap: 6 }}>
          E-mail
          <input name="email" type="email" autoComplete="email" style={input} />
        </label>
        <label style={{ display: "grid", gap: 6 }}>
          Телефон
          <input name="phone" type="tel" autoComplete="tel" style={input} />
        </label>
      </div>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <label style={{ display: "grid", gap: 6 }}>
          Компания
          <input name="company" autoComplete="organization" style={input} />
        </label>
        <label style={{ display: "grid", gap: 6 }}>
          Роль / должность
          <input name="role" autoComplete="organization-title" style={input} />
        </label>
      </div>
      <label style={{ display: "grid", gap: 6 }}>
        Краткое описание задачи *
        <textarea name="message" required rows={4} style={{ ...input, resize: "vertical" }} />
      </label>
      <label style={{ display: "grid", gap: 6 }}>
        Желаемый формат помощи
        <select name="helpFormat" defaultValue="пока не знаю" style={input}>
          {HELP_FORMATS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </label>
      <label style={{ display: "flex", gap: 8, alignItems: "flex-start", lineHeight: 1.5 }}>
        <input type="checkbox" name="attachAnalysis" style={{ marginTop: 4 }} />
        <span>Приложить мой анализ к заявке</span>
      </label>
      <label style={{ display: "flex", gap: 8, alignItems: "flex-start", lineHeight: 1.5 }}>
        <input type="checkbox" name="privacyConsent" required style={{ marginTop: 4 }} />
        <span>
          Согласен на обработку персональных данных в соответствии с{" "}
          <a href="/privacy" target="_blank" rel="noopener" style={{ color: "#7dd3fc" }}>
            политикой конфиденциальности
          </a>{" "}
          *
        </span>
      </label>
      <label style={{ display: "flex", gap: 8, alignItems: "flex-start", lineHeight: 1.5 }}>
        <input type="checkbox" name="newsletterConsent" style={{ marginTop: 4 }} />
        <span>Хочу получать информационные материалы (необязательно)</span>
      </label>
      {status === "error" && (
        <p role="alert" style={{ color: "#f87171", margin: 0 }}>{error}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        style={{ ...btn, ...(buttonStyle || {}), opacity: status === "sending" ? 0.6 : 1 }}
      >
        {status === "sending" ? "Отправляю…" : "Обсудить задачу"}
      </button>
    </form>
  );
}

const input: CSSProperties = {
  width: "100%",
  border: "1px solid #2a3242",
  borderRadius: 8,
  padding: "10px 12px",
  background: "#0f141d",
  color: "#e2e8f0",
  font: "inherit",
};

const btn: CSSProperties = {
  display: "inline-block",
  background: "#38bdf8",
  color: "#0c0f16",
  padding: "14px 28px",
  borderRadius: 8,
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  justifySelf: "start",
};
