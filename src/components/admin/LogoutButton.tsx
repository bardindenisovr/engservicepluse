"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--warm-accent)]/40 text-gray-400 hover:text-[var(--warm-accent)] text-sm transition-colors"
    >
      <LogOut className="w-4 h-4" />
      {loading ? "Выход..." : "Выйти"}
    </button>
  );
}