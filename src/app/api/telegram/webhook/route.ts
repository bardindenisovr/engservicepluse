const secret = req.headers.get("x-telegram-bot-api-secret-token");
if (!secret || secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
  return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // ... ваша логика обработки вебхука ...
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });