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
    { key: "h", label: "Hours" },
    { key: "m", label: "Minutes" },
    { key: "s", label: "Seconds" },
  ];

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <div className="flex gap-3">
        {units.map((u) => (
          <div key={u.key} className="group flex flex-col items-center cursor-default">
            <div className="bg-navy text-cream rounded-xl w-16 h-16 flex items-center justify-center font-display text-2xl font-semibold border border-cream/10 shadow-md group-hover:scale-105 group-hover:border-[#7eb8f7]/50 group-hover:shadow-[0_0_20px_rgba(126,184,247,0.35)] transition-all duration-300">
              {t ? String(t[u.key]).padStart(2, "0") : "--"}
            </div>
            <span className="text-xs mt-1.5 text-cream/60 group-hover:text-cream/90 transition-colors duration-300 font-medium">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
