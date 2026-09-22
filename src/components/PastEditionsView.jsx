"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function PastEditionsView({ editions = [] }) {
  const containerRef = useRef(null);

  // Find 2025 edition from DB if present
  const edition2025 =
    editions.find((e) => e.year === 2025 || e.title?.includes("2025")) || null;

  // Gather images for 2025
  const images = [];
  if (edition2025?.coverImage?.url) {
    images.push(edition2025.coverImage);
  }
  if (edition2025?.gallery && Array.isArray(edition2025.gallery)) {
    images.push(...edition2025.gallery);
  }

  // Any other past editions in DB (e.g. 2024 or older)
  const otherEditions = editions.filter(
    (e) => e._id !== edition2025?._id && e.year !== 2025
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(".animate-item", { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }

    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll(".past-section");
    const sectionTimelines = new Map();

    sections.forEach((sec) => {
      const items = sec.querySelectorAll(".animate-item");
      if (items.length === 0) return;

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
      });

      tl.fromTo(
        items,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
        }
      );

      sectionTimelines.set(sec, tl);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const tl = sectionTimelines.get(entry.target);
          if (tl) {
            if (entry.isIntersecting) {
              tl.restart();
            } else {
              tl.pause(0);
            }
          }
        });
      },
      { threshold: 0.08 }
    );

    sections.forEach((sec) => observer.observe(sec));

    // Touch event listeners for mobile micro-zoom
    const zoomElements = containerRef.current.querySelectorAll(
      ".past-zoom-heading, .past-zoom-sub, .past-zoom-body, .past-zoom-word"
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
      sectionTimelines.forEach((tl) => tl.kill());
      zoomElements.forEach((el) => {
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchend", onTouchEnd);
        el.removeEventListener("touchcancel", onTouchEnd);
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-cream text-navy min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 overflow-hidden"
    >
      {/* Scoped CSS for subtle micro-interactions */}
      <style jsx>{`
        .past-zoom-heading {
          display: inline-block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .past-zoom-heading:hover,
        .past-zoom-heading.is-touched {
          transform: scale(1.035);
        }

        .past-zoom-sub {
          display: inline-block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .past-zoom-sub:hover,
        .past-zoom-sub.is-touched {
          transform: scale(1.025);
        }

        .past-zoom-body {
          display: block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .past-zoom-body:hover,
        .past-zoom-body.is-touched {
          transform: scale(1.015);
        }

        .past-zoom-word {
          display: inline-block;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .past-zoom-word:hover,
        .past-zoom-word.is-touched {
          transform: scale(1.06);
          color: #082052;
        }

        .gallery-card {
          transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms ease;
        }
        .gallery-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 16px 36px -10px rgba(4, 14, 36, 0.15);
        }
      `}</style>

      {/* Ambient background lighting */}
      <div
        className="pointer-events-none absolute top-1/4 right-1/4 w-[750px] h-[750px] bg-navy/[0.025] rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/3 -left-32 w-[650px] h-[650px] bg-[#1e3a8a]/[0.03] rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-[85vw] 2xl:max-w-[1440px] mx-auto">
        {/* ========================================================
            SECTION 1 — PAST EDITIONS HERO
        ========================================================= */}
        <section className="past-section mb-20 md:mb-28 lg:mb-32">
          {/* Eyebrow */}
          <div className="animate-item mb-4">
            <p className="past-zoom-sub uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-navy/60">
              PAST EDITIONS
            </p>
          </div>

          {/* Main Heading */}
          <div className="animate-item mb-4">
            <h1 className="past-zoom-heading font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-navy leading-[1.12]">
              SGSITS MUN 2025
            </h1>
          </div>

          {/* Supporting Text: Theme: DIGIT */}
          <div className="animate-item mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-navy/20 bg-white/40 text-navy font-medium text-sm md:text-base">
              <span className="text-navy/60 font-normal">Theme:</span>
              <span className="font-semibold tracking-wide">DIGIT</span>
            </div>
          </div>

          {/* Introduction */}
          <div className="animate-item max-w-4xl lg:max-w-5xl">
            <p className="past-zoom-body text-navy/80 text-base sm:text-lg md:text-xl font-light leading-relaxed">
              The inaugural edition of SGSITS MUN brought together students from across the campus
              and beyond for two days of debate, diplomacy and dialogue.
            </p>
          </div>
        </section>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-20 md:mb-28 lg:mb-32" />

        {/* ========================================================
            SECTION 2 — THEME / DIGIT
        ========================================================= */}
        <section className="past-section mb-20 md:mb-28 lg:mb-32">
          <div className="animate-item mb-4">
            <p className="past-zoom-sub uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-navy/60">
              THEME
            </p>
          </div>

          <div className="animate-item mb-6">
            <h2 className="past-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy">
              DIGIT
            </h2>
          </div>

          <div className="max-w-4xl lg:max-w-5xl space-y-6 text-navy/80 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-12">
            <p className="animate-item past-zoom-body">
              The inaugural edition of SGSITS MUN brought together students from across the campus
              and beyond for two days of debate, diplomacy and dialogue.
            </p>
            <p className="animate-item past-zoom-body">
              Built around the theme DIGIT, the conference explored five ideas at the heart of a
              changing world — Democracy, Innovation, Globalisation, Inclusion and Technology.
            </p>
          </div>

          {/* Five Concepts: Refined horizontal sequence on desktop */}
          <div className="animate-item p-6 sm:p-8 rounded-2xl bg-white/50 border border-navy/15">
            <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-3 text-xs sm:text-sm md:text-base font-semibold tracking-[0.2em] text-navy/80 uppercase">
              <span className="past-zoom-word">DEMOCRACY</span>
              <span className="hidden sm:inline text-navy/30">·</span>
              <span className="past-zoom-word">INNOVATION</span>
              <span className="hidden sm:inline text-navy/30">·</span>
              <span className="past-zoom-word">GLOBALISATION</span>
              <span className="hidden sm:inline text-navy/30">·</span>
              <span className="past-zoom-word">INCLUSION</span>
              <span className="hidden sm:inline text-navy/30">·</span>
              <span className="past-zoom-word">TECHNOLOGY</span>
            </div>
          </div>
        </section>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-20 md:mb-28 lg:mb-32" />

        {/* ========================================================
            SECTION 3 — THE STORY OF 2025
        ========================================================= */}
        <section className="past-section mb-20 md:mb-28 lg:mb-32">
          <div className="animate-item mb-8">
            <h2 className="past-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy">
              THE STORY OF 2025
            </h2>
            <div className="w-16 h-[2px] bg-[#082052] rounded-full mt-4" />
          </div>

          <div className="max-w-4xl lg:max-w-5xl space-y-6 text-navy/80 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-12">
            <p className="animate-item past-zoom-body">
              From the committee room to the corridors between sessions, the first edition created a
              space where ideas were challenged, perspectives met and delegates found their voice.
            </p>
            <p className="animate-item past-zoom-body">
              More than a simulation of international affairs, SGSITS MUN 2025 was the beginning of
              a platform built around meaningful conversation, thoughtful debate and the confidence
              to speak.
            </p>
          </div>

          {/* Strong Closing Emotional Statement */}
          <div className="animate-item pt-4 border-t border-navy/15 max-w-4xl">
            <p className="past-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy tracking-tight leading-tight">
              2025 was where it began.
            </p>
          </div>
        </section>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-20 md:mb-28 lg:mb-32" />

        {/* ========================================================
            SECTION 4 — PAST EDITION VISUAL / GALLERY
        ========================================================= */}
        <section className="past-section mb-20 md:mb-28 lg:mb-32">
          <div className="animate-item mb-10">
            <p className="past-zoom-sub uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-navy/60 mb-2">
              ARCHIVE
            </p>
            <h2 className="past-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy">
              Visual Archive
            </h2>
          </div>

          {images.length > 0 ? (
            /* Editorial Gallery for existing DB images */
            <div className="animate-item space-y-4">
              {/* Featured Large Image */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-navy/15 gallery-card shadow-sm">
                <Image
                  src={images[0].url}
                  alt={images[0].caption || "SGSITS MUN 2025"}
                  fill
                  className="object-cover"
                />
                {images[0].caption && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy/80 to-transparent p-4 sm:p-6 text-cream text-sm">
                    {images[0].caption}
                  </div>
                )}
              </div>

              {/* Supporting Smaller Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                  {images.slice(1).map((img, idx) => (
                    <div
                      key={img.publicId || idx}
                      className="relative aspect-square rounded-xl overflow-hidden border border-navy/15 gallery-card shadow-sm"
                    >
                      <Image
                        src={img.url}
                        alt={img.caption || `SGSITS MUN 2025 Image ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                      {img.caption && (
                        <div className="absolute bottom-0 inset-x-0 bg-navy/70 backdrop-blur-xs p-2 text-cream text-xs truncate">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Minimal elegant placeholder when no images are in database */
            <div className="animate-item p-12 sm:p-16 md:p-20 rounded-2xl bg-white/40 border border-navy/15 text-center max-w-3xl mx-auto">
              <p className="past-zoom-sub font-display text-3xl sm:text-4xl font-bold text-navy mb-2 tracking-tight">
                SGSITS MUN 2025
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold text-navy/50">
                THE BEGINNING
              </p>
              <div className="w-12 h-[1.5px] bg-navy/30 mx-auto mt-6" />
            </div>
          )}
        </section>

        {/* ========================================================
            SECTION 5 — 2025 HIGHLIGHTS (DYNAMIC FROM DB IF AVAILABLE)
        ========================================================= */}
        {edition2025?.summary && (
          <section className="past-section mb-20 md:mb-28 lg:mb-32">
            <div className="animate-item p-8 sm:p-10 rounded-2xl bg-white/50 border border-navy/15 max-w-4xl">
              <p className="uppercase tracking-[0.2em] text-xs font-semibold text-navy/60 mb-3">
                CONFERENCE HIGHLIGHTS
              </p>
              <p className="past-zoom-body text-navy/80 text-base sm:text-lg font-light leading-relaxed">
                {edition2025.summary}
              </p>
            </div>
          </section>
        )}

        {/* Any Other Past Editions Saved in DB */}
        {otherEditions.length > 0 && (
          <section className="past-section pt-8 border-t border-navy/15">
            <h2 className="past-zoom-heading font-display text-2xl sm:text-3xl font-bold text-navy mb-8">
              Earlier Editions
            </h2>
            <div className="space-y-12">
              {otherEditions.map((ed) => (
                <div key={ed._id} className="p-6 sm:p-8 rounded-xl bg-white/40 border border-navy/10">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="font-display text-2xl font-bold text-navy">{ed.title}</h3>
                    <span className="text-sm font-semibold text-navy/50">{ed.year}</span>
                  </div>
                  {ed.theme && (
                    <p className="text-sm font-medium text-navy/70 mb-3">Theme: {ed.theme}</p>
                  )}
                  {ed.summary && (
                    <p className="text-navy/80 text-base font-light mb-6">{ed.summary}</p>
                  )}
                  {ed.coverImage?.url && (
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-navy/10">
                      <Image src={ed.coverImage.url} alt={ed.title} fill className="object-cover" />
                    </div>
                  )}
                  {ed.gallery?.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {ed.gallery.map((g, gi) => (
                        <div key={gi} className="relative aspect-square rounded-lg overflow-hidden border border-navy/10">
                          <Image src={g.url} alt={g.caption || ed.title} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
