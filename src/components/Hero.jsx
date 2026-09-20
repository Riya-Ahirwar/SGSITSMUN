"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Countdown from "./Countdown";
import { event } from "@/data/site";
import AnimatedGridBackground from "./AnimatedGridBackground";

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

      {/* Dark navy wash over the photo for deep dark contrast */}
      <div className="absolute inset-0 -z-10 bg-[#040e24]/90" />

      <AnimatedGridBackground />

      {/* Subtle dotted/jali texture on top of the wash */}
      <div
        className="absolute inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle, #f8f0e5 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-8 text-cream">
        <Image src="/assets/logo.jpg" alt="SGSITS MUN" width={90} height={90} className="rounded-full" />

        <p className="uppercase tracking-widest text-sm text-cream/70">
          Edition 2026 · SGSITS Indore
        </p>
        <h1 className="font-display text-5xl md:text-7xl leading-tight">
          Where debate <br />
          becomes <em className="italic text-cream/90">direction.</em>
        </h1>
        <p className="max-w-xl text-cream/80">
          {event.name} — {event.theme}. Two days, three committees, and a room full of
          people about to discover what they are capable of.
        </p>

        <div className="bg-cream/10 rounded-2xl p-6">
          <Countdown />
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#register" className="bg-cream text-navy px-6 py-3 rounded-full font-semibold hover:bg-cream/90 transition">
            Register as Delegate
          </a>
          <a href="#about" className="border border-cream/40 px-6 py-3 rounded-full font-semibold hover:bg-cream/10 transition">
            Learn more
          </a>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-cream/70 pt-4">
          <span>{event.dates}</span>
          <span>·</span>
          <span>{event.venue}</span>
          <span>·</span>
          <span>Three Committees</span>
        </div>
      </div>
    </header>
  );
}
