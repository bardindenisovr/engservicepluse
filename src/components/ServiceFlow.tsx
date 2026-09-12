"use client";

import { useState } from "react";
  
const nodes = [
  { id: "request", label: "Заявка / сигнал", className: "top-[4%] left-[40%]", color: "blue", delay: "0s" },
  { id: "diagnostics", label: "Диагностика", className: "top-[24%] right-[1%]", color: "blue", delay: "-1s" },
  { id: "parts", label: "ЗИП и ремонт", className: "bottom-[24%] right-0", color: "teal", delay: "-2s" },
  { id: "analytics", label: "Аналитика отказов", className: "bottom-[4%] left-[35%]", color: "warm", delay: "-0.5s" },
  { id: "maintenance", label: "ТОиР / выезд", className: "bottom-[30%] left-0", color: "teal", delay: "-3s" },
  { id: "planned", label: "Плановое обслуживание", className: "top-[28%] left-[2%]", color: "blue", delay: "-1.8s" },
];

const nodeDescriptions: Record<string, string> = {
  request: "Обращение клиента или сигнал SCADA: телефон, email, портал, Telegram",
  diagnostics: "Удаленная или выездная оценка неисправности, определение состава работ",
  parts: "Обеспечение запасными частями, ремонт, замена, наладка",
  analytics: "Сбор данных об отказах, сроках, повторных обращениях",
  maintenance: "ТОиР, плановое обслуживание, выезд инженера",
  planned: "Планирование работ, профилактика, предупреждение отказов",
};

export default function ServiceFlow() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Фоновое свечение */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--electric-blue)]/8 via-transparent to-[var(--teal-accent)]/8 rounded-2xl blur-3xl" />

      <div className="relative p-6 md:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--graphite)]/40 backdrop-blur-sm overflow-hidden">
        {/* Заголовок схемы */}
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <div className="w-2 h-2 rounded-full bg-[var(--teal-accent)] animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-gray-500">
            Система эксплуатации и обслуживания
          </span>
        </div>

        {/* === СХЕМА === */}
        <div className="relative w-full aspect-square max-w-[490px] mx-auto">
          {/* --- Инженерный фон (SVG) --- */}
          <svg
            className="absolute inset-[-7%] w-[114%] h-[114%] pointer-events-none opacity-60"
            viewBox="0 0 560 560"
            aria-hidden="true"
          >
            <defs>
              <style>{`
                .pipe { fill: none; stroke: #3c778c; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
                .pipe-dim { stroke: #244a5b; stroke-dasharray: 5 7; }
                .machine { fill: #0d202b; stroke: #5799b4; stroke-width: 1.5; }
                .machine-dark { fill: #091821; stroke: #38687b; stroke-width: 1.4; }
                .accent-dot { fill: #ffa95c; stroke: #ffc182; stroke-width: 1; }
                .signal-dot { fill: #65e0b5; }
                .label { fill: #86aab9; font-family: ui-monospace, SFMono-Regular, monospace; font-size: 7px; letter-spacing: 1px; }
                .fine { stroke: #477a8e; stroke-width: 1; opacity: 0.65; }
                .gauge { fill: #112b38; stroke: #69c8e6; stroke-width: 1.2; }
                .tick { stroke: #98d9ed; stroke-width: 0.8; }
                .flow { stroke: #65e0b5; stroke-width: 2; stroke-dasharray: 3 6; animation: flowAnim 3s linear infinite; }
                @keyframes flowAnim { to { stroke-dashoffset: -18; } }
              `}</style>
            </defs>

            {/* Трубы */}
            <path className="pipe pipe-dim" d="M45 180H130V115H188M375 100h65v88h75M458 366h52v-99h-68M105 391H48v-82h72" />
            <path className="pipe" d="M79 285h72m258 0h76M280 390v82h117v-67h70M280 170V80h-91v60H91" />
            <path className="flow" d="M78 285h72m258 0h76" />

            {/* Насос P-01 */}
            <rect className="machine-dark" x="32" y="158" width="89" height="50" rx="5" />
            <path className="machine" d="M52 208h49v20H52zM63 158v-18h27v18" />
            <circle className="gauge" cx="103" cy="181" r="10" />
            <path className="tick" d="M103 174v7l5 3" />
            <text className="label" x="32" y="132">P-01 · НАСОС</text>

            {/* Привод M-02 */}
            <path className="machine" d="M433 150h65v72h-65z" />
            <path className="fine" d="M446 165h39m-39 13h39m-39 13h39m-39 13h39M452 222v15m27-15v15" />
            <circle className="accent-dot" cx="486" cy="160" r="4" />
            <text className="label" x="429" y="133">M-02 · ПРИВОД</text>

            {/* Склад ЗИП */}
            <path className="machine-dark" d="M32 366h98v49H32z" />
            <path className="fine" d="M46 378h70m-70 12h70m-70 12h70" />
            <circle className="signal-dot" cx="43" cy="356" r="4" />
            <text className="label" x="32" y="350">ЗИП · СКЛАД</text>

            {/* План ТО */}
            <path className="machine" d="M400 382h100v49h-100z" />
            <path className="fine" d="M413 395h74m-74 12h74m-54-25v49m24-49v49" />
            <text className="label" x="400" y="369">ТО · ПЛАН</text>

            {/* SCADA */}
            <path className="machine-dark" d="M220 27h118v53H220z" />
            <path className="fine" d="M237 44h84m-84 11h84m-84 11h45" />
            <circle className="signal-dot" cx="320" cy="65" r="4" />
            <text className="label" x="224" y="18">SCADA · СИГНАЛЫ</text>

            {/* Отчёт по надежности */}
            <path className="machine" d="M220 472h119v54H220z" />
            <path className="fine" d="M237 489h85m-85 11h85m-85 11h52" />
            <circle className="accent-dot" cx="317" cy="498" r="4" />
            <text className="label" x="213" y="546">ОТЧЁТ · НАДЁЖНОСТЬ</text>
          </svg>

          {/* --- Орбиты --- */}
          <div className="absolute inset-[13%] border border-dashed border-[var(--teal-accent)]/25 rounded-full animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-[29%] border border-dashed border-[var(--electric-blue)]/30 rounded-full animate-[spin_20s_linear_infinite_reverse]" />

          {/* --- Точка на орбите --- */}
          <div className="absolute w-2 h-2 rounded-full bg-[var(--teal-accent)] shadow-[0_0_18px_var(--teal-accent)] top-[16%] right-[20%]" />

          {/* --- Ядро --- */}
          <div className="absolute inset-[34%] rounded-full flex items-center justify-center text-center bg-[radial-gradient(circle_at_35%_25%,#244a5b,#0d1c27_64%)] border border-[rgba(138,227,255,0.36)] shadow-[0_0_0_18px_rgba(73,196,255,0.025),0_0_80px_rgba(71,197,255,0.2)] z-10">
            <div>
              <strong className="block text-base md:text-lg font-bold tracking-tight leading-tight text-white">
                Доступность<br />оборудования
              </strong>
              <small className="block text-[9px] md:text-[10px] text-[#84bdcf] uppercase tracking-widest mt-1.5">
                цель эксплуатации
              </small>
            </div>
          </div>

          {/* --- Узлы --- */}
          {nodes.map((node) => {
            const isActive = activeNode === node.id;
            const dotColor =
              node.color === "teal"
                ? "bg-[var(--teal-accent)]"
                : node.color === "warm"
                ? "bg-[var(--warm-accent)]"
                : "bg-[var(--electric-blue)]";
            return (
             <button
                key={node.id}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                onFocus={() => setActiveNode(node.id)}
                onBlur={() => setActiveNode(null)}
                style={{ animationDelay: node.delay }}
                className={`node-float absolute z-20 ${node.className} flex items-center gap-2 px-3 py-2.5 rounded-[10px] border text-[11px] font-bold backdrop-blur-md transition-all duration-300 ${
               isActive
               ? "border-[var(--electric-blue)]/50 bg-[var(--electric-blue)]/15 text-white scale-105"
                : "border-[var(--border-subtle)] bg-[var(--graphite)]/85 text-gray-300 hover:border-[var(--electric-blue)]/40"
                }`}
                >
                <span className={`w-1.5 h-1.5 rounded-full ${dotColor} flex-shrink-0`} />
                <span className="whitespace-nowrap">{node.label}</span>
              </button>
            );
          })}
        </div>

        {/* --- Описание активного узла --- */}
        <div className="mt-6 min-h-[60px] flex items-center justify-center relative z-10">
          {activeNode ? (
            <div className="text-center animate-in fade-in duration-300 px-4">
              <p className="text-sm text-gray-300">
                {nodeDescriptions[activeNode]}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600 italic">
              Наведите на элемент, чтобы увидеть описание
            </p>
          )}
        </div>
      </div>
    </div>
  );
}