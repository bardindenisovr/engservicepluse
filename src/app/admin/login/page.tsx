"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Не удалось войти");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Ошибка соединения");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--electric-blue)]/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[var(--electric-blue)]" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Вход в админ-панель</h1>
              <p className="text-xs text-gray-500">Сервис в плюс</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--background)] text-white focus:border-[var(--electric-blue)]/50 outline-none"
                placeholder="Введите пароль администратора"
              />
            </div>

            {error && <p className="text-sm text-[var(--warm-accent)]">{error}</p>}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-all"
            >
              {loading ? "Проверка..." : "Войти"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}