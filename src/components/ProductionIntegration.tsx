import Link from "next/link";

export const productionOffers = [
  {
    id: "diagnostics",
    title: "Разобрать производственную проблему",
    text: "Если производство не выполняет план, оборудование простаивает или дефекты повторяются, начинаем с конкретных отклонений. Разбираем факты, ищем первопричины и работаем с ними, определяем недостающие данные и возможные контрмеры.",
    result: "Описание проблемы, проверенные причины либо план их проверки, приоритетные действия и критерии оценки.",
    cta: "Разобрать проблему",
  },
  {
    id: "management",
    title: "Выстроить производственное управление",
    text: "Определяем, кто планирует работу, кто фиксирует выпуск, простои и брак, кто анализирует отклонения и принимает решения. Разрабатываем формы учёта, показатели, распределение ответственности и порядок производственных совещаний.",
    result: "Описание процесса управления, рабочие формы и правила действий при отклонениях. Автоматизацию и интеграцию с учётными системами оцениваем отдельно.",
    cta: "Обсудить систему управления",
  },
  {
    id: "lean",
    title: "Найти потери и улучшить работу участка",
    text: "Разбираем поток работ, ожидание, перемещения, незавершённое производство и узкие места. Подбираем инструменты под задачу: картирование потока создания ценности, 5S, визуальное управление, стандартизированную работу, PDCA и анализ первопричин.",
    result: "Карта текущего состояния, приоритеты изменений и план пилота с показателями проверки. Не начинаем с внедрения всех инструментов одновременно.",
    cta: "Обсудить улучшение участка",
  },
  {
    id: "quality",
    title: "Организовать работу с качеством и несоответствиями",
    text: "Помогаю описать процессы, ответственность и показатели, выстроить работу с несоответствиями, рисками и корректирующими действиями. При необходимости разрабатываем элементы системы менеджмента качества на основе требований ISO 9001:2015 и готовим систему к внутренним и внешним аудитам.",
    result: "Необходимые процедуры и формы, цели в области качества, порядок разбора несоответствий и план корректирующих действий.",
    cta: "Обсудить задачу по качеству",
  },
  {
    id: "training",
    title: "Обучить руководителей и закрепить рабочие стандарты",
    text: "Помогаю мастерам и руководителям разрабатывать и применять показатели, анализировать проблемы, проводить производственные совещания и организовывать улучшения. Разрабатываем инструкции, стандарты, чек-листы и порядок обучения на рабочих местах.",
    result: "Материалы и рабочие инструменты по выбранной теме, порядок применения и проверки освоения. Систему мотивации обсуждаем после проверки достоверности учёта и влияния сотрудников на показатели.",
    cta: "Обсудить обучение и стандарты",
  },
];

const card = "rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/45 p-6";
const button = "inline-flex min-h-12 items-center justify-center rounded-lg bg-[var(--electric-blue)] px-5 py-3 text-sm font-medium text-white hover:bg-[var(--electric-blue)]/90";

export function DirectionChoice() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="mb-4 text-3xl font-bold text-white">Два направления — один принцип работы</h2>
      <p className="mb-8 max-w-4xl leading-relaxed text-gray-300">Сначала разбираем конкретную задачу и проверяем данные. Затем определяем причины и согласуем изменения, необходимые для результата.</p>
      <div className="grid gap-6 md:grid-cols-2">
        <article className={card}>
          <h3 className="mb-4 text-2xl font-semibold text-white">Инженерный сервис и ТОиР</h3>
          <p className="mb-6 leading-relaxed text-gray-300">Для задач сервисной службы и ТОиР: заявки, выполнение работ, обслуживание оборудования, запчасти, учёт, показатели и ответственность.</p>
          <div className="flex flex-col items-start gap-3 text-sm"><Link className="text-[var(--electric-blue)] hover:underline" href="/audit">Аудит сервисной системы →</Link><Link className="text-[var(--electric-blue)] hover:underline" href="/ekspress-diagnostika">Экспресс-диагностика сервиса →</Link><Link className="text-[var(--electric-blue)] hover:underline" href="/services#service">Услуги сервиса →</Link></div>
        </article>
        <article className={card}>
          <h3 className="mb-4 text-2xl font-semibold text-white">Организация производства</h3>
          <p className="mb-4 leading-relaxed text-gray-300">Для задач производственной системы: простои, брак, потери, срывы плана, учёт, ответственность и ежедневное управление.</p>
          <Link className={button} href="/production">Разобрать производственную задачу</Link>
          <p className="mt-5 text-sm leading-relaxed text-gray-400">Диагностика, управление, потери, качество и обучение — на странице направления.</p>
        </article>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <article className={card}><h3 className="mb-4 text-xl font-semibold text-white">Для руководителей, которым нужен разбор причин</h3><p className="text-sm leading-relaxed text-gray-300">Собственники и директора предприятий, руководители производства, главные инженеры, руководители сервиса, ТОиР и качества. Если ситуация не укладывается в одно направление, начинаем с общего описания задачи.</p></article>
        <article className={card}><h3 className="mb-4 text-xl font-semibold text-white">Когда проблема на стыке подразделений</h3><p className="mb-5 text-sm leading-relaxed text-gray-400">Причина рекламаций теряется между производством, качеством и сервисом? Определим, какие данные нужны и кого подключить к разбору.</p><Link className="text-[var(--electric-blue)] hover:underline" href="/contacts?direction=joint">Обсудить совместную задачу →</Link></article>
      </div>
    </section>
  );
}

export function ProductionOffers() {
  return (
    <div className="grid gap-6">
      {productionOffers.map((offer, index) => (
        <article id={offer.id} key={offer.id} className={`${card} scroll-mt-24`}>
          <p className="mb-2 text-xs text-[var(--teal-accent)]">0{index + 1}</p>
          <h3 className="mb-4 text-2xl font-semibold text-white">{offer.title}</h3>
          <p className="mb-4 leading-relaxed text-gray-300">{offer.text}</p>
          <p className="mb-6 text-sm leading-relaxed text-gray-400"><strong className="text-gray-200">Результат согласованной работы: </strong>{offer.result}</p>
          <Link href={`/contacts?direction=production&offerCode=${offer.id}`} className={button}>{offer.cta}</Link>
        </article>
      ))}
    </div>
  );
}

export function ExpertsTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 p-8">
        <h2 className="mb-4 text-3xl font-bold text-white">Эксперты по своей задаче</h2>
        <p className="max-w-4xl leading-relaxed text-gray-300">Роман отвечает за инженерный сервис и ТОиР. Игорь Северов — за организацию производства, производственные показатели, потери и управление качеством. Если задача затрагивает несколько подразделений, согласуем совместный формат.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/experts" className={button}>Эксперты проекта</Link>
          <Link href="/contacts?direction=unsure" className="inline-flex min-h-12 items-center rounded-lg border border-[var(--border-subtle)] px-5 py-3 text-sm text-gray-200 hover:bg-[var(--graphite)]">Обсудить задачу</Link>
        </div>
      </div>
    </section>
  );
}

export function FooterDirections() {
  return (
    <div className="mx-auto max-w-7xl border-b border-[var(--border-subtle)] px-6 py-8">
      <p className="max-w-5xl text-sm leading-relaxed text-gray-400">Сервис в Плюс — инженерный сервис, ТОиР и организация производства. Профильные задачи ведут эксперты соответствующих направлений. Для межфункциональных задач состав команды определяется после первичного обсуждения.</p>
      <nav aria-label="Направления и эксперты" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <Link className="text-gray-300 hover:text-white" href="/production">Организация производства</Link>
        <Link className="text-gray-300 hover:text-white" href="/severov">Игорь Северов</Link>
        <Link className="text-gray-300 hover:text-white" href="/experts">Эксперты</Link>
      </nav>
    </div>
  );
}
