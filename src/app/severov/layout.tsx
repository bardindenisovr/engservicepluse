import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const url = 'https://serviceinplus.ru/severov';

export const metadata: Metadata = {
  twitter: {
    card: 'summary',
    title: 'Игорь Северов — производство без хаоса',
    description: 'Аудит производственных процессов, Lean, запуск производства и обучение руководителей. 17 лет практического опыта.',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${url}#person`,
      name: 'Игорь Северов',
      url,
      sameAs: ['https://tenchat.ru/1858784'],
      description: 'Эксперт по производственным системам с 17-летним опытом в производстве.',
      knowsAbout: [
        'Бережливое производство',
        'Аудит производственных процессов',
        'Запуск производства',
        '5S',
        'SMED',
        'Производственное планирование',
        'ISO 9001',
        'Обучение линейных руководителей',
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: 'Игорь Северов — развитие производства',
      inLanguage: 'ru-RU',
      mainEntity: { '@id': `${url}#person` },
      breadcrumb: { '@id': `${url}#breadcrumbs` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Сервис в плюсе', item: 'https://serviceinplus.ru/' },
        { '@type': 'ListItem', position: 2, name: 'Игорь Северов', item: url },
      ],
    },
  ],
};

export default function SeverovLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      {children}
    </>
  );
}
