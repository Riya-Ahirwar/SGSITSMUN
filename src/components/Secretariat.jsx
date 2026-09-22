"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { conferenceLeadership, executiveTeam } from "@/data/site";

export default function Secretariat() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leadershipRef = useRef(null);
  const execHeaderRef = useRef(null);
  const execCardsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const ctx = gsap.context(() => {
      // 1. Header fade & slide
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
            clearProps: "transform,opacity",
          }
        );
      }

      // 2. Conference Leadership Cards staggered reveal
      const leadCards = gsap.utils.toArray(".lead-card");
      if (leadCards.length > 0 && leadershipRef.current) {
        gsap.fromTo(
          leadCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: leadershipRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
            clearProps: "transform,opacity",
          }
        );
      }

      // 3. Executive Team Header
      if (execHeaderRef.current) {
        gsap.fromTo(
          execHeaderRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: execHeaderRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
            clearProps: "transform,opacity",
          }
        );
      }

      // 4. USG Cards staggered reveal
      const usgCards = gsap.utils.toArray(".usg-card");
      if (usgCards.length > 0 && execCardsRef.current) {
        gsap.fromTo(
          usgCards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: execCardsRef.current,
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
      id="secretariat"
      ref={sectionRef}
      className="relative bg-[#040e24] text-cream px-6 lg:px-12 py-24 md:py-32 lg:py-36 overflow-hidden select-none"
    >
      {/* Ambient background glow orbs */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#1e3a8a]/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -left-36 w-96 h-96 rounded-full bg-cream/5 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-36 right-12 w-80 h-80 rounded-full bg-[#082052]/35 blur-[100px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* ========================================================
            PAGE HEADER / INTRO
        ========================================================= */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16 md:mb-24"
        >
          <div className="max-w-3xl">
            {/* EYEBROW */}
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-cream/60 mb-3">
              THE SECRETARIAT
            </p>

            {/* MAIN HEADING */}
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream mb-6 leading-[1.12]">
              THE PEOPLE BEHIND
              <span className="block text-cream/90">THE CONFERENCE.</span>
            </h2>

            {/* INTRODUCTION & FOLLOW-UP LINE */}
            <div className="font-sans text-base sm:text-lg text-cream/75 font-light leading-relaxed space-y-2 max-w-2xl">
              <p>
                SGSITS MUN 2026 is shaped by a team that works long before the first gavel falls...
              </p>
              <p className="text-cream/90 font-normal">
                Meet the leadership guiding this year&apos;s conference.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE POSTER-INSPIRED ACCENT */}
          <div className="flex flex-col items-start lg:items-end text-left lg:text-right space-y-1.5 font-mono text-xs md:text-sm tracking-[0.22em] text-cream/50 pt-2 border-l lg:border-l-0 lg:border-r border-cream/15 pl-4 lg:pl-0 lg:pr-4">
            <span className="hover:text-cream/80 transition-colors">PEOPLE</span>
            <span className="hover:text-cream/80 transition-colors">PERSPECTIVES</span>
            <span className="hover:text-cream/80 transition-colors">PURPOSE</span>
            <span className="text-cream/85 font-semibold">A STRONGER TOMORROW</span>
          </div>
        </div>

        {/* ========================================================
            SECTION 1 — CONFERENCE LEADERSHIP (4 LARGE CARDS)
        ========================================================= */}
        <div className="mb-24 md:mb-32">
          {/* SECTION LABEL DIVIDER */}
          <div className="flex items-center gap-4 mb-10 md:mb-14">
            <span className="h-[1px] bg-cream/15 flex-grow" />
            <span className="font-mono uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-cream/70 px-3">
              CONFERENCE LEADERSHIP
            </span>
            <span className="h-[1px] bg-cream/15 flex-grow" />
          </div>

          {/* 2 × 2 LARGE LEADERSHIP CARDS GRID */}
          <div
            ref={leadershipRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch"
          >
            {conferenceLeadership.map((leader) => (
              <div
                key={leader.name}
                tabIndex={0}
                className="lead-card group relative flex flex-col sm:flex-row items-center sm:items-stretch gap-6 sm:gap-7 p-6 sm:p-7 rounded-2xl bg-[#081a3e]/70 border border-cream/15 hover:border-[#7eb8f7]/50 hover:bg-[#0c2352]/85 transition-all duration-400 ease-out hover:-translate-y-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_45px_rgba(4,14,36,0.8),0_0_25px_rgba(126,184,247,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7eb8f7]/60 cursor-default"
              >
                {/* LARGE PORTRAIT / PHOTO AREA */}
                <div className="relative w-36 h-48 sm:w-40 sm:h-52 md:w-44 md:h-56 flex-shrink-0 rounded-xl overflow-hidden border border-cream/20 bg-navy shadow-md">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="(max-width: 640px) 150px, (max-width: 768px) 170px, 200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040e24]/65 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* TEXT CONTENT HIERARCHY */}
                <div className="flex flex-col justify-center text-center sm:text-left py-1 min-w-0 flex-1">
                  {/* DOMINANT NAME */}
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-cream mb-1 group-hover:text-white transition-colors duration-300">
                    {leader.name}
                  </h3>

                  {/* FULL DESIGNATION */}
                  <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-[#7eb8f7] uppercase font-semibold mb-2.5">
                    {leader.role}
                  </p>

                  {/* GOLDEN ACCENT DIVIDER RULE */}
                  <span className="w-6 h-[2px] bg-[#e5a93c] rounded-full mb-3.5 mx-auto sm:mx-0 group-hover:w-10 transition-all duration-300" />

                  {/* ONE-LINE ROLE DESCRIPTION */}
                  <p className="font-sans text-xs sm:text-sm text-cream/70 font-light leading-relaxed max-w-sm group-hover:text-cream/90 transition-colors duration-300">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SECTION 2 — THE EXECUTIVE TEAM (5 SMALL USG CARDS)
        ========================================================= */}
        <div>
          {/* SECTION LABEL DIVIDER */}
          <div className="flex items-center gap-4 mb-8">
            <span className="h-[1px] bg-cream/15 flex-grow" />
            <span className="font-mono uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-cream/70 px-3">
              THE EXECUTIVE TEAM
            </span>
            <span className="h-[1px] bg-cream/15 flex-grow" />
          </div>

          {/* HEADING & DESCRIPTION */}
          <div ref={execHeaderRef} className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-cream mb-3">
              THE TEAM THAT MAKES IT HAPPEN.
            </h3>
            <p className="font-sans text-xs sm:text-sm md:text-base text-cream/65 font-light leading-relaxed">
              Behind every committee, delegate experience and moving part is a team working in coordination.
            </p>
          </div>

          {/* USG 3 + 2 COMPOSITION */}
          <div ref={execCardsRef} className="space-y-5">
            {/* FIRST ROW — 3 CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {executiveTeam.slice(0, 3).map((usg) => (
                <div
                  key={usg.name}
                  tabIndex={0}
                  className="usg-card group relative flex items-center gap-4 p-4 rounded-xl bg-[#081a3e]/55 border border-cream/15 hover:border-cream/35 hover:bg-[#0c2352]/75 transition-all duration-300 ease-out hover:-translate-y-1 shadow-[0_6px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_28px_rgba(4,14,36,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7eb8f7]/50 cursor-default"
                >
                  {/* SMALL PORTRAIT */}
                  <div className="relative w-16 h-20 sm:w-18 sm:h-22 rounded-lg overflow-hidden flex-shrink-0 border border-cream/20 bg-navy">
                    <Image
                      src={usg.image}
                      alt={usg.name}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040e24]/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* NAME & DESIGNATION ONLY (NO BIO) */}
                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    <h4 className="font-display text-sm sm:text-base font-bold text-cream tracking-wide truncate group-hover:text-white transition-colors duration-200">
                      {usg.name}
                    </h4>
                    <p className="font-mono text-[10px] sm:text-xs text-[#7eb8f7] uppercase tracking-wider font-medium mt-1 leading-snug">
                      {usg.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* SECOND ROW — 2 CARDS CENTERED */}
            <div className="flex flex-col sm:flex-row justify-center gap-5 max-w-4xl mx-auto">
              {executiveTeam.slice(3, 5).map((usg) => (
                <div
                  key={usg.name}
                  tabIndex={0}
                  className="usg-card group relative flex items-center gap-4 p-4 rounded-xl bg-[#081a3e]/55 border border-cream/15 hover:border-cream/35 hover:bg-[#0c2352]/75 transition-all duration-300 ease-out hover:-translate-y-1 shadow-[0_6px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_28px_rgba(4,14,36,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7eb8f7]/50 cursor-default w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.85rem)]"
                >
                  {/* SMALL PORTRAIT */}
                  <div className="relative w-16 h-20 sm:w-18 sm:h-22 rounded-lg overflow-hidden flex-shrink-0 border border-cream/20 bg-navy">
                    <Image
                      src={usg.image}
                      alt={usg.name}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040e24]/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* NAME & DESIGNATION ONLY (NO BIO) */}
                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    <h4 className="font-display text-sm sm:text-base font-bold text-cream tracking-wide truncate group-hover:text-white transition-colors duration-200">
                      {usg.name}
                    </h4>
                    <p className="font-mono text-[10px] sm:text-xs text-[#7eb8f7] uppercase tracking-wider font-medium mt-1 leading-snug">
                      {usg.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
