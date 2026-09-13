import Services from "@/components/Services";
import ForEmployers from "@/components/ForEmployers";

export const metadata = {
  title: "Чем могу помочь",
  description:
    "Аудит сервисной системы, проектирование сервисной модели, SLA и KPI, гарантия, сервисная сеть, ЗИП, экономика сервиса, сервис ЦОД.",
};

export default function ServicesPage() {
  return (
    <div className="relative z-10">
      <Services />
      <ForEmployers />
    </div>
  );
}