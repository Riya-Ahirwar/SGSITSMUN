"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { themePillars } from "@/data/site";

export default function ThemePillars() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(
        [
          ".prism-eyebrow",
          ".prism-heading-text",
          ".prism-tagline",
          ".prism-paragraph",
          ".prism-card",
          ".prism-closing",
        ],
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    if (!sectionRef.current) return;

    let tl;
    const ctx = gsap.context(() => {
      // Master timeline paused initially, controlled by IntersectionObserver
      tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
      });

      tl
        // 1. OUR THEME → fade + slight upward movement
        .fromTo(
          ".prism-eyebrow",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.45 }
        )
        // 2. PRISM → smooth reveal/scale
        .fromTo(
          ".prism-heading-text",
          { opacity: 0, y: 22, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        )
        // 3. Five perspectives. One dialogue. → fade/slide
        .fromTo(
          ".prism-tagline",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        )
        // 4. Introduction paragraphs → staggered reveal
        .fromTo(
          ".prism-paragraph",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
          "-=0.15"
        )
        // 5. PRISM cards → staggered entrance
        .fromTo(
          ".prism-card",
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          "-=0.15"
        )
        // 6. Closing statement
        .fromTo(
          ".prism-closing",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.1"
        );
    }, sectionRef);

    // 1. Replay the PRISM animation on every scroll entry using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When section becomes visible → trigger the PRISM reveal animation
            tl.restart();
          } else {
            // When section leaves viewport → reset animation state so it can replay on next entry
            tl.pause(0);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(sectionRef.current);

    // 2 & 3. Passive touch interaction handlers for mobile/touch devices
    const zoomElements = sectionRef.current.querySelectorAll(
      ".interactive-zoom-heading, .interactive-zoom-sub, .interactive-zoom-body, .interactive-zoom-center, .interactive-zoom-center-body"
    );

    const onTouchStart = function () {
      this.classList.add("is-touched");
    };
    const onTouchEnd = function () {
      this.classList.remove("is-touched");
    };

    zoomElements.forEach((el) => {
      el.addEventListener("touchstart", onTouchStart, { passive: true });
      el.addEventListener("touchend", onTouchEnd, { passive: true });
      el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    });

    return () => {
      observer.disconnect();
      zoomElements.forEach((el) => {
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchend", onTouchEnd);
        el.removeEventListener("touchcancel", onTouchEnd);
      });
      if (tl) tl.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-cream text-navy px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-20 md:py-28 overflow-hidden select-none"
    >
      {/* Scoped CSS for subtle, non-disruptive text zoom on hover and touch */}
      <style jsx>{`
        .interactive-zoom-heading {
          display: inline-block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .interactive-zoom-heading:hover,
        .interactive-zoom-heading.is-touched {
          transform: scale(1.04);
        }

        .interactive-zoom-sub {
          display: inline-block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .interactive-zoom-sub:hover,
        .interactive-zoom-sub.is-touched {
          transform: scale(1.03);
        }

        .interactive-zoom-body {
          display: block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .interactive-zoom-body:hover,
        .interactive-zoom-body.is-touched {
          transform: scale(1.015);
        }

        .interactive-zoom-center {
          display: inline-block;
          transform-origin: center center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .interactive-zoom-center:hover,
        .interactive-zoom-center.is-touched {
          transform: scale(1.03);
        }

        .interactive-zoom-center-body {
          display: block;
          transform-origin: center center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .interactive-zoom-center-body:hover,
        .interactive-zoom-center-body.is-touched {
          transform: scale(1.015);
        }
      `}</style>

      {/* Background subtle radial warm lighting for editorial depth */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-navy/[0.025] rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Main container occupying ~75-85% of viewport width on desktop */}
      <div className="w-full max-w-[85vw] 2xl:max-w-[1480px] mx-auto">
        {/* STEP 1 — Introductory Content */}
        <div className="w-full mb-14 md:mb-18 lg:mb-20 text-left">
          {/* Eyebrow */}
          <div className="prism-eyebrow">
            <p className="interactive-zoom-sub uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-navy/60 mb-3">
              OUR THEME
            </p>
          </div>

          {/* PRISM Heading */}
          <div className="prism-heading-text overflow-visible">
            <h2 className="interactive-zoom-heading font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-navy mb-3 overflow-visible">
              PRISM
            </h2>
          </div>

          {/* Tagline */}
          <div className="prism-tagline">
            <p className="interactive-zoom-sub font-display italic text-2xl sm:text-3xl md:text-4xl text-navy/80 font-normal mb-6">
              Five perspectives. One dialogue.
            </p>
          </div>

          {/* Paragraphs */}
          <div className="w-full max-w-5xl xl:max-w-6xl text-navy/75 text-base sm:text-lg leading-relaxed space-y-3.5 font-light">
            <div className="prism-paragraph">
              <p className="interactive-zoom-body">
                PRISM is built on a simple idea: no question exists in isolation. Every conflict carries
                competing perspectives, every decision carries consequences, and every voice brings a
                different understanding of what is right.
              </p>
            </div>
            <div className="prism-paragraph">
              <p className="interactive-zoom-body">
                This year, SGSITS MUN brings those perspectives into one space — where ideas are challenged,
                convictions are tested, and dialogue becomes the path toward understanding.
              </p>
            </div>
          </div>
        </div>

        {/* STEP 2 & 3 — PRISM Pillar Cards Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 items-stretch">
          {themePillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              tabIndex={0}
              className="prism-card group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-navy/15 hover:border-navy/40 transition-all duration-400 ease-out hover:-translate-y-2 shadow-[0_4px_24px_rgba(8,32,82,0.06)] hover:shadow-[0_16px_36px_rgba(8,32,82,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 focus-visible:-translate-y-2 cursor-default select-none h-full min-h-[300px]"
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
                <h3 className="interactive-zoom-sub font-sans text-base sm:text-lg font-bold tracking-widest text-navy uppercase mb-3">
                  {pillar.title}
                </h3>

                {/* Short description */}
                <p className="interactive-zoom-body font-sans text-xs sm:text-sm text-navy/70 leading-relaxed group-hover:text-navy/90 font-normal">
                  {pillar.desc}
                </p>
              </div>

              {/* Minimal elegant editorial line accent at bottom of card */}
              <div className="mt-8 pt-4 border-t border-navy/10 flex items-center">
                <span className="w-6 h-[1.5px] bg-navy/20 group-hover:w-12 group-hover:bg-[#082052] transition-all duration-400 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* STEP 6 — Closing Statement */}
        <div className="prism-closing max-w-2xl mx-auto text-center mt-16 md:mt-24 px-4">
          <h3 className="interactive-zoom-center font-display text-2xl sm:text-3xl md:text-4xl text-navy font-bold tracking-tight mb-3">
            One question. Many perspectives.
          </h3>
          <p className="interactive-zoom-center-body font-sans text-sm sm:text-base text-navy/60 font-light leading-relaxed max-w-xl mx-auto">
            Because meaningful dialogue begins when we are willing to see beyond our own.
          </p>
        </div>
      </div>
    </section>
  );
}
