import Cases from "@/components/Cases";

export const metadata = {
  title: "Кейсы",
  description:
    "Практические разборы реальных ситуаций: диспетчеризация, партнерская сеть, гарантия, управление ЗИП.",
};

export default function CasesPage() {
  return (
    <div className="relative z-10">
      <Cases />
    </div>
  );
}