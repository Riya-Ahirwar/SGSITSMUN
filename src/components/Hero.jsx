"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Countdown from "./Countdown";
import { event } from "@/data/site";
import AnimatedGridBackground from "./AnimatedGridBackground";
import HeroImageCarousel from "./HeroImageCarousel";


const backgroundImages = [
  "/assets/hero-building.jpg",
  "/assets/hero-building.jpg",
  "/assets/hero-building.jpg"
];

export default function Hero() {
  const slidesRef = useRef([]);

  useEffect(() => {
    const slides = slidesRef.current.filter(Boolean);
    if (!slides.length) return;

    const tl = gsap.timeline({ repeat: -1 });
    slides.forEach((slide, i) => {
      tl.fromTo(slide,
        { opacity: 0, scale: 1 },
        { opacity: 1, scale: 1.15, duration: 2 },
        i * 3
      ).to(slide, { opacity: 0, duration: 1 }, i * 3 + 2.5);
    });

    return () => tl.kill();
  }, []);

  return (
    <header className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden">
      {backgroundImages.map((src, idx) => (
        <Image
          key={idx}
          src={src}
          alt=""
          fill
          priority={idx === 0}
          className="object-cover -z-20 opacity-0"
          ref={(el) => (slidesRef.current[idx] = el)}
        />
      ))}

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
        <Image src="/assets/logo.jpg" alt="SGSITS MUN" width={90} height={90} className="rounded-full" />

        {/* Edition tag */}
        <p className="uppercase tracking-[0.25em] text-sm text-cream/70 font-medium">
          Edition 2026 &bull; Indore
        </p>

        {/* Main heading — single line, "direction" in sky blue */}
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
          Where debate becomes{" "}
          <em className="not-italic italic" style={{ color: "#7eb8f7" }}>direction.</em>
        </h1>

        {/* Tagline replacing long paragraph */}
        <p className="uppercase tracking-[0.2em] text-sm text-cream/60 font-medium -mt-2">
          Ideas Today.&nbsp; Impact Tomorrow.
        </p>

        {/* Countdown — no box wrapper */}
        <Countdown />

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#register" className="bg-cream text-navy px-7 py-3 rounded-full font-semibold hover:bg-cream/90 transition flex items-center gap-2">
            Register as Delegate <span aria-hidden="true">→</span>
          </a>
          <a href="#about" className="border border-cream/50 text-cream px-7 py-3 rounded-full font-semibold hover:bg-cream/10 transition">
            Learn more
          </a>
        </div>

        {/* Bottom info row with icons */}
        <div className="flex flex-wrap items-center justify-center gap-0 text-sm text-cream/60 pt-2 divide-x divide-cream/20">
          <span className="flex items-center gap-2 px-5">
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            {event.dates}
          </span>
          <span className="flex items-center gap-2 px-5">
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            {event.venue}
          </span>
          <span className="flex items-center gap-2 px-5">
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Three Committees
          </span>
        </div>
      </div>
    </header>
  );
}
