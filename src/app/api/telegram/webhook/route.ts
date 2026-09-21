const secret = req.headers.get("x-telegram-bot-api-secret-token");
if (!secret || secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
  return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
}