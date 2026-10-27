import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs, { BREADCRUMB_TOOLS } from '../../../components/Breadcrumbs';
import DiscussTaskForm from '../../../components/tools/DiscussTaskForm';

export const metadata: Metadata = {
  title: 'А3 онлайн: решение проблем по методике А3',
  description:
    'Заполните лист А3 онлайн: проблема, текущее состояние, цель, причины, меры и проверка результата. Без регистрации.',
  alternates: { canonical: '/tools/a3' },
};

const h2: React.CSSProperties = { fontSize: 28, margin: '48px 0 16px', color: '#f1f5f9' };
const p: React.CSSProperties = { marginBottom: 16, lineHeight: 1.7, color: '#cbd5e1' };
const li: React.CSSProperties = { marginBottom: 8, lineHeight: 1.6, color: '#cbd5e1' };
const box: React.CSSProperties = {
  background: '#131824',
  border: '1px solid rgba(56, 189, 248, 0.25)',
  borderRadius: 16,
  padding: 24,
  margin: '40px 0',
};
const btn: React.CSSProperties = {
  display: 'inline-block',
  background: '#38bdf8',
  color: '#0c0f16',
  padding: '14px 28px',
  borderRadius: 8,
  fontWeight: 600,
  textDecoration: 'none',
};

export default function ToolA3Page() {
  return (
    <main style={{ background: '#0c0f16', color: '#cbd5e1' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px 80px' }}>
        <Breadcrumbs
          items={[...BREADCRUMB_TOOLS, { label: 'Решение проблем по методике А3' }]}
        />

        <h1 style={{ fontSize: 42, lineHeight: 1.15, margin: '0 0 24px', color: '#f1f5f9' }}>
          Решение проблем по методике А3: весь разбор на одном листе
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.6, marginBottom: 32, color: '#cbd5e1' }}>
          Метод А3 из практики бережливого производства помогает изложить проблему,
          анализ и план улучшений на одном листе. Заполните его онлайн, согласуйте с
          командой и руководством и отслеживайте результат.
        </p>

        <h2 style={h2}>Что такое А3</h2>
        <p style={p}>
          Название происходит от формата листа бумаги, на котором помещается весь
          разбор. Лист показывает логику от проблемы к результату и позволяет
          обсуждать решение по одному и тому же документу.
        </p>

        <h2 style={h2}>Когда использовать</h2>
        <ul>
          <li style={li}>нужно улучшить процесс сервиса или ТОиР;</li>
          <li style={li}>нужно согласовать решение между подразделениями;</li>
          <li style={li}>нужно показать руководству обоснование изменений;</li>
          <li style={li}>нужно обучить команду структурному мышлению.</li>
        </ul>

        <h2 style={h2}>Разделы листа</h2>
        <ol>
          <li style={li}>название и ответственный;</li>
          <li style={li}>предпосылки и значимость проблемы;</li>
          <li style={li}>текущее состояние (факты и показатели);</li>
          <li style={li}>целевое состояние;</li>
          <li style={li}>
            анализ причин (можно перенести из «5 почему» или диаграммы Исикавы);
          </li>
          <li style={li}>контрмеры;</li>
          <li style={li}>план внедрения с ответственными и сроками;</li>
          <li style={li}>проверка результата и дальнейшие шаги.</li>
        </ol>

        <h2 style={h2}>Как это работает</h2>
        <p style={p}>
          Заполняйте разделы по порядку слева направо. Приложение подсказывает, чего
          не хватает: целевого показателя, подтверждения причины, ответственного или
          срока. Подсказки не блокируют сохранение.
        </p>

        <h2 style={h2}>Что вы получите</h2>
        <p style={p}>
          Готовый лист А3 для печати и обсуждения, список действий и поле для
          результатов проверки.
        </p>

        <h2 style={h2}>Границы метода</h2>
        <p style={p}>
          А3 — способ организации мышления и коммуникации, а не гарантия результата.
          Качество зависит от фактов, на которых он построен.
        </p>

        <div style={box}>
          <h2 style={{ fontSize: 24, margin: '0 0 12px', color: '#f1f5f9' }}>
            Хотите, чтобы лист А3 стал рабочим инструментом команды?
          </h2>
          <p style={p}>
            Обсудите задачу или формат практикума с Романом Бардин-Денисовым.
          </p>
          <DiscussTaskForm sourceTool="a3" sourcePage="/tools/a3" buttonStyle={btn} />
        </div>

        <h2 style={h2}>Вопросы</h2>
        <p style={p}>
          <strong style={{ color: '#f1f5f9' }}>Чем А3 отличается от 8D?</strong>
          <br />
          А3 ориентирован на улучшение и согласование решения, 8D — на реагирование на
          конкретный случай и взаимодействие с заказчиком.
        </p>
        <p style={p}>
          <strong style={{ color: '#f1f5f9' }}>Нужны ли специальные знания?</strong>
          <br />
          Нет, подсказки внутри разделов объясняют, что писать.
        </p>

        <p style={{ marginTop: 32 }}>
          <Link href="/tools" style={{ color: '#7dd3fc' }}>
            ← Все инструменты
          </Link>
        </p>
      </div>
    </main>
  );
}
