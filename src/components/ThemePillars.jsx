"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { themePillars } from "@/data/site";

export default function ThemePillars() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const closingRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    // Refresh ScrollTrigger to account for any pinned sections above (e.g. ImageShowcase)
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const ctx = gsap.context(() => {
      // Step 8 — Subtle reveal animations

      // 1. Intro content fade/slide upward
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
            clearProps: "transform,opacity",
          }
        );
      }

      // 2. Cards appear sequentially with small stagger
      const cards = gsap.utils.toArray(".prism-card");
      if (cards.length > 0 && cardsContainerRef.current) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
              once: true,
            },
            clearProps: "transform,opacity",
          }
        );
      }

      // 3. Closing statement reveals after the cards
      if (closingRef.current) {
        gsap.fromTo(
          closingRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: closingRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
              once: true,
            },
            clearProps: "transform,opacity",
          }
        );
      }
    }, sectionRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-cream text-navy px-6 lg:px-12 py-24 md:py-32 overflow-hidden"
    >
      {/* Background subtle radial warm lighting for editorial depth */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-navy/[0.025] rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* STEP 1 — Introductory Content */}
        <div ref={introRef} className="max-w-4xl mx-auto mb-16 md:mb-20">
          <p className="uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-navy/60 mb-3">
            OUR THEME
          </p>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-navy mb-3">
            PRISM
          </h2>
          <p className="font-display italic text-2xl sm:text-3xl md:text-4xl text-navy/80 font-normal mb-8">
            Five perspectives. One dialogue.
          </p>
          <div className="max-w-3xl text-navy/75 text-base sm:text-lg leading-relaxed space-y-4 font-light">
            <p>
              PRISM is built on a simple idea: no question exists in isolation. Every conflict carries
              competing perspectives, every decision carries consequences, and every voice brings a
              different understanding of what is right.
            </p>
            <p>
              This year, SGSITS MUN brings those perspectives into one space — where ideas are challenged,
              convictions are tested, and dialogue becomes the path toward understanding.
            </p>
          </div>
        </div>

        {/* STEP 2 & 3 — PRISM Pillar Cards Layout */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 items-stretch"
        >
          {themePillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              tabIndex={0}
              className="prism-card group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-navy/15 hover:border-navy/40 transition-all duration-400 ease-out hover:-translate-y-2 shadow-[0_4px_24px_rgba(8,32,82,0.05)] hover:shadow-[0_16px_36px_rgba(8,32,82,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 focus-visible:-translate-y-2 cursor-default select-none h-full min-h-[300px]"
            >
              <div>
                {/* Large individual letter at the top with index number */}
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-display text-4xl sm:text-5xl font-semibold text-navy/35 group-hover:text-navy group-hover:scale-110 transition-all duration-400 inline-block origin-left">
                    {pillar.letter}
                  </span>
                  <span className="text-[11px] font-mono text-navy/40 uppercase tracking-widest font-medium">
                    0{idx + 1}
                  </span>
                </div>

                {/* Pillar name beneath it */}
                <h3 className="font-sans text-base sm:text-lg font-bold tracking-widest text-navy uppercase mb-3">
                  {pillar.title}
                </h3>

                {/* Short description */}
                <p className="font-sans text-xs sm:text-sm text-navy/70 leading-relaxed group-hover:text-navy/90 transition-colors duration-400 font-normal">
                  {pillar.desc}
                </p>
              </div>

              {/* Minimal elegant editorial line accent at bottom of card */}
              <div className="mt-8 pt-4 border-t border-navy/10 flex items-center justify-between">
                <span className="w-6 h-[1.5px] bg-navy/20 group-hover:w-12 group-hover:bg-[#082052] transition-all duration-400 rounded-full" />
                <span className="text-[10px] uppercase tracking-wider text-navy/50 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Perspective
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* STEP 6 — Closing Statement */}
        <div ref={closingRef} className="max-w-2xl mx-auto text-center mt-20 md:mt-28 px-4">
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-navy font-bold tracking-tight mb-3.5">
            One question. Many perspectives.
          </h3>
          <p className="font-sans text-sm sm:text-base text-navy/60 font-light leading-relaxed max-w-xl mx-auto">
            Because meaningful dialogue begins when we are willing to see beyond our own.
          </p>
        </div>
      </div>
    </section>
  );
}
