import { themePillars } from "@/data/site";

export default function ThemePillars() {
  return (
    <section id="about" className="relative bg-cream px-6 py-20 overflow-hidden">
      {/* Ambient glow orbs, matching WaysIn */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-72 h-72 rounded-full bg-navy/5 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-navy/5 blur-[110px]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
          <div>
            <p className="uppercase tracking-widest text-xs text-navy/50 mb-2">
              Our theme
            </p>
            <h2 className="font-display text-2xl md:text-4xl">
              Five words. One conference.
            </h2>
          </div>

          <p className="max-w-sm text-navy/60 text-sm md:text-right">
            DIGIT is not an acronym for decoration. Each pillar is a question
            the committees will actually wrestle with.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
          {themePillars.map((p) => (
            <div
              key={p.title}
              className="group relative rounded-2xl p-[1px] overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
            >
              {/* Animated gradient border, revealed on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "conic-gradient(from 0deg, #082052, transparent 30%, transparent 70%, #082052)",
                }}
              />

              <div className="relative bg-cream rounded-[calc(1rem-1px)] p-5 h-full flex flex-col gap-3 border border-navy/10 group-hover:border-transparent transition-colors">
                <div>
                  <span className="font-display text-3xl text-navy/15 group-hover:text-navy/25 transition-colors">
                    {p.letter}
                  </span>
                </div>

                <div className="flex flex-col gap-1 mt-auto">
                  <h3 className="font-semibold text-base group-hover:translate-x-0.5 transition-transform duration-300">
                    {p.title}
                  </h3>
                  <p className="text-xs text-navy/70 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
