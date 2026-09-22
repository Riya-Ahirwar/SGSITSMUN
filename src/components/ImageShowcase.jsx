"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_IMAGES = [
  {
    src: "/assets/showcase-1.jpg",
    alt: "Delegates with Country Placards",
    caption: "Diplomacy in Action",
  },
  {
    src: "/assets/showcase-2.jpg",
    alt: "Gavel and Conference Placard",
    caption: "Rule of Order",
  },
  {
    src: "/assets/showcase-3.jpg",
    alt: "SGSITS Indore Campus",
    caption: "SGSITS Indore",
  },
  {
    src: "/assets/showcase-4.jpg",
    alt: "Working Sessions & Debates",
    caption: "Policy & Resolution",
  },
  {
    src: "/assets/showcase-5.jpg",
    alt: "General Assembly Delegation",
    caption: "Voice of Nations",
  },
];

export default function ImageShowcase() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const cards = cardRefs.current.filter(Boolean);

    if (!section || !container || cards.length !== 5) {
      console.warn(
        "ImageShowcase: expected 5 cards but found",
        cards.length
      );
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /*
       * ----------------------------------------------------------
       * Common initial state
       * ----------------------------------------------------------
       *
       * IMPORTANT:
       * We use GSAP xPercent/yPercent instead of Tailwind
       * -translate-x-1/2 / -translate-y-1/2.
       *
       * This prevents CSS transform and GSAP transform conflicts.
       */
      const setInitialState = (settings) => {
        cards.forEach((card, index) => {
          gsap.set(card, {
            x: 0,
            y: 0,
            xPercent: -50,
            yPercent: -50,
            scale: settings[index].scale,
            opacity: settings[index].opacity,
            rotation: 0,
            zIndex: settings[index].zIndex,
            force3D: true,
            transformOrigin: "center center",
          });
        });
      };

      /*
       * ==========================================================
       * DESKTOP
       * ==========================================================
       */
      mm.add("(min-width: 1024px)", () => {
        setInitialState([
          {
            scale: 0.88,
            opacity: 0.8,
            zIndex: 10,
          },
          {
            scale: 0.94,
            opacity: 0.9,
            zIndex: 20,
          },
          {
            scale: 1,
            opacity: 1,
            zIndex: 30,
          },
          {
            scale: 0.94,
            opacity: 0.9,
            zIndex: 20,
          },
          {
            scale: 0.88,
            opacity: 0.8,
            zIndex: 10,
          },
        ]);

        const timeline = gsap.timeline({
          defaults: {
            ease: "power2.inOut",
          },

          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=120%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            refreshPriority: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            cards[0],
            {
              x: "-36vw",
              scale: 0.92,
              opacity: 1,
              duration: 1,
            },
            0
          )
          .to(
            cards[1],
            {
              x: "-18vw",
              scale: 0.96,
              opacity: 1,
              duration: 1,
            },
            0
          )
          .to(
            cards[2],
            {
              x: 0,
              scale: 1.05,
              opacity: 1,
              duration: 1,
            },
            0
          )
          .to(
            cards[3],
            {
              x: "18vw",
              scale: 0.96,
              opacity: 1,
              duration: 1,
            },
            0
          )
          .to(
            cards[4],
            {
              x: "36vw",
              scale: 0.92,
              opacity: 1,
              duration: 1,
            },
            0
          );

        return () => {
          timeline.kill();
        };
      });

      /*
       * ==========================================================
       * TABLET
       * ==========================================================
       */
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        setInitialState([
          {
            scale: 0.88,
            opacity: 0.8,
            zIndex: 10,
          },
          {
            scale: 0.94,
            opacity: 0.9,
            zIndex: 20,
          },
          {
            scale: 1,
            opacity: 1,
            zIndex: 30,
          },
          {
            scale: 0.94,
            opacity: 0.9,
            zIndex: 20,
          },
          {
            scale: 0.88,
            opacity: 0.8,
            zIndex: 10,
          },
        ]);

        const timeline = gsap.timeline({
          defaults: {
            ease: "power2.inOut",
          },

          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            refreshPriority: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            cards[0],
            {
              x: "-32vw",
              scale: 0.88,
              opacity: 1,
              duration: 1,
            },
            0
          )
          .to(
            cards[1],
            {
              x: "-16vw",
              scale: 0.94,
              opacity: 1,
              duration: 1,
            },
            0
          )
          .to(
            cards[2],
            {
              x: 0,
              scale: 1.02,
              opacity: 1,
              duration: 1,
            },
            0
          )
          .to(
            cards[3],
            {
              x: "16vw",
              scale: 0.94,
              opacity: 1,
              duration: 1,
            },
            0
          )
          .to(
            cards[4],
            {
              x: "32vw",
              scale: 0.88,
              opacity: 1,
              duration: 1,
            },
            0
          );

        return () => {
          timeline.kill();
        };
      });

      /*
       * ==========================================================
       * MOBILE
       * ==========================================================
       */
      mm.add("(max-width: 767px)", () => {
        setInitialState([
          {
            scale: 0.85,
            opacity: 0.75,
            zIndex: 10,
          },
          {
            scale: 0.92,
            opacity: 0.85,
            zIndex: 20,
          },
          {
            scale: 1,
            opacity: 1,
            zIndex: 30,
          },
          {
            scale: 0.92,
            opacity: 0.85,
            zIndex: 20,
          },
          {
            scale: 0.85,
            opacity: 0.75,
            zIndex: 10,
          },
        ]);

        const timeline = gsap.timeline({
          defaults: {
            ease: "power2.inOut",
          },

          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=90%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            refreshPriority: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            cards[0],
            {
              x: "-24vw",
              scale: 0.84,
              opacity: 1,
              duration: 1,
            },
            0
          )
          .to(
            cards[1],
            {
              x: "-12vw",
              scale: 0.92,
              opacity: 1,
              duration: 1,
            },
            0
          )
          .to(
            cards[2],
            {
              x: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
            },
            0
          )
          .to(
            cards[3],
            {
              x: "12vw",
              scale: 0.92,
              opacity: 1,
              duration: 1,
            },
            0
          )
          .to(
            cards[4],
            {
              x: "24vw",
              scale: 0.84,
              opacity: 1,
              duration: 1,
            },
            0
          );

        return () => {
          timeline.kill();
        };
      });

      /*
       * Refresh after everything has been initialized.
       */
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        min-h-screen
        bg-navy
        text-cream
        flex
        flex-col
        items-center
        justify-center
        pt-28
        md:pt-32
        pb-10
        md:pb-14
        px-4
        overflow-hidden
        select-none
        gap-6
        md:gap-10
      "
    >
      {/* ========================================================
          BACKGROUND GLOW — cream-tinted, matching WaysIn/Committees
      ========================================================= */}
      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[600px]
          md:w-[900px]
          h-[400px]
          md:h-[600px]
          bg-cream/10
          rounded-full
          blur-3xl
          pointer-events-none
          -z-10
        "
      />

      {/* Header text with smooth interactive hover effects */}
      <div className="text-center z-40 max-w-3xl mx-auto flex flex-col items-center gap-2 select-none group cursor-default">
        <h2 className="relative font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-[0.22em] text-cream transition-all duration-500 ease-out hover:tracking-[0.28em] hover:drop-shadow-[0_0_20px_rgba(248,240,229,0.5)]">
          A JOURNEY BUILT ON DIALOGUE
          <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#7eb8f7] rounded-full transition-all duration-500 group-hover:w-2/3" />
        </h2>
        <p className="font-sans text-xs sm:text-sm md:text-base text-cream/70 font-light tracking-wide transition-all duration-300 group-hover:text-cream/95 group-hover:drop-shadow-[0_0_12px_rgba(126,184,247,0.35)] max-w-xl mx-auto">
          From our first session to the conversations that continue to shape us.
        </p>
      </div>

      {/* ========================================================
          IMAGE SHOWCASE STAGE
      ========================================================= */}
      <div
        ref={containerRef}
        className="
          relative
          w-full
          max-w-7xl
          h-[280px]
          sm:h-[320px]
          md:h-[370px]
          flex
          items-center
          justify-center
        "
      >
        {SHOWCASE_IMAGES.map((item, index) => {
          const isCenter = index === 2;

          return (
            <div
              key={item.src}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className={`
                absolute
                top-1/2
                left-1/2
                rounded-2xl
                overflow-hidden
                border
                border-cream/20
                shadow-[0_20px_50px_rgba(0,0,0,0.85)]
                bg-navy
                will-change-transform
                ${
                  isCenter
                    ? `
                      w-[170px]
                      sm:w-[200px]
                      md:w-[235px]
                      lg:w-[260px]
                      aspect-[4/5]
                      ring-2
                      ring-cream/50
                    `
                    : `
                      w-[155px]
                      sm:w-[185px]
                      md:w-[215px]
                      lg:w-[240px]
                      aspect-[4/5]
                    `
                }
              `}
            >
              <div className="relative w-full h-full group">
                {/* IMAGE */}
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="
                    (max-width: 640px) 40vw,
                    (max-width: 768px) 35vw,
                    (max-width: 1024px) 25vw,
                    260px
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                  priority={index <= 2}
                />

                {/* IMAGE GRADIENT — navy, matching hero overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-navy/85
                    via-transparent
                    to-transparent
                    opacity-80
                    group-hover:opacity-60
                    transition-opacity
                    duration-300
                  "
                />

                {/* CAPTION */}
                <div
                  className="
                    absolute
                    bottom-3
                    left-3
                    right-3
                    flex
                    items-center
                    justify-between
                    pointer-events-none
                  "
                >
                  <span
                    className="
                      text-[10px]
                      md:text-xs
                      font-medium
                      tracking-wider
                      text-cream/90
                      uppercase
                      drop-shadow-md
                      truncate
                      pr-1
                    "
                  >
                    {item.caption}
                  </span>

                  <span
                    className="
                      text-[10px]
                      text-cream/50
                      font-mono
                    "
                  >
                    0{index + 1}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}