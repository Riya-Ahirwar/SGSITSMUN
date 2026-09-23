"use client";

import Link from "next/link";

const GOOGLE_FORM_URL = "https://forms.gle/7wArNn3jcDDJgD2j7";

export default function WaysIn() {
  return (
    <section
      id="register"
      className="relative bg-navy text-cream px-6 py-20 md:py-28 overflow-hidden"
    >
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#7eb8f7]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-cream/10 blur-[130px]" />

      <div className="relative max-w-5xl mx-auto">
        {/* ========================================================
            HERO / SECTION HEADER
        ========================================================= */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-[#7eb8f7] font-semibold mb-3">
            JOIN SGSITS MUN 2026
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.15]">
            YOUR SEAT AT THE TABLE.
          </h2>
          <div className="space-y-2 text-cream/75 text-base sm:text-lg font-light leading-relaxed">
            <p>
              Whether you&apos;re joining us as a delegate, exploring the conference or looking to
              partner with SGSITS MUN 2026, there&apos;s a place for you here.
            </p>
            <p className="text-cream/90 font-medium">
              Choose how you&apos;d like to be part of the conference.
            </p>
          </div>
        </div>

        {/* ========================================================
            01 — REGISTER AS A DELEGATE (DOMINANT PRIMARY CARD)
        ========================================================= */}
        <div className="mb-6">
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block rounded-2xl p-[1px] overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#7eb8f7]"
          >
            {/* Ambient Conic Gradient Border on Hover */}
            <div
              className="absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "conic-gradient(from 0deg, #7eb8f7, #f8f0e5 25%, transparent 50%, #7eb8f7 75%, #f8f0e5)",
              }}
            />

            <div className="relative bg-[#071638] rounded-[calc(1rem-1px)] p-7 sm:p-9 md:p-11 border border-cream/20 group-hover:border-transparent transition-all duration-300 shadow-xl group-hover:shadow-[0_20px_50px_rgba(4,14,36,0.5)] flex flex-col justify-between">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-[#7eb8f7]">
                      01 — PRIMARY ENGAGEMENT
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Applications Open
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-cream group-hover:text-white transition-colors duration-300">
                    REGISTER AS A DELEGATE
                  </h3>
                  <p className="font-display italic text-base sm:text-lg text-[#7eb8f7] mt-1">
                    Take your place in the room.
                  </p>
                </div>

                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-cream/20 text-cream group-hover:bg-cream group-hover:text-navy group-hover:border-cream group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 flex-shrink-0">
                  <span className="text-xl">→</span>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-cream/80 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-3xl">
                  Step into committee, represent your portfolio, challenge ideas and become part of
                  the conversation at SGSITS MUN 2026.
                </p>

                <div className="pt-2">
                  <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full bg-cream text-navy font-semibold text-sm sm:text-base tracking-wide group-hover:bg-white group-hover:shadow-[0_0_25px_rgba(248,240,229,0.4)] group-hover:scale-105 active:scale-95 transition-all duration-300">
                    <span>REGISTER NOW</span>
                    <span className="text-base group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* ========================================================
            02 & 03 — SECONDARY CARDS (2 COLUMNS)
        ========================================================= */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 md:mb-24">
          {/* 02 — EXECUTIVE BOARD (CLOSED) */}
          <div className="relative rounded-2xl p-[1px] bg-cream/5 border border-cream/10 opacity-75 cursor-default flex flex-col justify-between p-6 sm:p-8 rounded-2xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-xs uppercase tracking-[0.2em] font-semibold text-cream/40">
                  02
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-rose-300/80 bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  APPLICATIONS CLOSED
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-cream/90 mb-1">
                EXECUTIVE BOARD
              </h3>
              <p className="font-display italic text-sm sm:text-base text-cream/60 mb-4">
                Applications are closed.
              </p>

              <p className="text-cream/60 text-xs sm:text-sm font-light leading-relaxed">
                The Executive Board for SGSITS MUN 2026 has been finalised. Thank you to everyone who
                expressed interest in joining the dais.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-cream/10 text-xs text-cream/40 uppercase tracking-widest font-semibold">
              Selection Finalised
            </div>
          </div>

          {/* 03 — PARTNER OR SPONSOR */}
          <Link
            href="/#contact"
            className="group relative block rounded-2xl p-[1px] overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#7eb8f7]"
          >
            {/* Gradient Border on Hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "conic-gradient(from 0deg, #7eb8f7, transparent 30%, transparent 70%, #7eb8f7)",
              }}
            />

            <div className="relative bg-[#071638] rounded-[calc(1rem-1px)] p-6 sm:p-8 h-full flex flex-col justify-between border border-cream/15 group-hover:border-transparent transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-xs uppercase tracking-[0.2em] font-semibold text-[#7eb8f7]">
                    03
                  </span>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-cream/20 text-cream group-hover:bg-cream group-hover:text-navy group-hover:border-cream group-hover:rotate-45 transition-all duration-300">
                    <span className="text-sm">→</span>
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-cream group-hover:text-white transition-colors duration-300 mb-1">
                  PARTNER OR SPONSOR
                </h3>
                <p className="font-display italic text-sm sm:text-base text-[#7eb8f7] mb-4">
                  Build the conference with us.
                </p>

                <p className="text-cream/75 text-xs sm:text-sm font-light leading-relaxed">
                  SGSITS MUN brings together students, institutions and a growing community of young
                  leaders. We welcome organisations and brands interested in partnering with us for
                  SGSITS MUN 2026.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-cream/10">
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-cream group-hover:text-[#7eb8f7] transition-colors duration-300 uppercase">
                  <span>PARTNER WITH US</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* ========================================================
            BOTTOM CTA — REFINED CLOSING STATEMENT
        ========================================================= */}
        <div className="border-t border-cream/15 pt-14 md:pt-18 text-center max-w-3xl mx-auto space-y-5">
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-cream">
            READY TO JOIN THE CONVERSATION?
          </h3>
          <p className="font-display italic text-base sm:text-lg text-[#7eb8f7]">
            Five perspectives. One dialogue.
          </p>
          <p className="text-cream/80 text-base sm:text-lg font-light">
            Your perspective belongs at the table.
          </p>
          <div className="pt-3">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cream text-navy font-semibold text-base sm:text-lg tracking-wide hover:bg-white hover:shadow-[0_0_30px_rgba(248,240,229,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>REGISTER NOW</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
