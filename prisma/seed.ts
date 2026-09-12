import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const categories = [
  { slug: "architecture", name: "Архитектура сервиса", order: 1 },
  { slug: "sla", name: "SLA на практике", order: 2 },
  { slug: "economics", name: "Экономика сервиса", order: 3 },
  { slug: "warranty", name: "Гарантия без убытков", order: 4 },
  { slug: "network", name: "Сервисная сеть", order: 5 },
  { slug: "datacenter", name: "Сервис ЦОД", order: 6 },
  { slug: "tools", name: "Инструменты руководителя", order: 7 },
  { slug: "practice", name: "Практика руководителя", order: 8 },
  { slug: "maintenance", name: "ТОиР и надежность", order: 9 },
  { slug: "crm", name: "CRM и аналитика", order: 10 },
];

const articles = [
  {
    slug: "sla-ne-nachinaetsya-s-dogovora",
    title: "SLA не начинается с договора",
    excerpt:
      "Почему обязательства по времени реакции и восстановлению нельзя продавать без готовности операционной системы.",
    body: "<h3>Обязательство — это следствие, а не причина</h3><p>SLA часто воспринимается как коммерческий документ: в нём фиксируют время реакции, время восстановления и штрафы. Но если операционная система сервиса не готова эти обязательства выполнять, документ превращается в источник конфликтов.</p><p>Настоящий SLA начинается с ответа на вопросы: кто принимает заявку, как она классифицируется, кто и в какие сроки реагирует, какие запасные части доступны, как работает эскалация. Только после этого имеет смысл фиксировать цифры в договоре.</p>",
    source: "tenchat",
    categorySlug: "sla",
    tagSlugs: ["sla", "vremya-reakcii", "servisnyy-kontrakt"],
    readingTime: 6,
    originalUrl: "https://tenchat.ru/bardin-denisov",
  },
  {
    slug: "servisnaya-sluzhba-ne-otdel-remonta",
    title: "Сервисная служба — не отдел ремонта",
    excerpt:
      "Восемь элементов управляемой системы, которые отличают сервис от набора аварийных выездов.",
    body: "<h3>Ремонт устраняет неисправность. Сервис делает результат повторяемым</h3><p>Отдел ремонта реагирует на поломки. Сервисная система управляет потоком обращений, диагностикой, запасными частями, гарантией и аналитикой отказов. Разница — в предсказуемости.</p><p>Восемь элементов системы: единая точка приёма обращений, классификация по критичности, диспетчеризация, диагностика, управление ЗИП, гарантия и рекламации, аналитика отказов, обратная связь в производство.</p>",
    source: "tenchat",
    categorySlug: "architecture",
    tagSlugs: ["servisnaya-sistema", "kpi", "dispetcherizaciya"],
    readingTime: 7,
    originalUrl: "https://tenchat.ru/bardin-denisov",
  },
  {
    slug: "pochemu-inzhener-priezzhaet-povtorno",
    title: "Почему инженер вынужден приезжать повторно",
    excerpt:
      "Повторный выезд начинается не в поле, а на этапе приёма и диагностики обращения.",
    body: "<h3>Первый выезд начинается до выезда</h3><p>Недостаточные данные о неисправности, отсутствие удалённой диагностики, неопределённый состав ЗИП и неясные критерии готовности — основные причины повторной поездки инженера.</p><p>Контрольная точка перед назначением инженера обычно даёт больше эффекта, чем попытка ускорить логистику в последний момент.</p>",
    source: "telegram",
    categorySlug: "practice",
    tagSlugs: ["povtornyy-vyezd", "diagnostika", "zip"],
    readingTime: 5,
    originalUrl: "https://t.me/engserviceplus",
  },
  {
    slug: "kak-vybrat-model-regionalnogo-pokrytiya",
    title: "Как выбрать модель регионального сервисного покрытия",
    excerpt:
      "Собственные инженеры, филиалы, подрядчики или авторизованные партнёры — что выбрать и как не ошибиться.",
    body: "<h3>Модель покрытия — это не вопрос симпатий</h3><p>Выбор между собственными инженерами, филиалами, подрядчиками и авторизованными партнёрами определяется географией, критичностью оборудования, объёмом обращений и экономикой.</p><p>На практике чаще всего работает гибрид: критичные регионы закрываются собственными силами, остальные — партнёрами с едиными стандартами и контролем качества.</p>",
    source: "tenchat",
    categorySlug: "network",
    tagSlugs: ["servisnaya-set", "podryadchiki", "partnery"],
    readingTime: 8,
    originalUrl: "https://tenchat.ru/bardin-denisov",
  },
  {
    slug: "redundirovanie-ne-garantiruet-nadezhnost-cod",
    title: "Резервирование оборудования не гарантирует надежность ЦОД",
    excerpt:
      "Почему наличие резервного оборудования — необходимое, но недостаточное условие для отказоустойчивости.",
    body: "<h3>Резерв без обслуживания — иллюзия надёжности</h3><p>Резервирование ИБП, ДГУ, систем охлаждения и электроснабжения — обязательное условие для ЦОД. Но если резерв не обслуживается, не тестируется и не управляется по регламенту, он может не сработать в критический момент.</p><p>Для критичной инфраструктуры важна не столько глубина резервирования, сколько управляемость: кто отвечает за работоспособность, какие регламенты действуют, как быстро реагируют подрядчики.</p>",
    source: "telegram",
    categorySlug: "datacenter",
    tagSlugs: ["cod", "ibp", "dgu", "inzhenernaya-infrastruktura"],
    readingTime: 6,
    originalUrl: "https://t.me/engserviceplus",
  },
  {
    slug: "polnaya-sebestoimost-servisnogo-vyezda",
    title: "Полная себестоимость сервисного выезда",
    excerpt:
      "Что входит в расчёт нормо-часа и почему без этого экономика сервиса остаётся непрозрачной.",
    body: "<h3>Выезд — это не только время инженера</h3><p>Когда считают себестоимость выезда, обычно учитывают зарплату инженера и транспорт. Но полная себестоимость включает гораздо больше: диспетчеризацию, диагностику, подготовку ЗИП, логистику, административные затраты, гарантийный резерв.</p><p>Без полного расчёта невозможно понять, какие сервисные контракты прибыльны, а какие убыточны, и какую цену устанавливать на постгарантийное обслуживание.</p>",
    source: "tenchat",
    categorySlug: "economics",
    tagSlugs: ["ekonomika-servisa", "normo-chas", "sebestoimost"],
    readingTime: 7,
    originalUrl: "https://tenchat.ru/bardin-denisov",
  },
  {
    slug: "kak-upravlyat-garantiey-bez-neupravlyaemyh-rashodov",
    title: "Как управлять гарантией без неконтролируемых расходов",
    excerpt:
      "Прозрачный процесс гарантии снижает расходы и одновременно улучшает продукт.",
    body: "<h3>Гарантия — это не только расходы</h3><p>Гарантийные случаи воспринимаются как неизбежные затраты. Но если анализировать причины отказов и передавать данные в производство, гарантия становится источником информации о качестве продукта.</p><p>Что делает процесс управляемым: единые правила принятия решений, прозрачная маршрутизация обращений, анализ повторяющихся дефектов, разделение зон ответственности, контроль гарантийного резерва.</p>",
    source: "telegram",
    categorySlug: "warranty",
    tagSlugs: ["garantiya", "reklamacii", "analitika-otkazov"],
    readingTime: 6,
    originalUrl: "https://t.me/engserviceplus",
  },
];

const tags = [
  { slug: "sla", name: "SLA" },
  { slug: "vremya-reakcii", name: "Время реакции" },
  { slug: "servisnyy-kontrakt", name: "Сервисный контракт" },
  { slug: "servisnaya-sistema", name: "Сервисная система" },
  { slug: "kpi", name: "KPI" },
  { slug: "dispetcherizaciya", name: "Диспетчеризация" },
  { slug: "povtornyy-vyezd", name: "Повторный выезд" },
  { slug: "diagnostika", name: "Диагностика" },
  { slug: "zip", name: "ЗИП" },
  { slug: "servisnaya-set", name: "Сервисная сеть" },
  { slug: "podryadchiki", name: "Подрядчики" },
  { slug: "partnery", name: "Партнеры" },
  { slug: "cod", name: "ЦОД" },
  { slug: "ibp", name: "ИБП" },
  { slug: "dgu", name: "ДГУ" },
  { slug: "inzhenernaya-infrastruktura", name: "Инженерная инфраструктура" },
  { slug: "ekonomika-servisa", name: "Экономика сервиса" },
  { slug: "normo-chas", name: "Нормо-час" },
  { slug: "sebestoimost", name: "Себестоимость" },
  { slug: "garantiya", name: "Гарантия" },
  { slug: "reklamacii", name: "Рекламации" },
  { slug: "analitika-otkazov", name: "Аналитика отказов" },
];

async function main() {
  console.log("Начинаем наполнение базы...");

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log(`✓ Создано рубрик: ${categories.length}`);

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }
  console.log(`✓ Создано тегов: ${tags.length}`);

  for (const article of articles) {
    const { categorySlug, tagSlugs, ...data } = article;
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        ...data,
        categoryId: category?.id,
        tags: {
          connect: tagSlugs.map((slug) => ({ slug })),
        },
      },
    });
  }
  console.log(`✓ Создано статей: ${articles.length}`);

  console.log("Наполнение завершено.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });