import { Phone, Send } from "lucide-react";
import { expert } from "@/lib/expert";

export default function ExpertContacts() {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-white">Эксперт {expert.name}</p>
      <a
        href={`tel:${expert.phone}`}
        className="flex items-center gap-2 text-sm text-gray-300 hover:text-[var(--electric-blue)] transition-colors"
      >
        <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
        {expert.phoneDisplay}
      </a>
      <a
        href={expert.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-gray-300 hover:text-[var(--electric-blue)] transition-colors"
      >
        <Send className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
        Telegram: {expert.telegramHandle}
      </a>
    </div>
  );
}
