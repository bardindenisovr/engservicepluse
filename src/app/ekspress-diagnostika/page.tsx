import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { findService } from "@/data/service-pages";

const service = findService("express");

export const metadata: Metadata = service?.meta ?? {};

export default function EkspressDiagnostikaPage() {
  if (!service) return null;
  return <ServicePageLayout service={service} />;
}
