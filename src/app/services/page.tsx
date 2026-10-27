import Services from "@/components/Services";
import ForEmployers from "@/components/ForEmployers";

export const metadata = {
  title: "Услуги по организации сервиса и ТОиР — Сервис в плюс",
  description:
    "Услуги по аудиту, организации и развитию инженерного сервиса: экспресс-диагностика, аудит сервисной системы, проектирование, SLA и KPI, гарантия и рекламации, партнёрская сеть, ЗИП, экономика сервиса, организация ТОиР, сопровождение внедрения.",
};

export default function ServicesPage() {
  return (
    <div className="relative z-10">
      <Services />
      <ForEmployers />
    </div>
  );
}
