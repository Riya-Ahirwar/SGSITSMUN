"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const imgRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = imgRefs.current.filter(Boolean);

    if (cards.length !== 5 || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        return;
      }

      const mm = gsap.matchMedia();

      // DESKTOP (>= 1024px)
      mm.add("(min-width: 1024px)", () => {
        // Initial setup: all cards centered and overlapping on the exact same baseline
        gsap.set(cards[0], { x: 0, y: 0, scale: 0.88, rotation: 0, opacity: 0.8, zIndex: 10 });
        gsap.set(cards[1], { x: 0, y: 0, scale: 0.94, rotation: 0, opacity: 0.9, zIndex: 20 });
        gsap.set(cards[2], { x: 0, y: 0, scale: 1.0, rotation: 0, opacity: 1, zIndex: 30 });
        gsap.set(cards[3], { x: 0, y: 0, scale: 0.94, rotation: 0, opacity: 0.9, zIndex: 20 });
        gsap.set(cards[4], { x: 0, y: 0, scale: 0.88, rotation: 0, opacity: 0.8, zIndex: 10 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // SIMULTANEOUS MOVEMENT: all 5 cards move outward on the exact SAME horizontal level (y: 0)
        tl.to(cards[0], { x: "-36vw", y: 0, scale: 0.92, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0)
          .to(cards[1], { x: "-18vw", y: 0, scale: 0.96, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0)
          .to(cards[2], { x: 0, y: 0, scale: 1.05, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0)
          .to(cards[3], { x: "18vw", y: 0, scale: 0.96, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0)
          .to(cards[4], { x: "36vw", y: 0, scale: 0.92, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0);
      });

      // TABLET (768px - 1023px)
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        gsap.set(cards[0], { x: 0, y: 0, scale: 0.88, rotation: 0, opacity: 0.8, zIndex: 10 });
        gsap.set(cards[1], { x: 0, y: 0, scale: 0.94, rotation: 0, opacity: 0.9, zIndex: 20 });
        gsap.set(cards[2], { x: 0, y: 0, scale: 1.0, rotation: 0, opacity: 1, zIndex: 30 });
        gsap.set(cards[3], { x: 0, y: 0, scale: 0.94, rotation: 0, opacity: 0.9, zIndex: 20 });
        gsap.set(cards[4], { x: 0, y: 0, scale: 0.88, rotation: 0, opacity: 0.8, zIndex: 10 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(cards[0], { x: "-32vw", y: 0, scale: 0.88, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0)
          .to(cards[1], { x: "-16vw", y: 0, scale: 0.94, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0)
          .to(cards[2], { x: 0, y: 0, scale: 1.02, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0)
          .to(cards[3], { x: "16vw", y: 0, scale: 0.94, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0)
          .to(cards[4], { x: "32vw", y: 0, scale: 0.88, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0);
      });

      // MOBILE (< 768px)
      mm.add("(max-width: 767px)", () => {
        gsap.set(cards[0], { x: 0, y: 0, scale: 0.85, rotation: 0, opacity: 0.75, zIndex: 10 });
        gsap.set(cards[1], { x: 0, y: 0, scale: 0.92, rotation: 0, opacity: 0.85, zIndex: 20 });
        gsap.set(cards[2], { x: 0, y: 0, scale: 1.0, rotation: 0, opacity: 1, zIndex: 30 });
        gsap.set(cards[3], { x: 0, y: 0, scale: 0.92, rotation: 0, opacity: 0.85, zIndex: 20 });
        gsap.set(cards[4], { x: 0, y: 0, scale: 0.85, rotation: 0, opacity: 0.75, zIndex: 10 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=90%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(cards[0], { x: "-24vw", y: 0, scale: 0.84, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0)
          .to(cards[1], { x: "-12vw", y: 0, scale: 0.92, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0)
          .to(cards[2], { x: 0, y: 0, scale: 1.0, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0)
          .to(cards[3], { x: "12vw", y: 0, scale: 0.92, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0)
          .to(cards[4], { x: "24vw", y: 0, scale: 0.84, rotation: 0, opacity: 1, ease: "power1.inOut" }, 0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#040e24] text-cream flex flex-col items-center justify-center pt-28 md:pt-32 pb-10 md:pb-14 px-4 overflow-hidden select-none gap-6 md:gap-10"
    >
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[600px] bg-gradient-to-r from-[#082052]/40 via-[#1e3a8a]/20 to-[#082052]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header text with smooth interactive hover effects */}
      <div className="text-center z-40 max-w-2xl mx-auto flex flex-col items-center gap-2 select-none group cursor-default">
        <h2 className="relative font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold uppercase tracking-[0.22em] text-cream transition-all duration-500 ease-out hover:tracking-[0.28em] hover:drop-shadow-[0_0_20px_rgba(248,240,229,0.5)]">
          THE JOURNEY SO FAR
          <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#7eb8f7] rounded-full transition-all duration-500 group-hover:w-2/3" />
        </h2>
        <p className="font-sans text-xs sm:text-sm md:text-base text-cream/70 font-light tracking-wide transition-all duration-300 group-hover:text-cream/95 group-hover:drop-shadow-[0_0_12px_rgba(126,184,247,0.35)]">
          Debates, people, moments.
        </p>
      </div>

      {/* 5-Image Showcase Stage — same horizontal baseline */}
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl h-[280px] sm:h-[320px] md:h-[370px] flex items-center justify-center"
      >
        {SHOWCASE_IMAGES.map((item, idx) => {
          const isCenter = idx === 2;
          return (
            <div
              key={idx}
              ref={(el) => (imgRefs.current[idx] = el)}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden border border-cream/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-navy transition-shadow duration-300 will-change-transform ${
                isCenter
                  ? "w-[170px] sm:w-[200px] md:w-[235px] lg:w-[260px] aspect-[4/5] ring-2 ring-[#7eb8f7]/50"
                  : "w-[155px] sm:w-[185px] md:w-[215px] lg:w-[240px] aspect-[4/5]"
              }`}
            >
              <div className="relative w-full h-full group">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 40vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={isCenter}
                />
                {/* Subtle dark gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040e24]/85 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Caption tag */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] md:text-xs font-medium tracking-wider text-cream/90 uppercase drop-shadow-md truncate pr-1">
                    {item.caption}
                  </span>
                  <span className="text-[10px] text-cream/50 font-mono">0{idx + 1}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

