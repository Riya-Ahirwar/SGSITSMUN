"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function WhatIsMun() {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(".animate-item", { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }

    if (!containerRef.current) return;

    // Observe each section individually with IntersectionObserver for replayable animations
    const sections = containerRef.current.querySelectorAll(".mun-section");
    const sectionTimelines = new Map();

    sections.forEach((sec, idx) => {
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
      ".mun-zoom-heading, .mun-zoom-sub, .mun-zoom-body, .mun-zoom-quote, .mun-zoom-card"
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
      className="relative bg-cream text-navy min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 overflow-hidden"
    >
      {/* Scoped CSS for subtle, non-disruptive text zoom on hover and touch */}
      <style jsx>{`
        .mun-zoom-heading {
          display: inline-block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .mun-zoom-heading:hover,
        .mun-zoom-heading.is-touched {
          transform: scale(1.035);
        }

        .mun-zoom-sub {
          display: inline-block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .mun-zoom-sub:hover,
        .mun-zoom-sub.is-touched {
          transform: scale(1.025);
        }

        .mun-zoom-body {
          display: block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .mun-zoom-body:hover,
        .mun-zoom-body.is-touched {
          transform: scale(1.015);
        }

        .mun-zoom-quote {
          display: block;
          transform-origin: left center;
          transition: transform 300ms ease, color 300ms ease;
          will-change: transform;
          cursor: default;
        }
        .mun-zoom-quote:hover,
        .mun-zoom-quote.is-touched {
          transform: scale(1.02);
        }

        /* Timeline step card micro-animations */
        .step-timeline-item {
          transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 350ms ease, box-shadow 350ms ease;
        }
        .step-timeline-item:hover,
        .step-timeline-item.is-touched {
          transform: translateY(-4px);
        }
        .step-timeline-item:hover .step-accent-line,
        .step-timeline-item.is-touched .step-accent-line {
          width: 3.5rem;
          background-color: #082052;
        }
        .step-timeline-item:hover .step-num,
        .step-timeline-item.is-touched .step-num {
          transform: scale(1.06);
          color: #082052;
        }

        /* Skill block card hover */
        .skill-card {
          transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 350ms ease, box-shadow 350ms ease;
        }
        .skill-card:hover,
        .skill-card.is-touched {
          transform: translateY(-4px);
          border-color: rgba(8, 32, 82, 0.35);
          box-shadow: 0 12px 30px -10px rgba(4, 14, 36, 0.08);
        }
      `}</style>

      {/* Subtle ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/4 right-1/4 w-[750px] h-[750px] bg-navy/[0.025] rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/3 -left-32 w-[650px] h-[650px] bg-[#1e3a8a]/[0.03] rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      {/* Main container: 75–85% of viewport width on desktop */}
      <div className="w-full max-w-[85vw] 2xl:max-w-[1440px] mx-auto">
        {/* ========================================================
            SECTION 1 — HERO
        ========================================================= */}
        <section className="mun-section mb-24 md:mb-32 lg:mb-40">
          {/* Eyebrow */}
          <div className="animate-item mb-4">
            <p className="mun-zoom-sub uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-navy/60">
              THE MUN EXPERIENCE
            </p>
          </div>

          {/* Main Heading & Continuation Statement */}
          <div className="animate-item mb-6">
            <h1 className="mun-zoom-heading font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-navy leading-[1.12]">
              More than a conference.
            </h1>
          </div>

          <div className="animate-item mb-8">
            <p className="mun-zoom-sub font-display text-2xl sm:text-3xl md:text-4xl text-navy/80 font-medium tracking-tight">
              A room where ideas matter.
            </p>
          </div>

          {/* Supporting line */}
          <div className="animate-item mb-12">
            <p className="mun-zoom-body text-base sm:text-lg md:text-xl font-light text-navy/70 tracking-wide">
              Never attended an MUN before? Start here.
            </p>
          </div>

          {/* Visually distinct editorial quote block */}
          <div className="animate-item border-l-2 border-[#082052]/40 pl-6 sm:pl-8 py-3 my-10 max-w-4xl">
            <blockquote className="mun-zoom-quote font-display text-lg sm:text-xl md:text-2xl italic font-normal text-navy/90 leading-relaxed">
              “Model United Nations is a simulation of the world’s most important decision-making
              forums — but at its heart, it is about something much simpler: learning how to think,
              speak, negotiate and lead.”
            </blockquote>
          </div>
        </section>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-24 md:mb-32 lg:mb-40" />

        {/* ========================================================
            SECTION 2 — SO, WHAT EXACTLY IS AN MUN?
        ========================================================= */}
        <section className="mun-section mb-24 md:mb-32 lg:mb-40">
          {/* Eyebrow */}
          <div className="animate-item mb-6">
            <p className="mun-zoom-sub uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-navy/60">
              SO, WHAT EXACTLY IS AN MUN?
            </p>
          </div>

          {/* Editorial Flow */}
          <div className="max-w-4xl lg:max-w-5xl space-y-6 text-navy/80 text-base sm:text-lg md:text-xl font-light leading-relaxed">
            <p className="animate-item mun-zoom-body">
              Model United Nations, commonly known as MUN, is an academic simulation of the United
              Nations and other political institutions.
            </p>

            <p className="animate-item mun-zoom-body">
              You step into the role of a delegate — representing a country, political
              representative or character depending on your committee.
            </p>

            <p className="animate-item mun-zoom-body">
              For the duration of the conference, you are no longer simply a student.
            </p>

            {/* Emphasized Callout Statement */}
            <div className="animate-item py-6 my-4 border-y border-navy/15">
              <p className="mun-zoom-heading font-display text-2xl sm:text-3xl md:text-4xl text-navy italic font-medium leading-snug">
                “You become a voice with a position to defend.”
              </p>
            </div>

            <p className="animate-item mun-zoom-body">
              You research your assigned role, understand the issues before your committee, debate
              with other delegates, form alliances, negotiate solutions and work towards a final
              outcome.
            </p>

            {/* Concise 3-Line Summary */}
            <div className="animate-item pt-8 space-y-2 border-t border-navy/10">
              <p className="mun-zoom-sub text-lg sm:text-xl md:text-2xl font-display font-medium text-navy">
                It is competitive.
              </p>
              <p className="mun-zoom-sub text-lg sm:text-xl md:text-2xl font-display font-medium text-navy">
                It is collaborative.
              </p>
              <p className="mun-zoom-sub text-lg sm:text-xl md:text-2xl font-display font-medium text-navy">
                And most importantly, it is an exercise in understanding perspectives beyond your own.
              </p>
            </div>
          </div>
        </section>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-24 md:mb-32 lg:mb-40" />

        {/* ========================================================
            SECTION 3 — WHAT ACTUALLY HAPPENS? (EDITORIAL TIMELINE)
        ========================================================= */}
        <section className="mun-section mb-24 md:mb-32 lg:mb-40">
          <div className="animate-item mb-14 md:mb-18">
            <h2 className="mun-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy">
              WHAT ACTUALLY HAPPENS?
            </h2>
            <div className="w-16 h-[2px] bg-[#082052] rounded-full mt-4" />
          </div>

          {/* Sequential 5 Steps Timeline */}
          <div className="space-y-10 md:space-y-14">
            {/* Step 01 */}
            <div className="animate-item step-timeline-item p-6 sm:p-8 md:p-10 rounded-xl bg-white/40 border border-navy/10 relative">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <div className="flex-shrink-0 flex items-center md:flex-col gap-3">
                  <span className="step-num font-display text-4xl sm:text-5xl md:text-6xl font-bold text-navy/40 transition-transform duration-300">
                    01
                  </span>
                  <div className="step-accent-line w-8 h-[2px] bg-navy/30 transition-all duration-300" />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="mun-zoom-sub font-display text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                    01 — YOU REPRESENT
                  </h3>
                  <div className="text-navy/80 text-base sm:text-lg font-light leading-relaxed space-y-3">
                    <p className="mun-zoom-body">
                      Before the conference, you receive your portfolio — the country, representative
                      or character you will be playing.
                    </p>
                    <p className="mun-zoom-body">
                      Your first task is to understand their position.
                    </p>
                    <div className="pt-2 pl-4 border-l border-navy/20 space-y-1 italic text-navy/90 text-sm sm:text-base">
                      <p>What do they believe?</p>
                      <p>What do they want?</p>
                      <p>What are their interests?</p>
                      <p>And where do they stand on the issue?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 02 */}
            <div className="animate-item step-timeline-item p-6 sm:p-8 md:p-10 rounded-xl bg-white/40 border border-navy/10 relative">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <div className="flex-shrink-0 flex items-center md:flex-col gap-3">
                  <span className="step-num font-display text-4xl sm:text-5xl md:text-6xl font-bold text-navy/40 transition-transform duration-300">
                    02
                  </span>
                  <div className="step-accent-line w-8 h-[2px] bg-navy/30 transition-all duration-300" />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="mun-zoom-sub font-display text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                    02 — YOU RESEARCH
                  </h3>
                  <div className="text-navy/80 text-base sm:text-lg font-light leading-relaxed space-y-3">
                    <p className="mun-zoom-body">
                      You don’t walk into committee and simply speak your mind.
                    </p>
                    <p className="mun-zoom-body">
                      You come prepared.
                    </p>
                    <p className="mun-zoom-body">
                      You research the agenda, understand the background of the issue, study your
                      portfolio’s position and arrive with arguments, facts and possible solutions.
                    </p>
                    <p className="mun-zoom-sub font-medium text-navy pt-2">
                      Preparation becomes your advantage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 03 */}
            <div className="animate-item step-timeline-item p-6 sm:p-8 md:p-10 rounded-xl bg-white/40 border border-navy/10 relative">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <div className="flex-shrink-0 flex items-center md:flex-col gap-3">
                  <span className="step-num font-display text-4xl sm:text-5xl md:text-6xl font-bold text-navy/40 transition-transform duration-300">
                    03
                  </span>
                  <div className="step-accent-line w-8 h-[2px] bg-navy/30 transition-all duration-300" />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="mun-zoom-sub font-display text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                    03 — YOU DEBATE
                  </h3>
                  <div className="text-navy/80 text-base sm:text-lg font-light leading-relaxed space-y-3">
                    <p className="mun-zoom-body">
                      Once committee begins, the room comes alive.
                    </p>
                    <p className="mun-zoom-body">
                      Delegates present arguments, challenge opposing viewpoints, raise questions
                      and defend their positions.
                    </p>
                    <p className="mun-zoom-body">
                      You will learn to speak clearly — even when the room is listening.
                    </p>
                    <p className="mun-zoom-sub font-medium text-navy pt-2">
                      This is where confidence is built.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 04 */}
            <div className="animate-item step-timeline-item p-6 sm:p-8 md:p-10 rounded-xl bg-white/40 border border-navy/10 relative">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <div className="flex-shrink-0 flex items-center md:flex-col gap-3">
                  <span className="step-num font-display text-4xl sm:text-5xl md:text-6xl font-bold text-navy/40 transition-transform duration-300">
                    04
                  </span>
                  <div className="step-accent-line w-8 h-[2px] bg-navy/30 transition-all duration-300" />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="mun-zoom-sub font-display text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                    04 — YOU NEGOTIATE
                  </h3>
                  <div className="text-navy/80 text-base sm:text-lg font-light leading-relaxed space-y-3">
                    <p className="mun-zoom-body">
                      MUN isn’t just about giving speeches.
                    </p>
                    <p className="mun-zoom-body">
                      Some of the most important work happens between them.
                    </p>
                    <div className="py-1 space-y-1">
                      <p className="mun-zoom-body">You find people who share your objectives.</p>
                      <p className="mun-zoom-body">You discuss ideas.</p>
                      <p className="mun-zoom-body">You compromise.</p>
                      <p className="mun-zoom-body">You build alliances.</p>
                    </div>
                    <p className="mun-zoom-sub font-medium text-navy pt-2">
                      Because getting your idea accepted is often more difficult — and more valuable
                      — than simply having the idea.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 05 */}
            <div className="animate-item step-timeline-item p-6 sm:p-8 md:p-10 rounded-xl bg-white/40 border border-navy/10 relative">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <div className="flex-shrink-0 flex items-center md:flex-col gap-3">
                  <span className="step-num font-display text-4xl sm:text-5xl md:text-6xl font-bold text-navy/40 transition-transform duration-300">
                    05
                  </span>
                  <div className="step-accent-line w-8 h-[2px] bg-navy/30 transition-all duration-300" />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="mun-zoom-sub font-display text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                    05 — YOU CREATE
                  </h3>
                  <div className="text-navy/80 text-base sm:text-lg font-light leading-relaxed space-y-3">
                    <p className="mun-zoom-body">
                      Eventually, discussion has to become something concrete.
                    </p>
                    <p className="mun-zoom-body">
                      Delegates work together to formulate solutions, clauses, directives or
                      resolutions, depending on the committee.
                    </p>
                    <p className="mun-zoom-body">
                      The objective is to turn debate into an outcome.
                    </p>
                    <p className="mun-zoom-sub font-medium text-navy pt-2">
                      Ideas become action.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-24 md:mb-32 lg:mb-40" />

        {/* ========================================================
            SECTION 4 — WHAT DOES A DAY AT MUN LOOK LIKE?
        ========================================================= */}
        <section className="mun-section mb-24 md:mb-32 lg:mb-40">
          <div className="animate-item mb-12 md:mb-16">
            <h2 className="mun-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy">
              WHAT DOES A DAY AT MUN LOOK LIKE?
            </h2>
            <div className="w-16 h-[2px] bg-[#082052] rounded-full mt-4" />
          </div>

          {/* Process Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-3 mb-14">
            {/* Step 1: OPENING */}
            <div className="animate-item p-5 rounded-lg bg-white/40 border border-navy/10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-navy/50 font-semibold block mb-2">
                  01 / PHASE
                </span>
                <h3 className="mun-zoom-sub font-display text-xl font-bold text-navy mb-3">
                  OPENING
                </h3>
                <p className="mun-zoom-body text-sm font-light text-navy/80 leading-relaxed">
                  The committee begins. Delegates are introduced, rules are established and the
                  agenda is set.
                </p>
              </div>
              <div className="hidden lg:block text-right pt-4 text-navy/30 text-lg">→</div>
            </div>

            {/* Step 2: DEBATE */}
            <div className="animate-item p-5 rounded-lg bg-white/40 border border-navy/10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-navy/50 font-semibold block mb-2">
                  02 / PHASE
                </span>
                <h3 className="mun-zoom-sub font-display text-xl font-bold text-navy mb-3">
                  DEBATE
                </h3>
                <p className="mun-zoom-body text-sm font-light text-navy/80 leading-relaxed">
                  Speeches, questions and moderated discussion begin.
                </p>
              </div>
              <div className="hidden lg:block text-right pt-4 text-navy/30 text-lg">→</div>
            </div>

            {/* Step 3: CAUCUS */}
            <div className="animate-item p-5 rounded-lg bg-white/40 border border-navy/10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-navy/50 font-semibold block mb-2">
                  03 / PHASE
                </span>
                <h3 className="mun-zoom-sub font-display text-xl font-bold text-navy mb-3">
                  CAUCUS
                </h3>
                <p className="mun-zoom-body text-sm font-light text-navy/80 leading-relaxed">
                  Delegates move around the room, meet one another and negotiate in smaller groups.
                </p>
              </div>
              <div className="hidden lg:block text-right pt-4 text-navy/30 text-lg">→</div>
            </div>

            {/* Step 4: DRAFTING */}
            <div className="animate-item p-5 rounded-lg bg-white/40 border border-navy/10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-navy/50 font-semibold block mb-2">
                  04 / PHASE
                </span>
                <h3 className="mun-zoom-sub font-display text-xl font-bold text-navy mb-3">
                  DRAFTING
                </h3>
                <p className="mun-zoom-body text-sm font-light text-navy/80 leading-relaxed">
                  Alliances begin turning their ideas into working documents and solutions.
                </p>
              </div>
              <div className="hidden lg:block text-right pt-4 text-navy/30 text-lg">→</div>
            </div>

            {/* Step 5: NEGOTIATION */}
            <div className="animate-item p-5 rounded-lg bg-white/40 border border-navy/10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-navy/50 font-semibold block mb-2">
                  05 / PHASE
                </span>
                <h3 className="mun-zoom-sub font-display text-xl font-bold text-navy mb-3">
                  NEGOTIATION
                </h3>
                <p className="mun-zoom-body text-sm font-light text-navy/80 leading-relaxed">
                  Different blocs attempt to reconcile competing positions.
                </p>
              </div>
              <div className="hidden lg:block text-right pt-4 text-navy/30 text-lg">→</div>
            </div>

            {/* Step 6: DECISION */}
            <div className="animate-item p-5 rounded-lg bg-white/40 border border-navy/10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-navy/50 font-semibold block mb-2">
                  06 / PHASE
                </span>
                <h3 className="mun-zoom-sub font-display text-xl font-bold text-navy mb-3">
                  DECISION
                </h3>
                <p className="mun-zoom-body text-sm font-light text-navy/80 leading-relaxed">
                  The committee considers the final proposals and reaches its outcome.
                </p>
              </div>
              <div className="hidden lg:block text-right pt-4 text-navy/30 text-lg">✓</div>
            </div>
          </div>

          {/* After Timeline Callout */}
          <div className="animate-item max-w-3xl pt-8 border-t border-navy/15 space-y-4">
            <p className="mun-zoom-sub uppercase tracking-[0.25em] text-xs md:text-sm font-bold text-navy/60">
              AND THEN?
            </p>
            <p className="mun-zoom-heading font-display text-2xl sm:text-3xl md:text-4xl font-normal text-navy leading-snug">
              You walk out knowing something you didn’t know when you walked in.
            </p>
          </div>
        </section>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-24 md:mb-32 lg:mb-40" />

        {/* ========================================================
            SECTION 5 — WHAT WILL YOU ACTUALLY LEARN?
        ========================================================= */}
        <section className="mun-section mb-24 md:mb-32 lg:mb-40">
          <div className="animate-item mb-4">
            <h2 className="mun-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy">
              WHAT WILL YOU ACTUALLY LEARN?
            </h2>
          </div>

          <div className="animate-item mb-12 space-y-1 text-base sm:text-lg md:text-xl font-light text-navy/80">
            <p className="mun-zoom-body">An MUN doesn’t give you a textbook.</p>
            <p className="mun-zoom-body font-medium text-navy">
              It gives you a room in which to practise.
            </p>
          </div>

          {/* 3 x 2 Grid on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Skill 1 */}
            <div className="animate-item skill-card p-6 sm:p-8 rounded-xl bg-white/40 border border-navy/10">
              <span className="text-xs uppercase tracking-widest text-navy/50 font-semibold block mb-3">
                SKILL 01
              </span>
              <h3 className="mun-zoom-sub font-display text-2xl font-bold text-navy mb-3">
                COMMUNICATION
              </h3>
              <p className="mun-zoom-body text-navy/80 text-base font-light leading-relaxed">
                Learn to articulate an idea clearly, structure an argument and speak with purpose.
              </p>
            </div>

            {/* Skill 2 */}
            <div className="animate-item skill-card p-6 sm:p-8 rounded-xl bg-white/40 border border-navy/10">
              <span className="text-xs uppercase tracking-widest text-navy/50 font-semibold block mb-3">
                SKILL 02
              </span>
              <h3 className="mun-zoom-sub font-display text-2xl font-bold text-navy mb-3">
                CRITICAL THINKING
              </h3>
              <p className="mun-zoom-body text-navy/80 text-base font-light leading-relaxed">
                Look beyond the obvious answer. Question assumptions. Analyse an issue from multiple
                perspectives.
              </p>
            </div>

            {/* Skill 3 */}
            <div className="animate-item skill-card p-6 sm:p-8 rounded-xl bg-white/40 border border-navy/10">
              <span className="text-xs uppercase tracking-widest text-navy/50 font-semibold block mb-3">
                SKILL 03
              </span>
              <h3 className="mun-zoom-sub font-display text-2xl font-bold text-navy mb-3">
                NEGOTIATION
              </h3>
              <p className="mun-zoom-body text-navy/80 text-base font-light leading-relaxed">
                Learn when to stand your ground, when to compromise and how to bring people towards
                your position.
              </p>
            </div>

            {/* Skill 4 */}
            <div className="animate-item skill-card p-6 sm:p-8 rounded-xl bg-white/40 border border-navy/10">
              <span className="text-xs uppercase tracking-widest text-navy/50 font-semibold block mb-3">
                SKILL 04
              </span>
              <h3 className="mun-zoom-sub font-display text-2xl font-bold text-navy mb-3">
                RESEARCH
              </h3>
              <p className="mun-zoom-body text-navy/80 text-base font-light leading-relaxed">
                Separate information from noise and build arguments that are supported by evidence.
              </p>
            </div>

            {/* Skill 5 */}
            <div className="animate-item skill-card p-6 sm:p-8 rounded-xl bg-white/40 border border-navy/10">
              <span className="text-xs uppercase tracking-widest text-navy/50 font-semibold block mb-3">
                SKILL 05
              </span>
              <h3 className="mun-zoom-sub font-display text-2xl font-bold text-navy mb-3">
                LEADERSHIP
              </h3>
              <p className="mun-zoom-body text-navy/80 text-base font-light leading-relaxed">
                Take initiative, influence a room and become comfortable making decisions.
              </p>
            </div>

            {/* Skill 6 */}
            <div className="animate-item skill-card p-6 sm:p-8 rounded-xl bg-white/40 border border-navy/10">
              <span className="text-xs uppercase tracking-widest text-navy/50 font-semibold block mb-3">
                SKILL 06
              </span>
              <h3 className="mun-zoom-sub font-display text-2xl font-bold text-navy mb-3">
                COLLABORATION
              </h3>
              <p className="mun-zoom-body text-navy/80 text-base font-light leading-relaxed">
                Work with people you may disagree with — and still find a way forward.
              </p>
            </div>
          </div>
        </section>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-24 md:mb-32 lg:mb-40" />

        {/* ========================================================
            SECTION 6 — WHY DOES IT MATTER?
        ========================================================= */}
        <section className="mun-section mb-24 md:mb-32 lg:mb-40">
          <div className="animate-item mb-10">
            <h2 className="mun-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy">
              WHY DOES IT MATTER?
            </h2>
            <div className="w-16 h-[2px] bg-[#082052] rounded-full mt-4" />
          </div>

          <div className="max-w-4xl lg:max-w-5xl space-y-8">
            <p className="animate-item mun-zoom-body text-xl sm:text-2xl font-light text-navy/90">
              The value of MUN doesn’t end when committee does.
            </p>

            {/* Sequential "The ability..." statements */}
            <div className="space-y-5 border-l-2 border-[#082052]/30 pl-6 sm:pl-8 py-2">
              <p className="animate-item mun-zoom-heading font-display text-xl sm:text-2xl md:text-3xl text-navy">
                The ability to speak confidently in a room full of people matters.
              </p>
              <p className="animate-item mun-zoom-heading font-display text-xl sm:text-2xl md:text-3xl text-navy">
                The ability to defend an idea without becoming defensive matters.
              </p>
              <p className="animate-item mun-zoom-heading font-display text-xl sm:text-2xl md:text-3xl text-navy">
                The ability to listen to an opposing argument and understand it before responding
                matters.
              </p>
              <p className="animate-item mun-zoom-heading font-display text-xl sm:text-2xl md:text-3xl text-navy">
                The ability to bring people together around an idea matters.
              </p>
            </div>

            {/* Conclusion */}
            <div className="animate-item pt-6">
              <p className="mun-zoom-body text-base sm:text-lg md:text-xl font-light text-navy/80 leading-relaxed max-w-4xl">
                These are skills that follow you far beyond an MUN — into university, interviews,
                presentations, leadership roles, entrepreneurship and everyday life.
              </p>
            </div>
          </div>
        </section>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-24 md:mb-32 lg:mb-40" />

        {/* ========================================================
            SECTION 7 — YOUR FIRST MUN
        ========================================================= */}
        <section className="mun-section mb-24 md:mb-32 lg:mb-40">
          <div className="animate-item mb-10">
            <h2 className="mun-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy">
              YOUR FIRST MUN
            </h2>
            <div className="w-16 h-[2px] bg-[#082052] rounded-full mt-4" />
          </div>

          <div className="max-w-4xl space-y-6 text-base sm:text-lg md:text-xl font-light text-navy/80 leading-relaxed mb-12">
            <p className="animate-item mun-zoom-body">You don’t need to be an experienced speaker.</p>
            <p className="animate-item mun-zoom-body">
              You don’t need to know international politics inside out.
            </p>
            <p className="animate-item mun-zoom-body">
              You don’t need to have attended ten conferences before this one.
            </p>
            <p className="animate-item mun-zoom-body font-medium text-navy">
              You just need to be willing to prepare, participate and put yourself in the room.
            </p>
          </div>

          {/* Visually emphasized reassuring block */}
          <div className="animate-item p-8 sm:p-10 rounded-2xl bg-white/50 border border-navy/15 max-w-3xl mb-12 space-y-3">
            <p className="mun-zoom-body text-base sm:text-lg text-navy/80">
              Your first speech might not be perfect.
            </p>
            <p className="mun-zoom-body text-base sm:text-lg text-navy/80">You might lose an argument.</p>
            <p className="mun-zoom-body text-base sm:text-lg text-navy/80">You might forget your words.</p>
            <p className="mun-zoom-body text-base sm:text-lg text-navy/80">
              You might walk into committee nervous.
            </p>
            <p className="mun-zoom-sub font-display text-2xl sm:text-3xl font-bold text-navy pt-2">
              That’s okay.
            </p>
          </div>

          {/* Closing Powerful Statement */}
          <div className="animate-item max-w-4xl space-y-3 pt-4">
            <p className="mun-zoom-body text-lg sm:text-xl text-navy/70">
              The point isn’t to arrive as the best delegate in the room.
            </p>
            <p className="mun-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight">
              It’s to leave better than when you arrived.
            </p>
          </div>
        </section>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-24 md:mb-32 lg:mb-40" />

        {/* ========================================================
            SECTION 8 — FROM DELEGATE TO DECISION-MAKER
        ========================================================= */}
        <section className="mun-section mb-24 md:mb-32 lg:mb-40">
          <div className="animate-item mb-10">
            <h2 className="mun-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy">
              FROM DELEGATE TO DECISION-MAKER
            </h2>
            <div className="w-16 h-[2px] bg-[#082052] rounded-full mt-4" />
          </div>

          <div className="max-w-4xl space-y-6 text-navy/80 text-base sm:text-lg md:text-xl font-light leading-relaxed">
            <div className="animate-item space-y-1 mb-8">
              <p className="mun-zoom-body">An MUN teaches you something surprisingly powerful:</p>
              <p className="mun-zoom-sub font-display text-2xl sm:text-3xl font-medium text-navy italic">
                There is rarely only one side to a question.
              </p>
            </div>

            <p className="animate-item mun-zoom-body">
              You learn to argue your position while understanding someone else’s.
            </p>
            <p className="animate-item mun-zoom-body">
              You learn that disagreement doesn’t have to mean conflict.
            </p>
            <p className="animate-item mun-zoom-body">
              You learn that leadership isn’t always about speaking the loudest.
            </p>

            <div className="animate-item pt-6">
              <p className="mun-zoom-heading font-display text-2xl sm:text-3xl md:text-4xl font-medium text-navy leading-snug">
                And you discover that your voice becomes more powerful when it is backed by thought,
                preparation and purpose.
              </p>
            </div>
          </div>
        </section>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-24 md:mb-32 lg:mb-40" />

        {/* ========================================================
            SECTION 9 — THE PRISM CONNECTION
        ========================================================= */}
        <section className="mun-section mb-24 md:mb-32 lg:mb-40">
          <div className="p-8 sm:p-12 md:p-16 rounded-2xl bg-white/50 border border-navy/15 relative overflow-hidden">
            {/* Subtle background glow */}
            <div
              className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 bg-navy/[0.04] rounded-full blur-2xl"
              aria-hidden="true"
            />

            {/* Eyebrow */}
            <div className="animate-item mb-4">
              <p className="mun-zoom-sub uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-navy/60">
                THE PRISM CONNECTION
              </p>
            </div>

            {/* Main Heading */}
            <div className="animate-item mb-8">
              <h2 className="mun-zoom-heading font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy">
                FIVE PERSPECTIVES. ONE DIALOGUE.
              </h2>
            </div>

            {/* Quote Block */}
            <div className="animate-item max-w-3xl space-y-4 text-navy/90 font-display text-lg sm:text-xl md:text-2xl leading-relaxed italic border-l-2 border-[#082052]/40 pl-6 sm:pl-8 py-2">
              <p className="mun-zoom-quote">
                “Every delegate enters the room carrying a different perspective.
              </p>
              <p className="mun-zoom-quote">
                MUN asks you to do something difficult — and valuable:
              </p>
              <p className="mun-zoom-quote">
                understand the perspectives around you without losing your own.
              </p>
              <p className="mun-zoom-quote font-bold not-italic font-sans text-base sm:text-lg uppercase tracking-wider text-navy pt-2">
                That is the essence of PRISM.”
              </p>
            </div>
          </div>
        </section>

        {/* ELEGANT EDITORIAL DIVIDER */}
        <div className="w-full h-[1px] bg-navy/15 mb-24 md:mb-32 lg:mb-40" />

        {/* ========================================================
            SECTION 10 — FINAL CTA
        ========================================================= */}
        <section className="mun-section pb-12">
          <div className="max-w-4xl space-y-8">
            <div className="animate-item">
              <h2 className="mun-zoom-heading font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-navy">
                READY TO TAKE THE FLOOR?
              </h2>
            </div>

            <div className="animate-item space-y-1 text-lg sm:text-xl font-light text-navy/80">
              <p className="mun-zoom-body">Your first MUN doesn’t have to be perfect.</p>
              <p className="mun-zoom-sub font-medium text-navy text-xl sm:text-2xl font-display">
                It just has to begin.
              </p>
            </div>

            <div className="animate-item pt-4">
              <Link
                href="/#register"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-navy text-cream font-semibold text-base sm:text-lg tracking-wide border border-navy/20 hover:bg-[#082052] hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>REGISTER AS A DELEGATE</span>
                <span>→</span>
              </Link>
            </div>

            <div className="animate-item pt-10 border-t border-navy/10">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-navy/50">
                SGSITS MUN 2026 · 10 &amp; 11 OCTOBER · INDORE
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
