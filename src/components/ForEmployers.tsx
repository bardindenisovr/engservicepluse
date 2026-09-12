import Link from "next/link";
import { Briefcase, ArrowRight } from "lucide-react";

export default function ForEmployers() {
  return (
    <section className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--graphite)]/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="p-8 md:p-10 rounded-2xl border border-[var(--electric-blue)]/20 bg-gradient-to-br from-[var(--electric-blue)]/5 to-transparent">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-[var(--electric-blue)]/10 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-[var(--electric-blue)]" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  Открыт к сильным профессиональным задачам
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
                  Рассматриваю руководящие позиции и проекты, связанные с
                  развитием технического сервиса, эксплуатации, клиентской
                  поддержки и сервисных продуктов в производственных и
                  инженерных компаниях.
                </p>
              </div>
            </div>

            <Link
              href="/contacts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--electric-blue)]/40 hover:bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] hover:text-white font-medium transition-all whitespace-nowrap"
            >
              Обсудить сотрудничество
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}