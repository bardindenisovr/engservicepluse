import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function sendTelegramNotification(lead: {
  name: string;
  company?: string | null;
  position?: string | null;
  email?: string | null;
  phone?: string | null;
  telegram?: string | null;
  message?: string | null;
  topic?: string | null;
  source?: string | null;
  helpFormat?: string | null;
  sourcePage?: string | null;
  sourceTool?: string | null;
  newsletterConsent?: boolean;
  analysisAttached?: boolean;
  analysisLink?: string | null;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram-уведомления не настроены");
    return;
  }

  const lines = [
    "🔔 *Новая заявка с сайта*",
    "",
    `*Имя:* ${lead.name}`,
  ];

  if (lead.company) lines.push(`*Компания:* ${lead.company}`);
  if (lead.position) lines.push(`*Роль:* ${lead.position}`);
  if (lead.email) lines.push(`*Email:* ${lead.email}`);
  if (lead.phone) lines.push(`*Телефон:* ${lead.phone}`);
  if (lead.telegram) lines.push(`*Telegram:* ${lead.telegram}`);
  if (lead.topic) lines.push(`*Тема:* ${lead.topic}`);
  if (lead.helpFormat) lines.push(`*Формат помощи:* ${lead.helpFormat}`);
  if (lead.sourceTool) lines.push(`*Инструмент:* ${lead.sourceTool}`);
  if (lead.sourcePage) lines.push(`*Страница:* ${lead.sourcePage}`);
  if (lead.source) lines.push(`*Источник:* ${lead.source}`);
  lines.push(`*Анализ приложен:* ${lead.analysisAttached ? "да" : "нет"}`);
  if (lead.analysisAttached && lead.analysisLink) {
    lines.push(`*Ссылка на анализ:* ${lead.analysisLink}`);
  }
  lines.push(`*Согласие на рассылку:* ${lead.newsletterConsent ? "да" : "нет"}`);

  if (lead.message) {
    lines.push("");
    lines.push(`*Сообщение:*`);
    lines.push(lead.message);
  }

  lines.push("");
  lines.push("_Рекомендуемый срок ответа: до конца следующего рабочего дня._");

  const text = lines.join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !message) {
      return NextResponse.json(
        { error: "Заполните обязательные поля: имя и описание задачи" },
        { status: 400 }
      );
    }

    // П. 5.1: обязателен хотя бы один контакт — e-mail или телефон
    if (!email && !phone) {
      return NextResponse.json(
        { error: "Укажите контакт для связи: e-mail или телефон" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Укажите корректный email" },
        { status: 400 }
      );
    }

    // П. 5.1: без отметки согласия на обработку данных форма не отправляется
    const consentPersonal =
      body.consentPersonal === true || body.consent === true;
    if (!consentPersonal) {
      return NextResponse.json(
        { error: "Требуется согласие на обработку персональных данных" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        company: body.company?.trim() || null,
        position: body.position?.trim() || null,
        email: email || null,
        phone: phone || null,
        telegram: body.telegram?.trim() || null,
        message,
        topic: body.topic?.trim() || null,
        source: body.source || "contact-form",
        helpFormat: body.helpFormat?.trim() || null,
        sourcePage: body.sourcePage?.trim() || null,
        sourceTool: body.sourceTool?.trim() || null,
        utmSource: body.utmSource?.trim() || null,
        utmMedium: body.utmMedium?.trim() || null,
        utmCampaign: body.utmCampaign?.trim() || null,
        consentVersion: body.consentVersion?.trim() || "2026-10-27",
        newsletterConsent: body.newsletterConsent === true,
        analysisAttached: body.analysisAttached === true,
        analysisLink: body.analysisAttached === true ? body.analysisLink?.trim() || null : null,
        status: "new",
      },
    });

    console.log("Новая заявка:", lead.id, lead.name);

    await sendTelegramNotification(lead);

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    console.error("Ошибка приёма заявки:", error);
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Попробуйте позже." },
      { status: 500 }
    );
  }
}
