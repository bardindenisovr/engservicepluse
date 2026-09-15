import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function sendTelegramNotification(lead: {
  name: string;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  telegram?: string | null;
  message?: string | null;
  topic?: string | null;
  source?: string | null;
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
  if (lead.email) lines.push(`*Email:* ${lead.email}`);
  if (lead.phone) lines.push(`*Телефон:* ${lead.phone}`);
  if (lead.telegram) lines.push(`*Telegram:* ${lead.telegram}`);
  if (lead.topic) lines.push(`*Тема:* ${lead.topic}`);
  if (lead.source) lines.push(`*Источник:* ${lead.source}`);

  if (lead.message) {
    lines.push("");
    lines.push(`*Сообщение:*`);
    lines.push(lead.message);
  }

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
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Заполните обязательные поля: имя, email, описание задачи" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Укажите корректный email" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        company: body.company?.trim() || null,
        position: body.position?.trim() || null,
        email,
        phone: body.phone?.trim() || null,
        telegram: body.telegram?.trim() || null,
        message,
        topic: body.topic?.trim() || null,
        source: body.source || "contact-form",
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