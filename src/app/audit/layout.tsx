import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: { canonical: "/audit" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/audit",
    title: "Аудит сервисной системы",
    description:
      "Независимая оценка того, как устроен сервис сейчас, где система теряет время, деньги и качество, и какие изменения дадут наибольший эффект.",
  },
};

export default function AuditLayout({ children }: { children: ReactNode }) {
  return children;
}
