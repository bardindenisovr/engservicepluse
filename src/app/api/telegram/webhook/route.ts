import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!expectedSecret) {
    console.error("TELEGRAM_WEBHOOK_SECRET is not configured");

    return NextResponse.json(
      { ok: false, error: "server_configuration_error" },
      { status: 500 }
    );
  }

  const secret = req.headers.get("x-telegram-bot-api-secret-token");

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body: unknown = await req.json();

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json(
        { ok: false, error: "invalid_payload" },
        { status: 400 }
      );
    }

    // Здесь необходимо реализовать обработку обновлений Telegram.
    // В исходном файле вместо неё был только комментарий.
    // Пока обработка не реализована, не подтверждаем получение обновления.
    return NextResponse.json(
      { ok: false, error: "webhook_handler_not_implemented" },
      { status: 501 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { ok: false, error: "invalid_json" },
        { status: 400 }
      );
    }

    console.error("Webhook error:", error);

    return NextResponse.json(
      { ok: false, error: "internal_server_error" },
      { status: 500 }
    );
  }
}