export const AUTHOR_ORCID = "https://orcid.org/0009-0003-8458-8787";

export default function AuthorIdentity({ expert = false }: { expert?: boolean }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://serviceinplus.ru/about#person",
    name: "Роман Николаевич Бардин-Денисов",
    url: "https://serviceinplus.ru/about",
    sameAs: [AUTHOR_ORCID],
    memberOf: {
      "@type": "Organization",
      name: "Ассоциация ЕАМ (Ассоциация эффективного управления производственными активами)",
      url: "https://eam.su/uchastniki-i-partnery",
    },
  };
  return (
    <aside aria-label="Об авторе" className="my-8 rounded-xl border border-[var(--border-subtle)] p-6 text-sm text-gray-300 space-y-3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      <p>Автор: <a href="/about" className="text-[var(--electric-blue)] hover:underline">Роман Бардин-Денисов</a></p>
      <p><a href={AUTHOR_ORCID} target="_blank" rel="noopener noreferrer" className="text-[var(--electric-blue)] hover:underline">ORCID: 0009-0003-8458-8787</a></p>
      {expert && <p>Член <a href="https://eam.su/uchastniki-i-partnery" target="_blank" rel="noopener noreferrer" className="text-[var(--electric-blue)] hover:underline">Ассоциации ЕАМ</a> (Ассоциации эффективного управления производственными активами).</p>}
    </aside>
  );
}
