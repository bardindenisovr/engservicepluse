import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ToolCtaVariant = {
  heading: string;
  text: string;
  buttonLabel: string;
  href: string;
};

const VARIANTS: Record<string, ToolCtaVariant> = {
  "5why": {
    heading: "Примените метод к своей ситуации",
    text: "Опишите событие, постройте цепочку причин и проверьте её обратным ходом «поэтому» — без регистрации.",
    buttonLabel: "Разобрать проблему",
    href: "/tools/5why",
  },
  ishikawa: {
    heading: "Примените метод к своей ситуации",
    text: "Соберите все возможные причины проблемы по группам факторов и выберите, что проверять первым.",
    buttonLabel: "Построить диаграмму",
    href: "/tools/ishikawa",
  },
  "8d": {
    heading: "Подготовьте отчёт для заказчика",
    text: "Пройдите восемь шагов 8D: от сдерживания до предупреждения повторения — с экспортом отчёта.",
    buttonLabel: "Подготовить отчёт 8D",
    href: "/tools/8d",
  },
  a3: {
    heading: "Соберите решение на одном листе",
    text: "Метод А3 помогает изложить проблему, анализ и план улучшений на одном листе и согласовать решение с командой.",
    buttonLabel: "Заполнить лист А3",
    href: "/tools/a3",
  },
};

const KEYWORDS: { variant: keyof typeof VARIANTS; needles: string[] }[] = [
  { variant: "a3", needles: ["бережлив", "улучшени", "каizen", "кайдзен", "а3", "a3"] },
  { variant: "8d", needles: ["рекламац", "претензи", "гаранти", "8d", "отказ"] },
  { variant: "5why", needles: ["причин", "повторн", "почему", "сбой", "выезд"] },
  { variant: "ishikawa", needles: ["исикава", "фактор", "диаграмм", "много причин"] },
];

function pickVariant(title: string, excerpt: string, tags: string[], category?: string | null): ToolCtaVariant {
  const haystack = `${title} ${excerpt} ${tags.join(" ")} ${category ?? ""}`.toLowerCase();
  for (const { variant, needles } of KEYWORDS) {
    if (needles.some((n) => haystack.includes(n))) return VARIANTS[variant];
  }
  return VARIANTS["5why"];
}

export default function ArticleToolCta({
  title,
  excerpt,
  tags,
  category,
}: {
  title: string;
  excerpt: string;
  tags: string[];
  category?: string | null;
}) {
  const v = pickVariant(title, excerpt, tags, category);
  return (
    <div className="mt-12 p-6 rounded-xl border border-[var(--electric-blue)]/25 bg-[var(--electric-blue)]/5">
      <h2 className="text-lg font-semibold text-white mb-2">{v.heading}</h2>
      <p className="text-sm text-gray-300 leading-relaxed mb-4">{v.text}</p>
      <Link
        href={v.href}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white text-sm font-medium transition-colors min-h-[44px]"
      >
        {v.buttonLabel}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
