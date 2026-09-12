import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    console.error("Ошибка приёма заявки:", error);
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Попробуйте позже." },
      { status: 500 }
    );
  }
}