import About from "@/components/About";
import AuthorIdentity from "@/components/AuthorIdentity";

export const metadata = {
  title: "Об эксперте",
  description:
    "Роман Бардин-Денисов — руководитель и архитектор сервисных систем, член Ассоциации ЕАМ (Ассоциации эффективного управления производственными активами). ORCID: 0009-0003-8458-8787.",
};

export default function AboutPage() {
  return (
    <div className="relative z-10">
      <About />
      <div className="max-w-7xl mx-auto px-6"><AuthorIdentity expert /></div>
    </div>
  );
}
