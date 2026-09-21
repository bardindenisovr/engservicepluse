'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteArticleButton({ articleId }: { articleId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Вы уверены, что хотите удалить эту статью?')) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Ошибка удаления');
      }

      router.refresh(); // обновить список статей на странице
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-800 disabled:opacity-50 ml-2"
    >
      {isDeleting ? 'Удаление...' : 'Удалить'}
    </button>
  );
}