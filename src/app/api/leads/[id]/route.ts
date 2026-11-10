import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

const ALLOWED_STATUSES = ["new", "accepted", "processed"] as const;
type AllowedStatus = (typeof ALLOWED_STATUSES)[number];

const STATUS_LABELS: Record<string, string> = {
  new: "Новая",
  accepted: "Принято",
  processed: "Отработано",
};

function isAllowedStatus(value: unknown): value is AllowedStatus {
  return (
    typeof value === "string" &&
    (ALLOWED_STATUSES as readonly string[]).includes(value)
  );
}

// GET /api/leads/:id — получить заявку (для админки)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json(
      { error: "Некорректный идентификатор заявки" },
      { status: 400 }
    );
  }

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) {
    return NextResponse.json({ error: "Заявка не найдена" }, { status: 404 });
  }

  return NextResponse.json({
    ...lead,
    statusLabel: STATUS_LABELS[lead.status] ?? lead.status,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
  });
}

// PATCH /api/leads/:id — сменить статус заявки
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json(
      { error: "Некорректный идентификатор заявки" },
      { status: 400 }
    );
  }

  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Некорректное тело запроса" },
      { status: 400 }
    );
  }

  let nextStatus: string | undefined =
    typeof body.status === "string" ? body.status : undefined;

  if (!nextStatus && typeof body.statusLabel === "string") {
    const match = (Object.keys(STATUS_LABELS) as string[]).find(
      (key) => STATUS_LABELS[key] === body.statusLabel
    );
    nextStatus = match;
  }

  if (!nextStatus || !isAllowedStatus(nextStatus)) {
    return NextResponse.json(
      { error: "Недопустимый статус. Допустимы: new, accepted, processed" },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.lead.update({
      where: { id },
      data: { status: nextStatus },
      select: { id: true, status: true, updatedAt: true },
    });

    return NextResponse.json({
      ok: true,
      id: updated.id,
      status: updated.status,
      statusLabel: STATUS_LABELS[updated.status] ?? updated.status,
      updatedAt: updated.updatedAt.toISOString(),
    });
  } catch (error: any) {
    if (error?.code === "P2025") {
      return NextResponse.json(
        { error: "Заявка не найдена" },
        { status: 404 }
      );
    }
    console.error("Ошибка обновления статуса:", error);
    return NextResponse.json(
      { error: "Не удалось обновить статус" },
      { status: 500 }
    );
  }
}
