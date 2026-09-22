"use client";

import Image from "next/image";
import Countdown from "./Countdown";
import { event } from "@/data/site";
import AnimatedGridBackground from "./AnimatedGridBackground";
import HeroImageCarousel from "./HeroImageCarousel";


export default function Hero() {
  return (
    <header className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden">
      {/* ── Scrolling gallery images (deepest layer) ─────────────── */}
      <HeroImageCarousel />

      {/* Dark navy wash — lightened so carousel images show through */}
      <div className="absolute inset-0 -z-10 bg-[#040e24]/60" />

      <AnimatedGridBackground />

      {/* Subtle dotted/jali texture on top of the wash */}
      <div
        className="absolute inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle, #f8f0e5 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center gap-6 text-cream">
        {/* Center Hero Logo with aura glow & scale on hover */}
        <div className="group relative cursor-pointer inline-block">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#7eb8f7]/0 via-[#7eb8f7]/40 to-[#7eb8f7]/0 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500" />
          <Image
            src="/assets/logo.jpg"
            alt="SGSITS MUN"
            width={90}
            height={90}
            className="relative rounded-full ring-2 ring-cream/20 group-hover:ring-4 group-hover:ring-[#7eb8f7]/60 shadow-xl group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(126,184,247,0.5)] transition-all duration-500 ease-out"
          />
        </div>

        {/* Edition tag */}
        <p className="uppercase tracking-[0.25em] text-sm text-cream/70 hover:text-cream hover:tracking-[0.3em] font-medium transition-all duration-300 cursor-default select-none">
          Edition 2026 &bull; Indore
        </p>

        {/* Main heading — single line, "direction" in sky blue with hover glow */}
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight cursor-default transition-all duration-300 hover:drop-shadow-[0_0_25px_rgba(248,240,229,0.35)]">
          Where debate becomes{" "}
          <em
            className="not-italic italic inline-block transition-all duration-300 hover:scale-105 hover:brightness-125 hover:drop-shadow-[0_0_20px_rgba(126,184,247,0.7)]"
            style={{ color: "#7eb8f7" }}
          >
            direction.
          </em>
        </h1>

        {/* Tagline replacing long paragraph */}
        <p className="uppercase tracking-[0.2em] text-sm text-cream/60 hover:text-cream/90 font-medium -mt-2 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(126,184,247,0.35)] cursor-default select-none">
          Ideas Today.&nbsp; Impact Tomorrow.
        </p>

        {/* Countdown — no box wrapper */}
        <Countdown />

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://forms.gle/nPdiZcwdVf5XmbXJ6"
            className="group bg-cream text-navy px-7 py-3 rounded-full font-semibold hover:bg-cream/95 hover:shadow-[0_0_25px_rgba(248,240,229,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            Register as Delegate{" "}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </a>
          <a
            href="#about"
            className="border border-cream/50 text-cream px-7 py-3 rounded-full font-semibold hover:border-cream hover:bg-cream/15 hover:shadow-[0_0_20px_rgba(126,184,247,0.25)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Learn more
          </a>
        </div>

        {/* Bottom info row with icons */}
        <div className="flex flex-wrap items-center justify-center gap-1 text-sm text-cream/60 pt-2">
          <span className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-cream/10 hover:text-cream hover:shadow-[0_0_12px_rgba(126,184,247,0.2)] hover:scale-105 transition-all duration-300 cursor-default">
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            {event.dates}
          </span>
          <span className="text-cream/20">|</span>
          <span className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-cream/10 hover:text-cream hover:shadow-[0_0_12px_rgba(126,184,247,0.2)] hover:scale-105 transition-all duration-300 cursor-default">
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            {event.venue}
          </span>
          <span className="text-cream/20">|</span>
          <span className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-cream/10 hover:text-cream hover:shadow-[0_0_12px_rgba(126,184,247,0.2)] hover:scale-105 transition-all duration-300 cursor-default">
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Five Committees
          </span>
        </div>
      </div>
    </header>
  );
}
