import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json({
      categories: categories.map((c) => c.name),
    });
  } catch (error) {
    console.error("Ошибка загрузки рубрик:", error);
    return NextResponse.json(
      { error: "Не удалось загрузить рубрики" },
      { status: 500 }
    );
  }
}