"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { event } from "@/data/site";

const TARGET = new Date(event.targetDate || "2026-10-10T09:00:00+05:30").getTime();

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    d: String(Math.floor(diff / 86400000)).padStart(2, "0"),
    h: String(Math.floor((diff / 3600000) % 24)).padStart(2, "0"),
    m: String(Math.floor((diff / 60000) % 60)).padStart(2, "0"),
    s: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
  };
}

function roundRect(ctx, x, y, w, h, rTop, rBottom) {
  ctx.beginPath();
  ctx.moveTo(x + rTop, y);
  ctx.lineTo(x + w - rTop, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rTop);
  ctx.lineTo(x + w, y + h - rBottom);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rBottom, y + h);
  ctx.lineTo(x + rBottom, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rBottom);
  ctx.lineTo(x, y + rTop);
  ctx.quadraticCurveTo(x, y, x + rTop, y);
  ctx.closePath();
}

function drawHalf(ctx, digit, isTop, w, h, cy, darken = 0) {
  ctx.save();
  roundRect(ctx, 0, isTop ? 0 : cy, w, cy, isTop ? 6 : 0, isTop ? 0 : 6);
  ctx.clip();

  const grad = ctx.createLinearGradient(0, isTop ? 0 : cy, 0, isTop ? cy : h);
  grad.addColorStop(0, isTop ? "#162b4e" : "#0c1b36");
  grad.addColorStop(1, isTop ? "#0c1b36" : "#070d1e");
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.font = `700 ${Math.round(h * 0.58)}px "Space Grotesk", -apple-system, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#F8F0E5";
  ctx.fillText(digit, w / 2, cy);

  if (darken > 0) {
    ctx.fillStyle = `rgba(0,0,0,${Math.min(0.65, darken)})`;
    ctx.fill();
  }

  ctx.fillStyle = isTop ? "rgba(0,0,0,0.75)" : "rgba(234,219,200,0.1)";
  ctx.fillRect(0, isTop ? cy - 1 : cy, w, 1);

  ctx.restore();
}

function FlapCanvas({ digit }) {
  const canvasRef = useRef(null);
  const currentRef = useRef(digit);
  const targetRef = useRef(digit);
  const animRef = useRef(null);
  const startTimeRef = useRef(0);

  const drawFrame = useCallback((curr, next, progress) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width) || 54;
    const h = Math.round(rect.height) || 82;
    const dpr = Math.max((window.devicePixelRatio || 1) * 2, 4);

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, w, h);

    const cy = h / 2;

    if (progress <= 0 || progress >= 1) {
      const d = progress >= 1 ? next : curr;
      drawHalf(ctx, d, true, w, h, cy, 0);
      drawHalf(ctx, d, false, w, h, cy, 0);
    } else {
      const p =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      drawHalf(ctx, next, true, w, h, cy, 0);
      drawHalf(ctx, curr, false, w, h, cy, 0);

      if (p < 0.5) {
        const scaleY = Math.max(0.01, Math.cos(p * Math.PI));
        ctx.save();
        ctx.translate(w / 2, cy);
        ctx.scale(1, scaleY);
        ctx.translate(-w / 2, -cy);
        drawHalf(ctx, curr, true, w, h, cy, (1 - scaleY) * 0.45);
        ctx.restore();
        ctx.fillStyle = `rgba(0,0,0,${(1 - scaleY) * 0.35})`;
        ctx.fillRect(0, cy, w, 3);
      } else {
        const scaleY = Math.max(0.01, -Math.cos(p * Math.PI));
        ctx.save();
        ctx.translate(w / 2, cy);
        ctx.scale(1, scaleY);
        ctx.translate(-w / 2, -cy);
        drawHalf(ctx, next, false, w, h, cy, (1 - scaleY) * 0.35);
        ctx.restore();
      }
    }

    roundRect(ctx, 0.5, 0.5, w - 1, h - 1, 6, 6);
    ctx.strokeStyle = "rgba(234,219,200,0.22)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  }, []);

  useEffect(() => {
    if (digit !== targetRef.current) {
      currentRef.current = targetRef.current;
      targetRef.current = digit;
      startTimeRef.current = performance.now();
      if (animRef.current) cancelAnimationFrame(animRef.current);

      const loop = (now) => {
        const progress = Math.min(1, (now - startTimeRef.current) / 360);
        drawFrame(currentRef.current, targetRef.current, progress);
        if (progress < 1) {
          animRef.current = requestAnimationFrame(loop);
        } else {
          currentRef.current = targetRef.current;
          animRef.current = null;
          drawFrame(currentRef.current, currentRef.current, 0);
        }
      };

      animRef.current = requestAnimationFrame(loop);
    } else {
      drawFrame(currentRef.current, currentRef.current, 0);
    }

    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [digit, drawFrame]);

  useEffect(() => {
    drawFrame(currentRef.current, currentRef.current, 0);
    document.fonts?.ready.then(() => drawFrame(currentRef.current, currentRef.current, 0));
    const onResize = () => drawFrame(currentRef.current, currentRef.current, 0);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className="w-[32px] h-[48px] sm:w-[44px] sm:h-[66px] md:w-[50px] md:h-[75px] block rounded-[7px] shadow-[0_10px_26px_rgba(0,0,0,0.5)]"
      aria-label={digit}
      role="img"
    />
  );
}

const UNITS = [
  { key: "d", label: "Days" },
  { key: "h", label: "Hrs" },
  { key: "m", label: "Min" },
  { key: "s", label: "Sec" },
];

export default function Countdown() {
  const [time, setTime] = useState({ d: "00", h: "00", m: "00", s: "00" });

  useEffect(() => {
    setTime(getRemaining());
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="boardwrap">
      <div className="board" role="timer" aria-live="off" aria-label="Countdown to the first session">
        {UNITS.map(({ key, label }) =>
          <div key={key} className="bunit">
            <div className="flaps" data-unit={key}>
              {time[key].split("").map((ch, i) =>
                <FlapCanvas key={`${key}-${i}`} digit={ch} />
              )}
            </div>
            <span className="text-[10px] tracking-[0.24em] uppercase font-bold text-cream/75">
              {label}
            </span>
          </div>
        )}
      </div>
      <p className="text-[10.5px] tracking-[0.26em] uppercase font-semibold text-cream/75 mt-1">
        Until the first session opens
      </p>
    </div>
  );
}
