import nodemailer from "nodemailer";
import type { Transporter, TransportOptions } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
    const keys = Object.keys(process.env);
    console.warn("[mailer] Диагностика окружения:", {
      totalEnvKeys: keys.length,
      // Ищем похожие имена, в том числе с пробелами или в другом регистре
      smtpLikeKeys: keys
        .filter((k) => /smtp|leads/i.test(k))
        .map((k) => JSON.stringify(k)),
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
      hasTelegramToken: Boolean(process.env.TELEGRAM_BOT_TOKEN),
      nodeEnv: process.env.NODE_ENV,
    });
    return null;
  }
  if (!transporter) {
    const smtpHost = process.env.SMTP_HOST ?? "smtp.mail.ru";
    const smtpPort = Number(process.env.SMTP_PORT ?? 465);

    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    } as TransportOptions);
  }

  return transporter;
}

const PREFERRED_LABELS: Record<string, string> = {
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
  message: string | null;
  createdAt: Date;
}

export async function sendLeadEmail(lead: LeadEmail) {
  const t = getTransporter();

  if (!t) {
    console.warn(
      "[mailer] SMTP_USER/SMTP_PASS не заданы — отправка email пропущена"
    );
    return { ok: false, reason: "no-smtp-config" };
  }

  const preferredLabel = lead.preferredContact
    ? PREFERRED_LABELS[lead.preferredContact] ?? lead.preferredContact
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
    "Открыть в админке: https://serviceinplus.ru/admin/leads",
  ].join("\r\n");

  const subject = `Новая заявка №${lead.id} — ${lead.name || "без имени"}`;

  try {
    const info = await t.sendMail({
      from: `"serviceinplus.ru" <${process.env.SMTP_USER}>`,
      to: process.env.LEADS_NOTIFY_TO ?? "bardindenisovr@mail.ru",
      subject,
      text,
      headers: { "X-Lead-Id": String(lead.id) },
    });

    console.info("[mailer] Письмо принято SMTP-сервером:", info.messageId);
    return { ok: true, messageId: info.messageId };
  } catch (error) {
    console.error("[mailer] Ошибка отправки email:", error);
    return { ok: false, reason: "send-error" };
  }
}