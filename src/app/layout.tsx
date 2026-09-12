import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serviceinplus.ru";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Сервис в плюс | Архитектура инженерного сервиса",
    template: "%s | Сервис в плюс",
  },
  description:
    "Помогаю производителям промышленного и инженерного оборудования превращать сервис из набора аварийных выездов в управляемую систему надежности и прибыли.",
  keywords: [
    "сервисная система",
    "аудит сервиса",
    "SLA",
    "KPI",
    "гарантия",
    "рекламации",
    "ЗИП",
    "сервисная сеть",
    "ЦОД",
    "инженерная инфраструктура",
    "технический сервис",
    "эксплуатация оборудования",
    "ТОиР",
  ],
  authors: [{ name: "Роман" }],
  creator: "Сервис в плюс",
  publisher: "Сервис в плюс",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: BASE_URL,
    siteName: "Сервис в плюс",
    title: "Сервис в плюс | Архитектура инженерного сервиса",
    description:
      "Аудит и развитие сервисных подразделений производителей промышленного и инженерного оборудования.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Сервис в плюс | Архитектура инженерного сервиса",
    description:
      "Превращаю технический сервис в управляемую систему надежности и прибыли.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Сервис в плюс",
              description:
                "Аудит и развитие сервисных систем производителей промышленного и инженерного оборудования",
              url: BASE_URL,
              areaServed: "RU",
              serviceType: [
                "Аудит сервисной системы",
                "Проектирование сервисной модели",
                "SLA и KPI",
                "Гарантия и рекламации",
                "Сервисная партнерская сеть",
                "Управление ЗИП",
                "Экономика сервиса",
                "Сервис инженерной инфраструктуры ЦОД",
              ],
              founder: {
                "@type": "Person",
                name: "Роман",
                jobTitle: "Руководитель и архитектор сервисных систем",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}