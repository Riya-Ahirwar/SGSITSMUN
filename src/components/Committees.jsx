import { committees } from "@/data/site";

export default function Committees() {
  return (
    <section id="committees" className="relative bg-navy text-cream px-6 py-20 overflow-hidden">
      {/* Ambient glow orbs, matching WaysIn */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-72 h-72 rounded-full bg-cream/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-cream/5 blur-[110px]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
          <div>
            <p className="uppercase tracking-widest text-xs text-cream/50 mb-2">Delegate Desk</p>
            <h2 className="font-display text-2xl md:text-4xl">Five rooms, five debates.</h2>
          </div>
          <p className="max-w-sm text-cream/60 text-sm md:text-right">
            Each committee approaches DIGIT from a different angle. Choose your arena.
          </p>
        </div>

        <div data-reveal-group className="grid md:grid-cols-3 gap-5">
          {committees.map((c, i) => (
            <div
              key={c.name}
              data-reveal
              className="group relative rounded-2xl p-[1px] overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
            >
              {/* Animated gradient border, revealed on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "conic-gradient(from 0deg, #f8f0e5, transparent 30%, transparent 70%, #f8f0e5)",
                }}
              />

              <div className="relative bg-navy rounded-[calc(1rem-1px)] p-6 h-full flex flex-col gap-4 border border-cream/10 group-hover:border-transparent transition-colors">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] uppercase tracking-wide text-cream/50 border border-cream/15 rounded-full px-2.5 py-1">
                    {c.type}
                  </span>
                  <span className="font-display text-2xl text-cream/15 group-hover:text-cream/25 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-col gap-1 mt-auto">
                  <h3 className="font-display text-xl group-hover:translate-x-0.5 transition-transform duration-300">
                    {c.name}
                  </h3>
                  <p className="text-xs text-cream/50 mb-1">{c.tag}</p>
                  <p className="text-sm text-cream/70 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
