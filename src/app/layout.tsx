import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { YandexMetricaProvider } from "@artginzburg/next-ym";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serviceinplus.ru";
const METRICA_ID = 112550935;

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
      <body className="min-h-screen flex flex-col">
        <YandexMetricaProvider
          initParameters={{
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: "dataLayer",
            accurateTrackBounce: true,
            trackLinks: true,
          }}
        >
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </YandexMetricaProvider>
      </body>
    </html>
  );
}