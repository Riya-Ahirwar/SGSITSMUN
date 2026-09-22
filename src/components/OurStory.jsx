"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function OurStory() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(
        [
          ".story-hero-eyebrow",
          ".story-hero-heading",
          ".story-hero-p1",
          ".story-hero-p2",
          ".story-platform-heading",
          ".story-platform-p1",
          ".story-platform-p2",
          ".story-platform-p3",
          ".story-purpose-eyebrow",
          ".story-purpose-heading",
          ".story-purpose-body",
          ".story-purpose-final",
        ],
        { opacity: 1, y: 0, x: 0, scale: 1 }
      );
      return;
    }

    if (!sectionRef.current) return;

    let tl;
    const ctx = gsap.context(() => {
      tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
      });

      tl
        // Section 1: Hero / Opening
        // 1. “OUR STORY” fade in + slight upward movement
        .fromTo(
          ".story-hero-eyebrow",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45 }
        )
        // 2. “Why SGSITS MUN exists” fade in + upward movement
        .fromTo(
          ".story-hero-heading",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        )
        // 3. First paragraph fade in with a small delay
        .fromTo(
          ".story-hero-p1",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          "-=0.15"
        )
        // 4. Second paragraph fade in with a small delay
        .fromTo(
          ".story-hero-p2",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          "-=0.2"
        )

        // Section 2: A Platform for Perspective
        // 5. Heading reveal from the left
        .fromTo(
          ".story-platform-heading",
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.1"
        )
        // 6. Paragraph 1 fade-up
        .fromTo(
          ".story-platform-p1",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        // 7. Paragraph 2 fade-up
        .fromTo(
          ".story-platform-p2",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.25"
        )
        // 8. Paragraph 3 fade-up
        .fromTo(
          ".story-platform-p3",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.25"
        )

        // Section 3: Our Purpose
        // 9. OUR PURPOSE fade in
        .fromTo(
          ".story-purpose-eyebrow",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45 },
          "-=0.1"
        )
        // 10. “A leading institution. A wider conversation.” elegant fade + subtle scale reveal
        .fromTo(
          ".story-purpose-heading",
          { opacity: 0, y: 18, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          "-=0.2"
        )
        // 11. Closing paragraph fade-up
        .fromTo(
          ".story-purpose-body",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          "-=0.2"
        )
        // 12. Final phrase subtle emphasis/reveal
        .fromTo(
          ".story-purpose-final",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" },
          "-=0.2"
        );
    }, sectionRef);

    // Section 6: Replay animation using IntersectionObserver
    // Enter -> animate; leave -> reset state; enter again -> animate again
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.restart();
          } else {
            tl.pause(0);
          }
        });
      },
      {
        threshold: 0.08,
      }
    );

    observer.observe(sectionRef.current);

    // Section 8: Touch/mobile interaction handlers (passive listeners)
    const zoomElements = sectionRef.current.querySelectorAll(
      ".story-zoom-heading, .story-zoom-sub, .story-zoom-body, .story-zoom-phrase"
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
      ref={sectionRef}
      className="relative bg-cream text-navy min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 overflow-hidden select-none"
    >
      {/* Scoped CSS for subtle, non-disruptive text zoom on hover and touch */}
      <style jsx>{`
        .story-zoom-heading {
          display: inline-block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .story-zoom-heading:hover,
        .story-zoom-heading.is-touched {
          transform: scale(1.035);
        }

        .story-zoom-sub {
          display: inline-block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .story-zoom-sub:hover,
        .story-zoom-sub.is-touched {
          transform: scale(1.03);
        }

        .story-zoom-body {
          display: block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .story-zoom-body:hover,
        .story-zoom-body.is-touched {
          transform: scale(1.015);
        }

        .story-zoom-phrase {
          display: inline;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .story-zoom-phrase:hover,
        .story-zoom-phrase.is-touched {
          transform: scale(1.025);
        }
      `}</style>

      {/* Background subtle radial warm lighting for depth */}
      <div
        className="pointer-events-none absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-navy/[0.025] rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/3 -left-32 w-[600px] h-[600px] bg-[#1e3a8a]/[0.03] rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      {/* Main container: 75–85% of viewport width on desktop */}
      <div className="w-full max-w-[85vw] 2xl:max-w-[1440px] mx-auto">
        {/* ========================================================
            SECTION 1 — HERO / OPENING
        ========================================================= */}
        <div className="mb-20 md:mb-28 lg:mb-32">
          {/* Eyebrow */}
          <div className="story-hero-eyebrow mb-3">
            <p className="story-zoom-sub uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-navy/60">
              OUR STORY
            </p>
          </div>

          {/* Main Heading */}
          <div className="story-hero-heading mb-8 md:mb-10">
            <h1 className="story-zoom-heading font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-navy leading-[1.12]">
              Why SGSITS MUN exists
            </h1>
          </div>

          {/* Body Paragraphs: 70–80% width */}
          <div className="w-full max-w-4xl lg:max-w-5xl space-y-6 text-navy/80 text-base sm:text-lg md:text-xl font-light leading-relaxed">
            <div className="story-hero-p1">
              <p className="story-zoom-body">
                SGSITS MUN was born from a simple belief: meaningful debate deserves a meaningful
                platform.
              </p>
              <p className="story-zoom-body mt-4">
                Hosted at Shri Govindram Seksaria Institute of Technology and Science, one of Madhya
                Pradesh’s leading engineering institutions, the conference grows from a campus with a
                long-standing culture of academic excellence, innovation and intellectual engagement.
              </p>
            </div>

            <div className="story-hero-p2 pt-2">
              <p className="story-zoom-body">
                At SGSITS, ideas have always found their way beyond the classroom — through questions,
                disagreements, conversations and the willingness to look at a problem from more than one
                perspective. SGSITS MUN gives that spirit a larger stage.
              </p>
            </div>
          </div>
        </div>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-20 md:mb-28 lg:mb-32" />

        {/* ========================================================
            SECTION 2 — A PLATFORM FOR PERSPECTIVE (2-COLUMN COMPOSITION)
        ========================================================= */}
        <div className="mb-20 md:mb-28 lg:mb-32">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
            {/* Left Column (approx 30–35% width) */}
            <div className="w-full lg:w-[35%] flex-shrink-0">
              <div className="story-platform-heading lg:sticky lg:top-36">
                <h2 className="story-zoom-sub font-display text-2xl sm:text-3xl md:text-4xl font-bold text-navy tracking-tight uppercase leading-snug">
                  A PLATFORM FOR
                  <span className="block text-navy/90">PERSPECTIVE</span>
                </h2>
                <div className="w-12 h-[2px] bg-[#082052] rounded-full mt-4" />
              </div>
            </div>

            {/* Right Column (approx 60–65% width) */}
            <div className="w-full lg:w-[65%] space-y-7 text-navy/80 text-base sm:text-lg md:text-xl font-light leading-relaxed">
              <div className="story-platform-p1">
                <p className="story-zoom-body">
                  For decades, SGSITS has been a destination for students who aspire to build, question
                  and lead. SGSITS MUN extends that culture beyond engineering and technology, creating a
                  space where students engage with questions of governance, security, rights, justice and
                  responsibility.
                </p>
              </div>

              <div className="story-platform-p2">
                <p className="story-zoom-body">
                  An MUN is more than a simulation of diplomacy. It is an exercise in listening before
                  responding, defending a position while understanding another, and finding common ground
                  without losing conviction.
                </p>
              </div>

              <div className="story-platform-p3">
                <p className="story-zoom-body">
                  Every delegate arrives with a different perspective. What brings them together is the same
                  pursuit — to question deeply, deliberate thoughtfully and leave the room with a broader
                  understanding of the world around them.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-20 md:mb-28 lg:mb-32" />

        {/* ========================================================
            SECTION 3 — OUR PURPOSE
        ========================================================= */}
        <div className="max-w-4xl lg:max-w-5xl">
          {/* Eyebrow */}
          <div className="story-purpose-eyebrow mb-3">
            <p className="story-zoom-sub uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-navy/60">
              OUR PURPOSE
            </p>
          </div>

          {/* Main Heading */}
          <div className="story-purpose-heading mb-6 md:mb-8">
            <h2 className="story-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-navy leading-tight">
              A leading institution.
              <span className="block text-navy/90">A wider conversation.</span>
            </h2>
          </div>

          {/* Body Paragraph with subtle emphasis on final phrase */}
          <div className="story-purpose-body text-navy/80 text-base sm:text-lg md:text-xl font-light leading-relaxed space-y-4">
            <p className="story-zoom-body">
              SGSITS MUN brings the spirit of one of Madhya Pradesh’s premier engineering institutions
              into a different arena — where technical minds meet questions of society, governance and the
              world, and{" "}
              <span className="story-purpose-final story-zoom-phrase italic font-normal text-navy font-display border-b border-navy/30 pb-0.5">
                where every perspective has a place at the table.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
