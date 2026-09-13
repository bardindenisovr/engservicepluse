import SystemModel from "@/components/SystemModel";
import Results from "@/components/Results";

export const metadata = {
  title: "Методология",
  description:
    "Авторский подход: сервис как система. Взаимосвязь процессов, людей, данных и экономики.",
};

export default function MethodologyPage() {
  return (
    <div className="relative z-10">
      <SystemModel />
      <Results />
    </div>
  );
}