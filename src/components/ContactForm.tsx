"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Loader2, Send } from "lucide-react";

type Direction = "service" | "production" | "joint" | "unsure";
type Props = { defaultDirection?: Direction; offerCode?: string; sourcePath?: string; formId?: string; title?: string; intro?: string; [key: string]: unknown };
type FormState = { name: string; company: string; phone: string; email: string; task: string; productionSize: string; direction: Direction; preferredContact: string };
const directions: { value: Direction; label: string }[] = [
  { value: "unsure", label: "Пока не знаю — помогите определить" },
  { value: "service", label: "Инженерный сервис и ТОиР" },
  { value: "production", label: "Организация производства" },
  { value: "joint", label: "Совместная задача нескольких подразделений" },
];
const isDirection = (value: string | null): value is Direction => directions.some((item) => item.value === value);
const newKey = () => typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const field = "w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--background)] px-4 py-3 text-white outline-none focus:border-[var(--electric-blue)]";

export default function ContactForm({ defaultDirection = "unsure", offerCode = "", sourcePath, formId = "general", title = "Обсудим вашу задачу", intro = "Опишите ситуацию и желаемое изменение. Можно не выбирать услугу заранее.", ...legacy }: Props) {
  const [form, setForm] = useState<FormState>({ name: "", company: "", phone: "", email: "", task: "", productionSize: "", direction: defaultDirection, preferredContact: "phone" });
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [offer, setOffer] = useState(offerCode);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const submissionKey = useRef(newKey());
  const started = useRef(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("direction");
    if (isDirection(requested)) setForm((current) => ({ ...current, direction: requested }));
    setOffer(params.get("offerCode") || params.get("offer") || offerCode);
    if (!started.current) {
      started.current = true;
      window.dispatchEvent(new CustomEvent("lead_form_start", { detail: { formId } }));
    }
  }, [offerCode, formId]);
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setSuccess("");
    if (!consent) { setError("Для отправки необходимо согласие на обработку персональных данных"); return; }
    if (form.name.trim().length < 2) { setError("Укажите имя"); return; }
    if (!form.phone.trim() && !form.email.trim()) { setError("Укажите телефон или корректный email"); return; }
    if (form.task.trim().length < 10) { setError("Опишите задачу хотя бы в 10 символах"); return; }
    setSending(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, name: form.name.trim(), company: form.company.trim(), phone: form.phone.trim(), email: form.email.trim(), task: form.task.trim(), website, offerCode: offer, sourcePath: sourcePath || window.location.pathname, source: "website", formId, submissionKey: submissionKey.current, consentAccepted: true, consentVersion: "2026-11-26" }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) { setError(data.error || "Не удалось отправить заявку. Попробуйте ещё раз или воспользуйтесь прямыми контактами."); return; }
      setSuccess("Заявка сохранена. Свяжемся с вами по указанным контактам.");
      window.dispatchEvent(new CustomEvent("lead_form_submit", { detail: { formId, direction: form.direction, offerCode: offer } }));
      submissionKey.current = newKey();
    } catch { setError("Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз."); }
    finally { setSending(false); }
  }
  return <form onSubmit={submit} className="space-y-5" noValidate>
    <div><h2 className="text-2xl font-bold text-white">{title}</h2><p className="mt-3 text-sm leading-relaxed text-gray-400">{intro}</p></div>
    <div><label htmlFor={`${formId}-direction`} className="mb-2 block text-sm text-gray-300">Направление</label><select id={`${formId}-direction`} value={form.direction} onChange={(e) => update("direction", e.target.value)} className={field}>{directions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>
    <div className="grid gap-5 md:grid-cols-2"><div><label htmlFor={`${formId}-name`} className="mb-2 block text-sm text-gray-300">Имя *</label><input id={`${formId}-name`} value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" minLength={2} maxLength={100} required className={field} /></div><div><label htmlFor={`${formId}-company`} className="mb-2 block text-sm text-gray-300">Предприятие</label><input id={`${formId}-company`} value={form.company} onChange={(e) => update("company", e.target.value)} autoComplete="organization" maxLength={200} className={field} /></div></div>
    <div className="grid gap-5 md:grid-cols-2"><div><label htmlFor={`${formId}-phone`} className="mb-2 block text-sm text-gray-300">Телефон</label><input id={`${formId}-phone`} value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" className={field} /></div><div><label htmlFor={`${formId}-email`} className="mb-2 block text-sm text-gray-300">Email</label><input id={`${formId}-email`} type="email" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" className={field} /></div></div>
    <div><label htmlFor={`${formId}-size`} className="mb-2 block text-sm text-gray-300">Масштаб производства <span className="text-gray-500">(необязательно)</span></label><select id={`${formId}-size`} value={form.productionSize} onChange={(e) => update("productionSize", e.target.value)} className={field}><option value="">Можно не указывать</option><option value="small">Небольшое предприятие</option><option value="medium">Среднее предприятие</option><option value="large">Крупное предприятие</option><option value="unsure">Затрудняюсь ответить</option></select></div>
    <div><label htmlFor={`${formId}-task`} className="mb-2 block text-sm text-gray-300">Что происходит и что хотите изменить? *</label><textarea id={`${formId}-task`} value={form.task} onChange={(e) => update("task", e.target.value)} minLength={10} maxLength={5000} rows={5} required className={field} /></div>
    <div><span className="mb-2 block text-sm text-gray-300">Удобный способ связи</span><div className="flex gap-4">{[["phone","Телефон"],["email","Email"]].map(([value,label]) => <label key={value} className="flex items-center gap-2 text-sm text-gray-400"><input type="radio" name={`${formId}-preferred`} value={value} checked={form.preferredContact === value} onChange={(e) => update("preferredContact", e.target.value)} />{label}</label>)}</div></div>
    <div className="absolute -left-[10000px]" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label></div>
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-[var(--border-subtle)] p-4 text-xs leading-relaxed text-gray-400"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" /><span>Я согласен на обработку персональных данных в соответствии с <Link href="/privacy" className="text-[var(--electric-blue)] hover:underline">политикой</Link> и <Link href="/consent" className="text-[var(--electric-blue)] hover:underline">условиями согласия</Link>.</span></label>
    {error && <p role="alert" className="text-sm text-[var(--warm-accent)]">{error}</p>}{success && <p role="status" className="rounded-lg border border-[var(--teal-accent)]/30 p-4 text-sm text-[var(--teal-accent)]">{success}</p>}
    <button type="submit" disabled={sending} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--electric-blue)] px-6 py-4 font-medium text-white disabled:opacity-50">{sending ? <><Loader2 className="h-4 w-4 animate-spin" />Отправляем…</> : <><Send className="h-4 w-4" />Отправить задачу</>}</button>
  </form>;
}
