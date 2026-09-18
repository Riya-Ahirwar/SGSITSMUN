"use client";
import { useEffect, useState } from "react";

// Target: 10 October 2026, 09:00 IST
const TARGET = new Date("2026-10-10T09:00:00+05:30").getTime();

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [t, setT] = useState(null);

  useEffect(() => {
    setT(getRemaining());
    const id = setInterval(() => setT(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { key: "d", label: "Days" },
    { key: "h", label: "Hrs" },
    { key: "m", label: "Min" },
    { key: "s", label: "Sec" },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-3">
        {units.map((u) => (
          <div key={u.key} className="flex flex-col items-center">
            <div className="bg-navy text-cream rounded-lg w-16 h-16 flex items-center justify-center font-display text-2xl font-semibold">
              {t ? String(t[u.key]).padStart(2, "0") : "--"}
            </div>
            <span className="text-xs mt-1 text-navy/70">{u.label}</span>
          </div>
        ))}
      </div>
      <p className="text-sm text-navy/60">Until the first session opens</p>
    </div>
  );
}
