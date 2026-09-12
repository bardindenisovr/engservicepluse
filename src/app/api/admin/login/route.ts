import { NextResponse } from "next/server";
import { checkPassword, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = typeof body.password === "string" ? body.password : "";

    if (!checkPassword(password)) {
      return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
    }

    await setSessionCookie();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Ошибка входа:", error);
    return NextResponse.json({ error: "Ошибка авторизации" }, { status: 500 });
  }
}