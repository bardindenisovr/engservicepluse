import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth'; // если используете auth
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // путь к настройкам

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Проверка прав администратора
    const session = await getServerSession(/* authOptions */);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Доступ запрещён' }, { status: 401 });
    }

    // 2. Валидация ID
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Неверный ID статьи' }, { status: 400 });
    }

    // 3. Удаление из БД
    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка удаления статьи:', error);
    return NextResponse.json(
      { error: 'Не удалось удалить статью' },
      { status: 500 }
    );
  }
}