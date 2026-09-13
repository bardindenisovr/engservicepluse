import About from "@/components/About";

export const metadata = {
  title: "Об эксперте",
  description:
    "Роман — руководитель и архитектор сервисных систем. Практический опыт управления сервисными подразделениями.",
};

export default function AboutPage() {
  return (
    <div className="relative z-10">
      <About />
    </div>
  );
}