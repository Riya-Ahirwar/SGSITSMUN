import { secretariat } from "@/data/site";

export default function Secretariat() {
  return (
    <section
      id="secretariat"
      className="relative bg-cream text-navy px-6 py-20 overflow-hidden"
    >
      {/* Ambient glow orbs, matching Committees */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-72 h-72 rounded-full bg-navy/5 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-navy/5 blur-[110px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
          <div>
            <p className="uppercase tracking-widest text-xs text-navy/50 mb-2">
              Leadership
            </p>

            <h2 className="font-display text-2xl md:text-4xl">
              The people who built this.
            </h2>
          </div>

          <p className="max-w-sm text-navy/60 text-sm md:text-right">
            The team behind the conference, responsible for every detail you
            experience.
          </p>
        </div>

        {/* Secretariat Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {secretariat.map((m) => (
            <div
              key={m.name}
              className="group relative rounded-2xl p-[1px] overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
            >
              {/* Animated gradient border */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "conic-gradient(from 0deg, #17233c, transparent 30%, transparent 70%, #17233c)",
                }}
              />

              {/* Card */}
              <div className="relative bg-cream rounded-[calc(1rem-1px)] p-6 h-full flex flex-col items-center text-center border border-navy/10 group-hover:border-transparent transition-colors">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full border border-navy/15 bg-navy/5 overflow-hidden mb-5 flex items-center justify-center">
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-display text-lg text-navy/60 group-hover:text-navy/80 transition-colors">
                      {m.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>

                {/* Member Information */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-lg group-hover:-translate-y-px transition-transform duration-300">
                    {m.name}
                  </h3>

                  <p className="text-xs uppercase tracking-wide text-navy/50 mb-2">
                    {m.role}
                  </p>

                  <p className="text-sm text-navy/60 leading-relaxed italic">
                    &quot;{m.quote}&quot;
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
