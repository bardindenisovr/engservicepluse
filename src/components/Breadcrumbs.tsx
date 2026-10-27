import Link from 'next/link';

export type Crumb = { label: string; href?: string };

export const BREADCRUMB_TOOLS: Crumb[] = [
  { label: 'Главная', href: '/' },
  { label: 'Инструменты', href: '/tools' },
];

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
      .filter((c) => c.href)
      .concat([{ label: items[items.length - 1].label }])
      .filter((c, i, arr) => arr.findIndex((x) => x.label === c.label) === i)
      .map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.label,
        ...(c.href ? { item: `https://serviceinplus.ru${c.href}` } : {}),
      })),
  };

  return (
    <nav aria-label="Хлебные крошки" style={{ marginBottom: 24, fontSize: 14 }}>
      <ol
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {c.href && !isLast ? (
                <Link href={c.href} style={{ color: '#4a6fa5', textDecoration: 'none' }}>
                  {c.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined}>{c.label}</span>
              )}
              {!isLast && <span aria-hidden="true">›</span>}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
