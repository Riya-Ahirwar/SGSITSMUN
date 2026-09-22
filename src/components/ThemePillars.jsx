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

    const ctx = gsap.context(() => {
      // Step 8 — Subtle reveal animations

      // 1. Intro content fade/slide upward
      if (introRef.current) {
        gsap.from(introRef.current, {
          opacity: 0,
          y: 28,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 85%",
          },
        });
      }

      // 2. Cards appear sequentially with small stagger
      const cards = gsap.utils.toArray(".prism-card");
      if (cards.length > 0 && cardsContainerRef.current) {
        gsap.from(cards, {
          opacity: 0,
          y: 32,
          duration: 0.6,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 80%",
          },
        });
      }

      // 3. Closing statement reveals after the cards
      if (closingRef.current) {
        gsap.from(closingRef.current, {
          opacity: 0,
          y: 24,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: closingRef.current,
            start: "top 90%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-cream text-navy px-6 lg:px-12 py-24 md:py-32 overflow-hidden"
    >
      {/* Background subtle radial warm lighting for editorial depth */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-navy/[0.02] rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* STEP 1 — Introductory Content */}
        <div ref={introRef} className="mb-16 md:mb-20">
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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6"
        >
          {themePillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              tabIndex={0}
              className="prism-card group relative flex flex-col justify-between p-7 md:p-8 rounded-2xl bg-[#faf6f0] border border-navy/10 hover:border-navy/35 hover:bg-white/80 transition-all duration-400 ease-out hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(8,32,82,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 focus-visible:-translate-y-2 cursor-default select-none h-full min-h-[290px] md:min-h-[320px]"
            >
              <div>
                {/* Large individual letter at the top with index number */}
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-display text-4xl sm:text-5xl font-semibold text-navy/30 group-hover:text-navy/65 group-hover:scale-105 transition-all duration-400 inline-block origin-left">
                    {pillar.letter}
                  </span>
                  <span className="text-[11px] font-mono text-navy/35 uppercase tracking-widest">
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
              <div className="mt-6 pt-4 border-t border-navy/5 flex items-center justify-between">
                <span className="w-6 h-[1.5px] bg-navy/15 group-hover:w-10 group-hover:bg-navy/40 transition-all duration-400 rounded-full" />
                <span className="text-[10px] uppercase tracking-wider text-navy/40 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
