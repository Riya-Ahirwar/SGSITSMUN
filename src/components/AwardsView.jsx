"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const awards = [
  {
    num: "01",
    tag: "01 — BEST DELEGATE",
    title: "Best Delegate",
    shortDesc: "The highest individual recognition in each committee.",
    explanation:
      "Awarded to the delegate who demonstrates a strong combination of research, argumentation, diplomacy, strategy and consistent participation throughout the committee.",
  },
  {
    num: "02",
    tag: "02 — HIGH COMMENDATION",
    title: "High Commendation",
    shortDesc: "For delegates who consistently contribute to the direction of debate.",
    explanation:
      "Recognising delegates who demonstrate strong preparation, meaningful participation and effective engagement with the committee.",
  },
  {
    num: "03",
    tag: "03 — SPECIAL MENTION",
    title: "Special Mention",
    shortDesc: "For a delegate whose contribution deserves recognition.",
    explanation:
      "Awarded for a particularly noteworthy contribution, argument, negotiation, initiative or moment that adds value to the committee.",
  },
  {
    num: "04",
    tag: "04 — VERBAL MENTION",
    title: "Verbal Mention",
    shortDesc: "For delegates who make their presence felt.",
    explanation:
      "A verbal recognition given by the Executive Board to delegates who demonstrate promising participation, thoughtful contributions, strong preparation or noticeable improvement during committee.",
  },
  {
    num: "05",
    tag: "05 — BEST DELEGATION",
    title: "Best Delegation",
    shortDesc: "For the delegation that performs strongest as a team.",
    explanation:
      "Awarded to the school or college delegation whose delegates collectively demonstrate preparation, participation, coordination and overall performance across the conference.",
    fullWidth: true,
  },
];

const qualities = [
  {
    index: "01",
    title: "PREPARATION",
    desc: "Know your portfolio. Know your agenda. Come prepared.",
  },
  {
    index: "02",
    title: "SUBSTANCE",
    desc: "Strong arguments matter more than simply speaking often.",
  },
  {
    index: "03",
    title: "DIPLOMACY",
    desc: "Build relationships, negotiate intelligently and know when to compromise.",
  },
  {
    index: "04",
    title: "PRESENCE",
    desc: "Contribute consistently and make your interventions count.",
  },
  {
    index: "05",
    title: "STRATEGY",
    desc: "Understand the room, identify opportunities and move the discussion forward.",
  },
  {
    index: "06",
    title: "INITIATIVE",
    desc: "Don’t wait for the committee to come to you. Take an active role in shaping it.",
  },
];

export default function AwardsView() {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(".animate-item", { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }

    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll(".award-section");
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
      ".award-zoom-heading, .award-zoom-sub, .award-zoom-body"
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
      {/* Scoped CSS for refined card transitions */}
      <style jsx>{`
        .award-zoom-heading {
          display: inline-block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .award-zoom-heading:hover,
        .award-zoom-heading.is-touched {
          transform: scale(1.035);
        }

        .award-zoom-sub {
          display: inline-block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .award-zoom-sub:hover,
        .award-zoom-sub.is-touched {
          transform: scale(1.025);
        }

        .award-zoom-body {
          display: block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .award-zoom-body:hover,
        .award-zoom-body.is-touched {
          transform: scale(1.015);
        }

        /* Award Card Hover Animation */
        .award-card {
          transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 350ms ease, box-shadow 350ms ease, background-color 350ms ease;
        }
        .award-card:hover,
        .award-card.is-touched {
          transform: translateY(-6px) scale(1.01);
          border-color: rgba(8, 32, 82, 0.35);
          box-shadow: 0 16px 36px -10px rgba(4, 14, 36, 0.1);
          background-color: rgba(255, 255, 255, 0.7);
        }
        .award-card:hover .award-accent-line,
        .award-card.is-touched .award-accent-line {
          width: 3.5rem;
          background-color: #082052;
        }
        .award-card:hover .award-index-num,
        .award-card.is-touched .award-index-num {
          transform: translateX(4px);
          color: #082052;
        }

        /* Quality Block Hover Animation */
        .quality-card {
          transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 350ms ease, box-shadow 350ms ease, background-color 350ms ease;
        }
        .quality-card:hover,
        .quality-card.is-touched {
          transform: translateY(-4px) scale(1.01);
          border-color: rgba(8, 32, 82, 0.3);
          box-shadow: 0 12px 28px -10px rgba(4, 14, 36, 0.08);
          background-color: rgba(255, 255, 255, 0.7);
        }
        .quality-card:hover .quality-index,
        .quality-card.is-touched .quality-index {
          transform: translateX(4px);
          color: #082052;
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
            SECTION 1 — AWARDS HERO
        ========================================================= */}
        <section className="award-section mb-20 md:mb-28 lg:mb-32">
          {/* Eyebrow */}
          <div className="animate-item mb-4">
            <p className="award-zoom-sub uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-navy/60">
              DELEGATE DESK
            </p>
          </div>

          {/* Main Heading */}
          <div className="animate-item mb-6">
            <h1 className="award-zoom-heading font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-navy leading-[1.12]">
              Recognition
            </h1>
          </div>

          {/* Intro */}
          <div className="animate-item max-w-4xl lg:max-w-5xl">
            <p className="award-zoom-body text-navy/80 text-base sm:text-lg md:text-xl font-light leading-relaxed">
              Debate is about more than speaking. It is about the quality of your arguments, the way
              you navigate the room, the positions you build, and the impact you have on the
              committee.
            </p>
          </div>
        </section>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-20 md:mb-28 lg:mb-32" />

        {/* ========================================================
            SECTION 2 — DELEGATE AWARDS
        ========================================================= */}
        <section className="award-section mb-24 md:mb-32 lg:mb-40">
          <div className="animate-item mb-12 md:mb-16">
            <h2 className="award-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy">
              Delegate Awards
            </h2>
            <div className="w-16 h-[2px] bg-[#082052] rounded-full mt-4" />
          </div>

          {/* Editorial Grid: 2 columns on desktop, Best Delegation spanning full width */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {awards.map((award) => (
              <div
                key={award.num}
                className={`animate-item award-card p-8 sm:p-10 rounded-2xl bg-white/40 border border-navy/15 flex flex-col justify-between ${
                  award.fullWidth ? "lg:col-span-2" : ""
                }`}
              >
                <div>
                  {/* Top Bar with Number & Accent Line */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="award-index-num font-display text-2xl sm:text-3xl font-bold text-navy/40 transition-transform duration-300">
                      {award.num}
                    </span>
                    <div className="award-accent-line w-8 h-[2px] bg-navy/20 transition-all duration-300" />
                  </div>

                  {/* Award Name */}
                  <h3 className="award-zoom-heading font-display text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-3">
                    {award.title}
                  </h3>

                  {/* Short Description */}
                  <p className="award-zoom-sub font-display text-base sm:text-lg text-navy/90 font-medium italic mb-4">
                    {award.shortDesc}
                  </p>
                </div>

                {/* Detailed Explanation */}
                <div className="pt-4 border-t border-navy/10 mt-2">
                  <p className="award-zoom-body text-navy/80 text-sm sm:text-base font-light leading-relaxed">
                    {award.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-24 md:mb-32 lg:mb-40" />

        {/* ========================================================
            SECTION 3 — WHAT GETS YOU NOTICED?
        ========================================================= */}
        <section className="award-section mb-12">
          <div className="animate-item mb-12 md:mb-16">
            <h2 className="award-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy">
              WHAT GETS YOU NOTICED?
            </h2>
            <div className="w-16 h-[2px] bg-[#082052] rounded-full mt-4" />
          </div>

          {/* 3 Columns × 2 Rows on Desktop, 1 Column on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {qualities.map((item) => (
              <div
                key={item.index}
                className="animate-item quality-card p-6 sm:p-8 rounded-xl bg-white/40 border border-navy/15 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="quality-index text-xs uppercase tracking-widest font-semibold text-navy/40 transition-transform duration-300">
                      QUALITY {item.index}
                    </span>
                  </div>
                  <h3 className="award-zoom-sub font-display text-2xl font-bold text-navy mb-3">
                    {item.title}
                  </h3>
                  <p className="award-zoom-body text-navy/80 text-base font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
