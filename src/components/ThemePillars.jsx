"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { themePillars } from "@/data/site";

export default function ThemePillars() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const closingRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    // Refresh ScrollTrigger after a slight delay to ensure pinned sections above (ImageShowcase) are settled
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    let chars;
    const ctx = gsap.context(() => {
      // 1. SplitText bounce animation on main heading (.text)
      try {
        chars = SplitText.create(".text", { type: "chars" });
        chars.chars.forEach((ch) => {
          gsap.from(ch, {
            y: -200,
            opacity: 0,
            duration: 0.8,
            ease: "bounce.out",
            delay: Math.random() * 0.5,
            scrollTrigger: {
              trigger: ".text",
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
            clearProps: "transform,opacity",
          });
        });
      } catch (err) {
        console.warn("SplitText fallback:", err);
      }

      // 2. Animate the boxes (.element) using fromTo with clearProps
      // so cards are guaranteed visible and never stuck at opacity 0
      gsap.fromTo(
        ".element",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current || ".element",
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          clearProps: "transform,opacity",
        }
      );

      // 3. Intro subtitle & paragraph reveal
      if (introRef.current) {
        gsap.fromTo(
          ".theme-intro-text",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
            clearProps: "transform,opacity",
          }
        );
      }

      // 4. Closing statement reveal
      if (closingRef.current) {
        gsap.fromTo(
          closingRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: closingRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
            clearProps: "transform,opacity",
          }
        );
      }
    }, sectionRef);

    // Additional refresh on window resize or load
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("resize", onResize);
      if (chars && typeof chars.revert === "function") {
        chars.revert();
      }
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-cream text-navy px-6 lg:px-12 py-20 md:py-28 overflow-hidden"
    >
      {/* Background subtle radial warm lighting for editorial depth */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-navy/[0.025] rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* STEP 1 — Introductory Content */}
        <div ref={introRef} className="max-w-4xl mx-auto mb-12 md:mb-16">
          <p className="theme-intro-text uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-navy/60 mb-3">
            OUR THEME
          </p>
          <h2 className="text font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-navy mb-3 overflow-visible">
            PRISM
          </h2>
          <p className="theme-intro-text font-display italic text-2xl sm:text-3xl md:text-4xl text-navy/80 font-normal mb-6">
            Five perspectives. One dialogue.
          </p>
          <div className="theme-intro-text max-w-3xl text-navy/75 text-base sm:text-lg leading-relaxed space-y-3.5 font-light">
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
              className="element prism-card group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-navy/15 hover:border-navy/40 transition-all duration-400 ease-out hover:-translate-y-2 shadow-[0_4px_24px_rgba(8,32,82,0.06)] hover:shadow-[0_16px_36px_rgba(8,32,82,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 focus-visible:-translate-y-2 cursor-default select-none h-full min-h-[300px]"
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
        <div ref={closingRef} className="max-w-2xl mx-auto text-center mt-16 md:mt-24 px-4">
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-navy font-bold tracking-tight mb-3">
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
