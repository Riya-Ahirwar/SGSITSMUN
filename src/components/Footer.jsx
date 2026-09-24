import { event } from "@/data/site";

export default function Footer() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════
          PART 1 — GET IN TOUCH / CONTACT SECTION
      ═════════════════════════════════════════════════════════ */}
      <section id="contact" className="bg-cream text-navy px-6 lg:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          {/* EYEBROW */}
          <p className="uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-navy/60 mb-3">
            GET IN TOUCH
          </p>

          {/* MAIN HEADING */}
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-navy mb-4">
            Let’s start a conversation.
          </h2>

          {/* SUPPORTING DESCRIPTION */}
          <p className="font-sans text-base md:text-lg text-navy/75 max-w-2xl leading-relaxed mb-12">
            Whether you’re a delegate with a question, an institution exploring
            participation, or an organisation interested in partnering with us,
            the SGSITS MUN Secretariat is here to help.
          </p>

          {/* 3 CONTACT SUB-BLOCKS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-4 border-t border-navy/15">
            {/* 1. GENERAL ENQUIRIES */}
            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-navy/50 font-semibold mb-2 uppercase">
                GENERAL ENQUIRIES
              </p>
              <a
                href={`mailto:${event.email}`}
                className="font-display text-xl font-bold text-navy hover:text-[#082052] underline underline-offset-4 transition-colors"
              >
                {event.email}
              </a>
              <p className="text-sm text-navy/65 mt-2 leading-relaxed max-w-xs">
                For delegate queries, registration and conference information.
              </p>
            </div>

            {/* 2. SOCIAL */}
            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-navy/50 font-semibold mb-2 uppercase">
                SOCIAL
              </p>
              <a
                href={event.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xl font-bold text-navy hover:text-[#082052] inline-flex items-center gap-1 group transition-colors"
              >
                Instagram <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <p className="text-sm text-navy/65 mt-2 leading-relaxed max-w-xs">
                Follow SGSITS MUN for announcements, updates and conference moments.
              </p>
            </div>

            {/* 3. VENUE */}
            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-navy/50 font-semibold mb-2 uppercase">
                VENUE
              </p>
              <h3 className="font-display text-xl font-bold text-navy mb-1">
                SGSITS, Indore
              </h3>
              <p className="text-sm text-navy/65 leading-relaxed">
                Shri Govindram Seksaria Institute of Technology and Science
                <br />
                Indore, Madhya Pradesh
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PART 2 — FOOTER COMPONENT
      ═════════════════════════════════════════════════════════ */}
      <footer className="bg-navy text-cream px-6 lg:px-12 pt-16 pb-12 select-none">
        <div className="max-w-6xl mx-auto">
          {/* 4-COLUMN GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12">
            {/* COLUMN 1 — BRAND */}
            <div className="flex flex-col">
              <h3 className="font-display text-xl font-bold text-cream mb-2">
                SGSITS MUN 2026
              </h3>
              <p className="text-sm text-cream/75 font-normal mb-2">
                Five perspectives. One dialogue.
              </p>
              <p className="font-mono text-xs tracking-widest text-[#7eb8f7] uppercase font-semibold mb-1">
                PRISM
              </p>
              <p className="text-xs text-cream/50">
                Indore, Madhya Pradesh
              </p>
            </div>

            {/* COLUMN 2 — EXPLORE */}
            <div>
              <p className="font-mono text-xs tracking-[0.2em] font-semibold text-cream/50 uppercase mb-4">
                EXPLORE
              </p>
              <ul className="space-y-2.5 text-sm text-cream/80">
                <li>
                  <a href="/our-story" className="hover:text-cream transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="/what-is-mun" className="hover:text-cream transition-colors">
                    The Theme
                  </a>
                </li>
                <li>
                  <a href="/#committees" className="hover:text-cream transition-colors">
                    Committees
                  </a>
                </li>
                <li>
                  <a href="/#secretariat" className="hover:text-cream transition-colors">
                    Our Leadership
                  </a>
                </li>
                <li>
                  <a href="/past-editions" className="hover:text-cream transition-colors">
                    Past Editions
                  </a>
                </li>
              </ul>
            </div>

            {/* COLUMN 3 — PARTICIPATE */}
            <div>
              <p className="font-mono text-xs tracking-[0.2em] font-semibold text-cream/50 uppercase mb-4">
                PARTICIPATE
              </p>
              <ul className="space-y-2.5 text-sm text-cream/80">
                <li>
                  <a
                    href="https://forms.gle/7wArNn3jcDDJgD2j7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cream transition-colors"
                  >
                    Register as Delegate
                  </a>
                </li>
                <li>
                  <a href="/#register" className="hover:text-cream transition-colors">
                    Executive Board
                  </a>
                </li>
                <li>
                  <a href="/#register" className="hover:text-cream transition-colors">
                    Organising Team
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="hover:text-cream transition-colors">
                    Partners &amp; Sponsors
                  </a>
                </li>
              </ul>
            </div>

            {/* COLUMN 4 — CONNECT */}
            <div>
              <p className="font-mono text-xs tracking-[0.2em] font-semibold text-cream/50 uppercase mb-4">
                CONNECT
              </p>
              <ul className="space-y-2.5 text-sm text-cream/80">
                <li>
                  <a href={`mailto:${event.email}`} className="hover:text-cream transition-colors">
                    {event.email}
                  </a>
                </li>
                <li>
                  <a
                    href={event.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cream transition-colors"
                  >
                    Instagram →
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="hover:text-cream transition-colors">
                    Contact Secretariat →
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* SUBTLE DIVIDER LINE */}
          <div className="border-t border-cream/15 pt-8" />

          {/* EVENT DETAILS & LOCATION LINE */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs md:text-sm font-mono tracking-wider text-cream/60">
            <p>SGSITS MUN 2026 · PRISM · 10 &amp; 11 OCTOBER 2026</p>
            <p className="uppercase">INDORE, MADHYA PRADESH</p>
          </div>

          {/* COPYRIGHT LINE */}
          <p className="text-xs text-cream/40 text-center mt-6">
            © 2026 SGSITS MUN. All rights reserved.
          </p>

          {/* BOTTOM PERSONALITY QUOTE */}
          <div className="border-t border-cream/10 mt-8 pt-6 text-center max-w-md mx-auto">
            <p className="font-display text-sm md:text-base text-cream/90 font-medium tracking-wide">
              Five perspectives. One dialogue.
            </p>
            <p className="font-display text-sm md:text-base text-cream/70 font-light mt-1">
              See you at the table.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}