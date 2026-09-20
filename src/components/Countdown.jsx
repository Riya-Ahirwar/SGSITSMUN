"use client";
import { useEffect, useState } from "react";
import { event } from "@/data/site";
import styles from "./Countdown.module.css";

const SKIN = "cream";

const TARGET = new Date(event.targetDate).getTime();

const halfTop = `${styles.half} ${styles.top}`;
const halfBot = `${styles.half} ${styles.bot}`;

const UNITS = [
  { key: "d", label: "Days" },
  { key: "h", label: "Hours" },
  { key: "m", label: "Minutes" },
  { key: "s", label: "Seconds" },
];

const INTRO_STEP_MS = 48; // match --flap-dur in .board[data-intro]
const INTRO_SPIN = 10; // multiple of 10

function introBoard(real, step) {
  let col = 0;
  const out = {};
  for (const { key } of UNITS) {
    out[key] = real[key]
      .split("")
      .map((ch) => {
        const k = step - col++;
        if (k <= 0) return "0";
        return k >= Number(ch) + INTRO_SPIN ? ch : String(k % 10);
      })
      .join("");
  }
  return out;
}

const introSteps = (real) => {
  let col = 0, max = 0;
  for (const { key } of UNITS)
    for (const ch of real[key]) max = Math.max(max, col++ + Number(ch) + INTRO_SPIN);
  return max;
};

const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    d: String(Math.floor(diff / 86400000)).padStart(2, "0"),
    h: String(Math.floor((diff / 3600000) % 24)).padStart(2, "0"),
    m: String(Math.floor((diff / 60000) % 60)).padStart(2, "0"),
    s: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
  };
}

function Flap({ digit }) {
  const [flap, setFlap] = useState({ curr: digit, prev: digit, id: 0 });

  if (digit !== flap.curr) {
    setFlap((f) => ({ curr: digit, prev: f.curr, id: f.id + 1 }));
  }

  const flipping = flap.prev !== flap.curr;

  const land = (e) => {
    if (e.target !== e.currentTarget) return; // skip ::after shade events
    setFlap((f) => (f.prev === f.curr ? f : { ...f, prev: f.curr }));
  };

  return (
    <div className={styles.flap}>
      <div className={halfTop}><span>{flap.curr}</span></div>
      <div className={halfBot}><span>{flap.prev}</span></div>
      {flipping && (
        <div key={flap.id} className={styles.leaf} onAnimationEnd={land}>
          <div className={halfTop}><span>{flap.prev}</span></div>
          <div className={halfBot}><span>{flap.curr}</span></div>
        </div>
      )}
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let id, roll;

    const tick = () => {
      setTime(getRemaining());
      clearTimeout(id);
      if (document.hidden || TARGET - Date.now() <= 0) return;
      id = setTimeout(tick, 1000 - (Date.now() % 1000) + 20);
    };

    const resync = () => {
      if (!document.hidden) tick();
    };

    tick();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(-1);
    } else {
      const total = introSteps(getRemaining());
      let s = 0;
      roll = setInterval(() => {
        s += 1;
        setStep(s > total ? -1 : s);
        if (s > total) clearInterval(roll);
      }, INTRO_STEP_MS);
    }

    document.addEventListener("visibilitychange", resync);

    return () => {
      clearTimeout(id);
      clearInterval(roll);
      document.removeEventListener("visibilitychange", resync);
    };
  }, []);

  const rolling = step >= 0 && time !== null;
  const shown = time && (rolling ? introBoard(time, step) : time);

  return (
    <div className={styles.wrap}>
      <div className={styles.board} data-skin={SKIN} data-intro={rolling ? "" : undefined} aria-hidden="true">
        {UNITS.map(({ key, label }) => (
          <div key={key} className={styles.unit}>
            <div className={styles.digits}>
              {shown
                ? shown[key]
                    .split("")
                    .map((ch, i, all) => (
                      <Flap key={`${key}-${all.length - i}`} digit={ch} />
                    ))
                : [0, 1].map((i) => (
                    <div key={i} className={styles.flap}>
                      <div className={halfTop} />
                      <div className={halfBot} />
                    </div>
                  ))}
            </div>
            <span className="text-[10px] tracking-[0.24em] uppercase font-bold text-cream/70">
              {label}
            </span>
          </div>
        ))}
      </div>

      <p role="timer" className="sr-only">
        {time
          ? `${plural(+time.d, "day")}, ${plural(+time.h, "hour")}, ${plural(+time.m, "minute")} until the first session opens`
          : ""}
      </p>

      <p
        className="text-[10.5px] tracking-[0.26em] uppercase font-semibold text-cream/70 mt-1"
        aria-hidden="true"
      >
        Until the first session opens
      </p>
    </div>
  );
}
