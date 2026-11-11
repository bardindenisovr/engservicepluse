import nodemailer from "nodemailer";
import type { Transporter, TransportOptions } from "nodemailer";

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.yandex.ru";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const NOTIFY_TO = process.env.LEADS_NOTIFY_TO ?? "bardindenisovr@mail.ru";

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!SMTP_USER || !SMTP_PASS) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    } as TransportOptions);
  }
  return transporter;
}

const PREFFERED_LABELS: Record<string, string> = {
  email: "Email",
  phone: "Телефон",
  telegram: "Telegram",
};

export interface LeadEmail {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  telegram: string | null;
  topic: string | null;
  preferredContact: string | null;
  message: string | null;          // ← было string, стало string | null
  createdAt: Date;
}

export async function sendLeadEmail(lead: LeadEmail) {
  const t = getTransporter();
  if (!t) {
    console.warn("[mailer] SMTP_USER/SMTP_PASS не заданы — отправка email пропущена");
    return { ok: false, reason: "no-smtp-config" };
  }

  const preferredLabel = lead.preferredContact
    ? PREFFERED_LABELS[lead.preferredContact] ?? lead.preferredContact
    : "—";

  const text = [
    `Новая заявка №${lead.id} с сайта serviceinplus.ru`,
    "",
    `Имя: ${lead.name || "—"}`,
    `Email: ${lead.email || "—"}`,
    `Телефон: ${lead.phone || "—"}`,
    `Telegram: ${lead.telegram || "—"}`,
    `Удобный способ связи: ${preferredLabel}`,
    `Тема: ${lead.topic || "—"}`,
    "",
    "Сообщение:",
    lead.message || "—",
    "",
    `Получено: ${lead.createdAt.toLocaleString("ru-RU")}`,
    `Открыть в админке: https://serviceinplus.ru/admin/leads`,
  ].join("\r\n");

  const subject = `Новая заявка №${lead.id} — ${lead.name || "без имени"}`;

  try {
    const info = await t.sendMail({
      from: `"serviceinplus.ru" <${SMTP_USER}>`,
      to: NOTIFY_TO,
      subject,
      text,
      headers: { "X-Lead-Id": String(lead.id) },
    });
    return { ok: true, messageId: info.messageId };
  } catch (error) {
    console.error("[mailer] Ошибка отправки email:", error);
    return { ok: false, reason: "send-error" };
  }
}