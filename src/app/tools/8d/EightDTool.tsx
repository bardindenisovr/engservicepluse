"use client";

import { useEffect, useRef } from "react";

export default function EightDTool() {
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    function resize() {
      const el = frame.current;
      if (!el) return;
      try {
        const doc = el.contentDocument;
        if (doc) {
          const h = Math.max(doc.documentElement.scrollHeight, doc.body ? doc.body.scrollHeight : 0);
          if (h > 0) el.style.height = h + 24 + "px";
        }
      } catch { /* same-origin: local */ }
    }
    resize();
    const t = window.setInterval(resize, 900);
    return () => window.clearInterval(t);
  }, []);
  return (
    <iframe
      ref={frame}
      src="/tools/8d.html"
      title="Отчёт 8D онлайн"
      onLoad={() => {
        const el = frame.current;
        if (!el) return;
        try {
          const doc = el.contentDocument;
          if (doc) {
            const h = Math.max(doc.documentElement.scrollHeight, doc.body ? doc.body.scrollHeight : 0);
            if (h > 0) el.style.height = h + 24 + "px";
          }
        } catch { /* ignore */ }
      }}
      style={{ width: "100%", minHeight: 900, border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, background: "#0a0e1a" }}
    />
  );
}
