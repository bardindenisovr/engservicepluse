import nodemailer from "nodemailer";

// SMTP-ящик, с которого уходят письма.
// На Timeweb/Яндекс 360 — это ящик на вашем домене, например no-reply@serviceinplus.ru
const SMTP_USER = process.env.SMTP_USER as string;
const SMTP_PASS = process.env.SMTP_PASS as string;
const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.yandex.ru";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);

const NOTIFY_TO = process.env.LEADS_NOTIFY_TO ?? "bardindenisovr@mail.ru";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!SMTP_USER || !SMTP_PASS) {
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    } as nodemailer.TransportOptions);
  }
  return transporter;
}

const PREFFERED_LABELS: Record<string, string> = {
  email: "Email",
  phone: "Телефон",
  telegram: "Telegram",
};

export async function sendLeadEmail(lead: {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  telegram?: string | null;
  company?: string | null;
  position?: string | null;
  topic?: string | null;
  preferredContact?: string | null;
  source?: string | null;
  sourcePage?: string | null;
  sourceTool?: string | null;
  message?: string | null;
  newsletterConsent?: boolean;
  analysisAttached?: boolean;
  analysisLink?: string | null;
  createdAt: Date;
}) {
  const t = getTransporter();
  if (!t) {
    console.warn(
      "[mailer] SMTP_USER/SMTP_PASS не заданы — отправка email пропущена"
    );
    return { ok: false, reason: "no-smtp-config" };
  }

  const preferredLabel = lead.preferredContact
    ? PREFFERED_LABELS[lead.preferredContact] ?? lead.preferredContact
    : "—";

  const lines: string[] = [
    `Новая заявка №${lead.id} с сайта serviceinplus.ru`,
    "",
    `Имя: ${lead.name || "—"}`,
  ];

  if (lead.company) lines.push(`Компания: ${lead.company}`);
  if (lead.position) lines.push(`Роль: ${lead.position}`);
  lines.push(
    `Email: ${lead.email || "—"}`,
    `Телефон: ${lead.phone || "—"}`,
    `Telegram: ${lead.telegram || "—"}`,
    `Удобный способ связи: ${preferredLabel}`
  );
  if (lead.topic) lines.push(`Тема: ${lead.topic}`);
  if (lead.source) lines.push(`Источник: ${lead.source}`);
  if (lead.sourcePage) lines.push(`Страница: ${lead.sourcePage}`);
  if (lead.sourceTool) lines.push(`Инструмент: ${lead.sourceTool}`);
  if (lead.analysisAttached) {
    lines.push(`Анализ приложен: да`);
    if (lead.analysisLink) lines.push(`Ссылка на анализ: ${lead.analysisLink}`);
  }
  lines.push(`Согласие на рассылку: ${lead.newsletterConsent ? "да" : "нет"}`);

  if (lead.message) {
    lines.push("", "Сообщение:", lead.message);
  }

  lines.push(
    "",
    `Получено: ${lead.createdAt.toLocaleString("ru-RU")}`,
    `Открыть в админке: https://serviceinplus.ru/admin/leads`
  );

  const text = lines.join("\r\n");
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
