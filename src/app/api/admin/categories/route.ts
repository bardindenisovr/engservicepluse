import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
  });

  return NextResponse.json({ categories });
}