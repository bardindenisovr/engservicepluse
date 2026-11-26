import type { Metadata } from "next";
import Services from "@/components/Services";
import { DirectionChoice, ProductionOffers } from "@/components/ProductionIntegration";

export const metadata: Metadata = { title: "Услуги сервиса и организации производства | Сервис в Плюс", description: "Услуги по инженерному сервису, ТОиР и организации производства: выберите направление или опишите совместную задачу.", alternates: { canonical: "/services" } };
export default function ServicesPage() {
  return <main className="pt-20"><DirectionChoice /><section id="service" className="scroll-mt-24"><Services /></section><section className="mx-auto max-w-7xl px-6 py-16"><p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--teal-accent)]">Игорь Северов · эксперт-партнёр</p><h2 className="mb-8 text-3xl font-bold text-white">Организация производства</h2><ProductionOffers /></section></main>;
}
