"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { committees } from "@/data/site";

export default function Committees() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    // Refresh ScrollTrigger to ensure accurate trigger points
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const ctx = gsap.context(() => {
      // Step 6 — Entrance Animation

      // 1. Intro content fade and upward slide
      if (introRef.current) {
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        introTl
          .fromTo(
            ".delegate-eyebrow",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", clearProps: "transform,opacity" }
          )
          .fromTo(
            ".delegate-heading",
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.25"
          )
          .fromTo(
            ".delegate-desc",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.25"
          );
      }

      // 2. Cards appear one after another with 100ms stagger (0ms, 100ms, 200ms, 300ms, 400ms)
      const cards = gsap.utils.toArray(".committee-card");
      if (cards.length > 0 && cardsContainerRef.current) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
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
      id="committees"
      ref={sectionRef}
      className="relative bg-[#040e24] text-cream px-6 lg:px-12 py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient background lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#082052]/30 via-[#1e3a8a]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* STEP 1 — Replace the existing introduction */}
        <div ref={introRef} className="mb-14 md:mb-20 max-w-3xl text-left">
          <p className="delegate-eyebrow uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-cream/60 mb-3">
            DELEGATE DESK
          </p>
          <h2 className="delegate-heading font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream mb-5 leading-tight">
            FIVE ARENAS.
            <span className="block text-cream/90">ONE SHARED PURPOSE.</span>
          </h2>
          <p className="delegate-desc font-sans text-base sm:text-lg text-cream/70 font-light leading-relaxed">
            Every committee offers a different lens on power, responsibility and consequence. Choose
            your arena, bring your perspective, and become part of the conversation.
          </p>
        </div>

        {/* STEP 2, 3 & 4 — Five distinct interactive committee cards */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-5 xl:gap-6 items-stretch"
        >
          {committees.map((c) => (
            <div
              key={c.name}
              tabIndex={0}
              className="committee-card group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#081a3e]/70 border border-cream/15 hover:border-[#7eb8f7]/50 hover:bg-[#0c2352]/85 transition-all duration-500 ease-out hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(4,14,36,0.9),0_0_25px_rgba(126,184,247,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7eb8f7]/60 focus-visible:-translate-y-2 cursor-default select-none h-full min-h-[440px] md:min-h-[470px]"
            >
              <div>
                {/* Small index number and accent line at the top */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs text-cream/40 group-hover:text-[#7eb8f7] font-semibold tracking-widest transition-all duration-400 group-hover:scale-110 inline-block origin-left">
                    {c.num}
                  </span>
                  <span className="w-6 h-[1.5px] bg-cream/20 group-hover:w-10 group-hover:bg-[#7eb8f7] transition-all duration-400 rounded-full" />
                </div>

                {/* Large committee title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-wide text-cream mb-1.5 group-hover:text-white transition-colors duration-400">
                  {c.name}
                </h3>

                {/* Smaller italic/serif subtitle */}
                <p className="font-display italic text-xs sm:text-sm text-[#7eb8f7]/90 mb-4 font-normal tracking-wide">
                  {c.tag}
                </p>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-cream/70 leading-relaxed font-light group-hover:text-cream/90 transition-colors duration-400">
                  {c.desc}
                </p>
              </div>

              {/* Visual divider + Thought-provoking final question */}
              <div className="mt-8 pt-4 border-t border-cream/10 group-hover:border-cream/20 transition-colors duration-400">
                <p className="font-display italic text-xs sm:text-sm text-cream/75 group-hover:text-cream leading-relaxed transition-all duration-400 font-normal">
                  “{c.question}”
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
