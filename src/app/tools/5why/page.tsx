import type { Metadata } from "next";
import FiveWhy from "./FiveWhy";

export const metadata: Metadata = {
  title: "5 почему — анализ причин",
  description: "Разберите проблему методом 5 почему, проверьте причинные связи и составьте план действий.",
  alternates: { canonical: "https://serviceinplus.ru/tools/5why" },
};

export default function Page() { return <FiveWhy />; }
