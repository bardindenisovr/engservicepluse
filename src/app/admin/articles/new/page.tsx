import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import ArticleForm from "@/components/admin/ArticleForm";

export default async function NewArticlePage() {
  const authed = await isAuthenticated();
  if (!authed) redirect("/admin/login");

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-white mb-2">Новая статья</h1>
      <p className="text-sm text-gray-500 mb-8">
        Создайте материал для базы знаний
      </p>
      <ArticleForm />
    </div>
  );
}