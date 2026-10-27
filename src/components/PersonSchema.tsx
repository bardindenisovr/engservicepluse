import { expert } from "@/lib/expert";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `https://serviceinplus.ru${expert.aboutPath}#person`,
  name: expert.name,
  telephone: expert.phone,
  jobTitle: "Эксперт по архитектуре инженерного сервиса",
  url: `https://serviceinplus.ru${expert.aboutPath}`,
  sameAs: [
    "https://www.wikidata.org/wiki/Q141447315",
    expert.telegramUrl,
    "https://t.me/engserviceplus",
    "https://tenchat.ru/bardin-denisov",
    "https://www.linkedin.com/in/bardindenisov/",
    "https://max.ru/channel_ServiceInPlus",
  ],
  knowsAbout: [
    "построение сервисной службы", "аудит сервисных процессов", "SLA",
    "RCA", "экономика сервиса", "управление запчастями", "ТОиР",
    "MTBF", "MTTR", "нормо-час",
  ],
};

export default function PersonSchema() {
  return (
    <script
      id="person-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
