import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LeadsManager from "@/components/admin/LeadsManager";

export default async function AdminLeadsPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = leads.map((l) => ({
    id: l.id,
    name: l.name,
    company: l.company,
    position: l.position,
    email: l.email,
    phone: l.phone,
    telegram: l.telegram,
    message: l.message,
    topic: l.topic,
    source: l.source,
    helpFormat: l.helpFormat,
    preferredContact: l.preferredContact,
    sourcePage: l.sourcePage,
    sourceTool: l.sourceTool,
    consentVersion: l.consentVersion,
    newsletterConsent: l.newsletterConsent,
    analysisAttached: l.analysisAttached,
    analysisLink: l.analysisLink,
    status: l.status,
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Заявки</h1>
        <p className="text-sm text-gray-500">
          Управление заявками с сайта и статусами их обработки.
        </p>
      </div>

      <LeadsManager leads={serialized} />

      <div className="mt-6">
        <Link
          href="/admin"
          className="text-sm text-gray-500 hover:text-white transition-colors"
        >
          ← Назад в админ-панель
        </Link>
      </div>
    </div>
  );
}
