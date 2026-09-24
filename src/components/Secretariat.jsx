"use client";

import Image from "next/image";
import { conferenceLeadership, executiveTeam } from "@/data/site";

export default function Secretariat() {
  return (
    <section
      id="secretariat"
      className="relative bg-[#040e24] text-cream px-6 lg:px-12 py-16 md:py-24 overflow-hidden select-none"
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
            SECTION 1 — CONFERENCE LEADERSHIP (4 CARDS: 2x2)
        ========================================================= */}
        <div className="mb-16 md:mb-20">
          {/* SECTION LABEL DIVIDER */}
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <span className="h-[1px] bg-cream/20 flex-grow" />
            <span className="font-mono uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-cream/70 px-3">
              CONFERENCE LEADERSHIP
            </span>
            <span className="h-[1px] bg-cream/20 flex-grow" />
          </div>

          {/* 2 × 2 CONFERENCE LEADERSHIP CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {conferenceLeadership.map((leader) => (
              <div
                key={leader.name}
                className="group relative flex flex-row items-center gap-5 sm:gap-6 p-5 sm:p-7 rounded-2xl bg-[#07193d]/85 border border-[#1b3469] hover:border-[#5ba0ea]/50 hover:bg-[#0a204e] transition-all duration-300 shadow-[0_10px_35px_rgba(4,14,36,0.6)] hover:shadow-[0_15px_45px_rgba(4,14,36,0.85)] cursor-default"
              >
                {/* PORTRAIT PHOTO */}
                <div className="relative w-32 h-44 sm:w-36 sm:h-48 md:w-40 md:h-52 flex-shrink-0 rounded-xl overflow-hidden border border-cream/15 bg-navy shadow-md">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="(max-width: 640px) 130px, (max-width: 768px) 150px, 180px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>

                {/* TEXT CONTENT */}
                <div className="flex flex-col justify-center min-w-0 flex-1 py-1">
                  {/* NAME */}
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-white mb-1">
                    {leader.name}
                  </h3>

                  {/* ROLE */}
                  <p className="font-mono text-xs sm:text-sm tracking-[0.18em] text-[#5ba0ea] uppercase font-semibold mb-2.5">
                    {leader.role}
                  </p>

                  {/* GOLDEN ACCENT BAR */}
                  <span className="w-8 h-[2px] bg-[#d99b26] rounded-full mb-3 group-hover:w-12 transition-all duration-300" />

                  {/* BIO DESCRIPTION */}
                  {leader.bio && (
                    <p className="font-sans text-xs sm:text-sm text-cream/70 font-normal leading-relaxed max-w-sm">
                      {leader.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SECTION 2 — THE TEAM THAT MAKES IT HAPPEN (5 USGs: 3+2)
        ========================================================= */}
        <div>
          {/* HEADING & SUBTITLE */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              THE TEAM THAT MAKES IT HAPPEN.
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-cream/65 font-normal leading-relaxed">
              Behind every committee, delegate experience and moving part is a team working in coordination.
            </p>
          </div>

          {/* USG CARDS — ROW 1 (3 CARDS) & ROW 2 (2 CARDS CENTERED) */}
          <div className="space-y-6">
            {/* ROW 1 — 3 CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {executiveTeam.slice(0, 3).map((usg) => (
                <div
                  key={usg.name}
                  className="group relative flex flex-row items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-[#07193d]/85 border border-[#1b3469] hover:border-[#5ba0ea]/50 hover:bg-[#0a204e] transition-all duration-300 shadow-[0_10px_35px_rgba(4,14,36,0.6)] hover:shadow-[0_15px_45px_rgba(4,14,36,0.85)] cursor-default"
                >
                  {/* PORTRAIT */}
                  <div className="relative w-28 h-36 sm:w-32 sm:h-42 rounded-xl overflow-hidden flex-shrink-0 border border-cream/15 bg-navy shadow-md">
                    <Image
                      src={usg.image}
                      alt={usg.name}
                      fill
                      sizes="(max-width: 640px) 110px, 140px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* NAME & ROLE */}
                  <div className="flex flex-col justify-center min-w-0 flex-1 py-1">
                    <h4 className="font-display text-base sm:text-lg md:text-xl font-bold text-white tracking-wide mb-1">
                      {usg.name}
                    </h4>
                    <p className="font-mono text-xs text-[#5ba0ea] uppercase tracking-[0.16em] font-semibold mb-2">
                      {usg.role}
                    </p>
                    <span className="w-8 h-[2px] bg-[#d99b26] rounded-full group-hover:w-12 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>

            {/* ROW 2 — 2 CARDS CENTERED */}
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              {executiveTeam.slice(3, 5).map((usg) => (
                <div
                  key={usg.name}
                  className="group relative flex flex-row items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-[#07193d]/85 border border-[#1b3469] hover:border-[#5ba0ea]/50 hover:bg-[#0a204e] transition-all duration-300 shadow-[0_10px_35px_rgba(4,14,36,0.6)] hover:shadow-[0_15px_45px_rgba(4,14,36,0.85)] cursor-default w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  {/* PORTRAIT */}
                  <div className="relative w-28 h-36 sm:w-32 sm:h-42 rounded-xl overflow-hidden flex-shrink-0 border border-cream/15 bg-navy shadow-md">
                    <Image
                      src={usg.image}
                      alt={usg.name}
                      fill
                      sizes="(max-width: 640px) 110px, 140px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* NAME & ROLE */}
                  <div className="flex flex-col justify-center min-w-0 flex-1 py-1">
                    <h4 className="font-display text-base sm:text-lg md:text-xl font-bold text-white tracking-wide mb-1">
                      {usg.name}
                    </h4>
                    <p className="font-mono text-xs text-[#5ba0ea] uppercase tracking-[0.16em] font-semibold mb-2">
                      {usg.role}
                    </p>
                    <span className="w-8 h-[2px] bg-[#d99b26] rounded-full group-hover:w-12 transition-all duration-300" />
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
