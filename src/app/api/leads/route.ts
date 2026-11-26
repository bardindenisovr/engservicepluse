import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLeadEmail } from "@/lib/mailer";

async function sendTelegramNotification(lead: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) { console.warn("Telegram-уведомления не настроены"); return; }
  const labels: Record<string, string> = { name: "Имя", company: "Компания", email: "Email", phone: "Телефон", telegram: "Telegram", topic: "Направление", message: "Задача", source: "Источник", sourcePage: "Страница", expertHint: "Подсказка по эксперту", assignedTo: "Предварительный ответственный", preferredContact: "Способ связи", productionSize: "Масштаб производства" };
  const lines = ["*Новая заявка с сайта*", ""];
  for (const [key, label] of Object.entries(labels)) { if (lead[key]) lines.push(`*${label}:* ${String(lead[key])}`); }
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chatId, text: lines.join("\n"), parse_mode: "Markdown" }) });
    if (!response.ok) console.error("Telegram API:", response.status, await response.text());
  } catch (error) { console.error("Ошибка отправки в Telegram:", error); }
}

const directions = ["service", "production", "joint", "unsure"] as const;
type Direction = typeof directions[number];
const attempts = new Map<string, number[]>();
const text = (value: unknown, max = 5000) => typeof value === "string" ? value.trim().slice(0, max) : "";
const limited = (request: NextRequest) => {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now(); const recent = (attempts.get(ip) || []).filter((time) => now - time < 600_000);
  recent.push(now); attempts.set(ip, recent); return recent.length > 5;
};
export async function POST(request: NextRequest) {
  try {
    if (limited(request)) return NextResponse.json({ error: "Слишком много отправок. Попробуйте позже." }, { status: 429 });
    const body = await request.json() as Record<string, unknown>;
    if (text(body.website, 200)) return NextResponse.json({ ok: true });
    const name = text(body.name, 200); const task = text(body.task ?? body.message);
    const company = text(body.company, 300); const email = text(body.email, 320).toLowerCase();
    const phone = text(body.phone, 100); const telegram = text(body.telegram, 200);
    const direction = directions.includes(body.direction as Direction) ? body.direction as Direction : "unsure";
    const isUnifiedForm = body.task !== undefined;
    if (name.length < 2 || name.length > 100) return NextResponse.json({ error: "Укажите имя: от 2 до 100 символов." }, { status: 400 });
    if (company.length > 200) return NextResponse.json({ error: "Название предприятия должно быть не длиннее 200 символов." }, { status: 400 });
    if (isUnifiedForm && (task.length < 10 || task.length > 5000)) return NextResponse.json({ error: "Опишите задачу: от 10 до 5000 символов." }, { status: 400 });
    const validEmail = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneDigits = phone.replace(/\D/g, ""); const validPhone = !phone || (phoneDigits.length >= 10 && phoneDigits.length <= 15);
    if (!validEmail || !validPhone || (!email && !phone && !telegram)) return NextResponse.json({ error: "Укажите телефон или корректный email." }, { status: 400 });
    if (isUnifiedForm && body.consentAccepted !== true) return NextResponse.json({ error: "Для отправки необходимо согласие на обработку персональных данных." }, { status: 400 });
    const submissionKey = text(body.submissionKey, 100) || null;
    if (submissionKey) { const existing = await prisma.lead.findUnique({ where: { submissionKey } }); if (existing) return NextResponse.json({ ok: true, id: existing.id, duplicate: true }); }
    const assignedTo = direction === "production" ? "Игорь Северов" : direction === "service" ? "Роман Бардин-Денисов" : null;
    const lead = await prisma.lead.create({ data: {
      name, company: company || null, position: text(body.position, 200) || null, email: email || null, phone: phone || null, telegram: telegram || null,
      message: task || null, topic: text(body.topic, 200) || direction, source: text(body.source, 200) || "website", helpFormat: text(body.helpFormat, 200) || null,
      preferredContact: text(body.preferredContact, 50) || null, sourcePage: text(body.sourcePath ?? body.sourcePage, 500) || null, sourceTool: text(body.sourceTool, 200) || null,
      utmSource: text(body.utmSource, 200) || null, utmMedium: text(body.utmMedium, 200) || null, utmCampaign: text(body.utmCampaign, 200) || null,
      consentVersion: text(body.consentVersion, 100) || null, consentAccepted: body.consentAccepted === true || Boolean(body.consentVersion), newsletterConsent: body.newsletterConsent === true,
      analysisAttached: body.analysisAttached === true, analysisLink: body.analysisAttached === true ? text(body.analysisLink, 1000) || null : null,
      direction, offerCode: text(body.offerCode, 100) || null, productionSize: text(body.productionSize, 100) || null, formId: text(body.formId, 100) || null,
      expertHint: text(body.expertHint, 100) || null, assignedTo, submissionKey, status: "new",
    } });
    void sendTelegramNotification(lead).catch((error) => console.error("Асинхронная отправка в Telegram не удалась:", error));
    void sendLeadEmail(lead).catch((error) => console.error("Асинхронная отправка email не удалась:", error));
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Ошибка приёма заявки:", error);
    return NextResponse.json({ error: "Не удалось подтвердить сохранение заявки. Попробуйте ещё раз или воспользуйтесь контактами на странице “Контакты”." }, { status: 500 });
  }
}
