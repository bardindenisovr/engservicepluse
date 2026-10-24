import type { Metadata } from "next";
import AuditSection from "@/components/AuditSection";

export const metadata: Metadata = {
  title: "Аудит сервисной системы",
  description:
    "Аудит сервисной системы: причины потерь и план изменений. Для производителей и поставщиков оборудования, предприятий с действующей сервисной службой и подразделений ТОиР. Проверим согласованный контур обслуживания и подготовим обоснованные приоритеты, а не общий список рекомендаций. Ориентировочно 2–4 недели, от 120 000 ₽.",
  alternates: {
    canonical: "https://serviceinplus.ru/audit",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://serviceinplus.ru/audit",
    siteName: "Сервис в плюс",
    title: "Аудит сервисной системы",
    description:
      "Поймите, где сервис теряет управляемость и с чего начинать изменения. Сроки, состав работ, границы и приёмка — на странице.",
  },
  twitter: {
    card: "summary",
    title: "Аудит сервисной системы",
    description:
      "Поймите, где сервис теряет управляемость и с чего начинать изменения.",
  },
};

export default function AuditPage() {
  return <AuditSection showHeader={true} variant="full" />;
}
