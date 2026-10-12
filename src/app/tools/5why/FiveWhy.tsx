"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./five-why.module.css";

type Action = { text: string; owner: string; due: string; done: boolean };
type Analysis = { problem: string; whys: string[]; evidence: string[]; root: string; actions: Action[] };
const KEY = "serviceinplus:5why:v1";
const blank = (): Analysis => ({ problem: "", whys: Array(5).fill(""), evidence: Array(5).fill(""), root: "", actions: [] });
function valid(value: unknown): value is Analysis {
  if (!value || typeof value !== "object") return false;
  const v = value as Analysis;
  return typeof v.problem === "string" && typeof v.root === "string" && Array.isArray(v.whys) && v.whys.length > 0 && v.whys.length <= 10 && v.whys.every(x => typeof x === "string") && Array.isArray(v.evidence) && v.evidence.length === v.whys.length && v.evidence.every(x => typeof x === "string") && Array.isArray(v.actions) && v.actions.length <= 100 && v.actions.every(a => a && typeof a.text === "string" && typeof a.owner === "string" && typeof a.due === "string" && (a.due === "" || /^\d{4}-\d{2}-\d{2}$/.test(a.due)) && typeof a.done === "boolean");
}
export default function FiveWhy() {
  const [data, setData] = useState<Analysis>(blank);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) { const parsed: unknown = JSON.parse(raw); if (valid(parsed)) setData(parsed); else setMessage("Сохранённый черновик имеет неподдерживаемый формат."); } }
    catch { setMessage("Не удалось прочитать черновик. Используйте экспорт для резервной копии."); }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(data)); }
    catch { setMessage("Автосохранение недоступно. Скачайте JSON, чтобы не потерять данные."); }
  }, [data, ready]);
  function download() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const a = document.createElement("a"); a.href = url; a.download = "5why-analysis.json"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function load(file?: File) {
    if (!file) return;
    if (file.size > 1000000) { setMessage("Размер файла не должен превышать 1 МБ."); return; }
    try { const parsed: unknown = JSON.parse(await file.text()); if (!valid(parsed)) throw new Error(); if (window.confirm("Заменить текущий анализ содержимым файла?")) { setData(parsed); setMessage("Анализ импортирован."); } }
    catch { setMessage("Файл не соответствует формату этой версии. Текущий анализ сохранён."); }
  }
  const field = (key: "problem" | "root", value: string) => setData(d => ({ ...d, [key]: value }));
  function step(index: number, value: string, evidence = false) { setData(d => ({ ...d, [evidence ? "evidence" : "whys"]: (evidence ? d.evidence : d.whys).map((s, i) => i === index ? value : s) })); }
  function action(index: number, patch: Partial<Action>) { setData(d => ({ ...d, actions: d.actions.map((a, i) => i === index ? { ...a, ...patch } : a) })); }
  const filled = data.whys.filter(x => x.trim()).length;
  const today = new Date();
  const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return <section className={styles.tool}>
    <h1>5 почему — анализ причин</h1>
    <p>Двигайтесь от наблюдаемой проблемы к проверяемым причинам. Пять уровней — ориентир, а не обязательное условие. Не подменяйте факты предположениями.</p>
    <p className={styles.notice}>Первая версия для сайта: данные сохраняются только в этом браузере. Серверного сохранения и синхронизации пока нет. Не вводите конфиденциальные сведения. Поля исключены из записи Вебвизора.</p>
    <div className={styles.toolbar}>
      <button onClick={download}>Скачать JSON</button><button onClick={() => input.current?.click()}>Импорт JSON</button><button onClick={() => window.print()}>Печать / PDF</button>
      <button onClick={() => { if (window.confirm("Очистить текущий анализ? Сначала скачайте резервную копию.")) { setData(blank()); setMessage(""); } }}>Новый анализ</button>
      <input ref={input} type="file" accept=".json,application/json" hidden onChange={e => { void load(e.target.files?.[0]); e.target.value = ""; }} />
    </div>
    <p role="status">{message || (ready ? "Черновик восстанавливается при повторном открытии в этом браузере." : "Загрузка черновика…")}</p>
    <div className="ym-disable-keys"><fieldset disabled={!ready} className={styles.fields}>
    <label>Наблюдаемая проблема<textarea className="ym-disable-keys" value={data.problem} onChange={e => field("problem", e.target.value)} placeholder="Что произошло, где, когда и насколько это отклонилось от нормы?" /></label>
    <p>Заполнено уровней: {filled} из {data.whys.length}. Это показатель заполнения, не качества анализа.</p>
    {data.whys.map((why, i) => <article className={styles.card} key={i}>
      <h2>Почему {i + 1}?</h2>
      <p>{i === 0 ? data.problem || "Почему возникла проблема?" : data.whys[i - 1] || "Сначала сформулируйте предыдущую причину."}</p>
      <label>Предполагаемая причина<textarea className="ym-disable-keys" value={why} onChange={e => step(i, e.target.value)} /></label>
      <label>Чем подтверждается связь?<textarea className="ym-disable-keys" value={data.evidence[i]} onChange={e => step(i, e.target.value, true)} placeholder="Измерение, запись, наблюдение или способ проверки гипотезы" /></label>
      {why.trim() && data.whys.some((v, j) => j !== i && v.trim().toLowerCase() === why.trim().toLowerCase()) && <p className={styles.warning}>Причина повторяется. Проверьте, не замкнулась ли цепочка.</p>}
    </article>)}
    <div className={styles.toolbar}><button disabled={data.whys.length >= 10} onClick={() => setData(d => ({ ...d, whys: [...d.whys, ""], evidence: [...d.evidence, ""] }))}>Ещё уровень</button><button disabled={data.whys.length <= 1} onClick={() => { if (window.confirm("Удалить последний уровень и его подтверждение?")) setData(d => ({ ...d, whys: d.whys.slice(0, -1), evidence: d.evidence.slice(0, -1) })); }}>Убрать последний уровень</button></div>
    <h2>Обратная проверка «Поэтому»</h2>
    <p>Прочитайте снизу вверх. Каждая связь должна объяснять следующий результат; текст сам по себе не доказывает причинность.</p>
    {data.whys.map((why, i) => ({ why, i })).reverse().filter(x => x.why.trim()).map(({ why, i }) => <p key={i}>{why} → поэтому → {i === 0 ? data.problem : data.whys[i - 1] || "[предыдущая причина не заполнена]"}</p>)}
    <label>Вывод и предполагаемая корневая причина<textarea className="ym-disable-keys" value={data.root} onChange={e => field("root", e.target.value)} /></label>
    <h2>Корректирующие действия</h2>
    {data.actions.map((a, i) => <article key={i} className={`${styles.card} ${!a.done && a.due && a.due < date ? styles.overdue : ""}`}>
      <label>Действие<textarea className="ym-disable-keys" value={a.text} onChange={e => action(i, { text: e.target.value })} /></label>
      <label>Ответственный<input className="ym-disable-keys" value={a.owner} onChange={e => action(i, { owner: e.target.value })} /></label>
      <label>Срок<input type="date" value={a.due} onChange={e => action(i, { due: e.target.value })} /></label>
      <label><input type="checkbox" checked={a.done} onChange={e => action(i, { done: e.target.checked })} /> Выполнено</label>
      {!a.done && a.due && a.due < date && <p className={styles.warning}>Срок истёк</p>}
      <button onClick={() => { if (window.confirm("Удалить действие?")) setData(d => ({ ...d, actions: d.actions.filter((_, j) => j !== i) })); }}>Удалить действие</button>
    </article>)}
    <button disabled={data.actions.length >= 100} onClick={() => setData(d => ({ ...d, actions: [...d.actions, { text: "", owner: "", due: "", done: false }] }))}>Добавить действие</button>
    </fieldset></div>
    <aside className={styles.cta}><h2>Нужна помощь с разбором?</h2><p>Перейдите на страницу контактов, чтобы обсудить задачу. Содержимое анализа автоматически не передаётся.</p><Link href="/contacts">Обсудить задачу →</Link></aside>
  </section>;
}
