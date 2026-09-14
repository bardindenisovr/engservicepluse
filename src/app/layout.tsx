import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: BASE_URL,
    siteName: "Сервис в плюс",
    title: "Сервис в плюс | Архитектура инженерного сервиса",
    description:
      "Аудит и развитие сервисных подразделений производителей промышленного и инженерного оборудования.",
  },
  robots: {
    index: true,
    follow: true,
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
        {/* Яндекс.Метрика — оригинальный код от Яндекса */}
        <Script
          id="yandex-metrica"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${METRICA_ID}', 'ym');

              ym(${METRICA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${METRICA_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}