import type { Metadata } from "next";
import About from "@/components/About";
import AuthorIdentity from "@/components/AuthorIdentity";

export const metadata: Metadata = {
  title: "Об эксперте",
  description:
    "Роман Бардин-Денисов — руководитель и архитектор сервисных систем, член Ассоциации ЕАМ (Ассоциации эффективного управления производственными активами). ORCID: 0009-0003-8458-8787.",
  alternates: {
    canonical: "https://serviceinplus.ru/about",
  },
  openGraph: {
    title: "Об эксперте | Сервис в плюс",
    description:
      "Роман Бардин-Денисов — руководитель и архитектор сервисных систем.",
    url: "https://serviceinplus.ru/about",
    siteName: "Сервис в плюс",
    locale: "ru_RU",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Об эксперте | Сервис в плюс",
    description:
      "Роман Бардин-Денисов — руководитель и архитектор сервисных систем.",
  },
};

export default function AboutPage() {
  return (
    <div className="relative z-10">
      <About />
      <div className="max-w-7xl mx-auto px-6"><AuthorIdentity expert /></div>
    </div>
  );
}
