import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs, { BREADCRUMB_TOOLS } from '../../../components/Breadcrumbs';
import FiveWhy from './FiveWhy';

export const metadata: Metadata = {
  title: '«5 почему» онлайн с обратной проверкой причин',
  description:
    'Постройте цепочку причин и проверьте её обратным ходом «поэтому». Подготовьте план действий. Без регистрации.',
};

const h2: React.CSSProperties = { fontSize: 28, margin: '48px 0 16px' };
const p: React.CSSProperties = { marginBottom: 16, lineHeight: 1.7 };
const li: React.CSSProperties = { marginBottom: 8, lineHeight: 1.6 };

export default function Tool5WhyPage() {
  return (
    <main>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px 80px' }}>
        <Breadcrumbs items={[...BREADCRUMB_TOOLS, { label: '«5 почему»' }]} />

        <h1 style={{ fontSize: 42, lineHeight: 1.15, margin: '0 0 24px' }}>
          «5 почему» онлайн: проверьте цепочку причин, а не ищите виноватого
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.6, marginBottom: 32 }}>
          Опишите событие, постройте цепочку причин и проверьте её обратным ходом
          «поэтому». На выходе вы получите предполагаемую корневую причину, план
          действий и критерии проверки результата.
        </p>

        <FiveWhy />

        <h2 style={h2}>Когда использовать</h2>
        <ul>
          <li style={li}>повторный выезд специалиста;</li>
          <li style={li}>задержка ремонта;</li>
          <li style={li}>ожидание запасных частей;</li>
          <li style={li}>рекламация;</li>
          <li style={li}>сбой передачи заявки между подразделениями.</li>
        </ul>

        <h2 style={h2}>Границы метода</h2>
        <p style={p}>
          Логически связная цепочка остаётся гипотезой, пока она не подтверждена
          данными. Метод не заменяет диагностику оборудования.
        </p>

        <h2 style={h2}>Вопросы</h2>
        <p style={p}>
          <strong>Нужно ли ровно пять «почему»?</strong>
          <br />
          Нет, пять — ориентир: остановитесь раньше или продолжите, если нужно.
        </p>
        <p style={p}>
          <strong>Нужна ли регистрация?</strong>
          <br />
          Начать можно без неё, вход нужен для сохранения и возврата с другого
          устройства.
        </p>
        <p style={p}>
          <strong>Увидит ли мои данные эксперт?</strong>
          <br />
          Нет, только если вы сами приложите анализ к заявке.
        </p>

        <p style={{ marginTop: 32 }}>
          <Link href="/tools" style={{ color: '#4a6fa5' }}>
            ← Все инструменты
          </Link>
        </p>
      </div>
    </main>
  );
}
