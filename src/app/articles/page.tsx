import KnowledgeBase from "@/components/KnowledgeBase";

export const metadata = {
  title: "База знаний",
  description:
    "Практические материалы о сервисной архитектуре, SLA, гарантии, сервисных сетях, ЗИП, ТОиР и экономике сервиса.",
};

export default function ArticlesPage() {
  return <KnowledgeBase />;
}